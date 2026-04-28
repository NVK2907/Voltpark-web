import { Zap, AlertTriangle, Clock } from 'lucide-react';
import type React from 'react';

import { cn } from '@/lib/utils';
import type { ParkingSlot } from '@/types';

interface SlotCellProps {
  slot: ParkingSlot;
  isSelected?: boolean;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export function SlotCell({ slot, isSelected, onClick, onContextMenu }: SlotCellProps) {
  const isAvailable = slot.status === 'available';
  const isCharging = slot.status === 'charging';
  const isReserved = slot.status === 'reserved';
  const isFault = slot.status === 'fault';
  const isOccupied = slot.status === 'occupied_no_charge';

  return (
    <button
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu?.(e);
      }}
      className={cn(
        'relative flex aspect-square min-h-[80px] w-full flex-col items-center justify-center rounded-lg outline-none transition-all focus-visible:ring-2 focus-visible:ring-offset-2',
        'border-2',
        isAvailable &&
          'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400',
        isCharging && 'border-amber-600 bg-amber-500 text-white shadow-md',
        isReserved && 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400',
        isFault && 'border-red-700 bg-red-500 text-white',
        isOccupied && 'border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-400',
        isSelected && 'border-violet-500 ring-2 ring-violet-500 ring-offset-2',
      )}
    >
      {/* Top right icon */}
      <div className="absolute right-1.5 top-1.5 flex gap-1">
        {isCharging && <div className="h-2 w-2 animate-pulse rounded-full bg-white" />}
        {slot.hasCharger && !isFault && !isCharging && <Zap className="h-3.5 w-3.5 opacity-60" />}
        {isFault && <AlertTriangle className="h-4 w-4 text-white" />}
        {isReserved && <Clock className="h-3.5 w-3.5 opacity-60" />}
      </div>

      <div className="flex flex-col items-center gap-1">
        <span
          className={cn(
            'text-2xl font-bold leading-none tracking-tighter',
            isCharging || isFault ? 'text-white' : 'text-foreground',
          )}
        >
          {slot.zone}
          {slot.number}
        </span>

        {slot.vehiclePlate && (
          <span
            className={cn(
              'max-w-full truncate rounded px-1.5 py-0.5 font-mono text-[10px] font-medium',
              isCharging || isFault
                ? 'bg-white/20 text-white'
                : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
            )}
          >
            {slot.vehiclePlate}
          </span>
        )}

        {!slot.vehiclePlate && slot.status === 'available' && (
          <span className="text-[10px] font-medium uppercase tracking-wide opacity-60">Trống</span>
        )}
      </div>
    </button>
  );
}
