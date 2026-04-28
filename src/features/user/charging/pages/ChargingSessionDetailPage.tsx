import {
  ArrowLeft,
  Download,
  Share2,
  MapPin,
  Zap,
  Clock,
  DollarSign,
  Calendar,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

export default function ChargingSessionDetailPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6 lg:p-12">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Link to="/charging">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Chi tiết phiên sạc
            </h1>
            <p className="font-medium text-slate-500">Mã phiên sạc: {id || 'CS-98765'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 rounded-xl border-slate-200 font-bold dark:border-slate-800"
          >
            <Download className="h-4 w-4" /> Xuất hóa đơn
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Success Hero */}
        <div className="flex flex-col items-center bg-emerald-500 p-8 text-center text-white">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Zap className="h-8 w-8 fill-current text-white" />
          </div>
          <h2 className="mb-2 text-4xl font-black">245.500đ</h2>
          <p className="text-sm font-bold uppercase tracking-widest opacity-80">
            Đã thanh toán qua Ví EVCharge
          </p>
        </div>

        <div className="space-y-10 p-8 md:p-12">
          {/* Station Info */}
          <div className="flex items-start gap-6 border-b border-slate-100 pb-8 dark:border-slate-800">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[24px] border border-slate-100 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=100"
                alt="Station"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold">Vincom Center Landmark 81</h3>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <MapPin className="h-4 w-4 text-violet-600" />
                Bình Thạnh, TP. Hồ Chí Minh
              </div>
              <Badge
                variant="secondary"
                className="mt-3 border-none bg-violet-50 font-bold text-violet-600 dark:bg-violet-900/20"
              >
                SIÊU NHANH DC 250KW
              </Badge>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Thời gian', value: '45 phút', icon: Clock },
              { label: 'Năng lượng', value: '64.2 kWh', icon: Zap },
              { label: 'Ngày sạc', value: '25/04/2024', icon: Calendar },
              { label: 'Pin nạp', value: '15% → 80%', icon: DollarSign },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
                <p className="text-lg font-black text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-4 rounded-[32px] border border-slate-100 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
            <h4 className="mb-2 text-sm font-black uppercase tracking-widest text-slate-500">
              Chi tiết thanh toán
            </h4>
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-slate-600 dark:text-slate-400">
                Giá điện (64.2 kWh x 3,858đ)
              </span>
              <span className="text-slate-900 dark:text-white">247.683đ</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-slate-600 dark:text-slate-400">Phí dịch vụ</span>
              <span className="text-slate-900 dark:text-white">10.000đ</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-emerald-500">
              <span>Ưu đãi thành viên Plus (-5%)</span>
              <span>-12.183đ</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
              <span className="text-lg font-black">Tổng cộng</span>
              <span className="text-2xl font-black text-violet-600">245.500đ</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Button className="h-14 flex-1 gap-2 rounded-2xl bg-violet-600 font-bold hover:bg-violet-700">
              <MessageSquare className="h-5 w-5" /> ĐÁNH GIÁ TRẠM SẠC
            </Button>
            <Button
              variant="outline"
              className="h-14 flex-1 gap-2 rounded-2xl border-2 border-slate-200 font-bold text-slate-600 dark:border-slate-800"
            >
              <AlertTriangle className="h-5 w-5" /> BÁO CÁO SỰ CỐ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
