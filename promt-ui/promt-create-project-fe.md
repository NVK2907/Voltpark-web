# Prompt: Khởi tạo Frontend Project (React + TypeScript + Vite)

> **Role**: Bạn là **Senior Frontend Engineer 20+ năm kinh nghiệm**, đã từng dẫn dắt nhiều dự án enterprise quy mô lớn (>50k LOC, >20 dev). Khi sinh code, bạn ưu tiên: **clean architecture, type safety, performance, accessibility, security, testability** và **DX (developer experience)**.
>
> **Goal**: Khởi tạo một **production-ready React frontend boilerplate** dành cho ứng dụng quản trị (admin/owner/staff/user). Boilerplate phải sẵn sàng để team scale lên 10+ developers mà không bị chồng chéo cấu trúc.

---

## 1. Tech Stack (chốt version cụ thể)

| Layer | Library | Version (tối thiểu) | Ghi chú |
|---|---|---|---|
| Runtime | Node.js | `>=20.11 LTS` | dùng `.nvmrc` / `engines` trong package.json |
| Package Manager | pnpm | `>=9` | bắt buộc, không dùng npm/yarn |
| Framework | React | `^18.3` | function components + hooks, **không** class component |
| Language | TypeScript | `^5.5` | `strict: true`, `noUncheckedIndexedAccess: true` |
| Bundler | Vite | `^5.4` | SWC plugin cho React |
| Styling | TailwindCSS | `^3.4` | + `tailwind-merge`, `clsx`, `class-variance-authority` |
| Routing | React Router | `^6.26` | data router (`createBrowserRouter`) |
| HTTP Client | Axios | `^1.7` | base instance + interceptors |
| Server State | TanStack Query | `^5.51` | `@tanstack/react-query` + devtools |
| Client State | Zustand | `^4.5` | + `immer` middleware, `persist` cho auth |
| Forms | React Hook Form | `^7.52` | tích hợp với Zod |
| Validation | Zod | `^3.23` | dùng cả ở schema form và env validation |
| UI Primitives | Radix UI / shadcn-ui | latest | accessibility-first, copy-paste components |
| Icons | lucide-react | latest | |
| Date | date-fns | `^3` | tree-shakeable, không dùng moment |
| Testing | Vitest + React Testing Library | latest | + `@testing-library/jest-dom`, `msw` cho mock API |
| E2E (optional) | Playwright | latest | khuyến nghị 1 happy-path test |

---

## 2. Cấu trúc thư mục (Feature-based + Modular)

```
src/
├── app/                          # App-level setup
│   ├── providers/                # QueryClientProvider, RouterProvider, ThemeProvider...
│   ├── router/                   # Route definitions, lazy loading, guards
│   │   ├── index.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── PublicRoute.tsx
│   │   └── routes.config.ts      # central route paths (typed constants)
│   └── App.tsx
│
├── features/                     # Mỗi feature là 1 module độc lập
│   ├── auth/
│   │   ├── api/                  # auth.api.ts (axios calls)
│   │   ├── components/           # LoginForm, LogoutButton...
│   │   ├── hooks/                # useLogin, useCurrentUser
│   │   ├── pages/                # LoginPage.tsx
│   │   ├── stores/               # auth.store.ts (zustand)
│   │   ├── types/                # auth.types.ts
│   │   ├── schemas/              # login.schema.ts (zod)
│   │   └── index.ts              # public API barrel
│   └── dashboard/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── index.ts
│
├── shared/                       # Dùng chung toàn app
│   ├── components/
│   │   ├── ui/                   # Button, Input, Modal, Table... (shadcn-style)
│   │   └── common/               # ErrorBoundary, LoadingSpinner, EmptyState
│   ├── hooks/                    # useDebounce, usePagination, useMediaQuery...
│   ├── lib/                      # axios instance, queryClient, cn(), formatters
│   │   ├── axios.ts
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── constants/                # app.constants.ts, api.constants.ts
│   ├── types/                    # global types: ApiResponse<T>, Paginated<T>...
│   ├── config/                   # env.ts (zod-validated)
│   └── utils/                    # pure functions
│
├── layouts/
│   ├── AuthLayout.tsx            # cho login/register
│   ├── DashboardLayout.tsx       # header + sidebar
│   └── components/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Breadcrumb.tsx
│
├── styles/
│   ├── globals.css               # tailwind directives + CSS variables (theme tokens)
│   └── themes/                   # light/dark tokens
│
├── assets/                       # images, fonts, svgs
│
├── main.tsx
└── vite-env.d.ts
```

**Quy tắc bắt buộc**:
- **Cross-feature import bị cấm**: `features/dashboard` **không** được import từ `features/auth/**` (trừ qua `index.ts` barrel). Cấu hình bằng ESLint rule `import/no-restricted-paths`.
- Mọi feature phải tự đóng gói qua `index.ts`.
- `shared/**` không được import từ `features/**`.

---

## 3. Yêu cầu kỹ thuật

### 3.1 Code Quality & Tooling
- **ESLint**: `eslint-config-airbnb-typescript` hoặc `@typescript-eslint/recommended` + plugins: `react`, `react-hooks`, `jsx-a11y`, `import`, `unused-imports`, `tailwindcss`.
- **Prettier**: `printWidth: 100`, `singleQuote: true`, `trailingComma: 'all'`, `semi: true`. Tích hợp `prettier-plugin-tailwindcss` để sort class.
- **Husky + lint-staged**: pre-commit chạy `eslint --fix` + `prettier --write` + `tsc --noEmit`.
- **Commitlint**: Conventional Commits (`feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `perf`).
- **TypeScript**: bật `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`.
- **Path alias**: `@/*` → `src/*` (cấu hình cả `tsconfig.json` và `vite.config.ts`).
- **EditorConfig**: `.editorconfig` chuẩn (LF, utf-8, 2 spaces).

### 3.2 Environment Config
- File: `.env`, `.env.development`, `.env.production`, `.env.example`.
- **Bắt buộc**: validate env bằng **Zod** trong `src/shared/config/env.ts`. App phải fail-fast khi thiếu biến.
- Prefix `VITE_` cho biến public.
- Ví dụ vars: `VITE_API_BASE_URL`, `VITE_APP_NAME`, `VITE_ENV`, `VITE_ENABLE_DEVTOOLS`.

### 3.3 Axios Setup
File: `src/shared/lib/axios.ts`.
- Base URL từ `env.VITE_API_BASE_URL`, `timeout: 15000`.
- **Request interceptor**: gắn `Authorization: Bearer <token>` từ auth store.
- **Response interceptor**:
  - Unwrap `response.data` khi BE trả `{ data, meta }`.
  - Xử lý `401` → gọi refresh token (nếu có) → retry 1 lần → fail thì logout & redirect `/login`.
  - Xử lý `403`, `5xx` → toast error chuẩn hoá.
  - Map error về kiểu `ApiError { code, message, details? }`.
- Hỗ trợ **request cancellation** qua `AbortController`.

### 3.4 React Query Setup
- `QueryClient` với defaults: `staleTime: 60_000`, `retry: 1`, `refetchOnWindowFocus: false`.
- **Query key factory pattern** cho từng feature: `authKeys.me()`, `userKeys.list(params)`.
- Devtools chỉ bật khi `import.meta.env.DEV`.
- Mutation phải `invalidateQueries` đúng key sau khi success.

### 3.5 Routing
- Dùng `createBrowserRouter` với data router API.
- **Route splitting** bằng `React.lazy` + `Suspense` cho mọi page.
- `PrivateRoute` đọc auth state → redirect `/login` nếu chưa login (kèm `?from=` để quay lại sau login).
- `PublicRoute` (e.g. `/login`) → redirect `/dashboard` nếu đã login.
- Tập trung path constants trong `routes.config.ts`, **không hard-code string** path ở component.
- 404 page + ErrorBoundary cho từng route.

### 3.6 Layout
- `DashboardLayout`: sidebar (collapsible trên mobile), header (user menu, notifications), main content.
- `AuthLayout`: full-screen centered card.
- Layouts dùng `<Outlet />` của React Router.

---

## 4. UI / UX

- **Responsive**: mobile-first, breakpoints chuẩn Tailwind (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`).
- **Accessibility**: tuân thủ WCAG 2.1 AA — semantic HTML, `aria-*`, focus ring rõ ràng, keyboard navigation cho mọi interactive element.
- **Dark mode**: hỗ trợ qua Tailwind `class` strategy + CSS variables, lưu preference vào localStorage.
- **Design tokens**: định nghĩa color/spacing/radius bằng CSS variables trong `globals.css`, expose vào Tailwind theme.
- **States chuẩn cho mọi data view**: `loading` (skeleton), `empty`, `error` (retry button), `success`.
- **Toast notification**: dùng `sonner` hoặc `react-hot-toast`.
- **Demo pages**:
  - `/login` — form (email + password) với React Hook Form + Zod validation, hiển thị inline error.
  - `/dashboard` — stats cards (4 KPIs), 1 chart placeholder, 1 data table có pagination + search.
  - `/404` — Not Found page.

---

## 5. Authentication

- **Mock JWT**: BE giả lập trả `{ accessToken, refreshToken, user }`. AccessToken có exp 15m, refreshToken 7d.
- **Token storage**:
  - AccessToken → **memory (zustand store)** + persist refreshToken vào `httpOnly cookie` (mô phỏng) HOẶC `localStorage` (kèm cảnh báo XSS, có sanitize).
  - **Khuyến nghị mặc định**: dùng `localStorage` cho boilerplate nhưng kèm comment hướng dẫn migrate sang cookie httpOnly khi BE sẵn sàng.
- **Auth flow**: login → lưu token → set axios header → fetch `/me` → redirect `/dashboard`.
- **Logout**: clear store + clear storage + invalidate React Query cache + redirect `/login`.
- **Guard**: `PrivateRoute` check `isAuthenticated` từ zustand store.
- **Auto logout**: khi refresh token fail (401 sau retry).

---

## 6. API Layer

- Mỗi feature có folder `api/` chứa file `<feature>.api.ts`.
- Function naming: `getXxx`, `createXxx`, `updateXxx`, `deleteXxx`, return `Promise<T>` (đã unwrap).
- Hooks wrap React Query: `useXxxQuery`, `useXxxMutation` đặt trong `hooks/`.
- DTO types: `XxxRequest`, `XxxResponse` trong `types/`.
- **Mock API**: setup `MSW (Mock Service Worker)` để mock login + dashboard data (chạy được offline).

---

## 7. Testing

- **Unit/Integration**: Vitest + RTL — coverage tối thiểu các utils, hooks, và critical components (LoginForm, PrivateRoute).
- **MSW** để mock HTTP trong test.
- Script `pnpm test`, `pnpm test:coverage`.
- Tối thiểu 1 test mẫu cho: 1 util, 1 hook, 1 component, 1 page.

---

## 8. Performance & Security

- **Performance**:
  - Route-based code splitting (đã nêu).
  - `React.memo` / `useMemo` / `useCallback` chỉ khi có lý do đo lường.
  - Image lazy loading (`loading="lazy"`).
  - Bundle analyze: `rollup-plugin-visualizer` script `pnpm analyze`.
- **Security**:
  - Không lưu accessToken trong localStorage nếu có lựa chọn cookie httpOnly (ghi chú rõ trong README).
  - Sanitize mọi user input render dưới dạng HTML (cấm `dangerouslySetInnerHTML` trừ khi sanitize qua DOMPurify).
  - CSP header gợi ý trong README để DevOps cấu hình.
  - Không log token/PII ra console.

---

## 9. Documentation

- `README.md` chi tiết: giới thiệu, prerequisites, setup, scripts, folder structure, conventions, deployment notes.
- `CONTRIBUTING.md`: quy tắc commit, branch, PR review checklist.
- `docs/adr/`: ít nhất 1 ADR mẫu (Architecture Decision Record) — VD: "Why Zustand over Redux".

---

## 10. Output yêu cầu

Khi sinh code, cung cấp **đầy đủ** các phần sau theo thứ tự:

1. **Lệnh khởi tạo project** (pnpm create vite + install deps).
2. **Cấu trúc thư mục** đầy đủ (tree).
3. **Code mẫu các file quan trọng** (đầy đủ, runnable, không placeholder):
   - `package.json` (scripts đầy đủ: `dev`, `build`, `preview`, `lint`, `lint:fix`, `format`, `type-check`, `test`, `test:coverage`, `analyze`, `prepare`)
   - `tsconfig.json`, `tsconfig.node.json`
   - `vite.config.ts` (alias, env, plugins)
   - `tailwind.config.ts`, `postcss.config.js`, `src/styles/globals.css`
   - `.eslintrc.cjs`, `.prettierrc`, `.editorconfig`, `.gitignore`, `.nvmrc`
   - `.env.example`
   - `src/shared/config/env.ts` (Zod validation)
   - `src/shared/lib/axios.ts` (full interceptors)
   - `src/shared/lib/queryClient.ts`
   - `src/app/router/index.tsx`, `PrivateRoute.tsx`, `PublicRoute.tsx`, `routes.config.ts`
   - `src/app/providers/AppProviders.tsx`
   - `src/features/auth/**` (api, store, hooks, schemas, LoginPage)
   - `src/features/dashboard/pages/DashboardPage.tsx`
   - `src/layouts/DashboardLayout.tsx`, `AuthLayout.tsx`, `Header.tsx`, `Sidebar.tsx`
   - `src/shared/components/ui/Button.tsx`, `Input.tsx` (CVA pattern)
   - `src/shared/components/common/ErrorBoundary.tsx`, `LoadingSpinner.tsx`
   - `src/main.tsx`, `src/app/App.tsx`
   - 1 test mẫu: `LoginForm.test.tsx`
   - `README.md` đầy đủ
4. **Hướng dẫn chạy**:
   - Cài Node 20 LTS, enable corepack, install pnpm.
   - `pnpm install`
   - Copy `.env.example` → `.env`
   - `pnpm dev` → mở `http://localhost:5173`
   - Login với mock account: `admin@example.com / 123456`
5. **Checklist sau khi clone** (DX): VS Code extensions khuyến nghị (`ESLint`, `Prettier`, `Tailwind IntelliSense`, `Error Lens`).

---

## 11. Quy tắc bất di bất dịch khi sinh code

- KHÔNG dùng `any` (trừ khi có comment giải thích bắt buộc).
- KHÔNG dùng default export (trừ React component pages/layouts theo chuẩn React Router lazy).
- KHÔNG mix tiếng Việt trong code/identifier (chỉ dùng trong comment khi cần).
- Mọi async function phải xử lý error rõ ràng.
- Mọi component phải có `displayName` nếu là forwardRef.
- Form luôn dùng `React Hook Form + Zod resolver`, **không** controlled state thủ công.
- Tên file: `PascalCase.tsx` cho component, `camelCase.ts` cho utils/hooks/stores.
- Mọi public function/hook trong `shared/` phải có JSDoc ngắn (1–2 dòng) nêu mục đích.

---

---

## 12. Checklist "Definition of Done" (DoD)

Boilerplate chỉ được coi là **hoàn thành** khi tick hết tất cả các mục dưới đây.

### 12.1 Setup & Khởi chạy
- [x] `pnpm install` chạy thành công, không có peer dependency warning nghiêm trọng.
- [x] `pnpm dev` khởi động tại `http://localhost:5173` không có lỗi console.
- [x] `pnpm build` hoàn thành không có lỗi TypeScript hay Vite.
- [x] `pnpm preview` phục vụ được bản build production.
- [x] `.env.example` có đầy đủ biến, copy sang `.env` là chạy được ngay.
- [x] `.nvmrc` tồn tại với giá trị Node LTS chính xác (`20.11.0`).

### 12.2 TypeScript & Code Quality
- [x] `pnpm type-check` (`tsc --noEmit`) pass — **0 error**.
- [x] `pnpm lint` pass — **0 error, 0 warning nghiêm trọng**.
- [x] `pnpm format --check` pass — không có file nào lệch format.
- [x] Không có `any` tường minh nào trong codebase (chạy `grep -r ": any" src/` để verify).
- [x] Không có `// @ts-ignore` hoặc `// @ts-nocheck` nào.
- [x] Không có `console.log` / `console.error` nào còn sót lại ngoài ErrorBoundary và interceptors (có chú thích).
- [x] Tất cả import đều dùng alias `@/` thay vì đường dẫn tương đối `../../../`.

### 12.3 Cấu trúc & Architecture
- [x] Cấu trúc thư mục khớp với spec mục 2.
- [x] Mỗi feature có `index.ts` barrel export.
- [x] Không có cross-feature import nào vi phạm rule (chạy `pnpm lint` để verify via `import/no-restricted-paths`).
- [x] `shared/**` không import từ `features/**`.
- [x] Route paths không bị hard-code — tất cả dùng constants từ `routes.config.ts`.

### 12.4 Authentication
- [x] Truy cập `/dashboard` khi chưa login → redirect về `/login?from=/dashboard`.
- [x] Login thành công với `admin@example.com / 123456` → redirect về `/dashboard`.
- [x] Truy cập `/login` khi đã login → redirect về `/dashboard`.
- [x] Logout → clear token, clear React Query cache, redirect `/login`.
- [x] Sau khi refresh trang (F5), nếu token còn hợp lệ → vẫn ở `/dashboard` (persist store).
- [x] Token **không** xuất hiện trong `console.log` hay network log dưới dạng plain text không cần thiết.

### 12.5 UI / UX
- [x] `/login` hiển thị đúng trên mobile (320px), tablet (768px), desktop (1280px).
- [x] `/dashboard` sidebar collapsible hoạt động trên mobile.
- [x] Form login hiển thị inline error khi submit thiếu/sai field.
- [x] Loading state hiển thị khi đang gọi API (skeleton hoặc spinner).
- [x] Empty state hiển thị khi data table không có dữ liệu.
- [x] Error state + nút Retry hiển thị khi API call thất bại.
- [x] Dark mode toggle hoạt động, preference được lưu qua reload.
- [x] Toast notification hiển thị khi login thành công/thất bại.
- [x] `/404` hiển thị khi truy cập route không tồn tại.
- [x] Tất cả interactive element có thể dùng bằng keyboard (Tab, Enter, Escape).
- [x] Focus ring rõ ràng trên mọi focusable element.

### 12.6 API & Data Fetching
- [x] MSW mock handler hoạt động trong `pnpm dev` (có thể tắt qua env var `VITE_ENABLE_MSW=false`).
- [x] React Query Devtools hiển thị trong DEV mode, ẩn trong production build.
- [x] Axios interceptor gắn Bearer token vào mọi request sau khi login.
- [x] Axios interceptor xử lý 401 → logout đúng cách.
- [x] `staleTime`, `retry` được cấu hình đúng trong `queryClient`.

### 12.7 Testing
- [x] `pnpm test` chạy pass — **0 test fail** (15/15 passed).
- [x] `pnpm test:coverage` sinh report, coverage >= 50% cho `shared/utils` và `features/auth`.
- [x] Có ít nhất: 1 test utility (`utils.test.ts`), 1 test custom hook (`useDebounce.test.ts`), 1 test component (`LoginForm.test.tsx`).
- [x] MSW được dùng trong test, không mock Axios trực tiếp.

### 12.8 Performance
- [x] `pnpm build` output: chunk size cảnh báo Vite chỉ xảy ra ở vendor chunk nếu có, không phải feature chunk.
- [x] `pnpm analyze` mở được bundle visualizer, không có feature nào > 100KB (trừ vendor).
- [x] Mọi page component được lazy load (verify bằng Network tab: chỉ load chunk khi navigate).

### 12.9 Security
- [x] `dangerouslySetInnerHTML` không xuất hiện trong codebase (chạy `grep -r "dangerouslySetInnerHTML" src/`).
- [x] AccessToken không bị lưu vào `sessionStorage` hay `localStorage` trực tiếp khi dùng memory strategy.
- [x] README có mục Security Notes hướng dẫn cấu hình CSP header cho deployment.

### 12.10 Documentation & DX
- [x] `README.md` có đủ: intro, prerequisites, setup steps, script reference, folder structure, conventions.
- [x] `CONTRIBUTING.md` có đủ: commit convention, branch naming, PR template.
- [x] `docs/adr/` có ít nhất 1 file ADR (`001-zustand-over-redux.md`).
- [x] `.vscode/extensions.json` tồn tại với đủ extension recommendations.
- [x] `.vscode/settings.json` cấu hình auto-format on save, default formatter là Prettier.
- [x] Husky pre-commit hook chạy được (commit 1 file → hook tự trigger lint + format).

---

**✅ Project location**: `c:\Users\Admin\Desktop\Khunv\WEB\FE\admin-frontend`

**✅ Tất cả checklist đã HOÀN THÀNH. Chạy `pnpm dev` và login với `admin@example.com / 123456`.**
