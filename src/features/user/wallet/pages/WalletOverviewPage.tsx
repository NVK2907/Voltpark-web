import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

const MOCK_TRANSACTIONS = [
  {
    id: 't1',
    type: 'charge',
    label: 'Sạc xe - Vincom LM81',
    amount: -245500,
    date: '25/04',
    time: '18:45',
  },
  {
    id: 't2',
    type: 'topup',
    label: 'Nạp tiền từ Visa •4242',
    amount: 500000,
    date: '24/04',
    time: '10:12',
  },
  {
    id: 't3',
    type: 'charge',
    label: 'Sạc xe - Giga Mall PVĐ',
    amount: -112000,
    date: '22/04',
    time: '14:30',
  },
  {
    id: 't4',
    type: 'voucher',
    label: 'Hoàn tiền voucher EVNEW10',
    amount: 50000,
    date: '20/04',
    time: '09:00',
  },
];

export default function WalletOverviewPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 p-6 lg:p-10">
      {/* Balance Hero */}
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-2xl shadow-violet-500/30 md:p-12">
        <div className="absolute right-0 top-0 opacity-10">
          <Wallet className="-mr-8 -mt-8 h-64 w-64" />
        </div>
        <div className="relative z-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
            Số dư ví EVCharge
          </p>
          <div className="mb-6 flex items-end gap-4">
            <span className="text-6xl font-black tracking-tighter md:text-7xl">540.000</span>
            <span className="pb-2 text-2xl font-bold text-violet-300">đ</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/wallet/topup">
              <Button className="h-12 gap-2 rounded-2xl bg-white px-8 font-black text-violet-700 shadow-xl hover:bg-violet-50">
                <Plus className="h-5 w-5" /> NẠP TIỀN
              </Button>
            </Link>
            <Link to="/wallet/transactions">
              <Button
                variant="ghost"
                className="h-12 gap-2 rounded-2xl border border-white/20 px-8 font-bold text-white hover:bg-white/10"
              >
                LỊCH SỬ <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Spending Insights */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            label: 'Đã chi tháng này',
            value: '357.500đ',
            icon: TrendingDown,
            color: 'text-red-500',
            bg: 'bg-red-50 dark:bg-red-900/10',
          },
          {
            label: 'Phiên sạc tháng này',
            value: '3 phiên',
            icon: Zap,
            color: 'text-violet-500',
            bg: 'bg-violet-50 dark:bg-violet-900/10',
          },
          {
            label: 'Tiết kiệm tháng này',
            value: '2.450.000đ',
            icon: TrendingUp,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50 dark:bg-emerald-900/10',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-5 rounded-3xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div
              className={`h-14 w-14 rounded-2xl ${item.bg} flex shrink-0 items-center justify-center`}
            >
              <item.icon className={`h-7 w-7 ${item.color}`} />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {item.label}
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="rounded-[32px] border border-slate-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-black">Giao dịch gần đây</h2>
          <Link to="/wallet/transactions">
            <Button variant="ghost" className="gap-1 font-bold text-violet-600">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-2xl p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${tx.type === 'topup' ? 'bg-emerald-100 dark:bg-emerald-900/20' : tx.type === 'voucher' ? 'bg-amber-100 dark:bg-amber-900/20' : 'bg-violet-100 dark:bg-violet-900/20'}`}
                >
                  {tx.type === 'topup' ? (
                    <Plus className="h-5 w-5 text-emerald-600" />
                  ) : tx.type === 'voucher' ? (
                    <Zap className="h-5 w-5 text-amber-600" />
                  ) : (
                    <Zap className="h-5 w-5 fill-current text-violet-600" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{tx.label}</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-400">
                    {tx.date} · {tx.time}
                  </p>
                </div>
              </div>
              <span
                className={`text-lg font-black ${tx.amount > 0 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}
              >
                {tx.amount > 0 ? '+' : ''}
                {tx.amount.toLocaleString('vi-VN')}đ
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
