import { Search, Star, MessageSquare } from 'lucide-react';
import { useState } from 'react';

import { getOwnerParkings } from '@/lib/utils-owner';
import { Badge } from '@/shared/components/ui/badge';
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
import type { Feedback } from '@/types';

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [parkingFilter, setParkingFilter] = useState('all');
  const parkings = getOwnerParkings();

  // Mock feedback data
  const MOCK_FEEDBACK: Feedback[] = [
    {
      id: 'FB-001',
      userId: 'USR002',
      userName: 'Trần Thị B',
      parkingId: 'ST001',
      parkingName: 'Trạm Quận 1 - Vincom Center',
      rating: 5,
      comment: 'Bãi đỗ sạch sẽ, sạc nhanh.',
      category: 'service',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'new',
    },
    {
      id: 'FB-002',
      userId: 'USR003',
      userName: 'Lê Hoàng C',
      parkingId: 'ST002',
      parkingName: 'Trạm Quận 2 - Thảo Điền Pearl',
      rating: 2,
      comment: 'Súng sạc bị lỗi nhưng app không báo trước.',
      category: 'charger',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'responded',
      ownerResponse: 'Chào bạn, chúng tôi đã khắc phục lỗi này. Rất xin lỗi vì sự bất tiện.',
      respondedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  const feedbacks = MOCK_FEEDBACK.filter((f) => {
    if (
      searchTerm &&
      !f.userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(f.comment || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (parkingFilter !== 'all' && f.parkingId !== parkingFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Phản hồi của khách hàng</h2>
          <p className="text-muted-foreground">Lắng nghe và cải thiện dịch vụ tại các bãi đỗ</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">Đánh giá trung bình</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">4.2</span>
                <div className="flex text-amber-500">
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Star className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">Phản hồi mới</p>
              <span className="text-3xl font-bold">12</span>
            </div>
            <div className="rounded-full bg-muted p-3">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-lg border bg-muted/30 p-3 sm:flex-row">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo nội dung, tên KH..."
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
        {feedbacks.map((f) => (
          <Card key={f.id}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{f.userName}</span>
                    <span className="text-sm text-muted-foreground">
                      • {new Date(f.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                    {f.status === 'new' && <Badge variant="destructive">Mới</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < f.rating ? 'fill-current' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {f.parkingName}
                    </span>
                  </div>
                  <p className="mt-2 text-foreground">{f.comment}</p>
                </div>
                <div className="sm:text-right">
                  {f.status === 'new' ? (
                    <Button variant="outline">Phản hồi</Button>
                  ) : (
                    <div className="rounded-md bg-muted p-3 text-left text-sm sm:max-w-md">
                      <p className="mb-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <MessageSquare className="h-3 w-3" /> Phản hồi của bạn (
                        {new Date(f.respondedAt!).toLocaleDateString('vi-VN')})
                      </p>
                      <p>{f.ownerResponse}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
