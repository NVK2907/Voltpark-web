export default function TermsPage() {
  return (
    <div className="flex w-full flex-col bg-white pb-24 dark:bg-slate-950">
      <section className="mx-auto w-full max-w-4xl px-4 pb-12 pt-24">
        <h1 className="mb-6 text-4xl font-black md:text-5xl">Điều khoản sử dụng</h1>
        <p className="mb-12 text-slate-500">Cập nhật lần cuối: 15/10/2023</p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            Chào mừng bạn đến với EVCharge. Bằng việc truy cập và sử dụng dịch vụ của chúng tôi, bạn
            đồng ý tuân thủ các điều khoản dưới đây.
          </p>

          <h3>1. Chấp nhận điều khoản</h3>
          <p>
            Khi đăng ký tài khoản hoặc sử dụng ứng dụng, website của EVCharge, bạn xác nhận đã đọc,
            hiểu và đồng ý với tất cả các Điều khoản sử dụng này. Nếu không đồng ý, vui lòng ngừng
            sử dụng dịch vụ.
          </p>

          <h3>2. Tài khoản người dùng</h3>
          <p>
            Bạn có trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình. Bạn phải thông báo
            ngay cho chúng tôi nếu phát hiện bất kỳ truy cập trái phép nào. Chúng tôi không chịu
            trách nhiệm cho mọi tổn thất phát sinh do việc bạn không bảo vệ an toàn thông tin đăng
            nhập.
          </p>

          <h3>3. Thanh toán và phí dịch vụ</h3>
          <ul>
            <li>Giá sạc được hiển thị rõ ràng trên ứng dụng trước khi bạn bắt đầu phiên sạc.</li>
            <li>
              Các giao dịch thanh toán qua Ví EVCharge hoặc thẻ ngân hàng sẽ được xử lý tự động và
              xuất hóa đơn điện tử khi có yêu cầu.
            </li>
            <li>
              Trường hợp có phát sinh phí lưu bãi quá giờ, hệ thống sẽ tự động trừ vào tài khoản của
              bạn.
            </li>
          </ul>

          <h3>4. Giới hạn trách nhiệm</h3>
          <p>
            EVCharge nỗ lực đảm bảo hệ thống trạm sạc hoạt động ổn định 24/7. Tuy nhiên, chúng tôi
            không chịu trách nhiệm pháp lý cho các sự cố gián đoạn do nguyên nhân bất khả kháng
            (thiên tai, sự cố lưới điện quốc gia,...).
          </p>
        </div>
      </section>
    </div>
  );
}
