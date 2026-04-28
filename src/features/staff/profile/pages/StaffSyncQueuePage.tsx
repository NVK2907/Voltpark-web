import {
  ArrowLeft,
  RefreshCw,
  WifiOff,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStaffActionQueue } from '@/lib/staff-action-queue';
import { Button } from '@/shared/components/ui/button';

export default function StaffSyncQueuePage() {
  const navigate = useNavigate();
  const { queue, isOnline, removeAction, updateActionStatus } = useStaffActionQueue();
  const [isProcessing, setIsProcessing] = useState(false);

  const failedItems = queue.filter((item) => item.status === 'failed');

  const retryFailed = async () => {
    setIsProcessing(true);
    // Giả lập xử lý
    setTimeout(() => {
      failedItems.forEach((item) => updateActionStatus(item.id, 'synced'));
      setIsProcessing(false);
    }, 1500);
  };

  const clearQueue = () => {
    queue.forEach((item) => removeAction(item.id));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Đồng bộ Offline</h1>
      </div>

      <div
        className={`flex items-center justify-between rounded-lg border p-4 ${isOnline ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}
      >
        <div className="flex items-center gap-3">
          {isOnline ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          ) : (
            <WifiOff className="h-6 w-6 text-red-500" />
          )}
          <div>
            <h3 className={`font-semibold ${isOnline ? 'text-emerald-800' : 'text-red-800'}`}>
              Trạng thái mạng: {isOnline ? 'Đang Online' : 'Mất kết nối'}
            </h3>
            <p className={`text-sm ${isOnline ? 'text-emerald-600' : 'text-red-600'}`}>
              {isOnline
                ? 'Hệ thống sẽ tự động đồng bộ khi có mạng.'
                : 'Các thao tác của bạn sẽ được lưu tạm thời.'}
            </p>
          </div>
        </div>
        <Button
          onClick={retryFailed}
          disabled={!isOnline || isProcessing || failedItems.length === 0}
          className={`${isOnline ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-300'}`}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isProcessing ? 'animate-spin' : ''}`} /> Đồng bộ lỗi
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-slate-900">
        <div className="flex items-center justify-between border-b bg-slate-50 p-4 dark:bg-slate-800">
          <h3 className="font-semibold">Hàng đợi thao tác ({queue.length})</h3>
          {queue.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearQueue}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Xóa tất cả
            </Button>
          )}
        </div>

        {queue.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-700" />
            <p>Không có dữ liệu nào chờ đồng bộ.</p>
          </div>
        ) : (
          <div className="divide-y">
            {queue.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-4">
                <div className="mt-1">
                  {item.status === 'pending' ? (
                    <Clock className="h-5 w-5 text-amber-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">{item.type}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <pre className="mt-2 overflow-x-auto rounded border bg-slate-50 p-2 text-xs text-muted-foreground dark:bg-slate-950">
                    {JSON.stringify(item.payload, null, 2)}
                  </pre>
                  {item.error && (
                    <p className="mt-2 text-xs font-medium text-red-500">Lỗi: {item.error}</p>
                  )}
                </div>
                {item.status === 'failed' && isOnline && (
                  <Button variant="outline" size="sm" onClick={retryFailed}>
                    Thử lại
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
