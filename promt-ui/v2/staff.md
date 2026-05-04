# STAFF — Đặc tả màn hình & Checklist triển khai

## Định hướng nền tảng
STAFF là web-first responsive application cho nhân viên vận hành tại bãi đỗ:
- Thiết bị chính: máy tính bàn/laptop tại quầy lễ tân
- Thiết bị phụ: máy tính bảng khi đi tuần
- **Không phải mobile-only** — dùng sidebar trái + header trên như Admin
- Ưu tiên: tốc độ (≤ 2 click), dễ nhìn từ xa, mật độ thông tin cao

## Tech Stack
- Next.js 14 App Router, TypeScript strict
- Tailwind CSS v3 + shadcn/ui
- Màu chủ đạo: violet-600 (#7C3AED) — --color-staff-accent
- State: URL params (nuqs) + Zustand cho action queue
- Default theme: light, auto-switch sang dark lúc 20:00–06:00

## Routes
```
/app/(staff)/
  layout.tsx
  home/page.tsx              ← Màn hình chính: lưới slot
  slots/[id]/page.tsx        ← Chi tiết slot (deep link)
  sessions/page.tsx
  sessions/[id]/page.tsx
  sessions/new/page.tsx      ← Wizard tạo phiên thủ công
  customers/page.tsx
  customers/[id]/page.tsx
  tasks/page.tsx
  tasks/[id]/page.tsx
  report/page.tsx
  report/history/page.tsx
  shift/page.tsx
  shift/handover/page.tsx
  emergency/page.tsx
  notifications/page.tsx
  me/page.tsx
```

## Mock context
```ts
currentStaffId: "STF-001"
name: "Nguyễn Văn An"
role: "operator"
assignedParkingId: "ST001"
assignedParkingName: "Trạm Quận 1 - Vincom"
currentShift: { type: "morning", start: "06:00", end: "14:00" }
isClockedIn: boolean
```

---

## LAYOUT — StaffLayout

### Sidebar trái
- [ ] Chiều rộng 240px (mở) / 64px (thu gọn), lưu localStorage
- [ ] Logo + pill "STAFF" (violet)
- [ ] Nhóm nav:
  - Vận hành: Trang chủ | Phiên sạc | Khách hàng | Quét QR
  - Công việc: Việc cần làm | Báo cáo sự cố
  - Ca làm việc: Ca của tôi | Bàn giao
  - Khẩn cấp: Emergency (icon đỏ)
  - Cá nhân: Thông báo | Tài khoản
- [ ] Active item: nền violet-600/10, chữ violet-500, viền phải violet-500
- [ ] Tooltip khi thu gọn
- [ ] Responsive < 768px: sidebar là Sheet overlay (không phải bottom nav)

### Header trên (sticky, cao 56px)
- [ ] Bên trái: hamburger (mobile) + tiêu đề trang
- [ ] Giữa: ô tìm kiếm global (Cmd+K)
- [ ] Bên phải:
  - [ ] **ShiftStatusPill**: "Ca sáng • Còn 02:34" (đếm ngược)
    - Xanh = trong ca | Vàng = còn < 30 phút | Xám = ngoài ca
    - Click → /shift
  - [ ] Nút [+ Phiên mới] (Cmd+N)
  - [ ] Chuông thông báo + badge số chưa đọc
  - [ ] Toggle dark/light
  - [ ] Chuyển ngôn ngữ [VI/EN]
  - [ ] Avatar dropdown: Hồ sơ / Bàn giao / Đăng xuất

### Phím tắt toàn cục
- [ ] Cmd+K: mở global search
- [ ] Cmd+N: tạo phiên mới → /sessions/new
- [ ] Cmd+R: làm mới lưới slot
- [ ] Cmd+/: mở dialog phím tắt
- [ ] G→H: /home | G→S: /sessions | G→T: /tasks
- [ ] Dialog phím tắt: danh sách nhóm theo chức năng, có tìm kiếm

---

## MÀN HÌNH 1 — /home (Màn hình chính)

**Mục đích:** Giám sát toàn bộ bãi đỗ theo thời gian thực.

### Checklist

#### Banner chấm công (chỉ hiện khi chưa chấm công)
- [ ] Banner vàng đầu trang: "Bạn chưa chấm công vào ca → [Chấm công ngay]"
- [ ] Click nút → navigate /shift

#### Dải KPI (4 thẻ, toàn chiều rộng)
- [ ] **Đang sạc (N)**: click → lọc lưới chỉ hiện slot đang sạc
- [ ] **Còn trống (N)**: click → lọc slot sẵn sàng
- [ ] **Đang đặt (N)**: click → lọc slot đã đặt trước
- [ ] **Có lỗi (N)**: click → lọc slot lỗi (màu đỏ nổi bật)
- [ ] Cập nhật mỗi 10s

#### Lưới slot (2/3 chiều rộng màn hình)
- [ ] Toolbar lọc: Tabs khu vực (A | B | C | Tất cả) + pills trạng thái + nút [⟳ Làm mới] (Cmd+R)
- [ ] Lưới: 6 cột desktop / 4 cột tablet / 3 cột mobile
- [ ] Mỗi ô SlotCell (80×80px):
  - [ ] Nền màu cao tương phản theo trạng thái:
    - Sẵn sàng: nền emerald-500, chữ trắng
    - Đã đặt: nền sky-500
    - Đang sạc: nền amber-500 + animate-pulse
    - Lỗi: nền red-500 + viền đậm
    - Có xe (không sạc): nền slate-500
  - [ ] Số slot (text-2xl bold, đọc được từ xa)
  - [ ] Icon ⚡ nếu có bộ sạc
  - [ ] Biển số xe nhỏ nếu có xe
  - [ ] Click → mở **SlotDetailDrawer** (drawer phải, rộng 480px)
  - [ ] Chuột phải → context menu: Đánh dấu lỗi | Giải phóng | Đặt trước | Mở chi tiết
  - [ ] Điều hướng bằng phím mũi tên, Enter để mở
  - [ ] aria-live thông báo khi trạng thái thay đổi
- [ ] Cập nhật mỗi 10s (mock WebSocket)

#### SlotDetailDrawer (drawer phải)
- [ ] Thông tin slot + thông tin bộ sạc
- [ ] Nếu đang sạc: tên khách + biển số + kWh + thời gian + chi phí (live)
- [ ] Nút hành động (toàn chiều rộng drawer):
  - [ ] [Bắt đầu sạc] (nếu sẵn sàng) → mở NewSessionWizard
  - [ ] [Dừng sạc] (nếu đang sạc) → **ConfirmDialog**
  - [ ] [Báo lỗi] → navigate /report?slot=X
  - [ ] [Giải phóng slot] → input lý do + **ConfirmDialog**
- [ ] Tab "Lịch sử": 10 phiên gần nhất tại slot này

#### Panel bên phải (1/3 chiều rộng)
- [ ] **Phiên sạc live** (tối đa 5): đồng hồ đếm ngược + link → /sessions/[id]
- [ ] **Feed hoạt động gần đây** (10 sự kiện)
- [ ] **Việc cần làm hôm nay** (urgent + high priority)
- [ ] Mỗi mục có link [Xem tất cả →]

#### Toolbar hành động nhanh (không phải FAB, ở trên cùng vùng nội dung)
- [ ] [+ Phiên mới] Cmd+N
- [ ] [Quét QR]
- [ ] [Báo lỗi]
- [ ] [Khẩn cấp] (đỏ)

---

## MÀN HÌNH 2 — /slots/[id] (Chi tiết slot — deep link)

**Mục đích:** Xem chi tiết đầy đủ khi vào qua URL trực tiếp.

### Checklist
- [ ] Header: [← Quay lại] + Tên slot + StatusBadge
- [ ] Layout 3 cột desktop:
  - **Trái**: Thẻ trạng thái lớn + thông tin bộ sạc + bảng phiên gần nhất
  - **Giữa**: Panel hành động nhanh (bắt đầu/dừng/giải phóng/báo lỗi) + ghi chú override thủ công
  - **Phải**: Lịch sử bảo trì + sự kiện được gắn cờ
- [ ] Menu [⋯] trong header: dropdown tất cả hành động nguy hiểm

---

## MÀN HÌNH 3 — /sessions (Danh sách phiên sạc)

**Mục đích:** Theo dõi phiên sạc theo ca.

### Checklist

#### Header
- [ ] Tabs: Đang chạy | Hôm nay | Lịch sử (7 ngày gần nhất)
- [ ] Nút [+ Phiên mới] góc phải

#### Bảng dữ liệu (web table, không phải card list)
- [ ] Cột: Mã phiên | Slot | Khách | Xe | Bộ sạc | Bắt đầu | Thời lượng | kWh | Trạng thái | Thao tác
- [ ] Nút inline: [Dừng] (chỉ khi đang chạy) + [Chi tiết]
- [ ] Chuột phải hàng → context menu
- [ ] Checkbox chọn nhiều + bulk action bar
- [ ] Header sticky, phân trang 25/trang (web có không gian nhiều hơn mobile)

#### Filter bar trên bảng
- [ ] Select slot | Tìm kiếm khách | Pills trạng thái | DateRangePicker
- [ ] URL state: ?slot=&customer=&status=&from=&to=&page=

---

## MÀN HÌNH 4 — /sessions/[id] (Chi tiết phiên sạc)

**Mục đích:** Xem và can thiệp vào phiên sạc đang chạy.

### Checklist

#### Header
- [ ] [← Quay lại] + Mã phiên + StatusBadge + menu hành động [⋯]

#### Layout 3 cột desktop
- [ ] **Thẻ trái — Khách hàng**: tên, SĐT (link tel:), email (link mailto:), biển số, lịch sử tại bãi này
- [ ] **Thẻ giữa — Dữ liệu phiên live**:
  - [ ] Hiển thị SOC lớn
  - [ ] kWh đã sạc + thời lượng + chi phí
  - [ ] Biểu đồ đường sạc (Recharts)
  - [ ] Tự động làm mới mỗi 5s
- [ ] **Thẻ phải — Bộ sạc + Slot + Phương thức thanh toán + Voucher**

#### Thanh hành động sticky dưới cùng
- [ ] [Dừng phiên] (nút đỏ, destructive confirm dialog — không phải hold-to-confirm)
- [ ] [Gia hạn]
- [ ] [In hóa đơn]
- [ ] [Báo cáo sự cố]

---

## MÀN HÌNH 5 — /sessions/new (Tạo phiên thủ công)

**Mục đích:** Nhân viên tạo phiên sạc cho khách walk-in.

### Checklist

#### Stepper ngang (4 bước)
- [ ] Hiển thị: 1 Slot → 2 Khách → 3 Thanh toán → 4 Xác nhận
- [ ] Bước hiện tại nổi bật, bước đã xong có tick ✓
- [ ] Điều hướng bàn phím: Tab tiến, Esc hủy

#### Bước 1 — Chọn Slot
- [ ] Mini lưới slot (có thể click)
- [ ] Hoặc input mã bộ sạc có autocomplete
- [ ] Hoặc nút [Quét QR trên bộ sạc] → /scan

#### Bước 2 — Khách hàng
- [ ] Tabs: [Khách có app] | [Khách walk-in]
- [ ] **Khách có app**: tìm kiếm theo SĐT/email/QR → load hồ sơ
- [ ] **Khách walk-in**: form (biển số xe BẮT BUỘC, tên tùy chọn, SĐT tùy chọn)
- [ ] Danh sách khách gần đây để chọn nhanh

#### Bước 3 — Thanh toán
- [ ] Nếu khách có app + ví: hiện số dư, tùy chọn [Trừ ví]
- [ ] Walk-in: radio thanh toán (Tiền mặt | Chuyển QR | Nạp ví)
- [ ] Preview chi phí ước tính (tính live)
- [ ] Input mã voucher

#### Bước 4 — Xác nhận
- [ ] Tóm tắt: slot + bộ sạc + khách + thanh toán
- [ ] Nút [Bắt đầu phiên] (primary, lớn)
- [ ] Thành công → trang thành công + redirect /sessions/[id]

#### Xử lý mất mạng
- [ ] Action queued + toast "Sẽ đồng bộ khi có mạng"
- [ ] Badge số pending trong header

---

## MÀN HÌNH 6 — /customers (Tra cứu khách hàng)

**Mục đích:** Tìm kiếm và hỗ trợ khách hàng.

### Checklist
- [ ] Tiêu đề "Tra cứu khách hàng" + nút [+ Khách walk-in]
- [ ] Thanh tìm kiếm: auto-focus khi vào trang, phím "/" từ bất kỳ đâu để focus
- [ ] Tìm kiếm theo: SĐT, email, biển số xe, tên — debounce 300ms
- [ ] **Bảng kết quả tìm kiếm** (web table):
  - [ ] Cột: Avatar+Tên | Email | SĐT | Biển số | Số dư ví | Lần ghé gần nhất | Thao tác
  - [ ] Nút [Bắt đầu phiên] inline mỗi hàng
  - [ ] Click hàng → /customers/[id]
- [ ] Khi search trống: hiện **10 lượt tra cứu gần nhất** (sessionStorage) dạng thẻ

---

## MÀN HÌNH 7 — /customers/[id] (Hồ sơ khách hàng)

**Mục đích:** Xem thông tin và hỗ trợ khách.

### Checklist

#### Header
- [ ] [← Quay lại] + Avatar + Tên + badge xác minh + menu [⋯]

#### Layout 3 cột
- [ ] **Thẻ trái — Liên hệ**: SĐT (tel:), email (mailto:), địa chỉ, ghi chú
- [ ] **Thẻ giữa — Ví**: số dư lớn + nút [+ Nạp tiền]
  - [ ] Nút [+ Nạp tiền] → **TopupDialog** (modal, không phải bottom sheet):
    - [ ] Chips preset: 50k / 100k / 200k / 500k / Tùy chỉnh
    - [ ] Radio phương thức: Tiền mặt | Chuyển QR
    - [ ] Nút [Xác nhận nạp]
    - [ ] Thành công: cập nhật số dư optimistic + view hóa đơn có thể in
- [ ] **Thẻ phải — Thống kê nhanh**: tổng phiên, tổng chi tại bãi này, lần ghé cuối

#### Bảng phiên gần nhất tại bãi này
- [ ] 10 dòng + phân trang
- [ ] Nút [Bắt đầu phiên cho khách] → /sessions/new?customer=X

---

## MÀN HÌNH 8 — /tasks (Việc cần làm)

**Mục đích:** Quản lý công việc trong ca.

### Checklist

#### Header
- [ ] Tiêu đề "Việc cần làm" + đếm: N đang chờ / N đang làm / N xong hôm nay
- [ ] Tabs: Của tôi | Chung (cả bãi) | Hoàn tất

#### Layout 2 cột desktop
- [ ] **Cột trái (2/3) — Danh sách task** nhóm theo priority: Khẩn → Cao → TB → Thấp
  - [ ] Mỗi thẻ TaskItem:
    - [ ] Icon loại + tiêu đề (lớn)
    - [ ] Badge priority + thời hạn + avatar người được giao
    - [ ] Đoạn mô tả ngắn
    - [ ] Nút inline: [Nhận] (nếu chưa giao) | [Bắt đầu] | [Hoàn tất]
    - [ ] Click thẻ → /tasks/[id]
- [ ] **Cột phải (1/3) — Bộ lọc + Thống kê**:
  - [ ] Filter: loại, priority, người được giao
  - [ ] Biểu đồ donut nhỏ: tiến độ hôm nay

---

## MÀN HÌNH 9 — /tasks/[id] (Chi tiết công việc)

**Mục đích:** Xem và thực hiện công việc.

### Checklist

#### Header
- [ ] [← Quay lại] + Tiêu đề + badge priority + badge trạng thái

#### Layout 2 cột
- [ ] **Trái (2/3)**:
  - [ ] Mô tả (render markdown)
  - [ ] **Checklist** (nếu có): ChecklistView với thanh tiến trình
    - [ ] Mỗi item: checkbox lớn + nhãn + slot ảnh minh chứng
    - [ ] Checkbox click → cập nhật optimistic
  - [ ] Timeline lịch sử hành động (thay đổi trạng thái, bình luận)
- [ ] **Phải (1/3)**:
  - [ ] Metadata: thời hạn, người giao, bãi đỗ, link liên quan
  - [ ] Panel hành động:
    - [ ] [Bắt đầu] → trạng thái: đang làm
    - [ ] [Hoàn tất] → ConfirmDialog + tùy chọn ảnh minh chứng
    - [ ] [Tạm hoãn] → input lý do
    - [ ] [Chuyển nhân viên] (nếu được phép)

---

## MÀN HÌNH 10 — /report (Báo cáo sự cố)

**Mục đích:** Ghi nhận sự cố tại bãi đỗ.

### Checklist

#### Header
- [ ] Tiêu đề "Báo cáo sự cố" + link [Xem báo cáo của tôi →] → /report/history

#### Form 2 cột desktop (stack mobile)

**Cột trái:**
- [ ] **Loại sự cố**: chip select (Lỗi sạc | Đỗ sai | Thanh toán | Cơ sở vật chất | Phàn nàn khách | Khác)
- [ ] **Mức độ**: segmented control (Thấp | TB | Cao | Khẩn) — màu khớp severity
- [ ] **Thiết bị/Slot liên quan**: select dropdown (auto-fill từ ?slot= param)
- [ ] **Mô tả**: textarea, tối thiểu 10 ký tự, có đếm ký tự, chiều rộng lớn

**Cột phải:**
- [ ] **Ảnh đính kèm** (PhotoUploadField):
  - [ ] Kéo thả vào vùng drop zone + nút [Chọn file]
  - [ ] Hỗ trợ nhiều file, thumbnail preview với nút xóa
  - [ ] Tối đa 5 ảnh, chấp nhận image/*
- [ ] **Vị trí**: auto-fill từ GPS (mock) hoặc nhập thủ công
- [ ] **Ghi chú nội bộ** (tùy chọn): textarea

#### Nút submit
- [ ] [Gửi báo cáo] sticky dưới form
- [ ] Submit → optimistic queue + animation thành công + redirect /report/history

---

## MÀN HÌNH 11 — /report/history (Lịch sử báo cáo)

**Mục đích:** Xem báo cáo đã gửi.

### Checklist
- [ ] Tabs: Tất cả | Chưa xử lý | Đã xử lý
- [ ] **Bảng dữ liệu** (web table, không phải card):
  - [ ] Cột: Mã | Loại | Mức độ | Mô tả | Ngày tạo | Cập nhật | Trạng thái | Thao tác
  - [ ] Click hàng → mở rộng inline: ảnh + kết quả xử lý + bình luận
- [ ] Filter: severity, loại, trạng thái, date range

---

## MÀN HÌNH 12 — /shift (Ca làm việc)

**Mục đích:** Quản lý ca làm việc và chấm công.

### Checklist

#### Thẻ trạng thái ca (lớn, đầu trang)
- [ ] "Ca sáng" + ngày + giờ bắt đầu–kết thúc
- [ ] Đồng hồ đếm ngược đến hết ca (lớn)
- [ ] Trạng thái: CHƯA BẮT ĐẦU | ĐANG CHẠY | TĂNG CA | ĐÃ KẾT THÚC
- [ ] **ClockInOutCard**:
  - [ ] Nút lớn 48px: "Chấm công vào ca" (xanh) hoặc "Chấm công kết thúc" (đỏ, confirm)
  - [ ] Disabled nếu ngoài giờ ca + tooltip giải thích

#### Dashboard 3 cột bên dưới
- [ ] **Thẻ 1 — Tóm tắt ca này**: Phiên đã xử lý | Sự cố đã báo | Việc hoàn tất | Khách đã giúp
- [ ] **Thẻ 2 — Đồng nghiệp ca này** (ShiftMatesList): avatar + vai trò + giờ chấm công + chấm online
- [ ] **Thẻ 3 — Ca sắp tới** (5 ca): chỉ đọc

- [ ] Nút [Bàn giao ca] → /shift/handover

---

## MÀN HÌNH 13 — /shift/handover (Bàn giao ca)

**Mục đích:** Ghi chú bàn giao cho ca tiếp theo.

### Checklist

#### Layout 2 cột

**Trái — Soạn thảo:**
- [ ] **HandoverEditor**: markdown editor với toolbar (Đậm/Nghiêng/Danh sách/Link)
- [ ] Chiều cao 60vh
- [ ] Gửi đến: nhân viên ca tiếp theo (auto-detect) hoặc "Ca tiếp theo"
- [ ] [Lưu nháp] | [Gửi bàn giao] (primary, căn phải)

**Phải — Bối cảnh:**
- [ ] **Panel vấn đề cần lưu ý**:
  - [ ] Nút [+ Thêm vấn đề] → modal: select loại + mô tả
  - [ ] Mỗi item: thẻ với nút [✕] xóa
- [ ] Khu vực đính kèm ảnh: kéo thả
- [ ] Bàn giao ca trước (chỉ đọc, có thể thu gọn)

- [ ] Nút [Gửi bàn giao] → **ConfirmDialog**: "Gửi bàn giao cho [Tên ca tiếp]?"

---

## MÀN HÌNH 14 — /emergency (Khẩn cấp)

**Mục đích:** Xử lý tình huống khẩn cấp tại bãi.

### Checklist
- [ ] Banner cảnh báo đỏ đầu trang: "Mọi hành động được ghi log"
- [ ] **KHÔNG phải full-screen takeover** — dùng confirm dialog thông thường (web style)

#### EmergencyActionsPanel (thẻ hành động lớn)

**Thẻ 1 — Dừng tất cả phiên sạc:**
- [ ] Mô tả + số phiên sẽ bị dừng
- [ ] Nút [Dừng tất cả] đỏ → **multi-step confirm dialog**:
  - [ ] Bước 1: gõ xác nhận "Tôi xác nhận"
  - [ ] Bước 2: select lý do + ghi chú tùy chọn
  - [ ] Bước 3: xác nhận cuối cùng
- [ ] Hành động: dừng tất cả phiên tại bãi, gửi cảnh báo đến admin

**Thẻ 2 — Báo cháy:**
- [ ] [Tạo báo cáo cháy] → form báo cáo pre-filled

**Thẻ 3 — Số điện thoại khẩn cấp:**
- [ ] Danh sách: 115, 114, 113, SĐT chủ bãi — nút [Gọi] (link tel:)

**Thẻ 4 — Sơ tán bãi đỗ:**
- [ ] Checklist thủ tục + đồng hồ tính giờ

#### Log sự kiện khẩn cấp gần nhất (5 dòng cuối)
- [ ] Cột: Thời gian | Người thực hiện | Hành động | Phiên bị ảnh hưởng

---

## MÀN HÌNH 15 — /notifications

**Mục đích:** Xem thông báo của nhân viên.

### Checklist
- [ ] Tiêu đề + nút [Đánh dấu tất cả đã đọc]
- [ ] Tabs: Tất cả | Chưa đọc | Cảnh báo | Tin nhắn
- [ ] Nhóm theo ngày: Hôm nay / Hôm qua / Cũ hơn
- [ ] Mỗi hàng (inline button, không phải swipe):
  - [ ] Icon priority + tiêu đề + đoạn nội dung + thời gian + chấm chưa đọc
  - [ ] Nút inline: [✓ Đã đọc] + [✕ Xóa]
  - [ ] Click hàng → navigate đến link nếu có

---

## MÀN HÌNH 16 — /me (Tài khoản nhân viên)

**Mục đích:** Hồ sơ cá nhân và tùy chọn.

### Checklist

#### Layout 3 cột

- [ ] **Thẻ trái — Hồ sơ**: Avatar (có upload), tên, vai trò, bãi đỗ, ngày vào làm, badge xác minh
- [ ] **Thẻ giữa — Hiệu suất tháng này**: Phiên xử lý | Sự cố giải quyết | Khách hỗ trợ | Rating TB
  - [ ] Biểu đồ mini: phiên theo ngày 14 ngày gần nhất
- [ ] **Thẻ phải — Hành động nhanh**:
  - [ ] [Đổi mật khẩu] → modal
  - [ ] [Bật 2FA] → setup flow
  - [ ] [Lịch sử đăng nhập] → expandable list
  - [ ] [Đăng xuất] (đỏ, có confirm)

#### Section Tùy chỉnh (toàn chiều rộng)
- [ ] Ngôn ngữ: VI / EN
- [ ] Giao diện: Sáng / Tối / Tự động (theo giờ ca đêm 20:00–06:00)
- [ ] Thông báo: toggles email + push
- [ ] Link: Đồng bộ ngoại tuyến | Trợ giúp | Phím tắt

---

## TRẠNG THÁI CHUNG (áp dụng cho mọi màn hình)

- [ ] Loading: skeleton animate-pulse
- [ ] Trống: EmptyState icon + thông điệp hữu ích + CTA
- [ ] Lỗi: ErrorState + nút [Thử lại]
- [ ] Hover: thay đổi màu nền (không lift trên ô slot)
- [ ] Focus-visible ring trên mọi element tương tác
- [ ] Toast: vị trí góc phải trên (web standard), Sonner, tiếng Việt mặc định
- [ ] Dark mode: tự động lúc 20:00–06:00, toggle thủ công tại /me
- [ ] Responsive: desktop 1440px / tablet 1024px / mobile 768px (sidebar thành Sheet)
- [ ] Mọi nút icon-only: có aria-label
- [ ] Form: validate khi blur, lỗi inline, disabled khi chưa hợp lệ + dirty
- [ ] Mọi hành động nguy hiểm: ConfirmDialog (không phải hold-to-confirm)
- [ ] i18n: tất cả text qua t('key'), namespace "staff.*"
