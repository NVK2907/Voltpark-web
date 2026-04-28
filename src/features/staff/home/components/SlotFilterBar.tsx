import { RefreshCw } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

export function SlotFilterBar() {
  const zones = ['Tất cả', 'Khu A', 'Khu B', 'Khu C'];

  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-900">
        {zones.map((zone, i) => (
          <button
            key={zone}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              i === 0
                ? 'bg-white text-foreground shadow-sm dark:bg-slate-800'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {zone}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full border border-emerald-500/50 bg-emerald-500/20" />{' '}
            Trống
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-amber-500" /> Đang sạc
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" /> Lỗi
          </div>
        </div>

        <Button variant="outline" size="sm" className="h-8 gap-2">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>
            Làm mới{' '}
            <kbd className="ml-1 hidden font-mono text-[10px] text-muted-foreground sm:inline-block">
              ⌘R
            </kbd>
          </span>
        </Button>
      </div>
    </div>
  );
}
