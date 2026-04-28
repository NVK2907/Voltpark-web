import { MapPin, Navigation, Star, Heart, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const MOCK_FAVORITES = [
  {
    id: '1',
    name: 'Vincom Center Landmark 81',
    address: '208 Nguyễn Hữu Cảnh, P.22, Bình Thạnh',
    rating: 4.8,
    status: 'available',
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Vinhomes Central Park - Park 1',
    address: '720A Điện Biên Phủ, P.22, Bình Thạnh',
    rating: 4.9,
    status: 'available',
    image:
      'https://images.unsplash.com/photo-1620803135547-074f76cdb2c9?q=80&w=800&auto=format&fit=crop',
  },
];

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 p-6 lg:p-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="flex items-center gap-4 text-4xl font-black text-slate-900 dark:text-white">
            <Heart className="h-8 w-8 fill-current text-red-500" />
            Trạm sạc yêu thích
          </h1>
          <p className="mt-1 font-medium text-slate-500">
            Nơi lưu trữ những địa điểm sạc thường xuyên của bạn.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Tìm trong mục yêu thích..."
            className="h-12 rounded-2xl border-slate-200 bg-white pl-10 dark:border-slate-800 dark:bg-slate-900"
          />
        </div>
      </div>

      {MOCK_FAVORITES.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_FAVORITES.map((station) => (
            <div
              key={station.id}
              className="group overflow-hidden rounded-[32px] border border-slate-100 bg-white transition-all duration-300 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-56">
                <img
                  src={station.image}
                  alt={station.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl border-none bg-white shadow-lg hover:text-red-500 dark:bg-slate-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="border-none bg-emerald-500 px-3 py-1 font-bold shadow-lg">
                    Sẵn sàng
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <Link to={`/stations/${station.id}`}>
                  <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-violet-600">
                    {station.name}
                  </h3>
                </Link>
                <div className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500">
                  <MapPin className="h-4 w-4 text-violet-600" />
                  <span className="truncate">{station.address}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-black">{station.rating}</span>
                  </div>
                  <Button className="h-11 rounded-2xl bg-violet-600 px-6 font-bold hover:bg-violet-700">
                    <Navigation className="mr-2 h-4 w-4" /> CHỈ ĐƯỜNG
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[40px] border-2 border-dashed border-slate-200 bg-slate-100 py-20 text-center dark:border-slate-800 dark:bg-slate-900">
          <Heart className="mx-auto mb-4 h-16 w-16 text-slate-300" />
          <h3 className="text-xl font-bold text-slate-400">Bạn chưa có trạm sạc yêu thích nào</h3>
          <p className="mt-2 text-slate-500">
            Hãy nhấn biểu tượng trái tim tại các trạm sạc để lưu lại.
          </p>
          <Link to="/map">
            <Button className="mt-8 h-12 rounded-2xl bg-violet-600 px-8 font-bold hover:bg-violet-700">
              Khám phá ngay
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
