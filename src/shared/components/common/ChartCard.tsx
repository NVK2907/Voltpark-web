import type * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
  periodSelector?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ChartCard({
  title,
  subtitle,
  children,
  loading,
  periodSelector,
  className,
  contentClassName,
}: ChartCardProps) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </div>
        {periodSelector && <div>{periodSelector}</div>}
      </CardHeader>
      <CardContent className={cn('min-h-[300px] flex-1', contentClassName)}>
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="skeleton h-full min-h-[300px] w-full"></div>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
