import { ArrowLeft, Zap, AlertTriangle, Cpu, Calendar, Settings2, Info } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { OWNER_ROUTES, CONNECTOR_LABELS } from '@/lib/constants';
import { getOwnerChargers } from '@/lib/utils-owner';
import { EmptyState } from '@/shared/components/common/EmptyState';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function OwnerChargerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const charger = getOwnerChargers().find((c) => c.id === id);

  if (!charger) {
    return (
      <EmptyState
        title="Không tìm thấy bộ sạc"
        description="Bộ sạc không tồn tại hoặc bạn không có quyền truy cập."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(OWNER_ROUTES.CHARGERS)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{charger.id}</h2>
              <StatusBadge status={charger.status} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{charger.stationName}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <AlertTriangle className="h-4 w-4" /> Yêu cầu bảo trì
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Specs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings2 className="h-5 w-5 text-primary" /> Thông số kỹ thuật
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Công suất tối đa</p>
                <p className="flex items-center gap-2 text-lg font-semibold">
                  <Zap className="h-4 w-4 text-amber-500" /> {charger.powerKw} kW
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Chuẩn kết nối</p>
                <p className="text-lg font-semibold">{CONNECTOR_LABELS[charger.connectorType]}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <Cpu className="h-3 w-3" /> Phiên bản Firmware
                </p>
                <p className="font-medium">{charger.firmwareVersion}</p>
              </div>
              <div>
                <p className="mb-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" /> Ngày lắp đặt
                </p>
                <p className="font-medium">
                  {new Date(charger.installationDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-primary/5 p-3 text-sm">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-muted-foreground">
                Các thao tác điều khiển thiết bị (Restart, Update Firmware) chỉ dành cho Admin nền
                tảng. Nếu thiết bị gặp sự cố, vui lòng nhấn{' '}
                <strong className="text-foreground">Yêu cầu bảo trì</strong>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Status Live */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" /> Trạng thái hiện tại
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Lần kết nối cuối (Heartbeat)</p>
              <p className="font-medium">
                {new Date(charger.lastHeartbeat).toLocaleString('vi-VN')}
                <span className="ml-2 text-xs text-success">(Trực tuyến)</span>
              </p>
            </div>

            {charger.status === 'charging' && (
              <div className="space-y-3 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                <h4 className="font-semibold text-amber-700 dark:text-amber-400">
                  Đang có phiên sạc
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">Năng lượng đã sạc:</p>
                  <p className="font-bold">{charger.currentEnergyKwh} kWh</p>
                  <p className="text-muted-foreground">Thời gian sạc:</p>
                  <p className="font-bold">{charger.sessionDurationMin} phút</p>
                </div>
                <Button
                  variant="link"
                  className="hove:text-amber-700 h-auto px-0 text-amber-600"
                  onClick={() => navigate(`${OWNER_ROUTES.SESSIONS}?chargerId=${charger.id}`)}
                >
                  Xem chi tiết phiên sạc &rarr;
                </Button>
              </div>
            )}

            {charger.status === 'fault' && (
              <div className="space-y-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                <h4 className="font-semibold text-destructive">Thiết bị đang báo lỗi</h4>
                <p className="text-sm text-muted-foreground">
                  Vui lòng kiểm tra cáp sạc hoặc tạo yêu cầu bảo trì.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* TBD: Lịch sử bảo trì */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lịch sử bảo trì</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-dashed py-8 text-center text-muted-foreground">
              Chưa có dữ liệu lịch sử bảo trì (TBD)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Just to avoid missing lucide icon import error
import { Activity } from 'lucide-react';
