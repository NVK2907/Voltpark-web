import { Plus, Search, LayoutGrid, List } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/lib/constants';
import { MOCK_STATIONS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { DataTable } from '@/shared/components/common/DataTable';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type { Station, ColumnDef } from '@/types';
import { AddStationSheet } from '../components/AddStationSheet';

export function StationsListPage() {
  const navigate = useNavigate();
  const [stations, setStations] = React.useState<Station[]>(MOCK_STATIONS);
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [viewMode, setViewMode] = React.useState<'table' | 'grid'>('table');
  const [addOpen, setAddOpen] = React.useState(false);

  const filteredStations = React.useMemo(() => {
    return stations.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [stations, search, statusFilter]);

  const columns: ColumnDef<Station>[] = [
    {
      key: 'name',
      header: 'Tên trạm',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium text-primary">{row.name}</div>
          <div className="max-w-[250px] truncate text-xs text-muted-foreground">{row.address}</div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'activeChargers',
      header: 'Sử dụng',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {row.activeChargers}/{row.totalSlots}
          </span>
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full ${row.loadPercent >= 80 ? 'bg-destructive' : row.loadPercent >= 50 ? 'bg-warning' : 'bg-success'}`}
              style={{ width: `${row.loadPercent}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'revenueToday',
      header: 'Doanh thu HM',
      sortable: true,
      render: (row) => <span className="font-medium">{formatCurrency(row.revenueToday)}</span>,
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`${ROUTES.STATIONS}/${row.id}`);
          }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Quản lý Trạm Sạc"
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Thêm trạm mới
          </Button>
        }
      />

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex w-full flex-1 items-center gap-4 sm:w-auto">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm tên, địa chỉ..."
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
              <SelectItem value="online">Trực tuyến</SelectItem>
              <SelectItem value="offline">Ngoại tuyến</SelectItem>
              <SelectItem value="maintenance">Bảo trì</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1 rounded-lg border bg-muted p-1">
          <Button
            variant={viewMode === 'table' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('table')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={filteredStations}
          onRowClick={(row) => navigate(`${ROUTES.STATIONS}/${row.id}`)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="flex cursor-pointer flex-col rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
              onClick={() => navigate(`${ROUTES.STATIONS}/${station.id}`)}
            >
              <div className="mb-2 flex items-start justify-between">
                <StatusBadge status={station.status} size="sm" />
                <span className="font-mono text-xs text-muted-foreground">{station.id}</span>
              </div>
              <h3 className="mb-1 line-clamp-1 text-lg font-semibold" title={station.name}>
                {station.name}
              </h3>
              <p
                className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground"
                title={station.address}
              >
                {station.address}
              </p>

              <div className="mt-auto flex items-end justify-between border-t pt-3">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Đang sạc</p>
                  <p className="font-medium">
                    {station.activeChargers} / {station.totalSlots}
                  </p>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-xs text-muted-foreground">Doanh thu HN</p>
                  <p className="font-medium text-primary">{formatCurrency(station.revenueToday)}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredStations.length === 0 && (
            <div className="col-span-full rounded-xl border bg-card py-12 text-center text-muted-foreground">
              Không tìm thấy trạm sạc nào phù hợp.
            </div>
          )}
        </div>
      )}

      <AddStationSheet
        open={addOpen}
        onOpenChange={setAddOpen}
        onAdd={(newStation) => setStations((prev) => [newStation, ...prev])}
      />
    </div>
  );
}
