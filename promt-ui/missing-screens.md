You are a senior frontend architect specializing in Smart City & IoT platforms.

Your task: Implement the MISSING or INCOMPLETE screens in the existing Vite + React 18 +
TypeScript project for the EV Charging Parking Management System (voltpark-web).

The project already has 4 role modules (ADMIN, OWNER, STAFF, USER) with most screens built.
You must implement ONLY the specific screens listed below — do NOT modify anything else.

═══════════════════════════════════════════════════════
PROJECT ORIENTATION (read carefully before coding)
═══════════════════════════════════════════════════════

Tech stack (inherit — no substitutions):
  - Framework:  React 18 + Vite + React Router DOM v6
  - Language:   TypeScript strict, no `any`
  - Styling:    Tailwind v3 + shadcn/ui (Radix UI primitives in @/shared/components/ui/)
  - Forms:      react-hook-form + zod
  - State:      Zustand for global state, nuqs for URL params, React.useState for local
  - Icons:      lucide-react ONLY
  - i18n:       i18next (Vietnamese default)
  - Toast:      sonner (import { toast } from 'sonner')

Router file: src/app/router/index.tsx  (add new routes here)
Constants:   src/lib/constants.ts      (add route constants here)
Types:       src/types/index.ts        (add new interfaces here)

Design system — color accent per role:
  admin  → sky-500   (#0EA5E9)   --color-admin-accent
  owner  → emerald-500 (#10B981) --color-owner-accent
  staff  → violet-600 (#7C3AED)  --color-staff-accent
  user   → indigo-600 (#4F46E5)  --color-user-accent

Mock user context (src/lib/mock-user.ts equivalent):
  currentUserId:    "USR-001"
  name:             "Trần Thị Hương"
  walletBalance:    285000
  loyaltyPoints:    1240
  defaultVehicleId: "EV-001"

═══════════════════════════════════════════════════════
SCREENS TO IMPLEMENT
═══════════════════════════════════════════════════════

──────────────────────────────────────────────────────
BLOCK A — USER ROLE  (accent: indigo-600)
Layout: src/features/user/layout/UserLayout.tsx
──────────────────────────────────────────────────────

A1. XE CỦA TÔI — Add/Edit Vehicle Modal
  File:    src/features/user/profile/pages/MyVehiclesPage.tsx  (already exists)
  Problem: "Thêm xe" and "Chỉnh sửa" buttons exist but have NO form behind them.
  Task:
    • Create a Sheet/Dialog component <VehicleFormSheet> in
      src/features/user/profile/components/VehicleFormSheet.tsx
    • Fields (react-hook-form + zod):
        - Tên xe (required)                    → text input
        - Biển số (required, VN format regex)  → text input
        - Năm sản xuất (required, 2010–2026)   → number input
        - Cổng sạc chính (required)            → Select: CCS2 / CHAdeMO / AC Type 2 / GB/T
        - Phạm vi ước tính (km, optional)      → number input
        - Đặt làm mặc định                     → Switch
    • Add mode: triggered by "Thêm xe" button (Plus icon) in page header
    • Edit mode: triggered by "Chỉnh sửa" button on each vehicle card
    • On submit: toast.success("Đã lưu xe thành công") and close sheet
    • Delete: ConfirmDialog before removing — toast.success("Đã xóa xe")
    • Mock: mutate local state (no API call needed)

A2. CHECK-IN TẠI TRẠM — New Page
  Files to CREATE:
    src/features/user/checkin/pages/CheckInPage.tsx
    (add route '/checkin' inside UserLayout in src/app/router/index.tsx)
  Context: User arrives at a charging station and needs to activate a charger slot.
  UX flow (single page, 3 steps using a stepper or vertical progress):
    Step 1 — Xác định trạm
      • Large QR scanner placeholder (Button "Quét mã QR trạm" → mock scan success)
      • OR text input "Nhập mã trạm" (e.g. ST001-A3)
      • After confirm: show station name + available slots summary
    Step 2 — Chọn cổng sạc
      • Grid of available connector slots at that station (mock 4–6 slots)
      • Each slot: slot ID, connector type badge, power (kW), status dot
      • Tap to select → highlight selected slot
    Step 3 — Xác nhận & Bắt đầu
      • Summary card: Trạm / Slot / Connector / Estimated cost/kWh
      • CTA button "Bắt đầu sạc" (indigo-600) → navigate to /charging/live
      • Back button per step
  Design: max-w-md mx-auto, centered card layout — feels like a mobile-ready flow
  Note: Reuse design language from MyVehiclesPage (rounded-3xl cards, indigo accent)

A3. CÀI ĐẶT — New User Settings Page
  Files to CREATE:
    src/features/user/settings/pages/SettingsPage.tsx
    (add route '/settings' inside UserLayout)
  Sections (use collapsible accordion or tab-based layout):
    1. Ngôn ngữ & Vùng
       • Language select: Tiếng Việt / English
       • Timezone select: Asia/Ho_Chi_Minh (default, read-only for now)
    2. Thông báo
       • Toggle switches for: Sạc hoàn tất / Thanh toán / Khuyến mãi / Bản tin
       • Toggle: Nhận thông báo qua email / SMS
    3. Hiển thị
       • Theme toggle: Sáng / Tối / Theo hệ thống (Radix Switch or SegmentedControl)
       • Đơn vị khoảng cách: km / miles
    4. Bảo mật
       • Link to /profile/security (not inline — just a navigation row with ChevronRight)
    5. Dữ liệu & Quyền riêng tư
       • Link to /profile/privacy
       • "Xóa tài khoản" danger zone (red text + ConfirmDialog, no real action)
  Design: list-style settings page, max-w-2xl, each row is 56px tall with label + control

A4. ĐĂNG XUẤT — Wire Logout to Existing UI
  Context: No logout action is currently wired anywhere.
  Task (do NOT create a new page):
    • Find the user menu / avatar dropdown in UserLayout's header
      (likely src/features/user/layout/UserLayout.tsx or a header component)
    • Add a "Đăng xuất" menu item with LogOut icon (lucide-react)
    • onClick: clear auth state (Zustand store or mock), navigate('/login'),
      toast.info("Đã đăng xuất")
    • Visual: red text + LogOut icon, separated by a Separator above it

A5. SẠC NGAY — Improve ChargingDashboardPage Entry UX
  File:    src/features/user/charging/pages/ChargingDashboardPage.tsx  (already exists)
  Problem: Page title is "Trình điều khiển sạc" (too technical) and the primary CTA
           "Sạc ngay" is not prominent enough.
  Task:
    • Rename page heading to "Sạc xe" with subtitle "Bắt đầu hoặc theo dõi phiên sạc"
    • Add a hero CTA section at the very top (before any stats):
        ┌─────────────────────────────────────────────────────┐
        │  🔋 Bạn muốn sạc ngay?                              │
        │  Quét QR hoặc nhập mã trạm để bắt đầu              │
        │  [  Sạc ngay →  ]   (indigo-600, large, full-width) │
        └─────────────────────────────────────────────────────┘
      Button "Sạc ngay" navigates to /checkin
    • Keep existing charging stats/history below the hero section

A6. XEM THÊM TRẠM SẠC — Improve StationsListPage Filters
  File:    src/features/user/discovery/pages/StationsListPage.tsx  (already exists)
  Problem: Basic list exists but lacks filtering, sorting, and distance-aware UX.
  Task — add a filter toolbar row below the search bar:
    • Filter by connector type: All / CCS2 / CHAdeMO / AC Type 2 (Pills/ToggleGroup)
    • Filter by availability: Tất cả / Đang trống / Có sẵn DC Fast
    • Sort by: Gần nhất / Đánh giá cao / Mới nhất  (Select)
    • "Xem trên bản đồ" button → navigate to /map
    • Apply filters to the mock MOCK_STATIONS array (client-side filtering)
  Result count: "Tìm thấy X trạm sạc" updates reactively

──────────────────────────────────────────────────────
BLOCK B — ADMIN ROLE  (accent: sky-500)
Layout: src/layouts/AdminLayout.tsx
──────────────────────────────────────────────────────

B1. TÁCH TRANG TRẠM SẠC ADMIN vs USER — Route Conflict Fix
  Problem: Both Admin and User use path '/stations' but inside different Layouts.
  React Router resolves this by matching the FIRST route that fits, which means
  the Admin StationsListPage (src/features/stations/pages/StationsListPage.tsx) and
  the User StationsListPage (src/features/user/discovery/pages/StationsListPage.tsx)
  may collide because both are under path '/stations' with PrivateRoute wrappers
  that do not check role — they only check isAuthenticated.
  Task:
    • In src/app/router/index.tsx: move all Admin routes to prefix /admin/
      i.e. /admin/dashboard, /admin/stations, /admin/stations/:id, /admin/chargers, etc.
    • Update ROUTES constants in src/lib/constants.ts to reflect /admin/* prefix
    • Update all Link, useNavigate, and navigate() calls within admin feature files to
      use the new /admin/* paths (grep for ROUTES.STATIONS, ROUTES.DASHBOARD etc.)
    • AdminLayout: update sidebar nav links to /admin/* paths
    • Auth redirect after login: send admin users to /admin/dashboard
    • Do NOT change owner (/owner/*) or staff (/staff/*) routes — they are already prefixed

B2. HỒ SƠ CÁ NHÂN ADMIN — Complete ProfilePage
  File:    src/features/system/pages/ProfilePage.tsx  (already exists, partial)
  Current: Shows basic form fields (name, email, password fields) with MOCK_ADMIN_PROFILE.
  Task — add missing sections:
    • Avatar upload placeholder (Camera icon overlay on avatar circle, no real upload)
    • Thông tin cá nhân section: Họ tên, Email (read-only), Số điện thoại, Chức vụ
    • Đổi mật khẩu section:
        - Mật khẩu hiện tại / Mật khẩu mới / Xác nhận mật khẩu
        - zod validation: min 8 chars, must match confirm
        - Submit → toast.success("Đã cập nhật mật khẩu")
    • Bảo mật 2 lớp section:
        - Toggle enable/disable 2FA (ShieldCheck icon)
        - When enabled: show a mock QR code placeholder + backup codes list
    • Phiên đăng nhập section:
        - Table of last 3 sessions: Device / IP / Time / Active badge
        - "Đăng xuất tất cả thiết bị khác" button (danger)

──────────────────────────────────────────────────────
BLOCK C — OWNER ROLE  (accent: emerald-500)
Layout: src/layouts/OwnerLayout.tsx
Prefix: /owner/*
──────────────────────────────────────────────────────

C1. THÊM NHÂN VIÊN — Add Staff Modal/Sheet
  File:    src/features/owner/staff/pages/StaffListPage.tsx  (button exists, no form)
  Task:
    • Create src/features/owner/staff/components/AddStaffSheet.tsx
    • Trigger: "Thêm nhân viên" button (UserPlus icon) in StaffListPage header
    • Form fields (react-hook-form + zod):
        - Họ và tên (required)
        - Email (required, valid email)
        - Số điện thoại (required, VN format)
        - Chức vụ (required) → Select: Quản lý / Vận hành / Kỹ thuật viên
        - Bãi đỗ phân công (required) → Select from getOwnerParkings()
        - Ca làm việc (required) → Select: Sáng / Chiều / Đêm / Xoay ca
    • On submit: add to local MOCK_STAFF array, toast.success("Đã thêm nhân viên"),
      close sheet, table refreshes
    • Sheet width: max-w-lg, title "Thêm nhân viên mới"

C2. PHÂN CA MỚI — Assign Shift Dialog
  File:    src/features/owner/staff/pages/SchedulePage.tsx  (grid exists, Plus button has no action)
  Task:
    • Create src/features/owner/staff/components/AssignShiftDialog.tsx (Dialog, not Sheet)
    • Trigger: "Phân ca" button (Plus icon) at top of SchedulePage
    • Form fields:
        - Nhân viên (required) → Select from MOCK_STAFF filtered by parking
        - Bãi đỗ (required) → Select from getOwnerParkings()
        - Ca (required) → Select: Ca sáng 06:00–14:00 / Ca chiều 14:00–22:00 / Ca đêm 22:00–06:00
        - Ngày áp dụng (required) → date input, default today
        - Lặp lại → Select: Không lặp / Hàng tuần / Hàng ngày
        - Ghi chú (optional) → textarea
    • On submit: toast.success("Đã phân ca thành công"), update local schedule state
    • Dialog width: max-w-md

C3. TẠO YÊU CẦU BẢO TRÌ — Create Maintenance Request Modal
  File:    src/features/owner/maintenance/pages/MaintenancePage.tsx  (list + button exists)
  Task:
    • Create src/features/owner/maintenance/components/CreateMaintenanceSheet.tsx
    • Trigger: "Tạo yêu cầu mới" button (Plus icon)
    • Form fields (react-hook-form + zod):
        - Loại yêu cầu (required) → Select:
            Sửa chữa trụ sạc / Bảo dưỡng định kỳ / Lỗi phần mềm / Cơ sở hạ tầng / Khác
        - Bãi đỗ (required) → Select from getOwnerParkings()
        - Mã trụ sạc (optional) → text input (e.g. CHG-001)
        - Mức độ ưu tiên (required) → RadioGroup: Khẩn cấp / Bình thường / Thấp
        - Mô tả chi tiết (required, min 20 chars) → textarea
        - Đính kèm ảnh (optional) → file input placeholder (no real upload)
    • On submit: prepend new request to MOCK_REQUESTS with status='submitted',
      toast.success("Yêu cầu đã được gửi"), close sheet
    • Sheet width: max-w-xl

C4. XEM CHI TIẾT BẢO TRÌ — New Maintenance Detail Page
  Files to CREATE:
    src/features/owner/maintenance/pages/MaintenanceDetailPage.tsx
    (add route 'maintenance/:id' in owner routes in src/app/router/index.tsx)
  Also update MaintenancePage.tsx: make each request Card clickable →
    navigate(`/owner/maintenance/${req.id}`)
  Page layout (single column, max-w-3xl):
    • PageHeader: back button "← Danh sách" + ID badge (e.g. #MT-001)
    • Status timeline (vertical stepper):
        submitted → assigned → in_progress → resolved → closed
        Show current step highlighted in emerald
    • Detail card sections:
        - Thông tin yêu cầu: loại, mức độ, bãi đỗ, trụ sạc, ngày tạo
        - Mô tả: full description text
        - Người xử lý: assigned technician name + avatar placeholder
        - Lịch sử cập nhật: mock 2–3 timeline entries (Date + Status + note)
    • Action buttons (bottom):
        - Cập nhật trạng thái (owner can push to next status)
        - Hủy yêu cầu (only if status === 'submitted', with ConfirmDialog)
    • Mock data: derive detail from MOCK_REQUESTS by ID

──────────────────────────────────────────────────────
BLOCK D — STAFF ROLE  (accent: violet-600)
Layout: src/features/staff/layout/StaffLayout.tsx
Prefix: /staff/*
──────────────────────────────────────────────────────

D1. THÊM PHIÊN SẠC MỚI — Complete StaffNewSessionPage
  File:    src/features/staff/sessions/pages/StaffNewSessionPage.tsx  (4-step shell exists)
  Current: Stepper UI is built, but steps have static mock data and no real state.
  Task — wire the 4 steps with actual form state:

  Step 1 — Chọn Slot:
    • Import slot mock data from mocks or create MOCK_SLOTS array with:
        { id: 'A1', zone: 'A', charger: 'CHG-001', connectorType: 'CCS2', power: '50kW',
          status: 'available' }
      Show only slots with status === 'available'
    • selectedSlot state (useState) — selecting a slot auto-advances to step 2
    • QR scan button: mock toast.info("Đã quét: Slot A3") and select that slot

  Step 2 — Khách hàng:
    State: customerType: 'app' | 'walkin'
    App customer sub-flow:
      • Button "Quét QR ví" → mock: show customer card
          { name: 'Trần Thị Hương', phone: '0901234567', wallet: '285,000đ', plate: '51A-123.45' }
      • Customer card: avatar initial + name + wallet balance + plate
    Walk-in sub-flow (Khách vãng lai):
      • react-hook-form fields: biển số xe (required) + SĐT (optional)
      • Separate walk-in into its own component <WalkInCustomerForm>
        at src/features/staff/sessions/components/WalkInCustomerForm.tsx
    After customer confirmed: "Tiếp tục" enables and step 3 unlocks

  Step 3 — Thanh toán:
    • selectedPayment state
    • Radio options: Tiền mặt / QR VNPay / Trừ ví (disabled if walkin)
    • If QR VNPay selected: show a mock QR image placeholder (gray box 180×180)
    • Estimated cost display: "~45,000đ / 30 phút ước tính"

  Step 4 — Xác nhận:
    • Summary derived from Steps 1–3 state (not hardcoded)
    • "Bắt đầu sạc" button: toast.success("Phiên sạc đã bắt đầu!"),
      navigate to /staff/sessions

D2. KHÁCH WALK-IN — Dedicated Walk-In Customer Page
  File to CREATE:
    src/features/staff/customers/pages/StaffWalkInPage.tsx
    (add route '/staff/walkin' in staff routes)
  Also add a quick-access button "Khách vãng lai" in StaffHomePage
    (or in the sessions list header as a secondary CTA)
  Purpose: Staff can register a walk-in customer WITHOUT starting a charging session
    (e.g. for parking only, or pre-registration)
  Page layout (max-w-2xl, single card):
    • Header: "Đăng ký khách vãng lai" + subtitle
    • Form (react-hook-form + zod):
        - Biển số xe (required, VN format regex [0-9]{2}[A-Z]{1,2}-[0-9]{3,4}\.[0-9]{2})
        - Loại xe → Select: Xe điện / Xe xăng / Xe hybrid
        - Số điện thoại (optional)
        - Bãi đỗ → read-only (pre-filled from assignedParkingId = "ST001")
        - Slot đỗ → Select from available slots
        - Thời gian vào (datetime-local, default = now)
        - Ghi chú (optional)
    • Submit: "Đăng ký vào bãi" (violet-600)
        → toast.success("Đã đăng ký vào lúc HH:mm")
        → navigate back to /staff/home
    • Quick-start link: "Tạo phiên sạc ngay →" (link to /staff/sessions/new)
  Design: clean single-column form, generous spacing, large touch targets

═══════════════════════════════════════════════════════
IMPLEMENTATION CONSTRAINTS
═══════════════════════════════════════════════════════

1. NEVER modify existing working screens outside the files listed above.
2. For every new route added in src/app/router/index.tsx:
     - Add a React.lazy() import at the top of the file
     - Add the route inside the correct parent (UserLayout / AdminLayout / OwnerLayout / StaffLayout)
     - Add the path constant to src/lib/constants.ts
3. For every new form: use react-hook-form + zod resolver. No uncontrolled inputs.
4. All new Dialogs / Sheets must be dismissible (Escape key + backdrop click).
5. Mock data mutations: always use React.useState with a setter — never mutate const arrays.
6. Dark mode: every new component must work in dark: variants (test with dark:bg-, dark:text-).
7. TypeScript: no `any`. Add new interfaces to src/types/index.ts.
8. Do NOT install new packages — use only what is already in package.json.

═══════════════════════════════════════════════════════
DELIVERY ORDER (implement in this sequence)
═══════════════════════════════════════════════════════

Priority 1 (blocking UX):
  B1 — Admin route prefix fix (prevents route collision)
  D1 — Complete StaffNewSessionPage (already has shell, just needs wiring)

Priority 2 (high user value):
  A2 — User Check-in page (new flow)
  C4 — Owner Maintenance detail page (missing route)
  C3 — Owner Create maintenance request form

Priority 3 (completeness):
  A1 — User Add/Edit Vehicle form
  A3 — User Settings page
  A4 — User Logout wiring
  C1 — Owner Add Staff sheet
  C2 — Owner Assign Shift dialog
  D2 — Staff Walk-in customer page

Priority 4 (polish):
  A5 — Improve Charging Dashboard CTA
  A6 — Improve Stations list filters
  B2 — Complete Admin Profile page
