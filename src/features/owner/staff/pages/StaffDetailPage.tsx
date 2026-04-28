import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Award,
  CalendarClock,
  Briefcase,
  Activity,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { MOCK_STAFF } from './StaffListPage';

import { OWNER_ROUTES } from '@/lib/constants';
import { getOwnerParkings } from '@/lib/utils-owner';
import { EmptyState } from '@/shared/components/common/EmptyState';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function StaffDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const parkings = getOwnerParkings();

  const staff = MOCK_STAFF.find((s) => s.id === id);

  if (!staff) {
    return (
      <EmptyState
        title="Không tìm thấy nhân sự"
        description="Nhân sự không tồn tại hoặc bạn không có quyền truy cập."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(OWNER_ROUTES.STAFF)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">{staff.name}</h2>
            <StatusBadge status={staff.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">ID: {staff.id}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hồ sơ nhân sự</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{staff.name}</p>
                <div className="flex items-center gap-1 text-sm capitalize text-muted-foreground">
                  <Briefcase className="h-3 w-3" />
                  {staff.role}
                </div>
              </div>
            </div>
            <div className="space-y-3 border-t pt-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{staff.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{staff.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span>Ngày vào làm: {new Date(staff.hireDate).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance & Assignment */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Phân công & Hiệu suất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Bãi đỗ đang trực</p>
                <p className="text-lg font-medium">
                  {parkings.find((p) => p.id === staff.parkingId)?.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Ca làm việc</p>
                <p className="text-lg font-medium capitalize">{staff.shift}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" /> Phiên sạc đã hỗ trợ
                </div>
                <p className="text-2xl font-bold">{staff.performance.sessionsHandled}</p>
              </div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-2 text-muted-foreground">
                  Khiếu nại đã giải quyết
                </div>
                <p className="text-2xl font-bold">{staff.performance.complaintsResolved}</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-2 font-medium text-primary">
                  <Award className="h-4 w-4" /> Đánh giá (Rating)
                </div>
                <p className="text-2xl font-bold text-primary">{staff.performance.rating} / 5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch trình & Hoạt động gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed py-8 text-center text-muted-foreground">
            Lịch làm việc chi tiết và log hoạt động sẽ hiển thị ở đây (TBD)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
