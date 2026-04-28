import { useState, useEffect } from 'react';

import { SlotCell } from './SlotCell';

import { MOCK_PARKING_SLOTS } from '@/lib/mock-staff';
import type { ParkingSlot } from '@/types';

interface SlotGridProps {
  onSlotClick?: (slot: ParkingSlot) => void;
}

export function SlotGrid({ onSlotClick }: SlotGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Keyboard navigation placeholder logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;

      const currentIndex = MOCK_PARKING_SLOTS.findIndex((s) => s.id === selectedId);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      const cols = 6; // approximate columns based on desktop view

      switch (e.key) {
        case 'ArrowRight':
          nextIndex = Math.min(currentIndex + 1, MOCK_PARKING_SLOTS.length - 1);
          break;
        case 'ArrowLeft':
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'ArrowDown':
          nextIndex = Math.min(currentIndex + cols, MOCK_PARKING_SLOTS.length - 1);
          break;
        case 'ArrowUp':
          nextIndex = Math.max(currentIndex - cols, 0);
          break;
        case 'Enter':
          e.preventDefault();
          onSlotClick?.(MOCK_PARKING_SLOTS[currentIndex] as ParkingSlot);
          return;
        default:
          return;
      }

      if (nextIndex !== currentIndex) {
        e.preventDefault();
        setSelectedId((MOCK_PARKING_SLOTS[nextIndex] as ParkingSlot).id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, onSlotClick]);

  return (
    <div
      className="grid grid-cols-3 gap-4 outline-none sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      tabIndex={0}
    >
      {MOCK_PARKING_SLOTS.map((slot) => (
        <SlotCell
          key={slot.id}
          slot={slot as any}
          isSelected={selectedId === slot.id}
          onClick={() => {
            setSelectedId(slot.id);
            onSlotClick?.(slot as any);
          }}
          onContextMenu={() => {
            setSelectedId(slot.id);
          }}
        />
      ))}
    </div>
  );
}
