import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { refreshAccessToken, logout as logoutApi } from '../api/auth.api';
import type { User } from '../types/auth.types';

import { STORAGE_KEYS } from '@/shared/constants/app.constants';
import { registerAuthCallbacks } from '@/shared/lib/axios';
import { queryClient } from '@/shared/lib/queryClient';

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null; // In-memory only — not persisted
  refreshToken: string | null; // Persisted in localStorage
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (params: { user: User; accessToken: string; refreshToken: string }) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Auth store — persists refreshToken to localStorage.
 * AccessToken is kept in memory only for security.
 *
 * NOTE: localStorage-based persistence is used for simplicity.
 * For production, migrate refreshToken to httpOnly cookies via backend.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: ({ user, accessToken, refreshToken }) =>
        set((state) => {
          state.user = user;
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.isAuthenticated = true;
        }),

      setAccessToken: (token) =>
        set((state) => {
          state.accessToken = token;
        }),

      logout: () => {
        set((state) => {
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
          state.isAuthenticated = false;
        });
        // Clear all server state cache
        queryClient.clear();
        // Fire-and-forget server-side logout
        logoutApi().catch(() => {
          // Ignore logout API errors
        });
      },

      setLoading: (loading) =>
        set((state) => {
          state.isLoading = loading;
        }),
    })),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      storage: createJSONStorage(() => localStorage),
      // Only persist refreshToken and user — NOT accessToken
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// Register axios auth callbacks to avoid circular imports
registerAuthCallbacks({
  getAccessToken: () => useAuthStore.getState().accessToken,
  refreshToken: async () => {
    const { refreshToken, setAccessToken, logout } = useAuthStore.getState();
    if (!refreshToken) {
      logout();
      return null;
    }
    try {
      const result = await refreshAccessToken(refreshToken);
      setAccessToken(result.accessToken);
      return result.accessToken;
    } catch {
      logout();
      return null;
    }
  },
  logout: () => useAuthStore.getState().logout(),
});
