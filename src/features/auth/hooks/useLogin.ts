import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { login as loginApi } from '../api/auth.api';
import { useAuthStore } from '../stores/auth.store';
import type { LoginRequest } from '../types/auth.types';

import { ROUTES } from '@/app/router/routes.config';
import { AUTH_ROUTES } from '@/lib/constants';

/**
 * Hook to perform login mutation.
 * On success: stores auth, redirects to previous page or dashboard.
 */
export function useLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: (result) => {
      setAuth({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      toast.success(`Welcome back, ${result.user.name}!`);

      const from = searchParams.get('from') ?? ROUTES.DASHBOARD;
      void navigate(from, { replace: true });
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message ?? 'Login failed. Please check your credentials.');
    },
  });
}

/**
 * Hook to perform logout — clears store and redirects to /login.
 */
export function useLogout() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  return () => {
    logout();
    toast.info('You have been logged out.');
    void navigate(AUTH_ROUTES.LOGIN, { replace: true });
  };
}
