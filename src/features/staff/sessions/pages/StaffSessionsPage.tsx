import { Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';

export default function StaffSessionsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Phiên sạc</h1>
          <p className="mt-1 text-muted-foreground">
            Quản lý và giám sát các phiên sạc trong ca trực
          </p>
        </div>
        <Button
          onClick={() => navigate(STAFF_ROUTES.SESSIONS_NEW)}
          className="bg-violet-600 hover:bg-violet-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Phiên mới (Cmd+N)
        </Button>
      </div>

      <div className="rounded-lg border bg-white shadow-sm dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 border-b p-4 sm:flex-row">
          <div className="flex self-start rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
            <button className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-foreground shadow-sm dark:bg-slate-700">
              Đang chạy (4)
            </button>
            <button className="rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              Hôm nay (18)
            </button>
            <button className="rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              Lịch sử
            </button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" /> Lọc
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-muted-foreground dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 font-medium">Mã phiên</th>
                <th className="px-4 py-3 font-medium">Slot</th>
                <th className="px-4 py-3 font-medium">Khách / Xe</th>
                <th className="px-4 py-3 font-medium">Bắt đầu</th>
                <th className="px-4 py-3 font-medium">Thời lượng</th>
                <th className="px-4 py-3 font-medium">kWh</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
                <th className="px-4 py-3 text-right font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-mono text-violet-600 dark:text-violet-400">
                    SS-{800 + i}
                  </td>
                  <td className="px-4 py-3 font-medium">A{i}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">Khách lẻ</div>
                    <div className="font-mono text-xs text-muted-foreground">51F-123.{40 + i}</div>
                  </td>
                  <td className="px-4 py-3">08:{10 + i}</td>
                  <td className="px-4 py-3 font-mono">01:{20 + i}:15</td>
                  <td className="px-4 py-3 font-medium text-amber-600">{14 + i}.5</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400">
                      Đang sạc
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`${STAFF_ROUTES.SESSIONS}/SS-${800 + i}`)}
                    >
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t p-4 text-center text-sm text-muted-foreground">
          Đang hiển thị 4 phiên sạc đang chạy
        </div>
      </div>
    </div>
  );
}
