import { ArrowLeft, Clock, CheckCircle, PauseCircle, Camera } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function StaffTaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-muted-foreground">{id}</span>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">
            Checklist vệ sinh giữa ca
          </h1>
        </div>
        <span className="ml-auto rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
          Mức độ Cao
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Main Content */}
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-semibold">Chi tiết công việc</h3>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Thực hiện kiểm tra và vệ sinh sơ bộ các trụ sạc và khu vực xung quanh. Đảm bảo không
              có rác thải cồng kềnh, các dây sạc được cuộn gọn gàng lên giá đỡ.
            </p>
          </div>

          {/* Checklist */}
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Hạng mục kiểm tra</h3>
              <span className="rounded bg-emerald-50 px-2 py-1 text-sm font-medium text-emerald-600">
                1/3 Hoàn tất
              </span>
            </div>

            <div className="mb-6 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: '33%' }}></div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Kiểm tra cuộn dây sạc 10 trụ', checked: true },
                { label: 'Thu gom rác tại thùng rác chính', checked: false },
                { label: 'Lau chùi màn hình LCD bị mờ', checked: false },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${item.checked ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <input
                    type="checkbox"
                    defaultChecked={item.checked}
                    className="mt-0.5 h-5 w-5 rounded text-violet-600 focus:ring-violet-500"
                  />
                  <div className="flex-1">
                    <p
                      className={`font-medium ${item.checked ? 'text-slate-500 line-through' : ''}`}
                    >
                      {item.label}
                    </p>
                    {!item.checked && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-8 gap-2 border border-dashed text-xs text-muted-foreground"
                      >
                        <Camera className="h-3 w-3" /> Chụp ảnh minh chứng
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Thông tin thêm
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Trạng thái</span>
                <span className="text-sm font-medium text-violet-600">Đang thực hiện</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Thời hạn</span>
                <span className="flex items-center gap-1 text-sm font-medium text-red-500">
                  <Clock className="h-3 w-3" /> 14:00 (Sắp hết hạn)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Phân công</span>
                <span className="text-sm font-medium">Bản thân (Tôi)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Người giao</span>
                <span className="text-sm font-medium">Hệ thống auto</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
            <h3 className="mb-4 font-semibold">Lịch sử hoạt động</h3>
            <div className="relative space-y-4 before:absolute before:inset-0 before:ml-[5px] before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              <div className="group relative mb-4 flex items-center">
                <div className="absolute left-[-22px] h-3 w-3 shrink-0 rounded-full border-2 border-white bg-slate-300 shadow" />
                <div className="w-full">
                  <div className="mb-1 text-xs text-muted-foreground">13:10 Hôm nay</div>
                  <div className="text-sm">Bắt đầu thực hiện (Nguyễn Văn An)</div>
                </div>
              </div>
              <div className="group relative mb-4 flex items-center">
                <div className="absolute left-[-22px] h-3 w-3 shrink-0 rounded-full border-2 border-white bg-slate-300 shadow" />
                <div className="w-full">
                  <div className="mb-1 text-xs text-muted-foreground">12:00 Hôm nay</div>
                  <div className="text-sm">Tạo tự động bởi Lịch trực</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center border-t bg-white p-4 dark:bg-slate-950 lg:left-64">
        <div className="flex w-full max-w-7xl justify-end gap-3">
          <Button variant="outline" className="gap-2 px-6">
            <PauseCircle className="h-4 w-4" /> Tạm dừng
          </Button>
          <Button className="gap-2 bg-emerald-600 px-8 hover:bg-emerald-700">
            <CheckCircle className="h-4 w-4" /> Hoàn tất công việc
          </Button>
        </div>
      </div>
    </div>
  );
}
