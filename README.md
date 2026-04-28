# Admin Frontend Boilerplate

A production-ready React + TypeScript + Vite admin dashboard boilerplate, built for teams scaling to 10+ developers.

![Dashboard Preview](docs/screenshots/dashboard.png)

## ✨ Features

- ⚡ **Vite 5** with SWC (blazing fast HMR)
- ⚛️ **React 18** + TypeScript 5 (strict mode)
- 🎨 **TailwindCSS 3** with dark mode + design tokens
- 🔐 **JWT Auth** with refresh token rotation
- 🗺️ **React Router 6** data router + route guards
- 📡 **TanStack Query v5** with query key factory pattern
- 🐻 **Zustand** with immer + persist middleware
- 📋 **React Hook Form** + **Zod** validation
- 🎭 **MSW v2** for API mocking (dev + test)
- 🧪 **Vitest** + **Testing Library** (15 tests pass)
- 📦 Feature-based architecture with barrel exports

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>=20.11 LTS` (use [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows))
- **pnpm** `>=9` — install via `npm install -g pnpm`

### Installation

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd voltpark-web

# 2. Use correct Node version (if using nvm)
nvm use

# 3. Install dependencies
pnpm install

# 4. Copy environment file
cp .env.example .env

# 5. Start dev server
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173)

**Mock credentials** — see [Actor Accounts](#-actor-accounts--routes) table below.

## 👥 Actor Accounts & Routes

Each actor has a dedicated layout, navigation tree, and login entry point.

### 🔐 Test Credentials

| Actor | Email | Password | Login URL |
|---|---|---|---|
| **Admin** | `admin@evcharge.vn` | `123456` | `/auth/login` |
| **Owner** | `admin@example.com` | `123456` | `/auth/login` |
| **Staff** | `admin@example.com` | `123456` | `/auth/login` |
| **User** | *(any)* | *(any)* | `/login` |

> The MSW handler (`src/mocks/handlers.ts`) accepts `admin@example.com / 123456`.  
> The admin login form mock accepts `admin@evcharge.vn / 123456`.  
> 2FA verification code: `123456`.

---

### 🛡️ Admin — `/auth/login` → `/dashboard`

Auth flow: `/auth/login` → `/auth/verify-2fa` → `/dashboard`

| Route | Description |
|---|---|
| `/auth/login` | Đăng nhập admin |
| `/auth/forgot-password` | Khôi phục mật khẩu |
| `/auth/verify-2fa` | Xác thực 2 bước |
| `/dashboard` | NOC Dashboard — KPI, charts, map, alert feed |
| `/stations` | Danh sách trạm sạc |
| `/stations/:id` | Chi tiết trạm |
| `/chargers` | Danh sách bộ sạc |
| `/chargers/:id` | Chi tiết bộ sạc + event log |
| `/analytics` | Phân tích doanh thu & sử dụng |
| `/users` | Quản lý người dùng |
| `/users/:id` | Hồ sơ người dùng + lịch sử giao dịch |
| `/alerts` | Cảnh báo hệ thống |
| `/audit-log` | Nhật ký hành động admin |
| `/notifications` | Thông báo |
| `/profile` | Hồ sơ admin |
| `/settings` | Cài đặt hệ thống (giá, API, bảo mật) |

---

### 🏢 Owner — `/auth/login` → `/owner/dashboard`

| Route | Description |
|---|---|
| `/owner/dashboard` | Tổng quan chủ trạm |
| `/owner/parkings` | Quản lý bãi đỗ |
| `/owner/parkings/:id` | Chi tiết bãi đỗ |
| `/owner/chargers` | Bộ sạc của owner |
| `/owner/chargers/:id` | Chi tiết bộ sạc |
| `/owner/sessions` | Phiên sạc |
| `/owner/sessions/:id` | Chi tiết phiên sạc |
| `/owner/reservations` | Đặt chỗ |
| `/owner/customers` | Khách hàng |
| `/owner/customers/:id` | Hồ sơ khách hàng |
| `/owner/feedback` | Phản hồi |
| `/owner/promotions` | Khuyến mãi |
| `/owner/revenue` | Doanh thu |
| `/owner/payouts` | Thanh toán |
| `/owner/pricing` | Giá cước |
| `/owner/staff` | Nhân viên |
| `/owner/staff/schedule` | Lịch ca |
| `/owner/staff/:id` | Hồ sơ nhân viên |
| `/owner/maintenance` | Bảo trì |
| `/owner/reports` | Báo cáo |
| `/owner/notifications` | Thông báo |
| `/owner/settings` | Cài đặt |
| `/owner/profile` | Hồ sơ owner |

---

### 👷 Staff — `/auth/login` → `/staff/home`

| Route | Description |
|---|---|
| `/staff/home` | Trang chủ nhân viên |
| `/staff/slots/:id` | Chi tiết slot |
| `/staff/sessions` | Phiên sạc |
| `/staff/sessions/new` | Tạo phiên mới |
| `/staff/sessions/:id` | Chi tiết phiên |
| `/staff/scan` | Quét QR |
| `/staff/customers` | Khách hàng |
| `/staff/customers/:id` | Hồ sơ khách |
| `/staff/tasks` | Nhiệm vụ |
| `/staff/tasks/:id` | Chi tiết nhiệm vụ |
| `/staff/report` | Báo cáo |
| `/staff/report/history` | Lịch sử báo cáo |
| `/staff/emergency` | Sự cố khẩn cấp |
| `/staff/shift` | Ca làm việc |
| `/staff/shift/handover` | Bàn giao ca |
| `/staff/notifications` | Thông báo |
| `/staff/me` | Hồ sơ nhân viên |
| `/staff/me/sync` | Hàng đợi đồng bộ |

---

### 📱 User (End Customer) — `/login` → `/map`

| Route | Description |
|---|---|
| `/login` | Đăng nhập người dùng |
| `/signup` | Đăng ký tài khoản |
| `/forgot-password` | Khôi phục mật khẩu |
| `/reset-password` | Đặt lại mật khẩu |
| `/verify-email` | Xác thực email |
| `/onboarding` | Onboarding |
| `/map` | Bản đồ tìm trạm sạc |
| `/stations` | Danh sách trạm |
| `/stations/:id` | Chi tiết trạm |
| `/trip-planner` | Lên kế hoạch chuyến đi |
| `/favorites` | Trạm yêu thích |
| `/bookings` | Đặt chỗ của tôi |
| `/bookings/new` | Đặt chỗ mới |
| `/charging` | Dashboard sạc |
| `/charging/live` | Phiên sạc đang diễn ra |
| `/charging/sessions/:id` | Chi tiết phiên sạc |
| `/wallet` | Ví điện tử |
| `/wallet/topup` | Nạp tiền |
| `/wallet/methods` | Phương thức thanh toán |
| `/wallet/transactions` | Lịch sử giao dịch |
| `/vouchers` | Voucher |
| `/loyalty` | Điểm thưởng |
| `/referral` | Giới thiệu bạn bè |
| `/reviews` | Đánh giá của tôi |
| `/notifications` | Thông báo |
| `/support` | Trung tâm hỗ trợ |
| `/support/tickets` | Phiếu hỗ trợ |
| `/support/tickets/new` | Tạo phiếu mới |
| `/support/tickets/:id` | Chi tiết phiếu |
| `/support/chat` | Chat trực tiếp |
| `/profile` | Hồ sơ người dùng |
| `/profile/vehicles` | Xe của tôi |
| `/profile/security` | Bảo mật |
| `/profile/connected` | Tài khoản liên kết |
| `/profile/kyc` | Xác thực danh tính |
| `/profile/privacy` | Quyền riêng tư |
| `/profile/preferences` | Tùy chọn |

---

### 🌐 Marketing (Public) — `/`

| Route | Description |
|---|---|
| `/` | Landing page |
| `/pricing` | Bảng giá |
| `/about` | Giới thiệu |
| `/faq` | Câu hỏi thường gặp |
| `/contact` | Liên hệ |
| `/terms` | Điều khoản sử dụng |
| `/privacy` | Chính sách bảo mật |
| `/cookies` | Chính sách cookie |
| `/blog` | Blog |
| `/blog/:slug` | Bài viết |

---

## 📜 Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server (http://localhost:5173) |
| `pnpm build` | Type-check + production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint (0 warnings allowed) |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm format` | Format with Prettier |
| `pnpm format:check` | Check formatting (CI) |
| `pnpm type-check` | Run `tsc --noEmit` |
| `pnpm test` | Run test suite (Vitest) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Generate coverage report |
| `pnpm analyze` | Open bundle visualizer |

## 📁 Folder Structure

```
src/
├── app/                    # App-level setup
│   ├── providers/          # QueryClientProvider, etc.
│   ├── router/             # Routes, guards, route constants
│   └── App.tsx
├── features/               # Feature modules (isolated)
│   ├── auth/               # Login, auth store, hooks
│   └── dashboard/          # Dashboard stats & tables
├── layouts/                # DashboardLayout, AuthLayout
│   └── components/         # Header, Sidebar, Breadcrumb
├── shared/                 # Shared utilities (no feature imports!)
│   ├── components/
│   │   ├── ui/             # Button, Input (CVA pattern)
│   │   └── common/         # ErrorBoundary, LoadingSpinner
│   ├── config/             # env.ts (Zod-validated)
│   ├── constants/          # App & API constants
│   ├── hooks/              # useDebounce, useMediaQuery...
│   ├── lib/                # axios, queryClient, utils
│   └── types/              # ApiResponse<T>, Paginated<T>...
├── styles/                 # globals.css (Tailwind + CSS vars)
├── mocks/                  # MSW handlers (browser + server)
├── pages/                  # Standalone pages (404)
└── test/                   # Test setup
```

## 🔒 Authentication Flow

1. User submits login form → `POST /auth/login`
2. MSW returns `{ accessToken, refreshToken, user }`
3. `accessToken` stored **in-memory** (Zustand), never in localStorage
4. `refreshToken` persisted to `localStorage` (see Security Notes)
5. Axios interceptor attaches `Authorization: Bearer <token>` on every request
6. On 401 → refresh token flow → retry once → logout if fails

## 🏗️ Architecture Rules

- **Cross-feature imports are forbidden**: `features/dashboard` cannot import from `features/auth` internals — only via `index.ts` barrel.
- **`shared/` cannot import from `features/`**.
- All route paths use constants from `routes.config.ts` — never hard-coded strings.
- All async functions must handle errors explicitly.
- No `any` types — enforced by ESLint.

## 🔐 Security Notes

> **Important**: The current boilerplate stores `refreshToken` in `localStorage` for simplicity. This is susceptible to XSS attacks.
>
> **For production**, migrate to `httpOnly` cookies:
> - Set `Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict` from the backend
> - Remove the `localStorage` persist from the auth store
> - The `accessToken` stays in-memory (already secure)

### Recommended CSP Header (ask your DevOps to configure):
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data: blob:;
  connect-src 'self' <your-api-url>;
```

### Security Checklist
- [x] `dangerouslySetInnerHTML` not used anywhere
- [x] `accessToken` never logged or stored in localStorage
- [x] All user inputs validated via Zod before use
- [x] CSP documentation provided above

## 🧩 VS Code Setup

Install recommended extensions when prompted, or manually:
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **Error Lens** (`usernamehw.errorlens`)
- **Vitest** (`vitest.explorer`)

Auto-format on save is enabled via `.vscode/settings.json`.

## 🚢 Deployment Notes

1. Set production env variables in your CI/CD:
   - `VITE_API_BASE_URL=https://api.yourdomain.com/api/v1`
   - `VITE_ENABLE_MSW=false`
   - `VITE_ENABLE_DEVTOOLS=false`
2. Run `pnpm build` → output in `dist/`
3. Serve `dist/` as a static site (Nginx, Cloudflare Pages, Vercel, etc.)
4. Configure your server to redirect all routes to `index.html` (SPA fallback)

---

Built with ❤️ by the Frontend Team
