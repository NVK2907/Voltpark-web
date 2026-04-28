# ADR-001: Choosing Zustand over Redux Toolkit

**Date**: 2024-01-01
**Status**: Accepted
**Deciders**: Frontend Team

---

## Context

We need a client-side state management solution for the admin boilerplate. The primary use case is managing authentication state (tokens, user object) with persistence across page refreshes.

## Decision

We chose **Zustand** (`^4.5`) over Redux Toolkit.

## Rationale

### Why Zustand

| Criteria | Zustand | Redux Toolkit |
|---|---|---|
| Bundle size | ~3KB | ~25KB |
| Boilerplate | Minimal | Moderate (slices, reducers) |
| TypeScript | First-class | Good |
| Learning curve | Very low | Moderate |
| DevTools | Via middleware | Excellent |
| Middleware | persist, immer, devtools | Built-in |
| React 18 | Compatible | Compatible |

### Specific Reasons

1. **Simplicity**: Zustand requires no Provider, no reducers, no action types. For auth state which has <10 actions, this simplicity is a feature.
2. **Bundle size**: 3KB vs 25KB matters in admin apps where bundle size affects initial load.
3. **`persist` middleware**: Built-in persistence to localStorage/sessionStorage with selective partializing (only persisting `refreshToken`, not `accessToken`).
4. **`immer` middleware**: Allows mutating draft state directly, improving DX without sacrificing immutability.
5. **Selector pattern**: `useStore((s) => s.field)` is equivalent to Redux selectors, ensuring components re-render only when their slice changes.

### When Redux Toolkit is Better

- Complex state with many interconnected slices
- Need for time-travel debugging
- Team already familiar with Redux ecosystem
- Middleware-heavy requirements (complex side effects via RTK Query or redux-saga)

## Consequences

- Simpler auth store (`auth.store.ts`) with <100 LOC vs ~200 LOC with Redux
- No Redux DevTools by default (Zustand has its own devtools middleware, but less powerful)
- If state complexity grows significantly, migration to Redux Toolkit is straightforward (store API is similar)

## References

- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Redux Toolkit vs Zustand comparison](https://blog.logrocket.com/zustand-vs-redux-toolkit/)
