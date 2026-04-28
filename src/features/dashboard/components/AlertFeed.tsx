import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/lib/constants';
import { AlertItem } from '@/shared/components/common/AlertItem';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';
import type { Alert } from '@/types';

interface AlertFeedProps {
  alerts: Alert[];
}

export function AlertFeed({ alerts }: AlertFeedProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Cảnh báo mới nhất</CardTitle>
          <CardDescription>Cập nhật theo thời gian thực</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to={ROUTES.ALERTS} className="text-primary">
            Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
          {alerts.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Không có cảnh báo nào
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
