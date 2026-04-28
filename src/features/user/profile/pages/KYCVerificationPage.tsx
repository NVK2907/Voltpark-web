import { ArrowLeft, Camera, Upload, ShieldCheck } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

const STEPS = [
  { id: 1, title: 'Chọn loại giấy tờ', desc: 'CCCD, Hộ chiếu, hoặc GPLX' },
  { id: 2, title: 'Chụp mặt trước', desc: 'Đặt giấy tờ trên nền phẳng' },
  { id: 3, title: 'Chụp mặt sau', desc: 'Đảm bảo rõ ràng, không bị che' },
  { id: 4, title: 'Selfie xác minh', desc: 'Nhìn thẳng vào camera' },
];

export default function KYCVerificationPage() {
  const [step, setStep] = React.useState(0); // 0 = not started
  const [docType, setDocType] = React.useState('cccd');

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-10">
      <div className="flex items-center gap-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Xác minh danh tính (KYC)
          </h1>
          <p className="font-medium text-slate-500">Xác minh để mở khóa tính năng nâng cao.</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="flex gap-4 rounded-3xl border border-violet-100 bg-violet-50 p-6 dark:border-violet-800 dark:bg-violet-900/10">
        <ShieldCheck className="h-8 w-8 shrink-0 text-violet-600" />
        <div>
          <p className="font-black text-violet-900 dark:text-violet-300">Lợi ích khi xác minh</p>
          <ul className="mt-2 space-y-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            <li>✅ Nâng hạn mức ví lên 50.000.000đ</li>
            <li>✅ Đặt chỗ trước không cần đặt cọc</li>
            <li>✅ Hỗ trợ ưu tiên 24/7</li>
          </ul>
        </div>
      </div>

      {step === 0 ? (
        <div className="space-y-6">
          {/* Document Type */}
          <div className="space-y-3">
            <h2 className="font-black text-slate-900 dark:text-white">Chọn loại giấy tờ</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'cccd', label: 'CCCD / CMND' },
                { id: 'passport', label: 'Hộ chiếu' },
                { id: 'license', label: 'GPLX' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDocType(d.id)}
                  className={cn(
                    'rounded-2xl border-2 py-4 text-sm font-bold transition-all',
                    docType === d.id
                      ? 'border-violet-600 bg-violet-50 text-violet-600 dark:bg-violet-900/10'
                      : 'border-slate-200 text-slate-500 dark:border-slate-800',
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Steps Preview */}
          <div className="space-y-3">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-black text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {s.id}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{s.title}</p>
                  <p className="text-xs text-slate-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setStep(1)}
            className="h-14 w-full rounded-2xl bg-violet-600 text-lg font-black shadow-xl shadow-violet-500/20 hover:bg-violet-700"
          >
            BẮT ĐẦU XÁC MINH
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress */}
          <div className="flex gap-2">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  'h-2 flex-1 rounded-full transition-all',
                  i < step ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-800',
                )}
              />
            ))}
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-100 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-dashed border-violet-300 bg-violet-50 dark:bg-violet-900/10">
              {step === 4 ? (
                <Camera className="h-10 w-10 text-violet-500" />
              ) : (
                <Upload className="h-10 w-10 text-violet-500" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-black">
                Bước {step}: {STEPS[step - 1]?.title}
              </h3>
              <p className="mt-1 font-medium text-slate-500">{STEPS[step - 1]?.desc}</p>
            </div>
            <Button
              className="h-13 w-full rounded-2xl bg-violet-600 font-bold hover:bg-violet-700"
              onClick={() => (step < 4 ? setStep((s) => s + 1) : setStep(0))}
            >
              {step < 4 ? 'CHỤP ẢNH / TẢI LÊN' : 'HOÀN THÀNH'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
