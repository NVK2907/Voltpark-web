import { Zap, Battery, ArrowLeft, Settings, Info, Thermometer, Activity } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

export default function LiveChargingPage() {
  const [stopping, setStopping] = useState(false);
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Dark Header */}
      <div className="bg-slate-900 px-6 py-6 text-white md:px-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/charging">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Vincom Landmark 81</h1>
              <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                SLOT L81-04 • BK-12345
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="animate-pulse border-none bg-emerald-500 font-black">LIVE</Badge>
            <Button variant="ghost" size="icon" className="rounded-xl text-white hover:bg-white/10">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Center - Visual Progress */}
          <div className="space-y-12 lg:col-span-2">
            <div className="relative flex items-center justify-center py-10">
              {/* Big Circular Progress (Simplified SVG) */}
              <div className="relative flex h-72 w-72 items-center justify-center md:h-80 md:w-80">
                <svg className="h-full w-full -rotate-90 transform">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="fill-none stroke-slate-100 stroke-[8px] dark:stroke-slate-900"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="fill-none stroke-violet-600 stroke-[8px]"
                    style={{ strokeDasharray: '283%', strokeDashoffset: '80%' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Battery className="mb-2 h-10 w-10 text-violet-600" />
                  <span className="text-7xl font-black tracking-tighter">
                    72<span className="text-3xl text-violet-500">%</span>
                  </span>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-slate-500">
                    Dung lượng Pin
                  </p>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="animate-in fade-in slide-in-from-left absolute left-0 top-10 rounded-3xl border border-slate-100 bg-white p-4 shadow-2xl duration-700 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 fill-current text-violet-600" />
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Công suất sạc</p>
                    <p className="text-xl font-black">120.5 kW</p>
                  </div>
                </div>
              </div>
              <div className="animate-in fade-in slide-in-from-right absolute bottom-10 right-0 rounded-3xl border border-slate-100 bg-white p-4 shadow-2xl duration-700 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <Thermometer className="h-6 w-6 text-amber-500" />
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Nhiệt độ pin</p>
                    <p className="text-xl font-black">36.5°C</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charge Curve Chart Placeholder */}
            <div className="rounded-[40px] border border-slate-100 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-black">
                  <Activity className="h-5 w-5 text-violet-600" /> Biểu đồ dòng sạc (kW)
                </h3>
                <Badge variant="secondary" className="font-bold">
                  Thời gian thực
                </Badge>
              </div>
              <div className="flex h-48 w-full items-end gap-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-violet-600/20 transition-all duration-500"
                    style={{ height: `${20 + Math.sin(i / 5) * 10 + Math.random() * 50}%` }}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Bắt đầu (0 min)</span>
                <span>Hiện tại (35 min)</span>
              </div>
            </div>
          </div>

          {/* Right - Control Panel */}
          <div className="space-y-6">
            <div className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-sm text-slate-500">Điện năng đã nạp</span>
                  <span className="text-slate-900 dark:text-white">42.85 kWh</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="text-sm text-slate-500">Chi phí dự kiến</span>
                  <span className="text-xl font-black text-violet-600">165.000đ</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Thiết lập dừng sạc
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {['80%', '90%', '100%'].map((p) => (
                    <button
                      key={p}
                      className={cn(
                        'rounded-xl border-2 py-2 text-xs font-bold transition-all',
                        p === '80%'
                          ? 'border-violet-600 bg-violet-50 text-violet-600 dark:bg-violet-900/10'
                          : 'border-slate-100 text-slate-400 dark:border-slate-800',
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  className="h-16 w-full rounded-2xl bg-red-500 text-lg font-black tracking-tight text-white shadow-xl shadow-red-500/20 hover:bg-red-600"
                  disabled={stopping}
                  onClick={() => {
                    setStopping(true);
                    setTimeout(() => {
                      toast.success('Đã dừng sạc. Hóa đơn đang được xử lý...');
                      setStopping(false);
                    }, 1200);
                  }}
                >
                  {stopping ? 'Đang dừng...' : 'DỪNG SẠC NGAY'}
                </Button>
                <p className="text-center text-[10px] font-bold uppercase leading-relaxed text-slate-400">
                  Nhấn giữ để xác nhận dừng phiên sạc. Hóa đơn sẽ được gửi sau 1-2 phút.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-[32px] border border-violet-100 bg-violet-50 p-6 dark:border-violet-800 dark:bg-violet-900/10">
              <Info className="h-6 w-6 shrink-0 text-violet-600" />
              <div>
                <h4 className="text-sm font-bold text-violet-900 dark:text-violet-300">
                  Tính năng Sạc tự động
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Hệ thống sẽ tự động dừng khi pin đạt mức 80% để đảm bảo an toàn và tối ưu hóa hiệu
                  suất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
