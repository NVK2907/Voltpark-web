import { useState } from 'react';

import { SlotCell } from './SlotCell';

import { Button } from '@/shared/components/ui/button';
import type { ParkingSlot } from '@/types';

interface SlotMapGridProps {
  slots: ParkingSlot[];
}

export function SlotMapGrid({ slots }: SlotMapGridProps) {
  const [filter, setFilter] = useState<'all' | 'chargers' | 'available' | 'charging'>('all');
  const [zone, setZone] = useState<string>('all');

  const zones = ['all', ...Array.from(new Set(slots.map((s) => s.zone)))].sort();

  const filteredSlots = slots.filter((s) => {
    if (zone !== 'all' && s.zone !== zone) return false;
    if (filter === 'chargers' && !s.hasCharger) return false;
    if (filter === 'available' && s.status !== 'available') return false;
    if (filter === 'charging' && s.status !== 'charging') return false;
    return true;
  });

  const groupedSlots = filteredSlots.reduce(
    (acc, slot) => {
      if (!acc[slot.zone]) acc[slot.zone] = [];
      acc[slot.zone]!.push(slot);
      return acc;
    },
    {} as Record<string, ParkingSlot[]>,
  );

  const handleSlotClick = (slot: ParkingSlot) => {
    // TBD: Open drawer
    console.log('Slot clicked', slot);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-4 rounded-lg bg-muted/30 p-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Tất cả
          </Button>
          <Button
            variant={filter === 'chargers' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('chargers')}
          >
            Chỉ có sạc
          </Button>
          <Button
            variant={filter === 'available' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('available')}
          >
            Trống
          </Button>
          <Button
            variant={filter === 'charging' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('charging')}
          >
            Đang sạc
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {zones.map((z) => (
            <Button
              key={z}
              variant={zone === z ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setZone(z)}
            >
              {z === 'all' ? 'Tất cả Khu' : `Khu ${z}`}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-2 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-emerald-500 bg-emerald-100" /> Sẵn sàng
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-amber-500 bg-amber-100" /> Đang sạc
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-sky-500 bg-sky-100" /> Đã đặt
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-slate-400 bg-slate-200" /> Có xe (không
          sạc)
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-red-500 bg-red-100" /> Lỗi
        </div>
      </div>

      <div className="space-y-8 rounded-lg border bg-card p-6">
        {Object.entries(groupedSlots)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([z, zoneSlots]) => (
            <div key={z}>
              <h4 className="mb-4 text-lg font-bold">Khu {z}</h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {zoneSlots
                  .sort((a, b) => a.number - b.number)
                  .map((slot) => (
                    <SlotCell key={slot.id} slot={slot} onClick={handleSlotClick} />
                  ))}
              </div>
            </div>
          ))}
        {filteredSlots.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            Không có slot nào thỏa mãn bộ lọc.
          </div>
        )}
      </div>
    </div>
  );
}
