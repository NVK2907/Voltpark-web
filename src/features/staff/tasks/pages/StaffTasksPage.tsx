import { Filter, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';

export default function StaffTasksPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Việc cần làm</h1>
          <p className="mt-1 flex gap-4 text-muted-foreground">
            <span className="font-medium text-amber-600">3 Pending</span>
            <span className="font-medium text-violet-600">1 In Progress</span>
            <span className="font-medium text-emerald-600">5 Done</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Col - Task List */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex w-fit rounded-lg bg-slate-100 p-1 dark:bg-slate-900">
            <button className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-foreground shadow-sm dark:bg-slate-800">
              Của tôi
            </button>
            <button className="rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              Chung (Bãi đỗ)
            </button>
            <button className="rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              Đã xong
            </button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                onClick={() => navigate(`${STAFF_ROUTES.TASKS}/TASK-00${i}`)}
                className="flex cursor-pointer flex-col gap-4 rounded-lg border border-l-4 border-l-red-500 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900 sm:flex-row"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-red-700">
                      Khẩn cấp
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> Hạn: 10:30
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">Kiểm tra CHG-005 mất kết nối</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    Trụ sạc báo lỗi Offline từ hệ thống lúc 09:50. Cần reset lại aptomat.
                  </p>
                </div>
                <div className="flex shrink-0 justify-end gap-2 sm:flex-col">
                  <Button size="sm" className="bg-violet-600">
                    Bắt đầu xử lý
                  </Button>
                </div>
              </div>
            ))}

            <div
              onClick={() => navigate(`${STAFF_ROUTES.TASKS}/TASK-004`)}
              className="flex cursor-pointer flex-col gap-4 rounded-lg border border-l-4 border-l-amber-500 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900 sm:flex-row"
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
                    Cao
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> Hạn: 14:00
                  </span>
                </div>
                <h3 className="text-lg font-semibold">Vệ sinh khu vực A</h3>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  Khách phàn nàn rác ở khe hẹp giữa Slot A2 và A3.
                </p>
              </div>
              <div className="flex shrink-0 justify-end gap-2 sm:flex-col">
                <Button size="sm" variant="outline" className="border-violet-500 text-violet-600">
                  Nhận việc
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col - Filters & Stats */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Filter className="h-4 w-4" /> Bộ lọc
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Loại công việc
                </label>
                <select className="h-10 w-full rounded-md border bg-transparent px-3 outline-none">
                  <option>Tất cả</option>
                  <option>Checklist mở ca</option>
                  <option>Kiểm tra thiết bị</option>
                  <option>Xử lý sự cố</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Mức độ ưu tiên
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                    Khẩn cấp
                  </span>
                  <span className="rounded-full border bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                    Cao
                  </span>
                  <span className="rounded-full border bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                    TB
                  </span>
                  <span className="rounded-full border bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
                    Thấp
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-slate-900">
            <h3 className="mb-4 font-semibold">Tiến độ hôm nay</h3>
            <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  className="stroke-slate-100 dark:stroke-slate-800"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  className="stroke-emerald-500"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="351.8"
                  strokeDashoffset={351.8 * 0.4}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold tracking-tighter">60%</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">5/9 công việc đã hoàn thành</p>
          </div>
        </div>
      </div>
    </div>
  );
}
