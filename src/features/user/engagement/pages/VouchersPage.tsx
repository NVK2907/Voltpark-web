import { Tag, Copy, CheckCircle2, Clock, Gift } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

const MOCK_VOUCHERS = [
  {
    id: 'v1',
    code: 'EVNEW10',
    title: 'Giảm 10% phiên sạc đầu tiên',
    desc: 'Áp dụng cho phiên sạc DC siêu nhanh',
    expiry: '30/06/2024',
    discount: '10%',
    status: 'active',
  },
  {
    id: 'v2',
    code: 'SUMMER50K',
    title: 'Giảm 50.000đ khi nạp từ 200k',
    desc: 'Ưu đãi mùa hè cho thành viên Plus',
    expiry: '31/05/2024',
    discount: '50.000đ',
    status: 'active',
  },
  {
    id: 'v3',
    code: 'EVLOYALTY',
    title: 'Tặng 100 điểm thưởng',
    desc: 'Dành cho thành viên hạng Gold',
    expiry: '15/04/2024',
    discount: '100 pts',
    status: 'expired',
  },
];

function VoucherCard({ v }: { v: (typeof MOCK_VOUCHERS)[0] }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(v.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'flex overflow-hidden rounded-3xl border bg-white transition-all dark:bg-slate-900',
        v.status === 'expired'
          ? 'border-slate-100 opacity-60 dark:border-slate-800'
          : 'border-slate-200 hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-700',
      )}
    >
      {/* Left accent */}
      <div
        className={cn(
          'w-3 shrink-0',
          v.status === 'active' ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700',
        )}
      />
      <div className="flex flex-1 flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
              v.status === 'active'
                ? 'bg-violet-100 dark:bg-violet-900/20'
                : 'bg-slate-100 dark:bg-slate-800',
            )}
          >
            <Gift
              className={cn(
                'h-6 w-6',
                v.status === 'active' ? 'text-violet-600' : 'text-slate-400',
              )}
            />
          </div>
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h3 className="font-black text-slate-900 dark:text-white">{v.title}</h3>
              <Badge
                className={cn(
                  'border-none text-sm font-bold',
                  v.status === 'active' ? 'bg-violet-600' : 'bg-slate-400',
                )}
              >
                -{v.discount}
              </Badge>
            </div>
            <p className="text-sm font-medium text-slate-500">{v.desc}</p>
            <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-400">
              <Clock className="h-3 w-3" /> HSD: {v.expiry}
            </div>
          </div>
        </div>
        {v.status === 'active' && (
          <button
            onClick={copy}
            className="group flex shrink-0 items-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-3 transition-all hover:border-violet-400 dark:border-slate-700 dark:bg-slate-800"
          >
            <span className="font-black tracking-widest text-violet-600">{v.code}</span>
            {copied ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4 text-slate-400 group-hover:text-violet-600" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function VouchersPage() {
  const [redeemCode, setRedeemCode] = React.useState('');

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6 lg:p-10">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black text-slate-900 dark:text-white">
          <Tag className="h-7 w-7 text-violet-600" /> Voucher của tôi
        </h1>
        <p className="mt-1 font-medium text-slate-500">
          Áp dụng voucher khi nạp tiền hoặc thanh toán sạc xe.
        </p>
      </div>

      {/* Redeem Code */}
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 shadow-xl shadow-violet-500/20 md:flex-row md:p-8">
        <Gift className="h-10 w-10 shrink-0 text-white" />
        <div className="w-full flex-1">
          <p className="mb-3 font-black text-white">Nhập mã voucher</p>
          <div className="flex gap-2">
            <Input
              placeholder="VD: EVNEW10"
              className="h-12 rounded-2xl border-white/20 bg-white/10 font-bold text-white placeholder:text-white/50"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
            />
            <Button className="h-12 shrink-0 rounded-2xl bg-white px-6 font-black text-violet-700 hover:bg-violet-50">
              ÁP DỤNG
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active">
        <TabsList className="grid h-12 w-full max-w-sm grid-cols-3 rounded-2xl bg-slate-100 p-1 dark:bg-slate-900">
          <TabsTrigger
            value="active"
            className="rounded-xl font-bold shadow-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
          >
            Khả dụng
          </TabsTrigger>
          <TabsTrigger
            value="used"
            className="rounded-xl font-bold shadow-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
          >
            Đã dùng
          </TabsTrigger>
          <TabsTrigger
            value="expired"
            className="rounded-xl font-bold shadow-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
          >
            Hết hạn
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6 space-y-4">
          {MOCK_VOUCHERS.filter((v) => v.status === 'active').map((v) => (
            <VoucherCard key={v.id} v={v} />
          ))}
        </TabsContent>
        <TabsContent value="used" className="mt-6">
          <div className="py-16 text-center font-medium text-slate-400">
            Chưa có voucher nào đã sử dụng.
          </div>
        </TabsContent>
        <TabsContent value="expired" className="mt-6 space-y-4">
          {MOCK_VOUCHERS.filter((v) => v.status === 'expired').map((v) => (
            <VoucherCard key={v.id} v={v} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
