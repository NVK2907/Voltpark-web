import { Search, Plus, Wrench } from 'lucide-react';
import { useState } from 'react';

import { getOwnerParkings } from '@/lib/utils-owner';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type { MaintenanceRequest } from '@/types';

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [parkingFilter, setParkingFilter] = useState('all');
  const parkings = getOwnerParkings();

  const MOCK_REQUESTS: MaintenanceRequest[] = [
    {
      id: 'MT-001',
      ownerId: 'OWN001',
      chargerId: 'CHG-001',
      parkingId: 'ST001',
      type: 'charger_repair',
      description: 'Súng sạc cắm vào xe không nhận',
      priority: 'high',
      status: 'submitted',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'MT-002',
      ownerId: 'OWN001',
      chargerId: 'CHG-012',
      parkingId: 'ST003',
      type: 'charger_repair',
      description: 'Màn hình bị đơ, không hiển thị mã QR',
      priority: 'medium',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'MT-003',
      ownerId: 'OWN001',
      chargerId: 'CHG-005',
      parkingId: 'ST001',
      type: 'facility',
      description: 'Bảo dưỡng định kỳ',
      priority: 'low',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 29).toISOString(),
    },
  ];

  const requests = MOCK_REQUESTS.filter((r) => {
    if (
      searchTerm &&
      (!r.chargerId || !r.chargerId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !r.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (parkingFilter !== 'all' && r.parkingId !== parkingFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Hỗ trợ kỹ thuật</h2>
          <p className="text-muted-foreground">
            Tạo và theo dõi các yêu cầu bảo trì, sửa chữa trạm sạc
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Tạo yêu cầu mới
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-lg border bg-muted/30 p-3 sm:flex-row">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo mã sạc, mô tả..."
            className="bg-background pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={parkingFilter} onValueChange={setParkingFilter}>
          <SelectTrigger className="w-full bg-background sm:w-[250px]">
            <SelectValue placeholder="Tất cả bãi đỗ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả bãi đỗ</SelectItem>
            {parkings.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <Card key={req.id}>
            <CardContent className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{req.id}</span>
                  <span className="text-sm text-muted-foreground">
                    • {new Date(req.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                  {req.priority === 'high' && (
                    <span className="rounded border border-destructive/20 bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                      Khẩn cấp
                    </span>
                  )}
                  {req.priority === 'medium' && (
                    <span className="rounded border border-warning/20 bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                      Bình thường
                    </span>
                  )}
                  {req.priority === 'low' && (
                    <span className="rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Thấp
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Wrench className="h-4 w-4" /> {req.chargerId} •{' '}
                  {parkings.find((p) => p.id === req.parkingId)?.name}
                </div>
                <p className="font-medium text-foreground">{req.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={req.status as any} />
                <Button variant="link" size="sm" className="px-0">
                  Xem chi tiết &rarr;
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {requests.length === 0 && (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            Không tìm thấy yêu cầu bảo trì nào.
          </div>
        )}
      </div>
    </div>
  );
}
