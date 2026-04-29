import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Wrench,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  History,
  FileText,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { MOCK_MAINTENANCE_REQUESTS } from './MaintenancePage';

import { getOwnerParkings } from '@/lib/utils-owner';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

export default function MaintenanceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const parkings = getOwnerParkings();

  const request = MOCK_MAINTENANCE_REQUESTS.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-bold">Không tìm thấy yêu cầu</h2>
        <Button variant="link" onClick={() => navigate('/owner/maintenance')}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const parking = parkings.find((p) => p.id === request.parkingId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/owner/maintenance')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Chi tiết yêu cầu {request.id}</h2>
          <p className="text-muted-foreground">Theo dõi trạng thái xử lý sự cố kỹ thuật</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Main Info */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Thông tin sự cố</CardTitle>
              <StatusBadge status={request.status as any} />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Wrench className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">Thiết bị</p>
                    <p className="font-semibold">{request.chargerId || 'Chưa xác định'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">Vị trí</p>
                    <p className="font-semibold">{parking?.name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">Ngày tạo</p>
                    <p className="font-semibold">
                      {new Date(request.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">Ưu tiên</p>
                    <p className="font-semibold capitalize">
                      {request.priority === 'high' ? 'Khẩn cấp' : 'Bình thường'}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Mô tả chi tiết
                </p>
                <div className="rounded-lg border bg-muted/20 p-4 leading-relaxed">
                  {request.description}
                </div>
              </div>

              {request.status === 'completed' && (
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-bold">Đã hoàn thành bảo trì</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Hoàn thành vào: {new Date(request.completedAt!).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline / History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" /> Nhật ký xử lý
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-8 before:absolute before:left-[17px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-muted">
              {[
                {
                  title: 'Yêu cầu đã được gửi',
                  time: '13:45, 12/04/2026',
                  author: 'Hệ thống',
                  desc: 'Yêu cầu bảo trì đã được tạo tự động từ báo lỗi của nhân viên.',
                },
                {
                  title: 'Đang điều phối kỹ thuật viên',
                  time: '14:20, 12/04/2026',
                  author: 'Admin',
                  desc: 'Yêu cầu đang được xem xét và gán cho đội kỹ thuật khu vực.',
                },
              ].map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 top-1 z-10 h-4 w-4 rounded-full border-2 border-background bg-violet-600 shadow-sm" />
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{item.title}</p>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-xs font-medium text-violet-600">{item.author}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Action Panel */}
          <Card className="bg-violet-600 text-white shadow-xl shadow-violet-600/20">
            <CardHeader>
              <CardTitle className="text-lg">Hành động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-white text-violet-600 hover:bg-slate-100">
                <MessageSquare className="mr-2 h-4 w-4" /> Nhắn tin cho hỗ trợ
              </Button>
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                <FileText className="mr-2 h-4 w-4" /> Tải báo cáo sự cố
              </Button>
            </CardContent>
          </Card>

          {/* Device Context */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin thiết bị</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs uppercase text-muted-foreground">Loại trụ sạc</p>
                <p className="font-bold">DC Fast Charger v2</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase text-muted-foreground">Trạng thái hiện tại</p>
                <div className="flex items-center gap-2 text-red-500">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <span className="text-sm font-bold">Mất kết nối</span>
                </div>
              </div>
              <Separator />
              <Button
                variant="link"
                className="h-auto p-0 font-bold text-violet-600"
                onClick={() => navigate(`/owner/chargers`)}
              >
                Quản lý thiết bị &rarr;
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
