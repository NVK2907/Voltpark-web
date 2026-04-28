import { Download, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OWNER_ROUTES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { getOwnerCustomers } from '@/lib/utils-owner';
import { DataTable } from '@/shared/components/common/DataTable';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export default function OwnerCustomersPage() {
  const navigate = useNavigate();
  const allCustomers = getOwnerCustomers();
  const [searchTerm, setSearchTerm] = useState('');

  // We mock loyalty tier and spent logic on top of base user data
  const customers = allCustomers
    .map((c, i) => {
      let loyalty: 'new' | 'regular' | 'vip' = 'new';
      if (c.totalSessions > 20) loyalty = 'vip';
      else if (c.totalSessions > 5) loyalty = 'regular';

      return {
        ...c,
        loyalty,
        // just mock values to pretend they spent X at this owner's parkings
        spentHere: c.totalSpent * 0.8,
        sessionsHere: Math.floor(c.totalSessions * 0.8) || 1,
      };
    })
    .filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const columns = [
    {
      key: 'name',
      header: 'Tên khách hàng',
      render: (row: any) => <span className="font-medium text-foreground">{row.name}</span>,
    },
    { key: 'phone', header: 'Số điện thoại' },
    {
      key: 'loyalty',
      header: 'Phân hạng',
      render: (row: any) => {
        const variants = {
          new: 'secondary',
          regular: 'default',
          vip: 'destructive',
        } as const;
        const labels = {
          new: 'Khách mới',
          regular: 'Thân thiết',
          vip: 'VIP',
        };
        return (
          <Badge variant={variants[row.loyalty as keyof typeof variants]}>
            {labels[row.loyalty as keyof typeof labels]}
          </Badge>
        );
      },
    },
    {
      key: 'sessionsHere',
      header: 'Số phiên (Tại bãi của bạn)',
      render: (row: any) => <span>{row.sessionsHere}</span>,
    },
    {
      key: 'spentHere',
      header: 'Đã chi tiêu (Tại bãi của bạn)',
      render: (row: any) => (
        <span className="font-semibold text-primary">{formatCurrency(row.spentHere)}</span>
      ),
    },
    {
      key: 'lastLoginAt',
      header: 'Lần cuối sử dụng',
      render: (row: any) => new Date(row.lastLoginAt).toLocaleDateString('vi-VN'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Khách hàng</h2>
          <p className="text-muted-foreground">
            Quản lý khách hàng sử dụng dịch vụ tại các bãi đỗ của bạn
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Xuất dữ liệu
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, email, SĐT..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        data={customers}
        columns={columns}
        onRowClick={(row) => navigate(`${OWNER_ROUTES.CUSTOMERS}/${row.id}`)}
      />
    </div>
  );
}
