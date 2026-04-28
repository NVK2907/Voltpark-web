import { ArrowLeft, Shield, Download, Trash2, AlertTriangle } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

const TOGGLES = [
  {
    id: 'analytics',
    label: 'Phân tích sử dụng',
    desc: 'Cho phép thu thập dữ liệu ẩn danh để cải thiện ứng dụng',
    enabled: true,
  },
  {
    id: 'personalize',
    label: 'Cá nhân hóa',
    desc: 'Gợi ý trạm sạc và ưu đãi dựa trên lịch sử của bạn',
    enabled: true,
  },
  {
    id: 'marketing',
    label: 'Email marketing',
    desc: 'Nhận email về ưu đãi, sản phẩm và tin tức từ EVCharge',
    enabled: false,
  },
  {
    id: 'thirdparty',
    label: 'Chia sẻ bên thứ ba',
    desc: 'Chia sẻ dữ liệu ẩn danh với đối tác phân tích',
    enabled: false,
  },
];

export default function PrivacyDataPage() {
  const [toggles, setToggles] = React.useState(TOGGLES);
  const toggle = (id: string) =>
    setToggles((ts) => ts.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)));

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-10">
      <div className="flex items-center gap-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Riêng tư & Dữ liệu</h1>
          <p className="font-medium text-slate-500">
            Kiểm soát cách EVCharge sử dụng dữ liệu của bạn.
          </p>
        </div>
      </div>

      {/* Privacy Toggles */}
      <div className="divide-y divide-slate-50 rounded-3xl border border-slate-100 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {toggles.map((t) => (
          <div key={t.id} className="flex items-center gap-5 p-6">
            <div className="flex-1">
              <p className="font-black text-slate-900 dark:text-white">{t.label}</p>
              <p className="mt-0.5 text-xs font-medium leading-snug text-slate-400">{t.desc}</p>
            </div>
            <button
              onClick={() => toggle(t.id)}
              className={cn(
                'relative h-6 w-12 shrink-0 rounded-full transition-colors',
                t.enabled ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700',
              )}
            >
              <div
                className={cn(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
                  t.enabled ? 'right-0.5' : 'left-0.5',
                )}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Data Actions */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
          <Shield className="h-5 w-5 text-violet-600" /> Dữ liệu cá nhân
        </h2>
        <Button
          variant="outline"
          className="h-14 w-full justify-start gap-2 rounded-2xl border-slate-200 px-6 font-bold dark:border-slate-800"
        >
          <Download className="h-5 w-5 text-violet-600" />
          <div className="text-left">
            <p className="font-bold">Tải xuất dữ liệu của tôi</p>
            <p className="text-xs font-normal text-slate-400">
              Nhận bản sao dữ liệu JSON trong 24–48 giờ
            </p>
          </div>
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="space-y-5 rounded-3xl border-2 border-red-200 p-7 dark:border-red-900">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <h2 className="text-lg font-black text-red-600">Vùng nguy hiểm</h2>
        </div>
        <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
          Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu cá nhân, lịch sử sạc, số dư ví và điểm tích
          lũy. Hành động này <span className="font-black text-red-500">không thể hoàn tác</span>.
        </p>
        <Button
          variant="outline"
          className="h-13 w-full gap-2 rounded-2xl border-2 border-red-300 font-bold text-red-500 hover:bg-red-50"
        >
          <Trash2 className="h-5 w-5" /> Xóa tài khoản vĩnh viễn
        </Button>
      </div>
    </div>
  );
}
