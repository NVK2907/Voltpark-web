import { DollarSign, Activity, MapPin, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { OWNER_ROUTES } from '@/lib/constants';
import { MOCK_OWNER } from '@/lib/mock-owner';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function OwnerDashboardPage() {
  const navigate = useNavigate();
  // We'll mock these values directly here for the first iteration
  const netRevenue = 12450000;
  const activeSessionsCount = 8;
  const activeParkingsCount = 3;
  const occupancyRate = 67;
  const pendingPayouts = 145200000;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Xin chào, {MOCK_OWNER.name}</h2>
          <p className="text-muted-foreground">
            Hôm nay là {new Date().toLocaleDateString('vi-VN')}
          </p>
        </div>
      </div>

      {/* Row 1: 4 KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => navigate(OWNER_ROUTES.REVENUE)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu hôm nay (NET)</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(netRevenue)}</div>
            <p className="mt-1 text-xs text-muted-foreground">+8.3% so với hôm qua</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Gross:{' '}
              {formatCurrency(Math.floor(netRevenue / (MOCK_OWNER.revenueSharePercent / 100)))}
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => navigate(`${OWNER_ROUTES.SESSIONS}?status=active`)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phiên sạc đang chạy</CardTitle>
            <Activity className="h-4 w-4 animate-pulse text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSessionsCount} phiên</div>
            <p className="mt-1 text-xs text-muted-foreground">tại {activeParkingsCount} bãi đỗ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ lấp đầy</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full ${occupancyRate < 40 ? 'bg-destructive' : occupancyRate < 70 ? 'bg-warning' : 'bg-success'}`}
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">32 / 48 slot có xe</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => navigate(OWNER_ROUTES.PAYOUTS)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp nhận thanh toán</CardTitle>
            <Wallet className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pendingPayouts)}</div>
            <p className="mt-1 text-xs text-muted-foreground">Dự kiến: 30/04/2026</p>
          </CardContent>
        </Card>
      </div>

      {/* TBD: Row 2, Row 3, Row 4 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 flex items-center justify-center border-dashed bg-muted/20 p-8">
          <p className="text-muted-foreground">Biểu đồ doanh thu NET & Platform Fee (TBD)</p>
        </Card>
        <Card className="col-span-3 flex items-center justify-center border-dashed bg-muted/20 p-8">
          <p className="text-muted-foreground">Biểu đồ Phiên sạc theo bãi (TBD)</p>
        </Card>
      </div>
    </div>
  );
}
