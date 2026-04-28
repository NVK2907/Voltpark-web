import { ArrowLeft, Square, AlertTriangle, Printer, Phone } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function StaffSessionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Chi tiết Phiên {id}</h1>
        <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400">
          Đang sạc
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Customer Info */}
        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Khách hàng
          </h3>
          <div>
            <p className="text-lg font-medium">Anh Tú</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-muted-foreground">091***999</p>
              <a href="tel:0912345678" className="rounded p-1 text-violet-600 hover:bg-violet-50">
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="mb-1 text-sm text-muted-foreground">Biển số xe</p>
            <span className="rounded border bg-slate-100 px-2 py-1 font-mono text-sm dark:bg-slate-800">
              51F-123.45
            </span>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">Lịch sử tại bãi</p>
            <p className="mt-1 font-medium">5 phiên sạc (Tổng 120 kWh)</p>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="relative flex flex-col items-center justify-center space-y-6 overflow-hidden rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />

          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform">
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-amber-500 transition-all duration-1000 ease-in-out"
                strokeWidth="12"
                fill="none"
                strokeDasharray="440"
                strokeDashoffset={440 - (440 * 65) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-bold tracking-tighter">
                65<span className="ml-1 text-xl text-muted-foreground">%</span>
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                SOC
              </span>
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-6 divide-x text-center">
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Thời lượng</p>
              <p className="font-mono text-lg font-medium">01:25:40</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Điện năng</p>
              <p className="text-lg font-medium text-amber-600">
                32.5 <span className="text-sm">kWh</span>
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Chi phí</p>
              <p className="text-lg font-medium">105k</p>
            </div>
          </div>
        </div>

        {/* Technical Info */}
        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Thiết bị & Thanh toán
          </h3>

          <div className="flex items-center justify-between border-b py-2">
            <span className="text-sm text-muted-foreground">Slot</span>
            <span className="font-medium">A2 (Khu A)</span>
          </div>
          <div className="flex items-center justify-between border-b py-2">
            <span className="text-sm text-muted-foreground">Bộ sạc</span>
            <span className="font-medium">CHG-002</span>
          </div>
          <div className="flex items-center justify-between border-b py-2">
            <span className="text-sm text-muted-foreground">Phương thức TT</span>
            <span className="font-medium">Tiền mặt (Walk-in)</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Khuyến mãi</span>
            <span className="font-medium text-slate-400">Không có</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center border-t bg-white p-4 dark:bg-slate-950 lg:left-64">
        <div className="flex w-full max-w-7xl flex-wrap items-center justify-end gap-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" /> In hóa đơn tạm
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
          >
            <AlertTriangle className="h-4 w-4" /> Báo sự cố
          </Button>
          <Button variant="destructive" className="gap-2 px-8">
            <Square className="h-4 w-4" /> Dừng phiên sạc
          </Button>
        </div>
      </div>
    </div>
  );
}
