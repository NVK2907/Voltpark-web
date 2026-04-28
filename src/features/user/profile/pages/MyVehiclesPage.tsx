import { ArrowLeft, Plus, Car, Trash2, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

const VEHICLES = [
  {
    id: 'v1',
    name: 'VinFast VF 8 Plus',
    plate: '51A-123.45',
    year: 2023,
    range: 420,
    connectors: ['CCS2', 'AC Type 2'],
    isDefault: true,
    color: 'from-slate-800 to-slate-900',
  },
];

export default function MyVehiclesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6 lg:p-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Xe của tôi</h1>
            <p className="font-medium text-slate-500">Quản lý xe điện đã đăng ký.</p>
          </div>
        </div>
        <Button className="h-11 gap-2 rounded-2xl bg-violet-600 px-5 font-bold hover:bg-violet-700">
          <Plus className="h-4 w-4" /> Thêm xe
        </Button>
      </div>

      <div className="space-y-5">
        {VEHICLES.map((v) => (
          <div
            key={v.id}
            className="group overflow-hidden rounded-[32px] border border-slate-100 bg-white transition-all hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Car Visual Header */}
            <div className={`bg-gradient-to-r ${v.color} flex items-center justify-between p-8`}>
              <div className="text-white">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/60">
                  Xe điện
                </p>
                <h3 className="text-2xl font-black">{v.name}</h3>
                <p className="mt-1 font-bold text-white/70">
                  {v.plate} · {v.year}
                </p>
              </div>
              <Car className="h-20 w-20 text-white/20" />
            </div>

            <div className="space-y-5 p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800/50">
                  <Zap className="mx-auto mb-1 h-5 w-5 text-violet-600" />
                  <p className="text-lg font-black text-slate-900 dark:text-white">{v.range} km</p>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Phạm vi</p>
                </div>
                {v.connectors.map((c) => (
                  <div
                    key={c}
                    className="rounded-2xl bg-violet-50 p-4 text-center dark:bg-violet-900/10"
                  >
                    <Zap className="mx-auto mb-1 h-5 w-5 fill-current text-violet-600" />
                    <p className="text-sm font-black text-violet-600">{c}</p>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Cổng</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {v.isDefault && (
                    <Badge className="border-none bg-violet-600 font-bold">
                      <Star className="mr-1 h-3 w-3 fill-current" /> Mặc định
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 rounded-xl border-slate-200 font-bold dark:border-slate-700"
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Vehicle CTA */}
      <button className="group w-full rounded-3xl border-2 border-dashed border-slate-200 p-10 text-center transition-all hover:border-violet-300 hover:bg-violet-50/50 dark:border-slate-800">
        <Plus className="mx-auto mb-3 h-10 w-10 text-slate-300 transition-colors group-hover:text-violet-500" />
        <p className="font-black text-slate-400 group-hover:text-violet-600">Thêm xe mới</p>
        <p className="mt-1 text-sm text-slate-400">Đăng ký xe để sạc nhanh hơn</p>
      </button>
    </div>
  );
}
