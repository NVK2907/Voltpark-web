import { ArrowLeft, Globe, Moon, Sun, Bell, Zap } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

export default function PreferencesPage() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system');
  const [lang, setLang] = React.useState('vi');
  const [unit, setUnit] = React.useState('km');
  const [notifs, setNotifs] = React.useState({ push: true, email: true, sms: false });

  const toggle = (key: keyof typeof notifs) => setNotifs((n) => ({ ...n, [key]: !n[key] }));

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-10">
      <div className="flex items-center gap-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Tùy chọn</h1>
          <p className="font-medium text-slate-500">Ngôn ngữ, giao diện và thông báo.</p>
        </div>
      </div>

      {/* Appearance */}
      <div className="space-y-5 rounded-3xl border border-slate-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <Sun className="h-5 w-5 text-amber-400" /> Giao diện
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Sáng', icon: Sun },
            { id: 'dark', label: 'Tối', icon: Moon },
            { id: 'system', label: 'Tự động', icon: Globe },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as typeof theme)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl border-2 py-5 text-sm font-bold transition-all',
                theme === t.id
                  ? 'border-violet-600 bg-violet-50 text-violet-600 dark:bg-violet-900/10'
                  : 'border-slate-200 text-slate-500 dark:border-slate-800',
              )}
            >
              <t.icon className="h-5 w-5" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language & Units */}
      <div className="space-y-5 rounded-3xl border border-slate-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <Globe className="h-5 w-5 text-blue-500" /> Ngôn ngữ & Đơn vị
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
              Ngôn ngữ
            </label>
            <div className="flex gap-2">
              {[
                { id: 'vi', label: '🇻🇳 Tiếng Việt' },
                { id: 'en', label: '🇬🇧 English' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLang(l.id)}
                  className={cn(
                    'rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all',
                    lang === l.id
                      ? 'border-violet-600 bg-violet-50 text-violet-600 dark:bg-violet-900/10'
                      : 'border-slate-200 text-slate-500 dark:border-slate-800',
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
              Đơn vị khoảng cách
            </label>
            <div className="flex gap-2">
              {[
                { id: 'km', label: 'Kilômét (km)' },
                { id: 'mi', label: 'Dặm (mi)' },
              ].map((u) => (
                <button
                  key={u.id}
                  onClick={() => setUnit(u.id)}
                  className={cn(
                    'rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all',
                    unit === u.id
                      ? 'border-violet-600 bg-violet-50 text-violet-600 dark:bg-violet-900/10'
                      : 'border-slate-200 text-slate-500 dark:border-slate-800',
                  )}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Prefs */}
      <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <Bell className="h-5 w-5 text-violet-600" /> Thông báo
        </h2>
        {[
          {
            id: 'push' as const,
            label: 'Thông báo đẩy',
            desc: 'Cập nhật sạc, khuyến mãi trên điện thoại',
          },
          { id: 'email' as const, label: 'Email', desc: 'Hóa đơn, tóm tắt hoạt động hàng tuần' },
          { id: 'sms' as const, label: 'SMS', desc: 'OTP và cảnh báo bảo mật quan trọng' },
        ].map((n) => (
          <div key={n.id} className="flex items-center gap-5 py-2">
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white">{n.label}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-400">{n.desc}</p>
            </div>
            <button
              onClick={() => toggle(n.id)}
              className={cn(
                'relative h-6 w-12 shrink-0 rounded-full transition-colors',
                notifs[n.id] ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700',
              )}
            >
              <div
                className={cn(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
                  notifs[n.id] ? 'right-0.5' : 'left-0.5',
                )}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Defaults */}
      <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <Zap className="h-5 w-5 text-amber-500" /> Mặc định sạc
        </h2>
        <div className="flex items-center gap-5 py-2">
          <div className="flex-1">
            <p className="font-bold">Tự động dừng tại 80%</p>
            <p className="mt-0.5 text-xs font-medium text-slate-400">
              Tối ưu tuổi thọ pin theo khuyến cáo nhà sản xuất
            </p>
          </div>
          <button className="relative h-6 w-12 shrink-0 rounded-full bg-violet-600">
            <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
          </button>
        </div>
      </div>

      <Button className="h-14 w-full rounded-2xl bg-violet-600 text-lg font-black shadow-xl shadow-violet-500/20 hover:bg-violet-700">
        LƯU TẤT CẢ THAY ĐỔI
      </Button>
    </div>
  );
}
