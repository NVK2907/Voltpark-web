import { Play, Square, AlertTriangle, Unlock } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import type { ParkingSlot } from '@/types';

interface SlotDetailDrawerProps {
  slot: ParkingSlot | null;
  onClose: () => void;
}

export function SlotDetailDrawer({ slot, onClose }: SlotDetailDrawerProps) {
  if (!slot) return null;

  return (
    <div className="animate-in slide-in-from-right-8 flex h-full w-full flex-col border-l border-border bg-white duration-200 dark:bg-slate-950">
      <div className="flex shrink-0 items-center justify-between border-b bg-slate-50 p-4 dark:bg-slate-900">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          Chi tiết Slot {slot.zone}
          {slot.number}
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          ✕
        </Button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {/* Status Card */}
        <div className="space-y-3 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Trạng thái</span>
            <span className="font-medium uppercase">{slot.status}</span>
          </div>
          {slot.hasCharger && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bộ sạc</span>
              <span className="font-medium">{slot.chargerId}</span>
            </div>
          )}
          {slot.vehiclePlate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Biển số</span>
              <span className="rounded bg-slate-200 px-2 font-mono dark:bg-slate-700">
                {slot.vehiclePlate}
              </span>
            </div>
          )}
        </div>

        {/* Live Session Info (if charging) */}
        {slot.status === 'charging' && (
          <div className="space-y-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <h4 className="mb-2 font-semibold text-amber-700 dark:text-amber-500">Đang sạc</h4>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Khách hàng</span>
              <span className="font-medium">Anh Tú (091***999)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Điện năng</span>
              <span className="font-medium text-amber-600">14.5 kWh</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Thời gian</span>
              <span className="font-mono">00:45:12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tạm tính</span>
              <span className="font-medium">45,000 ₫</span>
            </div>
          </div>
        )}

        {/* Actions Menu */}
        <div className="space-y-2 border-t pt-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Thao tác
          </h4>

          {slot.status === 'available' && (
            <Button className="w-full justify-start gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Play className="h-4 w-4" /> Bắt đầu sạc (Cmd+N)
            </Button>
          )}

          {slot.status === 'charging' && (
            <Button variant="destructive" className="w-full justify-start gap-2">
              <Square className="h-4 w-4" /> Dừng sạc
            </Button>
          )}

          <Button variant="outline" className="w-full justify-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" /> Báo lỗi thiết bị
          </Button>

          {slot.status !== 'available' && (
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
            >
              <Unlock className="h-4 w-4" /> Giải phóng Slot bắt buộc
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
