import { Activity, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';

export function LiveOpsPanel() {
  const events = [
    { id: 1, time: '10:05', type: 'session_start', msg: 'Bắt đầu sạc Slot A2 (51F-123.45)' },
    { id: 2, time: '09:50', type: 'fault', msg: 'Cảnh báo: CHG-005 mất kết nối mạng' },
    { id: 3, time: '09:15', type: 'session_end', msg: 'Hoàn thành sạc Slot C1 (15.2 kWh)' },
    { id: 4, time: '08:30', type: 'task', msg: 'Bạn đã hoàn thành: Kiểm tra vệ sinh' },
  ];

  return (
    <div className="flex h-full flex-col rounded-lg border bg-white shadow-sm dark:bg-slate-900">
      <div className="flex items-center justify-between border-b bg-slate-50 p-4 dark:bg-slate-900/50">
        <h3 className="flex items-center gap-2 font-semibold">
          <Activity className="h-4 w-4 text-violet-500" /> Hoạt động gần đây
        </h3>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
      </div>

      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
        {/* Pinned task */}
        <div className="mb-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-500">
                Việc cần ưu tiên
              </p>
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-600">
                Kiểm tra CHG-005 bị rớt mạng lúc 09:50.
              </p>
              <Link
                to={STAFF_ROUTES.TASKS}
                className="mt-2 inline-block text-xs font-semibold text-amber-600 hover:underline"
              >
                Xem chi tiết &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative space-y-6 pl-4 before:absolute before:inset-0 before:ml-[5px] before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent dark:before:via-slate-700 md:before:mx-auto md:before:translate-x-0">
          {events.map((ev, i) => (
            <div
              key={ev.id}
              className="is-active group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
            >
              <div className="absolute left-[-22px] flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2 border-white bg-slate-300 shadow dark:border-slate-900 dark:bg-slate-600 md:left-1/2 md:-translate-x-1/2" />

              <div className="w-full">
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {ev.time}
                  </div>
                </div>
                <div className="rounded-md border bg-slate-50 p-2.5 text-sm text-foreground shadow-sm dark:bg-slate-800">
                  {ev.msg}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
