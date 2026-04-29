import { Zap, History, ArrowRight, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';

export default function ChargingDashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-7xl space-y-10 p-6 lg:p-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Sạc xe</h1>
          <p className="mt-1 font-medium text-slate-500">
            Bắt đầu hoặc theo dõi phiên sạc của bạn.
          </p>
        </div>
        <Link to="/wallet/transactions">
          <Button
            variant="outline"
            className="h-12 gap-2 rounded-2xl border-slate-200 font-bold dark:border-slate-800"
          >
            <History className="h-5 w-5" /> Lịch sử sạc
          </Button>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="rounded-[40px] bg-gradient-to-r from-indigo-600 to-indigo-500 p-10 text-white shadow-2xl shadow-indigo-600/20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-md space-y-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200">
              Sẵn sàng sạc?
            </p>
            <h2 className="text-4xl font-black leading-tight">Bắt đầu ngay hôm nay</h2>
            <p className="font-medium text-indigo-100">
              Quét mã QR hoặc nhập mã trạm để bắt đầu phiên sạc một cách nhanh chóng.
            </p>
          </div>
          <Link to="/checkin">
            <Button className="h-16 rounded-[24px] bg-white px-10 text-lg font-black text-indigo-600 shadow-xl hover:bg-indigo-50">
              SẠC NGAY <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Active Charging Session Hero */}
      <div className="relative overflow-hidden rounded-[40px] bg-slate-900 p-8 text-white shadow-2xl dark:bg-slate-900 md:p-12">
        <div className="absolute right-0 top-0 p-8 opacity-10">
          <Zap className="h-64 w-64 fill-current text-violet-500" />
        </div>

        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-violet-600">
                <Zap className="h-6 w-6 fill-current text-white" />
              </div>
              <div>
                <Badge className="mb-1 bg-violet-600 px-3 text-[10px] font-black tracking-widest">
                  LIVE SESSION
                </Badge>
                <h2 className="text-2xl font-bold">Vincom Landmark 81 - Slot 04</h2>
              </div>
            </div>

            <div className="flex items-end gap-4">
              <span className="text-8xl font-black tracking-tighter">72</span>
              <div className="pb-4">
                <span className="text-4xl font-black text-violet-500">%</span>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Dung lượng Pin
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Bắt đầu từ 22%</span>
                <span>Mục tiêu: 100%</span>
              </div>
              <Progress value={72} className="h-4 bg-slate-800" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Công suất
                </p>
                <p className="text-xl font-black">
                  120.5 <span className="text-xs text-violet-500">kW</span>
                </p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Đã sạc
                </p>
                <p className="text-xl font-black">
                  42.8 <span className="text-xs text-violet-500">kWh</span>
                </p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Thời gian
                </p>
                <p className="text-xl font-black">0h 35m</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-400">Chi phí tạm tính</span>
              <span className="text-3xl font-black text-violet-500">165.000đ</span>
            </div>

            <div className="space-y-4">
              <Button
                className="h-14 w-full rounded-2xl bg-white text-lg font-black text-slate-900 hover:bg-slate-100"
                onClick={() => toast.success('Phiên sạc đã được dừng')}
              >
                DỪNG SẠC NGAY
              </Button>
              <Link to="/charging/live" className="block">
                <Button
                  variant="ghost"
                  className="h-12 w-full gap-2 rounded-2xl font-bold text-white hover:bg-white/10"
                >
                  XEM CHI TIẾT DÒNG SẠC <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <Activity className="h-5 w-5 text-emerald-500" />
              <p className="text-xs font-medium leading-snug text-slate-400">
                Nhiệt độ trạm sạc đang ở mức ổn định (38°C). Dòng điện ổn định.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Stats */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-[32px] border border-slate-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-black">Hiệu suất sạc hàng tháng</h3>
            <Badge
              variant="outline"
              className="rounded-xl border-slate-200 font-bold dark:border-slate-800"
            >
              THÁNG 4, 2024
            </Badge>
          </div>

          <div className="group flex h-64 items-end justify-between gap-2 md:gap-4">
            {[40, 65, 30, 85, 45, 90, 55].map((h, i) => (
              <div
                key={i}
                className="relative flex-1 cursor-pointer rounded-t-xl bg-slate-100 transition-opacity hover:!opacity-100 group-hover:opacity-40 dark:bg-slate-800"
              >
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-violet-600 transition-all duration-700"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>Tuần 1</span>
            <span>Tuần 2</span>
            <span>Tuần 3</span>
            <span>Tuần 4</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] bg-violet-600 p-6 text-white shadow-xl shadow-violet-500/20">
            <div className="mb-4 flex items-center gap-3">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm font-black uppercase tracking-widest">
                Tiết kiệm tháng này
              </span>
            </div>
            <p className="mb-2 text-3xl font-black">2.450.000đ</p>
            <p className="text-xs font-medium opacity-80">
              So với việc sử dụng xe xăng cùng quãng đường di chuyển.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="mb-4 flex items-center gap-2 font-black">
              <AlertCircle className="h-5 w-5 text-amber-500" /> Cần chú ý
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/50">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Pin xe nên sạc đến
                </span>
                <span className="text-sm font-black text-violet-600">80%</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-500">
                Sạc đến 80% giúp tối ưu hóa tuổi thọ pin Lithium-ion của xe bạn theo khuyến cáo từ
                nhà sản xuất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
