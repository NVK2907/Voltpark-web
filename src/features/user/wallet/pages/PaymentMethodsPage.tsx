import { ArrowLeft, CreditCard, Plus, Trash2, Star, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

const MOCK_METHODS = [
  { id: 'm1', type: 'visa', label: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
  {
    id: 'm2',
    type: 'mastercard',
    label: 'Mastercard',
    last4: '8888',
    expiry: '08/25',
    isDefault: false,
  },
];

export default function PaymentMethodsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-12">
      <div className="flex items-center gap-4">
        <Link to="/wallet">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Phương thức thanh toán
          </h1>
          <p className="font-medium text-slate-500">Quản lý thẻ và ví liên kết của bạn.</p>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_METHODS.map((m) => (
          <div
            key={m.id}
            className={cn(
              'flex items-center justify-between rounded-3xl border-2 bg-white p-6 transition-all dark:bg-slate-900',
              m.isDefault
                ? 'border-violet-200 shadow-lg shadow-violet-500/10 dark:border-violet-800'
                : 'border-slate-100 dark:border-slate-800',
            )}
          >
            <div className="flex items-center gap-5">
              <div className="flex h-10 w-16 items-center justify-center rounded-xl bg-slate-900 shadow-lg dark:bg-white">
                <CreditCard className="h-5 w-5 text-white dark:text-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-black text-slate-900 dark:text-white">
                    {m.label} •••• {m.last4}
                  </p>
                  {m.isDefault && (
                    <Badge className="border-none bg-violet-600 px-2 text-[10px] font-bold">
                      MẶC ĐỊNH
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-xs font-bold text-slate-400">Hết hạn {m.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!m.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 rounded-xl font-bold text-violet-600"
                >
                  <Star className="h-4 w-4" /> Đặt mặc định
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="h-16 w-full gap-2 rounded-3xl border-2 border-dashed border-slate-200 font-bold text-slate-500 hover:border-violet-300 hover:text-violet-600 dark:border-slate-800"
      >
        <Plus className="h-5 w-5" /> Thêm thẻ mới
      </Button>

      {/* Auto top-up */}
      <div className="space-y-5 rounded-[32px] border border-slate-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCcw className="h-5 w-5 text-violet-600" />
            <div>
              <p className="font-black">Nạp tiền tự động</p>
              <p className="text-xs font-medium text-slate-500">
                Tự động nạp khi số dư &lt; 100.000đ
              </p>
            </div>
          </div>
          <div className="relative h-6 w-12 cursor-pointer rounded-full bg-violet-600">
            <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pl-8 text-sm">
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">Ngưỡng kích hoạt</p>
            <p className="font-black text-slate-900 dark:text-white">100.000đ</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">Số tiền nạp</p>
            <p className="font-black text-slate-900 dark:text-white">500.000đ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
