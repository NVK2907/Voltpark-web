import { Search, Power } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/lib/constants';
import { MOCK_CHARGERS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export function ChargersListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  const filteredChargers = React.useMemo(() => {
    return MOCK_CHARGERS.filter((c) => {
      const matchSearch =
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.stationName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Quản lý Bộ Sạc" />

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm ID bộ sạc, tên trạm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="charging">Đang sạc</SelectItem>
            <SelectItem value="available">Sẵn sàng</SelectItem>
            <SelectItem value="fault">Lỗi</SelectItem>
            <SelectItem value="offline">Ngoại tuyến</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredChargers.map((charger) => (
          <div
            key={charger.id}
            className={cn(
              'relative flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-card p-4 transition-all hover:shadow-md',
              charger.status === 'charging' &&
                'border-sky-200 bg-sky-50/30 hover:border-sky-300 dark:border-sky-900 dark:bg-sky-900/10 dark:hover:border-sky-700',
            )}
            onClick={() => navigate(`${ROUTES.CHARGERS}/${charger.id}`)}
          >
            {charger.status === 'charging' && (
              <div className="absolute left-0 top-0 h-1 w-full bg-sky-500/20">
                <div
                  className="h-full animate-pulse bg-sky-500"
                  style={{
                    width: `${Math.min(100, ((charger.sessionDurationMin || 0) / 60) * 100)}%`,
                  }}
                />
              </div>
            )}

            <div className="mb-3 flex items-start justify-between">
              <div className="font-mono text-lg font-bold">{charger.id}</div>
              <StatusBadge status={charger.status} size="sm" />
            </div>

            <p
              className="mb-4 line-clamp-1 text-sm text-muted-foreground"
              title={charger.stationName}
            >
              {charger.stationName}
            </p>

            <div className="mt-auto grid grid-cols-2 gap-2 border-t pt-3 text-sm">
              <div>
                <p className="mb-0.5 text-xs text-muted-foreground">Công suất</p>
                <p className="flex items-center font-medium">
                  <Power className="mr-1 h-3 w-3 text-primary" /> {charger.powerKw} kW
                </p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-muted-foreground">Chuẩn sạc</p>
                <p className="font-medium">{charger.connectorType}</p>
              </div>

              {charger.status === 'charging' && (
                <>
                  <div className="col-span-1 mt-2">
                    <p className="mb-0.5 text-xs text-muted-foreground">Đã sạc</p>
                    <p className="font-medium text-sky-600 dark:text-sky-400">
                      {charger.currentEnergyKwh} kWh
                    </p>
                  </div>
                  <div className="col-span-1 mt-2">
                    <p className="mb-0.5 text-xs text-muted-foreground">Thời gian</p>
                    <p className="font-medium text-sky-600 dark:text-sky-400">
                      {charger.sessionDurationMin} phút
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        {filteredChargers.length === 0 && (
          <div className="col-span-full rounded-xl border bg-card py-12 text-center text-muted-foreground">
            Không tìm thấy bộ sạc nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
