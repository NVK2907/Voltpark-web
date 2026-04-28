import { Search, User as UserIcon, Building, Wallet, Download } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/lib/constants';
import { MOCK_USERS } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';
import { DataTable } from '@/shared/components/common/DataTable';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import type { User, ColumnDef } from '@/types';

export function UsersListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('all');

  const filteredUsers = React.useMemo(() => {
    return MOCK_USERS.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search);
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [search, roleFilter]);

  const columns: ColumnDef<User>[] = [
    {
      key: 'name',
      header: 'Người dùng',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            {row.role === 'owner' ? (
              <Building className="h-5 w-5 text-primary" />
            ) : (
              <UserIcon className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <div className="font-medium text-foreground">{row.name}</div>
            <div className="text-xs text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Số điện thoại',
      render: (row) => <span className="font-mono text-sm">{row.phone}</span>,
    },
    {
      key: 'role',
      header: 'Loại TK',
      sortable: true,
      render: (row) => (
        <span
          className={cn(
            'rounded-full px-2 py-1 text-xs font-medium',
            row.role === 'owner'
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
          )}
        >
          {row.role === 'owner' ? 'Doanh nghiệp' : 'Cá nhân'}
        </span>
      ),
    },
    {
      key: 'walletBalance',
      header: 'Số dư ví',
      sortable: true,
      render: (row) => (
        <span className={cn('font-medium', row.walletBalance < 50000 && 'text-destructive')}>
          {formatCurrency(row.walletBalance)}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Tham gia',
      sortable: true,
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              alert('Mở modal nạp tiền');
            }}
          >
            <Wallet className="mr-2 h-4 w-4" /> Nạp tiền
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Quản lý Người dùng"
        actions={
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Xuất dữ liệu
          </Button>
        }
      />

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Tabs value={roleFilter} onValueChange={setRoleFilter} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="b2c">Cá nhân</TabsTrigger>
            <TabsTrigger value="b2b">Doanh nghiệp</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, email, sđt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        onRowClick={(row) => navigate(`${ROUTES.USERS}/${row.id}`)}
      />
    </div>
  );
}
