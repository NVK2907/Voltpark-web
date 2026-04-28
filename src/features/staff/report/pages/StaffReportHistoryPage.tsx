import { ArrowLeft, Clock, CheckCircle2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';

export default function StaffReportHistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(STAFF_ROUTES.REPORT)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Lịch sử báo cáo</h1>
      </div>

      <div className="flex w-fit rounded-lg bg-slate-100 p-1 dark:bg-slate-900">
        <button className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-foreground shadow-sm dark:bg-slate-800">
          Tất cả (12)
        </button>
        <button className="rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          Đang xử lý (2)
        </button>
        <button className="rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          Đã đóng (10)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          {
            id: 'REP-001',
            date: 'Hôm nay, 09:50',
            title: 'CHG-005 mất kết nối',
            type: 'network',
            status: 'pending',
            loc: 'Slot A5',
          },
          {
            id: 'REP-002',
            date: 'Hôm qua, 14:20',
            title: 'Khách khiếu nại app không nạp được tiền',
            type: 'software',
            status: 'resolved',
            loc: 'Online',
          },
          {
            id: 'REP-003',
            date: '01/04/2026, 08:00',
            title: 'Vỡ kính màn hình trụ CHG-001',
            type: 'hardware',
            status: 'resolved',
            loc: 'Slot A1',
          },
        ].map((rep) => (
          <div
            key={rep.id}
            className="cursor-pointer rounded-lg border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900"
          >
            <div className="mb-3 flex items-start justify-between">
              <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs font-medium text-slate-500 dark:bg-slate-800">
                {rep.id}
              </span>
              {rep.status === 'pending' ? (
                <span className="flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">
                  <Clock className="h-3 w-3" /> Đang xử lý
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                  <CheckCircle2 className="h-3 w-3" /> Đã đóng
                </span>
              )}
            </div>

            <h3 className="mb-1 text-lg font-semibold">{rep.title}</h3>
            <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" /> Phân loại: {rep.type}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">{rep.loc}</span>
            </p>

            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-xs text-muted-foreground">{rep.date}</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-violet-600">
                Xem chi tiết
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
