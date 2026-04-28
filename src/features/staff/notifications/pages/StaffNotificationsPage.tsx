import { Bell, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';

export default function StaffNotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Cảnh báo lỗi sạc',
      desc: 'Slot A2 (CHG-002) báo lỗi quá nhiệt. Phiên sạc đã bị dừng.',
      time: '10:05 Hôm nay',
      read: false,
    },
    {
      id: 2,
      type: 'system',
      title: 'Phân công công việc mới',
      desc: 'Bạn được giao: Kiểm tra vệ sinh khu vực B',
      time: '09:30 Hôm nay',
      read: false,
    },
    {
      id: 3,
      type: 'info',
      title: 'Hoàn thành sạc',
      desc: 'Khách hàng 51F-123.45 (Slot C1) đã hoàn thành phiên sạc.',
      time: '08:15 Hôm nay',
      read: true,
    },
    {
      id: 4,
      type: 'system',
      title: 'Cập nhật hệ thống',
      desc: 'Hệ thống sẽ bảo trì từ 23:00 - 02:00 ngày mai.',
      time: 'Hôm qua',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'info':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      default:
        return <Bell className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Thông báo</h1>
        <Button variant="outline" size="sm" className="text-violet-600 hover:text-violet-700">
          Đánh dấu tất cả đã đọc
        </Button>
      </div>

      <div className="flex w-fit rounded-lg bg-slate-100 p-1 dark:bg-slate-900">
        <button
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-white text-foreground shadow-sm dark:bg-slate-800' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả
        </button>
        <button
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${activeTab === 'unread' ? 'bg-white text-foreground shadow-sm dark:bg-slate-800' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('unread')}
        >
          Chưa đọc (2)
        </button>
        <button
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${activeTab === 'alert' ? 'bg-white text-foreground shadow-sm dark:bg-slate-800' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('alert')}
        >
          Cảnh báo
        </button>
      </div>

      <div className="divide-y rounded-lg border bg-white shadow-sm dark:bg-slate-900">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex cursor-pointer gap-4 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!notif.read ? 'bg-violet-50/30 dark:bg-violet-900/10' : ''}`}
          >
            <div className="mt-1 shrink-0">{getIcon(notif.type)}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <h3
                  className={`font-medium ${!notif.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  {notif.title}
                </h3>
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {notif.time}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{notif.desc}</p>
            </div>
            {!notif.read && (
              <div className="flex shrink-0 items-center">
                <div className="h-2 w-2 rounded-full bg-violet-600" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
