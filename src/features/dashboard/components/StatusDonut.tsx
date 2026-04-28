import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { STATUS_LABELS } from '@/lib/constants';
import { ChartCard } from '@/shared/components/common/ChartCard';
import type { Charger } from '@/types';

interface StatusDonutProps {
  statuses: Record<string, Charger['status']>;
}

export function StatusDonut({ statuses }: StatusDonutProps) {
  const counts = Object.values(statuses).reduce(
    (acc, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = [
    { name: STATUS_LABELS.charging, value: counts.charging || 0, color: 'hsl(var(--primary))' },
    { name: STATUS_LABELS.available, value: counts.available || 0, color: 'hsl(var(--success))' },
    { name: STATUS_LABELS.fault, value: counts.fault || 0, color: 'hsl(var(--destructive))' },
    {
      name: STATUS_LABELS.offline,
      value: counts.offline || 0,
      color: 'hsl(var(--muted-foreground))',
    },
  ].filter((d) => d.value > 0);

  return (
    <ChartCard title="Trạng thái thiết bị" subtitle="Tỉ lệ hoạt động hiện tại">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderRadius: '8px',
              border: '1px solid hsl(var(--border))',
            }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
