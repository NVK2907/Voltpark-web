import { ArrowRight, Zap, Map, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-32 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-violet-50/80 to-white dark:from-slate-950 dark:to-slate-900" />
          <img
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2000&auto=format&fit=crop"
            alt="EV Charging Station"
            className="h-full w-full object-cover object-center opacity-30 dark:opacity-20"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 lg:px-8">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            <Zap className="h-4 w-4" />
            <span>Mạng lưới sạc nhanh lớn nhất Việt Nam</span>
          </div>

          <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-7xl">
            Năng lượng xanh cho <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              hành trình bất tận
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            Tìm trạm sạc, đặt chỗ trước và thanh toán dễ dàng với ứng dụng EVCharge. Giải pháp trọn
            gói cho trải nghiệm xe điện hoàn hảo của bạn.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/map">
              <Button className="h-14 w-full rounded-full bg-violet-600 px-8 text-lg font-bold shadow-xl shadow-violet-600/20 hover:bg-violet-700 sm:w-auto">
                Tìm trạm sạc gần đây <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/app">
              <Button
                variant="outline"
                className="h-14 w-full rounded-full border-2 border-slate-200 px-8 text-lg font-bold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 sm:w-auto"
              >
                Tải ứng dụng ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-100 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 divide-x divide-slate-100 text-center dark:divide-slate-800 md:grid-cols-4">
            <div>
              <p className="mb-2 text-4xl font-black text-violet-600">500+</p>
              <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                Trạm sạc toàn quốc
              </p>
            </div>
            <div>
              <p className="mb-2 text-4xl font-black text-violet-600">2500+</p>
              <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                Cổng sạc khả dụng
              </p>
            </div>
            <div>
              <p className="mb-2 text-4xl font-black text-violet-600">100k+</p>
              <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                Người dùng tin tưởng
              </p>
            </div>
            <div>
              <p className="mb-2 text-4xl font-black text-violet-600">99.9%</p>
              <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                Uptime hệ thống
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Trải nghiệm sạc xe chưa bao giờ dễ dàng đến thế
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Chúng tôi cung cấp mọi tính năng bạn cần để quản lý hành trình di chuyển của mình.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Map className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Bản đồ thông minh</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Tìm kiếm trạm sạc gần nhất theo thời gian thực. Lọc theo loại cổng sạc, công suất và
                trạng thái khả dụng.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Đặt chỗ trước</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Không còn cảnh chờ đợi. Đặt trước slot sạc lên đến 24 giờ và yên tâm khi đến trạm
                luôn có chỗ cho bạn.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Thanh toán an toàn</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Nạp tiền vào ví EVCharge hoặc liên kết thẻ ngân hàng để thanh toán tự động, minh
                bạch sau mỗi lần sạc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="overflow-hidden bg-white py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="lg:w-1/2">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Mạng lưới phủ sóng toàn quốc</h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Với hơn 500 trạm sạc được phân bổ khắp các tỉnh thành, dọc theo các tuyến đường quốc
                lộ và trung tâm thương mại lớn. Bạn hoàn toàn có thể tự tin thực hiện những chuyến
                đi xuyên Việt.
              </p>
              <ul className="mb-8 space-y-4">
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <CheckIcon />
                  </div>
                  <span className="font-medium">100+ Trạm sạc siêu nhanh (150kW+)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <CheckIcon />
                  </div>
                  <span className="font-medium">Có mặt tại 90% trung tâm thương mại Vincom</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <CheckIcon />
                  </div>
                  <span className="font-medium">Hỗ trợ 24/7 mọi lúc mọi nơi</span>
                </li>
              </ul>
              <Link to="/map">
                <Button className="h-12 rounded-full bg-slate-900 px-6 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                  Khám phá bản đồ
                </Button>
              </Link>
            </div>
            <div className="relative lg:w-1/2">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-violet-500 to-indigo-500 opacity-20 blur-xl"></div>
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-2xl dark:border-slate-800 md:aspect-[4/3]">
                <div className="p-6 text-center">
                  <Map className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                  <p className="font-medium text-slate-500">Bản đồ tương tác sẽ hiển thị tại đây</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-violet-600"></div>
        <div className="absolute right-0 top-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-violet-500 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-96 w-96 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Sẵn sàng để bắt đầu?</h2>
          <p className="mb-10 text-xl text-violet-100">
            Đăng ký tài khoản miễn phí và nhận ngay voucher 50.000đ cho lần sạc đầu tiên.
          </p>
          <Link to="/signup">
            <Button className="h-14 rounded-full bg-white px-10 text-lg font-bold text-violet-600 shadow-xl hover:bg-slate-50">
              Tạo tài khoản ngay
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}
