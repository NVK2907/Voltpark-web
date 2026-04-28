import { ArrowLeft, ArrowRight, Car, CreditCard, Bell, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else navigate('/map');
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="mb-8 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-800'}`}
          />
        ))}
      </div>

      <div className="min-h-[300px]">
        {/* Step 1: Goals */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="mb-2 text-2xl font-bold">Mục tiêu sử dụng của bạn?</h2>
            <p className="mb-6 text-slate-500">Giúp chúng tôi tối ưu hóa trải nghiệm cho bạn.</p>
            <div className="space-y-3">
              {[
                {
                  id: 'personal',
                  title: 'Sử dụng cá nhân',
                  desc: 'Sạc cho xe của tôi và gia đình',
                },
                {
                  id: 'business',
                  title: 'Tài xế dịch vụ',
                  desc: 'Di chuyển liên tục, cần sạc nhanh',
                },
                { id: 'fleet', title: 'Quản lý đội xe', desc: 'Sạc cho nhiều xe của công ty' },
              ].map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-start gap-4 rounded-xl border-2 border-slate-200 p-4 transition-colors hover:border-violet-300 has-[:checked]:border-violet-600 has-[:checked]:bg-violet-50 dark:border-slate-800 dark:hover:border-violet-700 dark:has-[:checked]:bg-violet-900/20"
                >
                  <input
                    type="radio"
                    name="goal"
                    className="mt-1 h-4 w-4 text-violet-600 focus:ring-violet-600"
                    defaultChecked={option.id === 'personal'}
                  />
                  <div>
                    <h3 className="font-bold">{option.title}</h3>
                    <p className="text-sm text-slate-500">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Vehicle */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
              <Car className="h-6 w-6 text-violet-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Xe điện của bạn</h2>
            <p className="mb-6 text-slate-500">
              Chọn loại xe để hệ thống gợi ý trạm sạc có cổng cắm tương thích.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hãng xe</label>
                <select className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                  <option value="vinfast">VinFast</option>
                  <option value="tesla">Tesla</option>
                  <option value="porsche">Porsche</option>
                  <option value="hyundai">Hyundai</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Dòng xe</label>
                <select className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                  <option value="vf8">VF 8</option>
                  <option value="vfe34">VF e34</option>
                  <option value="vf9">VF 9</option>
                  <option value="vf5">VF 5 Plus</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Biển số xe (Tùy chọn)</label>
                <input
                  type="text"
                  placeholder="51F-123.45"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 uppercase outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <CreditCard className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Phương thức thanh toán</h2>
            <p className="mb-6 text-slate-500">
              Liên kết thẻ ngân hàng để thanh toán tự động tiện lợi hơn.
            </p>

            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900/50">
              <div className="mx-auto mb-4 flex h-10 w-16 items-center justify-center rounded-md bg-slate-200 dark:bg-slate-800">
                <CreditCard className="h-6 w-6 text-slate-400" />
              </div>
              <p className="mb-4 text-sm font-medium">Chưa có phương thức thanh toán nào</p>
              <Button variant="outline" className="w-full font-bold">
                Thêm thẻ Visa / Mastercard
              </Button>
            </div>
            <p className="text-center text-xs text-slate-500">
              Bạn có thể thiết lập tính năng này sau trong phần Cài đặt.
            </p>
          </div>
        )}

        {/* Step 4: Notifications & Finish */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 py-6 text-center duration-500">
            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
              <Bell className="h-10 w-10 animate-bounce text-violet-600" />
              <div className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-emerald-500 dark:border-slate-950">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            </div>
            <h2 className="mb-4 text-2xl font-bold">Cho phép gửi thông báo?</h2>
            <p className="mx-auto mb-8 max-w-sm leading-relaxed text-slate-600 dark:text-slate-400">
              EVCharge sẽ gửi thông báo cho bạn khi pin đầy, hóa đơn sạc, hoặc các ưu đãi hấp dẫn
              xung quanh khu vực của bạn.
            </p>

            <div className="flex flex-col gap-3">
              <Button className="h-12 w-full rounded-xl bg-violet-600 font-bold shadow-md hover:bg-violet-700">
                Bật thông báo ngay
              </Button>
              <Button
                variant="ghost"
                className="h-12 w-full font-medium"
                onClick={() => navigate('/map')}
              >
                Để sau
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Nav */}
      <div className="mt-12 flex justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1}
          className={step === 1 ? 'opacity-0' : ''}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
        </Button>
        {step < 4 && (
          <Button
            onClick={handleNext}
            className="rounded-full bg-slate-900 px-8 font-bold text-white dark:bg-white dark:text-slate-900"
          >
            Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
