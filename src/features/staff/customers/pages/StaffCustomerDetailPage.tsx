import { ArrowLeft, Phone, Mail, Plus, MapPin, Zap } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';

export default function StaffCustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTopup, setShowTopup] = useState(false);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-600 dark:bg-violet-900/30">
            N
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nguyễn Văn A</h1>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
                Khách hàng App
              </span>
              <span className="text-xs text-muted-foreground">Tham gia từ 01/2023</span>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <Button
            onClick={() => navigate(STAFF_ROUTES.SESSIONS_NEW)}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Zap className="mr-2 h-4 w-4" /> Bắt đầu sạc
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Contact Info */}
        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Thông tin liên hệ
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-slate-400" />
              <span className="font-medium">0901 234 567</span>
            </div>
            <a
              href="tel:0901234567"
              className="rounded bg-violet-50 px-2 py-1 text-xs font-medium text-violet-600 hover:bg-violet-100 dark:bg-violet-900/20"
            >
              Gọi
            </a>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-slate-400" />
              <span className="font-medium">nguyenvana@gmail.com</span>
            </div>
            <a
              href="mailto:nguyenvana@gmail.com"
              className="rounded bg-violet-50 px-2 py-1 text-xs font-medium text-violet-600 hover:bg-violet-100 dark:bg-violet-900/20"
            >
              Gửi mail
            </a>
          </div>

          <div className="flex items-center justify-between border-t pt-2">
            <span className="text-sm text-muted-foreground">Biển số xe chính</span>
            <span className="rounded bg-slate-100 px-2 py-1 font-mono text-sm font-medium dark:bg-slate-800">
              51F-123.45
            </span>
          </div>
        </div>

        {/* Wallet */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="pointer-events-none absolute right-0 top-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Số dư ví EVCharge
            </h3>
            <p className="text-4xl font-bold tracking-tight text-violet-600 dark:text-violet-400">
              150,000 <span className="text-lg font-medium text-slate-400">₫</span>
            </p>
          </div>

          <Button
            onClick={() => setShowTopup(true)}
            className="mt-6 w-full bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Nạp tiền vào ví
          </Button>
        </div>

        {/* Stats */}
        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Thống kê tại bãi này
          </h3>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="mb-1 text-sm text-muted-foreground">Số phiên sạc</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-muted-foreground">Tổng chi tiêu</p>
              <p className="text-2xl font-bold">840k</p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t pt-4 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> Ghé thăm lần cuối 2 ngày trước
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow-sm dark:bg-slate-900">
        <div className="border-b p-4">
          <h3 className="font-semibold">Lịch sử giao dịch & Phiên sạc</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-muted-foreground dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 font-medium">Thời gian</th>
                <th className="px-4 py-3 font-medium">Loại</th>
                <th className="px-4 py-3 font-medium">Chi tiết</th>
                <th className="px-4 py-3 text-right font-medium">Số tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3 text-muted-foreground">Hôm kia, 14:30</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                    Phiên sạc
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">Slot A2 (12.5 kWh)</td>
                <td className="px-4 py-3 text-right font-medium text-red-600">- 45,000 ₫</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3 text-muted-foreground">01/04/2026</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Nạp tiền
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">Nạp tại quầy (Tiền mặt)</td>
                <td className="px-4 py-3 text-right font-medium text-emerald-600">+ 200,000 ₫</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={showTopup} onOpenChange={setShowTopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nạp tiền vào ví EVCharge</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
              <span className="text-muted-foreground">Khách hàng</span>
              <span className="font-semibold">Nguyễn Văn A</span>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Chọn mệnh giá</label>
              <div className="mb-3 grid grid-cols-3 gap-3">
                {['50,000', '100,000', '200,000', '500,000'].map((amt, i) => (
                  <Button key={i} variant="outline" className="font-mono">
                    {amt}
                  </Button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Hoặc nhập số tiền khác..."
                className="h-10 w-full rounded-md border bg-transparent px-3 font-mono outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Phương thức thanh toán</label>
              <div className="space-y-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50">
                  <input
                    type="radio"
                    name="pay_method"
                    defaultChecked
                    className="text-violet-600"
                  />
                  <span>Tiền mặt</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50">
                  <input type="radio" name="pay_method" className="text-violet-600" />
                  <span>Chuyển khoản QR</span>
                </label>
              </div>
            </div>

            <Button
              className="h-12 w-full bg-violet-600 text-lg font-bold hover:bg-violet-700"
              onClick={() => setShowTopup(false)}
            >
              Xác nhận nạp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
