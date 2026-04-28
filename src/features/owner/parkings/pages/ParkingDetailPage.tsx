import { ArrowLeft, MapPin as MapPinIcon, Clock, Phone, AlertTriangle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { SlotMapGrid } from '../components/SlotMapGrid';

import { OWNER_ROUTES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { getOwnerParkings, getOwnerSlots } from '@/lib/utils-owner';
import { EmptyState } from '@/shared/components/common/EmptyState';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function ParkingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const parking = getOwnerParkings().find((p) => p.id === id);
  const slots = getOwnerSlots(id);

  if (!parking) {
    return (
      <EmptyState
        title="Không tìm thấy bãi đỗ"
        description="Bãi đỗ không tồn tại hoặc bạn không có quyền truy cập."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(OWNER_ROUTES.PARKINGS)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{parking.name}</h2>
              <StatusBadge status={parking.status} />
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPinIcon className="h-3 w-3" /> {parking.address}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <AlertTriangle className="h-4 w-4" /> Yêu cầu bảo trì
        </Button>
      </div>

      {/* Section 1 - Info */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Thông tin chung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                Giờ hoạt động: <span className="font-medium">{parking.operatingHours}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-muted-foreground" />
              <span>
                Tọa độ:{' '}
                <span className="font-mono">
                  {parking.coordinates.lat.toFixed(4)}, {parking.coordinates.lng.toFixed(4)}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>
                BQL: <span className="font-medium">Quản lý bãi</span>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trạng thái Live
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tải hiện tại</span>
              <span className="font-bold">{parking.loadPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Slot có xe</span>
              <span className="font-bold">
                {slots.filter((s) => s.status !== 'available' && s.status !== 'fault').length} /{' '}
                {parking.totalSlots}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phiên sạc đang chạy</span>
              <span className="font-bold text-amber-600">
                {slots.filter((s) => s.status === 'charging').length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Doanh thu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Hôm nay (NET)</span>
              <span className="text-base font-bold text-primary">
                {formatCurrency(parking.revenueToday)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tháng này (NET)</span>
              <span className="font-bold">{formatCurrency(parking.revenueMonth)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Trung bình phiên</span>
              <span className="font-bold">
                ~ {formatCurrency(Math.floor(parking.revenueToday / 15))}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 2 - Slot Map */}
      <SlotMapGrid slots={slots} />

      {/* TBD: Section 3 - Live Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Phiên sạc đang chạy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed py-8 text-center text-muted-foreground">
            Chưa có dữ liệu phiên sạc (TBD)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
