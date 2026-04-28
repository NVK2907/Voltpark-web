/** Centralized route path constants — never hard-code paths in components. */
export const ROUTES = {
  // Public
  LOGIN: '/login',

  // Private
  DASHBOARD: '/dashboard',

  // Misc
  NOT_FOUND: '/404',
  ROOT: '/',
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
