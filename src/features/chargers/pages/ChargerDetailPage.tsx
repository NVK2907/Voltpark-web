import {
  Edit,
  Zap,
  Power,
  MapPin,
  Wrench,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import * as React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

import { ROUTES } from '@/lib/constants';
import { MOCK_CHARGERS, MOCK_EVENTS, MOCK_STATIONS } from '@/lib/mock-data';
import { formatRelativeTime, cn } from '@/lib/utils';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useConfirm } from '@/shared/hooks/useConfirm';
import type { ChargingEvent } from '@/types';
import { ChargerConfigSheet } from '../components/ChargerConfigSheet';

export function ChargerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { confirm } = useConfirm();

  const [charger, setCharger] = React.useState(
    () => MOCK_CHARGERS.find((c) => c.id === id) ?? null,
  );
  const [configOpen, setConfigOpen] = React.useState(false);

  const station = MOCK_STATIONS.find((s) => s.id === charger?.stationId);
  const events = MOCK_EVENTS.filter((e) => e.chargerId === id);

  if (!charger) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-2 text-xl font-bold">Không tìm thấy bộ sạc</h2>
        <Button onClick={() => navigate(ROUTES.CHARGERS)}>Quay lại danh sách</Button>
      </div>
    );
  }

  const handleRestart = () => {
    confirm({
      title: 'Khởi động lại bộ sạc',
      description: `Bạn có chắc chắn muốn khởi động lại bộ sạc ${charger.id}? Thao tác này sẽ mất khoảng 2-3 phút và ngắt kết nối các phiên sạc hiện tại.`,
      variant: 'destructive',
      onConfirm: async () => {
        await new Promise((r) => setTimeout(r, 1500));
        toast.success(`Đang gửi lệnh khởi động lại tới ${charger.id}...`);
      },
    });
  };

  const handleMaintenance = () => {
    confirm({
      title: 'Chuyển sang bảo trì',
      description: `Xác nhận chuyển bộ sạc ${charger.id} sang trạng thái bảo trì? Bộ sạc sẽ không nhận phiên sạc mới cho đến khi được khôi phục.`,
      variant: 'destructive',
      onConfirm: async () => {
        await new Promise((r) => setTimeout(r, 800));
        setCharger((prev) => (prev ? { ...prev, status: 'fault' as const } : prev));
        toast.success(`Bộ sạc ${charger.id} đã chuyển sang bảo trì`);
      },
    });
  };

  const handleForceStop = () => {
    confirm({
      title: 'Ngắt phiên sạc khẩn cấp',
      description:
        'Thao tác này sẽ ngừng phiên sạc ngay lập tức. Người dùng sẽ được hoàn tiền phần điện chưa sử dụng. Tiếp tục?',
      variant: 'destructive',
      onConfirm: async () => {
        await new Promise((r) => setTimeout(r, 1000));
        setCharger((prev) =>
          prev
            ? {
                ...prev,
                status: 'available' as const,
                sessionDurationMin: undefined,
                currentUserId: undefined,
                currentEnergyKwh: 0,
              }
            : prev,
        );
        toast.success('Đã ngắt phiên sạc. Hoàn tiền đang được xử lý...');
      },
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'fault':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'session_start':
        return <Zap className="h-4 w-4 text-sky-500" />;
      case 'session_end':
        return <ShieldCheck className="h-4 w-4 text-success" />;
      default:
        return <RefreshCw className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        breadcrumbs={[{ label: 'Bộ sạc', href: ROUTES.CHARGERS }, { label: charger.id }]}
        actions={
          <>
            <Button variant="outline" onClick={() => setConfigOpen(true)}>
              <Edit className="mr-2 h-4 w-4" /> Cấu hình
            </Button>
            <Button variant="outline" onClick={handleRestart}>
              <RefreshCw className="mr-2 h-4 w-4" /> Khởi động lại
            </Button>
            <Button
              variant="destructive"
              onClick={handleMaintenance}
              disabled={charger.status === 'fault'}
            >
              <Wrench className="mr-2 h-4 w-4" /> Bảo trì
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Info Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>Thông số kỹ thuật</CardTitle>
              <StatusBadge status={charger.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Zap
                  className={cn(
                    'h-8 w-8',
                    charger.status === 'charging' ? 'text-sky-500' : 'text-muted-foreground',
                  )}
                />
              </div>
              <div className="space-y-1">
                <h2 className="font-mono text-2xl font-bold">{charger.id}</h2>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <Link
                    to={`${ROUTES.STATIONS}/${charger.stationId}`}
                    className="hover:text-primary hover:underline"
                  >
                    {charger.stationName}
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4 md:grid-cols-4">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Công suất</p>
                <p className="flex items-center font-semibold">
                  <Power className="mr-1 h-4 w-4 text-primary" /> {charger.powerKw} kW
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Chuẩn kết nối</p>
                <p className="font-semibold">{charger.connectorType}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Phiên bản Firmware</p>
                <p className="font-mono text-sm">{charger.firmwareVersion}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Lần cập nhật cuối</p>
                <p className="text-sm">{formatRelativeTime(charger.lastHeartbeat)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Session Card */}
        <Card
          className={cn(
            'relative overflow-hidden',
            charger.status === 'charging' ? 'border-sky-200 dark:border-sky-800' : '',
          )}
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
          <CardHeader>
            <CardTitle>Phiên sạc hiện tại</CardTitle>
          </CardHeader>
          <CardContent>
            {charger.status === 'charging' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Người dùng</span>
                  <Link
                    to={`${ROUTES.USERS}/${charger.currentUserId}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {charger.currentUserId}
                  </Link>
                </div>

                <div className="flex justify-center">
                  <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-sky-100 shadow-inner dark:border-sky-900/50">
                    <svg className="absolute inset-0 h-full w-full -rotate-90">
                      <circle
                        cx="60"
                        cy="60"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray="351.85"
                        strokeDashoffset={
                          351.85 -
                          (351.85 * Math.min(100, ((charger.sessionDurationMin || 0) / 60) * 100)) /
                            100
                        }
                        className="text-sky-500 transition-all duration-1000 ease-in-out"
                      />
                    </svg>
                    <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                      {charger.currentEnergyKwh}
                    </span>
                    <span className="text-xs text-muted-foreground">kWh</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Thời gian</span>
                  </div>
                  <span className="font-medium text-sky-600 dark:text-sky-400">
                    {charger.sessionDurationMin} phút
                  </span>
                </div>
                <Button variant="destructive" className="w-full" onClick={handleForceStop}>
                  Ngắt phiên sạc khẩn cấp
                </Button>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Zap className="mx-auto mb-2 h-8 w-8 opacity-20" />
                <p>Không có phiên sạc nào đang diễn ra.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Events Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Nhật ký thiết bị</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <div className="relative ml-3 space-y-6 border-l pb-4">
              {events.map((event: ChargingEvent) => (
                <div key={event.id} className="relative pl-6">
                  <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-muted bg-background">
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full',
                        event.severity === 'critical'
                          ? 'bg-destructive'
                          : event.type.includes('session')
                            ? 'bg-sky-500'
                            : 'bg-muted-foreground',
                      )}
                    />
                  </span>
                  <div className="mb-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                    <div className="flex items-center gap-2">
                      {getEventIcon(event.type)}
                      <span className="font-medium">{event.type}</span>
                    </div>
                    <time
                      className="text-xs text-muted-foreground"
                      title={new Date(event.timestamp).toLocaleString()}
                    >
                      {formatRelativeTime(event.timestamp)}
                    </time>
                  </div>
                  <div className="mt-2 overflow-x-auto rounded-md bg-muted/50 p-3 font-mono text-xs">
                    {JSON.stringify(event.payload, null, 2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">Không có dữ liệu nhật ký.</div>
          )}
        </CardContent>
      </Card>

      <ChargerConfigSheet
        open={configOpen}
        onOpenChange={setConfigOpen}
        charger={charger}
        onSave={(patch) => setCharger((prev) => (prev ? { ...prev, ...patch } : prev))}
      />
    </div>
  );
}
