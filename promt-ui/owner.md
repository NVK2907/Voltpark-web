You are a senior frontend architect specializing in Smart City & IoT enterprise platforms.

Your task: Extend the existing Next.js 14 App Router project by implementing the
OWNER role for the EV Charging Parking Management System.

The OWNER is a business operator who owns one or more parking facilities with EV
chargers. They monitor THEIR OWN assets, track THEIR OWN revenue (after platform
commission), manage THEIR OWN staff, and handle THEIR OWN customer relationships.

═══════════════════════════════════════════════════════
SCOPE & DATA ISOLATION (critical)
═══════════════════════════════════════════════════════

- ADMIN section already exists at /app/(admin) — DO NOT modify
- OWNER must reuse shared components from /components/admin/shared/
  (KpiCard, DataTable, StatusBadge, ChartCard, ConfirmDialog, PageHeader, EmptyState)
- New owner-specific components live in /components/owner/

Data isolation:
- Every Owner page filters mock data by `currentOwnerId` (mock value: "OWN001")
- Owner sees ONLY:
    - Parkings where parking.ownerId === currentOwnerId
    - Chargers at those parkings
    - Transactions at those chargers
    - Staff where staff.ownerId === currentOwnerId
    - Customers who have transacted at those chargers
- Owner sees revenue NET of platform commission (e.g. owner% from settings)
- Owner CANNOT see other owners' data, admin audit logs, or platform-wide settings

Mock owner profile (in /lib/mock-owner.ts):
  currentOwnerId: "OWN001"
  name: "Công ty TNHH EV Solutions Quận 1"
  legalName, taxId, contactEmail, contactPhone
  ownsParkings: ["ST001", "ST003", "ST005"]  // 3 parkings
  revenueSharePercent: 70  // owner gets 70%, platform 30%

═══════════════════════════════════════════════════════
TECH STACK (inherit from ADMIN — no substitutions)
═══════════════════════════════════════════════════════

- Framework:   Next.js 14 (App Router)
- Language:    TypeScript strict, no `any`, types from /types/index.ts
- Styling:     Tailwind v3, CSS variables, shadcn/ui
- Charts:      Recharts via existing <ChartCard>
- i18n:        next-intl (extend /messages/vi.json + en.json with "owner.*" namespace)
- Icons:       lucide-react only
- Forms:       react-hook-form + zod
- State:       URL search params via nuqs
- Default lang: Vietnamese

═══════════════════════════════════════════════════════
DESIGN SYSTEM (inherit from ADMIN)
═══════════════════════════════════════════════════════

Reuse all CSS variables, typography, spacing, motion, and accessibility rules
from the ADMIN spec. Owner module visual differences:

- Sidebar accent color: emerald-500 (instead of admin sky-500)
  → variable --color-owner-accent: #10B981
  → Active nav item border-r and text use this color
  → KpiCard primary trend color also uses this in owner pages
  → Justification: visual cue that user is in "business owner" context

- Header badge: small "OWNER" pill next to logo (text-xs, emerald-100/emerald-700)

═══════════════════════════════════════════════════════
EXTENDED TYPES (add to /types/index.ts)
═══════════════════════════════════════════════════════

interface Owner {
  id: string                       // "OWN001"
  name: string                     // legal/business name
  legalName: string
  taxId: string                    // mã số thuế
  contactEmail: string
  contactPhone: string
  bankAccount: {
    bankName: string
    accountNumber: string          // last 4 visible
    accountHolder: string
  }
  ownsParkings: string[]           // station IDs
  revenueSharePercent: number      // 0-100, owner's cut
  createdAt: string
}

// Extend existing Station to include ownerId
interface Station {
  // ...existing fields
  ownerId: string                  // FK to Owner
}

interface ParkingSlot {
  id: string                       // "SLOT-A1"
  parkingId: string                // = stationId
  zone: string                     // "A" | "B" | "C"
  number: number                   // 1, 2, 3...
  hasCharger: boolean
  chargerId?: string
  status: "available" | "reserved" | "charging" | "fault" | "occupied_no_charge"
  vehiclePlate?: string
  reservedUntil?: string           // ISO datetime
}

interface Reservation {
  id: string                       // "RSV-001"
  parkingId: string
  slotId: string
  userId: string
  userName: string
  vehiclePlate: string
  startTime: string                // ISO datetime
  endTime: string
  status: "upcoming" | "active" | "completed" | "cancelled" | "no_show"
  estimatedKwh?: number
}

interface Staff {
  id: string                       // "STF-001"
  ownerId: string
  parkingId: string                // primary assignment
  name: string
  email: string
  phone: string
  role: "manager" | "operator" | "technician"
  shift: "morning" | "afternoon" | "night" | "rotating"
  status: "on_duty" | "off_duty" | "leave"
  hireDate: string
  performance: {
    sessionsHandled: number
    complaintsResolved: number
    rating: number                  // 0-5
  }
}

interface Payout {
  id: string                       // "PO-2026-04-001"
  ownerId: string
  periodStart: string              // ISO date
  periodEnd: string
  grossRevenue: number             // VND, sum of transactions
  platformFee: number              // VND
  vat: number                      // VND
  netAmount: number                // VND, what owner receives
  status: "pending" | "processing" | "paid" | "failed"
  scheduledDate: string
  paidDate?: string
  invoiceUrl?: string              // mock placeholder
}

interface CustomerSummary {
  userId: string
  userName: string
  email: string
  phone: string
  totalSessionsAtMyParkings: number
  totalKwhAtMyParkings: number
  totalSpentAtMyParkings: number   // VND, gross
  lastVisitAt: string
  favoriteStation: string
  loyalty: "new" | "regular" | "vip"
}

interface Feedback {
  id: string
  userId: string
  userName: string
  parkingId: string
  parkingName: string
  rating: number                   // 1-5
  comment?: string
  category: "service" | "charger" | "cleanliness" | "pricing" | "other"
  createdAt: string
  status: "new" | "responded" | "resolved"
  ownerResponse?: string
  respondedAt?: string
}

interface MaintenanceRequest {
  id: string                       // "MNT-001"
  ownerId: string
  chargerId?: string
  parkingId: string
  type: "charger_repair" | "facility" | "cleaning" | "upgrade"
  priority: "low" | "medium" | "high" | "urgent"
  description: string
  status: "submitted" | "in_review" | "scheduled" | "in_progress" | "completed" | "rejected"
  createdAt: string
  scheduledAt?: string
  completedAt?: string
  cost?: number                    // VND, if owner-paid
}

interface Promotion {
  id: string
  ownerId: string
  parkingIds: string[]             // applies to which of owner's parkings
  name: string                     // "Giảm 20% cuối tuần"
  type: "percent_off" | "fixed_off" | "free_minutes"
  value: number
  startDate: string
  endDate: string
  status: "draft" | "scheduled" | "active" | "expired" | "cancelled"
  usageCount: number
  maxUsage?: number
}

═══════════════════════════════════════════════════════
ARCHITECTURE
═══════════════════════════════════════════════════════

/app/(owner)/
  layout.tsx                       ← OwnerLayout (sidebar + header)
  dashboard/
    page.tsx
  parkings/                        ← renamed from "parking" for plurality consistency
    page.tsx                       ← Owner's parking list
    [id]/
      page.tsx                     ← Parking detail with slot map
  chargers/
    page.tsx                       ← Owner's chargers grid
    [id]/
      page.tsx                     ← Charger detail (read-only, request maintenance)
  sessions/
    page.tsx                       ← Charging sessions log
    [id]/
      page.tsx                     ← Session detail
  reservations/
    page.tsx                       ← Booking management
  customers/
    page.tsx                       ← Customers who used owner's parkings
    [id]/
      page.tsx                     ← Customer detail at owner's properties
  staff/
    page.tsx
    [id]/
      page.tsx                     ← Staff profile + performance
    schedule/
      page.tsx                     ← Shift calendar
  revenue/
    page.tsx                       ← Net revenue dashboard
  payouts/
    page.tsx                       ← Payout history + pending
  pricing/
    page.tsx                       ← Owner-specific pricing override
  promotions/
    page.tsx                       ← Marketing/discount campaigns
  feedback/
    page.tsx                       ← Customer reviews
  maintenance/
    page.tsx                       ← Maintenance requests to platform
  reports/
    page.tsx                       ← Generate & download reports
  notifications/
    page.tsx
  profile/
    page.tsx
  settings/
    page.tsx                       ← Owner-specific settings (4 tabs)

/components/owner/
  layout/
    OwnerSidebar.tsx
    OwnerHeader.tsx
  dashboard/
    OwnerKpiRow.tsx
    NetRevenueCard.tsx
    PendingPayoutCard.tsx
    LiveSessionsTable.tsx
  parking/
    SlotMapGrid.tsx                ← Visual slot grid
    SlotCell.tsx
    SlotDetailDrawer.tsx
  staff/
    StaffCard.tsx
    AddStaffModal.tsx
    ShiftCalendar.tsx
  revenue/
    RevenueBreakdownChart.tsx      ← Stacked bar: gross/fee/vat/net
    PayoutTimeline.tsx
  feedback/
    FeedbackCard.tsx
    RespondFeedbackModal.tsx
  promotions/
    PromotionCard.tsx
    PromotionForm.tsx
  shared/
    OwnerScopeGuard.tsx            ← Wrapper that filters data by currentOwnerId

/lib/
  mock-owner.ts                    ← currentOwnerId, owner profile mock
  mock-data.ts                     ← Already exists (admin), extend with parkingSlots, reservations, payouts, feedback, etc.
  utils-owner.ts                   ← getOwnerScopedData() helpers

═══════════════════════════════════════════════════════
LAYOUT — OwnerLayout
═══════════════════════════════════════════════════════

Reuse Sidebar/Header structure from admin but with owner-specific:

Sidebar nav groups:
  Tổng quan:
    - Dashboard
  Vận hành:
    - Bãi đỗ (Parkings)
    - Bộ sạc (Chargers)
    - Phiên sạc (Sessions)
    - Đặt chỗ (Reservations)
  Khách hàng:
    - Danh sách (Customers)
    - Phản hồi (Feedback)
    - Khuyến mãi (Promotions)
  Tài chính:
    - Doanh thu (Revenue)
    - Thanh toán (Payouts)
    - Giá cước (Pricing)
    - Báo cáo (Reports)
  Nhân sự:
    - Nhân viên (Staff)
    - Lịch ca (Schedule)
  Hỗ trợ:
    - Bảo trì (Maintenance)
  Hệ thống:
    - Thông báo (Notifications)
    - Cài đặt (Settings)

Header:
  - Owner business name + "OWNER" pill
  - Parking selector dropdown (if owner has multiple): "Tất cả bãi đỗ" | per-parking
    → This selection persists to URL ?parking=ST001 and filters all pages
  - Language switch [VI | EN]
  - Notification bell (filtered to owner-relevant: payouts, feedback, alerts at their parkings)
  - Owner avatar dropdown: Profile / Cài đặt / Đăng xuất

═══════════════════════════════════════════════════════
PAGE SPECIFICATIONS
═══════════════════════════════════════════════════════

━━━ /dashboard (Owner Business View) ━━━

Real-time: useRealtime hook updates KPIs every 30s, filtered by ownerId.

Greeting row: "Xin chào, [Tên owner]. Hôm nay là [date]."

Row 1 — Business KPIs (4 cards):
  [1] Doanh thu hôm nay (NET)
      Value: 12,450,000 ₫ (sau chia sẻ)
      Trend: +8.3% vs hôm qua
      Subtext: "Gross: 17,785,714 ₫"
      Click → /revenue

  [2] Phiên sạc đang chạy
      Value: 8 phiên | Subtext: "tại [N] bãi đỗ"
      Pulse animation
      Click → /sessions?status=active

  [3] Tỷ lệ lấp đầy
      Value: 67% | Progress ring or bar
      Subtext: "32 / 48 slot có xe"
      Color threshold: <40% red, 40-70% amber, >70% green

  [4] Sắp nhận thanh toán
      Value: 145,200,000 ₫
      Subtext: "Dự kiến: 30/04/2026"
      Icon: Wallet (success color)
      Click → /payouts

Row 2 — Charts (2/3 + 1/3):
  Left: Revenue trend (last 30 days)
    AreaChart with two stacked layers:
      - Net revenue (owner's cut, primary)
      - Platform fee (muted)
    Toggle: Hôm nay/7 ngày/30 ngày

  Right: Sessions by parking (donut)
    One segment per owner's parking
    Center: total sessions today

Row 3 — Live operations (2-col):
  Left: Live Sessions Table (max 10 rows)
    Slot | Bãi đỗ | Khách | kWh đã sạc | Thời gian | Doanh thu
    Auto-refresh every 30s
    Click row → /sessions/[id]

  Right: Recent Activity Feed (vertical timeline)
    Mixed events: new session, session completed, slot became available,
    feedback received, maintenance update — last 15 items
    Each: icon + actor + action + relative time

Row 4 — Top Performance (3-col):
  Card 1: Top Parking — name + revenue + sparkline
  Card 2: Top Charger — ID + utilization% + sessions count
  Card 3: Top Customer — name + total spent at owner's parkings

━━━ /parkings ━━━

PageHeader: "Bãi đỗ của tôi" + count badge + [Xuất danh sách] button

Toolbar:
  - Search by name/address
  - Status filter: Tất cả | Hoạt động | Bảo trì | Tạm dừng
  - View toggle: Table | Card grid
  - Sort: Tên | Doanh thu hôm nay | Tỷ lệ lấp đầy

Table columns:
  # | Tên bãi | Địa chỉ | Tổng slot | Slot có sạc | Tải hiện tại | Doanh thu hôm nay (NET) | Trạng thái | Thao tác
  Row click → /parkings/[id]

Empty state: "Bạn chưa có bãi đỗ nào. Liên hệ platform để đăng ký."

━━━ /parkings/[id] ━━━

PageHeader: [← Quay lại] + Parking name + StatusBadge + [Yêu cầu bảo trì] button

Section 1 — Info (3-col):
  Card 1 (Info): Address, coordinates, operating hours, total slots, manager
  Card 2 (Live): Active sessions, current load%, available slots, today revenue (NET)
  Card 3 (Performance): This week revenue, avg sessions/day, top hour, customer count

Section 2 — Slot Map (full width):
  Title: "Sơ đồ bãi đỗ" + legend (Available/Reserved/Charging/Fault/Occupied)
  Group by zone (A, B, C)
  Grid cells (SlotCell):
    - Size: 80×80px desktop, 60×60px tablet, 50×50px mobile
    - Background color by status:
        Available → emerald-100 / emerald-500 border
        Reserved  → sky-100 / sky-500 border
        Charging  → amber-100 / amber-500 border + pulse
        Fault     → red-100 / red-500 border
        Occupied (no charge) → slate-200 / slate-400 border
    - Content: slot number + ⚡ icon if hasCharger
    - Click → SlotDetailDrawer (right side):
        Slot info, current/recent sessions, [Force release] button (admin override)
  Filter bar above: Show only [chargers / available / charging] + zone tabs
  Real-time: status updates every 15s

Section 3 — Live Sessions (table):
  Slot | Khách | Xe | kWh | Thời gian | Chi phí | Trạng thái
  Updates every 15s
  Empty state: "Chưa có phiên sạc nào"

Section 4 — Today's Stats (4 mini KPIs):
  Phiên sạc | kWh tiêu thụ | Doanh thu (NET) | Lượt khách

━━━ /chargers ━━━

PageHeader: "Bộ sạc của tôi" + count "X total / Y charging / Z fault"

Filter bar:
  - Parking dropdown (only owner's parkings)
  - Status tabs: All | Available | Charging | Fault | Offline (with counts)
  - Power: All | 22kW | 50kW | 150kW
  - Connector: All | Type2 | CCS2 | CHAdeMO

Grid: 4-col desktop, 2 tablet, 1 mobile
ChargerCard (reuse admin component, but limit actions):
  - Owner CANNOT restart/configure remotely
  - Action: [Chi tiết] | [Yêu cầu bảo trì] (opens modal pre-filled with charger ID)

━━━ /chargers/[id] ━━━

Same as admin charger detail BUT:
- No firmware update button
- No remote restart
- Add: [Yêu cầu bảo trì] prominent CTA
- Add: "Lịch sử bảo trì" section showing past maintenance requests

━━━ /sessions ━━━

PageHeader: "Phiên sạc" + [Xuất Excel] button

Filter bar:
  - Status: Đang sạc | Hoàn tất | Lỗi | Tất cả
  - Parking: All | per-parking dropdown
  - Date range picker (default: last 7 days)
  - Search: by user/vehicle plate

Table columns:
  Mã phiên | Khách | Xe | Bãi | Bộ sạc | Bắt đầu | Thời lượng | kWh | Tổng tiền | NET cho tôi | Trạng thái

  - "Tổng tiền": gross customer paid
  - "NET cho tôi": owner's share after platform fee
  - Row click → /sessions/[id]

Pagination: 20/page, URL params

━━━ /sessions/[id] ━━━

PageHeader: [← Quay lại] + Session ID + StatusBadge

Layout (3-col):
  Left card: Customer info — name, phone, email, vehicle plate, sessions count at owner's parkings
  Middle card: Session details — start/end, duration, kWh, charger info, parking, slot
  Right card: Financial — Gross amount, Platform fee, VAT, Net to owner (highlighted)

Energy chart: kWh delivery rate over session duration (LineChart)

Action buttons (UI only):
  [In hóa đơn] | [Liên hệ khách hàng] (mailto)

━━━ /reservations ━━━

PageHeader: "Đặt chỗ" + tabs: Sắp tới | Đang diễn ra | Đã hoàn tất | Đã hủy/No-show

View toggle: List | Calendar

List view: Table
  Khách | Xe | Bãi | Slot | Thời gian | Trạng thái | Thao tác

Calendar view (FullCalendar-style, but built with shadcn):
  Day/week/month switcher
  Reservations as colored blocks across timeline
  Click block → drawer with details

━━━ /customers ━━━

PageHeader: "Khách hàng tại bãi đỗ của tôi"

Toolbar:
  Search | Loyalty filter (New | Regular | VIP) | Date range registered

Table:
  Họ tên | Email | SĐT | Số phiên | Tổng kWh | Tổng chi tiêu | Lần ghé gần nhất | Mức độ thân thiết | Thao tác
  Row click → /customers/[id]

━━━ /customers/[id] ━━━

Profile card: Avatar + name + contact + loyalty tier badge

4 KPI cards: Total sessions | Total kWh | Total spent | Avg session

Charts:
  - Visit frequency (last 6 months bar chart)
  - Preferred parking (donut among owner's parkings)
  - Preferred hours heatmap (24h × 7day grid)

Transaction table at owner's parkings (paginated)

[Gửi email] (mailto link), [Tặng voucher] (UI only modal)

━━━ /staff ━━━

PageHeader: "Nhân viên" + count + [+ Thêm nhân viên] button

Toolbar: Search | Role filter | Status filter | Parking filter

Table:
  # | Avatar+Tên | Email | SĐT | Vai trò | Bãi làm việc | Ca | Trạng thái | Hiệu suất | Thao tác

  - "Hiệu suất": stars (rating) + small text "X phiên xử lý"
  - "Trạng thái": StatusBadge (on_duty/off_duty/leave)
  - Thao tác: [Chi tiết] | [Đổi ca] | [Tạm khóa] (ConfirmDialog)

[+ Thêm nhân viên] opens AddStaffModal:
  - Form: Họ tên, email, SĐT, role, parking, shift, hire date
  - Validation: zod
  - On submit: success toast, append to mock list

━━━ /staff/[id] ━━━

Profile card: Avatar + name + role + status + hire date + parking
4 KPI cards: Sessions handled | Complaints resolved | Rating | Days on duty (this month)

Schedule preview (this week 7-day strip)
Recent actions log (last 20 entries: handled session, resolved complaint, etc.)

[Chỉnh sửa] | [Reset mật khẩu] | [Xóa nhân viên] (destructive ConfirmDialog)

━━━ /staff/schedule ━━━

PageHeader: "Lịch ca làm việc" + Week navigator (← Tuần này →)

Calendar grid:
  - Rows: each staff member
  - Columns: Mon-Sun (7 days)
  - Cells: shift block colored (morning yellow / afternoon blue / night purple)
  - Click cell → assign/edit shift modal

Filter: by parking | by role
[Sao chép tuần trước] | [Xuất PDF lịch] (UI only)

━━━ /revenue ━━━

PeriodSelector: Hôm nay | 7 ngày | 30 ngày | 3 tháng | YTD | Tùy chỉnh
Parking filter: All | per-parking

Section 1 — Summary (4 KPIs):
  Doanh thu Gross | Phí platform | VAT | Doanh thu NET (highlighted card with primary color)

Section 2 — Revenue Breakdown Chart (full width):
  Stacked bar chart per day:
    Net (emerald) + Platform fee (slate) + VAT (amber)
  Toggle: Daily / Weekly / Monthly

Section 3 — Per-parking comparison (2-col):
  Left: Horizontal bar chart "Doanh thu NET theo bãi"
  Right: Donut "Tỷ trọng đóng góp"

Section 4 — Trends:
  - LineChart: Net revenue 12 months trailing
  - Comparison: this period vs previous period (with delta %)

Section 5 — Top sessions (table, top 20 by amount)
[Xuất báo cáo Excel] | [Xuất PDF] buttons

━━━ /payouts ━━━

PageHeader: "Thanh toán" + summary cards

Top row (3 cards):
  Đã nhận (YTD): X ₫
  Sắp nhận: X ₫ (next payout date countdown)
  Đang xử lý: X ₫

Bank account display card: Bank name + account ****1234 + holder name + [Cập nhật]

Payouts table:
  Mã | Kỳ | Doanh thu Gross | Phí platform | VAT | NET | Ngày dự kiến | Ngày thanh toán | Trạng thái | Hóa đơn

  - Status: pending / processing / paid / failed (StatusBadge)
  - "Hóa đơn": [Tải PDF] icon button (UI only)
  - Filter: status, year, quarter

Failed payouts row: red tint + tooltip with reason + [Liên hệ hỗ trợ]

━━━ /pricing ━━━

PageHeader: "Quản lý giá cước" + info banner: "Giá platform mặc định + override của bạn"

Per-parking pricing override:
  Table per parking:
    Loại phí | Giá platform | Giá của tôi | Chênh lệch | Hoạt động
    - Giá điện kWh | 4,500 ₫ | [input override] | +200 | toggle
    - Phí đỗ xe/giờ | 10,000 ₫ | [input] | ... | toggle
    - Phí khởi động | 2,000 ₫ | [input] | ... | toggle

  [Lưu thay đổi] với confirm dialog: "Giá mới áp dụng từ ngày mai"

Live preview: "Phiên 1h/10kWh tại Bãi A: X ₫"

═══════════════════════════════════════════════════════
━━━ /promotions ━━━
═══════════════════════════════════════════════════════

PageHeader: "Khuyến mãi" + [+ Tạo khuyến mãi] button

Tabs: Đang chạy | Sắp tới | Đã kết thúc | Bản nháp

Grid of PromotionCard:
  Each card: name + type badge + value + start-end + parkings applied + usage progress bar
  Action menu: Edit (if draft/scheduled) | Cancel (if active) | Duplicate | Delete

[+ Tạo khuyến mãi] modal/drawer:
  Form (react-hook-form + zod):
    - Tên chương trình
    - Loại: percent_off | fixed_off | free_minutes (radio)
    - Giá trị (number, validate by type)
    - Áp dụng cho bãi: multiselect of owner's parkings
    - Thời gian: date range
    - Giới hạn lượt sử dụng (optional)
    - [Lưu nháp] | [Lên lịch] buttons

━━━ /feedback ━━━

PageHeader: Average rating (large stars) + total count + breakdown bar (5★ to 1★)

Filters: Rating | Category | Parking | Status | Date range

Feedback list (FeedbackCard):
  Top: Customer avatar + name + rating stars + parking + relative time
  Body: comment text + category badge
  If responded: Owner response shown in indented card below
  Action: [Phản hồi] (if status=new) → RespondFeedbackModal

RespondFeedbackModal:
  Show original feedback
  Textarea for response (required, min 10 chars)
  [Gửi phản hồi] → success toast

━━━ /maintenance ━━━

PageHeader: "Yêu cầu bảo trì" + [+ Tạo yêu cầu] button

Tabs: Tất cả | Đang chờ | Đang xử lý | Hoàn tất | Bị từ chối

Table:
  Mã | Loại | Thiết bị/Bãi | Mức độ | Mô tả ngắn | Ngày tạo | Lịch hẹn | Trạng thái | Chi phí

  - Priority badge (low/medium/high/urgent)
  - Click row → side drawer with full description, timeline of status changes, attachments placeholder

[+ Tạo yêu cầu] modal:
  - Loại (select)
  - Bãi đỗ (select)
  - Bộ sạc (optional, depends on type)
  - Mức độ ưu tiên
  - Mô tả chi tiết (textarea, min 20 chars)
  - Đính kèm ảnh (placeholder)
  - [Gửi]

━━━ /reports ━━━

PageHeader: "Báo cáo"

Tab navigation: Doanh thu | Vận hành | Khách hàng | Nhân viên

Each tab:
  - Period selector
  - Format: PDF | Excel | CSV (radio)
  - Filters relevant to report
  - Preview area (small chart/table preview)
  - [Tạo báo cáo] → toast "Đang tạo báo cáo..." → [Tải xuống] button after 2s mock delay

History panel (right side): Last 10 generated reports with download/regenerate actions

━━━ /notifications ━━━

Same structure as admin /notifications but with owner-relevant categories:
  Tabs: Tất cả | Thanh toán | Phản hồi khách | Bảo trì | Hệ thống

━━━ /profile ━━━

Owner business profile form:
  Section 1 — Thông tin doanh nghiệp:
    - Tên công ty, Mã số thuế (read-only after first save), Email, SĐT
    - Logo upload placeholder

  Section 2 — Thông tin liên hệ:
    - Người đại diện, chức danh
    - Địa chỉ trụ sở

  Section 3 — Tài khoản ngân hàng:
    - Bank name, Account number (show last 4 + edit), Account holder
    - "Thông tin được mã hóa và chỉ dùng cho thanh toán"
    - [Cập nhật] requires 2FA confirmation

  Section 4 — Đổi mật khẩu (collapsed by default)

━━━ /settings ━━━

Tab navigation:
  Tab 1 — Vận hành:
    - Giờ hoạt động per parking (default + override)
    - Auto-cancel reservation after N phút (slider)
    - Auto-end session sau khi xe đầy + N phút

  Tab 2 — Thông báo:
    - Email notifications (toggle list): payout received, new feedback, charger fault, maintenance update, daily summary
    - SMS notifications (toggle list)
    - Push notifications

  Tab 3 — Tích hợp:
    - Bookkeeping export (Misa, Fast — connect placeholder)
    - Webhook URL for incoming events
    - API key (read-only, request from platform)

  Tab 4 — Bảo mật:
    - 2FA toggle
    - Session timeout
    - Login history (last 5)

═══════════════════════════════════════════════════════
SHARED RULES
═══════════════════════════════════════════════════════

All pages:
  - Loading skeleton, empty state, error state (use shared components)
  - URL params for filters/pagination (nuqs)
  - Translation keys: "owner.<page>.<element>" — NEVER hardcoded
  - Numbers: useFormatter() with vi/en locale
  - Currency: VND with proper separator per locale
  - Dates: relative ("3 phút trước") or absolute (DD/MM/YYYY) per context

Real-time (useRealtime):
  - Dashboard KPIs: 30s
  - Slot map: 15s
  - Live sessions: 15s
  - Notification bell: 60s

Toasts (Sonner):
  - Success/error/info per admin spec
  - Vietnamese default

Forms:
  - react-hook-form + zod
  - Vietnamese validation messages
  - Submit disabled until valid + dirty

Accessibility:
  - WCAG 2.1 AA
  - All icon buttons have aria-label
  - Focus rings on every interactive element

═══════════════════════════════════════════════════════
OUTPUT REQUIREMENTS
═══════════════════════════════════════════════════════

1. All pages and components fully implemented
2. Mock data extended in /lib/mock-data.ts to include slots, reservations, payouts, feedback, maintenance, promotions
3. /lib/mock-owner.ts with currentOwnerId scope
4. Translation keys 100% covered (owner.* namespace) in vi.json + en.json
5. Reuse admin shared components, do NOT duplicate
6. Each page visually distinct — owner emerald accent throughout
7. No "any", no hardcoded text, no inline styles
8. Data isolation enforced — owner never sees other owners' data

═══════════════════════════════════════════════════════
Checklist màn hình OWNER cần triển khai
═══════════════════════════════════════════════════════
Tổng quan (1 màn hình)
  [x] Dashboard /dashboard — Greeting, 4 KPI (NET revenue, active sessions, occupancy, pending payout), revenue trend, sessions by parking, live sessions table, recent activity feed, top performance cards
Vận hành (5 màn hình)
  [x] Parkings List /parkings — Table/Grid bãi đỗ của owner, search, filter status
  [x] Parking Detail /parkings/[id] — Info 3-col, Slot Map Grid với drawer chi tiết, live sessions table, today's stats
  [x] Chargers List /chargers — Grid card, filter parking/status/power/connector, action "Yêu cầu bảo trì"
  [x] Charger Detail /chargers/[id] — Read-only specs, lịch sử bảo trì, KHÔNG có nút restart/firmware
  [x] Reservations /reservations — Tabs theo trạng thái, view List/Calendar
Phiên sạc (2 màn hình)
  [x] Sessions List /sessions — Bảng có cột "NET cho tôi" tách khỏi "Tổng tiền"
  [x] Session Detail /sessions/[id] — Customer info, session details, financial breakdown (Gross/Fee/VAT/NET), kWh delivery chart
Khách hàng (3 màn hình)
  [x] Customers List /customers — Khách đã sạc tại bãi của owner, loyalty tier
  [x] Customer Detail /customers/[id] — Profile, KPIs, visit frequency, preferred hours heatmap, transactions
  [x] Feedback /feedback — Average rating + breakdown, filters, list cards, modal phản hồi
Khuyến mãi (1 màn hình)
  [x] Promotions /promotions — Tabs theo trạng thái, grid card, modal tạo khuyến mãi với form đầy đủ
Tài chính (4 màn hình)
  [x] Revenue /revenue — 4 KPI Gross/Fee/VAT/NET, stacked bar chart, per-parking comparison, top sessions, export
  [x] Payouts /payouts — 3 cards summary, bank account info, table lịch sử thanh toán, download invoice
  [x] Pricing /pricing — Override giá per-parking, live preview phí
  [x] Reports /reports — 4 tabs (Doanh thu/Vận hành/Khách hàng/Nhân viên), period+format, history panel
Nhân sự (3 màn hình)
  [x] Staff List /staff — Table với hiệu suất rating, modal "Thêm nhân viên"
  [x] Staff Detail /staff/[id] — Profile, 4 KPI, schedule preview, action log
  [x] Schedule /staff/schedule — Calendar grid (staff × days), assign shift modal
Hỗ trợ (1 màn hình)
  [x] Maintenance /maintenance — Tabs trạng thái, table requests, modal tạo yêu cầu
Hệ thống (3 màn hình)
  [x] Notifications /notifications — Tabs (Payment/Feedback/Maintenance/System)
  [x] Profile /profile — Business info, contact, bank account (2FA confirm), change password
  [x] Settings /settings — 4 tabs: Vận hành / Thông báo / Tích hợp / Bảo mật
Layout / Shared (không phải page)
  [x] OwnerLayout — Sidebar 8 nav groups, header với parking selector, OWNER pill, emerald accent
  [x] OwnerSidebar — Phân nhóm nav (Tổng quan/Vận hành/Khách hàng/Tài chính/Nhân sự/Hỗ trợ/Hệ thống)
  [x] OwnerHeader — Parking dropdown filter (sync với URL), bell icon owner-scoped
  [x] SlotMapGrid + SlotCell + SlotDetailDrawer — Visual sơ đồ bãi đỗ
  [ ] OwnerScopeGuard — Wrapper filter mock data theo currentOwnerId
Tổng cộng: 23 màn hình + 5 layout/shared components

So với prompt gốc (chỉ 7 page), bản này bổ sung 16 màn hình thiết yếu cho nghiệp vụ owner: Reservations, Customers, Feedback, Promotions, Payouts, Pricing, Reports, Maintenance, Staff Schedule, Profile, Settings, Notifications, và các detail pages cho Charger/Session/Customer/Staff.
