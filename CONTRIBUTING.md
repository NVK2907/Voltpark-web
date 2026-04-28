# Contributing Guide

Thank you for contributing! Please read this guide before submitting PRs.

## Commit Convention (Conventional Commits)

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>
```

### Types

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Build, tooling, deps |
| `refactor` | Code restructure (no feature/fix) |
| `docs` | Documentation only |
| `test` | Tests only |
| `perf` | Performance improvement |
| `style` | Formatting, whitespace |
| `ci` | CI/CD config |

### Examples

```
feat(auth): add forgot password flow
fix(dashboard): fix stats loading on slow connections
chore(deps): update @tanstack/react-query to 5.52
docs(readme): add deployment notes
test(auth): add LoginForm edge case tests
```

## Branch Naming

```
<type>/<short-description>
```

Examples:
- `feat/forgot-password`
- `fix/sidebar-mobile-overflow`
- `chore/update-dependencies`

## Development Workflow

1. **Fork/branch** from `main`
2. **Install deps**: `pnpm install`
3. **Make changes** following the architecture rules
4. **Write/update tests** for your changes
5. **Run checks before PR**:
   ```bash
   pnpm type-check   # 0 errors required
   pnpm lint         # 0 warnings required
   pnpm test         # all tests pass
   ```
6. **Open PR** with a clear description

## PR Review Checklist

- [ ] TypeScript compiles with 0 errors (`pnpm type-check`)
- [ ] ESLint passes with 0 warnings (`pnpm lint`)
- [ ] All tests pass (`pnpm test`)
- [ ] New features have tests
- [ ] No `any` types added
- [ ] No cross-feature imports violated
- [ ] `shared/` doesn't import from `features/`
- [ ] README updated if public API changed
- [ ] ADR added if major architecture decision made

## Architecture Rules (Mandatory)

1. **Features are isolated**: `features/auth` ↔ `features/dashboard` only via `index.ts` barrel
2. **shared/ is pure**: No `features/` imports allowed in `shared/`
3. **No hard-coded routes**: Use `ROUTES` from `routes.config.ts`
4. **No `any`**: Every type must be explicit
5. **Error handling**: Every `async` function must handle errors

## Code Style

- `PascalCase.tsx` for React components
- `camelCase.ts` for utils, hooks, stores
- JSDoc comment (1-2 lines) for all public functions in `shared/`
- Default exports only for page/layout components (React.lazy requirement)
- Named exports for everything else
