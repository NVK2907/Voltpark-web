import { useQuery } from '@tanstack/react-query';

import { getDashboardStats, getRecentActivities } from '../api/dashboard.api';

/** Query key factory for dashboard feature. */
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  activities: () => [...dashboardKeys.all, 'activities'] as const,
};

/** Fetch and cache dashboard statistics. */
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
  });
}

/** Fetch and cache recent activity list. */
export function useRecentActivities() {
  return useQuery({
    queryKey: dashboardKeys.activities(),
    queryFn: getRecentActivities,
  });
}
