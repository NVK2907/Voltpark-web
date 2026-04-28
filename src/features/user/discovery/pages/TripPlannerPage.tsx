import { Navigation, MapPin, Plus, Zap, Clock, Battery, Fuel } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export default function TripPlannerPage() {
  const [stops, setStops] = React.useState([
    { id: 'start', type: 'start', address: 'Vinhomes Central Park, Bình Thạnh' },
    { id: 'end', type: 'end', address: 'VinWonders Nha Trang' },
  ]);

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 lg:flex-row">
      {/* Left Sidebar - Form & Suggested Stops */}
      <div className="scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 z-20 flex w-full flex-col space-y-8 overflow-y-auto border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 lg:w-[450px] lg:p-8">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white">
            <Navigation className="h-6 w-6 fill-current text-violet-600" />
            Lên lịch hành trình
          </h1>
          <p className="mt-1 font-medium text-slate-500">
            Hệ thống sẽ gợi ý các điểm sạc tối ưu trên lộ trình của bạn.
          </p>
        </div>

        {/* Route Input Form */}
        <div className="relative space-y-4">
          <div className="absolute bottom-10 left-[21px] top-10 w-0.5 border-l-2 border-dashed border-slate-200 dark:border-slate-800" />

          {stops.map((stop, index) => (
            <div key={stop.id} className="relative flex items-center gap-4">
              <div
                className={cn(
                  'z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-lg',
                  stop.type === 'start'
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900',
                )}
              >
                {stop.type === 'start' ? (
                  <MapPin className="h-5 w-5" />
                ) : (
                  <Navigation className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {stop.type === 'start' ? 'Điểm đi' : 'Điểm đến'}
                </p>
                <Input
                  defaultValue={stop.address}
                  className="h-11 rounded-xl border-none bg-slate-50 font-semibold dark:bg-slate-900"
                />
              </div>
            </div>
          ))}

          <Button
            variant="ghost"
            className="h-10 w-full justify-start pl-14 font-bold text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/10"
          >
            <Plus className="mr-2 h-4 w-4" /> Thêm điểm dừng
          </Button>
        </div>

        {/* Vehicle Params */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 flex items-center gap-2">
              <Battery className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase text-slate-500">Pin hiện tại</span>
            </div>
            <p className="text-xl font-black">65%</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 flex items-center gap-2">
              <Fuel className="h-4 w-4 text-violet-500" />
              <span className="text-xs font-bold uppercase text-slate-500">Mức pin tối thiểu</span>
            </div>
            <p className="text-xl font-black">20%</p>
          </div>
        </div>

        <Button className="h-14 w-full rounded-2xl bg-violet-600 text-lg font-black tracking-tight shadow-xl shadow-violet-500/20 hover:bg-violet-700">
          TÌM LỘ TRÌNH TỐI ƯU
        </Button>

        {/* Suggested Stops List */}
        <div className="space-y-4">
          <h3 className="px-1 text-sm font-black uppercase tracking-widest text-slate-500">
            Điểm sạc gợi ý (3)
          </h3>

          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/30">
                    <Zap className="h-4 w-4 fill-current" />
                  </div>
                  <h4 className="text-sm font-bold">Trạm sạc Phan Thiết 1</h4>
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold">
                  Kế hoạch: +20 min
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="uppercase text-slate-500">
                  Dự kiến Pin: <span className="text-slate-900 dark:text-white">28% → 85%</span>
                </div>
                <div className="text-violet-600">KM 185</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Route Visualization */}
      <div className="relative flex-1 overflow-hidden bg-slate-200 dark:bg-slate-900">
        {/* Mock Map Background for Route */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Mock Route Path */}
        <div className="absolute inset-20 flex items-center justify-center">
          <div className="relative flex h-64 w-full max-w-lg -rotate-12 transform items-center justify-around rounded-full border-4 border-dashed border-violet-500/30">
            <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-violet-600 text-white shadow-2xl">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-violet-600 bg-white text-violet-600 shadow-xl dark:bg-slate-800">
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl dark:bg-white dark:text-slate-900">
              <Navigation className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Stats Overlay */}
        <div className="scrollbar-none absolute bottom-10 left-10 right-10 flex gap-4 overflow-x-auto pb-4">
          {[
            { label: 'Tổng quãng đường', value: '435 KM', icon: Navigation },
            { label: 'Thời gian di chuyển', value: '6h 45m', icon: Clock },
            { label: 'Tổng chi phí sạc', value: '315.000đ', icon: Zap },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex min-w-[200px] flex-1 items-center gap-4 rounded-[24px] border border-white/20 bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:bg-slate-900/90"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase leading-none tracking-widest text-slate-500">
                  {stat.label}
                </p>
                <p className="text-lg font-black leading-none text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
