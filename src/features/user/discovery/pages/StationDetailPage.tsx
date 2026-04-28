import {
  MapPin,
  Navigation,
  Star,
  Zap,
  Clock,
  Heart,
  Share2,
  ArrowLeft,
  Coffee,
  Wifi,
  ShoppingBag,
  ShieldCheck,
  Info,
  DollarSign,
  MessageSquare,
  UtilityPole,
  Activity,
} from 'lucide-react';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

const MOCK_STATION = {
  id: '1',
  name: 'Vincom Center Landmark 81',
  address: '208 Nguyễn Hữu Cảnh, P.22, Bình Thạnh, TP. HCM',
  distance: '1.2 km',
  rating: 4.8,
  reviews: 124,
  price: '3,858đ/kWh',
  status: 'available',
  images: [
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1660636254703-a2cd1c78484a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620803135547-074f76cdb2c9?q=80&w=1200&auto=format&fit=crop',
  ],
  description:
    'Trạm sạc VinFast cao cấp nằm tại tầng hầm B2 & B3 của tòa nhà Landmark 81. Hỗ trợ sạc siêu nhanh lên tới 250kW và sạc tiêu chuẩn 11kW. Vị trí thuận lợi, an toàn, có đầy đủ tiện ích mua sắm và giải trí trong lúc chờ đợi.',
  amenities: [
    { icon: Coffee, label: 'Cà phê' },
    { icon: Wifi, label: 'Wi-Fi miễn phí' },
    { icon: ShoppingBag, label: 'Mua sắm' },
    { icon: ShieldCheck, label: 'An ninh 24/7' },
  ],
  chargers: [
    { id: 'c1', type: 'DC Fast', power: '250kW', total: 4, available: 2, price: '3,858đ' },
    { id: 'c2', type: 'DC Fast', power: '60kW', total: 6, available: 4, price: '3,858đ' },
    { id: 'c3', type: 'AC Standard', power: '11kW', total: 20, available: 15, price: '3,100đ' },
  ],
};

export default function StationDetailPage() {
  const { id } = useParams();
  const [activeImg, setActiveImg] = React.useState(0);
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <div className="pb-20">
      {/* Top Navigation */}
      <div className="sticky top-16 z-20 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 md:px-8">
        <Link to="/stations">
          <Button variant="ghost" className="gap-2 font-bold text-slate-600 dark:text-slate-400">
            <ArrowLeft className="h-4 w-4" /> Quay lại
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'rounded-xl transition-colors',
              isFavorite ? 'bg-red-50 text-red-500 dark:bg-red-900/20' : '',
            )}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={cn('h-5 w-5', isFavorite ? 'fill-current' : '')} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pt-6 md:px-8 lg:grid-cols-3">
        {/* Left Column - Gallery & Info */}
        <div className="space-y-8 lg:col-span-2">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[21/9] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <img
                src={MOCK_STATION.images[activeImg]}
                alt={MOCK_STATION.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="scrollbar-none flex gap-4 overflow-x-auto pb-2">
              {MOCK_STATION.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={cn(
                    'h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all',
                    activeImg === idx
                      ? 'scale-95 border-violet-600 shadow-lg'
                      : 'border-transparent opacity-60 hover:opacity-100',
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Station Title & Badge */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white md:text-4xl">
                {MOCK_STATION.name}
              </h1>
              <Badge className="bg-emerald-500 px-3 py-1 font-bold">Đang hoạt động</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-violet-600" />
                {MOCK_STATION.address}
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-violet-600" />
                Cách đây {MOCK_STATION.distance}
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-slate-900 dark:text-white">{MOCK_STATION.rating}</span>
                <span className="text-slate-400">({MOCK_STATION.reviews} đánh giá)</span>
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="h-12 w-full justify-start gap-8 rounded-none border-b border-slate-200 bg-transparent p-0 dark:border-slate-800">
              {[
                { value: 'overview', label: 'Tổng quan', icon: Info },
                { value: 'chargers', label: 'Slot & Giá', icon: DollarSign },
                { value: 'reviews', label: 'Đánh giá', icon: MessageSquare },
                { value: 'amenities', label: 'Tiện ích', icon: UtilityPole },
                { value: 'activity', label: 'Hoạt động', icon: Activity },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="h-12 gap-2 rounded-none border-b-2 border-transparent px-0 font-bold text-slate-500 data-[state=active]:border-violet-600 data-[state=active]:bg-transparent data-[state=active]:text-violet-600"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="animate-in fade-in pt-6 duration-300">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                  {MOCK_STATION.description}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {MOCK_STATION.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <item.icon className="h-6 w-6 text-violet-600" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="chargers" className="space-y-4 pt-6">
              {MOCK_STATION.chargers.map((charger) => (
                <div
                  key={charger.id}
                  className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30">
                      <Zap className="h-6 w-6 fill-current text-violet-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white">
                        {charger.type} - {charger.power}
                      </h4>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={cn(
                            'text-xs font-bold',
                            charger.available > 0 ? 'text-emerald-500' : 'text-red-500',
                          )}
                        >
                          {charger.available} available
                        </span>
                        <span className="text-[10px] font-bold uppercase text-slate-400">
                          • {charger.total} total slots
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-violet-600">{charger.price}/kWh</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 rounded-lg border-violet-200 font-bold text-violet-600 hover:bg-violet-50"
                    >
                      Đặt chỗ trước
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <p className="py-12 text-center font-medium text-slate-500">
                Đang tải đánh giá từ người dùng...
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Booking Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-32 rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Giá tham khảo
              </span>
              <span className="text-2xl font-black text-violet-600">{MOCK_STATION.price}</span>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
                <Clock className="h-5 w-5 text-violet-600" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">
                    Thời gian chờ dự kiến
                  </p>
                  <p className="text-sm font-bold text-emerald-500">Sẵn sàng ngay lập tức</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
                <DollarSign className="h-5 w-5 text-violet-600" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Phí đặt chỗ</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Miễn phí (Thành viên Plus)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="h-14 w-full rounded-2xl bg-violet-600 text-lg font-black tracking-tight shadow-xl shadow-violet-500/20 hover:bg-violet-700">
                SẠC NGAY
              </Button>
              <Button
                variant="outline"
                className="h-14 w-full gap-2 rounded-2xl border-2 border-slate-200 font-bold dark:border-slate-800"
              >
                <Navigation className="h-5 w-5" /> CHỈ ĐƯỜNG
              </Button>
            </div>

            <p className="mt-6 px-4 text-center text-[10px] font-medium uppercase leading-relaxed text-slate-400">
              Đảm bảo tuân thủ quy định đỗ xe và hướng dẫn an toàn tại trạm sạc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
