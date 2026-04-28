import * as React from 'react';

import { MOCK_REVENUE_DATA } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { ChartCard } from '@/shared/components/common/ChartCard';
import { KpiCard } from '@/shared/components/common/KpiCard';
import { PageHeader } from '@/shared/components/common/PageHeader';

const formatNumber = (num: number) => num.toLocaleString('vi-VN');
import { DollarSign, Zap, Activity, CalendarDays } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import {
  BarChart,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

export function AnalyticsPage() {
  const [period, setPeriod] = React.useState('7d');
  const [stationId, setStationId] = React.useState('all');

  // Mock hourly data (0-23h)
  const hourlyData = Array.from({ length: 24 }).map((_, i) => ({
    hour: `${i}h`,
    sessions: Math.floor(Math.random() * 50) + 10,
  }));

  // Mock weekly data (T2-CN)
  const weeklyData = [
    { day: 'T2', sessions: 120 },
    { day: 'T3', sessions: 150 },
    { day: 'T4', sessions: 180 },
    { day: 'T5', sessions: 160 },
    { day: 'T6', sessions: 220 },
    { day: 'T7', sessions: 350 }, // Max
    { day: 'CN', sessions: 310 },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Báo cáo & Thống kê" />

      {/* Filter Bar */}
      <div className="sticky top-14 z-30 -mx-4 flex flex-col items-start justify-between gap-4 border-b bg-background/95 px-4 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:flex-row sm:items-center md:-mx-8 md:px-8">
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
          {['today', '7d', '30d', '3m', 'custom'].map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p)}
              className="whitespace-nowrap rounded-full"
            >
              {p === 'today'
                ? 'Hôm nay'
                : p === '7d'
                  ? '7 ngày'
                  : p === '30d'
                    ? '30 ngày'
                    : p === '3m'
                      ? '3 tháng'
                      : 'Tùy chỉnh'}
            </Button>
          ))}
        </div>

        <Select value={stationId} onValueChange={setStationId}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn trạm sạc" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạm sạc</SelectItem>
            <SelectItem value="ST-001">Trạm sạc Quận 1</SelectItem>
            <SelectItem value="ST-002">Trạm sạc Quận 7</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 pt-2 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Tổng doanh thu"
          value={formatCurrency(452000000)}
          icon={DollarSign}
          trend={{ value: 15.2, label: 'so với kỳ trước' }}
          color="primary"
        />
        <KpiCard
          label="Tổng năng lượng (kWh)"
          value={formatNumber(12540)}
          icon={Zap}
          trend={{ value: 8.4, label: 'so với kỳ trước' }}
          color="warning"
        />
        <KpiCard
          label="Số phiên sạc"
          value={formatNumber(845)}
          icon={Activity}
          trend={{ value: 12.1, label: 'so với kỳ trước' }}
          color="success"
        />
        <KpiCard
          label="TB phiên / ngày"
          value="120"
          icon={CalendarDays}
          trend={{ value: -2.3, label: 'so với kỳ trước' }}
          color="default"
        />
      </div>

      {/* Composed Chart */}
      <div className="h-[400px]">
        <ChartCard title="Tương quan Doanh thu & Năng lượng" className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={MOCK_REVENUE_DATA}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />

              {/* Left Y Axis for Revenue */}
              <YAxis
                yAxisId="left"
                tickFormatter={(val) => `${val / 1000000}tr`}
                axisLine={false}
                tickLine={false}
              />

              {/* Right Y Axis for Energy */}
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(val) => `${val}kWh`}
                axisLine={false}
                tickLine={false}
              />

              <RechartsTooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderRadius: '8px',
                  border: '1px solid hsl(var(--border))',
                }}
                formatter={(value: any, name: any) => {
                  if (name === 'revenue') return [formatCurrency(value), 'Doanh thu'];
                  if (name === 'energy') return [`${value} kWh`, 'Năng lượng'];
                  return [value, name];
                }}
              />
              <Legend verticalAlign="top" height={36} />

              <Bar
                yAxisId="right"
                dataKey="energy"
                name="energy"
                fill="hsl(var(--warning))"
                opacity={0.8}
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Usage Patterns */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[350px]">
          <ChartCard
            title="Phân bố theo giờ"
            subtitle="Lượng phiên sạc trong ngày"
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                  interval={1}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <RechartsTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Bar dataKey="sessions" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]}>
                  {hourlyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(var(--primary) / ${Math.max(0.2, entry.sessions / 60)})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="h-[350px]">
          <ChartCard
            title="Phân bố theo ngày trong tuần"
            subtitle="Hoạt động trong tuần"
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.sessions >= 350 ? 'hsl(var(--success))' : 'hsl(var(--primary)/0.6)'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
