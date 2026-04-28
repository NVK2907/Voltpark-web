import { Search, Filter, Navigation, Star, Zap, X, List, Map as MapIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const MOCK_STATIONS = [
  {
    id: '1',
    name: 'Vincom Center Landmark 81',
    address: '208 Nguyễn Hữu Cảnh, P.22, Bình Thạnh',
    distance: '1.2 km',
    rating: 4.8,
    reviews: 124,
    chargers: [
      { type: 'DC Fast', power: '250kW', available: 2, total: 4 },
      { type: 'AC Standard', power: '11kW', available: 5, total: 10 },
    ],
    status: 'available',
    lat: 10.794,
    lng: 106.722,
    price: '3,858đ/kWh',
  },
  {
    id: '2',
    name: 'Sân bay Tân Sơn Nhất - Bãi xe ga quốc nội',
    address: 'Trường Sơn, P.2, Tân Bình',
    distance: '4.5 km',
    rating: 4.5,
    reviews: 89,
    chargers: [
      { type: 'DC Fast', power: '60kW', available: 0, total: 2 },
      { type: 'AC Standard', power: '11kW', available: 3, total: 6 },
    ],
    status: 'busy',
    lat: 10.816,
    lng: 106.663,
    price: '3,858đ/kWh',
  },
  {
    id: '3',
    name: 'Vinhomes Central Park - Park 1',
    address: '720A Điện Biên Phủ, P.22, Bình Thạnh',
    distance: '1.5 km',
    rating: 4.9,
    reviews: 56,
    chargers: [
      { type: 'DC Fast', power: '30kW', available: 1, total: 1 },
      { type: 'AC Standard', power: '11kW', available: 8, total: 8 },
    ],
    status: 'available',
    lat: 10.792,
    lng: 106.72,
    price: '3,100đ/kWh',
  },
];

export default function MapPage() {
  const [view, setView] = React.useState<'map' | 'list'>('map');
  const [selectedStation, setSelectedStation] = React.useState<(typeof MOCK_STATIONS)[0] | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="relative flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar - Search & List */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 z-20 flex w-full flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 sm:w-[400px] lg:shadow-none',
          view === 'list' ? 'translate-x-0' : 'translate-x-[-100%] lg:translate-x-0',
        )}
      >
        {/* Search Header */}
        <div className="space-y-4 border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Tìm trạm sạc..."
                className="h-11 rounded-xl border-none bg-slate-50 pl-10 dark:bg-slate-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 rounded-xl">
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 shrink-0 rounded-xl lg:hidden"
              onClick={() => setView('map')}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
            {['Gần tôi', 'DC Sạc nhanh', 'Khả dụng', 'Giá thấp'].map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className="whitespace-nowrap rounded-full border-none bg-slate-100 px-3 py-1.5 font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-400"
              >
                {label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stations List */}
        <div className="scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 flex-1 space-y-4 overflow-y-auto p-4">
          <p className="px-1 text-xs font-bold uppercase tracking-widest text-slate-500">
            Tìm thấy 42 trạm sạc
          </p>
          {MOCK_STATIONS.map((station) => (
            <div
              key={station.id}
              onClick={() => {
                setSelectedStation(station);
                if (window.innerWidth < 1024) setView('map');
              }}
              className={cn(
                'group cursor-pointer rounded-2xl border p-4 transition-all',
                selectedStation?.id === station.id
                  ? 'border-violet-200 bg-violet-50 shadow-md dark:border-violet-800 dark:bg-violet-900/10'
                  : 'border-slate-100 bg-white hover:border-violet-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-800',
              )}
            >
              <div className="mb-2 flex items-start justify-between">
                <h3 className="line-clamp-1 font-bold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-white">
                  {station.name}
                </h3>
                <span className="shrink-0 text-xs font-bold text-slate-500">
                  {station.distance}
                </span>
              </div>
              <p className="mb-3 line-clamp-1 text-xs text-slate-500">{station.address}</p>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">{station.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-medium">Fast Charging</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {station.chargers.map((c, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-slate-500">
                        {c.type}
                      </span>
                      <span
                        className={cn(
                          'text-xs font-black',
                          c.available > 0 ? 'text-emerald-500' : 'text-slate-400',
                        )}
                      >
                        {c.available}/{c.total}
                      </span>
                    </div>
                  ))}
                </div>
                <Button size="sm" className="h-8 rounded-lg bg-violet-600 hover:bg-violet-700">
                  <Navigation className="mr-1 h-3 w-3" /> Đi tiếp
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Content */}
      <div className="relative flex-1 bg-slate-100 dark:bg-slate-900">
        {/* Mock Map Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* A grid/pattern to look like a map */}
          <div
            className="absolute inset-0 opacity-10 dark:opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Mock Markers */}
          {MOCK_STATIONS.map((station) => (
            <div
              key={station.id}
              onClick={() => setSelectedStation(station)}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
              style={{
                left: `${40 + (station.lat - 10.7) * 200}%`,
                top: `${60 - (station.lng - 106.6) * 100}%`,
              }}
            >
              <div
                className={cn(
                  'relative flex items-center justify-center transition-all duration-300',
                  selectedStation?.id === station.id ? 'scale-125' : 'hover:scale-110',
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-xl dark:border-slate-950',
                    station.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500',
                  )}
                >
                  <Zap className="h-5 w-5 fill-current text-white" />
                </div>
                <div
                  className={cn(
                    'absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-white dark:border-slate-950',
                    station.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500',
                  )}
                />

                {/* Info Window (only for selected) */}
                {selectedStation?.id === station.id && (
                  <div className="animate-in zoom-in-95 absolute bottom-full left-1/2 mb-3 w-48 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 shadow-2xl duration-200 dark:border-slate-800 dark:bg-slate-900">
                    <h4 className="mb-1 line-clamp-1 text-xs font-black">{station.name}</h4>
                    <p className="mb-2 text-[10px] text-slate-500">{station.price}</p>
                    <Button
                      size="sm"
                      className="h-7 w-full bg-violet-600 text-[10px] hover:bg-violet-700"
                    >
                      Chi tiết
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute right-6 top-6 z-30 flex flex-col gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-xl border-none bg-white shadow-lg hover:bg-slate-50 dark:bg-slate-900"
          >
            <Navigation className="h-5 w-5 text-violet-600" />
          </Button>
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-900">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-none border-b border-slate-100 dark:border-slate-800"
            >
              +
            </Button>
            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-none">
              -
            </Button>
          </div>
        </div>

        {/* View Toggle (Mobile) */}
        <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 lg:hidden">
          <Button
            className="h-12 gap-2 rounded-full bg-slate-900 px-6 font-bold text-white shadow-2xl dark:bg-white dark:text-slate-900"
            onClick={() => setView(view === 'map' ? 'list' : 'map')}
          >
            {view === 'map' ? (
              <>
                <List className="h-4 w-4" /> Xem danh sách
              </>
            ) : (
              <>
                <MapIcon className="h-4 w-4" /> Xem bản đồ
              </>
            )}
          </Button>
        </div>

        {/* Selected Station Overlay (Mobile) */}
        {selectedStation && view === 'map' && (
          <div className="animate-in slide-in-from-bottom absolute bottom-0 left-0 right-0 p-4 duration-300 lg:hidden">
            <div className="flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mr-4 min-w-0 flex-1">
                <h3 className="line-clamp-1 text-lg font-bold">{selectedStation.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">{selectedStation.rating}</span>
                  <span className="text-xs text-slate-500">• {selectedStation.distance}</span>
                </div>
              </div>
              <Button className="h-12 rounded-xl bg-violet-600 px-6 font-bold hover:bg-violet-700">
                Sạc ngay
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => setSelectedStation(null)}
              >
                <X className="h-5 w-5 text-slate-400" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
