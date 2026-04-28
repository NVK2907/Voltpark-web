import { ArrowLeft, Phone, ShieldAlert, AlertOctagon, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function StaffEmergencyPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-red-600 dark:text-red-500">
            Tình huống khẩn cấp
          </h1>
          <p className="mt-1 text-muted-foreground">
            Chỉ sử dụng trong các trường hợp nguy hiểm thực sự
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <button className="group flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-red-200 bg-red-50 p-8 transition-colors hover:bg-red-100 dark:border-red-900 dark:bg-red-950/30 dark:hover:bg-red-900/40">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 transition-transform group-hover:scale-110 dark:bg-red-900/50">
            <Flame className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Báo cháy / Nổ</h3>
          <p className="text-center text-sm text-red-600/80 dark:text-red-400/80">
            Kích hoạt còi báo động toàn trạm và ngắt điện khẩn cấp tất cả thiết bị.
          </p>
        </button>

        <button className="group flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-amber-200 bg-amber-50 p-8 transition-colors hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/30 dark:hover:bg-amber-900/40">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 transition-transform group-hover:scale-110 dark:bg-amber-900/50">
            <AlertOctagon className="h-10 w-10 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">
            Ngắt điện khẩn cấp
          </h3>
          <p className="text-center text-sm text-amber-600/80 dark:text-amber-400/80">
            Dừng toàn bộ phiên sạc hiện tại ngay lập tức. Không kích hoạt còi.
          </p>
        </button>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Đường dây nóng</h3>
        <div className="overflow-hidden rounded-lg border bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between border-b p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">Công an / CS PCCC</h4>
                <p className="text-sm text-muted-foreground">113 / 114</p>
              </div>
            </div>
            <a
              href="tel:114"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-foreground transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center justify-between border-b p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">Cấp cứu y tế</h4>
                <p className="text-sm text-muted-foreground">115</p>
              </div>
            </div>
            <a
              href="tel:115"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-foreground transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">Quản lý trực trạm</h4>
                <p className="text-sm text-muted-foreground">Anh Bình (0911 222 333)</p>
              </div>
            </div>
            <a
              href="tel:0911222333"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-foreground transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
