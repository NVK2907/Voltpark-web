import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn, formatRelativeTime } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import type { Alert } from '@/types';

interface AlertItemProps {
  alert: Alert;
  onResolve?: (id: string) => void;
  className?: string;
}

export function AlertItem({ alert, onResolve, className }: AlertItemProps) {
  const { t } = useTranslation();

  const isCritical = alert.severity === 'critical';
  const isWarning = alert.severity === 'warning';
  const isResolved = alert.resolved;

  const Icon = isResolved
    ? CheckCircle2
    : isCritical
      ? AlertCircle
      : isWarning
        ? AlertTriangle
        : Info;

  const severityColor = isResolved
    ? 'text-slate-500'
    : isCritical
      ? 'text-destructive'
      : isWarning
        ? 'text-warning'
        : 'text-primary';

  const severityBg = isResolved
    ? 'bg-slate-50 border-slate-200'
    : isCritical
      ? 'bg-destructive/10 border-destructive/20'
      : isWarning
        ? 'bg-warning/10 border-warning/20'
        : 'bg-primary/10 border-primary/20';

  const severityBorderLeft = isResolved
    ? 'border-l-slate-400'
    : isCritical
      ? 'border-l-destructive'
      : isWarning
        ? 'border-l-warning'
        : 'border-l-primary';

  return (
    <div
      className={cn(
        'flex items-start gap-4 rounded-lg border p-4 transition-colors',
        'border-l-4',
        severityBg,
        severityBorderLeft,
        isResolved && 'opacity-75',
        className,
      )}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', severityColor)} />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2">
          <p
            className={cn(
              'truncate text-sm font-medium',
              !isResolved && 'text-foreground',
              isResolved && 'text-muted-foreground line-through',
            )}
          >
            {alert.message}
          </p>
          <span
            className="whitespace-nowrap text-xs text-muted-foreground"
            title={new Date(alert.timestamp).toLocaleString()}
          >
            {formatRelativeTime(alert.timestamp)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded bg-background/50 px-1 font-mono">{alert.deviceId}</span>
          <span>•</span>
          <span className="truncate">{alert.stationName}</span>
        </div>
      </div>

      {!isResolved && onResolve && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 shrink-0 text-xs"
          onClick={() => onResolve(alert.id)}
        >
          Xử lý
        </Button>
      )}
    </div>
  );
}
