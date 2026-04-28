import { STATUS_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';

interface StatusBadgeProps {
  status: string;
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function StatusBadge({ status, size = 'default', className }: StatusBadgeProps) {
  const getStatusStyles = (s: string) => {
    switch (s) {
      case 'online':
      case 'available':
      case 'completed':
      case 'active':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
      case 'charging':
        return 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800';
      case 'fault':
      case 'failed':
      case 'suspended':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'offline':
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
      case 'maintenance':
      case 'pending':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  const label = STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status;
  const isPulsing = status === 'charging';

  return (
    <Badge
      variant="outline"
      className={cn(
        'relative overflow-hidden font-medium',
        getStatusStyles(status),
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'lg' && 'px-3 py-1 text-sm',
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {isPulsing && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
          </span>
        )}
        {label}
      </span>
    </Badge>
  );
}
