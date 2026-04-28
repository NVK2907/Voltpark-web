import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/map');
  };

  return (
    <div className="w-full">
      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Đăng nhập</h1>
      <p className="mb-8 text-slate-500">Chào mừng bạn quay lại với hệ sinh thái EVCharge.</p>

      <div className="mb-8 flex flex-col gap-4">
        <Button
          variant="outline"
          className="relative h-12 w-full font-medium hover:bg-slate-50 dark:hover:bg-slate-900"
        >
          <svg className="absolute left-4 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Tiếp tục với Google
        </Button>
        <Button
          variant="outline"
          className="relative h-12 w-full font-medium hover:bg-slate-50 dark:hover:bg-slate-900"
        >
          <svg className="absolute left-4 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.87 3.74-.78 1.57.1 2.65.83 3.46 1.95-3.2 1.77-2.6 5.86.54 7.02-.75 1.83-1.6 3.4-2.82 3.98zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.46-3.74 4.25z" />
          </svg>
          Tiếp tục với Apple
        </Button>
      </div>

      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative bg-slate-50 px-4 text-sm text-slate-500 dark:bg-slate-950">
          hoặc đăng nhập bằng email
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 outline-none transition-shadow focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-900"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Mật khẩu
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-violet-600 hover:text-violet-700"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 outline-none transition-shadow focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-900"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-violet-600 text-base font-bold shadow-md hover:bg-violet-700"
        >
          Đăng nhập
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        Chưa có tài khoản?{' '}
        <Link to="/signup" className="font-bold text-violet-600 hover:text-violet-700">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}
