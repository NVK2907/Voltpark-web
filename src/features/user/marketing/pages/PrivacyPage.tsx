export default function PrivacyPage() {
  return (
    <div className="flex w-full flex-col bg-white pb-24 dark:bg-slate-950">
      <section className="mx-auto w-full max-w-4xl px-4 pb-12 pt-24">
        <h1 className="mb-6 text-4xl font-black md:text-5xl">Chính sách bảo mật</h1>
        <p className="mb-12 text-slate-500">Cập nhật lần cuối: 15/10/2023</p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            Bảo mật thông tin của bạn là ưu tiên hàng đầu của EVCharge. Chính sách này giải thích
            cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu cá nhân của bạn.
          </p>

          <h3>1. Dữ liệu chúng tôi thu thập</h3>
          <ul>
            <li>
              <strong>Thông tin cá nhân:</strong> Họ tên, số điện thoại, email, địa chỉ.
            </li>
            <li>
              <strong>Thông tin phương tiện:</strong> Biển số xe, hãng xe, dòng xe điện (để tối ưu
              gợi ý trạm sạc).
            </li>
            <li>
              <strong>Dữ liệu vị trí:</strong> Tọa độ GPS khi bạn sử dụng tính năng tìm trạm sạc gần
              nhất.
            </li>
            <li>
              <strong>Thông tin giao dịch:</strong> Lịch sử sạc, số dư ví, phương thức thanh toán
              (được mã hóa).
            </li>
          </ul>

          <h3>2. Mục đích sử dụng dữ liệu</h3>
          <p>Chúng tôi sử dụng dữ liệu của bạn nhằm:</p>
          <ul>
            <li>Cung cấp và duy trì dịch vụ sạc xe điện.</li>
            <li>Cải thiện và cá nhân hóa trải nghiệm người dùng trên ứng dụng.</li>
            <li>Hỗ trợ kỹ thuật và giải quyết khiếu nại.</li>
            <li>
              Gửi thông báo về phiên sạc, hóa đơn và các chương trình khuyến mãi (nếu bạn đồng ý).
            </li>
          </ul>

          <h3>3. Chia sẻ thông tin</h3>
          <p>
            Chúng tôi KHÔNG bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Dữ liệu chỉ
            được chia sẻ trong các trường hợp cần thiết để cung cấp dịch vụ (ví dụ: cổng thanh toán
            VNPay, Momo) hoặc khi có yêu cầu hợp pháp từ cơ quan chức năng.
          </p>

          <h3>4. Bảo mật dữ liệu</h3>
          <p>
            Tất cả thông tin nhạy cảm đều được mã hóa bằng giao thức SSL/TLS. Dữ liệu được lưu trữ
            trên các máy chủ bảo mật với cơ chế phòng chống tấn công hiện đại nhất.
          </p>
        </div>
      </section>
    </div>
  );
}
