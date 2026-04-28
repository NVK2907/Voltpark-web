export default function CookiesPage() {
  return (
    <div className="flex w-full flex-col bg-white pb-24 dark:bg-slate-950">
      <section className="mx-auto w-full max-w-4xl px-4 pb-12 pt-24">
        <h1 className="mb-6 text-4xl font-black md:text-5xl">Chính sách Cookies</h1>
        <p className="mb-12 text-slate-500">Cập nhật lần cuối: 15/10/2023</p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            Trang web này sử dụng cookies để mang đến cho bạn trải nghiệm duyệt web tốt nhất. Dưới
            đây là thông tin chi tiết về cách chúng tôi sử dụng cookies.
          </p>

          <h3>1. Cookies là gì?</h3>
          <p>
            Cookies là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn (máy tính, điện thoại
            thông minh) khi bạn truy cập một trang web. Chúng giúp trang web ghi nhớ thông tin về
            phiên truy cập của bạn (ví dụ: ngôn ngữ ưu tiên, trạng thái đăng nhập) để tiện lợi hơn
            cho lần truy cập tiếp theo.
          </p>

          <h3>2. Các loại cookies chúng tôi sử dụng</h3>
          <ul>
            <li>
              <strong>Cookies thiết yếu:</strong> Cần thiết để trang web hoạt động bình thường (ví
              dụ: xác thực đăng nhập, bảo mật). Không thể vô hiệu hóa loại cookies này.
            </li>
            <li>
              <strong>Cookies hiệu suất:</strong> Giúp chúng tôi thu thập thông tin ẩn danh về cách
              người dùng tương tác với website (thông qua Google Analytics), từ đó cải thiện cấu
              trúc và nội dung trang.
            </li>
            <li>
              <strong>Cookies chức năng:</strong> Ghi nhớ các tùy chọn của bạn (như ngôn ngữ, giao
              diện sáng/tối) để cá nhân hóa trải nghiệm.
            </li>
          </ul>

          <h3>3. Quản lý cookies</h3>
          <p>
            Bạn có thể quản lý hoặc xóa cookies theo ý muốn trong cài đặt trình duyệt của mình. Tuy
            nhiên, nếu bạn vô hiệu hóa cookies thiết yếu, một số chức năng của website/ứng dụng
            EVCharge có thể không hoạt động bình thường.
          </p>
        </div>
      </section>
    </div>
  );
}
