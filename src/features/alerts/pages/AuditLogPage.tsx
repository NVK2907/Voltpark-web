import { Search } from 'lucide-react';
import * as React from 'react';

import { formatRelativeTime } from '@/lib/utils';
import { DataTable } from '@/shared/components/common/DataTable';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type { ColumnDef } from '@/types';

// Mock Audit Data
const AUDIT_LOGS = Array.from({ length: 50 }).map((_, i) => {
  const actions = ['create', 'update', 'delete', 'login'];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const targets = ['Station', 'Charger', 'User', 'System'];
  const target = targets[Math.floor(Math.random() * targets.length)];

  return {
    id: `LOG-${1000 + i}`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    admin:
      ['admin@evcharge.vn', 'mod@evcharge.vn', 'system'][Math.floor(Math.random() * 3)] || 'system',
    action,
    target: target || 'System',
    targetId: `${target?.substring(0, 2).toUpperCase() || 'SYS'}-${Math.floor(Math.random() * 100)}`,
    ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
    details: {
      before: action === 'update' ? { status: 'offline' } : undefined,
      after: action === 'update' ? { status: 'online' } : { reason: 'manual trigger' },
    },
  };
});

export function AuditLogPage() {
  const [search, setSearch] = React.useState('');
  const [actionFilter, setActionFilter] = React.useState('all');

  const filteredLogs = React.useMemo(() => {
    return AUDIT_LOGS.filter((log) => {
      const matchSearch =
        (log.admin || '').includes(search) ||
        (log.targetId || '').includes(search) ||
        log.ip.includes(search);
      const matchAction = actionFilter === 'all' || log.action === actionFilter;
      return matchSearch && matchAction;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [search, actionFilter]);

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'create':
        return (
          <span className="rounded-full bg-success/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
            Create
          </span>
        );
      case 'update':
        return (
          <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            Update
          </span>
        );
      case 'delete':
        return (
          <span className="rounded-full bg-destructive/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive">
            Delete
          </span>
        );
      case 'login':
        return (
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            Login
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {action}
          </span>
        );
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      key: 'timestamp',
      header: 'Thời gian',
      sortable: true,
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{new Date(row.timestamp).toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">{formatRelativeTime(row.timestamp)}</span>
        </div>
      ),
    },
    {
      key: 'admin',
      header: 'Admin',
      sortable: true,
      render: (row) => <span className="text-sm font-medium">{row.admin}</span>,
    },
    {
      key: 'action',
      header: 'Hành động',
      sortable: true,
      render: (row) => getActionBadge(row.action),
    },
    {
      key: 'target',
      header: 'Đối tượng',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{row.target}</span>
          <span className="font-mono text-xs text-muted-foreground">{row.targetId}</span>
        </div>
      ),
    },
    {
      key: 'ip',
      header: 'IP Address',
      render: (row) => (
        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{row.ip}</span>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Nhật ký hoạt động" />

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm theo email admin, IP, ID đối tượng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Loại hành động" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả hành động</SelectItem>
            <SelectItem value="create">Tạo mới (Create)</SelectItem>
            <SelectItem value="update">Cập nhật (Update)</SelectItem>
            <SelectItem value="delete">Xóa (Delete)</SelectItem>
            <SelectItem value="login">Đăng nhập (Login)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filteredLogs}
        onRowClick={(row) => {
          // Typically this would open a modal or expand the row to show the JSON details
          console.log(row.details);
        }}
      />
    </div>
  );
}
