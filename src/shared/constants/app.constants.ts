/** Application-wide constants */
export const APP_NAME = import.meta.env['VITE_APP_NAME'] ?? 'Admin Portal';

export const STORAGE_KEYS = {
  THEME: 'app-theme',
  AUTH_TOKEN: 'auth-refresh-token',
  SIDEBAR_COLLAPSED: 'sidebar-collapsed',
} as const;

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_RETRY_COUNT = 1;
