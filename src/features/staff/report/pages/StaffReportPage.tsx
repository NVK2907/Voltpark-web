import { Camera, Mic, MapPin, Send, History, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';

export default function StaffReportPage() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Báo cáo sự cố</h1>
          <p className="mt-1 text-muted-foreground">
            Gửi thông tin sự cố khẩn cấp hoặc yêu cầu bảo trì
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(`${STAFF_ROUTES.REPORT}/history`)}>
          <History className="mr-2 h-4 w-4" /> Lịch sử
        </Button>
      </div>

      <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Loại sự cố <span className="text-red-500">*</span>
          </label>
          <select className="h-12 w-full rounded-md border bg-slate-50 px-4 font-medium outline-none focus:border-violet-500 dark:bg-slate-950">
            <option value="">Chọn phân loại sự cố...</option>
            <option value="hardware">Hỏng hóc thiết bị / Phần cứng</option>
            <option value="network">Mất kết nối mạng</option>
            <option value="software">Lỗi phần mềm / App khách hàng</option>
            <option value="physical">Tai nạn / Va chạm tại bãi</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Vị trí / Thiết bị <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="VD: Slot A2 hoặc Trụ CHG-005"
              className="h-12 flex-1 rounded-md border bg-slate-50 px-4 outline-none focus:border-violet-500 dark:bg-slate-950"
            />
            <Button
              variant="outline"
              className="h-12 border-violet-200 bg-violet-50 px-4 text-violet-600 dark:bg-violet-900/20"
            >
              <MapPin className="mr-2 h-5 w-5" /> Lấy tọa độ GPS
            </Button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Mô tả chi tiết <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Mô tả hiện trạng sự cố..."
            className="w-full resize-none rounded-md border bg-slate-50 p-4 outline-none focus:border-violet-500 dark:bg-slate-950"
          />
        </div>

        <div>
          <label className="mb-2 block flex items-center justify-between text-sm font-medium">
            <span>Ghi âm giọng nói</span>
            <span className="text-xs font-normal text-muted-foreground">Tối đa 2 phút</span>
          </label>
          <div className="flex items-center gap-4 rounded-lg border bg-slate-50 p-4 dark:bg-slate-800">
            <Button
              size="icon"
              className={`h-12 w-12 rounded-full ${isRecording ? 'animate-pulse bg-red-500 hover:bg-red-600' : 'bg-violet-600 hover:bg-violet-700'}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <div className="h-4 w-4 rounded-sm bg-white" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <div className="flex-1">
              {isRecording ? (
                <div>
                  <p className="mb-1 text-sm font-medium text-red-500">Đang ghi âm...</p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full w-1/2 animate-[pulse_1s_infinite] bg-red-500" />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nhấn để bắt đầu ghi âm mô tả sự cố thay vì gõ chữ.
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block flex items-center justify-between text-sm font-medium">
            <span>Hình ảnh đính kèm</span>
            <span className="text-xs font-normal text-muted-foreground">{photos.length}/4 ảnh</span>
          </label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {photos.map((url, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-lg border"
              >
                <img src={url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute right-1 top-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => setPhotos(photos.filter((_, index) => index !== i))}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {photos.length < 4 && (
              <button
                onClick={() =>
                  setPhotos([
                    ...photos,
                    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=200&auto=format&fit=crop',
                  ])
                }
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-muted-foreground transition-colors hover:border-violet-300 hover:bg-slate-50 hover:text-violet-600 dark:hover:bg-slate-800"
              >
                <Camera className="h-6 w-6" />
                <span className="text-xs font-medium">Chụp ảnh</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center border-t bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:bg-slate-950 lg:left-64">
        <div className="w-full max-w-3xl">
          <Button className="h-14 w-full bg-violet-600 text-lg font-bold shadow-md hover:bg-violet-700">
            <Send className="mr-2 h-5 w-5" /> Gửi báo cáo
          </Button>
        </div>
      </div>
    </div>
  );
}
