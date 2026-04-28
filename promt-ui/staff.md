You are a senior frontend architect specializing in operational web interfaces
for IoT and Smart City platforms.

Your task: Extend the existing Next.js 14 App Router project by implementing the
STAFF role — a RESPONSIVE WEB application for field operators working at EV
charging parking stations from a workstation, counter terminal, or tablet.

═══════════════════════════════════════════════════════
PLATFORM ORIENTATION (read carefully)
═══════════════════════════════════════════════════════

The STAFF module is a WEB-FIRST responsive application:
- Primary device: desktop / laptop at the parking office or counter
- Secondary device: tablet for walking the lot (responsive, not PWA-only)
- NOT a mobile-only PWA — uses standard browser
- DOES use top header + left sidebar (consistent with ADMIN/OWNER)
- DOES support keyboard shortcuts and mouse-first interactions
- May also work on phone responsive, but is NOT optimized for one-hand mobile

The STAFF persona at the workstation:
- Monitors the slot grid in real time on a large screen
- Assists walk-in customers at the counter (looks up customers, starts manual sessions)
- Handles issues with full-keyboard form input (faster than mobile typing)
- Manages tasks and shift handovers
- Coordinates with other staff via shared dashboard

The interface must prioritize:
  - Speed (≤ 2 clicks to common actions, keyboard shortcuts)
  - Glanceability (large monitors at a distance — status readable from across the room)
  - Density (web has space — show more info per view than admin would)
  - Operational clarity (tasks-driven, not analytics-driven)

═══════════════════════════════════════════════════════
SCOPE & DATA ISOLATION
═══════════════════════════════════════════════════════

- ADMIN and OWNER modules already exist — DO NOT modify
- Reuse shared components from /components/admin/shared/
  (StatusBadge, ConfirmDialog, EmptyState, ErrorState, DataTable, PageHeader,
   ChartCard)
- New staff-specific components live in /components/staff/

Data isolation:
- Every Staff page filters mock data by:
    currentStaffId      = "STF-001"
    assignedParkingId   = "ST001"
    currentShift        = "morning" | "afternoon" | "night"
    shiftStartAt / shiftEndAt (today's dates)
- Staff sees ONLY:
    - Slots and chargers at assignedParkingId
    - Sessions at that parking, during their shift (or live ones)
    - Customers currently/recently at that parking
    - Tasks assigned to them or their parking
    - Notifications addressed to them or to the parking
- Staff CANNOT see:
    - Revenue figures (that's owner-only)
    - Other parkings' data
    - Other staff's profiles (except shift-mates today)

Mock staff context (in /lib/mock-staff.ts):
  currentStaffId: "STF-001"
  name: "Nguyễn Văn An"
  role: "operator"
  assignedParkingId: "ST001"
  assignedParkingName: "Trạm Quận 1 - Vincom"
  currentShift: { type: "morning", start: "06:00", end: "14:00" }
  isClockedIn: boolean
  clockedInAt?: string

═══════════════════════════════════════════════════════
TECH STACK (inherit from ADMIN — no substitutions)
═══════════════════════════════════════════════════════

- Framework:   Next.js 14 (App Router)
- Language:    TypeScript strict, no `any`
- Styling:     Tailwind v3, CSS variables, shadcn/ui
- Charts:      Recharts (used minimally — staff is operational, not analytical)
- i18n:        next-intl (extend /messages with "staff.*" namespace)
- Icons:       lucide-react only
- Forms:       react-hook-form + zod
- State:       URL params (nuqs) + Zustand for action queue (network resilience)
- Default lang: Vietnamese
- Default theme: light, with theme toggle (dark mode supported for night shift)

PWA: NOT a hard requirement. Optional progressive enhancement only.
  - If implemented: manifest.json + light service worker for offline read-only fallback
  - Action queue (Zustand persist) for network blips — but NOT designed for fully offline use

═══════════════════════════════════════════════════════
DESIGN SYSTEM (web-first, inherit from admin)
═══════════════════════════════════════════════════════

Inherit color palette, typography baseline, spacing, motion, accessibility from ADMIN.

Staff accent color: violet-600 (#7C3AED) — distinguishes from:
  admin (sky), owner (emerald), user (indigo)
  → variable --color-staff-accent
  → Active sidebar nav, primary action CTAs

Typography (web-optimized, NOT mobile-optimized):
  - Page heading:  text-xl md:text-2xl font-semibold tracking-tight (matches admin)
  - Slot label in grid:  text-2xl font-bold (must read across the room on large monitors)
  - Section heading:  text-lg font-semibold
  - Body:  text-sm md:text-base
  - Caption:  text-xs text-muted-foreground

Touch / click targets:
  - Standard buttons: 36–40px height (web standard via shadcn Button)
  - Critical actions (Stop session, Emergency): 48px height
  - Slot cells in grid: 80×80px (still large — readable at distance)

Spacing:
  - Container padding: p-6 md:p-8 (more generous than mobile's p-4)
  - Card spacing: gap-4 / gap-6
  - Cards: rounded-lg (web-feel, NOT rounded-2xl)

Layout containers:
  - Standard pages: max-w-7xl mx-auto (wider than user/owner — staff needs density)
  - Slot grid page: full-width within content area

Motion:
  - Hover: subtle background change (no lift — slot cells stay flat for status clarity)
  - Transitions: 150ms ease-out
  - Page transitions: 100ms fade
  - Pulse animation reserved for charging/active status only
  - NO mobile-style slide-from-right page transitions

NO mobile-specific patterns:
  - NO haptic feedback (web doesn't have reliable haptics)
  - NO hold-to-confirm gestures (use click + confirm dialog instead)
  - NO bottom navigation (use sidebar)
  - NO swipe actions (use right-click context menu or row action buttons)
  - NO pull-to-refresh (use refresh button + auto-refresh)

Dark mode:
  - Auto-switch by time (20:00–06:00 → dark for night shift)
  - Override toggle in /me preferences
  - Same dark variables as admin

Accessibility (WCAG 2.1 AA mandatory):
  - Skip-to-content link
  - Semantic HTML
  - Focus-visible rings on every interactive element
  - aria-label on icon-only buttons
  - Color contrast ≥4.5:1
  - Full keyboard navigation (Tab, Enter, Esc, Arrow keys)
  - Screen reader: meaningful labels, aria-live on slot grid updates

Keyboard shortcuts (POWER FEATURE for daily operators):
  - Cmd/Ctrl+K: Global search (customers, slots, sessions)
  - Cmd/Ctrl+N: New manual session
  - Cmd/Ctrl+R: Refresh slot grid
  - Cmd/Ctrl+/: Show shortcut help dialog
  - G then H: Go to /home
  - G then S: Go to /sessions
  - G then T: Go to /tasks
  - G then R: Go to /report
  - Esc: Close modal/sheet
  - Arrow keys: Navigate slot grid (with selection highlight)
  - Enter: Open selected slot detail
  - Slash (/): Focus search box from anywhere

═══════════════════════════════════════════════════════
EXTENDED TYPES (add to /types/index.ts)
═══════════════════════════════════════════════════════

interface StaffShift {
  id: string
  staffId: string
  parkingId: string
  type: "morning" | "afternoon" | "night"
  start: string                  // "06:00"
  end: string                    // "14:00"
  date: string                   // ISO date
  clockedInAt?: string           // ISO datetime
  clockedOutAt?: string
  handoverNote?: string
}

interface StaffTask {
  id: string                     // "TASK-001"
  parkingId: string
  assignedStaffId?: string       // null = unassigned, anyone can take
  type: "opening_check" | "hourly_inspection" | "closing_check" | "custom"
  title: string                  // "Kiểm tra bộ sạc CHG-003"
  description?: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in_progress" | "done" | "skipped"
  dueAt?: string
  createdAt: string
  completedAt?: string
  completedBy?: string
  checklistItems?: { label: string; checked: boolean }[]
}

interface IssueReport {
  id: string
  reporterId: string
  parkingId: string
  chargerId?: string
  slotId?: string
  type: "charger_fault" | "wrong_parking" | "payment_issue" | "facility" | "customer_complaint" | "other"
  severity: "low" | "medium" | "high" | "urgent"
  description: string
  photoUrls: string[]            // mock placeholder URLs
  voiceNoteUrl?: string          // optional, less central on web than mobile
  location?: { lat: number; lng: number }
  status: "submitted" | "received" | "in_progress" | "resolved" | "rejected"
  createdAt: string
  updatedAt: string
  resolution?: string
}

interface WalkInCustomer {
  id: string
  name?: string
  phone?: string
  vehiclePlate: string
  paymentMethod: "cash" | "qr_transfer" | "wallet"
  walletUserId?: string
  estimatedKwh?: number
}

interface ShiftHandover {
  id: string
  fromStaffId: string
  toStaffId?: string
  parkingId: string
  shiftDate: string
  notes: string                  // markdown supported
  flaggedItems: { type: string; description: string }[]
  createdAt: string
}

interface StaffNotification {
  id: string
  recipientStaffId?: string
  parkingId: string
  type: "task_assigned" | "session_alert" | "fault_alert" | "shift_reminder" | "owner_message" | "system"
  title: string
  body: string
  link?: string
  read: boolean
  createdAt: string
  priority: "info" | "warning" | "critical"
}

═══════════════════════════════════════════════════════
ARCHITECTURE
═══════════════════════════════════════════════════════

/app/(staff)/
  layout.tsx                     ← StaffLayout (top header + left sidebar)
  home/
    page.tsx                     ← Slot grid + live ops dashboard (main screen)
  slots/
    [id]/
      page.tsx                   ← Slot detail page (also via deep link)
  sessions/
    page.tsx                     ← Sessions list (active/today)
    [id]/
      page.tsx                   ← Session detail + intervene
    new/
      page.tsx                   ← Manual session wizard (multi-step)
  scan/
    page.tsx                     ← QR scanner (mock camera) — secondary on web
  customers/
    page.tsx                     ← Walk-in lookup
    [id]/
      page.tsx                   ← Customer info + balance + topup
  tasks/
    page.tsx                     ← Task list (opening/hourly/closing)
    [id]/
      page.tsx                   ← Task detail + checklist
  report/
    page.tsx                     ← Issue report form
    history/
      page.tsx                   ← My reports
  notifications/
    page.tsx
  shift/
    page.tsx                     ← Clock in/out, my shift, shift-mates
    handover/
      page.tsx                   ← Handover notes
  emergency/
    page.tsx                     ← Emergency procedures (no full-screen takeover on web)
  me/
    page.tsx                     ← Profile + preferences + logout
    sync/
      page.tsx                   ← Action queue (if PWA enabled)

/components/staff/
  layout/
    StaffSidebar.tsx             ← Left sidebar nav (collapsible like admin)
    StaffHeader.tsx              ← Top header with shift status pill
    ShiftStatusPill.tsx
    GlobalSearch.tsx             ← Cmd+K command palette
    KeyboardShortcutsDialog.tsx
  home/
    SlotGrid.tsx                 ← Web-optimized grid (denser than mobile)
    SlotCell.tsx                 ← 80×80 with keyboard navigation
    SlotFilterBar.tsx            ← Zone tabs + status pills
    SlotDetailDrawer.tsx         ← Side drawer (right) on click
    QuickActionsToolbar.tsx      ← Top-right toolbar (NOT bottom FAB)
    LiveOpsPanel.tsx             ← Right-side live activity feed
  sessions/
    NewSessionWizard.tsx         ← Multi-step modal/page
    StopSessionDialog.tsx
  scan/
    QRScannerView.tsx            ← Mock camera UI (still useful for tablet)
    ManualInputPanel.tsx
  customers/
    CustomerLookupTable.tsx      ← Table on web (not card list)
    TopupDialog.tsx
  tasks/
    TaskItem.tsx
    ChecklistView.tsx
  report/
    IssueReportForm.tsx
    PhotoUploadField.tsx         ← File input + drag-drop
  shift/
    ClockInOutCard.tsx
    HandoverEditor.tsx           ← Markdown editor with toolbar
    ShiftMatesList.tsx
  emergency/
    EmergencyActionsPanel.tsx    ← Confirmation dialogs (no hold-to-confirm)
  shared/
    PageHeader.tsx
    QueuedActionsBadge.tsx       ← Network resilience indicator

/lib/
  mock-staff.ts
  staff-action-queue.ts          ← Zustand store (queue actions during network blips)

═══════════════════════════════════════════════════════
LAYOUT — StaffLayout
═══════════════════════════════════════════════════════

Left Sidebar (consistent with admin/owner — NOT bottom nav):
  - Width: 240px expanded / 64px collapsed
  - Background: neutral-900 (#0F172A)
  - Persist collapse state to localStorage
  - Logo top: EVCharge + "STAFF" pill
  - Nav groups:
      Vận hành:
        - Trang chủ (Slot Grid) → /home
        - Phiên sạc → /sessions
        - Khách hàng → /customers
        - Quét QR → /scan
      Công việc:
        - Việc cần làm → /tasks
        - Báo cáo → /report
      Ca làm việc:
        - Ca của tôi → /shift
        - Bàn giao → /shift/handover
      Khẩn cấp:
        - Emergency → /emergency (red icon)
      Cá nhân:
        - Thông báo → /notifications
        - Tài khoản → /me
  - Active item: bg-violet-600/10 text-violet-500 border-r-2 border-violet-500
  - Tooltip on icon when collapsed

Top Header (sticky, h-14):
  - Left: Hamburger (mobile) + Page title
  - Center: GlobalSearch (Cmd+K) — search slots, customers, sessions
  - Right cluster:
      - ShiftStatusPill: "Ca sáng • Còn 02:34" (countdown)
          green = in shift, amber = last 30min, slate = off shift
          Click → /shift
      - Quick action button: [+ Phiên mới] (Cmd+N shortcut)
      - Notification bell with unread count badge
      - Theme toggle (light/dark)
      - Language switch [VI | EN]
      - Staff avatar + dropdown (Hồ sơ / Bàn giao / Đăng xuất)

Responsive:
  - ≥1024px: sidebar persistent
  - 768–1023px: sidebar collapsed by default
  - <768px: sidebar as Sheet drawer (still NOT bottom nav)

Network indicator:
  - When offline detected: subtle banner under header
    "Mất kết nối — N hành động đang chờ đồng bộ"
  - On reconnect: auto-flush queue + success toast

Keyboard shortcuts dialog: opens via Cmd+/ or "?" key
  - Lists all shortcuts grouped by category
  - Searchable

═══════════════════════════════════════════════════════
PAGE SPECIFICATIONS
═══════════════════════════════════════════════════════

━━━ /home (MAIN SCREEN) ━━━

Layout: 3-column grid on wide desktop, stack on smaller.

Top: Shift status banner (only if not clocked in)
  - Yellow banner: "Bạn chưa chấm công vào ca → [Chấm công ngay]"

Block 1 — KPI strip (4 cards, full width):
  Đang sạc (N) / Còn trống (N) / Đang đặt (N) / Có lỗi (N)
  Click card → filter slot grid

Main area (2-column on desktop ≥1280px):

Left column (2/3 width — primary):
  Block 2 — Slot Grid (primary UI):
    Filter toolbar: Zone tabs (A | B | C | All) + status pills + [⟳ Refresh] (Cmd+R)
    Grid: 6 columns desktop, 4 columns tablet, 3 columns mobile
    SlotCell (80×80px):
      - Background by status (high contrast for distance reading):
          available → emerald-500 bg, white text
          reserved  → sky-500 bg
          charging  → amber-500 bg + animate-pulse
          fault     → red-500 bg + bold border
          occupied_no_charge → slate-500 bg
      - Content: slot number (text-2xl bold), ⚡ icon if has charger,
                 vehicle plate small if occupied
      - Click → opens SlotDetailDrawer (right-side drawer)
      - Right-click → context menu:
          Mark as fault | Force release | Reserve manually | Open detail
      - Keyboard: arrow keys navigate, Enter opens, F → mark fault
      - Real-time: WebSocket-mock updates every 10s with aria-live announcement

  SlotDetailDrawer (right-side, width 480px):
    - Slot info, charger info
    - If charging: customer name + plate + kWh + duration + cost (live)
    - Action buttons (full-width within drawer):
        [Bắt đầu sạc] (if available) → opens NewSessionWizard
        [Dừng sạc] (if charging) → confirm dialog
        [Báo lỗi] → /report?slot=X
        [Giải phóng slot] (force, requires reason input)
    - History tab: last 10 sessions at this slot

Right column (1/3 width — context panel):
  Block 3 — LiveOpsPanel:
    - Live sessions list (last 5 active) with countdown
    - Recent activity feed (last 10 events)
    - Pinned tasks for today (priority high/urgent)
    Each section has [Xem tất cả →] link

Block 4 — QuickActionsToolbar (sticky top of content area):
  Buttons (NOT bottom FAB):
    [+ Phiên mới] Cmd+N
    [Quét QR]
    [Báo lỗi]
    [Khẩn cấp] (red, less prominent than mobile)

━━━ /slots/[id] ━━━

Full-page slot detail (when accessed via deep link or URL).

Header: [← Back] + Slot label + StatusBadge

3-column layout on desktop:
  Left: Status card (large) + current charger info + recent sessions table
  Middle: Quick actions panel (start/stop/release/report) + manual override notes
  Right: Maintenance history + flagged events + photos

Actions menu in header: [⋯] dropdown with all destructive actions.

━━━ /sessions ━━━

PageHeader: "Phiên sạc" + tabs Đang chạy | Hôm nay | Lịch sử (last 7d)
[+ Phiên mới] CTA top-right

DataTable (web table — NOT card list):
  Mã phiên | Slot | Khách | Xe | Bộ sạc | Bắt đầu | Thời lượng | kWh | Trạng thái | Thao tác

  - Inline action buttons: [Dừng] [Chi tiết]
  - Right-click row → context menu
  - Multi-select checkbox column for bulk actions
  - Sticky header
  - Pagination: 25/page (web has space, more rows than mobile)

Filter bar above table:
  - Slot select | Customer search | Status pills | Date range
  - URL state via nuqs

━━━ /sessions/[id] ━━━

Header: [← Back] + Session ID + StatusBadge + actions menu

3-column layout (desktop):
  Left card: Customer details (name, phone with [Gọi] tel:, plate, history at this parking)
  Middle card: Session live data
    - Big SOC display
    - kWh delivered + duration + cost
    - Charge curve chart (Recharts)
    - Auto-refresh every 5s
  Right card: Charger + Slot info, payment method, voucher (if any)

Sticky bottom action bar:
  [Dừng phiên] (destructive confirm dialog, NOT hold-to-confirm)
  [Gia hạn]
  [In hóa đơn]
  [Báo cáo sự cố]

━━━ /sessions/new ━━━

Multi-step wizard with horizontal Stepper at top:
  1 Slot → 2 Khách → 3 Thanh toán → 4 Xác nhận

Step 1 — Chọn slot:
  - Mini slot grid (clickable cells)
  - Or Charger ID input with autocomplete
  - Or [Quét QR trên bộ sạc] → /scan

Step 2 — Khách hàng:
  - Tabs: [Khách có app] | [Khách walk-in]
  - Khách có app: search by phone/email/QR scan → load profile
  - Khách walk-in: form (vehicle plate REQUIRED, name optional, phone optional)
  - Show recent customers list for quick re-select

Step 3 — Thanh toán:
  - If app user with wallet: show balance, [Trừ ví] option
  - Walk-in: payment method radio (Cash | QR Transfer | Top-up wallet)
  - Estimated cost preview (live calculation)
  - Voucher input

Step 4 — Xác nhận:
  - Summary of slot, charger, customer, payment
  - [Bắt đầu phiên] primary button
  - On success: success page + auto-redirect to /sessions/[id]

If network blip: action queued with toast "Sẽ đồng bộ khi có mạng"
Keyboard: Tab navigation, Enter to advance step, Esc to cancel.

━━━ /scan ━━━

Web-context: useful when staff has a webcam-equipped terminal or tablet.

Two-column layout:
  Left (camera area): Mock camera viewfinder with reticle + scanning line
                      [✕] close | [💡] flashlight (if mobile)
  Right (manual panel): ManualInputPanel
    - Tabs: Khách hàng | Xe (biển số) | Bộ sạc
    - Input field large with autocomplete
    - Recent scans list (sessionStorage)
    - [Tra cứu]

Result router:
  - User QR → /customers/[id]
  - Vehicle plate → /customers?plate=X
  - Charger ID → /sessions/new?charger=X
  - Unknown → toast error + stay on page

Mock: clicking viewfinder triggers a 1.5s simulation that resolves to a
random result type. Keyboard: type to focus manual input.

━━━ /customers ━━━

PageHeader: "Tra cứu khách hàng" + [+ Khách walk-in] button

Search bar (autofocus on mount, "/" keyboard shortcut to focus):
  - Search by phone, email, vehicle plate, or name
  - Debounced 300ms

DataTable of search results:
  Avatar+Tên | Email | SĐT | Biển số xe | Số dư ví | Lần ghé gần nhất | Thao tác
  - Row click → /customers/[id]
  - Quick action button: [Bắt đầu phiên] inline

Recent lookups section (when search empty): last 10 from sessionStorage as cards.

━━━ /customers/[id] ━━━

Customer profile page:

Header: [← Back] + Avatar + Name + verification badges + actions menu

3-column layout:
  Left card: Contact info — phone (tel: link), email (mailto:), address, notes
  Middle card: Wallet (balance large) + [+ Nạp tiền] button
  Right card: Quick stats — total sessions, total spent at this parking, last visit

TopupDialog (modal, not bottom sheet on web):
  - Amount preset chips (50k/100k/200k/500k/Custom)
  - Payment: Cash / QR Transfer
  - [Xác nhận nạp]
  - Success → optimistic balance update + receipt printable view

Recent sessions table at this parking (10 rows + pagination)
[Bắt đầu phiên cho khách] CTA → /sessions/new?customer=X

━━━ /tasks ━━━

PageHeader: "Việc cần làm" + counts: N pending / N in progress / N done today

Tabs: Của tôi | Chung (parking-wide) | Hoàn tất

Layout: 2-column on desktop
  Left (2/3): Task list grouped by priority (Urgent → High → Med → Low)
    Each TaskItem (web-friendly card):
      - Type icon + title (large)
      - Priority pill + due time + assigned-to avatar
      - Description excerpt
      - [Nhận] (if unassigned) | [Bắt đầu] | [Hoàn tất] inline buttons
      - Click anywhere → /tasks/[id]
  Right (1/3): Filters + Statistics card
    - Filter: type, priority, assignee
    - Today's progress chart (mini donut)

━━━ /tasks/[id] ━━━

Task detail page (web layout — wider than mobile):

Header: [← Back] + Title + priority badge + status badge

2-column:
  Left (2/3):
    - Description (markdown rendered)
    - Checklist (if any) — ChecklistView with progress bar
      Each item: large checkbox + label + optional photo evidence slot
    - Action history timeline (status changes, comments)
  Right (1/3):
    - Metadata: due time, assigned by, parking, related entity link
    - Actions panel:
        [Bắt đầu] → status: in_progress
        [Hoàn tất] → confirm + optional photo evidence
        [Tạm hoãn] → reason input
        [Chuyển nhân viên] (if assignable)

━━━ /report ━━━

PageHeader: "Báo cáo sự cố" + [Xem báo cáo của tôi →] link

Form (single page, generous width — web has space):
  2-column layout on desktop, stack on mobile.

  Left column:
    - Loại sự cố: chip select (Lỗi sạc | Đỗ sai | Thanh toán | Cơ sở vật chất | Phàn nàn khách | Khác)
    - Mức độ: segmented control (Thấp | TB | Cao | Khẩn) — color matches severity
    - Thiết bị/Slot liên quan: select (auto-fill if coming from slot detail)
    - Mô tả: textarea, min 10 chars, character counter, large width

  Right column:
    - Ảnh đính kèm: PhotoUploadField — drag-drop zone + [Chọn file] button
        Supports multiple, thumbnail strip with remove
        Max 5 photos, accepts image/*
    - Vị trí: auto-fill from GPS (mock) or manual input
    - Notes (optional internal): textarea

Submit button (sticky bottom of form, full-width or right-aligned):
  [Gửi báo cáo] → optimistic queue add + success animation + redirect to /report/history

━━━ /report/history ━━━

PageHeader: "Báo cáo của tôi"

Tabs: Tất cả | Chưa xử lý | Đã xử lý

DataTable (NOT card list — web table):
  Mã | Loại | Mức độ | Mô tả | Ngày tạo | Cập nhật | Trạng thái | Thao tác

  - Row click → expanding row showing photos + resolution + comments
  - Filter: severity, type, status, date range

━━━ /notifications ━━━

PageHeader: "Thông báo" + [Đánh dấu tất cả đã đọc] button

Tabs: Tất cả | Chưa đọc | Cảnh báo | Tin nhắn

List grouped by date (Hôm nay / Hôm qua / Cũ hơn):
  Each row (NOT swipe action — web uses inline buttons):
    - Priority icon + title + body excerpt + relative time + read indicator
    - Inline actions: [✓ Đã đọc] [✕ Xóa]
    - Click row → navigate to link if present

━━━ /shift ━━━

PageHeader: "Ca làm việc"

ShiftStatusCard (large, top of page):
  - "Ca sáng" + date + start–end time
  - Big countdown to clock-out
  - Status: NOT_STARTED | IN_PROGRESS | OVERTIME | ENDED
  - ClockInOutCard with primary button (large, 48px):
      "Chấm công vào ca" (if not clocked in) — green
      "Chấm công kết thúc" (if clocked in) — red, requires confirm
      Disabled outside shift window with tooltip explanation

3-column dashboard below:
  Card 1 — This shift summary:
    Sessions handled | Issues reported | Tasks completed | Customers helped
  Card 2 — Shift mates (ShiftMatesList):
    Other staff currently on duty at this parking — avatars + role + clock-in time
    Status dot (online if recently active)
  Card 3 — Upcoming shifts:
    Your next 5 scheduled shifts (read-only)

[Bàn giao ca] CTA → /shift/handover

━━━ /shift/handover ━━━

PageHeader: "Bàn giao ca"

2-column layout:
  Left (editor):
    HandoverEditor — markdown editor with toolbar (Bold/Italic/List/Link)
    Generous height (60vh)
    To: next shift staff (auto-detected) or "Ca tiếp theo"
    [Lưu nháp] | [Gửi bàn giao] (right-aligned, primary)

  Right (context):
    Flagged items panel:
      [+ Thêm vấn đề cần lưu ý] → modal: type select + description
      Each item shown as card with [✕] remove
    Photo attachments: drag-drop zone
    Previous handover (read-only, collapsible)

Confirm dialog on submit: "Gửi bàn giao cho [Next staff name]?"

━━━ /emergency ━━━

PageHeader: "Khẩn cấp" (red theme accents, NOT full-screen takeover)

Warning banner top: "Sử dụng trong tình huống khẩn cấp — mọi hành động được ghi log"

EmergencyActionsPanel (large action cards, web-style — NOT hold-to-confirm):
  Card 1 — Dừng tất cả phiên sạc:
    Description + impact (số phiên hiện tại sẽ dừng)
    [Dừng tất cả] red button → multi-step confirm dialog:
      Step 1: typed confirmation ("Tôi xác nhận")
      Step 2: reason select + optional notes
      Step 3: final confirm
    Action: stops all active sessions at parking, sends alert to owner + admin

  Card 2 — Báo cháy:
    [Tạo báo cáo cháy] → opens preset report form pre-filled

  Card 3 — Liên hệ khẩn cấp:
    Numbers list with [Gọi] tel: links — 115, 114, 113, owner phone

  Card 4 — Sơ tán bãi đỗ:
    Procedural checklist + timer

Recent emergency events log (bottom, last 5):
  Timestamp | Trigger by | Action | Affected sessions

━━━ /me ━━━

PageHeader: "Tài khoản"

3-column layout:
  Left card (Profile):
    Avatar (with upload), name, role, parking, hire date
    Verification badges (email/phone)

  Middle card (Performance this month):
    Sessions handled, issues resolved, customers helped, average rating
    Mini chart: daily sessions handled (last 14 days)

  Right card (Quick actions):
    [Đổi mật khẩu] → modal
    [Bật 2FA] → setup flow
    [Lịch sử đăng nhập] → expandable list
    [Đăng xuất] (red, with confirm)

Preferences section below (full width):
  - Ngôn ngữ: VI / EN
  - Giao diện: Light / Dark / Auto (theo giờ ca đêm)
  - Thông báo: email + push toggles
  - Đồng bộ ngoại tuyến: link to /me/sync
  - Trợ giúp / FAQ: link
  - Phím tắt: link to keyboard shortcuts dialog

App info bottom: version + build + sync status indicator

━━━ /me/sync ━━━

PageHeader: "Đồng bộ"

Online/offline status banner (live indicator)

DataTable of action queue:
  Loại | Tóm tắt | Trạng thái (pending/syncing/synced/failed) | Tạo lúc | Lỗi (nếu có) | Thao tác

  - Failed rows: red tint + [Thử lại] button
  - Bulk actions: [Đồng bộ tất cả] | [Xóa các hành động đã đồng bộ]

Empty state if all synced: ✓ "Tất cả đã được đồng bộ"

═══════════════════════════════════════════════════════
INTERACTIONS & STATES
═══════════════════════════════════════════════════════

Every interactive element has:
  - Loading skeleton or spinner
  - Empty state (icon + helpful message + CTA)
  - Error state with retry button
  - Hover state (background color change)
  - Focus-visible ring (keyboard users)
  - Disabled visibly muted with tooltip

Real-time (useRealtime hook):
  - Slot grid: 10s
  - Sessions: 15s
  - Notifications: 30s
  - Live ops feed: 10s

Toasts (Sonner):
  - Position: top-right (web standard, NOT bottom-center mobile)
  - Vietnamese default
  - Success/error/info per admin spec
  - Auto-dismiss with hover-pause

Forms (react-hook-form + zod):
  - Validate on blur
  - Submit disabled until valid + dirty
  - Vietnamese validation messages
  - Auto-focus first invalid field on submit
  - Auto-save drafts to localStorage for long forms (handover, report)

Network resilience:
  - Action queue (Zustand persist) for write actions during network blips
  - Pending count badge in header
  - Auto-flush on reconnect with toast
  - NOT designed for fully offline use — staff is at a workstation with reliable wifi
    (this is a key difference from the old mobile-first PWA approach)

Keyboard navigation:
  - Tab order is logical (top to bottom, left to right)
  - Esc closes modals/drawers
  - Arrow keys navigate slot grid + tables
  - Cmd/Ctrl+K opens global search
  - "?" or Cmd+/ shows keyboard shortcuts help

═══════════════════════════════════════════════════════
i18n RULES
═══════════════════════════════════════════════════════

- Namespace: "staff.*"
- Key format: staff.<page>.<element>
- 100% coverage — zero hardcoded strings
- Concise translations preferred (operational tool, not marketing)

═══════════════════════════════════════════════════════
OUTPUT REQUIREMENTS
═══════════════════════════════════════════════════════

1. All Staff pages and components fully implemented
2. Mock data extended in /lib/mock-staff.ts + /lib/mock-data.ts
   (parkingSlots, staffShifts, staffTasks, issueReports, staffNotifications)
3. Translation keys 100% covered (staff.* namespace)
4. Each page visually distinct with violet accent throughout
5. Reuse admin shared components (Sidebar, Header pattern, DataTable, ConfirmDialog,
   PageHeader, ChartCard, EmptyState) — DO NOT duplicate
6. No "any", no hardcoded text, no inline styles
7. Keyboard shortcuts implemented globally
8. Responsive: tested at 1440px / 1024px / 768px viewports
9. Light + dark mode both work, auto-switch by shift time

Forbidden:
- Bottom navigation (use left sidebar like admin/owner)
- Mobile-only patterns (haptics, hold-to-confirm, swipe-to-action, pull-to-refresh)
- Bottom sheets as primary UI (use right-side drawer instead)
- FAB (floating action button) — use top toolbar buttons
- Tables hidden on mobile-only (always show data table on web; cards only as
  responsive fallback below md)
- Full-screen takeovers like /emergency on mobile — use confirmation dialogs
- PWA/service-worker as a HARD requirement (optional progressive enhancement only)
- Rebuilding shadcn components

═══════════════════════════════════════════════════════
Checklist màn hình STAFF cần triển khai
═══════════════════════════════════════════════════════

Màn hình chính (1)
  [x] Home /home — Shift status bar, quick stats strip, Slot Grid (touch 80×80), zone filter, slot detail bottom sheet, FAB quick actions
Quản lý Slot (1)
  [x] Slot Detail /slots/[id] — Full-page chi tiết slot khi vào deep-link, đầy đủ action
Phiên sạc (3)
  [x] Sessions List /sessions — Tabs (Đang chạy/Hôm nay/Lịch sử), card view mobile / table desktop, swipe actions
  [x] Session Detail /sessions/[id] — Live energy meter, customer info có nút gọi, action sticky bottom
  [x] New Session Wizard /sessions/new — 4 bước: Slot → Khách → Thanh toán → Xác nhận
Quét QR (1)
  [x] Scan /scan — Mock camera full-screen, viewfinder, manual input fallback (3 tabs: Khách/Xe/Sạc)
Khách hàng (2)
  [x] Customer Lookup /customers — Search bar autofocus, recent lookups, FAB tạo walk-in
  [x] Customer Detail /customers/[id] — Profile, wallet card với top-up sheet, recent sessions
Việc cần làm (2)
  [x] Tasks List /tasks — Tabs (Của tôi/Chung/Hoàn tất), nhóm theo priority, swipe actions
  [x] Task Detail /tasks/[id] — Description, checklist tappable, action sticky bottom
Báo cáo sự cố (2)
  [x] Report Form /report — Single-page form, photo capture (multiple), voice note, GPS auto
  [x] Report History /report/history — My reports với tabs trạng thái, expandable detail
Ca làm việc (2)
  [x] Shift /shift — Clock in/out, countdown, this-shift summary, shift-mates
  [x] Handover /shift/handover — Markdown editor, flagged items, ảnh đính kèm
Khẩn cấp (1)
  [x] Emergency /emergency — Hold-3-seconds button, gọi cấp cứu, báo cháy
Hệ thống (3)
  [x] Notifications /notifications — 4 tabs, group theo ngày, swipe actions
  [x] Me / Profile /me — Profile, performance, settings list, đăng xuất
  [x] Sync Queue /me/sync — Hành động offline chờ đồng bộ, retry failed
Dự phòng / PWA (1)
  [ ] Offline Fallback /offline — Khi service worker không có cache
Layout / Shared (không phải page)
  [x] StaffLayout — Header compact 48px + Bottom Nav 64px (mobile), chuyển sang sidebar khi ≥1024px
  [x] StaffHeader — Parking name + shift pill countdown + bell + lang toggle
  [ ] BottomNav — 5 tab (Home/Phiên/Quét QR FAB/Tasks/Tôi), safe-area
  [ ] SlotGrid + SlotCell + SlotDetailSheet — Touch-optimized grid + bottom sheet
  [ ] QuickActionsFab — Radial menu / sheet
  [ ] PhotoCaptureField + VoiceNoteField — Native capture API mock
  [ ] HapticButton + SwipeRefresh + BottomSheet — Mobile primitives
  [x] OfflineBanner + QueuedActionsBadge — Online/offline UX
  [ ] PWA Setup — manifest.json, service worker, icons 192/512, splash
Tổng cộng: 19 màn hình + 9 layout/shared/PWA components

So với prompt gốc (4 page), bản này bổ sung 15 màn hình thiết yếu cho nghiệp vụ staff field-ops: Slot detail, Session detail/wizard, Customer lookup/detail, Tasks (list+detail+checklist), Report history, Shift management, Handover, Emergency, Notifications, Profile, Sync queue, Offline fallback — cùng với PWA stack đầy đủ (manifest, service worker, action queue offline-first).
