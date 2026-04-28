import { ArrowLeft, Check, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function StaffHandoverPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Ghi chú Bàn giao ca</h1>
      </div>

      <div className="rounded-lg border bg-white shadow-sm dark:bg-slate-900">
        <div className="border-b bg-amber-50 p-4 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
            Lưu ý: Các ghi chú này sẽ được hiển thị cho nhân sự ca tiếp theo khi họ bắt đầu ca.
          </p>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Tổng kết tình hình ca</label>
            <div className="space-y-1 rounded-md border bg-slate-50 p-4 font-mono text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-400">
              <p>Ca làm việc: Sáng (06:00 - 14:00)</p>
              <p>Tổng phiên sạc: 42</p>
              <p>Doanh thu tiền mặt (Walk-in): 2,450,000 ₫</p>
              <p className="text-amber-600 dark:text-amber-500">
                Thiết bị lỗi: CHG-005 (Mất kết nối)
              </p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Ghi chú bàn giao <span className="text-red-500">*</span>
            </label>
            <div className="overflow-hidden rounded-md border bg-slate-50 transition-all focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 dark:bg-slate-950">
              <div className="flex gap-1 border-b bg-white p-2 dark:bg-slate-900">
                <Button variant="ghost" size="sm" className="h-8 font-bold">
                  B
                </Button>
                <Button variant="ghost" size="sm" className="h-8 italic">
                  I
                </Button>
                <div className="mx-1 my-auto h-6 w-px bg-slate-200 dark:bg-slate-700" />
                <Button variant="ghost" size="sm" className="h-8">
                  - List
                </Button>
              </div>
              <textarea
                rows={6}
                defaultValue="- Đã bàn giao chìa khóa tủ điện&#10;- Khu vực A còn 2 khách hàng chưa thanh toán tiền mặt&#10;- Chú ý vệ sinh khu vực B lúc 15:00"
                className="w-full resize-none bg-transparent p-4 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Trạng thái công việc cần lưu ý</label>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                <input type="checkbox" className="h-5 w-5 rounded text-violet-600" defaultChecked />
                <span>Đã kiểm tra doanh thu tiền mặt khớp với hệ thống</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                <input type="checkbox" className="h-5 w-5 rounded text-violet-600" defaultChecked />
                <span>Đã bàn giao dụng cụ và thẻ quẹt dự phòng</span>
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Ảnh chụp sổ bàn giao (Nếu có)</label>
            <button className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-muted-foreground transition-colors hover:border-violet-300 hover:bg-slate-50 hover:text-violet-600 dark:hover:bg-slate-800">
              <Camera className="h-6 w-6" />
              <span className="text-sm font-medium">Chụp ảnh sổ bàn giao</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center border-t bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:bg-slate-950 lg:left-64">
        <div className="flex w-full max-w-3xl justify-end gap-3">
          <Button variant="outline" className="h-14 px-6 text-lg font-bold">
            Hủy
          </Button>
          <Button className="h-14 bg-violet-600 px-8 text-lg font-bold shadow-md hover:bg-violet-700">
            <Check className="mr-2 h-5 w-5" /> Lưu & Kết thúc ca
          </Button>
        </div>
      </div>
    </div>
  );
}
