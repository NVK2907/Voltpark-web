import { Plus, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import type * as React from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

const TICKETS = [
  {
    id: 'TK-001',
    title: 'Cổng sạc DC không hoạt động tại Giga Mall',
    status: 'open',
    priority: 'high',
    updated: '2 giờ trước',
  },
  {
    id: 'TK-002',
    title: 'Bị tính phí sai cho phiên sạc ngày 20/04',
    status: 'resolved',
    priority: 'medium',
    updated: 'Hôm qua',
  },
  {
    id: 'TK-003',
    title: 'Ứng dụng không tìm thấy vị trí của tôi',
    status: 'pending',
    priority: 'low',
    updated: '3 ngày trước',
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.FC<any> }> = {
  open: { label: 'Đang xử lý', color: 'bg-blue-500', icon: AlertCircle },
  pending: { label: 'Chờ phản hồi', color: 'bg-amber-500', icon: Clock },
  resolved: { label: 'Đã giải quyết', color: 'bg-emerald-500', icon: CheckCircle2 },
};

export default function MyTicketsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6 lg:p-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Ticket hỗ trợ</h1>
          <p className="mt-1 font-medium text-slate-500">Theo dõi các yêu cầu hỗ trợ của bạn.</p>
        </div>
        <Link to="/support/tickets/new">
          <Button className="h-12 gap-2 rounded-2xl bg-violet-600 px-6 font-bold hover:bg-violet-700">
            <Plus className="h-5 w-5" /> TẠO TICKET MỚI
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {TICKETS.map((t) => {
          const s = statusConfig[t.status]!;
          return (
            <Link key={t.id} to={`/support/tickets/${t.id}`}>
              <div className="flex items-center gap-5 rounded-3xl border border-slate-100 bg-white p-6 transition-all hover:border-violet-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div
                  className={`h-12 w-12 rounded-2xl ${s.color} flex shrink-0 items-center justify-center`}
                >
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-black text-slate-900 dark:text-white">{t.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                    <span>#{t.id}</span>
                    <span>·</span>
                    <span>{t.updated}</span>
                  </div>
                </div>
                <Badge className={`${s.color} shrink-0 border-none font-bold text-white`}>
                  {s.label}
                </Badge>
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
              </div>
            </Link>
          );
        })}
      </div>

      {TICKETS.length === 0 && (
        <div className="rounded-[40px] border-2 border-dashed border-slate-200 bg-slate-50 py-20 text-center dark:border-slate-800 dark:bg-slate-900">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-300" />
          <p className="text-xl font-bold text-slate-400">Không có ticket nào đang mở</p>
        </div>
      )}
    </div>
  );
}
