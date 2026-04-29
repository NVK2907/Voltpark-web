import { useState } from 'react';
import { toast } from 'sonner';

import { LiveOpsPanel } from '../components/LiveOpsPanel';
import { QuickActionsToolbar } from '../components/QuickActionsToolbar';
import { SlotDetailDrawer } from '../components/SlotDetailDrawer';
import { SlotFilterBar } from '../components/SlotFilterBar';
import { SlotGrid } from '../components/SlotGrid';

import { MOCK_STAFF_CONTEXT } from '@/lib/mock-staff';
import { Button } from '@/shared/components/ui/button';
import type { ParkingSlot } from '@/types';

export default function StaffHomePage() {
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [isClockedIn, setIsClockedIn] = useState(MOCK_STAFF_CONTEXT.isClockedIn);

  return (
    <div className="space-y-6 pb-6">
      {!isClockedIn && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-md border border-yellow-500/20 bg-yellow-500/10 p-4 text-yellow-700 dark:text-yellow-400 sm:flex-row sm:items-center">
          <span className="font-medium">Bạn chưa chấm công vào ca sáng hôm nay.</span>
          <Button
            className="w-full bg-yellow-500 text-white hover:bg-yellow-600 sm:w-auto"
            onClick={() => {
              const now = new Date().toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
              });
              setIsClockedIn(true);
              toast.success(`Đã chấm công vào lúc ${now}`);
            }}
          >
            Chấm công ngay
          </Button>
        </div>
      )}

      {isClockedIn && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-400 sm:flex-row sm:items-center">
          <span className="font-medium">Bạn đã chấm công vào ca sáng.</span>
          <Button
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600 sm:w-auto"
            onClick={() => {
              setIsClockedIn(false);
              toast.info('Đã chấm công ra');
            }}
          >
            ✓ Đã chấm công
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Đang sạc</p>
          <p className="mt-1 text-3xl font-bold text-amber-500">4</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Còn trống</p>
          <p className="mt-1 text-3xl font-bold text-emerald-500">12</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Đang đặt</p>
          <p className="mt-1 text-3xl font-bold text-sky-500">2</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Có lỗi</p>
          <p className="mt-1 text-3xl font-bold text-red-500">1</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        {/* Left Column - Main Grid */}
        <div className="flex min-w-0 flex-1 flex-col">
          <QuickActionsToolbar />

          <div className="relative flex-1 overflow-hidden rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900 md:p-6">
            <SlotFilterBar />
            <SlotGrid onSlotClick={setSelectedSlot} />

            {/* Overlay Drawer */}
            {selectedSlot && (
              <div className="absolute inset-y-0 right-0 z-20 w-full shadow-2xl sm:w-[400px]">
                <SlotDetailDrawer slot={selectedSlot} onClose={() => setSelectedSlot(null)} />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Live Ops Panel */}
        <div className="h-[600px] w-full shrink-0 xl:h-auto xl:w-[350px]">
          <LiveOpsPanel />
        </div>
      </div>
    </div>
  );
}
