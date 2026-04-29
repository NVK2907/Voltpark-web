You are a senior frontend engineer specializing in Smart City & IoT platforms.

Your task: Fix all bugs AND implement all missing screens in the voltpark-web project.
Work in ORDER: Phase 0 (bugs) → Phase 1 → Phase 2 → Phase 3 → Phase 4.
Do NOT skip phases. Do NOT modify files outside those listed in each task.

═══════════════════════════════════════════════════════
PROJECT CONTEXT
═══════════════════════════════════════════════════════

Stack (no substitutions):
  Framework:  React 18 + Vite + React Router DOM v6
  Language:   TypeScript strict — no `any`, interfaces in src/types/index.ts
  Styling:    Tailwind v3 + shadcn/ui (Radix UI via @/shared/components/ui/)
  Forms:      react-hook-form + zod resolver
  State:      Zustand (global) · nuqs (URL params) · useState (local)
  Icons:      lucide-react ONLY
  Toast:      sonner  →  import { toast } from 'sonner'
  i18n:       i18next, Vietnamese default

Key file locations:
  Router:     src/app/router/index.tsx
  Constants:  src/lib/constants.ts
  Types:      src/types/index.ts
  Auth store: src/features/auth/stores/auth.store.ts  (has logout() action)

Role accent colors:
  admin  → indigo-500    #4F46E5    --color-admin-accent
  owner  → indigo-500 #4F46E5   --color-owner-accent
  staff  → indigo-600 #4F46E5   --color-staff-accent
  user   → indigo-600 #4F46E5   --color-user-accent

Mock current user (in lib/mock-user.ts):
  currentUserId: "USR-001"  · name: "Trần Thị Hương"
  walletBalance: 285000     · loyaltyPoints: 1240
  defaultVehicleId: "EV-001"

Mock staff context (in lib/mock-staff.ts):
  currentStaffId: "STF-001"  · assignedParkingId: "ST001"

Mock owner context (in lib/mock-owner.ts):
  currentOwnerId: "OWN001"  · ownsParkings: ["ST001","ST003","ST005"]

═══════════════════════════════════════════════════════
ROOT CAUSE OF 404 ERRORS
═══════════════════════════════════════════════════════

Two conflicting ROUTES objects exist simultaneously:

  src/app/router/routes.config.ts   →  DASHBOARD = '/dashboard'      ← STALE (no route)
  src/lib/constants.ts              →  DASHBOARD = '/admin/dashboard' ← CORRECT

PrivateRoute.tsx and PublicRoute.tsx both import from routes.config.ts.
Result: after any login, PublicRoute redirects to '/dashboard' which has no route → 404.
All Phase 0 fixes must be done before anything else.

════════════════════════════════════════════════════════════════════════
PHASE 0 — BUG FIXES  (do these FIRST — blocking all other work)
════════════════════════════════════════════════════════════════════════

──────────────────────────────────────────────────────
FIX 0-A  CRITICAL · Post-login 404 (route guard imports wrong ROUTES)
──────────────────────────────────────────────────────
Files: src/app/router/PublicRoute.tsx
       src/app/router/PrivateRoute.tsx

PublicRoute.tsx:
  REMOVE:  import { ROUTES } from './routes.config';
  ADD:     import { ROUTES, AUTH_ROUTES } from '@/lib/constants';
  The redirect `<Navigate to={ROUTES.DASHBOARD}>` now resolves to /admin/dashboard ✓

PrivateRoute.tsx:
  REMOVE:  import { ROUTES } from './routes.config';
  ADD:     import { AUTH_ROUTES } from '@/lib/constants';
  Change redirect:
    FROM:  <Navigate to={`${ROUTES.LOGIN}?from=...`} replace />
    TO:    <Navigate to={`${AUTH_ROUTES.LOGIN}?from=${encodeURIComponent(location.pathname)}`} replace />
    // AUTH_ROUTES.LOGIN = '/auth/login'

──────────────────────────────────────────────────────
FIX 0-B  CRITICAL · Admin logout button — no onClick
──────────────────────────────────────────────────────
File: src/layouts/components/Header.tsx  (lines ~100–103)

ADD imports:
  import { useAuthStore } from '@/features/auth';
  import { AUTH_ROUTES } from '@/lib/constants';
  // Already has: import { useNavigate } from 'react-router-dom';

ADD inside component:
  const logout = useAuthStore((s) => s.logout);

CHANGE the Đăng xuất DropdownMenuItem:
  FROM: <DropdownMenuItem className="text-destructive focus:text-destructive">
  TO:
    <DropdownMenuItem
      className="text-destructive focus:text-destructive"
      onClick={() => { logout(); navigate(AUTH_ROUTES.LOGIN); }}
    >

──────────────────────────────────────────────────────
FIX 0-C  CRITICAL · User header dropdown — 4 items with no onClick
──────────────────────────────────────────────────────
File: src/features/user/layout/components/UserHeader.tsx

ADD imports:
  import { useNavigate } from 'react-router-dom';
  import { useAuthStore } from '@/features/auth';
  import { toast } from 'sonner';

ADD inside component:
  const navigate = useNavigate();
  const logout   = useAuthStore((s) => s.logout);

Wire each DropdownMenuItem:
  "Hồ sơ cá nhân"   →  onClick={() => navigate('/profile')}
  "Ví & Thanh toán"  →  onClick={() => navigate('/wallet')}
  "Cài đặt"          →  onClick={() => navigate('/profile/preferences')}
  "Đăng xuất"        →  onClick={() => { logout(); toast.info("Đã đăng xuất"); navigate('/login'); }}

──────────────────────────────────────────────────────
FIX 0-D  CRITICAL · Broken /charging/history link
──────────────────────────────────────────────────────
File: src/features/user/charging/pages/ChargingDashboardPage.tsx  line ~21

Change:
  FROM: <Link to="/charging/history">
  TO:   <Link to="/wallet/transactions">
  // /wallet/transactions exists and shows charge payment history

──────────────────────────────────────────────────────
FIX 0-E  CRITICAL · Broken /checkin link (route not yet created)
──────────────────────────────────────────────────────
File: src/features/user/charging/pages/ChargingDashboardPage.tsx  line ~29

Temporary fix until Phase 1 builds the CheckIn page:
  REMOVE wrapping <Link to="/checkin">
  ADD onClick to the Button:
    onClick={() => toast.info("Tính năng đang phát triển — vui lòng thử lại sau")}
  ADD import: import { toast } from 'sonner';

When CheckInPage is built in Phase 1 (task 1-B), revert this back to <Link to="/checkin">.

──────────────────────────────────────────────────────
FIX 0-F  CRITICAL · Broken marketing footer links
──────────────────────────────────────────────────────
File: src/features/user/layout/MarketingLayout.tsx

Find and fix all links pointing to non-existent routes:
  /features  →  replace <Link to="/features"> with <a href="#" onClick={e => e.preventDefault()}>
  /app       →  same treatment
  /report    →  same treatment
  /support   →  change to <Link to="/contact">  (/contact exists as a marketing page)

──────────────────────────────────────────────────────
FIX 0-G  · "DỪNG SẠC NGAY" — no onClick (ChargingDashboardPage)
──────────────────────────────────────────────────────
File: src/features/user/charging/pages/ChargingDashboardPage.tsx  line ~110

ADD import: import { toast } from 'sonner';
ADD onClick:
  <Button ... onClick={() => toast.success("Phiên sạc đã được dừng")}>
    DỪNG SẠC NGAY
  </Button>

──────────────────────────────────────────────────────
FIX 0-H  · "DỪNG SẠC NGAY" — no onClick (LiveChargingPage)
──────────────────────────────────────────────────────
File: src/features/user/charging/pages/LiveChargingPage.tsx  line ~156

ADD imports: import { useState } from 'react'; import { toast } from 'sonner';
ADD state:   const [stopping, setStopping] = useState(false);
CHANGE button:
  <Button
    className="h-16 w-full rounded-2xl bg-red-500 ..."
    disabled={stopping}
    onClick={() => {
      setStopping(true);
      setTimeout(() => {
        toast.success("Đã dừng sạc. Hóa đơn đang được xử lý...");
        setStopping(false);
      }, 1200);
    }}
  >
    {stopping ? "Đang dừng..." : "DỪNG SẠC NGAY"}
  </Button>

──────────────────────────────────────────────────────
FIX 0-I  · "Chấm công ngay" — no onClick (StaffHomePage)
──────────────────────────────────────────────────────
File: src/features/staff/home/pages/StaffHomePage.tsx  line ~21

ADD imports: import { useState } from 'react'; import { toast } from 'sonner';
ADD state:   const [isClockedIn, setIsClockedIn] = useState(false);
CHANGE button:
  <Button
    className={`w-full font-bold ... ${isClockedIn ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
    onClick={() => {
      const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      setIsClockedIn(!isClockedIn);
      if (!isClockedIn) toast.success(`Đã chấm công vào lúc ${now}`);
      else              toast.info("Đã chấm công ra");
    }}
  >
    {isClockedIn ? "✓ Đã chấm công" : "Chấm công ngay"}
  </Button>

──────────────────────────────────────────────────────
FIX 0-J  · "Phân ca mới" — no onClick (SchedulePage)
──────────────────────────────────────────────────────
File: src/features/owner/staff/pages/SchedulePage.tsx  line ~75

ADD import: import { toast } from 'sonner';
Temporary fix (replace with AssignShiftDialog in Phase 2):
  <Button className="gap-2"
    onClick={() => toast.info("Đang mở dialog phân ca...")}>
    <Plus className="h-4 w-4" /> Phân ca mới
  </Button>

──────────────────────────────────────────────────────
FIX 0-K  · Avatar edit button — no onClick (ProfileOverviewPage)
──────────────────────────────────────────────────────
File: src/features/user/profile/pages/ProfileOverviewPage.tsx  line ~78

ADD import: import { toast } from 'sonner';
ADD onClick:
  <button
    className="absolute -bottom-2 -right-2 ..."
    onClick={() => toast.info("Tính năng thay đổi ảnh đang được phát triển")}
  >

════════════════════════════════════════════════════════════════════════
PHASE 1 — BLOCKING NEW SCREENS
════════════════════════════════════════════════════════════════════════

──────────────────────────────────────────────────────
1-A  ADMIN route prefix — tách route Admin vs User  (was B1)
──────────────────────────────────────────────────────
Problem: Admin routes (/stations, /chargers, …) share the same base path as User routes.
PrivateRoute only checks isAuthenticated (not role), so the wrong layout may render.

Files to modify:
  src/app/router/index.tsx
  src/lib/constants.ts
  src/layouts/AdminLayout.tsx (sidebar nav links)
  src/layouts/components/Header.tsx (nav links)

Task:
  • ROUTES in constants.ts already has /admin/* prefix — verify router children match.
    In index.tsx the admin layout parent is:
      { path: '/', element: <PrivateRoute><AdminLayout /></PrivateRoute>, children: [...] }
    Child paths like ROUTES.DASHBOARD = '/admin/dashboard' are absolute and work.
    VERIFY no child path starts with a bare segment like 'dashboard' (relative, would be /dashboard).
    Fix any child that uses a relative path — make it absolute (/admin/...) OR
    change the parent path to '/admin' and use relative children (dashboard, stations, etc.).
  • Recommended approach: change parent to path: '/admin' and use relative children:
      { path: '/admin', element: ..., children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: ... },
          { path: 'stations', element: ... },
          { path: 'stations/:id', element: ... },
          { path: 'chargers', element: ... },
          { path: 'chargers/:id', element: ... },
          { path: 'analytics', element: ... },
          { path: 'users', element: ... },
          { path: 'users/:id', element: ... },
          { path: 'alerts', element: ... },
          { path: 'audit-log', element: ... },
          { path: 'settings', element: ... },
          { path: 'notifications', element: ... },
          { path: 'profile', element: ... },
        ]
      }
  • ROUTES constants remain /admin/dashboard etc. — used as absolute hrefs in <Link>.

──────────────────────────────────────────────────────
1-B  CHECK-IN TẠI TRẠM — new page  (was A2)
──────────────────────────────────────────────────────
CREATE: src/features/user/checkin/pages/CheckInPage.tsx

3-step stepper flow (useState step: 1 | 2 | 3):

  Step 1 — Xác định trạm:
    • Button "Quét mã QR trạm" (QrCode icon) → onClick: mock scan,
        set stationId = "ST001", stationName = "Vincom Center Landmark 81"
        then auto-advance to step 2
    • OR text input "Nhập mã trạm" + Button "Xác nhận"
    • Show station name + slot summary after confirm

  Step 2 — Chọn cổng sạc:
    • Mock 5 slots: [A1 CCS2 50kW, A2 AC Type2 11kW, A3 CCS2 50kW, B1 CHAdeMO 44kW, B2 CCS2 100kW]
    • Grid of slot cards: slot ID · connector badge · power · green dot if available
    • selectedSlot state — clicking highlights the card (ring-2 ring-indigo-600)
    • "Tiếp tục" button active only when a slot is selected

  Step 3 — Xác nhận:
    • Summary Card: Trạm / Slot / Connector / Giá ước tính (~3,500đ/phút)
    • Button "Bắt đầu sạc" (indigo-600, full-width, h-14):
        onClick → navigate('/charging/live')
    • Back button top-left

Design: max-w-md mx-auto, space-y-6, rounded-3xl cards, indigo accent.
Add to router inside User Authenticated Routes:
  { path: 'checkin', element: withSuspense(<CheckInPage />) }
Add React.lazy import at top of router/index.tsx.
Update FIX 0-E: replace toast with <Link to="/checkin"> once this page is built.

──────────────────────────────────────────────────────
1-C  OWNER · Xem chi tiết bảo trì  (was C4)
──────────────────────────────────────────────────────
CREATE: src/features/owner/maintenance/pages/MaintenanceDetailPage.tsx

Add route inside owner routes:
  { path: 'maintenance/:id', element: withSuspense(<MaintenanceDetailPage />) }

Update MaintenancePage.tsx: make each Card clickable:
  <Card key={req.id} className="cursor-pointer hover:shadow-md transition-shadow"
    onClick={() => navigate(`/owner/maintenance/${req.id}`)}>

Detail page layout (max-w-3xl, space-y-8):
  • Header: Button ArrowLeft → navigate(-1) · Badge with #ID · StatusBadge

  • Status timeline (vertical, 5 steps):
      submitted → assigned → in_progress → resolved → closed
      Current step: emerald dot + ring; past: emerald check; future: slate dot

  • Detail card — 2 columns grid:
      Loại yêu cầu / Mức độ ưu tiên / Bãi đỗ / Mã trụ sạc / Ngày tạo

  • Mô tả: full description in a Card

  • Người xử lý: Avatar initials + name + phone (mock: Nguyễn Văn Kỹ · 0987654321)

  • Lịch sử cập nhật: vertical timeline, 2–3 mock entries
      e.g. "14:30 25/04 — Đã tiếp nhận yêu cầu"
           "09:00 26/04 — Kỹ thuật viên đang xử lý"

  • Action row (bottom):
      - Button "Cập nhật trạng thái" (emerald) → toast.success("Đã cập nhật")
      - Button "Hủy yêu cầu" variant="destructive" — only shown when status==='submitted'
          → ConfirmDialog (import from @/shared/components/common/ConfirmDialog)
          → on confirm: toast.success("Đã hủy yêu cầu"), navigate(-1)

Mock data: find request by useParams().id from MOCK_REQUESTS imported from MaintenancePage.tsx.
Export MOCK_REQUESTS from MaintenancePage.tsx so it can be imported here.

════════════════════════════════════════════════════════════════════════
PHASE 2 — FORMS & MODALS
════════════════════════════════════════════════════════════════════════

──────────────────────────────────────────────────────
2-A  USER · Thêm / Chỉnh sửa xe  (was A1)
──────────────────────────────────────────────────────
CREATE: src/features/user/profile/components/VehicleFormSheet.tsx

Props:
  interface VehicleFormSheetProps {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    vehicle?: Vehicle;            // undefined = Add mode, defined = Edit mode
    onSave: (data: VehicleFormData) => void;
  }

Zod schema:
  const schema = z.object({
    name:          z.string().min(2, "Nhập tên xe"),
    plate:         z.string().regex(/^\d{2}[A-Z]{1,2}-\d{3,4}\.\d{2}$/, "Sai định dạng biển số"),
    year:          z.number().min(2010).max(2026),
    connector:     z.enum(['CCS2','CHAdeMO','AC Type 2','GB/T']),
    range:         z.number().min(0).optional(),
    isDefault:     z.boolean().default(false),
  });

Fields inside Sheet:
  - Tên xe          → Input
  - Biển số         → Input (placeholder: 51A-123.45)
  - Năm sản xuất    → Input type="number"
  - Cổng sạc chính  → Select with 4 options
  - Phạm vi (km)    → Input type="number" (optional)
  - Đặt làm mặc định → Switch (Radix)

Footer: Button "Lưu xe" (indigo-600) + Button "Hủy" variant="outline"

Wire to MyVehiclesPage.tsx:
  - useState for open + selectedVehicle
  - "Thêm xe" button: setOpen(true), setSelectedVehicle(undefined)
  - "Chỉnh sửa" button on card: setOpen(true), setSelectedVehicle(v)
  - onSave: mutate VEHICLES state (useState, not const)

Add Delete: ConfirmDialog before Trash2 button.
  On confirm: filter vehicle out of state, toast.success("Đã xóa xe")

──────────────────────────────────────────────────────
2-B  OWNER · Thêm nhân viên  (was C1)
──────────────────────────────────────────────────────
CREATE: src/features/owner/staff/components/AddStaffSheet.tsx

Sheet (right-side panel, max-w-lg):
  Title: "Thêm nhân viên mới"
  Form (react-hook-form + zod):
    - Họ và tên    → Input, required
    - Email        → Input type="email", required
    - Số điện thoại → Input, regex VN phone
    - Chức vụ      → Select: Quản lý / Vận hành / Kỹ thuật viên
    - Bãi đỗ       → Select from getOwnerParkings()
    - Ca làm việc  → Select: Sáng / Chiều / Đêm / Xoay ca

  Footer: Button "Thêm nhân viên" (emerald) + Button "Hủy"
  onSubmit: push new staff to MOCK_STAFF state (convert to useState in StaffListPage),
            toast.success("Đã thêm nhân viên"), close sheet

Wire to StaffListPage.tsx:
  Convert MOCK_STAFF from const array to useState.
  "Thêm nhân viên" button → setAddSheetOpen(true)

──────────────────────────────────────────────────────
2-C  OWNER · Phân ca mới  (was C2)
──────────────────────────────────────────────────────
CREATE: src/features/owner/staff/components/AssignShiftDialog.tsx

Dialog (centered modal, max-w-md):
  Title: "Phân ca làm việc"
  Form (react-hook-form + zod):
    - Nhân viên      → Select from MOCK_STAFF (name + role)
    - Bãi đỗ         → Select from getOwnerParkings()
    - Ca làm việc    → Select:
        Ca sáng  06:00–14:00
        Ca chiều 14:00–22:00
        Ca đêm   22:00–06:00
    - Ngày áp dụng   → Input type="date", default today
    - Lặp lại        → Select: Không lặp / Hàng tuần / Hàng ngày
    - Ghi chú        → Textarea (optional)

  Footer: Button "Xác nhận phân ca" (emerald) + Button "Hủy"
  onSubmit: toast.success("Đã phân ca thành công"), close dialog

Wire to SchedulePage.tsx:
  Replace FIX 0-J placeholder with: onClick={() => setAssignDialogOpen(true)}

──────────────────────────────────────────────────────
2-D  OWNER · Tạo yêu cầu bảo trì  (was C3)
──────────────────────────────────────────────────────
CREATE: src/features/owner/maintenance/components/CreateMaintenanceSheet.tsx

Sheet (right-side panel, max-w-xl):
  Title: "Tạo yêu cầu bảo trì"
  Form (react-hook-form + zod):
    - Loại yêu cầu   → Select:
        Sửa chữa trụ sạc / Bảo dưỡng định kỳ / Lỗi phần mềm / Cơ sở hạ tầng / Khác
    - Bãi đỗ         → Select from getOwnerParkings()
    - Mã trụ sạc     → Input (optional, e.g. CHG-001)
    - Mức độ         → RadioGroup: Khẩn cấp · Bình thường · Thấp
    - Mô tả chi tiết → Textarea, min 20 chars
    - Đính kèm ảnh   → Input type="file" (disabled, placeholder only)

  Footer: Button "Gửi yêu cầu" (emerald) + Button "Hủy"
  onSubmit: prepend new request (status='submitted') to MOCK_REQUESTS state,
            toast.success("Yêu cầu đã được gửi. Mã: MT-XXX"), close sheet

Wire to MaintenancePage.tsx:
  Convert MOCK_REQUESTS to useState.
  "Tạo yêu cầu mới" button → setCreateSheetOpen(true)

──────────────────────────────────────────────────────
2-E  STAFF · Hoàn thiện StaffNewSessionPage  (was D1)
──────────────────────────────────────────────────────
File: src/features/staff/sessions/pages/StaffNewSessionPage.tsx

Wire all 4 steps with real state (useState — no hardcoded values in summary):

  Top-level state:
    selectedSlot:    { id: string; connectorType: string; power: string } | null
    customerType:    'app' | 'walkin' | null
    scannedCustomer: { name: string; phone: string; wallet: string; plate: string } | null
    walkInData:      { plate: string; phone: string } | null
    paymentMethod:   'cash' | 'qr' | 'wallet' | null

  Step 1 — Chọn Slot:
    MOCK_SLOTS = [
      { id:'A1', zone:'A', charger:'CHG-001', connectorType:'CCS2', power:'50kW', status:'available' },
      { id:'A5', zone:'A', charger:'CHG-005', connectorType:'AC Type 2', power:'11kW', status:'available' },
      { id:'A6', zone:'A', charger:'CHG-006', connectorType:'CCS2', power:'100kW', status:'available' },
      { id:'B2', zone:'B', charger:'CHG-012', connectorType:'CHAdeMO', power:'44kW', status:'available' },
    ]
    Clicking a slot: setSelectedSlot(slot), setStep(2)
    QR button: toast.info("Đã quét: Slot A3"), then setSelectedSlot(MOCK_SLOTS[0]), setStep(2)

  Step 2 — Khách hàng:
    Two buttons: "Khách có ứng dụng" | "Khách vãng lai"
    App flow: Button "Quét QR ví" →
      setScannedCustomer({ name:'Trần Thị Hương', phone:'0901234567', wallet:'285,000đ', plate:'51A-123.45' })
      Show customer card with avatar initials + details
    Walk-in flow: render <WalkInCustomerForm onConfirm={(data) => setWalkInData(data)} />
    "Tiếp tục" disabled until (scannedCustomer || walkInData) is set

  Step 3 — Thanh toán:
    RadioGroup options:
      cash   → Tiền mặt
      qr     → Quét mã QR VNPay
      wallet → Trừ vào ví (disabled={customerType === 'walkin'})
    If paymentMethod === 'qr': show gray 180×180 placeholder box with QrCode icon
    Show: "Ước tính: ~45,000đ / 30 phút"
    "Tiếp tục" disabled until paymentMethod is set

  Step 4 — Xác nhận:
    Summary table (derived from state — NO hardcoded values):
      Slot / Bộ sạc:  `${selectedSlot.id} / ${selectedSlot.charger}`
      Khách hàng:     scannedCustomer?.name ?? `Vãng lai (${walkInData?.plate})`
      Thanh toán:     { cash:'Tiền mặt', qr:'QR VNPay', wallet:'Ví điện tử' }[paymentMethod]
    Button "Bắt đầu sạc" (emerald-600):
      onClick: toast.success("Phiên sạc đã bắt đầu!"), navigate(STAFF_ROUTES.SESSIONS)

  CREATE src/features/staff/sessions/components/WalkInCustomerForm.tsx:
    Props: { onConfirm: (data: { plate: string; phone: string }) => void }
    Fields (react-hook-form):
      Biển số xe (required, VN regex) + Số điện thoại (optional)
    Button "Xác nhận": calls onConfirm(data)

════════════════════════════════════════════════════════════════════════
PHASE 3 — STANDALONE NEW PAGES
════════════════════════════════════════════════════════════════════════

──────────────────────────────────────────────────────
3-A  USER · Cài đặt  (was A3)
──────────────────────────────────────────────────────
CREATE: src/features/user/settings/pages/SettingsPage.tsx
Add route: { path: 'settings', element: withSuspense(<UserSettingsPage />) }
Update UserHeader "Cài đặt" onClick → navigate('/settings')

Layout: max-w-2xl mx-auto space-y-4 p-6. Each section is a Card with CardHeader + CardContent.
Section rows: h-14, flex items-center justify-between, border-b last:border-0.

Sections:
  1. Ngôn ngữ & Vùng
     Row "Ngôn ngữ":     Select  →  Tiếng Việt (default) / English
     Row "Múi giờ":      span read-only "Asia/Ho_Chi_Minh (UTC+7)"

  2. Thông báo
     Row "Sạc hoàn tất":        Switch (default on)
     Row "Thanh toán":           Switch (default on)
     Row "Khuyến mãi":           Switch (default off)
     Row "Bản tin VoltPark":     Switch (default off)
     Row "Nhận qua Email":       Switch (default on)
     Row "Nhận qua SMS":         Switch (default off)

  3. Hiển thị
     Row "Giao diện":     SegmentedControl 3-way: Sáng / Tối / Hệ thống
     Row "Đơn vị":        Select  →  Kilômét / Dặm

  4. Bảo mật
     Navigation row → /profile/security  (ChevronRight icon)

  5. Dữ liệu & Quyền riêng tư
     Navigation row → /profile/privacy  (ChevronRight icon)
     Danger row "Xóa tài khoản":
       Button variant="destructive" → ConfirmDialog
       title: "Xóa tài khoản?" / desc: "Hành động này không thể hoàn tác."
       onConfirm: toast.error("Đã gửi yêu cầu xóa tài khoản")

──────────────────────────────────────────────────────
3-B  STAFF · Khách walk-in  (was D2)
──────────────────────────────────────────────────────
CREATE: src/features/staff/customers/pages/StaffWalkInPage.tsx
Add route: { path: 'walkin', element: withSuspense(<StaffWalkInPage />) }
Add STAFF_ROUTES.WALKIN = '/staff/walkin' to constants.ts

Add quick-access button in StaffHomePage (secondary CTA below "Phiên sạc mới"):
  <Button variant="outline" onClick={() => navigate(STAFF_ROUTES.WALKIN)}>
    Đăng ký khách vãng lai
  </Button>

Page (max-w-2xl mx-auto):
  Header: ArrowLeft back button + "Đăng ký khách vãng lai" heading

  Form card (react-hook-form + zod):
    Biển số xe       → Input, required, regex /^\d{2}[A-Z]{1,2}-\d{3,4}\.\d{2}$/
    Loại xe          → Select: Xe điện / Xe xăng / Xe hybrid
    Số điện thoại    → Input type="tel", optional
    Bãi đỗ           → Input read-only, value "Trạm Quận 1 - Vincom" (assignedParkingId)
    Slot đỗ          → Select from available MOCK_SLOTS (status==='available')
    Thời gian vào    → Input type="datetime-local", default = new Date()
    Ghi chú          → Textarea optional

  Footer row:
    Button "Đăng ký vào bãi" (violet-600, h-12):
      onSubmit: toast.success(`Đã đăng ký vào lúc ${HH:mm}`), navigate(STAFF_ROUTES.HOME)
    Link "Tạo phiên sạc ngay →" → navigate(STAFF_ROUTES.SESSIONS_NEW)

════════════════════════════════════════════════════════════════════════
PHASE 4 — UX POLISH
════════════════════════════════════════════════════════════════════════

──────────────────────────────────────────────────────
4-A  USER · Nâng cấp CTA "Sạc ngay" trong ChargingDashboardPage  (was A5)
──────────────────────────────────────────────────────
File: src/features/user/charging/pages/ChargingDashboardPage.tsx

  1. Change page heading from "Trình điều khiển sạc" → "Sạc xe"
     Subtitle: "Bắt đầu hoặc theo dõi phiên sạc của bạn"

  2. Add hero banner ABOVE existing content:
     <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-500 p-8 text-white shadow-xl">
       <p className="text-sm font-bold uppercase tracking-widest text-indigo-200">Sẵn sàng sạc?</p>
       <h2 className="mt-1 text-3xl font-black">Bắt đầu ngay hôm nay</h2>
       <p className="mt-1 text-indigo-200">Quét QR hoặc nhập mã trạm để bắt đầu phiên sạc</p>
       <Link to="/checkin">
         <Button className="mt-6 h-12 rounded-2xl bg-white px-8 font-black text-indigo-600 hover:bg-indigo-50">
           Sạc ngay <ArrowRight className="ml-2 h-4 w-4" />
         </Button>
       </Link>
     </div>

  3. "Lịch sử sạc" button: already fixed to /wallet/transactions in FIX 0-D ✓

──────────────────────────────────────────────────────
4-B  USER · Filter nâng cao trang Xem thêm trạm sạc  (was A6)
──────────────────────────────────────────────────────
File: src/features/user/discovery/pages/StationsListPage.tsx

Add below the search bar a filter toolbar row:
  State: connectorFilter, availabilityFilter, sortBy

  Connector pills (ToggleGroup or button chips):
    Tất cả | CCS2 | CHAdeMO | AC Type 2
    Active: bg-indigo-600 text-white; Inactive: bg-slate-100 text-slate-600

  Availability Select:
    Tất cả / Đang trống / DC Fast Charge sẵn có

  Sort Select:
    Gần nhất / Đánh giá cao / Mới nhất

  "Xem trên bản đồ" Button → navigate('/map')

Apply filters client-side to MOCK_STATIONS.
Show result count: <p>"Tìm thấy {filtered.length} trạm sạc"</p>

──────────────────────────────────────────────────────
4-C  ADMIN · Hoàn thiện ProfilePage  (was B2)
──────────────────────────────────────────────────────
File: src/features/system/pages/ProfilePage.tsx

Add/complete these sections (keep existing code, add below):

  Avatar section:
    Circular avatar with initials (sky-500 bg) + Camera button overlay
    Camera onClick → toast.info("Tính năng tải ảnh đang phát triển")

  Thông tin cá nhân (react-hook-form):
    Họ tên, Email (read-only), Số điện thoại, Chức vụ
    Submit → toast.success("Đã cập nhật thông tin")

  Đổi mật khẩu (separate react-hook-form):
    Mật khẩu hiện tại / Mới / Xác nhận
    Zod: min 8 chars, new must match confirm
    Submit → toast.success("Đã cập nhật mật khẩu")

  Bảo mật 2 lớp:
    Toggle Switch "Bật xác thực 2 lớp"
    When enabled: show gray 200×200 QR placeholder + 8 backup codes (hardcoded strings)

  Phiên đăng nhập (table):
    3 mock rows: { device, ip, time, isActive }
    e.g. { "Chrome / Windows", "113.160.xx.xx", "Hôm nay 09:12", true }
    Button "Đăng xuất tất cả thiết bị khác" (variant destructive):
      onClick → toast.success("Đã đăng xuất khỏi tất cả thiết bị")

════════════════════════════════════════════════════════════════════════
IMPLEMENTATION RULES (apply to every task)
════════════════════════════════════════════════════════════════════════

1. Every new route: add React.lazy() import + route entry + path constant.
2. Every new form: react-hook-form + zodResolver. No raw <input> without register().
3. Every Dialog/Sheet: must close on Escape key and backdrop click.
4. Mock mutations: always useState — never mutate a const array.
5. Dark mode: every element needs dark: variant counterpart.
6. TypeScript: no `any`. New types go in src/types/index.ts.
7. No new packages — only what is in package.json.
8. Do NOT touch files not listed in a task.

════════════════════════════════════════════════════════════════════════
MASTER CHECKLIST
════════════════════════════════════════════════════════════════════════

Copy this checklist to track progress. Check off each item as completed.

── PHASE 0 — BUG FIXES ─────────────────────────────────────────────

[x] 0-A  PublicRoute.tsx — import từ @/lib/constants, redirect tới /admin/dashboard
[x] 0-A  PrivateRoute.tsx — import AUTH_ROUTES từ @/lib/constants, redirect tới /auth/login
[x] 0-B  Header.tsx (Admin) — wire logout: useAuthStore + navigate('/auth/login')
[x] 0-C  UserHeader.tsx — wire 4 dropdown items: Hồ sơ / Ví / Cài đặt / Đăng xuất
[x] 0-D  ChargingDashboardPage — đổi link "Lịch sử sạc" từ /charging/history → /wallet/transactions
[x] 0-E  ChargingDashboardPage — tạm thời bỏ <Link to="/checkin">, thay bằng toast
[x] 0-F  MarketingLayout — fix links /features, /app, /report, /support không tồn tại
[x] 0-G  ChargingDashboardPage — thêm onClick cho button "DỪNG SẠC NGAY"
[x] 0-H  LiveChargingPage — thêm onClick + loading state cho button "DỪNG SẠC NGAY"
[x] 0-I  StaffHomePage — thêm onClick + toggle state cho button "Chấm công ngay"
[x] 0-J  SchedulePage — thêm onClick tạm (toast) cho button "Phân ca mới"
[x] 0-K  ProfileOverviewPage — thêm onClick cho button chỉnh sửa avatar

── PHASE 1 — BLOCKING NEW SCREENS ──────────────────────────────────

[x] 1-A  Admin route prefix — đổi parent sang path:'/admin', dùng relative children
[x] 1-A  Verify không còn route conflict /stations (admin vs user)
[x] 1-B  Tạo CheckInPage.tsx (3-step: Xác định trạm → Chọn slot → Xác nhận)
[x] 1-B  Thêm route '/checkin' vào User Authenticated Routes trong router/index.tsx
[x] 1-B  Cập nhật FIX 0-E: khôi phục <Link to="/checkin"> trong ChargingDashboardPage
[x] 1-C  Tạo MaintenanceDetailPage.tsx (timeline + detail + action buttons)
[x] 1-C  Thêm route 'maintenance/:id' vào owner routes trong router/index.tsx
[x] 1-C  Cập nhật MaintenancePage.tsx: Card clickable → navigate('/owner/maintenance/:id')
[x] 1-C  Export MOCK_REQUESTS từ MaintenancePage.tsx

── PHASE 2 — FORMS & MODALS ─────────────────────────────────────────

[x] 2-A  Tạo VehicleFormSheet.tsx (Add + Edit mode, zod validation)
[x] 2-A  Cập nhật MyVehiclesPage.tsx: VEHICLES là useState, wire form + delete
[x] 2-B  Tạo AddStaffSheet.tsx (form 6 fields, emerald style)
[x] 2-B  Cập nhật StaffListPage.tsx: MOCK_STAFF là useState, wire sheet
[x] 2-C  Tạo AssignShiftDialog.tsx (form 6 fields, dialog not sheet)
[x] 2-C  Cập nhật SchedulePage.tsx: wire dialog, bỏ toast placeholder từ 0-J
[x] 2-D  Tạo CreateMaintenanceSheet.tsx (form 6 fields, RadioGroup priority)
[x] 2-D  Cập nhật MaintenancePage.tsx: MOCK_REQUESTS là useState, wire sheet
[x] 2-E  Cập nhật StaffNewSessionPage.tsx: wire 4 steps với real state
[x] 2-E  Tạo WalkInCustomerForm.tsx (component con của step 2)

── PHASE 3 — STANDALONE NEW PAGES ───────────────────────────────────

[x] 3-A  Tạo SettingsPage.tsx (5 sections, Switch + Select + ConfirmDialog)
[x] 3-A  Thêm route '/settings' vào User Authenticated Routes
[x] 3-A  Cập nhật UserHeader.tsx "Cài đặt" onClick → navigate('/settings')
[x] 3-B  Tạo StaffWalkInPage.tsx (form đăng ký vãng lai, violet accent)
[x] 3-B  Thêm route 'walkin' vào Staff routes
[x] 3-B  Thêm STAFF_ROUTES.WALKIN = '/staff/walkin' vào constants.ts
[x] 3-B  Thêm button "Đăng ký khách vãng lai" vào StaffHomePage

── PHASE 4 — UX POLISH ──────────────────────────────────────────────

[x] 4-A  ChargingDashboardPage — đổi heading + thêm hero banner "Sạc ngay"
[x] 4-A  ChargingDashboardPage — khôi phục <Link to="/checkin"> trong hero banner
[x] 4-B  StationsListPage (user) — thêm filter toolbar (connector, availability, sort)
[x] 4-B  StationsListPage — hiển thị result count, wire "Xem trên bản đồ" → /map
[x] 4-C  ProfilePage (admin) — thêm avatar upload placeholder
[x] 4-C  ProfilePage (admin) — hoàn thiện form đổi mật khẩu với zod validation
[x] 4-C  ProfilePage (admin) — thêm section 2FA toggle
[x] 4-C  ProfilePage (admin) — thêm bảng phiên đăng nhập + logout all

── VERIFICATION ─────────────────────────────────────────────────────

[x] V-01  Admin login → redirect đúng /admin/dashboard (không còn 404)
[x] V-02  Admin click "Đăng xuất" → auth clear, về /auth/login
[x] V-03  User click "Lịch sử sạc" → /wallet/transactions (không 404)
[x] V-04  User click "SẠC NGAY" → /checkin hoặc toast (không 404)
[x] V-05  Marketing footer → không còn link 404 nào
[x] V-06  User header dropdown → Hồ sơ / Ví / Cài đặt / Đăng xuất đều navigate đúng
[x] V-07  "DỪNG SẠC NGAY" (cả 2 trang) → có phản hồi toast
[x] V-08  "Chấm công ngay" → toggle state + toast
[x] V-09  "Phân ca mới" → mở dialog (phase 2) hoặc toast (phase 0 placeholder)
[x] V-10  Avatar edit → có toast phản hồi
[x] V-11  /checkin → 3-step flow hoàn chỉnh, bước cuối → /charging/live
[x] V-12  /owner/maintenance/:id → trang chi tiết render đúng từ mock data
[x] V-13  Thêm xe → sheet mở, form validate, lưu cập nhật list
[x] V-14  Thêm nhân viên → sheet mở, nhân viên mới xuất hiện trong bảng
[x] V-15  Phân ca mới → dialog mở, submit → toast success
[x] V-16  Tạo yêu cầu bảo trì → sheet mở, yêu cầu mới xuất hiện đầu danh sách
[x] V-17  Phiên sạc mới (staff) → step 4 summary hiển thị đúng data từ step 1–3
[x] V-18  Khách vãng lai (staff) → form validate biển số, submit → toast + về home
[x] V-19  /settings (user) → switch, select hoạt động; Xóa tài khoản → confirm dialog
[x] V-20  /staff/walkin → form render, navigate về /staff/home sau submit
