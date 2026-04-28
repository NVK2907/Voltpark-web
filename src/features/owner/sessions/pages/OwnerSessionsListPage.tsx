import { Download, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OWNER_ROUTES } from '@/lib/constants';
import { MOCK_OWNER } from '@/lib/mock-owner';
import { formatCurrency } from '@/lib/utils';
import { getOwnerSessions } from '@/lib/utils-owner';
import { DataTable } from '@/shared/components/common/DataTable';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export default function OwnerSessionsListPage() {
  const navigate = useNavigate();
  const allSessions = getOwnerSessions();
  const [searchTerm, setSearchTerm] = useState('');

  const sessions = allSessions.filter(
    (s) =>
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.stationName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    { key: 'id', header: 'Mã phiên' },
    {
      key: 'userName',
      header: 'Khách hàng',
      render: (row: any) => <span className="font-medium text-foreground">{row.userName}</span>,
    },
    { key: 'stationName', header: 'Bãi đỗ' },
    {
      key: 'startTime',
      header: 'Bắt đầu',
      render: (row: any) => new Date(row.startTime).toLocaleString('vi-VN'),
    },
    {
      key: 'energyKwh',
      header: 'Điện năng',
      render: (row: any) => <span>{row.energyKwh} kWh</span>,
    },
    {
      key: 'amount',
      header: 'Tổng tiền',
      render: (row: any) => (
        <span className="text-muted-foreground">{formatCurrency(row.amount)}</span>
      ),
    },
    {
      key: 'netAmount',
      header: 'NET cho tôi',
      render: (row: any) => {
        // Mock net calculation based on owner's share
        const net = Math.floor(row.amount * (MOCK_OWNER.revenueSharePercent / 100));
        return <span className="font-semibold text-primary">{formatCurrency(net)}</span>;
      },
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
          <h2 className="text-2xl font-bold tracking-tight">Phiên sạc</h2>
          <p className="text-muted-foreground">Theo dõi lịch sử sạc tại các bãi đỗ của bạn</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Xuất dữ liệu
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo mã phiên, tên khách hàng, bãi đỗ..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        data={sessions}
        columns={columns}
        onRowClick={(row) => navigate(`${OWNER_ROUTES.SESSIONS}/${row.id}`)}
      />
    </div>
  );
}
