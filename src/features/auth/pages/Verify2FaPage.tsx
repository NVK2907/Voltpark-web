import { Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

import { AUTH_ROUTES, ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

export function Verify2FaPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const fullCode = code.join('');
    if (fullCode.length < 6) {
      toast.error('Vui lòng nhập đủ 6 số');
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock API
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (fullCode === '123456') resolve(true);
          else reject(new Error('Mã xác thực không hợp lệ'));
        }, 1000);
      });

      toast.success('Xác thực thành công');
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    setCountdown(60);
    toast.info('Đã gửi lại mã xác thực mới');
  };

  return (
    <Card className="border-primary/10 shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="mb-2 text-xl font-bold tracking-tight">Xác thực 2 bước</h2>
          <p className="text-sm text-muted-foreground">
            Nhập mã gồm 6 chữ số từ ứng dụng xác thực của bạn (vd: Google Authenticator). Dùng{' '}
            <span className="rounded bg-muted px-1 font-mono text-foreground">123456</span> để test.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-12 w-10 rounded-md border border-input bg-background text-center text-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 sm:h-14 sm:w-12"
                disabled={isSubmitting}
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || code.join('').length < 6}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xác thực...
              </>
            ) : (
              'Xác nhận'
            )}
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center justify-center gap-4 text-sm">
          <div className="text-muted-foreground">
            Chưa nhận được mã?{' '}
            <button
              onClick={handleResend}
              disabled={countdown > 0}
              className="font-medium text-primary hover:underline disabled:opacity-50 disabled:hover:no-underline"
            >
              {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi lại ngay'}
            </button>
          </div>

          <Link
            to={AUTH_ROUTES.LOGIN}
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
