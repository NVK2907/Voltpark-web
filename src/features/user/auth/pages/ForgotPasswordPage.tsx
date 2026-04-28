import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="w-full">
      <Link
        to="/login"
        className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-violet-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại đăng nhập
      </Link>

      {!isSent ? (
        <>
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
            <KeyRound className="h-6 w-6 text-violet-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Quên mật khẩu?</h1>
          <p className="mb-8 text-slate-500">
            Đừng lo lắng! Vui lòng nhập địa chỉ email đã đăng ký của bạn và chúng tôi sẽ gửi liên
            kết đặt lại mật khẩu.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
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

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-violet-600 text-base font-bold shadow-md hover:bg-violet-700"
            >
              Gửi liên kết đặt lại
            </Button>
          </form>
        </>
      ) : (
        <div className="py-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <Mail className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">Kiểm tra hộp thư của bạn</h2>
          <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
            Chúng tôi đã gửi một liên kết đặt lại mật khẩu an toàn đến email của bạn. Vui lòng làm
            theo hướng dẫn trong email.
          </p>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="h-12 w-full rounded-xl font-bold"
              onClick={() => setIsSent(false)}
            >
              Nhập lại email khác
            </Button>
            <p className="text-sm text-slate-500">
              Không nhận được email?{' '}
              <button className="font-bold text-violet-600 hover:underline">Gửi lại ngay</button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
