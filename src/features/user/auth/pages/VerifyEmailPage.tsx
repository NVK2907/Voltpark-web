import { MailCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    // Giả lập API call
    const timer = setTimeout(() => {
      if (token) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <div className="w-full py-8 text-center">
      {status === 'verifying' && (
        <>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
            <Loader2 className="h-10 w-10 animate-spin text-violet-600" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">Đang xác thực Email...</h2>
          <p className="text-slate-500">
            Vui lòng đợi trong giây lát, hệ thống đang kiểm tra thông tin của bạn.
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <MailCheck className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="mb-4 text-2xl font-bold">Xác thực thành công!</h2>
          <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
            Email của bạn đã được xác nhận. Giờ đây bạn có thể sử dụng đầy đủ các tính năng của
            EVCharge.
          </p>
          <Link to="/onboarding">
            <Button className="h-14 w-full rounded-xl bg-violet-600 text-lg font-bold shadow-md hover:bg-violet-700">
              Thiết lập hồ sơ cá nhân
            </Button>
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <span className="text-4xl font-black text-red-500">!</span>
          </div>
          <h2 className="mb-4 text-2xl font-bold">Liên kết không hợp lệ</h2>
          <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
            Liên kết xác nhận của bạn đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại email
            xác nhận mới.
          </p>
          <Link to="/login">
            <Button variant="outline" className="h-12 w-full rounded-xl font-bold">
              Quay lại đăng nhập
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
