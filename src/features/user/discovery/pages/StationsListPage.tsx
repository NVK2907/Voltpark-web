import { Search, MapPin, Navigation, Star, Heart, SlidersHorizontal } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

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
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1660636254703-a2cd1c78484a?q=80&w=800&auto=format&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1620803135547-074f76cdb2c9?q=80&w=800&auto=format&fit=crop',
    price: '3,100đ/kWh',
  },
  {
    id: '4',
    name: 'Giga Mall Phạm Văn Đồng',
    address: '240-242 Phạm Văn Đồng, Hiệp Bình Chánh, Thủ Đức',
    distance: '6.8 km',
    rating: 4.7,
    reviews: 210,
    chargers: [
      { type: 'DC Fast', power: '60kW', available: 4, total: 6 },
      { type: 'AC Standard', power: '11kW', available: 12, total: 12 },
    ],
    status: 'available',
    image:
      'https://images.unsplash.com/photo-1678174526685-3b99beccfb1f?q=80&w=800&auto=format&fit=crop',
    price: '3,858đ/kWh',
  },
];

export default function StationsListPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('Tất cả');

  const filteredStations = MOCK_STATIONS.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'Tất cả') return true;
    if (activeFilter === 'DC Sạc nhanh') return s.chargers.some((c) => c.type === 'DC Fast');
    if (activeFilter === 'Sẵn sàng') return s.status === 'available';
    // MOCK: 'Gần tôi' and 'Yêu thích' logic
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Danh sách trạm sạc</h1>
          <p className="mt-1 font-medium text-slate-500">
            Tìm kiếm và lọc các trạm sạc phù hợp với bạn
          </p>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Tìm theo tên, địa chỉ..."
              className="h-11 rounded-xl border-slate-200 bg-white pl-10 dark:border-slate-800 dark:bg-slate-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="h-11 gap-2 rounded-xl border-slate-200 font-bold dark:border-slate-800"
          >
            <SlidersHorizontal className="h-4 w-4" /> Bộ lọc
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
        {['Tất cả', 'DC Sạc nhanh', 'Sẵn sàng', 'Gần tôi', 'Yêu thích'].map((label) => (
          <Button
            key={label}
            variant={activeFilter === label ? 'default' : 'outline'}
            className={cn(
              'h-10 shrink-0 rounded-full px-6 font-bold',
              activeFilter === label
                ? 'bg-violet-600 hover:bg-violet-700'
                : 'border-slate-200 dark:border-slate-800',
            )}
            onClick={() => setActiveFilter(label)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Image Wrap */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={station.image}
                alt={station.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute left-4 top-4">
                <Badge
                  className={cn(
                    'border-none px-3 py-1 font-bold shadow-lg',
                    station.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500',
                  )}
                >
                  {station.status === 'available' ? 'Sẵn sàng' : 'Đang bận'}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-4 h-9 w-9 rounded-full border-none bg-white/90 text-slate-400 shadow-lg backdrop-blur-sm transition-colors hover:text-red-500"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex items-start justify-between">
                <Link to={`/stations/${station.id}`}>
                  <h3 className="line-clamp-1 font-bold text-slate-900 transition-colors hover:text-violet-600 dark:text-white">
                    {station.name}
                  </h3>
                </Link>
              </div>

              <div className="mb-4 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <MapPin className="h-3 w-3 text-violet-500" />
                <span className="truncate">{station.address}</span>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-black">{station.rating}</span>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    ({station.reviews})
                  </span>
                </div>
                <div className="text-sm font-black text-violet-600">{station.price}</div>
              </div>

              <div className="mt-auto space-y-3 border-t border-slate-50 pt-4 dark:border-slate-800">
                <div className="flex gap-4">
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

                <div className="flex gap-2">
                  <Button className="h-10 flex-1 rounded-xl bg-violet-600 text-xs font-bold hover:bg-violet-700">
                    SẠC NGAY
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-xl border-slate-200 dark:border-slate-800"
                  >
                    <Navigation className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Load More */}
      <div className="flex justify-center pt-8">
        <Button
          variant="outline"
          className="h-12 rounded-full border-slate-200 px-12 font-bold hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Xem thêm trạm sạc
        </Button>
      </div>
    </div>
  );
}
