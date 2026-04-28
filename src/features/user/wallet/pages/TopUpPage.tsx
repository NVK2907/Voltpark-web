import { ArrowLeft, Zap, CreditCard, Gift, ShieldCheck } from 'lucide-react';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const QUICK_AMOUNTS = [100000, 200000, 500000, 1000000];

export default function TopUpPage() {
  const [amount, setAmount] = React.useState(200000);
  const [voucher, setVoucher] = React.useState('');
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-12">
      <div className="flex items-center gap-4">
        <Link to="/wallet">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Nạp tiền vào ví</h1>
          <p className="font-medium text-slate-500">
            Số dư hiện tại: <span className="font-black text-violet-600">540.000đ</span>
          </p>
        </div>
      </div>

      {/* Quick Amount Chips */}
      <div className="space-y-6 rounded-[32px] border border-slate-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="font-black text-slate-900 dark:text-white">Chọn số tiền</h3>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={cn(
                'rounded-2xl border-2 py-5 text-lg font-black transition-all',
                amount === a
                  ? 'border-violet-600 bg-violet-50 text-violet-600 shadow-lg shadow-violet-500/10 dark:bg-violet-900/10'
                  : 'border-slate-100 text-slate-600 hover:border-violet-200 dark:border-slate-800 dark:text-slate-400',
              )}
            >
              {a.toLocaleString('vi-VN')}đ
            </button>
          ))}
        </div>
        <div className="relative">
          <Input
            type="number"
            placeholder="Nhập số tiền khác..."
            className="h-14 rounded-2xl border-slate-200 bg-slate-50 text-center text-lg font-bold dark:border-slate-800 dark:bg-slate-950"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-400">
            VNĐ
          </span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="font-black text-slate-900 dark:text-white">Phương thức thanh toán</h3>
        {[
          {
            id: 'visa',
            label: 'Visa •••• 4242',
            sub: 'Hết hạn 12/26',
            icon: CreditCard,
            selected: true,
          },
          {
            id: 'momo',
            label: 'Ví MoMo',
            sub: 'Liên kết qua số điện thoại',
            icon: Zap,
            selected: false,
          },
        ].map((m) => (
          <div
            key={m.id}
            className={cn(
              'flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 transition-all',
              m.selected
                ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/10'
                : 'border-slate-100 hover:border-violet-200 dark:border-slate-800',
            )}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
              <m.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold">{m.label}</p>
              <p className="text-xs text-slate-400">{m.sub}</p>
            </div>
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full border-2',
                m.selected ? 'border-violet-600 bg-violet-600' : 'border-slate-300',
              )}
            >
              {m.selected && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>
        ))}
      </div>

      {/* Voucher */}
      <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="flex items-center gap-2 font-black text-slate-900 dark:text-white">
          <Gift className="h-5 w-5 text-amber-500" /> Mã voucher
        </h3>
        <div className="flex gap-2">
          <Input
            placeholder="Nhập mã voucher..."
            className="h-12 rounded-2xl border-slate-200 dark:border-slate-800"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
          <Button variant="outline" className="h-12 rounded-2xl px-6 font-bold">
            ÁP DỤNG
          </Button>
        </div>
      </div>

      {/* Summary & Confirm */}
      <div className="space-y-4">
        <div className="flex justify-between px-2 text-sm font-bold text-slate-500">
          <span>Số tiền nạp</span>
          <span className="text-slate-900 dark:text-white">{amount.toLocaleString('vi-VN')}đ</span>
        </div>
        <Button
          className="h-16 w-full rounded-3xl bg-violet-600 text-xl font-black shadow-2xl shadow-violet-500/20 hover:bg-violet-700"
          onClick={() => navigate('/wallet')}
        >
          XÁC NHẬN NẠP {amount.toLocaleString('vi-VN')}đ
        </Button>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <ShieldCheck className="h-4 w-4" /> Giao dịch được bảo mật SSL 256-bit
        </div>
      </div>
    </div>
  );
}
