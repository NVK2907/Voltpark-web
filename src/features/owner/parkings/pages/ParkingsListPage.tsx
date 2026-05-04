import { Download, Search, LayoutGrid, List, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OWNER_ROUTES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { getOwnerParkings } from '@/lib/utils-owner';
import { DataTable } from '@/shared/components/common/DataTable';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export default function ParkingsListPage() {
  const navigate = useNavigate();
  const allParkings = getOwnerParkings();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const parkings = allParkings.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    {
      key: 'name',
      header: 'Tên bãi đỗ',
      render: (row: any) => <span className="font-medium text-foreground">{row.name}</span>,
    },
    {
      key: 'address',
      header: 'Địa chỉ',
      render: (row: any) => (
        <span
          className="inline-block max-w-[200px] truncate text-muted-foreground"
          title={row.address}
        >
          {row.address}
        </span>
      ),
    },
    { key: 'totalSlots', header: 'Tổng slot' },
    { key: 'activeChargers', header: 'Slot có sạc' },
    {
      key: 'loadPercent',
      header: 'Tải hiện tại',
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full ${row.loadPercent < 40 ? 'bg-destructive' : row.loadPercent < 70 ? 'bg-warning' : 'bg-success'}`}
              style={{ width: `${row.loadPercent}%` }}
            />
          </div>
          <span className="text-xs">{row.loadPercent}%</span>
        </div>
      ),
    },
    {
      key: 'revenueToday',
      header: 'Doanh thu hôm nay (NET)',
      render: (row: any) => (
        <span className="font-semibold text-primary">{formatCurrency(row.revenueToday)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (row: any) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bãi đỗ của tôi</h2>
          <p className="text-muted-foreground">
            Quản lý {allParkings.length} bãi đỗ đang hoạt động
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Xuất danh sách
          </Button>
          <Button className="gap-2" onClick={() => {}}>
            <Plus className="h-4 w-4" /> Thêm bãi đỗ
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, địa chỉ..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border p-1">
          <Button
            variant={viewMode === 'table' ? 'secondary' : 'ghost'}
            size="sm"
            className="px-2"
            onClick={() => setViewMode('table')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            className="px-2"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable
          data={parkings}
          columns={columns}
          onRowClick={(row) => navigate(`${OWNER_ROUTES.PARKINGS}/${row.id}`)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {parkings.map((parking) => (
            <div
              key={parking.id}
              className="cursor-pointer space-y-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:border-primary/50"
              onClick={() => navigate(`${OWNER_ROUTES.PARKINGS}/${parking.id}`)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{parking.name}</h3>
                  <p className="truncate text-sm text-muted-foreground" title={parking.address}>
                    {parking.address}
                  </p>
                </div>
                <StatusBadge status={parking.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Tổng slot</p>
                  <p className="font-medium">{parking.totalSlots}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Slot có sạc</p>
                  <p className="font-medium">{parking.activeChargers}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Doanh thu NET</p>
                  <p className="font-semibold text-primary">
                    {formatCurrency(parking.revenueToday)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tải hiện tại</p>
                  <p className="font-medium">{parking.loadPercent}%</p>
                </div>
              </div>
            </div>
          ))}
          {parkings.length === 0 && (
            <div className="col-span-full rounded-lg border border-dashed py-12 text-center text-muted-foreground">
              Không tìm thấy bãi đỗ nào.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
