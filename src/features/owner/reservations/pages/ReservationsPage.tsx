import { Search, Calendar as CalendarIcon, List } from 'lucide-react';
import { useState } from 'react';

import { getOwnerSlots, getOwnerParkings } from '@/lib/utils-owner';
import { DataTable } from '@/shared/components/common/DataTable';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // We mock reservations dynamically from slots with 'reserved' status
  const reservedSlots = getOwnerSlots().filter((s) => s.status === 'reserved');
  const parkings = getOwnerParkings();

  const reservations = reservedSlots.map((slot, index) => ({
    id: `RSV-00${index + 1}`,
    parkingId: slot.parkingId,
    parkingName: parkings.find((p) => p.id === slot.parkingId)?.name || 'Unknown',
    slotId: slot.id,
    zone: slot.zone,
    number: slot.number,
    userId: `USR00${(index % 5) + 1}`,
    userName: `Khách hàng ${index + 1}`,
    vehiclePlate: slot.vehiclePlate || 'N/A',
    startTime: new Date(Date.now() + index * 1000 * 60 * 30).toISOString(), // future start time
    endTime: new Date(Date.now() + index * 1000 * 60 * 30 + 3600000).toISOString(),
    status: 'upcoming',
  }));

  const filteredReservations = reservations.filter(
    (r) =>
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    { key: 'id', header: 'Mã đặt chỗ' },
    {
      key: 'userName',
      header: 'Khách hàng',
      render: (row: any) => <span className="font-medium text-foreground">{row.userName}</span>,
    },
    {
      key: 'vehiclePlate',
      header: 'Biển số',
      render: (row: any) => (
        <span className="rounded border bg-muted px-2 py-1 font-mono">{row.vehiclePlate}</span>
      ),
    },
    { key: 'parkingName', header: 'Bãi đỗ' },
    {
      key: 'slot',
      header: 'Vị trí',
      render: (row: any) => (
        <span>
          Khu {row.zone} - Số {row.number}
        </span>
      ),
    },
    {
      key: 'startTime',
      header: 'Thời gian đến (dự kiến)',
      render: (row: any) => new Date(row.startTime).toLocaleString('vi-VN'),
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
          <h2 className="text-2xl font-bold tracking-tight">Đặt chỗ</h2>
          <p className="text-muted-foreground">Quản lý lịch đặt trước tại các bãi đỗ của bạn</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo mã đặt chỗ, tên KH, biển số xe..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border p-1">
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            className="px-2"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'secondary' : 'ghost'}
            size="sm"
            className="px-2"
            onClick={() => setViewMode('calendar')}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <DataTable
          data={filteredReservations}
          columns={columns}
          onRowClick={(row) => console.log('Reservation clicked', row)}
        />
      ) : (
        <div className="flex h-[600px] items-center justify-center rounded-lg border bg-card text-muted-foreground">
          [Calendar View Placeholder] - TBD
        </div>
      )}
    </div>
  );
}
