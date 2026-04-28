import { Zap } from 'lucide-react';
import { Outlet, Link } from 'react-router-dom';
import { Toaster } from 'sonner';

export function UserAuthLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans dark:bg-slate-950">
      {/* Left Form Area */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-[440px]">
          <Link
            to="/"
            className="mb-12 inline-flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shadow-md">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-black tracking-tight text-transparent dark:from-white dark:to-slate-300">
              EVCharge
            </span>
          </Link>

          <Outlet />
        </div>
      </div>

      {/* Right Image/Illustration Area (Desktop Only) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-violet-600 p-12 lg:flex">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop"
            alt="EV Charging"
            className="h-full w-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-violet-900 via-violet-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 mt-auto">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Tham gia mạng lưới sạc điện lớn nhất Việt Nam
          </h2>
          <p className="max-w-md text-lg text-violet-200">
            Tìm trạm sạc dễ dàng, thanh toán tiện lợi và nhận nhiều ưu đãi độc quyền dành riêng cho
            thành viên EVCharge.
          </p>
          <div className="mt-8 flex gap-4">
            <div className="flex -space-x-4">
              <img
                className="h-10 w-10 rounded-full border-2 border-violet-900"
                src="https://i.pravatar.cc/100?img=1"
                alt="Avatar"
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-violet-900"
                src="https://i.pravatar.cc/100?img=2"
                alt="Avatar"
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-violet-900"
                src="https://i.pravatar.cc/100?img=3"
                alt="Avatar"
              />
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-violet-900 bg-white text-xs font-bold text-violet-900">
                +10k
              </div>
            </div>
            <div className="flex items-center text-sm text-violet-200">
              Đã có hơn 10.000+ <br /> người dùng tin tưởng
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}
