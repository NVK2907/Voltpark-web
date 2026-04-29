import {
  Zap,
  ChevronRight,
  ChevronLeft,
  QrCode,
  CheckCircle2,
  AlertCircle,
  BatteryCharging,
  Clock,
  CreditCard,
} from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';

type Step = 'scan' | 'select' | 'confirm';

export default function CheckInPage() {
  const [step, setStep] = React.useState<Step>('scan');
  const [scanning, setScanning] = React.useState(false);
  const [selectedCharger, setSelectedCharger] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setStep('select');
      toast.success('Đã nhận diện trạm sạc: Vincom Landmark 81');
    }, 1500);
  };

  const handleConfirm = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(promise, {
      loading: 'Đang khởi tạo phiên sạc...',
      success: () => {
        navigate('/charging/live');
        return 'Bắt đầu sạc thành công!';
      },
      error: 'Có lỗi xảy ra, vui lòng thử lại.',
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-10">
      {/* Stepper */}
      <div className="flex items-center justify-between px-2">
        {(['scan', 'select', 'confirm'] as Step[]).map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                  step === s
                    ? 'border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : i < ['scan', 'select', 'confirm'].indexOf(step)
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-slate-200 text-slate-400',
                )}
              >
                {i < ['scan', 'select', 'confirm'].indexOf(step) ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-bold">{i + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest',
                  step === s ? 'text-violet-600' : 'text-slate-400',
                )}
              >
                {s === 'scan' ? 'Quét mã' : s === 'select' ? 'Chọn trụ' : 'Xác nhận'}
              </span>
            </div>
            {i < 2 && (
              <div
                className={cn(
                  'h-0.5 flex-1 bg-slate-100 dark:bg-slate-800',
                  i < ['scan', 'select', 'confirm'].indexOf(step) && 'bg-emerald-500',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-12 transition-all duration-500">
        {step === 'scan' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Bắt đầu sạc</h1>
              <p className="font-medium text-slate-500">Quét mã QR trên trụ sạc để tiếp tục</p>
            </div>

            <div className="relative mx-auto h-72 w-72">
              <div className="absolute inset-0 animate-pulse rounded-[40px] bg-violet-600/10" />
              <div className="relative flex h-full w-full items-center justify-center rounded-[40px] border-4 border-dashed border-slate-200 dark:border-slate-800">
                {scanning ? (
                  <div className="space-y-4">
                    <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
                    <p className="text-sm font-bold text-violet-600">Đang nhận diện...</p>
                  </div>
                ) : (
                  <QrCode className="h-32 w-32 text-slate-300" />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="h-14 w-full rounded-2xl bg-violet-600 text-lg font-black shadow-xl shadow-violet-600/20 hover:bg-violet-700"
                onClick={handleScan}
                disabled={scanning}
              >
                {scanning ? 'Vui lòng đợi...' : 'QUÉT MÃ QR'}
              </Button>
              <Button
                variant="ghost"
                className="font-bold text-slate-500"
                onClick={() => setStep('select')}
              >
                Nhập mã trụ thủ công
              </Button>
            </div>
          </div>
        )}

        {step === 'select' && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Chọn trụ sạc tại trạm
              </h1>
              <p className="font-medium text-slate-500">Vincom Center Landmark 81</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'L81-01', type: 'DC Fast 250kW', price: '3.858đ/kWh', status: 'available' },
                { id: 'L81-02', type: 'DC Fast 120kW', price: '3.858đ/kWh', status: 'busy' },
                {
                  id: 'L81-03',
                  type: 'AC Standard 11kW',
                  price: '3.100đ/kWh',
                  status: 'available',
                },
                { id: 'L81-04', type: 'DC Fast 250kW', price: '3.858đ/kWh', status: 'available' },
              ].map((charger) => (
                <Card
                  key={charger.id}
                  className={cn(
                    'cursor-pointer border-2 p-5 transition-all duration-200 hover:shadow-lg',
                    selectedCharger === charger.id
                      ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/10'
                      : 'border-slate-100 hover:border-violet-200 dark:border-slate-800',
                    charger.status === 'busy' && 'pointer-events-none opacity-50',
                  )}
                  onClick={() => setSelectedCharger(charger.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-xl',
                          selectedCharger === charger.id
                            ? 'bg-violet-600 text-white'
                            : 'bg-slate-100 text-slate-400 dark:bg-slate-800',
                        )}
                      >
                        <Zap className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white">{charger.id}</p>
                        <p className="text-xs font-bold text-slate-500">{charger.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-violet-600">{charger.price}</p>
                      <p
                        className={cn(
                          'text-[10px] font-black uppercase tracking-widest',
                          charger.status === 'available' ? 'text-emerald-500' : 'text-slate-400',
                        )}
                      >
                        {charger.status === 'available' ? 'Sẵn sàng' : 'Đang bận'}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="h-14 flex-1 rounded-2xl font-bold"
                onClick={() => setStep('scan')}
              >
                <ChevronLeft className="mr-2 h-5 w-5" /> QUAY LẠI
              </Button>
              <Button
                className="flex-2 h-14 rounded-2xl bg-violet-600 px-8 text-lg font-black hover:bg-violet-700 disabled:opacity-50"
                disabled={!selectedCharger}
                onClick={() => setStep('confirm')}
              >
                TIẾP TỤC <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="animate-in fade-in zoom-in-95 space-y-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Xác nhận phiên sạc
              </h1>
              <p className="font-medium text-slate-500">Kiểm tra thông tin trước khi bắt đầu</p>
            </div>

            <Card className="overflow-hidden rounded-[32px] border-slate-100 shadow-xl dark:border-slate-800">
              <div className="bg-slate-900 p-8 text-white">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
                      <Zap className="h-5 w-5 fill-current" />
                    </div>
                    <span className="font-bold">Trụ sạc {selectedCharger}</span>
                  </div>
                  <Badge className="bg-emerald-500 font-black">ƯU TIÊN</Badge>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black">3.858đ</span>
                  <span className="pb-1 text-sm font-bold text-slate-400">/ kWh</span>
                </div>
              </div>

              <div className="space-y-6 p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <BatteryCharging className="h-3 w-3" /> Công suất tối đa
                    </p>
                    <p className="font-black">250.0 kW</p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <Clock className="h-3 w-3" /> Thời gian dự kiến
                    </p>
                    <p className="font-black">45 - 60 phút</p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <CreditCard className="h-3 w-3" /> Phương thức
                    </p>
                    <p className="font-black">Ví EVCharge</p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <AlertCircle className="h-3 w-3" /> Số dư ví
                    </p>
                    <p className="font-black text-emerald-600">540.000đ</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-900/10">
                  <p className="text-xs font-bold leading-relaxed text-amber-700 dark:text-amber-400">
                    * Phiên sạc sẽ tự động dừng khi số dư ví còn dưới 10.000đ hoặc pin đạt 100%.
                  </p>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    variant="ghost"
                    className="h-14 flex-1 rounded-2xl font-bold text-slate-500"
                    onClick={() => setStep('select')}
                  >
                    THAY ĐỔI
                  </Button>
                  <Button
                    className="h-14 flex-[2] rounded-2xl bg-emerald-500 text-lg font-black text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-600"
                    onClick={handleConfirm}
                  >
                    BẮT ĐẦU SẠC NGAY
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
