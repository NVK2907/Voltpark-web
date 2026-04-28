import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

import { env } from '@/shared/config/env';
import type { ApiError, ApiResponse } from '@/shared/types';

// Lazy import to avoid circular deps — auth store imports axios
let getAccessToken: (() => string | null) | null = null;
let refreshTokenFn: (() => Promise<string | null>) | null = null;
let onLogout: (() => void) | null = null;

/**
 * Register auth callbacks to avoid circular imports between axios and auth store.
 */
export function registerAuthCallbacks(callbacks: {
  getAccessToken: () => string | null;
  refreshToken: () => Promise<string | null>;
  logout: () => void;
}): void {
  getAccessToken = callbacks.getAccessToken;
  refreshTokenFn = callbacks.refreshToken;
  onLogout = callbacks.logout;
}

export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken?.();
    if (token && config.headers) {
      // NOTE: Do NOT log token value — security risk
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response interceptor ────────────────────────────────────────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null): void {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  // Unwrap { data, meta } envelope from backend
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    // If response follows { data, meta } envelope, unwrap it
    if (response.data && 'data' in response.data) {
      return { ...response, data: response.data };
    }
    return response;
  },

  async (error: AxiosError<{ message?: string; code?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const statusCode = error.response?.status;

    // ── 401 Unauthorized ─────────────────────────────────────────────────
    if (statusCode === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue subsequent requests while refresh is in flight
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers && token) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err: unknown) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshTokenFn?.();
        processQueue(null, newToken ?? null);

        if (originalRequest.headers && newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }
        return await apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // console.warn interceptors intentionally — no token values logged
        onLogout?.();
        window.location.href = '/login?expired=true';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ── 403 Forbidden ────────────────────────────────────────────────────
    if (statusCode === 403) {
      toast.error('You do not have permission to perform this action.');
    }

    // ── 5xx Server errors ────────────────────────────────────────────────
    if (statusCode !== undefined && statusCode >= 500) {
      toast.error('Server error. Please try again later.');
    }

    // ── Map to ApiError ──────────────────────────────────────────────────
    const apiError: ApiError = {
      code: error.response?.data?.code ?? 'UNKNOWN_ERROR',
      message: error.response?.data?.message ?? error.message ?? 'An unexpected error occurred.',
      statusCode: statusCode ?? 0,
    };

    return Promise.reject(apiError);
  },
);

export default apiClient;
