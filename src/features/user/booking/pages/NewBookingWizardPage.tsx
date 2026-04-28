import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Zap,
  CreditCard,
  ShieldCheck,
  Timer,
} from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

export default function NewBookingWizardPage() {
  const [step, setStep] = React.useState(1);
  const [timeLeft, setTimeLeft] = React.useState(600); // 10 minutes
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
      {/* Stepper */}
      <div className="mb-12 w-full max-w-xl">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-1/2 z-0 h-0.5 -translate-y-1/2 bg-slate-200 dark:bg-slate-800" />
          <div
            className="absolute left-0 top-1/2 z-0 h-0.5 -translate-y-1/2 bg-violet-600 transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                'z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                step > i
                  ? 'bg-emerald-500 text-white'
                  : step === i
                    ? 'scale-110 bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                    : 'border-2 border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900',
              )}
            >
              {step > i ? <CheckCircle2 className="h-5 w-5" /> : i}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <span>Chọn trạm</span>
          <span>Thời gian</span>
          <span>Thanh toán</span>
          <span>Xác nhận</span>
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-[40px] border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:p-10">
        {/* Hold Timer */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-violet-100 dark:bg-violet-900/20">
          <div
            className="h-full bg-violet-600 transition-all duration-1000"
            style={{ width: `${(timeLeft / 600) * 100}%` }}
          />
        </div>
        <div className="mb-8 flex justify-end">
          <Badge
            variant="secondary"
            className="gap-2 rounded-xl border-none bg-violet-50 px-3 py-1.5 font-bold text-violet-600 dark:bg-violet-900/20"
          >
            <Timer className="h-4 w-4" />
            Đang giữ chỗ: {formatTime(timeLeft)}
          </Badge>
        </div>

        {/* Step 1: Confirm Station */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="mb-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Xác nhận trạm sạc
            </h2>
            <p className="mb-8 font-medium text-slate-500">
              Vui lòng kiểm tra lại địa điểm bạn muốn đặt chỗ.
            </p>

            <div className="mb-8 rounded-3xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-4 flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
                  <MapPin className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Vincom Center Landmark 81</h4>
                  <p className="mt-1 text-sm font-medium leading-snug text-slate-500">
                    208 Nguyễn Hữu Cảnh, P.22, Bình Thạnh, TP. HCM
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                <Zap className="h-5 w-5 fill-current text-violet-600" />
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase leading-none text-slate-500">
                    Cổng sạc ưu tiên
                  </p>
                  <p className="text-sm font-black">DC SIÊU NHANH (250KW) - Cổng CCS2</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Time & Slot */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="mb-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Chọn khung giờ
            </h2>
            <p className="mb-8 font-medium text-slate-500">Mỗi phiên đặt chỗ tối đa 60 phút.</p>

            <div className="mb-8 grid grid-cols-2 gap-3">
              {['18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00'].map((t) => (
                <button
                  key={t}
                  className={cn(
                    'rounded-2xl border-2 p-4 text-sm font-bold transition-all',
                    t === '18:00 - 19:00'
                      ? 'border-violet-600 bg-violet-50 text-violet-600 shadow-lg dark:bg-violet-900/10'
                      : 'border-slate-100 text-slate-500 hover:border-violet-200 dark:border-slate-800',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 dark:border-amber-900/20 dark:bg-amber-900/10">
              <Clock className="h-5 w-5 text-amber-600" />
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                Vui lòng đến đúng giờ. Sau 15 phút trạm sạc sẽ được mở cho người khác.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Vehicle & Payment */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="mb-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Thanh toán
            </h2>
            <p className="mb-8 font-medium text-slate-500">
              Chi phí sẽ được trừ từ ví hoặc thẻ liên kết.
            </p>

            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between rounded-2xl border-2 border-violet-600 bg-slate-50 p-4 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Ví EVCharge</p>
                    <p className="text-sm font-black">540.000đ</p>
                  </div>
                </div>
                <div className="h-6 w-6 rounded-full border-4 border-violet-600 bg-white" />
              </div>
              <div className="flex items-center justify-between rounded-2xl border-2 border-transparent bg-slate-50 p-4 opacity-60 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Visa •••• 4242</p>
                    <p className="text-sm font-black">Hết hạn 12/26</p>
                  </div>
                </div>
                <div className="h-6 w-6 rounded-full border-2 border-slate-300" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="animate-in fade-in zoom-in-95 text-center duration-500">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
            <h2 className="mb-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Đặt chỗ thành công!
            </h2>
            <p className="mx-auto mb-8 max-w-sm font-medium text-slate-500">
              Lịch hẹn của bạn đã được ghi nhận. Hãy chuẩn bị sẵn sàng cho hành trình của mình.
            </p>

            <div className="mb-8 space-y-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 text-left dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-500">Mã đặt chỗ</span>
                <span className="text-lg font-black text-violet-600">BK-12345</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Thời gian</p>
                  <p className="text-sm font-bold">Hôm nay, 18:30</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Vị trí sạc</p>
                  <p className="text-sm font-bold">Slot L81-04</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          {step < 4 ? (
            <>
              {step > 1 && (
                <Button
                  variant="outline"
                  className="h-14 rounded-2xl border-2 px-8 font-bold"
                  onClick={handleBack}
                >
                  Quay lại
                </Button>
              )}
              <Button
                className="h-14 flex-1 rounded-2xl bg-violet-600 text-lg font-black tracking-tight shadow-xl shadow-violet-500/20 hover:bg-violet-700"
                onClick={handleNext}
              >
                {step === 3 ? 'XÁC NHẬN ĐẶT CHỖ' : 'TIẾP TỤC'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          ) : (
            <div className="flex w-full flex-col gap-3">
              <Button
                className="h-14 w-full rounded-2xl bg-violet-600 text-lg font-black tracking-tight shadow-xl shadow-violet-500/20 hover:bg-violet-700"
                onClick={() => navigate('/bookings')}
              >
                XEM LỊCH ĐẶT CHỖ
              </Button>
              <Button
                variant="ghost"
                className="h-12 w-full font-bold text-slate-500"
                onClick={() => navigate('/map')}
              >
                QUAY LẠI BẢN ĐỒ
              </Button>
            </div>
          )}
        </div>

        {/* Security Badge */}
        {step < 4 && (
          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <ShieldCheck className="h-4 w-4" />
            Giao dịch an toàn được bảo mật bởi EVCharge SSL
          </div>
        )}
      </div>
    </div>
  );
}
