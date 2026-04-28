import { ArrowLeft, Search, Download, Plus, Zap } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const ALL_TX = [
  {
    id: 't1',
    type: 'charge',
    label: 'Sạc xe - Vincom LM81',
    amount: -245500,
    date: '25/04/2024',
    time: '18:45',
  },
  {
    id: 't2',
    type: 'topup',
    label: 'Nạp tiền từ Visa •4242',
    amount: 500000,
    date: '24/04/2024',
    time: '10:12',
  },
  {
    id: 't3',
    type: 'charge',
    label: 'Sạc xe - Giga Mall PVĐ',
    amount: -112000,
    date: '22/04/2024',
    time: '14:30',
  },
  {
    id: 't4',
    type: 'voucher',
    label: 'Hoàn tiền voucher EVNEW10',
    amount: 50000,
    date: '20/04/2024',
    time: '09:00',
  },
  {
    id: 't5',
    type: 'charge',
    label: 'Sạc xe - Vinhomes CP',
    amount: -88500,
    date: '18/04/2024',
    time: '11:20',
  },
  {
    id: 't6',
    type: 'topup',
    label: 'Nạp tiền từ Visa •4242',
    amount: 200000,
    date: '15/04/2024',
    time: '08:00',
  },
];

export default function TransactionsPage() {
  const [search, setSearch] = React.useState('');

  const typeLabel: Record<string, { label: string; color: string }> = {
    charge: { label: 'Sạc xe', color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/20' },
    topup: { label: 'Nạp tiền', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20' },
    voucher: { label: 'Voucher', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/20' },
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6 lg:p-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Link to="/wallet">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Lịch sử giao dịch
            </h1>
            <p className="font-medium text-slate-500">Tất cả giao dịch ví EVCharge của bạn.</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="h-11 gap-2 rounded-xl border-slate-200 font-bold dark:border-slate-800"
        >
          <Download className="h-4 w-4" /> XUẤT CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Tìm giao dịch..."
            className="h-11 rounded-xl border-slate-200 pl-10 dark:border-slate-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          {['Tất cả', 'Sạc xe', 'Nạp tiền', 'Voucher'].map((f, i) => (
            <Button
              key={f}
              variant={i === 0 ? 'default' : 'outline'}
              className={cn(
                'h-11 shrink-0 rounded-full px-5 font-bold',
                i === 0 ? 'bg-violet-600' : 'border-slate-200 dark:border-slate-800',
              )}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-slate-50 overflow-hidden rounded-[32px] border border-slate-100 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {ALL_TX.filter((t) => !search || t.label.toLowerCase().includes(search.toLowerCase())).map(
          (tx) => (
            <div
              key={tx.id}
              className="flex cursor-pointer items-center gap-5 p-5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${typeLabel[tx.type]?.color}`}
              >
                {tx.type === 'topup' ? (
                  <Plus className="h-5 w-5" />
                ) : (
                  <Zap className="h-5 w-5 fill-current" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-slate-900 dark:text-white">{tx.label}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-400">
                  {tx.date} · {tx.time}
                </p>
              </div>
              <Badge
                variant="secondary"
                className={`border-none font-bold ${typeLabel[tx.type]?.color}`}
              >
                {typeLabel[tx.type]?.label}
              </Badge>
              <span
                className={`ml-2 shrink-0 text-lg font-black ${tx.amount > 0 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}
              >
                {tx.amount > 0 ? '+' : ''}
                {tx.amount.toLocaleString('vi-VN')}đ
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
