import type { DashboardStats, ActivityItem } from '../types/dashboard.types';

import { API_ENDPOINTS } from '@/shared/constants/api.constants';
import apiClient from '@/shared/lib/axios';
import type { ApiResponse } from '@/shared/types';

/** Fetch dashboard KPI statistics. */
export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await apiClient.get<ApiResponse<DashboardStats>>(API_ENDPOINTS.DASHBOARD.STATS);
  return response.data.data;
}

/** Fetch recent activity items. */
export async function getRecentActivities(): Promise<ActivityItem[]> {
  const response = await apiClient.get<ApiResponse<ActivityItem[]>>(
    API_ENDPOINTS.DASHBOARD.ACTIVITIES,
  );
  return response.data.data;
}
