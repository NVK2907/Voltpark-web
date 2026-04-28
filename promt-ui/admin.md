You are a senior frontend architect specializing in Smart City & IoT enterprise platforms.

Your task: Build a production-grade, multi-page ADMIN dashboard for an
EV Charging Parking Management System.

═══════════════════════════════════════════════════════
TECH STACK (strictly follow — no substitutions)
═══════════════════════════════════════════════════════

- Framework:   Next.js 14 (App Router, Server Components where applicable)
- Language:    TypeScript (strict mode, no `any`, interfaces in /types/index.ts)
- Styling:     Tailwind CSS v3 with CSS variables for theming
- UI Library:  shadcn/ui (use existing components, do NOT reinvent)
- Charts:      Recharts (wrap in reusable <ChartCard> components)
- i18n:        next-intl (messages in /messages/vi.json + /messages/en.json)
- Icons:       lucide-react only
- Form:        react-hook-form + zod (all forms must validate)
- State:       URL search params for filter/pagination (nuqs library)

═══════════════════════════════════════════════════════
DESIGN SYSTEM
═══════════════════════════════════════════════════════

Color palette (CSS variables in globals.css):
  --color-primary:     #0EA5E9  (sky-500)
  --color-success:     #10B981  (emerald-500)
  --color-warning:     #F59E0B  (amber-500)
  --color-danger:      #EF4444  (red-500)
  --color-neutral-900: #0F172A  (sidebar background)
  --color-neutral-800: #1E293B  (card background dark)
  --color-neutral-700: #334155  (secondary dark)
  --color-neutral-50:  #F8FAFC  (page background light)

Typography:
  - Font: Inter via next/font/google (self-hosted, no external request)
  - Heading:    text-xl font-semibold tracking-tight
  - Subheading: text-base font-medium
  - Label:      text-sm font-medium text-muted-foreground
  - Value:      text-2xl font-bold tabular-nums
  - Caption:    text-xs text-muted-foreground

Spacing: 8px base grid (p-2=8px, p-4=16px, p-6=24px, p-8=32px)

Theme: light/dark mode via next-themes. Default: light.
  - All colors MUST work in both modes
  - Dark mode: use Tailwind dark: prefix, not custom classes

Motion:
  - Page transitions: fade + slight slide (100ms ease-out)
  - Interactive elements: 150ms transition-all
  - Skeleton shimmer: animate-pulse
  - Status pulse dot: animate-ping (charging/active states only)

Accessibility:
  - WCAG 2.1 AA minimum
  - All interactive elements: focus-visible:ring-2 focus-visible:ring-primary
  - Color is never the only indicator — always pair with icon or text
  - Minimum touch target: 44×44px
  - aria-label on all icon-only buttons

═══════════════════════════════════════════════════════
INTERNATIONALIZATION
═══════════════════════════════════════════════════════

Library: next-intl

File structure:
  /messages/
    vi.json   ← default language
    en.json

Rules:
- ALL user-visible text MUST use t('key') — zero hardcoded strings
- Key format: page.section.element
  Example: t('dashboard.kpi.totalRevenue')
- Organize keys by page namespace
- Language switcher persists to cookie (locale cookie, same domain)
- Number/currency format:
    vi: "." thousand separator, "," decimal  → 47.250.000 ₫
    en: "," thousand separator, "." decimal  → 47,250,000 ₫
  Use next-intl's useFormatter() for ALL numbers, dates, and relative times
- Date format: vi → DD/MM/YYYY, en → MM/DD/YYYY
- Relative time: "3 phút trước" / "3 minutes ago" via formatRelativeTime()

═══════════════════════════════════════════════════════
TYPESCRIPT TYPES
═══════════════════════════════════════════════════════

All interfaces live in /types/index.ts and are imported everywhere.
No type definitions inside components or pages.

/types/index.ts exports:

interface Station {
  id: string                    // "ST001"
  name: string                  // "Trạm Quận 1 - Vincom"
  address: string
  coordinates: { lat: number; lng: number }
  totalSlots: number
  activeChargers: number
  status: "online" | "offline" | "maintenance"
  loadPercent: number           // 0-100
  revenueToday: number          // VND
  revenueMonth: number          // VND
  operatingHours: string        // "06:00 - 22:00"
  managerId: string             // ref to User.id
}

interface Charger {
  id: string                    // "CHG-001"
  stationId: string
  stationName: string           // denormalized for display
  status: "available" | "charging" | "fault" | "offline"
  powerKw: 22 | 50 | 150
  connectorType: "Type2" | "CCS2" | "CHAdeMO"
  currentEnergyKwh: number
  lastHeartbeat: string         // ISO datetime
  sessionDurationMin?: number
  currentUserId?: string
  firmwareVersion: string       // "v2.3.1"
  installationDate: string      // ISO date
}

interface User {
  id: string
  name: string
  email: string
  phone: string                 // "+84 9x xxx xxxx"
  walletBalance: number         // VND
  totalSessions: number
  totalKwh: number
  totalSpent: number            // VND
  status: "active" | "suspended"
  role: "user" | "owner"        // owner = station owner
  createdAt: string             // ISO datetime
  lastLoginAt: string           // ISO datetime
}

interface Alert {
  id: string
  type: "charger_fault" | "payment_failed" | "offline_station" | "high_load"
  severity: "critical" | "warning" | "info"
  deviceId: string
  stationId: string
  stationName: string
  message: string
  timestamp: string             // ISO datetime
  resolved: boolean
  resolvedAt?: string
  resolvedBy?: string           // admin userId
}

interface Transaction {
  id: string
  userId: string
  userName: string              // denormalized
  chargerId: string
  stationId: string
  stationName: string
  startTime: string             // ISO datetime
  endTime: string               // ISO datetime
  durationMin: number
  energyKwh: number
  amount: number                // VND
  status: "completed" | "failed" | "pending"
}

interface ChargingEvent {
  id: string
  chargerId: string
  type: "heartbeat" | "fault" | "session_start" | "session_end" | "status_change"
  timestamp: string
  payload: Record<string, string | number | boolean>
  severity?: "critical" | "warning" | "info"
}

interface AdminProfile {
  id: string
  name: string
  email: string
  role: "super_admin" | "operator"
  avatar?: string
  lastLoginAt: string
  twoFactorEnabled: boolean
}

interface LoginHistoryEntry {
  id: string
  ip: string
  userAgent: string
  timestamp: string
  success: boolean
  location: string
}

═══════════════════════════════════════════════════════
MOCK DATA REQUIREMENTS
═══════════════════════════════════════════════════════

File: /lib/mock-data.ts
All data must be typed with interfaces from /types/index.ts

Generate:
- 8 stations (3 online, 2 offline, 1 maintenance, 2 online high-load)
- 30 chargers distributed realistically (3-5 per station)
- 20 users (mix of active/suspended, mix of user/owner roles)
- 50 alerts (last 30 days, mix of all types/severities)
- 100 transactions (last 30 days, realistic time distribution)
- 60 charging events for 3 sample chargers (for event log)
- 5 login history entries for admin profile
- Revenue time series: hourly data for last 24h, daily for last 30 days

All Vietnamese names, addresses in TP.HCM (realistic street addresses).
All amounts in VND (realistic range: 15,000 – 500,000 per transaction).

═══════════════════════════════════════════════════════
ARCHITECTURE
═══════════════════════════════════════════════════════

/app/
  (auth)/
    login/
      page.tsx                  ← Login form
    forgot-password/
      page.tsx
    verify-2fa/
      page.tsx
  (admin)/
    layout.tsx                  ← AdminLayout (sidebar + header + providers)
    dashboard/
      page.tsx
    stations/
      page.tsx
      [id]/
        page.tsx
    chargers/
      page.tsx
      [id]/
        page.tsx                ← Charger detail + live status
    analytics/
      page.tsx
    users/
      page.tsx
      [id]/
        page.tsx
    alerts/
      page.tsx
    audit-log/
      page.tsx                  ← Admin action history
    notifications/
      page.tsx
    profile/
      page.tsx
    settings/
      page.tsx
  not-found.tsx                 ← Custom 404
  error.tsx                     ← Custom 500/error boundary
  global-error.tsx

/components/
  /ui/                          ← shadcn (do not edit)
  /admin/
    layout/
      Sidebar.tsx
      Header.tsx
      GlobalSearch.tsx          ← Command palette (Cmd+K)
    shared/
      KpiCard.tsx
      DataTable.tsx             ← Generic sortable + paginated table
      StatusBadge.tsx
      ChartCard.tsx             ← Recharts wrapper
      MapPlaceholder.tsx        ← SVG mock map
      AlertItem.tsx
      ConfirmDialog.tsx         ← Reusable confirm/danger dialog
      PageHeader.tsx            ← Title + breadcrumb + action slot
      EmptyState.tsx
      ErrorState.tsx
    dashboard/
      KpiRow.tsx
      SessionChart.tsx
      StatusDonut.tsx
      StationMap.tsx
      AlertFeed.tsx
    stations/
      StationCard.tsx
      StationFilters.tsx
    chargers/
      ChargerCard.tsx
      ChargerFilters.tsx
      EventTimeline.tsx
    users/
      UserProfileCard.tsx
      WalletAdjustModal.tsx
    analytics/
      PeriodSelector.tsx
      RevenueChart.tsx
      UsageHeatmap.tsx
      StationRankChart.tsx
    settings/
      PricingForm.tsx
      RevenueShareForm.tsx
      ApiSettingsForm.tsx
      SecurityForm.tsx
    auth/
      LoginForm.tsx

/types/
  index.ts                      ← All interfaces (see TYPESCRIPT TYPES)

/lib/
  mock-data.ts
  utils.ts
  constants.ts                  ← Enums, config constants

/messages/
  vi.json
  en.json

/hooks/
  useRealtime.ts                ← setInterval simulation, cleanup on unmount
  useGlobalSearch.ts
  useConfirm.ts                 ← Imperative confirm dialog hook

═══════════════════════════════════════════════════════
LAYOUT — AdminLayout
═══════════════════════════════════════════════════════

Sidebar:
  - Width: 240px (expanded) / 64px (collapsed icon-only)
  - Background: neutral-900 (#0F172A)
  - Persist collapse state to localStorage key "sidebar-collapsed"
  - Logo top: EVCharge icon + text (text hidden when collapsed)
  - Nav groups:
      Tổng quan: Dashboard
      Hạ tầng:   Trạm sạc, Bộ sạc
      Vận hành:  Phân tích, Người dùng, Cảnh báo, Nhật ký
      Hệ thống:  Cài đặt
  - Active: bg-primary/10 text-primary border-r-2 border-primary
  - Hover: bg-white/5
  - Tooltip on icon when collapsed (show label)
  - Bottom: Settings + Admin avatar + name (hidden when collapsed)

Header (sticky, z-40):
  - Height: 56px
  - Breadcrumb: Home > Page > Sub-page (auto-generated from route)
  - Left: Hamburger (mobile) + Page title
  - Right (flex gap-3):
    1. Global search button (Cmd+K shortcut) → opens Command palette
    2. Language switcher: pill [VI | EN]
    3. Notification bell + unread count badge
    4. Admin avatar + dropdown:
        - Profile (/profile)
        - Audit log (/audit-log)
        - Logout (with confirmation)

Responsive:
  - ≥1024px: sidebar persistent
  - 768–1023px: sidebar collapsed by default
  - <768px: sidebar as shadcn Sheet (drawer), overlay backdrop

Global Search (Cmd+K):
  - shadcn CommandDialog
  - Search across: stations, chargers, users (by name/id/email)
  - Keyboard navigation: arrow keys + Enter
  - Recent searches persisted to sessionStorage

═══════════════════════════════════════════════════════
AUTH PAGES
═══════════════════════════════════════════════════════

━━━ /login ━━━
- Centered card, 400px wide
- Logo + "EV Charge Admin" heading
- Email + Password fields (react-hook-form + zod)
- Show/hide password toggle
- "Ghi nhớ đăng nhập" checkbox
- [Đăng nhập] button with loading spinner state
- "Quên mật khẩu?" link → /forgot-password
- Mock: any email/password → success, redirect to /dashboard
- Error toast: "Email hoặc mật khẩu không đúng" after 1s mock delay

━━━ /forgot-password ━━━
- Email input + [Gửi link đặt lại] button
- Success state: email sent illustration + instructions
- Back to login link

━━━ /verify-2fa ━━━
- 6-digit OTP input (auto-advance between digits)
- Countdown timer 60s for resend
- [Xác nhận] button

═══════════════════════════════════════════════════════
PAGE SPECIFICATIONS
═══════════════════════════════════════════════════════

━━━ /dashboard (NOC View) ━━━

Real-time: useRealtime hook updates KPIs every 30s (±5% variance).
Last updated timestamp displayed top-right with manual refresh button.

Row 1 — KPI Cards (4, full width, 2-col on tablet, 1-col mobile):
  [1] Doanh thu hôm nay
      Value: 47,250,000 ₫ | Trend: +12.4% vs yesterday
      Icon: TrendingUp (success color)
      Click → /analytics?period=today

  [2] Phiên sạc đang hoạt động
      Value: 23 | Subtext: "tại 6 trạm"
      Icon: Zap (primary color) + animate-ping pulse dot
      Click → /chargers?status=charging

  [3] Slots trống / Đã dùng
      Value: "45 / 96" | Progress bar: 53% occupancy
      Icon: ParkingSquare
      Bar color: green <50%, amber 50-80%, red >80%

  [4] Sức khỏe hệ thống
      Value: 94.2% | Subtext: "2 trạm ngoại tuyến"
      Color thresholds: ≥90% green, 70-89% amber, <70% red
      Click → /alerts?severity=critical

Row 2 — Charts (2/3 + 1/3 on desktop, stack on tablet):
  Left: "Phiên sạc theo giờ" LineChart (last 24h)
    - X: 00:00→23:00 (hourly ticks)
    - Y: session count
    - Two lines: today (primary) + yesterday (muted, dashed)
    - Smooth curve, dot on hover, custom Tooltip

  Right: "Trạng thái bộ sạc" PieChart (donut)
    - Segments: Available(success)/Charging(primary)/Fault(danger)/Offline(muted)
    - Center: total count + "bộ sạc" label
    - Legend below with count + percentage

Row 3 — Map + Alerts (50/50 desktop, stack mobile):
  Left: StationMap component
    - Gray grid background (CSS grid pattern)
    - 8 SVG pins at relative coordinates
    - Pin colors: green <50%, amber 50-80%, red >80% load
    - Hover tooltip: name + load% + active sessions
    - "Mở rộng" button (placeholder, no functionality)

  Right: AlertFeed component (scrollable, max-height 400px)
    - Last 10 unresolved alerts, newest first
    - Each row: severity icon + message + relative time
    - Row bg: red-50 (critical) / amber-50 (warning) / blue-50 (info)
    - [Xem tất cả →] footer link to /alerts

━━━ /stations ━━━

PageHeader: "Quản lý Trạm sạc" + [+ Thêm trạm] button (disabled, tooltip: "Chức năng đang phát triển")

Toolbar (sticky below header):
  - Search: debounced 300ms, filters name + address
  - Status tabs: Tất cả | Online | Offline | Bảo trì (show count badge each tab)
  - View toggle: Table | Grid (icons, persist to localStorage)
  - Sort: Tên | Tải (%) | Doanh thu hôm nay

Table view columns:
  # | Tên trạm | Địa chỉ | Tổng slot | Đang sạc | Tải (%) | Doanh thu hôm nay | Trạng thái | Thao tác
  - "Tải": ColoredProgressBar (green/amber/red)
  - "Doanh thu": formatted VND
  - "Trạng thái": StatusBadge
  - "Thao tác": [Chi tiết] → /stations/[id]

Grid view: 3-col desktop, 2-col tablet, 1-col mobile
  - StationCard: name + address + status badge + load bar + charger count + revenue

Pagination: 10/page, URL param ?page=N, show "Hiển thị 1-10 / 8 trạm"

Empty state: MapPin icon + "Không có trạm nào phù hợp"
URL state: ?search=&status=&view=table&sort=&page=1 (via nuqs)

━━━ /stations/[id] ━━━

PageHeader: [← Quay lại] + Station name + StatusBadge + [Chỉnh sửa] button

Section 1 — Info (2-col desktop):
  Left card: Địa chỉ | Tọa độ (lat, lng) | Giờ hoạt động | Mã trạm | Manager
  Right card (live, updates via useRealtime):
    - Phiên sạc hoạt động: N
    - Tải hiện tại: N% (progress bar)
    - Doanh thu hôm nay: X ₫
    - Doanh thu tháng: X ₫

Section 2 — Charger Grid:
  Title: "Bộ sạc tại trạm" + count badge
  Cards by status (group: Đang sạc → Sẵn sàng → Lỗi → Ngoại tuyến)
  Each card: border-l-4 colored by status
    - ID | StatusBadge | Power kW | Connector
    - Last heartbeat relative time
    - If charging: mini progress + timer
    - [Chi tiết] → /chargers/[id]

Section 3 — Revenue Chart:
  "Doanh thu 7 ngày gần nhất" BarChart
  X: Mon-Sun labels, Y: VND formatted
  Bar color: primary, hover: darker

━━━ /chargers ━━━

PageHeader: "Quản lý Bộ sạc" + count badge showing total / charging count

Filter bar (sticky):
  - Status tabs: Tất cả | Sẵn sàng | Đang sạc | Lỗi | Ngoại tuyến (with counts)
  - Power: All | 22 kW | 50 kW | 150 kW
  - Connector: All | Type2 | CCS2 | CHAdeMO
  - Station: All | [dropdown list of stations]

Grid: 4-col desktop, 2-col tablet, 1-col mobile
ChargerCard:
  - Header: ID (bold) + StatusBadge
  - Station name (muted, small)
  - ⚡ N kW | ConnectorType icon + label
  - Last heartbeat: relative time (red if >5 min ago)
  - If charging:
      Progress bar: "Đã sạc N.N kWh"
      Session timer: HH:MM:SS (live countdown via useRealtime)
      User: avatar initials + ID
  - Footer: [Chi tiết →] link

Bulk select: checkbox on each card, [Restart Selected] action bar (UI only)
URL state: ?status=&power=&connector=&station=&page=1

━━━ /chargers/[id] ━━━

PageHeader: [← Quay lại] + Charger ID + StatusBadge (large, animated if charging)

Section 1 — Live Status Card (prominent):
  - Status display: large icon + status text + animate-ping if charging
  - Real-time update every 10s via useRealtime
  - "Cập nhật lần cuối: N giây trước"
  - [Khởi động lại] | [Tắt] buttons (UI only, show confirm dialog)

Section 2 — Specs (grid 2x2):
  Công suất | Loại kết nối | Firmware | Ngày lắp đặt

Section 3 — Phiên sạc hiện tại (only if status=charging):
  Card with:
  - User ID + avatar initials
  - Thời gian bắt đầu
  - Năng lượng đã sạc: N kWh (live)
  - Thời lượng: HH:MM:SS (live)
  - Dự kiến hoàn thành (estimated based on avg rate)
  - [Dừng phiên] button (UI only, confirm dialog)

Section 4 — Event Log:
  "Nhật ký sự kiện (20 gần nhất)"
  Timeline component:
    - Left: colored dot by severity + vertical line
    - Event type badge + message
    - Timestamp (absolute + relative on hover)
    - payload details in expandable code block (monospace)

━━━ /analytics ━━━

PeriodSelector (sticky toolbar):
  Pills: Hôm nay | 7 ngày | 30 ngày | 3 tháng | Tùy chỉnh
  "Tùy chỉnh": DateRangePicker (shadcn Calendar)
  Station filter: All | [select station]
  URL state: ?period=7d&from=&to=&station=

KPI Summary Row (4 cards, updated per period):
  Tổng doanh thu | Tổng năng lượng (kWh) | Số phiên sạc | Phiên TB/ngày

Section 1 — Revenue + Energy (full width):
  ComposedChart: Line (revenue, left Y-axis ₫) + Bar (energy, right Y-axis kWh)
  X-axis: dynamic (hourly if today/7d, daily if 30d/3m)
  Legend toggle: click to show/hide each series

Section 2 — Usage Patterns (2-col desktop, stack mobile):
  Left: "Phân bố theo giờ" BarChart (0-23h)
    - Y: avg sessions, X: hour labels
    - Color intensity by volume (heatmap visual using bar opacity)
  Right: "Phân bố theo thứ" BarChart (T2-CN)
    - Highlight highest bar with primary color, others muted

Section 3 — Station Ranking (full width):
  "Top trạm theo doanh thu" HorizontalBarChart
    - 8 bars, sorted descending
    - Revenue label at bar end
    - Click bar → /stations/[id]

Section 4 — Connector & Power Breakdown (2-col):
  Left: PieChart connector type distribution
  Right: PieChart power level distribution

━━━ /users ━━━

PageHeader: "Quản lý Người dùng" + [Export CSV] button (UI only, toast: "Đang xuất...")

Toolbar:
  - Search: debounced, filters name + email + phone
  - Status: Tất cả | Hoạt động | Đã khóa (with counts)
  - Role: Tất cả | Người dùng | Chủ trạm
  - Khoảng đăng ký: DateRangePicker

Table columns:
  # | Họ tên | Email | SĐT | Số dư ví | Tổng phiên | Tổng kWh | Ngày tham gia | Trạng thái | Thao tác
  - "Số dư ví": formatted VND, red if <50,000
  - "Trạng thái": StatusBadge (active green / suspended red)
  - "Thao tác": [Chi tiết] + [Khóa/Mở khóa] (ConfirmDialog before action)

Bulk actions: select rows → [Export Selected] | [Suspend Selected] (UI only)
Pagination: 10/page, URL param

━━━ /users/[id] ━━━

PageHeader: [← Quay lại] + User name + StatusBadge + [Khóa tài khoản] button

Section 1 — Profile card (horizontal):
  - Avatar: large circle, initials fallback (colored by name hash)
  - Name | Email | Phone | Role badge | Member since | Last login
  - Status badge prominent

Section 2 — Stats Row (4 mini KPI cards):
  Tổng chi tiêu | Tổng kWh | Số phiên | Thời gian TB/phiên

Section 3 — Wallet (card):
  Current balance (large, green/red)
  [+ Điều chỉnh số dư] → opens WalletAdjustModal
    Modal: Amount input (positive=add, negative=deduct) + Reason textarea + [Xác nhận]
    Validation: reason required if deducting

Section 4 — Transaction History (paginated table):
  Ngày | Trạm | Bộ sạc | kWh | Thời lượng | Số tiền | Trạng thái
  - "Số tiền": formatted VND
  - "Trạng thái": completed(green) / failed(red) / pending(amber)
  - Row click → expandable detail (no separate page needed)
  Pagination: 10/page, URL param ?txPage=N

━━━ /alerts ━━━

PageHeader: Summary row — 🔴 N Critical | 🟡 N Warning | 🔵 N Info | ✅ N Resolved

Filter toolbar (sticky):
  - Severity pills: Tất cả | Critical | Warning | Info (with counts)
  - Type select: Tất cả | Lỗi bộ sạc | Thanh toán | Trạm ngoại tuyến | Tải cao
  - Status toggle: Chưa xử lý | Tất cả
  - Search: filter by message or device ID

Alert List (virtualized with react-virtual if >50 items):
  Each row (card style with left colored border):
    - Left stripe: red/amber/blue by severity
    - Icon by severity + type badge
    - Message (bold if unresolved) + Device ID link + Station name link
    - Relative timestamp (absolute on hover tooltip)
    - [Đánh dấu đã xử lý] button (with confirm if critical)

  Critical rows: bg-red-50/30 dark:bg-red-950/20
  Resolved rows: opacity-60

Bulk action: select + [Mark all resolved] button

━━━ /audit-log ━━━

PageHeader: "Nhật ký hoạt động Admin"

Filter: Date range | Action type | Admin user

Table:
  Thời gian | Admin | Hành động | Đối tượng | IP | Chi tiết
  - "Hành động": colored badge (create/green, update/blue, delete/red, login/gray)
  - "Chi tiết": expandable JSON diff (before/after)
  - Read-only, no actions

━━━ /notifications ━━━

Tabs: Tất cả | Chưa đọc | Hệ thống | Cảnh báo

Notification list:
  - Mark as read on click
  - [Đánh dấu tất cả đã đọc] button
  - Group by date (Hôm nay, Hôm qua, Tuần trước)
  - Each item: icon + title + description + time + read indicator

━━━ /profile ━━━

Admin profile form (react-hook-form):
  - Avatar upload placeholder (UI only)
  - Name, email (read-only), phone
  - [Đổi mật khẩu] section (current + new + confirm, zod validation)
  - 2FA toggle with QR code placeholder
  - [Lưu] button with success toast

━━━ /settings ━━━

Tab navigation: Giá cước | Chia sẻ doanh thu | API | Bảo mật
(All forms: react-hook-form + zod, [Lưu] with confirmation toast)

Tab 1 — Giá cước:
  - Giá điện/kWh: number input (₫), default 4,500
  - Phí đỗ xe/giờ: number input (₫), default 10,000
  - Phí khởi động phiên: number input (₫), default 2,000
  - Giá kW cao điểm (multiplier): 1.0x–2.0x, slider
  - Thuế VAT (%): select 0/5/8/10
  - Preview: "Ước tính phiên 1h/10kWh = X ₫" (live calculation)

Tab 2 — Chia sẻ doanh thu:
  - Global default: slider 0-100% (chủ trạm), auto-show platform %
  - Per-station override table:
      Station name | Default% | Override% | [Reset to default]
  - [Lưu tất cả] applies both global + per-station

Tab 3 — API:
  - API Key: masked (show last 4 chars) + [Hiện] toggle + [Tạo lại] (ConfirmDialog)
  - Webhook URL: input + [Test webhook] button
  - Rate limit: select 60/120/300 req/min
  - Allowed IPs for API: textarea
  - "Xem tài liệu API" link (placeholder href="#")

Tab 4 — Bảo mật:
  - IP Whitelist: tag input (add IP, remove with ×)
  - Session timeout: select 30m/1h/4h/8h
  - 2FA enforcement: toggle (require all admin users)
  - Login history table (last 5):
      Thời gian | IP | Thiết bị | Địa điểm | Kết quả
      Failed login rows: red tint

━━━ /not-found (404) ━━━
  Centered illustration + "404" large + "Trang không tồn tại"
  [← Về trang chủ] button

━━━ /error (500) ━━━
  Error illustration + message + [Thử lại] + [Về trang chủ] buttons
  Show error code for debugging (dev only)

═══════════════════════════════════════════════════════
REUSABLE COMPONENT SPECS
═══════════════════════════════════════════════════════

StatusBadge ({ status, size? }):
  online/available  → bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30
  charging/active   → bg-sky-100 text-sky-700 + animate-ping dot
  fault/critical    → bg-red-100 text-red-700 dark:bg-red-900/30
  offline/suspended → bg-slate-100 text-slate-600 dark:bg-slate-800
  maintenance/warn  → bg-amber-100 text-amber-700 dark:bg-amber-900/30
  completed         → bg-emerald-100 text-emerald-700
  failed            → bg-red-100 text-red-700
  pending           → bg-yellow-100 text-yellow-700

KpiCard ({ label, value, subtext?, icon, trend?, color?, href? }):
  - shadcn Card, hover:shadow-md cursor-pointer if href
  - Icon: top-right, muted, 20px
  - Value: text-2xl font-bold tabular-nums
  - Trend: ↑ green / ↓ red + percentage + vs label

DataTable<T> ({ columns, data, loading, emptyIcon, emptyMessage, pageSize=10 }):
  - Column def: { key, header, sortable?, render?(row) }
  - Sort: click header → toggle asc/desc, URL param ?sort=key&dir=asc
  - Loading: 5-row skeleton (animate-pulse)
  - Empty: centered icon + message
  - Sticky header with shadow on scroll

ChartCard ({ title, subtitle?, children, loading, periodSelector? }):
  - shadcn Card wrapper
  - ResponsiveContainer height prop (default 300)
  - Loading: Skeleton same height
  - All Recharts tooltips use shadcn Card styling

ConfirmDialog ({ title, description, confirmLabel, variant="default"|"destructive", onConfirm }):
  - shadcn AlertDialog
  - "destructive" variant: red confirm button
  - Loading state on confirm button while action processes

PageHeader ({ title, breadcrumbs, actions? }):
  - Breadcrumb: shadcn Breadcrumb component
  - Actions: right-aligned slot for buttons

EmptyState ({ icon, title, description, action? }):
  - Centered, muted colors
  - Optional action button

═══════════════════════════════════════════════════════
INTERACTIONS & STATES (apply to ALL interactive elements)
═══════════════════════════════════════════════════════

Required states for every component:
  - Loading: skeleton or spinner (never blank)
  - Empty: EmptyState component
  - Error: ErrorState with [Thử lại] button
  - Focus: focus-visible:ring-2 ring-primary ring-offset-2
  - Hover: transition-colors 150ms

useRealtime hook contract:
  type RealtimeUpdate = {
    kpis: { revenue: number; activeSessions: number; occupancyPercent: number; healthPercent: number }
    chargerStatuses: Record<string, Charger['status']>
    newAlerts: Alert[]
  }
  - Emits every 30s
  - Dashboard subscribes to kpis
  - Charger list/detail subscribes to chargerStatuses
  - Alert feed subscribes to newAlerts (new item prepended with animation)
  - Must call cleanup() on unmount to clear interval

Toasts (shadcn Sonner):
  - success: green, 3000ms, checkmark icon
  - error: red, 5000ms, X icon, dismiss button
  - info: blue, 3000ms
  - Default language: Vietnamese
  - Position: bottom-right

Form behavior (react-hook-form + zod):
  - Validate on blur for each field
  - Submit button disabled until form is valid and dirty
  - Show inline error messages (text-destructive text-sm)
  - Success: toast + reset form to saved values

═══════════════════════════════════════════════════════
OUTPUT REQUIREMENTS
═══════════════════════════════════════════════════════

Deliver complete, runnable code. Every file in ARCHITECTURE must exist.

Mandatory:
1. /types/index.ts — all interfaces exported
2. /lib/mock-data.ts — typed data, no implicit any
3. /messages/vi.json + en.json — 100% key coverage, zero hardcoded strings
4. tailwind.config.ts — Inter font (next/font), CSS variable colors, custom animations
5. /app/globals.css — CSS variable definitions, dark mode overrides
6. All pages fully implemented — no empty shells, no TODO comments
7. All components handle loading/empty/error states
8. All forms use react-hook-form + zod with Vietnamese validation messages
9. URL state via nuqs for all filters and pagination

Forbidden:
- lorem ipsum or placeholder text
- inline styles (Tailwind only)
- `any` type
- recreating shadcn components (Button, Input, Card, Dialog, etc.)
- same layout repeated on different pages
- missing imports
- hardcoded Vietnamese/English strings (must use t())

═══════════════════════════════════════════════════════
Checklist màn hình ADMIN cần triển khai
═══════════════════════════════════════════════════════

Trạng thái:
  [ ] = Chưa làm
  [/] = Đang làm
  [x] = Hoàn thành

──────────────────────────────────────────────────────
  PHASE 0 — Nền tảng dự án (bắt buộc làm trước)
──────────────────────────────────────────────────────
  [x] Khởi tạo Next.js 14 App Router + TypeScript strict
  [x] Cài đặt & cấu hình: tailwindcss, shadcn/ui, next-intl, nuqs, next-themes
  [x] Cài đặt: recharts, react-hook-form, zod, lucide-react, sonner
  [x] /types/index.ts — Tất cả interfaces (Station, Charger, User, Alert, Transaction, ChargingEvent, AdminProfile, LoginHistoryEntry)
  [x] /lib/mock-data.ts — 8 trạm, 30 bộ sạc, 20 users, 50 alerts, 100 transactions, 60 events, revenue series
  [x] /lib/utils.ts + /lib/constants.ts — Helper functions & enums
  [x] /messages/vi.json + /messages/en.json — 100% key coverage
  [x] tailwind.config.ts — Inter font, CSS variable colors, custom animations
  [x] /app/globals.css — CSS variables, dark mode overrides

──────────────────────────────────────────────────────
  PHASE 1 — Layout & Shared Components
──────────────────────────────────────────────────────
  Layout / Shared (không phải page, nhưng cần build)
    [x] AdminLayout (/app/(admin)/layout.tsx)
          - Sidebar 240px/64px collapsible, persist localStorage
          - Header sticky 56px, breadcrumb auto-generated
          - Responsive: Sheet mobile (<768px), collapsed (768–1023px), persistent (≥1024px)
          - Providers: QueryClient, next-intl, next-themes, Toaster
    [x] Sidebar.tsx
          - Nav groups: Tổng quan | Hạ tầng | Vận hành | Hệ thống
          - Active: bg-primary/10 text-primary border-r-2 border-primary
          - Collapse toggle + tooltip khi collapsed
          - Bottom: Settings + Admin avatar
    [x] Header.tsx
          - Breadcrumb, GlobalSearch button (Cmd+K), Language switcher [VI|EN]
          - Notification bell + unread badge
          - Admin avatar dropdown: Profile | Audit Log | Logout (ConfirmDialog)
    [x] GlobalSearch.tsx — CommandDialog, search stations/chargers/users, sessionStorage recent
    [x] KpiCard.tsx — Value/trend/icon/href, hover shadow, animate-ping dot option
    [x] DataTable.tsx — Generic sortable + paginated, skeleton loading, empty state, sticky header
    [x] StatusBadge.tsx — 8 statuses, dark mode variants, animate-ping for charging/active
    [x] ChartCard.tsx — Recharts wrapper, ResponsiveContainer, shadcn tooltip styling, skeleton
    [x] AlertItem.tsx — Severity stripe, icon, relative time, mark resolved button
    [x] ConfirmDialog.tsx — shadcn AlertDialog, destructive variant, loading state
    [x] PageHeader.tsx — shadcn Breadcrumb + title + actions slot
    [x] EmptyState.tsx — Icon + title + description + optional action
    [x] ErrorState.tsx — Error icon + message + Retry button
    [x] MapPlaceholder.tsx — SVG grid map + 8 pins + hover tooltip

──────────────────────────────────────────────────────
  PHASE 2 — Authentication Pages
──────────────────────────────────────────────────────
  Authentication (3 màn hình)
    [x] Login /login
          - Centered card 400px, Logo + heading
          - Email + Password (react-hook-form + zod, Vietnamese messages)
          - Show/hide password toggle
          - "Ghi nhớ đăng nhập" checkbox
          - Loading spinner state + error toast (mock 1s delay)
          - "Quên mật khẩu?" link
    [x] Forgot Password /forgot-password
          - Email input + submit button
          - Success state: illustration + instructions
          - Back to login link
    [x] Verify 2FA /verify-2fa
          - 6-digit OTP (auto-advance between digits)
          - Countdown timer 60s resend
          - [Xác nhận] button

──────────────────────────────────────────────────────
  PHASE 3 — Core Dashboard
──────────────────────────────────────────────────────
  Core Dashboard (1 màn hình)
    [x] Dashboard / NOC View /dashboard
          - useRealtime hook: update KPIs mỗi 30s (±5% variance), chargerStatuses, newAlerts
          - Last updated timestamp + manual refresh button
          Row 1 — 4 KPI Cards:
            [x] Doanh thu hôm nay (TrendingUp, +12.4% trend, click→/analytics)
            [x] Phiên sạc đang hoạt động (Zap, animate-ping, click→/chargers?status=charging)
            [x] Slots trống/Đã dùng (ParkingSquare, progress bar color thresholds)
            [x] Sức khỏe hệ thống (color thresholds ≥90%/70-89%/<70%, click→/alerts)
          Row 2 — Charts:
            [x] SessionChart: LineChart 24h, 2 lines (today vs yesterday dashed)
            [x] StatusDonut: PieChart charger statuses, center total, legend counts
          Row 3 — Map + Alerts:
            [x] StationMap: SVG pins, colored by load%, hover tooltip
            [x] AlertFeed: last 10 unresolved, colored rows, [Xem tất cả→] link

──────────────────────────────────────────────────────
  PHASE 4 — Station Management
──────────────────────────────────────────────────────
  Station Management (2 màn hình)
    [x] Stations List /stations
          - PageHeader + [+ Thêm trạm] (disabled + tooltip)
          - Search debounced 300ms (name + address)
          - Status tabs: Tất cả | Online | Offline | Bảo trì (count badges)
          - View toggle Table/Grid (persist localStorage)
          - Sort: Tên | Tải (%) | Doanh thu
          - Table: # | Tên | Địa chỉ | Slot | Đang sạc | Tải | DT | Status | Thao tác
          - Grid: StationCard 3/2/1 col
          - Pagination 10/page, URL param ?page=N
          - Empty state: MapPin icon
          - URL state: ?search=&status=&view=&sort=&page= (nuqs)
    [x] Station Detail /stations/[id]
          - PageHeader: ← + Station name + StatusBadge + [Chỉnh sửa]
          - Section 1 Info 2-col: static info | live stats (useRealtime)
          - Section 2 Charger Grid: grouped by status, border-l-4 colored cards
          - Section 3 Revenue BarChart: 7 ngày gần nhất

──────────────────────────────────────────────────────
  PHASE 5 — Charger Management
──────────────────────────────────────────────────────
  Charger Management (2 màn hình)
    [x] Chargers List /chargers
          - PageHeader: "Quản lý Bộ sạc" + total/charging count badge
          - Filter bar sticky: Status tabs | Power (22/50/150kW) | Connector | Station dropdown
          - Grid 4/2/1 col: ChargerCard
          - If charging: progress bar kWh + live session timer (useRealtime 10s)
          - Bulk select: checkbox + [Restart Selected] action bar
          - URL state: ?status=&power=&connector=&station=&page= (nuqs)
    [x] Charger Detail /chargers/[id]
          - PageHeader: ← + Charger ID + StatusBadge (animated if charging)
          - Section 1 Live Status: large icon + animate-ping, update 10s, last-updated label
            Buttons: [Khởi động lại] | [Tắt] (ConfirmDialog, UI only)
          - Section 2 Specs grid 2x2: Công suất | Kết nối | Firmware | Ngày lắp đặt
          - Section 3 Current Session (if charging): User, start time, kWh live, timer, ETA
            [Dừng phiên] button (ConfirmDialog)
          - Section 4 Event Log: EventTimeline 20 events, colored dots, expandable payload

──────────────────────────────────────────────────────
  PHASE 6 — Analytics
──────────────────────────────────────────────────────
  Analytics (1 màn hình)
    [x] Analytics /analytics
          - PeriodSelector sticky: Hôm nay | 7 ngày | 30 ngày | 3 tháng | Tùy chỉnh
          - DateRangePicker (shadcn Calendar) for custom period
          - Station filter dropdown
          - URL state: ?period=&from=&to=&station= (nuqs)
          - KPI Row: Tổng DT | Tổng kWh | Số phiên | Phiên TB/ngày
          - Section 1 ComposedChart: Line (revenue ₫, left Y) + Bar (energy kWh, right Y)
          - Section 2 Usage Patterns 2-col:
              Left: BarChart phân bố theo giờ (0-23h, opacity intensity)
              Right: BarChart phân bố theo thứ (T2-CN, highlight max bar)
          - Section 3 Station Ranking: HorizontalBarChart, click→/stations/[id]
          - Section 4 Breakdown 2-col: PieChart connector | PieChart power level

──────────────────────────────────────────────────────
  PHASE 7 — User Management
──────────────────────────────────────────────────────
  User Management (2 màn hình)
    [ ] Users List /users
          - PageHeader + [Export CSV] (toast: "Đang xuất...")
          - Search debounced (name + email + phone)
          - Status tabs: Tất cả | Hoạt động | Đã khóa (counts)
          - Role filter: Tất cả | Người dùng | Chủ trạm
          - DateRangePicker: Khoảng đăng ký
          - Table: # | Tên | Email | SĐT | Số dư ví | Phiên | kWh | Ngày TG | Status | Thao tác
          - Số dư ví: red if <50,000
          - Thao tác: [Chi tiết] + [Khóa/Mở khóa] (ConfirmDialog)
          - Bulk: select rows + [Export] | [Suspend Selected]
          - Pagination 10/page
    [ ] User Detail /users/[id]
          - PageHeader: ← + Tên + StatusBadge + [Khóa tài khoản]
          - Section 1 Profile horizontal: Avatar initials (name-hash color) + info
          - Section 2 Stats Row: 4 mini KPI (Tổng chi tiêu | kWh | Phiên | TB/phiên)
          - Section 3 Wallet: balance (green/red) + [Điều chỉnh số dư]
              WalletAdjustModal: amount +/- | reason (required if negative) | zod validation
          - Section 4 Transaction History: paginated table 10/page (?txPage=N)
              Expandable row detail (no separate page)

──────────────────────────────────────────────────────
  PHASE 8 — Operations
──────────────────────────────────────────────────────
  Operations (2 màn hình)
    [x] Alerts /alerts
          - PageHeader Summary: 🔴 N Critical | 🟡 N Warning | 🔵 N Info | ✅ N Resolved
          - Filter sticky: Severity pills | Type select | Status toggle (Chưa xử lý | Tất cả) | Search
          - Alert List (react-virtual if >50): card style, left colored border
          - Critical rows: bg-red-50/30, Resolved: opacity-60
          - [Đánh dấu đã xử lý] (ConfirmDialog if critical)
          - Bulk: [Mark all resolved]
          - URL state: ?severity=&type=&status=&q= (nuqs)
    [x] Audit Log /audit-log
          - PageHeader: "Nhật ký hoạt động Admin"
          - Filter: Date range | Action type | Admin user
          - Table: Thời gian | Admin | Hành động | Đối tượng | IP | Chi tiết
          - Hành động: colored badge (create/green, update/blue, delete/red, login/gray)
          - Chi tiết: expandable JSON diff (before/after)
          - Read-only, no actions

──────────────────────────────────────────────────────
  PHASE 9 — System Pages
──────────────────────────────────────────────────────
  System (3 màn hình)
    [x] Settings /settings
          - Tab 1 Giá cước: giá điện/kWh, phí đỗ, phí khởi động, multiplier slider, VAT, live preview
          - Tab 2 Chia sẻ doanh thu: global slider + per-station override table + [Reset]
          - Tab 3 API: masked API key + toggle show + [Tạo lại] (ConfirmDialog)
              Webhook URL + [Test], rate limit select, allowed IPs textarea
          - Tab 4 Bảo mật: IP whitelist (tag input), session timeout, 2FA enforcement toggle
              Login history table (last 5, failed rows red)
          - All tabs: react-hook-form + zod + Vietnamese validation + toast on save
    [x] Notifications /notifications
          - Tabs: Tất cả | Chưa đọc | Hệ thống | Cảnh báo
          - [Đánh dấu tất cả đã đọc] button
          - Group by date: Hôm nay | Hôm qua | Tuần trước
          - Each item: icon + title + desc + time + read indicator
          - Mark as read on click
    [x] Profile /profile
          - Avatar upload placeholder (UI only)
          - Form: Name, email (read-only), phone — react-hook-form + zod
          - [Đổi mật khẩu]: current + new + confirm, zod validation
          - 2FA toggle + QR code placeholder
          - [Lưu] with success toast

──────────────────────────────────────────────────────
  PHASE 10 — Error Pages
──────────────────────────────────────────────────────
  Error Pages (3 màn hình)
    [ ] 404 Not Found /not-found.tsx
          - Centered illustration + "404" large + "Trang không tồn tại"
          - [← Về trang chủ] button
    [ ] 500 Error /error.tsx
          - Error illustration + message + [Thử lại] + [Về trang chủ]
          - Show error code for debugging (dev only)
    [ ] 403 Unauthorized (global-error.tsx)
          - Access denied illustration + message + [← Về trang chủ]

──────────────────────────────────────────────────────
  HOOKS
──────────────────────────────────────────────────────
  [ ] /hooks/useRealtime.ts
        - setInterval 30s, cleanup on unmount
        - Emits: kpis (revenue/activeSessions/occupancyPercent/healthPercent)
        - chargerStatuses: Record<string, Charger['status']>
        - newAlerts: Alert[] (prepend with animation)
  [ ] /hooks/useGlobalSearch.ts — Search logic + sessionStorage recent
  [ ] /hooks/useConfirm.ts — Imperative confirm dialog hook

──────────────────────────────────────────────────────
  TỔNG CỘNG
──────────────────────────────────────────────────────
  19 màn hình + 3 layout/shared + 3 hooks + 9 shared components

  📊 Tiến độ: 0 / 19 màn hình hoàn thành
  ⚙️  Nền tảng: 0 / 9 tasks hoàn thành
  🧩  Components: 0 / 12 components hoàn thành
  🪝  Hooks: 0 / 3 hooks hoàn thành

──────────────────────────────────────────────────────
  GHI CHÚ TRIỂN KHAI
──────────────────────────────────────────────────────
  • Ưu tiên thứ tự: Phase 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
  • Mỗi page PHẢI implement đầy đủ: loading | empty | error state
  • Mọi text hiển thị PHẢI qua t('key') — không hardcode string
  • URL state (filter/pagination) PHẢI dùng nuqs
  • Số tiền VND dùng useFormatter() của next-intl
  • Không dùng `any` — enforce bởi TypeScript strict mode
  • Không tái tạo shadcn components (Button, Input, Card, Dialog, etc.)