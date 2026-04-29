import { Edit, MapPin, Clock, Power } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

import { ROUTES } from '@/lib/constants';
import { MOCK_STATIONS, MOCK_CHARGERS, MOCK_REVENUE_DATA } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';
import { ChartCard } from '@/shared/components/common/ChartCard';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useConfirm } from '@/shared/hooks/useConfirm';
import { EditStationSheet } from '../components/EditStationSheet';

export function StationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { confirm } = useConfirm();

  const [station, setStation] = useState(() => MOCK_STATIONS.find((s) => s.id === id) ?? null);
  const [editOpen, setEditOpen] = useState(false);

  const chargers = MOCK_CHARGERS.filter((c) => c.stationId === id);

  if (!station) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-2 text-xl font-bold">Không tìm thấy trạm</h2>
        <Button onClick={() => navigate(ROUTES.STATIONS)}>Quay lại danh sách</Button>
      </div>
    );
  }

  const handleMaintenance = () => {
    confirm({
      title: 'Chuyển sang bảo trì',
      description: `Bạn có chắc chắn muốn chuyển trạng thái trạm ${station.name} sang bảo trì? Tất cả các bộ sạc sẽ không thể nhận thêm phiên sạc mới.`,
      variant: 'destructive',
      onConfirm: async () => {
        // mock api call
        await new Promise((r) => setTimeout(r, 800));
        setStation((prev) => (prev ? { ...prev, status: 'maintenance' as const } : prev));
        toast.success(`Trạm ${station.name} đã chuyển sang bảo trì`);
        // Note: in a real app, this would mutate state/cache
      },
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        breadcrumbs={[{ label: 'Trạm sạc', href: ROUTES.STATIONS }, { label: station.name }]}
        actions={
          <>
            <Button variant="outline" onClick={() => setEditOpen(true)}>
              <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
            </Button>
            <Button
              variant="destructive"
              onClick={handleMaintenance}
              disabled={station.status === 'maintenance'}
            >
              Bảo trì
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Info Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>Thông tin chung</CardTitle>
              <StatusBadge status={station.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-bold">{station.name}</h2>
            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm">{station.address}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm">Giờ hoạt động: {station.operatingHours}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Tổng số slots</p>
                <p className="text-lg font-semibold">{station.totalSlots}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Đang sạc</p>
                <p className="text-lg font-semibold text-warning">{station.activeChargers}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Doanh thu HM</p>
                <p className="text-lg font-semibold text-primary">
                  {formatCurrency(station.revenueToday)}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Doanh thu tháng</p>
                <p className="text-lg font-semibold text-success">
                  {formatCurrency(station.revenueMonth)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <div className="h-full min-h-[350px] lg:col-span-2">
          <ChartCard title="Doanh thu 7 ngày qua" className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_REVENUE_DATA.slice(0, 7)}
                margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val: any) => `${val / 1000}k`}
                />
                <RechartsTooltip
                  formatter={(value: any) => [formatCurrency(value), 'Doanh thu']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Chargers Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Danh sách bộ sạc ({chargers.length})</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {chargers.map((charger) => (
            <Card
              key={charger.id}
              className={cn(
                'relative cursor-pointer overflow-hidden transition-colors hover:border-primary/50',
                charger.status === 'charging' &&
                  'border-sky-200 bg-sky-50/30 dark:border-sky-900 dark:bg-sky-900/10',
              )}
              onClick={() => navigate(`${ROUTES.CHARGERS}/${charger.id}`)}
            >
              {charger.status === 'charging' && (
                <div className="absolute left-0 top-0 h-1 w-full bg-sky-500/20">
                  <div
                    className="h-full animate-pulse bg-sky-500"
                    style={{
                      width: `${Math.min(100, ((charger.sessionDurationMin || 0) / 60) * 100)}%`,
                    }}
                  />
                </div>
              )}
              <CardContent className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <span className="font-mono font-bold">{charger.id}</span>
                  <StatusBadge status={charger.status} size="sm" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Công suất</span>
                    <span className="flex items-center font-medium">
                      <Power className="mr-1 h-3 w-3 text-primary" /> {charger.powerKw}kW
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chuẩn sạc</span>
                    <span className="font-medium">{charger.connectorType}</span>
                  </div>
                  {charger.status === 'charging' && (
                    <div className="mt-2 flex justify-between border-t pt-2">
                      <span className="text-muted-foreground">Năng lượng</span>
                      <span className="font-medium text-sky-600 dark:text-sky-400">
                        {charger.currentEnergyKwh} kWh
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {chargers.length === 0 && (
            <div className="col-span-full rounded-lg border border-dashed py-8 text-center text-muted-foreground">
              Trạm này chưa có bộ sạc nào.
            </div>
          )}
        </div>
      </div>

      <EditStationSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        station={station}
        onSave={(data) => {
          setStation((prev) =>
            prev
              ? {
                  ...prev,
                  ...data,
                  status:
                    data.status === 'active'
                      ? 'online'
                      : data.status === 'inactive'
                        ? 'offline'
                        : 'maintenance',
                }
              : prev,
          );
          setEditOpen(false);
        }}
      />
    </div>
  );
}
