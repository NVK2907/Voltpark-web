import { Check, X, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex w-full flex-col pb-24">
      {/* Header */}
      <section className="bg-slate-50 px-4 pb-16 pt-20 text-center dark:bg-slate-950">
        <h1 className="mb-6 text-4xl font-black md:text-5xl">
          Minh bạch, Linh hoạt & <span className="text-violet-600">Tiết kiệm</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-600 dark:text-slate-400">
          Chọn gói cước phù hợp với nhu cầu di chuyển của bạn. Không phí ẩn, không ràng buộc.
        </p>

        <div className="mx-auto inline-flex items-center rounded-full bg-slate-200 p-1 dark:bg-slate-800">
          <button
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${!isAnnual ? 'bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
            onClick={() => setIsAnnual(false)}
          >
            Thanh toán theo tháng
          </button>
          <button
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${isAnnual ? 'bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
            onClick={() => setIsAnnual(true)}
          >
            Thanh toán theo năm{' '}
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              -20%
            </span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Basic */}
          <div className="flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-xl dark:bg-slate-900">
            <h3 className="mb-2 text-xl font-bold">Thành viên Cơ bản</h3>
            <p className="mb-6 h-10 text-sm text-slate-500">
              Phù hợp cho người thỉnh thoảng di chuyển xa.
            </p>
            <div className="mb-6">
              <span className="text-4xl font-black">Miễn phí</span>
            </div>
            <Link to="/signup" className="mt-auto">
              <Button variant="outline" className="h-12 w-full rounded-xl border-2 font-bold">
                Bắt đầu ngay
              </Button>
            </Link>
            <div className="mt-8 space-y-4">
              <FeatureItem text="Giá sạc tiêu chuẩn: 3,858đ/kWh" />
              <FeatureItem text="Bản đồ trạm sạc toàn quốc" />
              <FeatureItem text="Thanh toán qua ví EVCharge" />
              <FeatureItem text="Đặt chỗ trước 30 phút" missing />
              <FeatureItem text="Miễn phí phí lưu bãi quá giờ" missing />
            </div>
          </div>

          {/* Plus */}
          <div className="relative flex transform flex-col rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl dark:bg-slate-800 md:-translate-y-4">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-1 text-sm font-bold uppercase tracking-wider text-white">
              Phổ biến nhất
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">EVCharge Plus</h3>
            <p className="mb-6 h-10 text-sm text-slate-400">
              Lựa chọn tối ưu cho người sử dụng xe điện hàng ngày.
            </p>
            <div className="mb-6 text-white">
              <span className="text-4xl font-black">{isAnnual ? '99.000' : '129.000'}</span>
              <span className="font-medium text-slate-400">đ / {isAnnual ? 'tháng' : 'tháng'}</span>
              {isAnnual && (
                <p className="mt-2 text-xs text-emerald-400">Thanh toán 1.188.000đ mỗi năm</p>
              )}
            </div>
            <Link to="/signup" className="mt-auto">
              <Button className="h-12 w-full rounded-xl bg-violet-500 font-bold text-white hover:bg-violet-600">
                Đăng ký gói Plus
              </Button>
            </Link>
            <div className="mt-8 space-y-4 text-slate-300">
              <FeatureItem text="Giá sạc ưu đãi: 3,500đ/kWh" checked />
              <FeatureItem text="Bản đồ trạm sạc toàn quốc" checked />
              <FeatureItem text="Thanh toán tự động thẻ tín dụng" checked />
              <FeatureItem text="Đặt chỗ trước 12 tiếng" checked />
              <FeatureItem text="Ưu tiên hỗ trợ CSKH 24/7" checked />
            </div>
          </div>

          {/* Pro */}
          <div className="flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-xl dark:bg-slate-900">
            <h3 className="mb-2 text-xl font-bold">EVCharge Pro</h3>
            <p className="mb-6 h-10 text-sm text-slate-500">
              Dành cho tài xế dịch vụ hoặc di chuyển liên tục.
            </p>
            <div className="mb-6">
              <span className="text-4xl font-black">{isAnnual ? '249.000' : '299.000'}</span>
              <span className="font-medium text-slate-500">đ / {isAnnual ? 'tháng' : 'tháng'}</span>
              {isAnnual && (
                <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-500">
                  Thanh toán 2.988.000đ mỗi năm
                </p>
              )}
            </div>
            <Link to="/signup" className="mt-auto">
              <Button
                variant="outline"
                className="h-12 w-full rounded-xl border-2 font-bold hover:bg-slate-50"
              >
                Nâng cấp lên Pro
              </Button>
            </Link>
            <div className="mt-8 space-y-4">
              <FeatureItem text="Giá sạc siêu rẻ: 3,100đ/kWh" />
              <FeatureItem text="Tích lũy điểm x2 mọi giao dịch" />
              <FeatureItem text="Đặt chỗ trước 24 tiếng" />
              <FeatureItem text="Miễn phí lưu bãi 60 phút đầu" />
              <FeatureItem text="Chia sẻ gói cước cho 3 thành viên" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="mx-auto mt-32 max-w-5xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">So sánh chi tiết tính năng</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="border-b-2">
                <th className="w-2/5 px-4 py-4 text-lg font-semibold">Tính năng</th>
                <th className="w-1/5 px-4 py-4 text-center font-semibold">Cơ bản</th>
                <th className="w-1/5 px-4 py-4 text-center font-semibold text-violet-600">Plus</th>
                <th className="w-1/5 px-4 py-4 text-center font-semibold">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-4 font-medium">Giá điện sạc (VNĐ/kWh)</td>
                <td className="px-4 py-4 text-center">3,858đ</td>
                <td className="px-4 py-4 text-center font-bold text-violet-600">3,500đ</td>
                <td className="px-4 py-4 text-center font-bold">3,100đ</td>
              </tr>
              <tr>
                <td className="flex items-center gap-2 px-4 py-4 font-medium">
                  Thời gian giữ chỗ (Booking) <HelpCircle className="h-4 w-4 text-slate-400" />
                </td>
                <td className="px-4 py-4 text-center">Không hỗ trợ</td>
                <td className="px-4 py-4 text-center font-bold text-violet-600">12 giờ</td>
                <td className="px-4 py-4 text-center font-bold">24 giờ</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-medium">Lịch sử sạc & Thống kê</td>
                <td className="px-4 py-4 text-center">
                  <Check className="mx-auto h-5 w-5 text-slate-300" />
                </td>
                <td className="px-4 py-4 text-center">
                  <Check className="mx-auto h-5 w-5 text-violet-500" />
                </td>
                <td className="px-4 py-4 text-center">
                  <Check className="mx-auto h-5 w-5 text-slate-800 dark:text-slate-200" />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-medium">Tích điểm thưởng (Loyalty)</td>
                <td className="px-4 py-4 text-center text-slate-500">x1</td>
                <td className="px-4 py-4 text-center font-bold text-violet-600">x1.5</td>
                <td className="px-4 py-4 text-center font-bold">x2.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({
  text,
  missing = false,
  checked = false,
}: {
  text: string;
  missing?: boolean;
  checked?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 ${missing ? 'text-slate-400 dark:text-slate-600' : ''}`}
    >
      <div className="mt-0.5 shrink-0">
        {missing ? (
          <X className="h-5 w-5 opacity-50" />
        ) : (
          <Check className={`h-5 w-5 ${checked ? 'text-emerald-400' : 'text-emerald-500'}`} />
        )}
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
