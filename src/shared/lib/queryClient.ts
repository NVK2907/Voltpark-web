import { QueryClient } from '@tanstack/react-query';

/**
 * Singleton QueryClient with sensible defaults for admin applications.
 * - staleTime: 60s (data stays fresh for 1 minute)
 * - retry: 1 (retry failed requests once)
 * - refetchOnWindowFocus: false (avoid unexpected refetches)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
