import { Search, Plus, Tag, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

import { getOwnerParkings } from '@/lib/utils-owner';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import type { Promotion } from '@/types';

export default function PromotionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const parkings = getOwnerParkings();

  // Mock promotion data
  const MOCK_PROMOTIONS: Promotion[] = [
    {
      id: 'PRM-001',
      ownerId: 'OWN001',
      parkingIds: ['ST001', 'ST003'],
      name: 'Giảm 20% cuối tuần',
      type: 'percent_off',
      value: 20,
      startDate: new Date(Date.now() - 86400000 * 5).toISOString(),
      endDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      status: 'active',
      usageCount: 145,
      maxUsage: 500,
    },
    {
      id: 'PRM-002',
      ownerId: 'OWN001',
      parkingIds: ['ST005'],
      name: 'Tặng 30 phút sạc (Khai trương)',
      type: 'free_minutes',
      value: 30,
      startDate: new Date(Date.now() + 86400000 * 10).toISOString(),
      endDate: new Date(Date.now() + 86400000 * 40).toISOString(),
      status: 'scheduled',
      usageCount: 0,
      maxUsage: 100,
    },
    {
      id: 'PRM-003',
      ownerId: 'OWN001',
      parkingIds: ['ST001'],
      name: 'Giảm 50K phí dịch vụ',
      type: 'fixed_off',
      value: 50000,
      startDate: new Date(Date.now() - 86400000 * 30).toISOString(),
      endDate: new Date(Date.now() - 86400000 * 10).toISOString(),
      status: 'expired',
      usageCount: 88,
    },
  ];

  const promotions = MOCK_PROMOTIONS.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Khuyến mãi</h2>
          <p className="text-muted-foreground">Thu hút khách hàng bằng các chiến dịch ưu đãi</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Tạo chiến dịch mới
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên chiến dịch..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promo) => (
          <Card key={promo.id} className="cursor-pointer transition-colors hover:border-primary/50">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <StatusBadge status={promo.status} />
              </div>

              <div>
                <h3 className="line-clamp-1 text-lg font-semibold" title={promo.name}>
                  {promo.name}
                </h3>
                <p className="mt-1 text-2xl font-bold text-primary">
                  {promo.type === 'percent_off'
                    ? `${promo.value}%`
                    : promo.type === 'fixed_off'
                      ? `${promo.value / 1000}K VNĐ`
                      : `${promo.value} phút`}
                </p>
              </div>

              <div className="space-y-2 border-t pt-2 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Thời gian
                  </span>
                  <span>
                    {new Date(promo.startDate).toLocaleDateString('vi-VN')} -{' '}
                    {new Date(promo.endDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> Đã dùng
                  </span>
                  <span className="font-medium text-foreground">
                    {promo.usageCount} {promo.maxUsage ? `/ ${promo.maxUsage}` : ''}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
