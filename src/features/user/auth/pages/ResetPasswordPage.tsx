import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  // Password strength logic
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };
  const strength = getPasswordStrength();

  if (isSuccess) {
    return (
      <div className="w-full py-4 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="mb-4 text-2xl font-bold">Mật khẩu đã được thay đổi!</h2>
        <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
          Tài khoản của bạn đã được bảo mật với mật khẩu mới. Bạn có thể đăng nhập ngay bây giờ.
        </p>
        <Link to="/login">
          <Button className="h-12 w-full rounded-xl bg-violet-600 font-bold shadow-md hover:bg-violet-700">
            Đi đến trang Đăng nhập
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Đặt lại mật khẩu</h1>
      <p className="mb-8 text-slate-500">Tạo mật khẩu mới mạnh mẽ cho tài khoản của bạn.</p>

      <form className="space-y-6" onSubmit={handleReset}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Mật khẩu mới
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 outline-none transition-shadow focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-900"
              placeholder="Tạo mật khẩu mạnh"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {/* Password strength indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full ${strength >= 25 ? 'bg-red-500' : ''}`}
                  style={{ width: '25%' }}
                ></div>
                <div
                  className={`h-full ${strength >= 50 ? 'bg-amber-500' : ''}`}
                  style={{ width: '25%' }}
                ></div>
                <div
                  className={`h-full ${strength >= 75 ? 'bg-emerald-400' : ''}`}
                  style={{ width: '25%' }}
                ></div>
                <div
                  className={`h-full ${strength === 100 ? 'bg-emerald-600' : ''}`}
                  style={{ width: '25%' }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 outline-none transition-shadow focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-900"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={strength < 75}
          className="h-12 w-full rounded-xl bg-violet-600 text-base font-bold shadow-md hover:bg-violet-700"
        >
          Lưu mật khẩu mới
        </Button>
      </form>
    </div>
  );
}
