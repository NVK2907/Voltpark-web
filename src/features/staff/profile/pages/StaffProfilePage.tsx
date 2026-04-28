import { LogOut, User, Settings, Shield, Activity, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';

export default function StaffProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <div className="flex flex-col items-center gap-6 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900 sm:flex-row">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-3xl font-bold text-violet-600 dark:bg-violet-900/30">
          T
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold">Nguyễn Văn Tú</h1>
          <p className="text-muted-foreground">Nhân viên trực bãi • Q1-Trạm Vincom</p>
          <div className="mt-3 flex items-center justify-center gap-2 sm:justify-start">
            <span className="rounded bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              Đang trong ca (Sáng)
            </span>
            <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-400">
              Ca tiếp: Ngày mai 14:00
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-slate-900">
          <div className="border-b bg-slate-50 p-4 dark:bg-slate-800">
            <h3 className="flex items-center gap-2 font-semibold">
              <Activity className="h-4 w-4" /> Hiệu suất tháng này
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div>
              <p className="text-sm text-muted-foreground">Số ca đã trực</p>
              <p className="mt-1 text-2xl font-bold">24</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sự cố đã xử lý</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đánh giá KH</p>
              <p className="mt-1 text-2xl font-bold text-amber-500">4.8 ⭐</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đi làm muộn</p>
              <p className="mt-1 text-2xl font-bold text-red-500">1</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-slate-900">
          <div className="border-b bg-slate-50 p-4 dark:bg-slate-800">
            <h3 className="flex items-center gap-2 font-semibold">
              <Settings className="h-4 w-4" /> Thiết lập
            </h3>
          </div>
          <div className="flex flex-1 flex-col justify-center p-2">
            <Button
              variant="ghost"
              className="h-12 w-full justify-start"
              onClick={() => navigate(STAFF_ROUTES.ME_SYNC)}
            >
              <RefreshCw className="mr-3 h-5 w-5 text-violet-600" /> Đồng bộ dữ liệu Offline
            </Button>
            <Button variant="ghost" className="h-12 w-full justify-start">
              <User className="mr-3 h-5 w-5 text-slate-500" /> Thông tin cá nhân
            </Button>
            <Button variant="ghost" className="h-12 w-full justify-start">
              <Shield className="mr-3 h-5 w-5 text-slate-500" /> Đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button variant="destructive" className="h-12 w-full gap-2 px-8 font-bold sm:w-auto">
          <LogOut className="h-5 w-5" /> Đăng xuất
        </Button>
      </div>
    </div>
  );
}
