import { MapPin } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import type { Station } from '@/types';

interface MapPlaceholderProps {
  stations: Station[];
  className?: string;
  onPinClick?: (stationId: string) => void;
}

export function MapPlaceholder({ stations, className, onPinClick }: MapPlaceholderProps) {
  // Mock bounding box for TP.HCM for relative positioning
  const minLat = 10.7;
  const maxLat = 10.85;
  const minLng = 106.6;
  const maxLng = 106.8;

  const getPinColor = (load: number, status: string) => {
    if (status === 'offline') return 'text-slate-500 fill-slate-200';
    if (status === 'maintenance') return 'text-amber-500 fill-amber-100';
    if (load >= 80) return 'text-destructive fill-destructive/20';
    if (load >= 50) return 'text-warning fill-warning/20';
    return 'text-success fill-success/20';
  };

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-lg border bg-slate-50 dark:bg-slate-900/50',
        className,
      )}
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Map Content */}
      <div className="absolute inset-0 p-4">
        <TooltipProvider>
          {stations.map((station) => {
            // Calculate relative position (0-100%)
            const top = 100 - ((station.coordinates.lat - minLat) / (maxLat - minLat)) * 100;
            const left = ((station.coordinates.lng - minLng) / (maxLng - minLng)) * 100;

            return (
              <Tooltip key={station.id}>
                <TooltipTrigger asChild>
                  <button
                    className="absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110"
                    style={{ top: `${top}%`, left: `${left}%` }}
                    onClick={() => onPinClick?.(station.id)}
                  >
                    <MapPin
                      className={cn(
                        'h-6 w-6 drop-shadow-md',
                        getPinColor(station.loadPercent, station.status),
                      )}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <p className="mb-1 font-semibold">{station.name}</p>
                    <p className="text-xs text-muted-foreground">Tải: {station.loadPercent}%</p>
                    <p className="text-xs text-muted-foreground">
                      Sạc/Trống: {station.activeChargers}/{station.totalSlots}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>

      <div className="pointer-events-none absolute bottom-2 left-2 rounded border bg-background/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur-sm">
        Bản đồ mô phỏng
      </div>
    </div>
  );
}
