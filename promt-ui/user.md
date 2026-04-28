You are a senior product designer and frontend architect specializing in
consumer-facing web products for Smart Mobility / EV ecosystems.

Your task: Extend the existing Next.js 14 App Router project by implementing the
USER role — a RESPONSIVE WEB application for EV drivers who use the platform to
discover charging stations, reserve slots, charge their vehicles, manage payments,
and engage with loyalty programs.

═══════════════════════════════════════════════════════
PLATFORM ORIENTATION (read carefully)
═══════════════════════════════════════════════════════

The USER module is a WEB-FIRST responsive application:
- Primary device: desktop / laptop browsers
- Secondary device: tablet + mobile browsers (responsive)
- NOT a PWA-only mobile app like STAFF
- DOES use top header navigation (NOT bottom nav)
- DOES include marketing / SEO public surface (landing, pricing, FAQ)
- DOES support keyboard navigation, screen readers, deep links

Tone: friendly, modern, app-like inside the authenticated area; promotional and
trust-building on public pages.

═══════════════════════════════════════════════════════
SCOPE & DATA ISOLATION
═══════════════════════════════════════════════════════

- ADMIN, OWNER, STAFF modules already exist — DO NOT modify
- Reuse shared components from /components/admin/shared/
  (StatusBadge, ConfirmDialog, EmptyState, ErrorState, ChartCard)
- New user-specific components live in /components/user/

Data isolation:
- Authenticated user sees ONLY their own:
    bookings, sessions, transactions, vehicles, vouchers, reviews, favorites
- Public stations data is global (anyone can browse)
- Mock current user (in /lib/mock-user.ts):
    currentUserId: "USR-001"
    name: "Trần Thị Hương"
    email: "huong.tran@example.com"
    phone: "+84 901 234 567"
    walletBalance: 285,000
    loyaltyTier: "silver"
    loyaltyPoints: 1240
    verifiedEmail: true
    verifiedPhone: true
    kycLevel: "level_2"
    defaultVehicleId: "EV-001"

═══════════════════════════════════════════════════════
TECH STACK (inherit from ADMIN — no substitutions)
═══════════════════════════════════════════════════════

- Framework:   Next.js 14 (App Router, Server Components for SEO pages)
- Language:    TypeScript strict, no `any`
- Styling:     Tailwind v3, CSS variables, shadcn/ui
- Charts:      Recharts (charge curve, spending insights)
- Maps:        react-leaflet OR mock SVG map (consistent with admin MapPlaceholder)
- i18n:        next-intl ("user.*" namespace)
- Icons:       lucide-react only
- Forms:       react-hook-form + zod
- State:       URL params (nuqs) for filters; Zustand for cart/booking draft
- Auth:        NextAuth.js mock setup (credentials + Google + Apple OAuth placeholders)
- SEO:         next-sitemap, OpenGraph metadata, JSON-LD for stations
- Default lang: Vietnamese
- Default theme: light, with theme toggle

═══════════════════════════════════════════════════════
DESIGN SYSTEM (web-first overrides on top of admin)
═══════════════════════════════════════════════════════

Inherit color palette + typography + spacing from admin.

User accent color: indigo-600 (#4F46E5) — distinguishes from:
  admin (sky), owner (emerald), staff (violet)
  → variable --color-user-accent
  → Primary CTA buttons, active nav, links

Marketing palette additions (public landing only):
  --color-gradient-start: #4F46E5
  --color-gradient-end:   #06B6D4
  --color-marketing-bg:   #F5F3FF (subtle indigo tint)

Typography (web-optimized):
  - Hero (landing):   text-5xl md:text-6xl font-bold tracking-tight
  - Page heading:     text-3xl md:text-4xl font-semibold
  - Section heading:  text-xl md:text-2xl font-semibold
  - Body:             text-base
  - Caption:          text-sm text-muted-foreground

Layout containers:
  - Marketing pages: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
  - App pages: max-w-6xl mx-auto px-4 md:px-6
  - Map page: full-width (special)

Cards: rounded-xl (less round than staff's 2xl, more web-feel)

Motion:
  - Hover lift on cards: hover:-translate-y-0.5 hover:shadow-md
  - Transition: 200ms ease-out
  - Page transitions: 100ms fade
  - Skeleton: animate-pulse

Responsive breakpoints (Tailwind defaults):
  - sm: 640px  (large phone)
  - md: 768px  (tablet)
  - lg: 1024px (desktop minimum)
  - xl: 1280px (wide desktop)

Below md (mobile/tablet narrow):
  - Header: hamburger menu opens Sheet drawer
  - Single column layouts
  - Sticky CTA at bottom of long forms

Accessibility (WCAG 2.1 AA mandatory):
  - Skip-to-content link at very top
  - Semantic HTML (header, main, nav, article, footer)
  - Focus-visible rings on every interactive element
  - aria-label on icon-only buttons
  - Color contrast ≥4.5:1 for text
  - Keyboard navigation: Tab, Enter, Esc, Arrow keys in lists
  - Screen reader: meaningful alt text, aria-live for dynamic updates

SEO (mandatory for public pages):
  - Unique <title> + meta description per page
  - OpenGraph + Twitter card meta
  - JSON-LD structured data:
      Organization on /
      LocalBusiness on /stations/[id]
      FAQPage on /faq
  - Canonical URLs
  - sitemap.xml generated
  - robots.txt allowing public, disallowing /app/*

═══════════════════════════════════════════════════════
EXTENDED TYPES (add to /types/index.ts)
═══════════════════════════════════════════════════════

interface UserAccount {
  id: string                       // "USR-001"
  name: string
  email: string
  phone: string
  avatar?: string
  walletBalance: number            // VND
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum"
  loyaltyPoints: number
  verifiedEmail: boolean
  verifiedPhone: boolean
  kycLevel: "level_0" | "level_1" | "level_2"  // higher = more wallet limit
  defaultVehicleId?: string
  language: "vi" | "en"
  createdAt: string
  twoFactorEnabled: boolean
  connectedAccounts: ("google" | "apple" | "facebook")[]
}

interface UserVehicle {
  id: string                       // "EV-001"
  userId: string
  make: string                     // "VinFast"
  model: string                    // "VF8"
  year: number
  plateNumber: string              // "30A-12345"
  batteryCapacityKwh: number       // 87.7
  connectorType: "Type2" | "CCS2" | "CHAdeMO"
  color?: string
  photoUrl?: string
  isDefault: boolean
  avgConsumptionKwhPer100km?: number
}

interface UserBooking {
  id: string                       // "BK-2026-04-001"
  userId: string
  stationId: string
  stationName: string
  slotId: string
  slotLabel: string                // "A-12"
  vehicleId: string
  startTime: string                // ISO datetime
  endTime: string
  estimatedKwh: number
  estimatedCost: number            // VND
  depositAmount: number            // VND held
  status: "draft" | "confirmed" | "active" | "completed" | "cancelled" | "no_show"
  qrCode: string                   // payload string for QR display
  cancellationDeadline: string
  createdAt: string
}

interface UserChargingSession {
  // Mirrors admin Session but from user perspective
  id: string
  userId: string
  bookingId?: string
  stationId: string
  stationName: string
  chargerId: string
  vehicleId: string
  startTime: string
  endTime?: string
  durationMin?: number
  energyKwh: number
  startSoc: number                 // 0-100, state of charge
  currentSoc: number
  targetSoc?: number               // user's auto-stop target
  amount: number                   // VND
  status: "active" | "completed" | "failed"
  rated: boolean
  rating?: number                  // 1-5 if rated
  reviewText?: string
}

interface UserPaymentMethod {
  id: string
  userId: string
  type: "wallet" | "credit_card" | "momo" | "zalopay" | "vnpay" | "bank_transfer"
  label: string                    // "Visa **** 4242"
  isDefault: boolean
  expiresAt?: string               // for cards
  brand?: string                   // "visa" | "mastercard"
  last4?: string
}

interface UserTransaction {
  id: string                       // "TXN-001"
  userId: string
  type: "topup" | "charge_payment" | "refund" | "voucher_credit" | "loyalty_redeem"
  amount: number                   // VND, positive = inflow, negative = outflow
  balanceAfter: number
  description: string
  paymentMethod?: string
  relatedSessionId?: string
  status: "completed" | "pending" | "failed"
  createdAt: string
}

interface Voucher {
  id: string
  code: string                     // "WELCOME50K"
  title: string                    // "Giảm 50.000₫"
  description: string
  type: "fixed_off" | "percent_off" | "free_kwh"
  value: number
  minSpend?: number
  validFrom: string
  validUntil: string
  status: "available" | "used" | "expired"
  usedAt?: string
  usedSessionId?: string
  source: "promotion" | "referral" | "loyalty_redeem"
}

interface UserReview {
  id: string
  userId: string
  stationId: string
  stationName: string
  sessionId: string
  rating: number                   // 1-5
  text: string
  photoUrls?: string[]
  createdAt: string
  updatedAt?: string
  ownerResponse?: string
  ownerResponseAt?: string
}

interface UserNotification {
  id: string
  userId: string
  type: "booking_confirmed" | "charging_started" | "charging_complete"
       | "target_soc_reached" | "low_balance" | "voucher_received"
       | "review_responded" | "promotion" | "system"
  title: string
  body: string
  link?: string
  read: boolean
  createdAt: string
}

interface UserFavoriteStation {
  userId: string
  stationId: string
  addedAt: string
  customLabel?: string             // "Gần nhà"
}

interface SupportTicket {
  id: string                       // "TKT-001"
  userId: string
  category: "billing" | "charging_issue" | "account" | "technical" | "other"
  subject: string
  description: string
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
  messages: { from: "user" | "support"; text: string; at: string }[]
}

═══════════════════════════════════════════════════════
ARCHITECTURE
═══════════════════════════════════════════════════════

/app/
  (marketing)/                       ← Public, SEO-optimized, no auth required
    layout.tsx                       ← MarketingLayout (header + footer)
    page.tsx                         ← Landing page
    pricing/page.tsx
    about/page.tsx
    faq/page.tsx
    terms/page.tsx
    privacy/page.tsx
    cookies/page.tsx
    contact/page.tsx
    blog/
      page.tsx                       ← Blog list (placeholder)
      [slug]/page.tsx                ← Blog article

  (user-auth)/                       ← Auth flow, no main nav
    layout.tsx                       ← AuthLayout (centered card + brand)
    login/page.tsx
    signup/page.tsx
    forgot-password/page.tsx
    reset-password/page.tsx          ← ?token=
    verify-email/page.tsx            ← ?token=
    onboarding/page.tsx              ← First-time user wizard

  (user)/                            ← Authenticated app area
    layout.tsx                       ← UserLayout (top header + content)
    map/page.tsx                     ← MAIN screen: find stations
    stations/
      page.tsx                       ← List view (alternative to map)
      [id]/page.tsx                  ← Station detail
    trip-planner/page.tsx            ← Plan multi-stop trip
    favorites/page.tsx
    bookings/
      page.tsx                       ← My bookings (active + history)
      new/page.tsx                   ← Booking flow (multi-step)
      [id]/page.tsx                  ← Booking detail (with QR)
    charging/
      page.tsx                       ← Active session live view
      history/page.tsx               ← Past sessions
      [id]/page.tsx                  ← Session detail / receipt
    wallet/
      page.tsx                       ← Wallet overview
      topup/page.tsx                 ← Top-up flow
      methods/page.tsx               ← Payment methods management
      transactions/page.tsx          ← All transactions
    vouchers/page.tsx
    loyalty/page.tsx                 ← Tier, points, rewards
    referral/page.tsx
    reviews/page.tsx                 ← My reviews
    notifications/page.tsx
    support/
      page.tsx                       ← Help center home
      articles/[slug]/page.tsx       ← Help article
      tickets/page.tsx               ← My support tickets
      tickets/new/page.tsx
      tickets/[id]/page.tsx          ← Ticket conversation
      chat/page.tsx                  ← Live chat (mock)
    profile/
      page.tsx                       ← Profile overview
      vehicles/page.tsx              ← My EVs list
      vehicles/new/page.tsx
      vehicles/[id]/page.tsx
      security/page.tsx              ← Password, 2FA, sessions, login history
      connected/page.tsx             ← OAuth connections
      kyc/page.tsx                   ← KYC verification
      privacy/page.tsx               ← Privacy controls + data export + delete
      preferences/page.tsx           ← Language, theme, notifications

  not-found.tsx                      ← 404
  error.tsx                          ← Error boundary

/components/user/
  marketing/
    Hero.tsx
    FeatureGrid.tsx
    StationsCounter.tsx
    PricingTable.tsx
    Testimonials.tsx
    FaqAccordion.tsx
    AppDownloadCta.tsx
    MarketingHeader.tsx
    MarketingFooter.tsx
  layout/
    UserHeader.tsx                   ← Top nav (logo, search, links, profile menu)
    UserMobileDrawer.tsx
    UserFooter.tsx                   ← Light footer for app pages
  map/
    StationMap.tsx                   ← Leaflet OR SVG mock
    StationPin.tsx
    MapFilterPanel.tsx
    StationListBottomSheet.tsx
    StationCardMini.tsx
    SearchBox.tsx                    ← Address autocomplete (mock)
  station/
    StationGallery.tsx
    AmenitiesGrid.tsx
    OperatingHoursTable.tsx
    SlotAvailabilityGrid.tsx
    StationReviewsSection.tsx
    PricingBreakdown.tsx
    DirectionsButton.tsx
    ShareStationDialog.tsx
    FavoriteToggle.tsx
  booking/
    BookingWizard.tsx                ← Multi-step
    SlotPicker.tsx
    TimeSlotPicker.tsx
    VehicleSelector.tsx
    PaymentMethodSelector.tsx
    CancellationPolicyCard.tsx
    BookingHoldCountdown.tsx
    BookingQrCode.tsx
  charging/
    LiveChargingHeroCard.tsx         ← Big SOC display + animated
    ChargeCurveChart.tsx
    AutoStopSettings.tsx
    EndSessionDialog.tsx
    SessionReceipt.tsx
    RateExperienceModal.tsx
  wallet/
    WalletCard.tsx                   ← Balance hero
    SpendingInsights.tsx
    TopupSheet.tsx
    AutoTopupSettings.tsx
    PaymentMethodCard.tsx
    AddPaymentMethodDialog.tsx
  vouchers/
    VoucherCard.tsx
    RedeemCodeForm.tsx
  loyalty/
    TierProgress.tsx
    PointsBalance.tsx
    RewardsCatalog.tsx
  reviews/
    WriteReviewForm.tsx
    ReviewCard.tsx
  vehicles/
    VehicleCard.tsx
    AddVehicleForm.tsx
    ConnectorTypeBadge.tsx
  support/
    HelpSearch.tsx
    ArticleCategoryGrid.tsx
    TicketThread.tsx
    LiveChatWidget.tsx
  shared/
    PageHeader.tsx
    Breadcrumb.tsx
    AuthGuard.tsx                    ← Wrapper redirecting to /login if no session

/lib/
  mock-user.ts                       ← currentUserId, profile mock
  mock-data-user.ts                  ← user-scoped mock data extensions
  seo.ts                             ← Helpers for metadata generation

═══════════════════════════════════════════════════════
LAYOUTS
═══════════════════════════════════════════════════════

━━━ MarketingLayout (public)
- Top: MarketingHeader
    - Logo (EVCharge) + tagline
    - Nav links: Trang chủ | Tính năng | Bảng giá | Tin tức | Hỗ trợ
    - Right: Lang switch | [Đăng nhập] | [Đăng ký] (primary CTA)
    - Sticky on scroll, white bg + subtle shadow
- Footer: MarketingFooter
    - 4 columns: About | Sản phẩm | Hỗ trợ | Theo dõi
    - Newsletter signup
    - Social icons
    - Copyright + legal links

━━━ AuthLayout (login/signup)
- Centered card 480px wide
- Left side (desktop only): brand illustration + tagline
- Right side: form
- Subtle gradient background
- Footer: language switch + small legal links

━━━ UserLayout (authenticated)
- UserHeader (sticky, h-16):
    - Logo (links to /map)
    - Primary nav (desktop): Map | Bãi đỗ | Đặt chỗ | Ví | Yêu thích
    - Right cluster:
        - GlobalSearch (Cmd+K) — search stations, bookings
        - Wallet balance pill (links to /wallet)
        - Notification bell (badge count)
        - Profile avatar dropdown:
            Profile / My vehicles / Loyalty / Vouchers / Settings / Đăng xuất
        - Language switch (icon)
- Mobile (<lg): hamburger → UserMobileDrawer with full menu
- Main: max-w-6xl mx-auto, special-case full-width for /map
- UserFooter (light, 1 row): legal links + lang + version

═══════════════════════════════════════════════════════
PAGE SPECIFICATIONS
═══════════════════════════════════════════════════════

━━━ / (Landing page) ━━━

SEO: title "EV Charge — Tìm trạm sạc xe điện nhanh nhất Việt Nam"

Hero section:
  - Gradient background (indigo → cyan)
  - Headline: "Sạc xe điện dễ dàng. Đặt chỗ trong 30 giây."
  - Subhead: "Hơn 200 trạm sạc trên toàn Việt Nam — chỉ trong một ứng dụng."
  - CTA: [Bắt đầu miễn phí] (primary) | [Xem demo] (secondary)
  - Right: hero illustration / device mockup
  - Trust strip: "Tin tưởng bởi 50.000+ tài xế EV"

Sections:
1. Stats counter (4 cards): Trạm sạc | Bộ sạc | Phiên sạc/tháng | Khách hàng
2. Feature grid (3×2): Tìm trạm gần nhất | Đặt trước slot | Thanh toán không tiền mặt | Theo dõi phiên realtime | Tích điểm thưởng | Hỗ trợ 24/7
3. How it works (3 steps with illustrations): Tìm → Đặt → Sạc
4. Map preview (interactive but limited): "Tìm trạm gần bạn" with location detect
5. Pricing teaser: 3 tier cards → CTA to /pricing
6. Testimonials carousel
7. App download CTA (App Store / Google Play badges - placeholder)
8. FAQ accordion (top 5 questions)
9. Final CTA banner: "Sẵn sàng cho hành trình điện hóa?"

━━━ /pricing ━━━

3-column pricing:
  - Pay-as-you-go: standard rates (table breakdown)
  - Plus subscription: 99k/month, discounted rate
  - Business: contact sales
  Toggle: Monthly / Yearly (yearly 20% off)

Comparison table (full width below)

FAQ section specific to pricing

━━━ /about, /faq, /terms, /privacy, /cookies, /contact ━━━

Standard marketing pages with proper SEO + content sections.
/contact has form: name, email, subject, message + map embed of HQ.

━━━ /login ━━━

Form (react-hook-form + zod):
  - Email + Password
  - Remember me checkbox
  - [Đăng nhập] (primary)
  - "Quên mật khẩu?" link
  - Divider "hoặc"
  - OAuth buttons: Google, Apple, Facebook (mock, success in 1s)
  - Footer: "Chưa có tài khoản? Đăng ký"
- Error toast on wrong credentials
- Success → redirect to ?redirect=/map or default /map

━━━ /signup ━━━

Form:
  - Họ tên, email, phone, password (with strength meter), confirm password
  - Terms acceptance checkbox (required)
  - [Tạo tài khoản]
  - OAuth buttons (sign up via OAuth)
- Success → /verify-email → /onboarding

━━━ /forgot-password / /reset-password ━━━

Forgot: email input → success state with instructions
Reset (?token=): new password + confirm + reset button → success → auto login → /map

━━━ /verify-email (?token=) ━━━

Two states:
- Loading: "Đang xác thực email..."
- Success: ✓ animation + auto-redirect to /onboarding
- Failure: error + [Gửi lại email] button

━━━ /onboarding ━━━

4-step wizard with progress bar:
  Step 1 — Welcome + your goals (chip select: Daily commute / Long trips / Business / Curious)
  Step 2 — Add your first vehicle (form, can skip)
  Step 3 — Connect payment method (can skip)
  Step 4 — Allow notifications + location (browser prompts)
After: redirect to /map with welcome toast

━━━ /map (MAIN AUTHENTICATED SCREEN) ━━━

Full-width layout (overrides container).

Top toolbar (sticky under header):
  - Address search box (with autocomplete, mock)
  - Current location pill button (uses navigator.geolocation, mock fallback)
  - "Trên đường đi" mode toggle → opens TripPlannerSheet
  - View toggle: Map | List
  - Filter button → MapFilterPanel sheet

Map area (60vh on desktop, 70vh on tablet):
  - Pins clustered at low zoom
  - Pin colors: green (≥4 slots free), amber (1-3), red (full)
  - Selected pin: large + popover with quick info
  - "Định vị tôi" button (bottom-right, FAB)

MapFilterPanel (left side panel on desktop, sheet on mobile):
  - Loại sạc: checkbox group (Type2 / CCS2 / CHAdeMO)
  - Công suất: range slider (kW)
  - Giá tối đa: slider (₫/kWh)
  - Tiện ích: WC | Đồ ăn | WiFi | Lounge | Mái che (chip multi-select)
  - Khoảng cách: radius slider
  - Chỉ hiện trạm còn slot: toggle
  - Đánh giá tối thiểu: stars
  - 24/7: toggle
  - [Áp dụng] / [Đặt lại]
  - Filter count badge on toggle button

Bottom sheet / right panel: StationListBottomSheet
  - Sort dropdown: Gần nhất | Rẻ nhất | Đánh giá cao | Sạc nhanh nhất
  - List of StationCardMini:
      Photo thumb | Name | Distance + ETA | Available slots / total | Price/kWh | Rating | Open status
      Hover/tap → highlight pin on map
      Click → /stations/[id]

URL state: ?lat=&lng=&zoom=&q=&type=&maxPrice=&radius=&...

━━━ /stations (list view) ━━━

Alternative to map for users who prefer browsing.
- Search + filters at top (same as map)
- Grid 3-col desktop / 2-col tablet / 1-col mobile of station cards
- Each card: gallery thumbnail, name, address, distance, price, rating, [Yêu thích] heart, [Đặt chỗ] button
- Pagination

━━━ /stations/[id] (Station detail) ━━━

SEO: LocalBusiness JSON-LD, dynamic OG image with station photo.

Top section (2-col desktop):
  Left: StationGallery (multiple photos, swipeable, lightbox on click)
  Right:
    - Name + verified badge if applicable
    - Star rating + review count
    - Address + distance from current location
    - Live status: "Mở cửa • 45 / 96 slot trống"
    - Action row: [Đặt chỗ] (primary, lg) | [Bắt đầu sạc ngay] | [Yêu thích ♡] | [Chia sẻ] | [Đường đi →]

Tabs (sticky below):
  Tổng quan | Slot & Giá | Đánh giá | Tiện ích | Hoạt động

Tổng quan tab:
  - Description text
  - Map mini (pin + radius)
  - DirectionsButton (opens Google/Apple Maps)
  - OperatingHoursTable (weekly grid)

Slot & Giá tab:
  - SlotAvailabilityGrid (live, similar to staff but read-only)
    - Color by status, cannot click to start
    - Indicator: "Cập nhật mỗi 15 giây"
  - PricingBreakdown card:
      Giá điện kWh (peak/off-peak)
      Phí đỗ xe/giờ
      Phí khởi động
      VAT
      Ước tính cho xe của bạn (1h sạc): "X ₫ ~ Y kWh"

Đánh giá tab:
  - Average rating breakdown bar
  - Sort: Mới nhất | Đánh giá cao | Đánh giá thấp
  - Review list (paginated)
  - Each review: avatar + name + stars + photos + text + date + owner response
  - Filter: rating star

Tiện ích tab:
  - AmenitiesGrid (icons + labels)
  - Photos of amenities

Hoạt động tab:
  - Heatmap: peak hours (24×7)
  - "Thời điểm vắng nhất" recommendations

Sticky bottom bar (mobile only): [Đặt chỗ ngay] full-width

━━━ /trip-planner ━━━

Two-column layout:
  Left: form
    - Điểm xuất phát (autocomplete)
    - Điểm đến (autocomplete)
    - Xe của tôi (vehicle selector — auto-fills battery capacity, consumption)
    - SOC hiện tại (slider 0-100%)
    - SOC mục tiêu khi đến (slider)
    - [Tính toán]
  Right: result map
    - Polyline route
    - Suggested charging stops along route (markers with stop number)
    - Total distance, total time, charging stops count, total estimated cost
    - List of suggested stops below map: each with [Đặt chỗ] button

━━━ /favorites ━━━

PageHeader: "Trạm yêu thích" + count

Grid of station cards (similar to /stations) with custom label support.
Empty state: "Chưa có trạm yêu thích — duyệt bản đồ để thêm"

━━━ /bookings ━━━

Tabs: Sắp tới | Đang diễn ra | Hoàn tất | Đã hủy

Each card:
  - Booking ID + status badge
  - Station name + slot label + vehicle
  - Date + time window
  - Estimated cost
  - QR code thumbnail
  - Actions: [Chi tiết] | [Hủy] (if cancellable) | [Mở rộng giờ]

Empty state per tab.
[+ Đặt chỗ mới] CTA top-right → /bookings/new

━━━ /bookings/new (Multi-step wizard) ━━━

Stepper at top: 1 Trạm → 2 Slot & Giờ → 3 Xe → 4 Thanh toán → 5 Xác nhận

Step 1 — Chọn trạm:
  - If came from /stations/[id], pre-filled and skip to step 2
  - Otherwise: search + selected station card

Step 2 — Slot & Thời gian:
  - SlotPicker (visual grid)
  - TimeSlotPicker (date + start time + duration in 30-min increments)
  - Live availability check
  - Estimated cost preview

Step 3 — Xe:
  - VehicleSelector (cards of user's vehicles)
  - [+ Thêm xe mới] inline option

Step 4 — Thanh toán:
  - Show estimated cost + deposit amount (e.g. 20% hold)
  - PaymentMethodSelector (wallet / cards / e-wallets)
  - Voucher code input → discount preview
  - CancellationPolicyCard (terms displayed clearly)

Step 5 — Xác nhận:
  - Summary of all
  - BookingHoldCountdown: "Slot được giữ trong 14:32 — vui lòng xác nhận"
  - Terms checkbox
  - [Xác nhận đặt chỗ]
  - On success → /bookings/[id] with celebration animation

━━━ /bookings/[id] ━━━

Hero card: large QR code + booking ID + status
Details:
  - Station + slot + time + vehicle
  - Cancellation deadline countdown
  - Total cost breakdown
Actions:
  - [Hủy đặt chỗ] (with refund preview based on policy)
  - [Mở rộng] (extend time window if available)
  - [Đường đi đến trạm]
  - [Lưu vào lịch] (.ics download)
Timeline of status events.

━━━ /charging (Active session) ━━━

If no active session: empty state with "Bắt đầu sạc tại trạm hoặc xem [lịch sử]"

If active:
Hero card (large, centered, prominent):
  - Animated battery icon filling up
  - Big SOC% display (e.g. "73%") with target SOC marker
  - Current power: "47 kW" (with animated bar)
  - Time elapsed (live counter): HH:MM:SS
  - Energy delivered: 18.4 kWh
  - Cost so far: 82,800 ₫
  - "Còn ~22 phút đến 80%"

Below hero:
  - ChargeCurveChart: power over time (real-time line chart)
  - Charging settings:
      AutoStopSettings: target SOC slider (auto-stop at this level)
      Notify when full: toggle
  - Vehicle info card (from user's profile)
  - Station info: name + slot + [Hỗ trợ tại chỗ →]

Bottom sticky bar:
  - [Tạm dừng] (if charger supports)
  - [Dừng phiên] (destructive, large red button) → confirm dialog → receipt

After session ends:
  - SessionReceipt full-page
  - Total energy, time, cost, payment method, savings (if voucher)
  - RateExperienceModal: stars + optional comment + photos
  - [Tải hóa đơn] button
  - [Sạc lại tại trạm này] / [Tìm trạm khác]

━━━ /charging/history ━━━

Filters: Date range | Station | Status

Table (desktop) / Card list (mobile):
  Date | Station | Slot | Vehicle | kWh | Duration | Amount | Status | [Receipt]

[Xuất CSV] for tax/expense purposes

Click row → /charging/[id]

━━━ /charging/[id] ━━━

Full session receipt:
  - All session details
  - Charge curve chart
  - Cost breakdown
  - Payment info
  - VAT invoice download
  - "Đánh giá trải nghiệm" if not rated yet
  - "Đặt lại tại trạm này" button

━━━ /wallet ━━━

Hero: WalletCard
  - Large balance display
  - Loyalty tier + points
  - [+ Nạp tiền] (primary) | [Phương thức thanh toán]

SpendingInsights card:
  - Last 30 days spending area chart
  - Category breakdown donut (Electricity / Parking / VAT / Other)
  - Comparison vs previous period

Quick links: Vouchers • Auto top-up • Refund policy

Recent transactions (last 10) with [Xem tất cả →] to /wallet/transactions

━━━ /wallet/topup ━━━

Quick amount chips: 50k / 100k / 200k / 500k / 1M / Custom

Payment method selector
Voucher input ("Nạp 100k tặng 10k") → preview bonus

[Xác nhận nạp]
On success: confetti animation + balance update + receipt

━━━ /wallet/methods ━━━

List of saved methods (PaymentMethodCard each)
Default badge on one
Actions: Set default | Edit | Remove

[+ Thêm phương thức] → AddPaymentMethodDialog
  Type select (Visa/Master, Momo, ZaloPay, VNPAY, Bank)
  Card form (mock, no real Stripe integration but proper UI)
  Tokenize on save (mock)

AutoTopupSettings section:
  Toggle | When balance below: input | Top up amount: input
  Default method selector

━━━ /wallet/transactions ━━━

DataTable with all transactions:
  Date | Type | Description | Amount | Balance after | Method | Status

Filters: Type | Date range | Status
Export CSV / Excel

━━━ /vouchers ━━━

Tabs: Khả dụng | Đã dùng | Hết hạn

Grid of VoucherCard:
  - Discount value badge
  - Title + description
  - Min spend + valid until
  - Code (with copy button)
  - [Sử dụng ngay] CTA → /map filtered to applicable

[Nhập mã khuyến mãi] section: RedeemCodeForm input + apply button

━━━ /loyalty ━━━

Tier hero card: TierProgress
  - Current tier badge (Bronze/Silver/Gold/Platinum) with crown icon
  - Progress bar to next tier
  - "Cần thêm 580 điểm để lên Gold"
  - Tier benefits comparison toggle

Points balance card with [Đổi điểm] CTA
Earning rules: list of how to earn points (charge / refer / review)
RewardsCatalog: grid of redemption options (vouchers, free kWh, merchandise)
Points history table

━━━ /referral ━━━

Hero:
  - "Mời bạn bè — nhận 50k cho mỗi lượt giới thiệu thành công"
  - Personal referral code (large, copyable)
  - Share buttons: Copy link | Email | Zalo | Messenger

Stats: Đã mời | Đã đăng ký | Đã hoàn thành phiên đầu | Tổng thưởng đã nhận

Referred friends list (if any) with status

━━━ /reviews ━━━

My reviews list:
  - Each: station name + my rating + my text + date
  - If owner responded: show response below
  - Actions: Edit | Delete

Pending reviews section (sessions completed >24h ago without review):
  - Prompt: "Đánh giá phiên sạc tại Trạm X"
  - [Đánh giá]

━━━ /notifications ━━━

Tabs: Tất cả | Chưa đọc | Đặt chỗ | Sạc | Khuyến mãi | Hệ thống

Group by date.
Each notification: icon by type + title + body + relative time + read indicator
Tap → navigate to link

[Đánh dấu tất cả đã đọc]
Settings link → /profile/preferences (notifications section)

━━━ /support ━━━

Hero search: "Bạn cần giúp gì?"

ArticleCategoryGrid (icons): Tài khoản | Đặt chỗ | Sạc xe | Thanh toán | Xe của tôi | Sự cố

Popular articles list

[Liên hệ hỗ trợ] section:
  - [Chat trực tiếp] → /support/chat
  - [Tạo ticket] → /support/tickets/new
  - [Email hỗ trợ] (mailto)
  - [Hotline] (tel)

━━━ /support/articles/[slug] ━━━

Article reader: title + last updated + body (markdown rendered)
"Bài viết này có hữu ích không?" thumbs up/down
Related articles
"Vẫn cần giúp đỡ?" CTA → /support/tickets/new

━━━ /support/tickets ━━━

My tickets table: Subject | Category | Status | Last update | [Xem]
[+ Tạo ticket mới] button

━━━ /support/tickets/new ━━━

Form: Category | Subject | Description (textarea, min 20 chars) | Attachments (max 5) | Priority
[Gửi]

━━━ /support/tickets/[id] ━━━

TicketThread: chat-like view
  - Initial ticket message
  - Conversation messages (user + support, with avatars + timestamps)
  - Reply input at bottom
  - Status displayed at top
  - [Đóng ticket] if user wants to close

━━━ /support/chat ━━━

LiveChatWidget full-page mock:
  - Operator avatar + "Đang trực tuyến"
  - Chat history (mock greeting message)
  - Input + send + attach
  - Typing indicator simulation

━━━ /profile ━━━

Profile hero card:
  - Avatar (with upload), name, email, phone (verification badges)
  - Member since, loyalty tier
  - Quick stats: total sessions, total kWh, total spent, money saved (with vouchers)

Quick links grid (with icons): Vehicles | Security | Connected | KYC | Privacy | Preferences | Vouchers | Loyalty

━━━ /profile/vehicles ━━━

List of VehicleCard:
  - Photo, make/model, plate, connector badge, default badge
  - Actions: Set default | Edit | Delete (confirm)

[+ Thêm xe] → /profile/vehicles/new

━━━ /profile/vehicles/new and [id] ━━━

Form (react-hook-form + zod):
  - Make (autocomplete from common EV brands)
  - Model
  - Year
  - Plate (Vietnam format validation)
  - Battery capacity (kWh)
  - Connector type (Type2 / CCS2 / CHAdeMO)
  - Color
  - Photo upload (optional)
  - Set as default toggle

━━━ /profile/security ━━━

Sections:
  - Change password (current + new + confirm)
  - 2FA: enable toggle + QR setup flow + backup codes
  - Active sessions: list of devices with location + last active + [Đăng xuất] per session
  - Login history: last 20 attempts (success/failed) with IP + device

━━━ /profile/connected ━━━

Connected accounts list: Google / Apple / Facebook
Each with status and Connect/Disconnect button

━━━ /profile/kyc ━━━

KYC status banner (level 0/1/2)
Benefits per level (e.g. wallet limits)
Verification flow:
  Step 1 — ID upload (front/back) (mock file input)
  Step 2 — Selfie verification (mock camera)
  Step 3 — Submit → review status
Documents history

━━━ /profile/privacy ━━━

Privacy controls:
  - Marketing email opt-in
  - Profile visibility (anonymous reviews)
  - Location sharing
  - Cookie preferences

Data section:
  - [Xuất dữ liệu] (GDPR-style, generates ZIP placeholder)
  - [Xóa tài khoản] (multi-step destructive flow with reason survey)

━━━ /profile/preferences ━━━

- Language: VI / EN
- Theme: Light / Dark / System
- Currency display (VND default, future-proofing)
- Notification preferences (email + push + SMS toggles per type):
    Booking confirmations
    Charging started/complete
    Target SOC reached
    Low balance alerts
    Vouchers & promotions
    Newsletter
    System updates
- Default payment method
- Default vehicle

═══════════════════════════════════════════════════════
INTERACTIONS & STATES
═══════════════════════════════════════════════════════

Every interactive element has:
  - Loading skeleton or spinner
  - Empty state (icon + helpful message + CTA)
  - Error state with retry
  - Hover states (lift + shadow)
  - Focus-visible ring (keyboard users)
  - Disabled visibly muted with tooltip explaining why

Real-time features (useRealtime):
  - Map pin colors: 30s
  - Station detail availability: 15s
  - Active charging session: 5s (most critical UX)
  - Notification bell: 60s

Toasts (Sonner):
  - Position: top-right (web standard)
  - Vietnamese default
  - Success/error/info per admin spec

Forms:
  - react-hook-form + zod
  - Vietnamese validation messages
  - Auto-save drafts to localStorage for long forms (booking, ticket)
  - Submit disabled until valid + dirty

Notifications (browser):
  - Request permission after first booking
  - Push notification on charging milestones (mock service worker)

Keyboard shortcuts:
  - Cmd/Ctrl+K: open global search
  - Esc: close modals/sheets
  - Arrow keys: navigate lists

═══════════════════════════════════════════════════════
i18n RULES
═══════════════════════════════════════════════════════

- Namespace: "user.*"
- Key format: user.<page>.<element>
- 100% coverage — zero hardcoded strings
- Public marketing pages also fully translated
- Vietnamese is the marketed primary; English is secondary but complete

═══════════════════════════════════════════════════════
SEO REQUIREMENTS
═══════════════════════════════════════════════════════

For each public page:
  - Unique <title> ≤ 60 chars
  - Meta description ≤ 160 chars
  - OpenGraph: og:title, og:description, og:image, og:type
  - Twitter card: summary_large_image
  - Canonical URL
  - Hreflang tags (vi-VN / en-VN)

Structured data (JSON-LD):
  - Organization on /
  - LocalBusiness on /stations/[id] (with geo coordinates, address, openingHours)
  - FAQPage on /faq
  - BreadcrumbList where applicable

Generate sitemap.xml including:
  - All public marketing pages
  - All published stations (/stations/[id])
  - Blog posts

robots.txt:
  - Allow public marketing + station pages
  - Disallow /(user)/* (authenticated app)

═══════════════════════════════════════════════════════
OUTPUT REQUIREMENTS
═══════════════════════════════════════════════════════

1. All public + auth + authenticated pages fully implemented
2. Mock data extended:
     /lib/mock-user.ts (current user profile)
     /lib/mock-data-user.ts (vehicles, bookings, sessions, transactions, vouchers, reviews, tickets)
3. Translation keys 100% covered (user.* namespace) in vi.json + en.json
4. SEO metadata generated for all public routes
5. JSON-LD structured data on landing + station detail + FAQ
6. NextAuth.js mock setup with credentials + OAuth placeholders
7. Each page visually distinct — indigo accent throughout authenticated area
8. Responsive: tested at 360px / 768px / 1024px / 1440px viewports
9. Reuse admin shared components — DO NOT duplicate
10. No "any", no hardcoded text, no inline styles

Forbidden:
- Bottom navigation on desktop (web uses top header)
- Mobile-only patterns (haptics, hold-to-confirm) — those belong to STAFF
- Showing other users' data
- Empty page shells
- Duplicating shadcn components

═══════════════════════════════════════════════════════
Checklist màn hình USER cần triển khai
═══════════════════════════════════════════════════════
Marketing / Public (SEO) — 11 màn hình
  [x] Landing / — Hero, stats, features, how-it-works, map preview, pricing teaser, testimonials, FAQ, CTA banner
  [x] Pricing /pricing — 3-tier comparison, monthly/yearly toggle, comparison table
  [x] About /about — Mission, team, history
  [x] FAQ /faq — Categorized accordion + search (FAQPage JSON-LD)
  [x] Terms /terms
  [x] Privacy /privacy
  [x] Cookies /cookies
  [x] Contact /contact — Form + map embed
  [x] Blog List /blog — Article cards
  [x] Blog Article /blog/[slug] — Article reader
  [x] 404 / Error — not-found.tsx + error.tsx
Authentication — 6 màn hình
  [x] Login /login — Email/password + OAuth (Google/Apple/Facebook)
  [x] Sign up /signup — Form + password strength + terms
  [x] Forgot Password /forgot-password
  [x] Reset Password /reset-password?token=
  [x] Verify Email /verify-email?token=
  [x] Onboarding /onboarding — 4-step wizard (goals/vehicle/payment/notifications)
Discovery — 4 màn hình
  [x] Map /map (MAIN) — Full-width map, search, filter panel, list bottom sheet, location detect, sort
  [x] Stations List /stations — Grid card view, alternative to map
  [x] Station Detail /stations/[id] — Gallery, 5 tabs (Tổng quan/Slot & Giá/Đánh giá/Tiện ích/Hoạt động), favorite, share, directions
  [x] Trip Planner /trip-planner — Form + route map + suggested charging stops
  [x] Favorites /favorites — Saved stations grid
Booking — 3 màn hình
  [x] My Bookings /bookings — 4 tabs (Sắp tới/Đang/Hoàn tất/Hủy), card list, actions
  [x] New Booking Wizard /bookings/new — 5-step (Trạm → Slot/Giờ → Xe → Thanh toán → Xác nhận) với hold countdown
  [x] Booking Detail /bookings/[id] — QR code lớn, timeline, cancel/extend, .ics download
Charging — 3 màn hình
  [x] Active Charging /charging — Hero SOC display, charge curve chart, auto-stop settings, end session + receipt + rate
  [x] Charging History /charging/history — Filters, export CSV, table/cards
  [x] Session Detail/Receipt /charging/[id] — Full receipt, charge curve, VAT invoice, đánh giá
Wallet & Payment — 4 màn hình
  [x] Wallet Overview /wallet — Balance hero, spending insights, recent transactions
  [x] Top-up /wallet/topup — Quick chips, payment selector, voucher bonus
  [x] Payment Methods /wallet/methods — List, default toggle, add/remove, auto-topup settings
  [x] Transactions /wallet/transactions — Full table, filter, export
Engagement — 4 màn hình
  [x] Vouchers /vouchers — 3 tabs (Khả dụng/Đã dùng/Hết hạn) + redeem code
  [x] Loyalty /loyalty — Tier progress, points, earning rules, rewards catalog
  [x] Referral /referral — Code, share buttons, stats, referred friends
  [x] Reviews /reviews — My reviews + pending reviews prompt
Notifications — 1 màn hình
  [x] Notifications Inbox /notifications — Tabs theo type, group theo ngày
Support — 6 màn hình
  [x] Help Center /support — Search, category grid, popular articles, contact options
  [x] Help Article /support/articles/[slug] — Reader, helpful Y/N, related, escalate
  [x] My Tickets /support/tickets — Table
  [x] New Ticket /support/tickets/new — Form
  [x] Ticket Detail /support/tickets/[id] — Chat-like thread
  [x] Live Chat /support/chat — Mock widget full-page
Profile & Settings — 7 màn hình
  [x] Profile Overview /profile — Hero, stats, quick links grid
  [x] My Vehicles /profile/vehicles — List + add new (separate page /profile/vehicles/new và /profile/vehicles/[id])
  [x] Security /profile/security — Password, 2FA, active sessions, login history
  [x] Connected Accounts /profile/connected — OAuth providers
  [x] KYC Verification /profile/kyc — Multi-step ID + selfie
  [x] Privacy & Data /profile/privacy — Toggles, export data, delete account
  [x] Preferences /profile/preferences — Language/theme/notifications/defaults
Layout / Shared (không phải page)
  [x] MarketingLayout — MarketingLayout.tsx (MarketingHeader nav + CTA + MarketingFooter 4 columns + newsletter + social)
  [x] AuthLayout — UserAuthLayout.tsx (Centered card với brand illustration desktop)
  [x] UserLayout — UserLayout.tsx + UserHeader.tsx + UserSidebar.tsx (logo + nav + balance pill + bell + avatar dropdown + collapsed/expanded)
  [x] AuthGuard — PrivateRoute.tsx (Redirect to /login nếu chưa đăng nhập)
  [x] StationMap + StationPin + MapFilterPanel + SearchBox — Triển khai inline trong MapPage
  [x] BookingWizard + Stepper components — Triển khai inline trong NewBookingWizardPage (4-step + hold timer)
  [x] LiveChargingHeroCard + ChargeCurveChart + AutoStopSettings — Triển khai inline trong ChargingDashboard + LiveChargingPage
  [x] WalletCard + SpendingInsights + TopupSheet — Triển khai inline trong WalletOverviewPage + TopUpPage
  [x] TierProgress + PointsBalance + RewardsCatalog — Triển khai inline trong LoyaltyPage
  [x] TicketThread + LiveChatWidget — Triển khai inline trong TicketDetailPage + LiveChatPage
  [x] SEO setup — index.html: title, meta description, OpenGraph, Twitter Card, JSON-LD (WebApplication schema)
Tổng cộng: 49 màn hình + 11 nhóm layout/shared components

So với prompt gốc (6 page), bản này bổ sung 43 màn hình thiết yếu phủ đủ user journey: marketing/SEO surface (11), authentication flow (6), discovery (4), booking (3), charging (3), wallet (4), engagement gồm vouchers/loyalty/referral/reviews (4), notifications (1), support 6 màn (helpcenter/articles/tickets/chat), và account management 7 màn (vehicles/security/connected/kyc/privacy/preferences).
