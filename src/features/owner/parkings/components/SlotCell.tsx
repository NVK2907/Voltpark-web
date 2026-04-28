import { Zap } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ParkingSlot } from '@/types';

interface SlotCellProps {
  slot: ParkingSlot;
  onClick: (slot: ParkingSlot) => void;
}

export function SlotCell({ slot, onClick }: SlotCellProps) {
  const getStatusStyles = () => {
    switch (slot.status) {
      case 'available':
        return 'bg-emerald-100 border-emerald-500 text-emerald-800';
      case 'reserved':
        return 'bg-sky-100 border-sky-500 text-sky-800';
      case 'charging':
        return 'bg-amber-100 border-amber-500 text-amber-800 animate-pulse';
      case 'fault':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'occupied_no_charge':
        return 'bg-slate-200 border-slate-400 text-slate-800';
      default:
        return 'bg-muted border-border';
    }
  };

  return (
    <div
      onClick={() => onClick(slot)}
      className={cn(
        'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-2 transition-transform hover:scale-105 active:scale-95',
        'h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20',
        getStatusStyles(),
      )}
    >
      <span className="text-xs font-bold sm:text-sm">
        {slot.zone}
        {slot.number}
      </span>
      {slot.hasCharger && <Zap className="absolute bottom-1 right-1 mt-1 h-3 w-3 sm:h-4 sm:w-4" />}
    </div>
  );
}
