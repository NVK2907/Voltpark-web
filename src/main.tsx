import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/styles/globals.css';
import '@/lib/i18n';
import { App } from '@/app/App';
import { env } from '@/shared/config/env';

async function enableMocking(): Promise<void> {
  if (!env.VITE_ENABLE_MSW) return;

  const { worker } = await import('@/mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass', // Don't warn on unhandled requests
  });
}

// Apply stored theme before rendering to avoid flash
const storedTheme = localStorage.getItem('app-theme');
if (
  storedTheme === 'dark' ||
  (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
}

void enableMocking().then(() => {
  const rootEl = document.getElementById('root');
  if (!rootEl) throw new Error('Root element #root not found');

  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
