import { DollarSign, Zap, ParkingSquare, Activity, RefreshCw } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { AlertFeed } from '../components/AlertFeed';
import { SessionChart } from '../components/SessionChart';
import { StatusDonut } from '../components/StatusDonut';

import { ROUTES } from '@/lib/constants';
import { MOCK_STATIONS } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';
import { KpiCard } from '@/shared/components/common/KpiCard';
import { MapPlaceholder } from '@/shared/components/common/MapPlaceholder';
import { Button } from '@/shared/components/ui/button';
import { useRealtime } from '@/shared/hooks/useRealtime';

export function DashboardPage() {
  const { data, forceUpdate } = useRealtime();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setIsRefreshing(true);
    forceUpdate();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const getHealthColor = (percent: number) => {
    if (percent >= 90) return 'success';
    if (percent >= 70) return 'warning';
    return 'danger';
  };

  return (
    <div className="animate-fade-in space-y-6 pb-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tổng quan hệ thống</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Cập nhật lần cuối: {new Date(data.lastUpdated).toLocaleTimeString()}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-full sm:w-auto"
        >
          <RefreshCw className={cn('mr-2 h-4 w-4', isRefreshing && 'animate-spin')} />
          Làm mới
        </Button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Doanh thu hôm nay"
          value={formatCurrency(data.kpis.revenue)}
          icon={DollarSign}
          trend={{ value: 12.4, label: 'so với hôm qua' }}
          color="primary"
          href={ROUTES.ANALYTICS}
        />
        <KpiCard
          label="Phiên sạc đang chạy"
          value={data.kpis.activeSessions.toString()}
          icon={Zap}
          isPulsing={data.kpis.activeSessions > 0}
          color="warning"
          href={`${ROUTES.CHARGERS}?status=charging`}
        />
        <KpiCard
          label="Sử dụng trạm (Slots)"
          value={`${data.kpis.occupancyPercent}%`}
          subtext="Tỉ lệ lấp đầy hiện tại"
          icon={ParkingSquare}
          color="default"
          href={ROUTES.STATIONS}
        />
        <KpiCard
          label="Sức khỏe hệ thống"
          value={`${data.kpis.healthPercent}%`}
          icon={Activity}
          color={getHealthColor(data.kpis.healthPercent)}
          href={ROUTES.ALERTS}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-7">
        <div className="h-[350px] md:col-span-4 lg:col-span-5">
          <SessionChart />
        </div>
        <div className="h-[350px] md:col-span-3 lg:col-span-2">
          <StatusDonut statuses={data.chargerStatuses} />
        </div>
      </div>

      {/* Map & Alerts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="h-[400px] overflow-hidden rounded-xl border bg-card p-1 shadow-sm lg:col-span-2">
          <MapPlaceholder
            stations={MOCK_STATIONS}
            onPinClick={(id) => navigate(`${ROUTES.STATIONS}/${id}`)}
          />
        </div>
        <div className="h-[400px]">
          <AlertFeed alerts={data.newAlerts} />
        </div>
      </div>
    </div>
  );
}
