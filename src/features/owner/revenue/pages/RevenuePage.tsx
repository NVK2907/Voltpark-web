import { Download, PieChart, TrendingUp, DollarSign } from 'lucide-react';
import { useState } from 'react';

import { formatCurrency } from '@/lib/utils';
import { getOwnerParkings } from '@/lib/utils-owner';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export default function RevenuePage() {
  const [period, setPeriod] = useState('this_month');
  const parkings = getOwnerParkings();

  // Mock revenue KPIs
  const gross = 185000000;
  const platformFee = 55500000;
  const net = 129500000;
  const growth = 12.5;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Doanh thu</h2>
          <p className="text-muted-foreground">Theo dõi dòng tiền và tỷ lệ phân chia doanh thu</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {period === 'custom' && (
            <div className="animate-in fade-in slide-in-from-right-1 flex items-center gap-2">
              <Input type="date" className="h-9 w-36 text-xs" defaultValue="2024-03-01" />
              <span className="text-muted-foreground">→</span>
              <Input type="date" className="h-9 w-36 text-xs" defaultValue="2024-03-31" />
            </div>
          )}
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Chọn thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="this_week">Tuần này</SelectItem>
                <SelectItem value="this_month">Tháng này</SelectItem>
                <SelectItem value="last_month">Tháng trước</SelectItem>
                <SelectItem value="this_year">Năm nay</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Xuất báo cáo
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tổng thu (Gross)</p>
                <p className="mt-1 text-2xl font-bold">{formatCurrency(gross)}</p>
              </div>
              <div className="rounded-md bg-muted p-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Phí nền tảng & VAT (30%)
                </p>
                <p className="mt-1 text-2xl font-bold text-destructive">
                  -{formatCurrency(platformFee)}
                </p>
              </div>
              <div className="rounded-md bg-destructive/10 p-2">
                <PieChart className="h-4 w-4 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-primary/5 md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Doanh thu NET (70%)</p>
                <p className="mt-1 text-3xl font-bold text-primary">{formatCurrency(net)}</p>
              </div>
              <div className="text-right">
                <p className="flex items-center justify-end gap-1 text-sm font-medium text-success">
                  <TrendingUp className="h-4 w-4" /> +{growth}%
                </p>
                <p className="mt-1 text-xs text-muted-foreground">So với kỳ trước</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Biểu đồ doanh thu NET</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-md border border-dashed text-muted-foreground">
              [Bar Chart Placeholder] - TBD
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo Bãi đỗ (NET)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {parkings.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
              >
                <div className="truncate pr-4">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-semibold text-primary">{formatCurrency(p.revenueMonth)}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((p.revenueMonth / net) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
