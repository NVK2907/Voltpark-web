import { http, HttpResponse, delay } from 'msw';

import { API_ENDPOINTS } from '@/shared/constants/api.constants';

const MOCK_USER = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin' as const,
  avatarUrl: null,
};

const MOCK_STATS = {
  totalUsers: 12_483,
  activeUsers: 9_241,
  revenue: 284_750.5,
  orders: 3_921,
  userGrowth: 12.5,
  revenueGrowth: 8.3,
};

const MOCK_ACTIVITIES = [
  {
    id: '1',
    user: 'Alice Johnson',
    action: 'Created new product listing',
    timestamp: new Date(Date.now() - 5 * 60_000).toISOString(),
    status: 'success' as const,
  },
  {
    id: '2',
    user: 'Bob Smith',
    action: 'Failed login attempt',
    timestamp: new Date(Date.now() - 12 * 60_000).toISOString(),
    status: 'error' as const,
  },
  {
    id: '3',
    user: 'Carol White',
    action: 'Updated user profile',
    timestamp: new Date(Date.now() - 30 * 60_000).toISOString(),
    status: 'success' as const,
  },
  {
    id: '4',
    user: 'David Lee',
    action: 'Pending payment review',
    timestamp: new Date(Date.now() - 60 * 60_000).toISOString(),
    status: 'warning' as const,
  },
  {
    id: '5',
    user: 'Emma Davis',
    action: 'Exported monthly report',
    timestamp: new Date(Date.now() - 90 * 60_000).toISOString(),
    status: 'success' as const,
  },
];

const BASE_URL = import.meta.env['VITE_API_BASE_URL'] ?? 'http://localhost:3000/api/v1';

export const handlers = [
  // POST /auth/login
  http.post(`${BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, async ({ request }) => {
    await delay(600);

    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'admin@example.com' && body.password === '123456') {
      return HttpResponse.json({
        data: {
          accessToken: 'mock-access-token-xyz',
          refreshToken: 'mock-refresh-token-abc',
          user: MOCK_USER,
        },
      });
    }

    return HttpResponse.json(
      { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' },
      { status: 401 },
    );
  }),

  // POST /auth/refresh
  http.post(`${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, async () => {
    await delay(300);
    return HttpResponse.json({
      data: {
        accessToken: 'mock-access-token-refreshed',
        refreshToken: 'mock-refresh-token-new',
      },
    });
  }),

  // GET /auth/me
  http.get(`${BASE_URL}${API_ENDPOINTS.AUTH.ME}`, async () => {
    await delay(200);
    return HttpResponse.json({ data: MOCK_USER });
  }),

  // POST /auth/logout
  http.post(`${BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, async () => {
    await delay(100);
    return HttpResponse.json({ data: { success: true } });
  }),

  // GET /dashboard/stats
  http.get(`${BASE_URL}${API_ENDPOINTS.DASHBOARD.STATS}`, async () => {
    await delay(500);
    return HttpResponse.json({ data: MOCK_STATS });
  }),

  // GET /dashboard/activities
  http.get(`${BASE_URL}${API_ENDPOINTS.DASHBOARD.ACTIVITIES}`, async () => {
    await delay(400);
    return HttpResponse.json({ data: MOCK_ACTIVITIES });
  }),
];
