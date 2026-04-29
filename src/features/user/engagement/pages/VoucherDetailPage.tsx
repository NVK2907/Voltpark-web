import { ArrowLeft, Gift, Clock, Info, CheckCircle2, Copy, QrCode, Share2 } from 'lucide-react';
import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { MOCK_VOUCHERS } from './VouchersPage';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';

export default function VoucherDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const voucher = MOCK_VOUCHERS.find((v) => v.id === id);

  if (!voucher) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-bold">Voucher không tồn tại</p>
        <Button variant="link" onClick={() => navigate('/vouchers')}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const copyCode = () => {
    navigator.clipboard.writeText(voucher.code);
    setCopied(true);
    toast.success('Đã sao chép mã voucher');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={() => navigate('/vouchers')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Chi tiết ưu đãi</h1>
      </div>

      <div className="relative overflow-hidden rounded-[40px] bg-white shadow-2xl dark:bg-slate-900">
        {/* Ticket Top */}
        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-10 text-white">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <Gift className="h-8 w-8" />
            </div>
            <Badge className="bg-white/20 font-black backdrop-blur-md">
              {voucher.status === 'active' ? 'SẴN SÀNG' : 'HẾT HẠN'}
            </Badge>
          </div>
          <h2 className="mb-2 text-3xl font-black leading-tight">{voucher.title}</h2>
          <p className="font-medium text-white/80">{voucher.desc}</p>
        </div>

        {/* Perforation Line */}
        <div className="relative flex h-8 items-center bg-slate-50 dark:bg-slate-950">
          <div className="absolute -left-4 h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-950" />
          <div className="absolute -right-4 h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-950" />
          <div className="w-full border-t-2 border-dashed border-slate-200 dark:border-slate-800" />
        </div>

        {/* Ticket Bottom */}
        <CardContent className="space-y-8 bg-white p-10 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-6">
            <div className="rounded-[32px] border-8 border-slate-50 bg-white p-6 dark:border-slate-800">
              <QrCode className="h-48 w-48 text-slate-900" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                MÃ ƯU ĐÃI
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
                  {voucher.code}
                </span>
                <button
                  onClick={copyCode}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800"
                >
                  {copied ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-100 dark:bg-slate-800" />

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Clock className="h-3 w-3" /> HẠN SỬ DỤNG
              </p>
              <p className="font-black text-slate-900 dark:text-white">{voucher.expiry}</p>
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Info className="h-3 w-3" /> TRẠNG THÁI
              </p>
              <p className="font-black text-emerald-600">Có thể áp dụng</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-black text-slate-900 dark:text-white">Điều kiện áp dụng</p>
            <ul className="space-y-3">
              {[
                'Áp dụng cho tất cả trạm sạc thuộc hệ thống VoltPark.',
                'Không có giá trị quy đổi thành tiền mặt.',
                'Mỗi khách hàng chỉ được sử dụng tối đa 1 lần.',
                'Voucher tự động hết hạn sau ngày ghi trên thẻ.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-500">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="h-14 flex-1 rounded-2xl bg-violet-600 text-lg font-black shadow-xl shadow-violet-600/20 hover:bg-violet-700">
              SỬ DỤNG NGAY
            </Button>
            <Button variant="outline" className="h-14 w-14 rounded-2xl border-slate-200 p-0">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
