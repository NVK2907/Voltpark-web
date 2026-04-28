import { Bell, Zap, CreditCard, Tag, Info, CheckCheck, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

const MOCK_NOTIFS = [
  {
    id: 'n1',
    type: 'charging',
    icon: Zap,
    title: 'Sạc hoàn tất!',
    desc: 'Pin đã đạt 80%. Phiên sạc tại Vincom LM81 đã kết thúc.',
    time: '18:45 hôm nay',
    read: false,
  },
  {
    id: 'n2',
    type: 'payment',
    icon: CreditCard,
    title: 'Thanh toán thành công',
    desc: 'Đã thanh toán 245.500đ cho phiên sạc CS-98765.',
    time: '18:50 hôm nay',
    read: false,
  },
  {
    id: 'n3',
    type: 'voucher',
    icon: Tag,
    title: 'Voucher mới chờ bạn!',
    desc: 'Bạn nhận được voucher SUMMER50K - Giảm 50.000đ khi nạp tiền.',
    time: 'Hôm qua 09:00',
    read: true,
  },
  {
    id: 'n4',
    type: 'system',
    icon: Info,
    title: 'Cập nhật ứng dụng',
    desc: 'Phiên bản 3.2.1 đã sẵn sàng với nhiều tính năng mới.',
    time: '2 ngày trước',
    read: true,
  },
];

const iconColors: Record<string, string> = {
  charging: 'bg-violet-100 text-violet-600 dark:bg-violet-900/20',
  payment: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20',
  voucher: 'bg-amber-100 text-amber-600 dark:bg-amber-900/20',
  system: 'bg-slate-100 text-slate-600 dark:bg-slate-800',
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = React.useState(MOCK_NOTIFS);
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));
  const markRead = (id: string) =>
    setNotifs((n) => n.map((x) => (x.id === id ? { ...x, read: true } : x)));

  const groups = [
    { label: 'Hôm nay', items: notifs.filter((n) => n.time.includes('hôm nay')) },
    { label: 'Hôm qua', items: notifs.filter((n) => n.time.includes('Hôm qua')) },
    { label: 'Trước đó', items: notifs.filter((n) => n.time.includes('ngày trước')) },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6 lg:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black text-slate-900 dark:text-white">
            <Bell className="h-7 w-7 text-violet-600" /> Thông báo
            {unreadCount > 0 && (
              <Badge className="border-none bg-red-500 font-bold">{unreadCount}</Badge>
            )}
          </h1>
          <p className="mt-1 font-medium text-slate-500">
            Cập nhật mới nhất về tài khoản và trạm sạc của bạn.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            className="gap-2 rounded-xl font-bold text-violet-600"
            onClick={markAllRead}
          >
            <CheckCheck className="h-4 w-4" /> Đọc tất cả
          </Button>
        )}
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid h-12 w-full max-w-md grid-cols-4 rounded-2xl bg-slate-100 p-1 dark:bg-slate-900">
          {['all', 'charging', 'payment', 'system'].map((t, i) => (
            <TabsTrigger
              key={t}
              value={t}
              className="rounded-xl text-xs font-bold shadow-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
            >
              {['Tất cả', 'Sạc xe', 'Thanh toán', 'Hệ thống'][i]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-8">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="mb-3 px-2 text-xs font-black uppercase tracking-widest text-slate-400">
                {g.label}
              </p>
              <div className="space-y-2">
                {g.items.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={cn(
                      'flex cursor-pointer items-start gap-4 rounded-3xl p-5 transition-all',
                      n.read
                        ? 'border border-slate-50 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/50'
                        : 'border border-violet-100 bg-violet-50 dark:border-violet-800 dark:bg-violet-900/10',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                        iconColors[n.type],
                      )}
                    >
                      <n.icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-slate-900 dark:text-white">{n.title}</p>
                        {!n.read && <div className="h-2 w-2 shrink-0 rounded-full bg-violet-600" />}
                      </div>
                      <p className="mt-0.5 text-sm font-medium leading-snug text-slate-500">
                        {n.desc}
                      </p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {n.time}
                      </p>
                    </div>
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
