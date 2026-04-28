import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/shared/components/ui/card';

interface KpiCardProps {
  label: string;
  value: string | React.ReactNode;
  subtext?: string;
  icon: LucideIcon;
  trend?: {
    value: number; // Percentage
    label: string; // e.g. "vs yesterday"
  };
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
  isPulsing?: boolean;
  href?: string;
  className?: string;
}

export function KpiCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  color = 'default',
  isPulsing = false,
  href,
  className,
}: KpiCardProps) {
  const navigate = useNavigate();

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-primary';
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'danger':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getIconContainerStyles = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'danger':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleClick = () => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        href && 'cursor-pointer hover:border-primary/50 hover:shadow-md',
        className,
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className={cn('rounded-full p-2', getIconContainerStyles())}>
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <div className={cn('text-2xl font-bold tabular-nums', getColorClasses())}>
            <span className="flex items-center gap-2">
              {isPulsing && (
                <span className="relative flex h-3 w-3">
                  <span
                    className={cn(
                      'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                      color === 'primary' ? 'bg-primary' : 'bg-success',
                    )}
                  ></span>
                  <span
                    className={cn(
                      'relative inline-flex h-3 w-3 rounded-full',
                      color === 'primary' ? 'bg-primary' : 'bg-success',
                    )}
                  ></span>
                </span>
              )}
              {value}
            </span>
          </div>
        </div>

        {(subtext || trend) && (
          <div className="mt-2 flex items-center text-xs">
            {trend && (
              <span
                className={cn(
                  'mr-2 flex items-center font-medium',
                  trend.value > 0
                    ? 'text-success'
                    : trend.value < 0
                      ? 'text-destructive'
                      : 'text-muted-foreground',
                )}
              >
                {trend.value > 0 ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : trend.value < 0 ? (
                  <TrendingDown className="mr-1 h-3 w-3" />
                ) : (
                  <Minus className="mr-1 h-3 w-3" />
                )}
                {Math.abs(trend.value)}%
              </span>
            )}
            <span className="text-muted-foreground">{trend?.label || subtext}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
