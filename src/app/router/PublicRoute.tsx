import { Navigate } from 'react-router-dom';

import { ROUTES } from './routes.config';

import { useAuthStore } from '@/features/auth';
import { PageLoader } from '@/shared/components/common/LoadingSpinner';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Guards public-only routes (e.g. /login) — redirects authenticated users to /dashboard.
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}
