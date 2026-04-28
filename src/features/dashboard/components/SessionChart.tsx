import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { MOCK_REVENUE_DATA } from '@/lib/mock-data';
import { ChartCard } from '@/shared/components/common/ChartCard';

export function SessionChart() {
  return (
    <ChartCard title="Phiên sạc theo giờ" subtitle="So sánh số lượng phiên sạc hôm nay và hôm qua">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MOCK_REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            tickLine={false}
            axisLine={false}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderRadius: '8px',
              border: '1px solid hsl(var(--border))',
            }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line
            type="monotone"
            name="Hôm nay"
            dataKey="sessions"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
          />
          <Line
            type="monotone"
            name="Hôm qua"
            dataKey={() => Math.floor(Math.random() * 10) + 2}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
