import {
  ArrowLeft,
  Download,
  Share2,
  Zap,
  Plus,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { ALL_TX } from './TransactionsPage';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';

export default function TransactionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tx = ALL_TX.find((t) => t.id === id);

  if (!tx) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-bold">Giao dịch không tồn tại</p>
        <Button variant="link" onClick={() => navigate('/wallet/transactions')}>
          Quay lại lịch sử
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={() => navigate('/wallet/transactions')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Chi tiết giao dịch</h1>
      </div>

      <div className="relative overflow-hidden rounded-[40px] bg-white shadow-2xl dark:bg-slate-900">
        <div className="bg-slate-900 p-10 text-center text-white">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
            {tx.type === 'topup' ? (
              <Plus className="h-8 w-8 text-emerald-400" />
            ) : (
              <Zap className="h-8 w-8 fill-current text-violet-400" />
            )}
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            SỐ TIỀN GIAO DỊCH
          </p>
          <h2 className="mt-2 text-4xl font-black">
            {tx.amount > 0 ? '+' : ''}
            {tx.amount.toLocaleString('vi-VN')}đ
          </h2>
          <Badge className="mt-4 border-none bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30">
            <CheckCircle2 className="h-3.3 w-3.3 mr-1" /> THÀNH CÔNG
          </Badge>
        </div>

        {/* Receipt Details */}
        <CardContent className="space-y-8 p-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Nội dung</p>
              <p className="font-black text-slate-900 dark:text-white">{tx.label}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Thời gian
              </p>
              <p className="font-bold text-slate-900 dark:text-white">
                {tx.time}, {tx.date}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Mã giao dịch
              </p>
              <p className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400">
                #TXN-{tx.id.toUpperCase()}-2024-EV
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Phương thức
              </p>
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <CreditCard className="h-4 w-4" /> Ví EVCharge
              </div>
            </div>
          </div>

          <Separator className="bg-slate-100 dark:bg-slate-800" />

          {tx.type === 'charge' && (
            <div className="space-y-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                Chi tiết phiên sạc
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <Clock className="h-3 w-3" /> THỜI LƯỢNG
                  </p>
                  <p className="font-black">42 phút</p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <Zap className="h-3 w-3" /> NĂNG LƯỢNG
                  </p>
                  <p className="font-black">35.4 kWh</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <MapPin className="h-3 w-3" /> ĐỊA ĐIỂM
                  </p>
                  <p className="font-black">Vincom Landmark 81, Quận Bình Thạnh, TP.HCM</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button className="h-14 flex-1 rounded-2xl bg-slate-100 font-black text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
              <FileText className="mr-2 h-5 w-5" /> HÓA ĐƠN
            </Button>
            <Button variant="outline" className="h-14 w-14 rounded-2xl border-slate-200 p-0">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            className="w-full text-xs font-bold text-slate-400"
            onClick={() => toast.info('Báo cáo giao dịch đã được gửi')}
          >
            Báo cáo giao dịch này?
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
