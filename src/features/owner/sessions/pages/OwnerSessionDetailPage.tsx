import { ArrowLeft, User, BatteryCharging, Clock, Activity, FileText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { OWNER_ROUTES } from '@/lib/constants';
import { MOCK_OWNER } from '@/lib/mock-owner';
import { formatCurrency } from '@/lib/utils';
import { getOwnerSessions } from '@/lib/utils-owner';
import { EmptyState } from '@/shared/components/common/EmptyState';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function OwnerSessionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const session = getOwnerSessions().find((s) => s.id === id);

  if (!session) {
    return (
      <EmptyState
        title="Không tìm thấy phiên sạc"
        description="Phiên sạc không tồn tại hoặc bạn không có quyền truy cập."
      />
    );
  }

  const gross = session.amount;
  const net = Math.floor(gross * (MOCK_OWNER.revenueSharePercent / 100));
  const fee = gross - net; // platform fee + vat (simplified mock)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(OWNER_ROUTES.SESSIONS)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">Chi tiết phiên sạc {session.id}</h2>
            <StatusBadge status={session.status} />
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" /> {new Date(session.startTime).toLocaleString('vi-VN')}
            {session.endTime && ` - ${new Date(session.endTime).toLocaleString('vi-VN')}`}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer & Location Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" /> Thông tin khách hàng & Vị trí
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Khách hàng</p>
                <Button
                  variant="link"
                  className="h-auto px-0 font-medium"
                  onClick={() => navigate(`${OWNER_ROUTES.CUSTOMERS}/${session.userId}`)}
                >
                  {session.userName}
                </Button>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Bãi đỗ</p>
                <Button
                  variant="link"
                  className="h-auto px-0 font-medium"
                  onClick={() => navigate(`${OWNER_ROUTES.PARKINGS}/${session.stationId}`)}
                >
                  {session.stationName}
                </Button>
              </div>
            </div>
            <div>
              <p className="mb-1 text-sm text-muted-foreground">Bộ sạc</p>
              <Button
                variant="link"
                className="h-auto px-0 font-medium"
                onClick={() => navigate(`${OWNER_ROUTES.CHARGERS}/${session.chargerId}`)}
              >
                {session.chargerId}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Financial Breakdown */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" /> Chi tiết tài chính
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b border-primary/10 pb-2">
              <span className="text-muted-foreground">Tổng tiền (Gross)</span>
              <span className="font-medium">{formatCurrency(gross)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-primary/10 pb-2 text-muted-foreground">
              <span>Phí nền tảng & VAT ({100 - MOCK_OWNER.revenueSharePercent}%)</span>
              <span>- {formatCurrency(fee)}</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-semibold text-primary">
                NET cho tôi ({MOCK_OWNER.revenueSharePercent}%)
              </span>
              <span className="text-xl font-bold text-primary">{formatCurrency(net)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Charging Specs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BatteryCharging className="h-5 w-5 text-primary" /> Thông số sạc
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Điện năng tiêu thụ</p>
                <p className="text-lg font-semibold">{session.energyKwh} kWh</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Thời gian sạc</p>
                <p className="text-lg font-semibold">{session.durationMin} phút</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Chart TBD */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" /> Biểu đồ công suất (TBD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed text-muted-foreground">
              [Chart Placeholder]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
