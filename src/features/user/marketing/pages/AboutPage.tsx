import { Target, Users, Zap, Shield, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col pb-24">
      {/* Hero */}
      <section className="bg-white px-4 pb-16 pt-24 text-center dark:bg-slate-950">
        <h1 className="mb-6 text-4xl font-black md:text-6xl">
          Thúc đẩy kỷ nguyên <br className="hidden sm:block" />
          <span className="text-violet-600">di chuyển xanh</span>
        </h1>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
          Chúng tôi xây dựng hạ tầng năng lượng số hóa, kết nối hàng triệu xe điện với hàng ngàn
          trạm sạc trên khắp Việt Nam. Giúp quá trình chuyển đổi xanh trở nên dễ dàng và thuận tiện
          hơn bao giờ hết.
        </p>
      </section>

      {/* Image Banner */}
      <section className="mx-auto mb-24 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1660636254703-a2cd1c78484a?q=80&w=2000&auto=format&fit=crop"
            alt="EV Charging Infrastructure"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/80 to-transparent p-8 md:p-12">
            <div className="text-white">
              <p className="max-w-2xl text-lg font-medium md:text-2xl">
                "Mục tiêu của chúng tôi là xóa bỏ nỗi lo cạn kiệt năng lượng trên mỗi cung đường của
                người dùng xe điện Việt Nam."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto mb-24 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-3xl font-bold">Sứ mệnh</h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Cung cấp một nền tảng quản lý sạc xe điện thông minh, minh bạch và dễ sử dụng.
              EVCharge không chỉ giúp người dùng tìm trạm sạc mà còn tối ưu hóa thời gian và chi phí
              cho từng hành trình.
            </p>
          </div>
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Globe className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-3xl font-bold">Tầm nhìn 2030</h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Trở thành nhà cung cấp nền tảng quản lý hạ tầng xe điện số 1 khu vực Đông Nam Á, với
              mạng lưới 100.000 điểm sạc được kết nối trực tiếp vào hệ sinh thái của EVCharge.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Giá trị cốt lõi</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Những nguyên tắc hướng dẫn mọi quyết định và hành động của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-800">
              <Zap className="mb-4 h-8 w-8 text-amber-500" />
              <h3 className="mb-3 text-xl font-bold">Tốc độ & Hiệu quả</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Thời gian của khách hàng là vàng. Chúng tôi liên tục tối ưu thuật toán và mở rộng
                trạm sạc nhanh để rút ngắn tối đa thời gian chờ đợi.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-800">
              <Shield className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="mb-3 text-xl font-bold">Minh bạch & An toàn</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Không có phí ẩn. Mọi giao dịch, trạng thái trạm sạc đều được hiển thị realtime và
                bảo mật tuyệt đối thông tin người dùng.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-800">
              <Users className="mb-4 h-8 w-8 text-pink-500" />
              <h3 className="mb-3 text-xl font-bold">Lấy khách hàng làm trung tâm</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Mọi tính năng được phát triển đều xuất phát từ nhu cầu thực tế và phản hồi của cộng
                đồng người sử dụng xe điện.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
