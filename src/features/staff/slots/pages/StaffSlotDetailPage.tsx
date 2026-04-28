import { ArrowLeft, Play, Square, AlertTriangle, FileText, Settings } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { MOCK_PARKING_SLOTS } from '@/lib/mock-staff';
import { Button } from '@/shared/components/ui/button';

export default function StaffSlotDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const slot = MOCK_PARKING_SLOTS.find((s) => s.id === id) || MOCK_PARKING_SLOTS[0];

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          Chi tiết Slot {slot.zone}
          {slot.number}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-muted-foreground">Trạng thái hiện tại</h2>
                <p className="mt-2 text-3xl font-bold uppercase text-emerald-600 dark:text-emerald-500">
                  {slot.status}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Bộ sạc</p>
                <p className="font-mono text-lg font-medium">{(slot as any).chargerId || 'N/A'}</p>
              </div>
            </div>

            {slot.status === 'charging' && (
              <div className="rounded-lg border bg-slate-50 p-4 dark:bg-slate-800">
                <h3 className="mb-4 font-medium">Phiên sạc hiện tại</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Thời gian</p>
                    <p className="font-mono">01:23:45</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Điện năng</p>
                    <p className="font-semibold text-amber-600">32.4 kWh</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Công suất</p>
                    <p className="font-medium">11.2 kW</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tạm tính</p>
                    <p className="font-medium">105,000 ₫</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg border bg-white shadow-sm dark:bg-slate-900">
            <div className="border-b p-4">
              <h3 className="font-semibold">Lịch sử sạc gần đây</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50 text-muted-foreground dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 font-medium">Mã phiên</th>
                    <th className="px-4 py-3 font-medium">Thời gian</th>
                    <th className="px-4 py-3 font-medium">Khách hàng</th>
                    <th className="px-4 py-3 font-medium">Tiêu thụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-3 font-mono">SS-{100 + i}</td>
                      <td className="px-4 py-3">Hôm qua, 14:30</td>
                      <td className="px-4 py-3">51H-123.45</td>
                      <td className="px-4 py-3 font-medium text-amber-600">{12.5 + i} kWh</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Actions & Maint */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="mb-2 font-semibold">Thao tác nhanh</h3>

            {slot.status === 'available' && (
              <Button className="h-12 w-full justify-start gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Play className="h-5 w-5" /> Bắt đầu sạc
              </Button>
            )}

            {slot.status === 'charging' && (
              <Button variant="destructive" className="h-12 w-full justify-start gap-2">
                <Square className="h-5 w-5" /> Dừng sạc
              </Button>
            )}

            <Button variant="outline" className="h-12 w-full justify-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" /> Báo lỗi thiết bị
            </Button>

            <Button variant="outline" className="h-12 w-full justify-start gap-2">
              <FileText className="h-5 w-5" /> Xem ghi chú bảo trì
            </Button>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="mb-4 font-semibold">Nhật ký sự kiện</h3>
            <div className="relative space-y-4 before:absolute before:inset-0 before:ml-[5px] before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent dark:before:via-slate-700 md:before:mx-auto md:before:translate-x-0">
              {/* Event 1 */}
              <div className="is-active group relative mb-4 flex items-center justify-between md:justify-normal md:odd:flex-row-reverse">
                <div className="absolute left-[-22px] flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2 border-white bg-slate-300 shadow dark:border-slate-900 dark:bg-slate-600 md:left-1/2 md:-translate-x-1/2" />
                <div className="w-full">
                  <div className="mb-1 text-xs text-muted-foreground">08:00 Hôm nay</div>
                  <div className="rounded border bg-slate-50 p-2 text-sm dark:bg-slate-800">
                    Khởi động bộ sạc CHG-003
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
