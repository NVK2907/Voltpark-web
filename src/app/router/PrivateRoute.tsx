import { Navigate, useLocation } from 'react-router-dom';

import { AUTH_ROUTES } from '@/lib/constants';

import { useAuthStore } from '@/features/auth';
import { PageLoader } from '@/shared/components/common/LoadingSpinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

/**
 * Guards private routes — redirects unauthenticated users to /login
 * with a `from` query param so they can be sent back after login.
 */
export function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={`${AUTH_ROUTES.LOGIN}?from=${encodeURIComponent(location.pathname)}`} replace />
    );
  }

  return <>{children}</>;
}
