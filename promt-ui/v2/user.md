# USER — Đặc tả màn hình & Checklist triển khai

## Định hướng nền tảng
USER là web-first responsive application cho tài xế EV:
- Thiết bị chính: trình duyệt desktop/laptop
- Thiết bị phụ: tablet + mobile (responsive)
- **Không phải PWA** — dùng top header navigation (không phải bottom nav)
- Giọng điệu: thân thiện, hiện đại, tin cậy

## Tech Stack
- Next.js 14 App Router, TypeScript strict
- Tailwind CSS v3 + shadcn/ui
- Màu chủ đạo: indigo-600 (#4F46E5) — --color-user-accent
- Recharts (charge curve, spending insights)
- react-hook-form + zod, next-intl, nuqs, Zustand (booking draft)
- SEO: metadata, JSON-LD cho trang public

## Routes
```
/app/
  (marketing)/
    layout.tsx
    page.tsx                      ← Landing
    pricing/page.tsx
    about/page.tsx
    faq/page.tsx
  (user-auth)/
    layout.tsx
    login/page.tsx
    signup/page.tsx
    forgot-password/page.tsx
    onboarding/page.tsx
  (user)/
    layout.tsx
    map/page.tsx                  ← Màn hình chính
    stations/page.tsx
    stations/[id]/page.tsx
    bookings/page.tsx
    bookings/new/page.tsx
    bookings/[id]/page.tsx
    charging/page.tsx
    charging/history/page.tsx
    charging/[id]/page.tsx
    wallet/page.tsx
    wallet/topup/page.tsx
    wallet/transactions/page.tsx
    vouchers/page.tsx
    notifications/page.tsx
    profile/page.tsx
    profile/vehicles/page.tsx
    profile/vehicles/new/page.tsx
    profile/vehicles/[id]/page.tsx
    profile/security/page.tsx
    profile/preferences/page.tsx
```

## Mock user hiện tại
```ts
currentUserId: "USR-001"
name: "Trần Thị Hương"
walletBalance: 285_000
loyaltyTier: "silver"
loyaltyPoints: 1240
defaultVehicleId: "EV-001"
```

---

## LAYOUT — MarketingLayout (trang public)

### MarketingHeader
- [ ] Logo + tagline "VoltPark"
- [ ] Nav: Trang chủ | Tính năng | Bảng giá | Hỗ trợ
- [ ] Bên phải: [VI/EN] | [Đăng nhập] | [Đăng ký] (primary CTA)
- [ ] Sticky khi cuộn, nền trắng + shadow nhẹ
- [ ] Mobile < lg: hamburger → Sheet drawer menu

### MarketingFooter
- [ ] 4 cột: Về chúng tôi | Sản phẩm | Hỗ trợ | Mạng xã hội
- [ ] Form đăng ký newsletter
- [ ] Icon mạng xã hội
- [ ] Copyright + link điều khoản/privacy

---

## LAYOUT — UserLayout (authenticated)

### UserHeader (sticky, cao 64px)
- [ ] Logo → /map
- [ ] Nav desktop: Bản đồ | Bãi đỗ | Đặt chỗ | Ví | Yêu thích
- [ ] Bên phải:
  - [ ] Ô tìm kiếm global (Cmd+K)
  - [ ] Pill số dư ví (link → /wallet)
  - [ ] Chuông thông báo (badge số chưa đọc)
  - [ ] Avatar dropdown: Hồ sơ | Xe của tôi | Vouchers | Cài đặt | Đăng xuất
  - [ ] Icon ngôn ngữ
- [ ] Mobile < lg: hamburger → UserMobileDrawer với toàn bộ menu

---

## MÀN HÌNH 1 — / (Landing Page)

**Mục đích:** Thu hút và chuyển đổi người dùng mới.

### SEO
- [ ] title: "VoltPark — Tìm trạm sạc xe điện nhanh nhất Việt Nam" (≤60 ký tự)
- [ ] meta description (≤160 ký tự)
- [ ] OpenGraph + Twitter card
- [ ] JSON-LD: Organization schema

### Checklist

#### Hero section
- [ ] Nền gradient indigo → cyan
- [ ] Tiêu đề lớn + phụ đề
- [ ] Nút [Bắt đầu miễn phí] (primary) + [Xem demo] (secondary)
- [ ] Mockup thiết bị / minh họa bên phải
- [ ] Dải tin tưởng: "Tin tưởng bởi 50.000+ tài xế EV"

#### Các section
- [ ] **Bộ đếm stats** (4 thẻ): Trạm sạc | Bộ sạc | Phiên/tháng | Khách hàng
- [ ] **Lưới tính năng** (3×2): icon + tên + mô tả ngắn
- [ ] **Cách hoạt động** (3 bước có minh họa): Tìm → Đặt → Sạc
- [ ] **Preview bản đồ**: interactive, nút "Cho phép vị trí" (mock)
- [ ] **Teaser giá**: 3 gói → CTA đến /pricing
- [ ] **Testimonials**: carousel với avatar + quote + tên
- [ ] **FAQ accordion**: 5 câu hỏi thường gặp
- [ ] **Banner CTA cuối**: gradient + nút đăng ký

---

## MÀN HÌNH 2 — /pricing (Bảng giá)

**Mục đích:** Giới thiệu các gói dịch vụ.

### Checklist
- [ ] Toggle Monthly/Yearly (yearly giảm 20%)
- [ ] 3 cột giá: Theo lượt | Plus (99k/tháng) | Doanh nghiệp (liên hệ)
- [ ] Gói được đề xuất: viền nổi bật + badge "Phổ biến nhất"
- [ ] Bảng so sánh đầy đủ tính năng bên dưới
- [ ] Section FAQ riêng về giá

---

## MÀN HÌNH 3 — /login (Đăng nhập)

**Mục đích:** Xác thực người dùng.

### Checklist
- [ ] Layout: thẻ 480px, bên trái minh họa brand (desktop), bên phải form
- [ ] Form (react-hook-form + zod):
  - [ ] Email + Mật khẩu
  - [ ] Checkbox "Ghi nhớ đăng nhập"
  - [ ] Toggle hiện/ẩn mật khẩu
  - [ ] Validate email format, mật khẩu ≥ 6 ký tự
  - [ ] Lỗi inline khi blur
  - [ ] Nút [Đăng nhập] disabled khi chưa hợp lệ
  - [ ] Trạng thái loading: spinner
- [ ] Phân cách "hoặc"
- [ ] OAuth: [Google] | [Apple] | [Facebook] (mock, thành công sau 1s)
- [ ] Link "Quên mật khẩu?" → /forgot-password
- [ ] Footer: "Chưa có tài khoản? Đăng ký" → /signup
- [ ] Đăng nhập sai → toast error
- [ ] Thành công → redirect /map (hoặc ?redirect= param)

---

## MÀN HÌNH 4 — /signup (Đăng ký)

**Mục đích:** Tạo tài khoản mới.

### Checklist
- [ ] Form:
  - [ ] Họ tên | Email | SĐT | Mật khẩu + thanh đo độ mạnh | Xác nhận mật khẩu
  - [ ] Checkbox đồng ý điều khoản (required)
  - [ ] Validate SĐT định dạng Việt Nam (+84 hoặc 0xx)
  - [ ] Confirm phải khớp với mật khẩu
- [ ] OAuth đăng ký
- [ ] Thành công → /onboarding

---

## MÀN HÌNH 5 — /forgot-password

### Checklist
- [ ] Form email + nút [Gửi link đặt lại]
- [ ] Sau submit → trạng thái thành công: icon ✓ + hướng dẫn
- [ ] Link [← Quay lại đăng nhập]

---

## MÀN HÌNH 6 — /onboarding (Wizard lần đầu)

**Mục đích:** Thiết lập ban đầu cho người dùng mới.

### Checklist
- [ ] Thanh tiến trình 4 bước đầu trang

#### Bước 1 — Mục tiêu sử dụng
- [ ] Chip select đa lựa chọn: Đi làm hàng ngày | Chuyến dài | Kinh doanh | Tò mò

#### Bước 2 — Thêm xe đầu tiên
- [ ] Form: Hãng xe | Model | Năm | Biển số | Dung lượng pin | Loại đầu sạc
- [ ] Nút [Bỏ qua]

#### Bước 3 — Thêm phương thức thanh toán
- [ ] Tùy chọn: Ví VoltPark | Thẻ ngân hàng | Ví điện tử
- [ ] Nút [Bỏ qua]

#### Bước 4 — Quyền truy cập
- [ ] Yêu cầu quyền thông báo (browser prompt)
- [ ] Yêu cầu quyền vị trí (browser prompt)
- [ ] Nút [Hoàn tất] → /map + toast chào mừng

---

## MÀN HÌNH 7 — /map (Màn hình chính)

**Mục đích:** Tìm và chọn trạm sạc gần nhất.

### Checklist

#### Layout full-width (ghi đè container thông thường)

#### Toolbar sticky dưới header
- [ ] Ô tìm kiếm địa chỉ (autocomplete mock)
- [ ] Pill nút "Vị trí hiện tại" (dùng navigator.geolocation)
- [ ] Toggle: Bản đồ | Danh sách
- [ ] Nút [Bộ lọc] (badge số bộ lọc đang áp dụng)

#### MapFilterPanel
- [ ] Desktop: panel trái cố định | Mobile: Sheet
- [ ] Bộ lọc:
  - [ ] Loại đầu sạc: checkbox (Type2 / CCS2 / CHAdeMO)
  - [ ] Công suất: range slider (kW)
  - [ ] Giá tối đa: slider (₫/kWh)
  - [ ] Tiện ích: chip multi-select (WC | Đồ ăn | WiFi | Mái che)
  - [ ] Khoảng cách: slider bán kính
  - [ ] Toggle "Chỉ trạm còn slot"
  - [ ] Đánh giá tối thiểu: sao
  - [ ] Toggle 24/7
- [ ] Nút [Áp dụng] + [Đặt lại]

#### Khu vực bản đồ (SVG mock hoặc Leaflet)
- [ ] Pin màu: xanh (≥4 slot trống) / vàng (1–3) / đỏ (hết slot)
- [ ] Pin được chọn: lớn hơn + popover thông tin nhanh
- [ ] Nút FAB "Định vị tôi" (góc phải dưới)
- [ ] Cập nhật màu pin mỗi 30s

#### Danh sách trạm (StationListBottomSheet)
- [ ] Desktop: panel phải | Mobile: bottom sheet kéo lên
- [ ] Dropdown sắp xếp: Gần nhất | Rẻ nhất | Đánh giá cao | Sạc nhanh nhất
- [ ] Mỗi StationCardMini:
  - [ ] Ảnh thumbnail | Tên | Khoảng cách + ETA | Slot trống/tổng | Giá/kWh | Rating | Trạng thái mở cửa
  - [ ] Hover/tap → highlight pin tương ứng trên bản đồ
  - [ ] Click → /stations/[id]

- [ ] URL state: ?lat=&lng=&zoom=&q=&type=&maxPrice=&radius=

---

## MÀN HÌNH 8 — /stations/[id] (Chi tiết trạm)

**Mục đích:** Xem đầy đủ thông tin trạm trước khi đặt chỗ.

### SEO
- [ ] JSON-LD: LocalBusiness với địa chỉ, tọa độ, giờ mở cửa
- [ ] Dynamic OG image

### Checklist

#### Phần đầu (2 cột desktop)
- [ ] **Trái**: StationGallery — nhiều ảnh, cuộn, lightbox khi click
- [ ] **Phải**:
  - [ ] Tên + badge xác thực
  - [ ] Rating sao + số lượt đánh giá
  - [ ] Địa chỉ + khoảng cách từ vị trí hiện tại
  - [ ] Trạng thái live: "Mở cửa • 45 / 96 slot trống" (cập nhật 15s)
  - [ ] Hàng hành động: [Đặt chỗ] (primary, lớn) | [Bắt đầu sạc ngay] | [Yêu thích ♡] | [Chia sẻ] | [Đường đi →]

#### Tabs (sticky khi cuộn)
- [ ] Tổng quan | Slot & Giá | Đánh giá | Tiện ích | Hoạt động

**Tab Tổng quan:**
- [ ] Mô tả văn bản
- [ ] Bản đồ mini (pin + bán kính)
- [ ] Nút đường đi (mở Google Maps / Apple Maps)
- [ ] Bảng giờ hoạt động (thứ 2–CN)

**Tab Slot & Giá:**
- [ ] **SlotAvailabilityGrid**: lưới chỉ đọc (màu theo trạng thái, không click để bắt đầu)
  - [ ] Nhãn "Cập nhật mỗi 15 giây"
- [ ] **PricingBreakdown**:
  - [ ] Giá điện/kWh (giờ bình thường / cao điểm)
  - [ ] Phí đỗ xe/giờ
  - [ ] Phí khởi động
  - [ ] VAT
  - [ ] Ước tính cho xe của bạn: "1h sạc ≈ X ₫ ~ Y kWh" (dùng xe mặc định)

**Tab Đánh giá:**
- [ ] Phân tích rating: thanh từ 5★ đến 1★
- [ ] Dropdown sắp xếp: Mới nhất | Cao nhất | Thấp nhất
- [ ] Lọc theo số sao
- [ ] Danh sách đánh giá (phân trang):
  - [ ] Avatar + tên + sao + ảnh + nội dung + ngày + phản hồi của chủ bãi

**Tab Tiện ích:**
- [ ] Lưới icon + nhãn: WC, WiFi, Đồ ăn, Mái che, v.v.

**Tab Hoạt động:**
- [ ] Heatmap giờ cao điểm (24h × 7 ngày)
- [ ] "Thời điểm vắng nhất" — gợi ý

#### Thanh sticky dưới (mobile)
- [ ] [Đặt chỗ ngay] full-width

---

## MÀN HÌNH 9 — /bookings (Danh sách đặt chỗ)

**Mục đích:** Quản lý đặt chỗ của người dùng.

### Checklist
- [ ] Tabs: Sắp tới | Đang diễn ra | Hoàn tất | Đã hủy
- [ ] Nút [+ Đặt chỗ mới] góc phải → /bookings/new
- [ ] Mỗi thẻ đặt chỗ:
  - [ ] Mã đặt chỗ + badge trạng thái
  - [ ] Tên trạm + nhãn slot + xe
  - [ ] Ngày + khung giờ
  - [ ] Chi phí ước tính
  - [ ] Thumbnail QR code
  - [ ] Nút hành động:
    - [ ] [Chi tiết] → /bookings/[id]
    - [ ] [Hủy] (nếu còn hủy được) → **ConfirmDialog** với preview hoàn tiền
    - [ ] [Mở rộng giờ] (nếu có thể)
- [ ] Trạng thái trống mỗi tab: icon + thông điệp + CTA

---

## MÀN HÌNH 10 — /bookings/new (Wizard đặt chỗ)

**Mục đích:** Đặt chỗ sạc xe theo từng bước.

### Checklist

#### Stepper ngang (5 bước)
- [ ] 1 Trạm → 2 Slot & Giờ → 3 Xe → 4 Thanh toán → 5 Xác nhận
- [ ] Bước đã xong: tick ✓ + có thể quay lại

#### Bước 1 — Chọn trạm
- [ ] Nếu đến từ /stations/[id]: pre-filled, bỏ qua bước này
- [ ] Ô tìm kiếm + thẻ trạm được chọn

#### Bước 2 — Slot & Thời gian
- [ ] **SlotPicker**: lưới slot trực quan (click để chọn)
- [ ] **TimeSlotPicker**: DatePicker + giờ bắt đầu + thời lượng (bước 30 phút)
- [ ] Kiểm tra availability live
- [ ] Preview chi phí ước tính (cập nhật khi thay đổi)

#### Bước 3 — Xe
- [ ] Thẻ xe của người dùng (có thể chọn)
- [ ] Nút [+ Thêm xe mới] inline → form thêm xe

#### Bước 4 — Thanh toán
- [ ] Hiện chi phí + số tiền đặt cọc (20% hold)
- [ ] **PaymentMethodSelector**: Ví VoltPark / Thẻ / Ví điện tử
- [ ] Input mã voucher → preview discount
- [ ] **CancellationPolicyCard**: hiện rõ chính sách hoàn tiền

#### Bước 5 — Xác nhận
- [ ] Tóm tắt toàn bộ thông tin
- [ ] **BookingHoldCountdown**: "Slot được giữ trong 14:32"
- [ ] Checkbox đồng ý điều khoản
- [ ] Nút [Xác nhận đặt chỗ] (primary, lớn)
- [ ] Thành công → /bookings/[id] + animation chúc mừng

---

## MÀN HÌNH 11 — /bookings/[id] (Chi tiết đặt chỗ)

**Mục đích:** Xem chi tiết và QR code đặt chỗ.

### Checklist
- [ ] **QR code lớn** + Mã đặt chỗ + StatusBadge (trên cùng, nổi bật)
- [ ] Chi tiết: Trạm + Slot + Thời gian + Xe
- [ ] Đồng hồ đếm ngược deadline hủy
- [ ] Bảng chi phí chi tiết
- [ ] Nút hành động:
  - [ ] [Hủy đặt chỗ] → **ConfirmDialog** với preview hoàn tiền theo chính sách
  - [ ] [Mở rộng giờ] (nếu có slot)
  - [ ] [Đường đi đến trạm] → mở maps
  - [ ] [Lưu vào lịch] → tải file .ics
- [ ] Timeline trạng thái sự kiện

---

## MÀN HÌNH 12 — /charging (Phiên sạc đang chạy)

**Mục đích:** Theo dõi phiên sạc đang hoạt động.

### Checklist

#### Khi không có phiên nào
- [ ] EmptyState: icon + "Bạn chưa có phiên sạc nào" + link [xem lịch sử]

#### Khi có phiên đang chạy

**Thẻ hero (lớn, nổi bật):**
- [ ] Icon pin đang lên + hiển thị % SOC lớn (e.g. "73%") + marker SOC mục tiêu
- [ ] Công suất hiện tại: "47 kW" + thanh animated
- [ ] Thời gian đã qua: HH:MM:SS (live counter)
- [ ] Năng lượng đã sạc: 18.4 kWh
- [ ] Chi phí hiện tại: X ₫
- [ ] Ước tính: "Còn ~22 phút đến 80%"
- [ ] Cập nhật mỗi 5s

**Bên dưới hero:**
- [ ] **ChargeCurveChart**: đường công suất theo thời gian (Recharts, cập nhật 5s)
- [ ] **AutoStopSettings**: slider SOC mục tiêu (tự dừng khi đạt)
- [ ] Toggle thông báo khi đầy
- [ ] Thẻ thông tin xe
- [ ] Thẻ thông tin trạm + slot + [Hỗ trợ tại chỗ →]

**Thanh hành động sticky dưới:**
- [ ] [Tạm dừng] (nếu bộ sạc hỗ trợ)
- [ ] [Dừng phiên] (nút đỏ lớn) → **ConfirmDialog** → hiển thị SessionReceipt

**Sau khi phiên kết thúc:**
- [ ] Trang SessionReceipt: năng lượng + thời gian + chi phí + phương thức + tiết kiệm voucher
- [ ] Nút [Tải hóa đơn]
- [ ] **RateExperienceModal**: sao + bình luận tùy chọn + ảnh → [Gửi đánh giá]
- [ ] [Sạc lại tại trạm này] / [Tìm trạm khác]

---

## MÀN HÌNH 13 — /charging/history (Lịch sử sạc)

**Mục đích:** Tra cứu lịch sử các phiên sạc.

### Checklist
- [ ] Bộ lọc: Date range | Trạm | Trạng thái
- [ ] **Bảng** (desktop) / **Card list** (mobile):
  - [ ] Cột: Ngày | Trạm | Slot | Xe | kWh | Thời lượng | Số tiền | Trạng thái | [Hóa đơn]
- [ ] Nút [Xuất CSV]
- [ ] Click hàng → /charging/[id]

---

## MÀN HÌNH 14 — /charging/[id] (Hóa đơn phiên sạc)

**Mục đích:** Xem chi tiết và hóa đơn một phiên.

### Checklist
- [ ] Toàn bộ chi tiết phiên sạc
- [ ] ChargeCurveChart
- [ ] Bảng chi phí chi tiết
- [ ] Thông tin thanh toán
- [ ] Nút [Tải hóa đơn VAT]
- [ ] "Đánh giá trải nghiệm" nếu chưa đánh giá → mở RateExperienceModal
- [ ] Nút [Đặt lại tại trạm này] → /bookings/new?station=X

---

## MÀN HÌNH 15 — /wallet (Tổng quan ví)

**Mục đích:** Quản lý số dư và thanh toán.

### Checklist

#### WalletCard (hero)
- [ ] Số dư lớn, nổi bật
- [ ] Tier loyalty + điểm
- [ ] Nút [+ Nạp tiền] (primary) + [Phương thức thanh toán]

#### SpendingInsights
- [ ] Biểu đồ area: chi tiêu 30 ngày gần nhất
- [ ] Donut phân bổ: Điện | Đỗ xe | VAT | Khác
- [ ] So sánh với kỳ trước (delta %)

#### Giao dịch gần đây (10 dòng)
- [ ] Link [Xem tất cả →] → /wallet/transactions

---

## MÀN HÌNH 16 — /wallet/topup (Nạp tiền)

**Mục đích:** Nạp tiền vào ví.

### Checklist
- [ ] Chips số tiền: 50k / 100k / 200k / 500k / 1M / Tùy chỉnh
- [ ] Input tùy chỉnh (hiện khi chọn "Tùy chỉnh")
- [ ] **PaymentMethodSelector**: các phương thức đã lưu
- [ ] Input voucher → preview bonus (ví dụ "Nạp 100k tặng 10k")
- [ ] Nút [Xác nhận nạp] → **ConfirmDialog** → confetti animation + cập nhật số dư + xem hóa đơn

---

## MÀN HÌNH 17 — /wallet/transactions (Lịch sử giao dịch)

**Mục đích:** Xem toàn bộ lịch sử giao dịch ví.

### Checklist
- [ ] **DataTable**:
  - [ ] Cột: Ngày | Loại | Mô tả | Số tiền (+/-) | Số dư sau | Phương thức | Trạng thái
  - [ ] Số tiền dương: xanh | âm: đỏ
- [ ] Bộ lọc: Loại | Date range | Trạng thái
- [ ] Nút [Xuất CSV / Excel]

---

## MÀN HÌNH 18 — /vouchers (Voucher & Khuyến mãi)

**Mục đích:** Quản lý voucher của người dùng.

### Checklist
- [ ] Tabs: Khả dụng | Đã dùng | Hết hạn
- [ ] Lưới VoucherCard:
  - [ ] Badge giá trị giảm
  - [ ] Tiêu đề + mô tả
  - [ ] Điều kiện áp dụng + ngày hết hạn
  - [ ] Code (với nút copy)
  - [ ] Nút [Sử dụng ngay] → /map với filter phù hợp
- [ ] **RedeemCodeForm**: input mã + nút [Áp dụng]
  - [ ] Hợp lệ → animation thêm voucher + toast thành công
  - [ ] Không hợp lệ → thông báo lỗi inline

---

## MÀN HÌNH 19 — /notifications (Thông báo)

**Mục đích:** Xem thông báo cá nhân.

### Checklist
- [ ] Tabs: Tất cả | Chưa đọc | Đặt chỗ | Sạc | Khuyến mãi | Hệ thống
- [ ] Nút [Đánh dấu tất cả đã đọc]
- [ ] Nhóm theo ngày: Hôm nay / Hôm qua / Cũ hơn
- [ ] Mỗi item: icon theo loại + tiêu đề + nội dung + thời gian tương đối + chấm chưa đọc
- [ ] Click → điều hướng đến link + đánh dấu đã đọc
- [ ] Trạng thái trống mỗi tab

---

## MÀN HÌNH 20 — /profile (Hồ sơ)

**Mục đích:** Tổng quan tài khoản và điều hướng cài đặt.

### Checklist

#### Thẻ hero hồ sơ
- [ ] Avatar (có upload), tên, email + badge xác minh, SĐT + badge
- [ ] Thành viên từ + tier loyalty
- [ ] Thống kê nhanh: Tổng phiên | Tổng kWh | Tổng chi tiêu | Đã tiết kiệm

#### Lưới điều hướng nhanh (icons)
- [ ] Xe của tôi → /profile/vehicles
- [ ] Bảo mật → /profile/security
- [ ] Tùy chọn → /profile/preferences
- [ ] Vouchers → /vouchers
- [ ] Thông báo → /notifications

---

## MÀN HÌNH 21 — /profile/vehicles (Xe của tôi)

**Mục đích:** Quản lý xe điện.

### Checklist
- [ ] Danh sách VehicleCard:
  - [ ] Ảnh | Hãng/Model | Biển số | Badge loại đầu sạc | Badge "Mặc định"
  - [ ] Nút: [Đặt làm mặc định] | [Chỉnh sửa] → modal | [Xóa] → **ConfirmDialog**
- [ ] Nút [+ Thêm xe] → /profile/vehicles/new
- [ ] Trạng thái trống: icon xe + "Chưa có xe nào — Thêm xe để bắt đầu"

---

## MÀN HÌNH 22 — /profile/vehicles/new & /profile/vehicles/[id]

**Mục đích:** Thêm/chỉnh sửa xe.

### Checklist
- [ ] Form (react-hook-form + zod):
  - [ ] Hãng xe (autocomplete từ danh sách xe EV phổ biến)
  - [ ] Model | Năm | Biển số (validate định dạng Việt Nam)
  - [ ] Dung lượng pin (kWh)
  - [ ] Loại đầu sạc: radio (Type2 / CCS2 / CHAdeMO)
  - [ ] Màu xe (tùy chọn)
  - [ ] Ảnh xe (upload tùy chọn)
  - [ ] Toggle "Đặt làm xe mặc định"
- [ ] Validate tất cả required field trước submit
- [ ] Submit → toast thành công + redirect /profile/vehicles

---

## MÀN HÌNH 23 — /profile/security (Bảo mật)

**Mục đích:** Quản lý mật khẩu và bảo mật tài khoản.

### Checklist

#### Đổi mật khẩu
- [ ] Mật khẩu hiện tại | Mật khẩu mới | Xác nhận mật khẩu
- [ ] Validate confirm phải khớp, mật khẩu mới ≥ 8 ký tự
- [ ] Nút [Đổi mật khẩu] → toast thành công

#### 2FA
- [ ] Toggle bật/tắt
- [ ] Khi bật → flow setup: hiện QR code + mã backup
- [ ] Khi tắt → **ConfirmDialog**

#### Phiên đăng nhập đang hoạt động
- [ ] Danh sách thiết bị: tên thiết bị + vị trí + lần hoạt động cuối
- [ ] Nút [Đăng xuất thiết bị này] mỗi hàng (trừ thiết bị hiện tại)
- [ ] Nút [Đăng xuất tất cả] (nguy hiểm, có confirm)

#### Lịch sử đăng nhập (20 lần gần nhất)
- [ ] Cột: Thời gian | IP | Thiết bị | Kết quả
- [ ] Hàng thất bại: nền đỏ nhạt

---

## MÀN HÌNH 24 — /profile/preferences (Tùy chỉnh)

**Mục đích:** Thiết lập ngôn ngữ, giao diện và thông báo.

### Checklist
- [ ] Ngôn ngữ: VI / EN (lưu ngay khi thay đổi)
- [ ] Giao diện: Sáng / Tối / Theo hệ thống (lưu ngay)
- [ ] Tiền tệ: VND (mặc định, tùy chọn tương lai)
- [ ] **Toggle thông báo** (mỗi loại riêng lẻ):
  - [ ] Xác nhận đặt chỗ | Bắt đầu/kết thúc sạc | Đạt SOC mục tiêu
  - [ ] Cảnh báo số dư thấp | Voucher mới | Bản tin | Cập nhật hệ thống
  - [ ] Kênh: Email / Push (nếu browser hỗ trợ)
- [ ] Xe mặc định: select từ danh sách xe
- [ ] Phương thức thanh toán mặc định
- [ ] Nút [Lưu tất cả] → toast thành công

---

## TRANG MARKETING PHỤ (triển khai đơn giản)

### /about
- [ ] Hero section + sứ mệnh công ty
- [ ] Đội ngũ (avatar + tên + chức danh, mock data)
- [ ] Mốc lịch sử / timeline

### /faq
- [ ] Ô tìm kiếm lọc câu hỏi (debounce 300ms)
- [ ] Accordion nhóm theo chủ đề
- [ ] JSON-LD: FAQPage schema

---

## TRẠNG THÁI CHUNG (áp dụng mọi màn hình)

- [ ] Loading: skeleton animate-pulse (không để trắng)
- [ ] Trống: EmptyState icon + thông điệp thân thiện + CTA hành động
- [ ] Lỗi: ErrorState + nút [Thử lại]
- [ ] Hover: lift nhẹ (hover:-translate-y-0.5 hover:shadow-md)
- [ ] Focus-visible ring trên mọi element tương tác
- [ ] Responsive: 360px / 768px / 1024px / 1440px
- [ ] Toast: góc phải trên, Sonner, tiếng Việt mặc định
- [ ] Form: validate khi blur, lỗi inline, disabled khi chưa hợp lệ
- [ ] Mọi hành động nguy hiểm: ConfirmDialog rõ ràng
- [ ] Dark mode: Tailwind dark: prefix, toggle tại /profile/preferences
- [ ] i18n: tất cả text qua t('key'), namespace "user.*"
- [ ] SEO: trang public có metadata + canonical URL

## LUỒNG ĐIỀU HƯỚNG CHÍNH

```
/ (Landing)
  → /signup → /onboarding → /map
  → /login → /map

/map
  → /stations/[id]
    → /bookings/new
      → /bookings/[id] (QR)
        → /charging (live)
          → SessionReceipt + Rate modal
            → /charging/history
```
