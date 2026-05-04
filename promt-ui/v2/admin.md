# ADMIN — Đặc tả màn hình & Checklist triển khai

## Tech Stack
- Next.js 14 App Router, TypeScript strict
- Tailwind CSS v3 + shadcn/ui
- Recharts, react-hook-form + zod, next-intl, nuqs, lucide-react
- Màu chủ đạo: sky-500 (#0EA5E9)

## Routes
```
/app/(admin)/
  layout.tsx
  dashboard/page.tsx
  stations/page.tsx
  stations/[id]/page.tsx
  chargers/page.tsx
  chargers/[id]/page.tsx
  analytics/page.tsx
  users/page.tsx
  users/[id]/page.tsx
  alerts/page.tsx
  audit-log/page.tsx
  notifications/page.tsx
  profile/page.tsx
  settings/page.tsx
/app/(auth)/
  login/page.tsx
  forgot-password/page.tsx
```

---

## LAYOUT — AdminLayout

### Sidebar
- [ ] Chiều rộng 240px (mở rộng) / 64px (thu gọn icon-only)
- [ ] Nút toggle thu gọn/mở rộng, lưu trạng thái vào localStorage
- [ ] Logo + tên "VoltPark Admin" ẩn khi thu gọn
- [ ] Nhóm nav:
  - Tổng quan: Dashboard
  - Hạ tầng: Trạm sạc, Bộ sạc
  - Vận hành: Phân tích, Người dùng, Cảnh báo, Nhật ký
  - Hệ thống: Cài đặt
- [ ] Item đang active: nền sky-500/10, chữ sky-600, viền phải 2px sky-500
- [ ] Hover: nền trắng/5
- [ ] Tooltip hiện nhãn khi sidebar thu gọn
- [ ] Dưới cùng: icon Cài đặt + avatar admin + tên (ẩn khi thu gọn)
- [ ] Responsive < 768px: sidebar là Sheet overlay

### Header (sticky, cao 56px)
- [ ] Breadcrumb tự động sinh từ route hiện tại
- [ ] Nút hamburger trên mobile
- [ ] Bên phải: Tìm kiếm (Cmd+K) | [VI/EN] | chuông thông báo (badge số chưa đọc) | avatar dropdown
- [ ] Avatar dropdown: Profile / Nhật ký / Đăng xuất (có ConfirmDialog)

---

## MÀN HÌNH 1 — /login

**Mục đích:** Đăng nhập vào hệ thống admin.

### Checklist
- [ ] Card căn giữa trang, rộng 400px
- [ ] Logo + tiêu đề "VoltPark Admin"
- [ ] Form email + mật khẩu (react-hook-form + zod)
  - [ ] Validate email đúng định dạng
  - [ ] Mật khẩu tối thiểu 6 ký tự
  - [ ] Hiển thị lỗi inline dưới mỗi field khi blur
- [ ] Nút toggle hiện/ẩn mật khẩu (icon Eye/EyeOff)
- [ ] Checkbox "Ghi nhớ đăng nhập"
- [ ] Nút [Đăng nhập] disabled khi form chưa hợp lệ
- [ ] Trạng thái loading: spinner trên nút, disabled toàn bộ form
- [ ] Mock: bất kỳ email/mật khẩu đúng format → delay 1s → redirect /dashboard
- [ ] Sai thông tin → toast error "Email hoặc mật khẩu không đúng"
- [ ] Link "Quên mật khẩu?" → /forgot-password

---

## MÀN HÌNH 2 — /forgot-password

**Mục đích:** Yêu cầu đặt lại mật khẩu.

### Checklist
- [ ] Card căn giữa, rộng 400px
- [ ] Field email + nút [Gửi link đặt lại]
- [ ] Validate email hợp lệ
- [ ] Sau submit → chuyển sang trạng thái thành công:
  - [ ] Icon check + thông báo "Đã gửi link đến email của bạn"
  - [ ] Hướng dẫn kiểm tra hộp thư
- [ ] Link [← Quay lại đăng nhập]

---

## MÀN HÌNH 3 — /dashboard (NOC View)

**Mục đích:** Tổng quan hệ thống thời gian thực.

### Checklist

#### KPI Row (4 thẻ)
- [ ] **Doanh thu hôm nay**: giá trị VND + badge xu hướng (+/-%)
  - [ ] Click → navigate /analytics?period=today
- [ ] **Phiên sạc đang hoạt động**: số lượng + chấm pulse animation
  - [ ] Click → /chargers?status=charging
- [ ] **Slots trống / Đã dùng**: dạng "45 / 96" + thanh tiến trình
  - [ ] Màu: xanh < 50%, vàng 50–80%, đỏ > 80%
- [ ] **Sức khỏe hệ thống**: % + màu ngưỡng (≥90% xanh, 70–89% vàng, <70% đỏ)
  - [ ] Click → /alerts?severity=critical
- [ ] Tất cả 4 thẻ tự động cập nhật mỗi 30s (±5% variance mock)
- [ ] Timestamp "Cập nhật lúc HH:MM:SS" + nút [⟳ Làm mới]

#### Biểu đồ (hàng 2)
- [ ] **Phiên sạc theo giờ** (2/3 chiều rộng): LineChart 24h
  - [ ] 2 đường: hôm nay (màu chính) + hôm qua (đứt nét, mờ)
  - [ ] Tooltip tùy chỉnh hiện số phiên khi hover
- [ ] **Trạng thái bộ sạc** (1/3 chiều rộng): PieChart donut
  - [ ] 4 phần: Sẵn sàng / Đang sạc / Lỗi / Ngoại tuyến
  - [ ] Tâm donut: tổng số bộ sạc
  - [ ] Legend dưới: tên + số lượng + %

#### Bản đồ + Feed cảnh báo (hàng 3)
- [ ] **Bản đồ trạm** (50%): SVG với 8 pin tại tọa độ tương đối
  - [ ] Màu pin theo % tải: xanh/vàng/đỏ
  - [ ] Hover pin: tooltip tên trạm + % tải + số phiên
- [ ] **Feed cảnh báo** (50%): danh sách cuộn tối đa 400px
  - [ ] 10 cảnh báo chưa xử lý mới nhất
  - [ ] Mỗi hàng: icon mức độ + thông điệp + thời gian tương đối
  - [ ] Nền: đỏ-50 (critical) / vàng-50 (warning) / xanh-50 (info)
  - [ ] Link [Xem tất cả →] dưới cùng → /alerts

---

## MÀN HÌNH 4 — /stations (Danh sách trạm sạc)

**Mục đích:** Xem và quản lý danh sách trạm.

### Checklist

#### Toolbar
- [ ] Tiêu đề trang "Quản lý Trạm sạc"
- [ ] Nút [+ Thêm trạm] → **mở modal tạo trạm mới** (disabled, tooltip "Chức năng đang phát triển")
- [ ] Thanh tìm kiếm debounce 300ms (theo tên + địa chỉ)
- [ ] Tabs trạng thái: Tất cả | Online | Offline | Bảo trì (badge số lượng mỗi tab)
- [ ] Toggle xem: Bảng | Lưới (lưu vào localStorage)
- [ ] Dropdown sắp xếp: Tên | Tải (%) | Doanh thu hôm nay

#### Chế độ bảng
- [ ] Cột: # | Tên trạm | Địa chỉ | Tổng slot | Đang sạc | Tải (%) | Doanh thu hôm nay | Trạng thái | Thao tác
- [ ] Cột "Tải": thanh tiến trình màu động (xanh/vàng/đỏ)
- [ ] Cột "Doanh thu": định dạng VND
- [ ] Cột "Trạng thái": StatusBadge
- [ ] Cột "Thao tác": nút [Chi tiết] → /stations/[id]
- [ ] Header cột có thể click để sắp xếp (icon ↑↓)
- [ ] Loading: skeleton 5 hàng animate-pulse

#### Chế độ lưới
- [ ] 3 cột desktop / 2 tablet / 1 mobile
- [ ] Mỗi thẻ: tên + địa chỉ + badge trạng thái + thanh tải + số bộ sạc + doanh thu

#### Phân trang
- [ ] 10 mục/trang
- [ ] URL param ?page=N
- [ ] Hiển thị "Hiển thị 1–10 / 8 trạm"

#### Trạng thái trống
- [ ] Icon MapPin + "Không có trạm nào phù hợp"

---

## MÀN HÌNH 5 — /stations/[id] (Chi tiết trạm)

**Mục đích:** Xem chi tiết và theo dõi thời gian thực một trạm.

### Checklist

#### Header
- [ ] Nút [← Quay lại] → /stations
- [ ] Tên trạm + StatusBadge
- [ ] Nút [Chỉnh sửa] → **mở modal chỉnh sửa thông tin trạm**
  - [ ] Form: tên, địa chỉ, giờ hoạt động, manager
  - [ ] Validate required fields
  - [ ] Submit → toast thành công + cập nhật hiển thị

#### Section 1 — Thông tin (2 cột)
- [ ] **Thẻ trái (tĩnh)**: Địa chỉ | Tọa độ | Giờ hoạt động | Mã trạm | Manager
- [ ] **Thẻ phải (thời gian thực, cập nhật 30s)**:
  - [ ] Phiên sạc hoạt động
  - [ ] Tải hiện tại % (thanh tiến trình)
  - [ ] Doanh thu hôm nay (VND)
  - [ ] Doanh thu tháng (VND)

#### Section 2 — Lưới bộ sạc
- [ ] Tiêu đề "Bộ sạc tại trạm" + badge số lượng
- [ ] Nhóm theo trạng thái: Đang sạc → Sẵn sàng → Lỗi → Ngoại tuyến
- [ ] Mỗi thẻ: viền trái 4px màu theo trạng thái
  - [ ] ID + StatusBadge + công suất kW + loại đầu kết nối
  - [ ] Thời gian heartbeat cuối (tương đối)
  - [ ] Nếu đang sạc: thanh tiến trình mini + đồng hồ đếm
  - [ ] Nút [Chi tiết] → /chargers/[id]

#### Section 3 — Biểu đồ doanh thu
- [ ] BarChart "Doanh thu 7 ngày gần nhất"
- [ ] Trục X: nhãn thứ, trục Y: VND có định dạng
- [ ] Thanh màu primary, hover màu tối hơn

---

## MÀN HÌNH 6 — /chargers (Danh sách bộ sạc)

**Mục đích:** Xem và lọc toàn bộ bộ sạc.

### Checklist

#### Header + Filter
- [ ] Tiêu đề "Quản lý Bộ sạc" + badge "X tổng / Y đang sạc"
- [ ] Filter sticky:
  - [ ] Tabs trạng thái: Tất cả | Sẵn sàng | Đang sạc | Lỗi | Ngoại tuyến (badge số)
  - [ ] Dropdown công suất: Tất cả | 22 kW | 50 kW | 150 kW
  - [ ] Dropdown đầu kết nối: Tất cả | Type2 | CCS2 | CHAdeMO
  - [ ] Dropdown trạm: Tất cả | [danh sách tên trạm]
- [ ] URL state: ?status=&power=&connector=&station=&page=

#### Lưới thẻ bộ sạc
- [ ] 4 cột desktop / 2 tablet / 1 mobile
- [ ] Mỗi thẻ:
  - [ ] Header: ID (đậm) + StatusBadge
  - [ ] Tên trạm (mờ, nhỏ)
  - [ ] ⚡ N kW | Loại đầu kết nối
  - [ ] Heartbeat cuối: thời gian tương đối (đỏ nếu > 5 phút)
  - [ ] Nếu đang sạc: thanh tiến trình kWh + đồng hồ HH:MM:SS live
  - [ ] Footer: link [Chi tiết →]
- [ ] Checkbox chọn nhiều + thanh hành động [Khởi động lại] (UI only)

---

## MÀN HÌNH 7 — /chargers/[id] (Chi tiết bộ sạc)

**Mục đích:** Theo dõi và kiểm soát một bộ sạc cụ thể.

### Checklist

#### Header
- [ ] Nút [← Quay lại] → /chargers
- [ ] Mã bộ sạc + StatusBadge (animation nếu đang sạc)

#### Section 1 — Trạng thái sống (thẻ nổi bật)
- [ ] Icon trạng thái lớn + chữ trạng thái + chấm ping nếu đang sạc
- [ ] Cập nhật mỗi 10s | Nhãn "Cập nhật lần cuối: N giây trước"
- [ ] Nút [Khởi động lại] → **ConfirmDialog** "Xác nhận khởi động lại bộ sạc?"
- [ ] Nút [Tắt] → **ConfirmDialog** destructive

#### Section 2 — Thông số kỹ thuật (lưới 2×2)
- [ ] Công suất | Loại kết nối | Firmware | Ngày lắp đặt

#### Section 3 — Phiên sạc hiện tại (chỉ khi đang sạc)
- [ ] Mã người dùng + avatar chữ cái đầu
- [ ] Thời điểm bắt đầu
- [ ] Năng lượng đã sạc: N kWh (live)
- [ ] Thời lượng: HH:MM:SS (live)
- [ ] Dự kiến hoàn thành
- [ ] Nút [Dừng phiên] → **ConfirmDialog** destructive

#### Section 4 — Nhật ký sự kiện
- [ ] Tiêu đề "Nhật ký sự kiện (20 gần nhất)"
- [ ] Timeline: chấm màu theo mức độ + đường dọc
- [ ] Mỗi sự kiện: badge loại + thông điệp + timestamp (tuyệt đối + tương đối khi hover)
- [ ] Click sự kiện → mở/đóng block payload dạng code monospace

---

## MÀN HÌNH 8 — /analytics (Phân tích)

**Mục đích:** Xem báo cáo doanh thu và vận hành.

### Checklist

#### Toolbar (sticky)
- [ ] Pills chọn kỳ: Hôm nay | 7 ngày | 30 ngày | 3 tháng | Tùy chỉnh
- [ ] "Tùy chỉnh" → hiện DateRangePicker (shadcn Calendar)
- [ ] Dropdown chọn trạm: Tất cả | [danh sách trạm]
- [ ] URL state: ?period=&from=&to=&station=

#### KPI Row (4 thẻ, theo kỳ)
- [ ] Tổng doanh thu | Tổng kWh | Số phiên sạc | Phiên TB/ngày

#### Section 1 — Biểu đồ kép (toàn chiều rộng)
- [ ] ComposedChart: Line (doanh thu ₫, trục Y trái) + Bar (kWh, trục Y phải)
- [ ] Trục X: theo giờ nếu hôm nay/7d, theo ngày nếu 30d/3m
- [ ] Click legend để ẩn/hiện từng series

#### Section 2 — Phân bố (2 cột)
- [ ] **Theo giờ** (0–23h): BarChart, độ đậm màu theo khối lượng
- [ ] **Theo thứ** (T2–CN): BarChart, highlight thanh cao nhất màu primary

#### Section 3 — Xếp hạng trạm (toàn chiều rộng)
- [ ] HorizontalBarChart: 8 trạm, sắp xếp giảm dần theo doanh thu
- [ ] Nhãn doanh thu ở cuối thanh
- [ ] Click thanh → navigate /stations/[id]

#### Section 4 — Phân tích thêm (2 cột)
- [ ] PieChart phân bố loại đầu kết nối
- [ ] PieChart phân bố công suất sạc

---

## MÀN HÌNH 9 — /users (Danh sách người dùng)

**Mục đích:** Quản lý tài khoản người dùng.

### Checklist

#### Toolbar
- [ ] Tiêu đề "Quản lý Người dùng"
- [ ] Nút [Xuất CSV] → toast "Đang xuất..." (UI only)
- [ ] Thanh tìm kiếm debounce 300ms (tên + email + SĐT)
- [ ] Tabs trạng thái: Tất cả | Hoạt động | Đã khóa (badge số)
- [ ] Dropdown vai trò: Tất cả | Người dùng | Chủ trạm
- [ ] DateRangePicker: Khoảng ngày đăng ký

#### Bảng dữ liệu
- [ ] Cột: # | Họ tên | Email | SĐT | Số dư ví | Tổng phiên | Tổng kWh | Ngày tham gia | Trạng thái | Thao tác
- [ ] "Số dư ví": đỏ nếu < 50.000 ₫
- [ ] "Trạng thái": StatusBadge (active xanh / suspended đỏ)
- [ ] "Thao tác":
  - [ ] Nút [Chi tiết] → /users/[id]
  - [ ] Nút [Khóa] hoặc [Mở khóa] → **ConfirmDialog** trước khi thực hiện
- [ ] Checkbox chọn nhiều + thanh bulk action: [Xuất danh sách] | [Khóa hàng loạt]
- [ ] Phân trang 10/trang, URL param ?page=N

---

## MÀN HÌNH 10 — /users/[id] (Chi tiết người dùng)

**Mục đích:** Xem hồ sơ và lịch sử của một người dùng.

### Checklist

#### Header
- [ ] Nút [← Quay lại] → /users
- [ ] Tên người dùng + StatusBadge
- [ ] Nút [Khóa tài khoản] → **ConfirmDialog** destructive

#### Section 1 — Hồ sơ (ngang)
- [ ] Avatar: vòng tròn lớn, chữ cái đầu tên, màu từ hash tên
- [ ] Tên | Email | SĐT | Badge vai trò | Ngày tham gia | Lần đăng nhập cuối
- [ ] StatusBadge nổi bật

#### Section 2 — Thống kê (4 thẻ mini KPI)
- [ ] Tổng chi tiêu | Tổng kWh | Số phiên | Thời gian TB/phiên

#### Section 3 — Ví
- [ ] Số dư hiện tại (lớn, xanh nếu > 0, đỏ nếu âm)
- [ ] Nút [+ Điều chỉnh số dư] → **mở WalletAdjustModal**
  - [ ] Input số tiền (dương = cộng, âm = trừ)
  - [ ] Textarea lý do (bắt buộc nếu trừ tiền)
  - [ ] Validate: lý do tối thiểu 10 ký tự khi trừ
  - [ ] Submit → toast thành công + cập nhật số dư

#### Section 4 — Lịch sử giao dịch
- [ ] Bảng: Ngày | Trạm | Bộ sạc | kWh | Thời lượng | Số tiền | Trạng thái
- [ ] "Số tiền": định dạng VND
- [ ] "Trạng thái": badge màu (completed xanh / failed đỏ / pending vàng)
- [ ] Click hàng → mở rộng chi tiết inline (không sang trang mới)
- [ ] Phân trang 10/trang, URL param ?txPage=N

---

## MÀN HÌNH 11 — /alerts (Cảnh báo)

**Mục đích:** Theo dõi và xử lý cảnh báo hệ thống.

### Checklist

#### Header tóm tắt
- [ ] Hiển thị: 🔴 N Critical | 🟡 N Warning | 🔵 N Info | ✅ N Đã xử lý

#### Filter toolbar (sticky)
- [ ] Pills mức độ: Tất cả | Critical | Warning | Info (badge số)
- [ ] Dropdown loại: Tất cả | Lỗi bộ sạc | Thanh toán | Trạm ngoại tuyến | Tải cao
- [ ] Toggle: Chưa xử lý | Tất cả
- [ ] Ô tìm kiếm: theo nội dung thông điệp hoặc mã thiết bị
- [ ] URL state: ?severity=&type=&resolved=&q=

#### Danh sách cảnh báo
- [ ] Mỗi hàng dạng thẻ + viền trái màu theo mức độ
- [ ] Nội dung: icon mức độ + badge loại + thông điệp + link mã thiết bị + tên trạm + thời gian
- [ ] Hàng critical: nền đỏ-50/30
- [ ] Hàng đã xử lý: opacity-60
- [ ] Nút [Đánh dấu đã xử lý]:
  - [ ] Nếu critical → **ConfirmDialog** trước khi xử lý
  - [ ] Sau xử lý → cập nhật UI ngay (optimistic)
- [ ] Bulk action: checkbox + nút [Đánh dấu tất cả đã xử lý]

---

## MÀN HÌNH 12 — /audit-log (Nhật ký hoạt động)

**Mục đích:** Tra cứu lịch sử hành động của admin.

### Checklist
- [ ] Tiêu đề "Nhật ký hoạt động Admin"
- [ ] Filter: DateRangePicker | Loại hành động | Admin user
- [ ] Bảng (chỉ đọc, không có nút thao tác):
  - [ ] Cột: Thời gian | Admin | Hành động | Đối tượng | IP | Chi tiết
  - [ ] "Hành động": badge màu (create/xanh, update/xanh dương, delete/đỏ, login/xám)
  - [ ] "Chi tiết": nút mở rộng → hiện JSON diff (before/after) dạng code block
- [ ] Phân trang 20/trang

---

## MÀN HÌNH 13 — /notifications

**Mục đích:** Quản lý thông báo hệ thống.

### Checklist
- [ ] Tabs: Tất cả | Chưa đọc | Hệ thống | Cảnh báo
- [ ] Nút [Đánh dấu tất cả đã đọc] (chỉ hiện khi có thông báo chưa đọc)
- [ ] Nhóm theo ngày: Hôm nay | Hôm qua | Tuần trước
- [ ] Mỗi item: icon theo loại + tiêu đề + mô tả + thời gian + chấm chưa đọc
- [ ] Click item → đánh dấu đã đọc + navigate đến link (nếu có)
- [ ] Trạng thái trống: icon + "Không có thông báo mới"

---

## MÀN HÌNH 14 — /profile

**Mục đích:** Quản lý hồ sơ cá nhân admin.

### Checklist
- [ ] Form thông tin (react-hook-form + zod):
  - [ ] Placeholder upload avatar (UI only)
  - [ ] Tên (required) | Email (readonly) | SĐT
  - [ ] Validate SĐT định dạng Việt Nam
  - [ ] Nút [Lưu] disabled khi form chưa thay đổi
  - [ ] Submit → toast thành công
- [ ] Section đổi mật khẩu:
  - [ ] Mật khẩu hiện tại | Mật khẩu mới | Xác nhận mật khẩu
  - [ ] Validate: mật khẩu mới ≥ 8 ký tự, confirm phải khớp
  - [ ] Nút [Đổi mật khẩu] → toast thành công
- [ ] Toggle 2FA + placeholder QR code

---

## MÀN HÌNH 15 — /settings

**Mục đích:** Cấu hình hệ thống.

### Checklist

#### Tab 1 — Giá cước
- [ ] Input: Giá điện/kWh (₫) | Phí đỗ xe/giờ (₫) | Phí khởi động phiên (₫)
- [ ] Slider hệ số giờ cao điểm: 1.0x – 2.0x
- [ ] Select thuế VAT: 0% / 5% / 8% / 10%
- [ ] Preview live: "Ước tính phiên 1h/10kWh = X ₫" (tính tự động khi nhập)
- [ ] Nút [Lưu] → **ConfirmDialog** xác nhận → toast thành công

#### Tab 2 — Chia sẻ doanh thu
- [ ] Slider % global (0–100% cho chủ trạm), tự động hiện % platform
- [ ] Bảng override per-trạm: Tên trạm | % Mặc định | % Override (input) | [Đặt lại]
- [ ] Nút [Lưu tất cả] áp dụng cả global + per-trạm

#### Tab 3 — API
- [ ] API Key: ẩn (chỉ hiện 4 ký tự cuối) + nút [Hiện/Ẩn] + nút [Tạo lại] → **ConfirmDialog**
- [ ] Input Webhook URL + nút [Test webhook] → toast kết quả
- [ ] Select rate limit: 60 / 120 / 300 req/phút
- [ ] Textarea IP được phép
- [ ] Link "Xem tài liệu API" (placeholder)

#### Tab 4 — Bảo mật
- [ ] Tag input IP Whitelist: gõ IP + Enter để thêm, click ✕ để xóa
- [ ] Select session timeout: 30p / 1h / 4h / 8h
- [ ] Toggle bắt buộc 2FA cho tất cả admin
- [ ] Bảng lịch sử đăng nhập (5 dòng gần nhất):
  - [ ] Cột: Thời gian | IP | Thiết bị | Địa điểm | Kết quả
  - [ ] Hàng đăng nhập thất bại: nền đỏ nhạt

---

## TRẠNG THÁI CHUNG (áp dụng cho mọi màn hình)

- [ ] Loading: skeleton animate-pulse (không để trắng)
- [ ] Trống: icon + tiêu đề + mô tả
- [ ] Lỗi: icon + thông điệp + nút [Thử lại]
- [ ] Mọi form: validate khi blur, thông báo lỗi inline dưới field
- [ ] Mọi nút hành động nguy hiểm: ConfirmDialog trước khi thực hiện
- [ ] Responsive: desktop (≥1024px) / tablet (768–1023px) / mobile (<768px)
- [ ] Dark mode: dùng Tailwind dark: prefix
- [ ] i18n: không hardcode string, dùng t('key')
