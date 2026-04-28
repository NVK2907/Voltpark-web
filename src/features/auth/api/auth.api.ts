import type { LoginRequest, LoginResponse, RefreshTokenResponse, User } from '../types/auth.types';

import { API_ENDPOINTS } from '@/shared/constants/api.constants';
import apiClient from '@/shared/lib/axios';
import type { ApiResponse } from '@/shared/types';

/** Login with email and password. Returns tokens + user. */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, data);
  return response.data.data;
}

/** Refresh the access token using refresh token. */
export async function refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
  const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
    API_ENDPOINTS.AUTH.REFRESH,
    { refreshToken },
  );
  return response.data.data;
}

/** Fetch currently authenticated user. */
export async function getMe(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
  return response.data.data;
}

/** Logout — invalidate server-side session if applicable. */
export async function logout(): Promise<void> {
  await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
}
