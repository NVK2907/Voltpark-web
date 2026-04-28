import { Settings, Save, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

import { MOCK_OWNER } from '@/lib/mock-owner';
import { formatCurrency } from '@/lib/utils';
import { getOwnerParkings } from '@/lib/utils-owner';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export default function PricingPage() {
  const parkings = getOwnerParkings();
  const [selectedParking, setSelectedParking] = useState(parkings[0]?.id || '');

  // Base platform pricing
  const basePricePerKwh = 3800; // VNĐ
  const baseServiceFee = 5000; // VNĐ

  // Owner overrides
  const [markupPercent, setMarkupPercent] = useState<number>(10);
  const [overrideServiceFee, setOverrideServiceFee] = useState<number>(10000);

  const calculateFinalPrice = () => {
    return Math.round(basePricePerKwh * (1 + markupPercent / 100));
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cấu hình giá cước</h2>
          <p className="text-muted-foreground">Tùy chỉnh giá sạc và phí dịch vụ cho từng bãi đỗ</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
        <label className="whitespace-nowrap font-medium">Chọn bãi đỗ:</label>
        <Select value={selectedParking} onValueChange={setSelectedParking}>
          <SelectTrigger className="w-[300px] bg-background">
            <SelectValue placeholder="Chọn bãi đỗ để cấu hình" />
          </SelectTrigger>
          <SelectContent>
            {parkings.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" /> Cấu hình giá
            </CardTitle>
            <CardDescription>Giá cuối cùng sẽ tự động làm tròn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Tỷ lệ tăng giá điện (% Markup)</label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={markupPercent}
                  onChange={(e) => setMarkupPercent(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-muted-foreground">%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Giá gốc nền tảng EV Charge quy định: {formatCurrency(basePricePerKwh)}/kWh. Bạn có
                thể tăng giá để bù đắp chi phí bãi đỗ.
              </p>
            </div>

            <div className="space-y-3 border-t pt-4">
              <label className="text-sm font-medium">Phí dịch vụ cố định (VNĐ/phiên)</label>
              <Input
                type="number"
                value={overrideServiceFee}
                onChange={(e) => setOverrideServiceFee(Number(e.target.value))}
                className="max-w-xs"
              />
              <p className="text-xs text-muted-foreground">
                Phí này được thu thêm mỗi phiên sạc. Phí tối thiểu của nền tảng là{' '}
                {formatCurrency(baseServiceFee)}.
              </p>
            </div>

            <Button className="w-full gap-2">
              <Save className="h-4 w-4" /> Lưu cấu hình
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Xem trước giá (Live Preview)</CardTitle>
            <CardDescription>Khách hàng sẽ nhìn thấy giá này tại bãi đỗ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 rounded-lg border bg-background p-4">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-muted-foreground">Giá điện (/kWh)</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(calculateFinalPrice())}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-muted-foreground">Phí dịch vụ (/phiên)</span>
                <span className="text-xl font-bold text-foreground">
                  {formatCurrency(Math.max(overrideServiceFee, baseServiceFee))}
                </span>
              </div>
            </div>

            <div className="flex gap-3 rounded-md border border-warning/20 bg-warning/10 p-3 text-sm text-warning-foreground">
              <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
              <p>
                Lưu ý: Bạn được hưởng {MOCK_OWNER.revenueSharePercent}% trên{' '}
                <strong>tổng doanh thu</strong> sau khi trừ thuế VAT, bất kể bạn set markup hay phí
                dịch vụ cao bao nhiêu.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
