import { ArrowLeft, Check, QrCode } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

export default function StaffNewSessionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const steps = ['Chọn Slot', 'Khách hàng', 'Thanh toán', 'Xác nhận'];

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Phiên sạc mới</h1>
      </div>

      {/* Stepper */}
      <div className="relative flex items-center justify-between before:absolute before:left-0 before:right-0 before:top-1/2 before:-z-10 before:h-0.5 before:-translate-y-1/2 before:bg-slate-200 dark:before:bg-slate-800">
        {steps.map((label, i) => {
          const num = i + 1;
          const isPast = step > num;
          const isCurrent = step === num;
          return (
            <div
              key={label}
              className="flex flex-col items-center gap-2 bg-slate-50 px-2 dark:bg-slate-950"
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  isPast
                    ? 'bg-violet-600 text-white'
                    : isCurrent
                      ? 'bg-violet-600 text-white ring-4 ring-violet-600/20'
                      : 'bg-slate-200 text-slate-500 dark:bg-slate-800',
                )}
              >
                {isPast ? <Check className="h-4 w-4" /> : num}
              </div>
              <span
                className={cn(
                  'text-xs font-medium',
                  isCurrent ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="mb-4 text-lg font-semibold">Chọn điểm sạc</h2>

            <div className="mb-6 flex items-center gap-4">
              <Button
                variant="outline"
                className="h-12 flex-1"
                onClick={() => navigate(STAFF_ROUTES.SCAN)}
              >
                <QrCode className="mr-2 h-5 w-5" /> Quét QR trên trụ sạc
              </Button>
              <div className="text-sm font-medium text-muted-foreground">HOẶC</div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Nhập mã Slot (VD: A1)"
                  className="h-12 w-full rounded-md border bg-transparent px-4 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                Các Slot đang trống (Khu A)
              </p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {['A1', 'A5', 'A6', 'A8'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStep(2)}
                    className="h-16 rounded border bg-slate-50 text-lg font-bold transition-colors hover:border-violet-500 hover:bg-violet-50 dark:bg-slate-800 dark:hover:bg-violet-900/20"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="mb-4 text-lg font-semibold">Thông tin khách hàng</h2>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                variant="outline"
                className="h-16 justify-start px-6 font-semibold"
                onClick={() => setStep(3)}
              >
                Khách có ứng dụng (Quét QR ví)
              </Button>
              <Button
                variant="default"
                className="h-16 justify-start bg-violet-600 px-6 font-semibold hover:bg-violet-700"
                onClick={() => setStep(3)}
              >
                Khách vãng lai (Nhập biển số)
              </Button>
            </div>

            <div className="space-y-4 rounded-lg border bg-slate-50 p-4 dark:bg-slate-800">
              <p className="font-medium">Nhập thông tin vãng lai</p>
              <input
                type="text"
                placeholder="Biển số xe (Bắt buộc)"
                className="h-10 w-full rounded-md border bg-white px-3 outline-none focus:border-violet-500 dark:bg-slate-950"
              />
              <input
                type="text"
                placeholder="SĐT (Tùy chọn - Để gửi SMS hóa đơn)"
                className="h-10 w-full rounded-md border bg-white px-3 outline-none focus:border-violet-500 dark:bg-slate-950"
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(3)} className="bg-violet-600">
                Tiếp tục
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="mb-4 text-lg font-semibold">Phương thức thanh toán</h2>
            <div className="space-y-3">
              {[
                'Thanh toán tiền mặt',
                'Quét mã QR chuyển khoản (Mã VNPay)',
                'Trừ vào ví (Yêu cầu tài khoản)',
              ].map((method, i) => (
                <label
                  key={i}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <input
                    type="radio"
                    name="payment"
                    className="h-4 w-4 text-violet-600"
                    defaultChecked={i === 0}
                  />
                  <span className="font-medium">{method}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(4)} className="bg-violet-600">
                Tiếp tục
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="mb-4 text-lg font-semibold">Xác nhận thông tin</h2>
            <div className="space-y-4 rounded-lg border bg-slate-50 p-6 dark:bg-slate-800">
              <div className="flex justify-between border-b pb-4">
                <span className="text-muted-foreground">Slot / Bộ sạc</span>
                <span className="font-bold">A1 / CHG-001</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-muted-foreground">Khách hàng</span>
                <span className="font-bold">Vãng lai (51H-123.45)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Thanh toán</span>
                <span className="font-bold">Tiền mặt</span>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(3)}>
                Quay lại
              </Button>
              <Button
                className="bg-emerald-600 px-8 font-bold hover:bg-emerald-700"
                onClick={() => navigate(STAFF_ROUTES.SESSIONS)}
              >
                Bắt đầu sạc
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
