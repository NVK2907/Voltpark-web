import { useState, useEffect } from 'react';

import { REALTIME_INTERVAL_MS } from '@/lib/constants';
import { MOCK_ALERTS, MOCK_CHARGERS } from '@/lib/mock-data';
import type { Charger, Alert } from '@/types';

export interface RealtimeUpdate {
  kpis: {
    revenue: number;
    activeSessions: number;
    occupancyPercent: number;
    healthPercent: number;
  };
  chargerStatuses: Record<string, Charger['status']>;
  newAlerts: Alert[];
  lastUpdated: string;
}

export function useRealtime() {
  const [data, setData] = useState<RealtimeUpdate>({
    kpis: {
      revenue: 47250000,
      activeSessions: 23,
      occupancyPercent: 53,
      healthPercent: 94.2,
    },
    chargerStatuses: MOCK_CHARGERS.reduce((acc, c) => ({ ...acc, [c.id]: c.status }), {}),
    newAlerts: MOCK_ALERTS.slice(0, 5),
    lastUpdated: new Date().toISOString(),
  });

  const forceUpdate = () => {
    setData((prev) => ({
      ...prev,
      kpis: {
        ...prev.kpis,
        revenue: prev.kpis.revenue + Math.floor(Math.random() * 50000), // fluctuate
        activeSessions: prev.kpis.activeSessions + (Math.random() > 0.5 ? 1 : -1),
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate();
    }, REALTIME_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return { data, forceUpdate };
}
