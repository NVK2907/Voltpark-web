import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type React from 'react';
import { Toaster } from 'sonner';

import { ErrorBoundary } from '@/shared/components/common/ErrorBoundary';
import { env } from '@/shared/config/env';
import { queryClient } from '@/shared/lib/queryClient';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" richColors closeButton duration={4000} />
        {env.VITE_ENABLE_DEVTOOLS && (
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
