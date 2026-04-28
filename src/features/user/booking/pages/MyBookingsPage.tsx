import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  MoreVertical,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

const MOCK_BOOKINGS = [
  {
    id: 'BK-12345',
    station: 'Vincom Center Landmark 81',
    address: 'Bình Thạnh, TP. HCM',
    date: '28/04/2024',
    time: '18:30 - 19:30',
    slot: 'L81-DC-04',
    status: 'upcoming',
    type: 'DC Fast (250kW)',
  },
  {
    id: 'BK-12344',
    station: 'Giga Mall Phạm Văn Đồng',
    address: 'Thủ Đức, TP. HCM',
    date: '27/04/2024',
    time: '14:00 - 15:00',
    slot: 'GM-AC-12',
    status: 'completed',
    type: 'AC Standard (11kW)',
  },
];

export default function MyBookingsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6 lg:p-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Lịch đặt chỗ</h1>
          <p className="mt-1 font-medium text-slate-500">
            Quản lý và theo dõi các phiên đặt trước trạm sạc.
          </p>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Tìm mã đặt chỗ..."
              className="h-11 rounded-xl border-slate-200 bg-white pl-10 dark:border-slate-800 dark:bg-slate-900"
            />
          </div>
          <Link to="/map">
            <Button className="h-11 rounded-xl bg-violet-600 px-6 font-bold hover:bg-violet-700">
              ĐẶT CHỖ MỚI
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-8 grid h-14 w-full max-w-md grid-cols-4 rounded-2xl bg-slate-100 p-1 dark:bg-slate-900">
          <TabsTrigger
            value="upcoming"
            className="rounded-xl font-bold shadow-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
          >
            Sắp tới
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="rounded-xl font-bold shadow-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
          >
            Đang sạc
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-xl font-bold shadow-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
          >
            Hoàn tất
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="rounded-xl font-bold shadow-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
          >
            Đã hủy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="animate-in fade-in space-y-4 duration-300">
          {MOCK_BOOKINGS.filter((b) => b.status === 'upcoming').map((booking) => (
            <div
              key={booking.id}
              className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30">
                    <Calendar className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-3">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        {booking.station}
                      </h3>
                      <Badge className="border-none bg-violet-600 font-bold">{booking.id}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                      <MapPin className="h-4 w-4 text-violet-600" />
                      {booking.address}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-right md:grid-cols-1 md:gap-1">
                  <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white md:justify-end">
                    <Clock className="h-4 w-4 text-violet-600" />
                    {booking.time}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {booking.date}
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-slate-50 pt-4 dark:border-slate-800 md:border-t-0 md:pt-0">
                  <Button
                    variant="outline"
                    className="h-11 flex-1 rounded-xl border-slate-200 font-bold text-slate-600 dark:border-slate-800 md:flex-none"
                  >
                    HỦY ĐẶT
                  </Button>
                  <Button className="h-11 flex-1 rounded-xl bg-violet-600 px-8 font-bold hover:bg-violet-700 md:flex-none">
                    ĐI ĐẾN TRẠM
                  </Button>
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl">
                    <MoreVertical className="h-5 w-5 text-slate-400" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {MOCK_BOOKINGS.filter((b) => b.status === 'completed').map((booking) => (
            <div
              key={booking.id}
              className="rounded-3xl border border-slate-100 bg-white p-6 opacity-80 transition-opacity hover:opacity-100 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{booking.station}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                      {booking.date} • {booking.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="gap-2 rounded-xl font-bold text-violet-600">
                    Xem hóa đơn <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
