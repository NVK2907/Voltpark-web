import { ArrowLeft, Check, QrCode, User, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { STAFF_ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Label } from '@/shared/components/ui/label';
import { WalkInCustomerForm } from '../components/WalkInCustomerForm';

const MOCK_SLOTS = [
  {
    id: 'A1',
    zone: 'A',
    charger: 'CHG-001',
    connectorType: 'CCS2',
    power: '50kW',
    status: 'available',
  },
  {
    id: 'A5',
    zone: 'A',
    charger: 'CHG-005',
    connectorType: 'AC Type 2',
    power: '11kW',
    status: 'available',
  },
  {
    id: 'A6',
    zone: 'A',
    charger: 'CHG-006',
    connectorType: 'CCS2',
    power: '100kW',
    status: 'available',
  },
  {
    id: 'B2',
    zone: 'B',
    charger: 'CHG-012',
    connectorType: 'CHAdeMO',
    power: '44kW',
    status: 'available',
  },
];

export default function StaffNewSessionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const steps = ['Chọn Slot', 'Khách hàng', 'Thanh toán', 'Xác nhận'];

  // Top-level state
  const [selectedSlot, setSelectedSlot] = useState<(typeof MOCK_SLOTS)[0] | null>(null);
  const [customerType, setCustomerType] = useState<'app' | 'walkin' | null>(null);
  const [scannedCustomer, setScannedCustomer] = useState<{
    name: string;
    phone: string;
    wallet: string;
    plate: string;
  } | null>(null);
  const [walkInData, setWalkInData] = useState<{ plate: string; phone?: string } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qr' | 'wallet' | null>(null);

  const handleScanSlot = () => {
    toast.info('Đã quét: Slot A3');
    setSelectedSlot(MOCK_SLOTS[0]);
    setStep(2);
  };

  const handleScanCustomer = () => {
    setScannedCustomer({
      name: 'Trần Thị Hương',
      phone: '0901234567',
      wallet: '285,000đ',
      plate: '51A-123.45',
    });
    setCustomerType('app');
    toast.success('Đã nhận diện khách hàng: Trần Thị Hương');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-black tracking-tight">Phiên sạc mới</h1>
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
                  'text-xs font-bold uppercase tracking-wider',
                  isCurrent ? 'text-violet-600' : 'text-slate-400',
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[450px] rounded-[32px] border bg-white p-8 shadow-sm dark:bg-slate-900">
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Chọn điểm sạc</h2>
              <p className="text-sm font-medium text-slate-500">
                Quét mã QR hoặc chọn thủ công từ danh sách.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button
                variant="outline"
                className="h-14 flex-1 rounded-2xl border-2 border-dashed border-slate-200 font-bold hover:border-violet-300 hover:bg-violet-50/50"
                onClick={handleScanSlot}
              >
                <QrCode className="mr-3 h-5 w-5 text-violet-600" /> Quét QR trên trụ sạc
              </Button>
              <div className="text-xs font-black uppercase tracking-widest text-slate-300">
                Hoặc
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Nhập mã Slot (VD: A1)"
                  className="h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-6 font-bold outline-none transition-all focus:border-violet-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSelectedSlot(MOCK_SLOTS[0]);
                      setStep(2);
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400">
                Các Slot đang trống (Khu A)
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {MOCK_SLOTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSlot(s);
                      setStep(2);
                    }}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all',
                      selectedSlot?.id === s.id
                        ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/10'
                        : 'border-slate-50 bg-slate-50 hover:border-violet-200 hover:bg-white dark:border-slate-800 dark:bg-slate-800/50',
                    )}
                  >
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {s.id}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {s.connectorType}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Thông tin khách hàng
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Xác định danh tính khách hàng để áp dụng ưu đãi và thanh toán.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                variant="outline"
                className={cn(
                  'h-20 justify-start gap-4 rounded-2xl border-2 px-6',
                  customerType === 'app' ? 'border-violet-600 bg-violet-50' : 'border-slate-100',
                )}
                onClick={handleScanCustomer}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <QrCode className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Khách có ứng dụng</p>
                  <p className="text-xs text-slate-500">Quét QR ví từ App người dùng</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className={cn(
                  'h-20 justify-start gap-4 rounded-2xl border-2 px-6',
                  customerType === 'walkin' ? 'border-violet-600 bg-violet-50' : 'border-slate-100',
                )}
                onClick={() => {
                  setCustomerType('walkin');
                  setScannedCustomer(null);
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Plus className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Khách vãng lai</p>
                  <p className="text-xs text-slate-500">Nhập biển số xe thủ công</p>
                </div>
              </Button>
            </div>

            {customerType === 'app' && scannedCustomer && (
              <div className="flex items-center gap-4 rounded-2xl border-2 border-emerald-100 bg-emerald-50/30 p-6 dark:bg-emerald-900/10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-600">
                  {scannedCustomer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-black text-slate-900 dark:text-white">
                    {scannedCustomer.name}
                  </p>
                  <p className="text-sm font-medium text-slate-500">
                    {scannedCustomer.phone} · Biển: {scannedCustomer.plate}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-emerald-600">
                    Số dư ví: {scannedCustomer.wallet}
                  </p>
                </div>
                <Check className="h-6 w-6 text-emerald-500" />
              </div>
            )}

            {customerType === 'walkin' && (
              <WalkInCustomerForm
                onConfirm={(data) => {
                  setWalkInData(data);
                  toast.success(`Đã nhận biển số: ${data.plate}`);
                }}
              />
            )}

            <div className="flex justify-between pt-8">
              <Button variant="ghost" onClick={() => setStep(1)} className="font-bold">
                Quay lại
              </Button>
              <Button
                disabled={!scannedCustomer && !walkInData}
                onClick={() => setStep(3)}
                className="h-12 bg-violet-600 px-8 font-black hover:bg-violet-700"
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Phương thức thanh toán
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Chọn cách thức thanh toán cho phiên sạc này.
              </p>
            </div>

            <RadioGroup
              value={paymentMethod || ''}
              onValueChange={(val) => setPaymentMethod(val as any)}
              className="grid gap-4"
            >
              {[
                { id: 'cash', label: 'Tiền mặt', desc: 'Thanh toán trực tiếp cho nhân viên' },
                { id: 'qr', label: 'Quét mã QR VNPay', desc: 'Sử dụng ứng dụng ngân hàng' },
                {
                  id: 'wallet',
                  label: 'Trừ vào ví EVCharge',
                  desc: 'Yêu cầu tài khoản có ứng dụng',
                  disabled: customerType === 'walkin',
                },
              ].map((m) => (
                <div key={m.id}>
                  <RadioGroupItem
                    value={m.id}
                    id={m.id}
                    className="peer sr-only"
                    disabled={m.disabled}
                  />
                  <Label
                    htmlFor={m.id}
                    className={cn(
                      'flex cursor-pointer items-center justify-between rounded-2xl border-2 p-5 transition-all',
                      paymentMethod === m.id
                        ? 'border-violet-600 bg-violet-50'
                        : m.disabled
                          ? 'cursor-not-allowed border-slate-100 opacity-50 grayscale'
                          : 'border-slate-50 bg-slate-50 hover:border-violet-200',
                    )}
                  >
                    <div>
                      <p className="font-bold">{m.label}</p>
                      <p className="text-xs text-slate-500">{m.desc}</p>
                    </div>
                    {paymentMethod === m.id && <Check className="h-5 w-5 text-violet-600" />}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {paymentMethod === 'qr' && (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-100 p-8 dark:bg-slate-800">
                <div className="mb-3 flex h-32 w-32 items-center justify-center rounded-2xl bg-white p-4 shadow-sm">
                  <QrCode className="h-full w-full text-slate-900" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Quét để thanh toán
                </p>
              </div>
            )}

            <div className="rounded-xl bg-violet-600/5 p-4 text-center">
              <p className="text-sm font-medium text-violet-600">
                Giá ước tính: <span className="font-black">~45,000đ / 30 phút sạc</span>
              </p>
            </div>

            <div className="flex justify-between pt-8">
              <Button variant="ghost" onClick={() => setStep(2)} className="font-bold">
                Quay lại
              </Button>
              <Button
                disabled={!paymentMethod}
                onClick={() => setStep(4)}
                className="h-12 bg-violet-600 px-8 font-black hover:bg-violet-700"
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Xác nhận thông tin
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Kiểm tra kỹ trước khi bắt đầu cấp điện cho xe.
              </p>
            </div>

            <div className="divide-y divide-slate-100 rounded-[32px] border-2 border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex justify-between pb-4">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Slot / Bộ sạc
                </span>
                <span className="font-black text-slate-900 dark:text-white">
                  {selectedSlot?.id} / {selectedSlot?.charger}
                </span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Khách hàng
                </span>
                <span className="font-black text-slate-900 dark:text-white">
                  {scannedCustomer?.name ?? `Vãng lai (${walkInData?.plate})`}
                </span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Cổng sạc
                </span>
                <span className="font-black text-violet-600">
                  {selectedSlot?.connectorType} ({selectedSlot?.power})
                </span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Thanh toán
                </span>
                <span className="font-black text-slate-900 dark:text-white">
                  {paymentMethod === 'cash'
                    ? 'Tiền mặt'
                    : paymentMethod === 'qr'
                      ? 'QR VNPay'
                      : 'Ví điện tử'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-8">
              <Button
                className="h-14 w-full rounded-2xl bg-emerald-600 text-lg font-black shadow-xl shadow-emerald-600/20 hover:bg-emerald-700"
                onClick={() => {
                  toast.success('Phiên sạc đã bắt đầu thành công!');
                  navigate(STAFF_ROUTES.SESSIONS);
                }}
              >
                BẮT ĐẦU SẠC NGAY
              </Button>
              <Button
                variant="ghost"
                onClick={() => setStep(3)}
                className="font-bold text-slate-400"
              >
                Thay đổi phương thức thanh toán
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
