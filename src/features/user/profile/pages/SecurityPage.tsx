import {
  ArrowLeft,
  Smartphone,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Key,
  LogOut,
} from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

const SESSIONS = [
  { device: 'Chrome · Windows 11', location: 'TP. Hồ Chí Minh', time: 'Hiện tại', current: true },
  {
    device: 'Safari · iPhone 15 Pro',
    location: 'TP. Hồ Chí Minh',
    time: '2 giờ trước',
    current: false,
  },
  { device: 'Firefox · MacOS', location: 'Hà Nội', time: '3 ngày trước', current: false },
];

const LOGIN_HISTORY = [
  { time: '27/04 18:30', device: 'Chrome · Windows', status: 'success' },
  { time: '26/04 09:10', device: 'Safari · iPhone', status: 'success' },
  { time: '25/04 22:45', device: 'Unknown · Linux', status: 'failed' },
];

export default function SecurityPage() {
  const [twoFAEnabled, setTwoFAEnabled] = React.useState(true);

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6 lg:p-10">
      <div className="flex items-center gap-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Bảo mật tài khoản</h1>
          <p className="font-medium text-slate-500">Quản lý mật khẩu, 2FA và phiên đăng nhập.</p>
        </div>
      </div>

      {/* Change Password */}
      <div className="space-y-5 rounded-3xl border border-slate-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Key className="h-6 w-6 text-violet-600" />
          <h2 className="text-lg font-black">Đổi mật khẩu</h2>
        </div>
        <div className="space-y-3">
          {['Mật khẩu hiện tại', 'Mật khẩu mới', 'Xác nhận mật khẩu mới'].map((label) => (
            <div key={label}>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-500">
                {label}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="h-12 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-950"
              />
            </div>
          ))}
        </div>
        <Button className="h-12 rounded-2xl bg-violet-600 px-8 font-bold hover:bg-violet-700">
          Lưu mật khẩu mới
        </Button>
      </div>

      {/* 2FA */}
      <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="h-6 w-6 text-emerald-500" />
            <div>
              <h2 className="text-lg font-black">Xác thực 2 bước (2FA)</h2>
              <p className="mt-0.5 text-xs font-medium text-slate-400">
                Bảo vệ tài khoản bằng OTP qua ứng dụng Authenticator.
              </p>
            </div>
          </div>
          <button
            onClick={() => setTwoFAEnabled(!twoFAEnabled)}
            className={cn(
              'relative h-7 w-14 rounded-full transition-colors',
              twoFAEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700',
            )}
          >
            <div
              className={cn(
                'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all',
                twoFAEnabled ? 'right-0.5' : 'left-0.5',
              )}
            />
          </button>
        </div>
        {twoFAEnabled && (
          <Badge className="gap-1 border-none bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-900/20">
            <CheckCircle2 className="h-3.5 w-3.5" /> Đang bật · Google Authenticator
          </Badge>
        )}
      </div>

      {/* Active Sessions */}
      <div className="space-y-5 rounded-3xl border border-slate-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <Clock className="h-5 w-5 text-violet-600" /> Phiên đăng nhập hoạt động
        </h2>
        <div className="space-y-3">
          {SESSIONS.map((s, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center justify-between rounded-2xl p-4',
                s.current
                  ? 'border border-violet-100 bg-violet-50 dark:border-violet-800 dark:bg-violet-900/10'
                  : 'bg-slate-50 dark:bg-slate-800/50',
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{s.device}</p>
                  {s.current && (
                    <Badge className="border-none bg-violet-600 text-[10px] font-bold">
                      HIỆN TẠI
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-xs font-medium text-slate-400">
                  {s.location} · {s.time}
                </p>
              </div>
              {!s.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 rounded-xl font-bold text-red-400 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" /> Đăng xuất
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full gap-2 rounded-2xl border-red-200 font-bold text-red-500 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" /> Đăng xuất tất cả phiên khác
        </Button>
      </div>

      {/* Login History */}
      <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <AlertTriangle className="h-5 w-5 text-amber-500" /> Lịch sử đăng nhập gần đây
        </h2>
        <div className="divide-y divide-slate-50 dark:divide-slate-800">
          {LOGIN_HISTORY.map((h, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center justify-between py-3.5',
                h.status === 'failed' && '-mx-4 rounded-xl bg-red-50/50 px-4 dark:bg-red-900/5',
              )}
            >
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{h.device}</p>
                <p className="text-xs text-slate-400">{h.time}</p>
              </div>
              <Badge
                className={
                  h.status === 'success'
                    ? 'border-none bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20'
                    : 'border-none bg-red-100 text-red-700 dark:bg-red-900/20'
                }
              >
                {h.status === 'success' ? 'Thành công' : '⚠ Thất bại'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
