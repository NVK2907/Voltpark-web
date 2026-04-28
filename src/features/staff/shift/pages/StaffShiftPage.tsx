import { Clock, Square, Users, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';

export default function StaffShiftPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ca làm việc</h1>
          <p className="mt-1 text-muted-foreground">Thông tin ca trực và nhân sự hiện tại</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-muted-foreground">
              Thời gian còn lại của ca
            </h2>
            <div className="mb-6 font-mono text-6xl font-bold tracking-tighter text-violet-600 dark:text-violet-500 sm:text-8xl">
              04:25:10
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="h-12 gap-2 border-amber-200 px-6 text-amber-700 hover:bg-amber-50"
              >
                <Square className="h-5 w-5" /> Kết thúc ca sớm
              </Button>
              <Button
                className="h-12 gap-2 bg-violet-600 px-6 hover:bg-violet-700"
                onClick={() => navigate(`${STAFF_ROUTES.SHIFT}/handover`)}
              >
                <Send className="h-5 w-5" /> Bàn giao ca
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
              <p className="mb-1 text-sm text-muted-foreground">Phiên sạc trong ca</p>
              <p className="text-3xl font-bold">42</p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
              <p className="mb-1 text-sm text-muted-foreground">Sự cố ghi nhận</p>
              <p className="text-3xl font-bold text-amber-500">2</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Clock className="h-4 w-4" /> Chi tiết ca
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tên ca</span>
                <span className="text-sm font-medium">Ca Sáng</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Khung giờ</span>
                <span className="text-sm font-medium">06:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Giờ bắt đầu thực tế</span>
                <span className="text-sm font-medium">05:50</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Users className="h-4 w-4" /> Nhân sự cùng ca
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-600">
                  T
                </div>
                <div>
                  <p className="font-medium">Nguyễn Văn Tú (Bạn)</p>
                  <p className="text-xs font-medium text-emerald-600">Đang trực</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold dark:bg-slate-800">
                  H
                </div>
                <div>
                  <p className="font-medium">Trần Thị Hoa</p>
                  <p className="text-xs font-medium text-emerald-600">Đang trực</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
