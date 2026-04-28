import { Search, AlertCircle, AlertTriangle, Info, CheckCircle2, ListChecks } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { MOCK_ALERTS } from '@/lib/mock-data';
import { AlertItem } from '@/shared/components/common/AlertItem';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useConfirm } from '@/shared/hooks/useConfirm';

export function AlertsPage() {
  const [search, setSearch] = React.useState('');
  const [severityFilter, setSeverityFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('unresolved');
  const [alerts, setAlerts] = React.useState(MOCK_ALERTS);
  const { confirm } = useConfirm();

  const filteredAlerts = React.useMemo(() => {
    return alerts.filter((a) => {
      const matchSearch =
        a.message.toLowerCase().includes(search.toLowerCase()) ||
        a.deviceId.toLowerCase().includes(search.toLowerCase());
      const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
      const matchStatus =
        statusFilter === 'all' || (statusFilter === 'resolved' ? a.resolved : !a.resolved);
      return matchSearch && matchSeverity && matchStatus;
    });
  }, [alerts, search, severityFilter, statusFilter]);

  const counts = React.useMemo(
    () => ({
      critical: alerts.filter((a) => a.severity === 'critical' && !a.resolved).length,
      warning: alerts.filter((a) => a.severity === 'warning' && !a.resolved).length,
      info: alerts.filter((a) => a.severity === 'info' && !a.resolved).length,
      resolved: alerts.filter((a) => a.resolved).length,
    }),
    [alerts],
  );

  const handleResolve = (id: string) => {
    const alert = alerts.find((a) => a.id === id);
    if (!alert) return;

    if (alert.severity === 'critical') {
      confirm({
        title: 'Đánh dấu đã xử lý',
        description:
          'Đây là cảnh báo nghiêm trọng. Bạn có chắc chắn sự cố đã được khắc phục hoàn toàn?',
        variant: 'destructive',
        onConfirm: () => {
          setAlerts((prev) =>
            prev.map((a) =>
              a.id === id ? { ...a, resolved: true, resolvedAt: new Date().toISOString() } : a,
            ),
          );
          toast.success('Đã đánh dấu xử lý thành công');
        },
      });
    } else {
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, resolved: true, resolvedAt: new Date().toISOString() } : a,
        ),
      );
      toast.success('Đã đánh dấu xử lý');
    }
  };

  const handleResolveAll = () => {
    confirm({
      title: 'Đánh dấu tất cả',
      description: 'Bạn có chắc chắn muốn đánh dấu tất cả cảnh báo hiện tại là đã xử lý?',
      onConfirm: () => {
        setAlerts((prev) =>
          prev.map((a) => ({ ...a, resolved: true, resolvedAt: new Date().toISOString() })),
        );
        toast.success('Đã xử lý tất cả cảnh báo');
      },
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Quản lý Cảnh báo"
        actions={
          <Button
            variant="outline"
            onClick={handleResolveAll}
            disabled={filteredAlerts.filter((a) => !a.resolved).length === 0}
          >
            <ListChecks className="mr-2 h-4 w-4" /> Đánh dấu tất cả đã xử lý
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive transition-colors hover:bg-destructive/20"
          onClick={() => {
            setSeverityFilter('critical');
            setStatusFilter('unresolved');
          }}
        >
          <AlertCircle className="mb-2 h-6 w-6" />
          <span className="text-2xl font-bold">{counts.critical}</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Nghiêm trọng</span>
        </div>
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-warning/20 bg-warning/10 p-4 text-warning transition-colors hover:bg-warning/20"
          onClick={() => {
            setSeverityFilter('warning');
            setStatusFilter('unresolved');
          }}
        >
          <AlertTriangle className="mb-2 h-6 w-6" />
          <span className="text-2xl font-bold">{counts.warning}</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Cảnh báo</span>
        </div>
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-primary/20 bg-primary/10 p-4 text-primary transition-colors hover:bg-primary/20"
          onClick={() => {
            setSeverityFilter('info');
            setStatusFilter('unresolved');
          }}
        >
          <Info className="mb-2 h-6 w-6" />
          <span className="text-2xl font-bold">{counts.info}</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Thông tin</span>
        </div>
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-100 p-4 text-slate-500 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          onClick={() => {
            setSeverityFilter('all');
            setStatusFilter('resolved');
          }}
        >
          <CheckCircle2 className="mb-2 h-6 w-6" />
          <span className="text-2xl font-bold">{counts.resolved}</span>
          <span className="text-xs font-semibold uppercase tracking-wider">Đã xử lý</span>
        </div>
      </div>

      <div className="sticky top-14 z-30 -mx-4 flex flex-col items-start justify-between gap-4 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:flex-row sm:items-center md:-mx-8 md:px-8">
        <div className="flex w-full gap-2 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
          {['unresolved', 'resolved', 'all'].map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className="whitespace-nowrap"
            >
              {s === 'unresolved'
                ? 'Chưa xử lý'
                : s === 'resolved'
                  ? 'Đã xử lý'
                  : 'Tất cả trạng thái'}
            </Button>
          ))}
          <div className="mx-2 h-8 w-px bg-border" />
          {['all', 'critical', 'warning', 'info'].map((s) => (
            <Button
              key={s}
              variant={severityFilter === s ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSeverityFilter(s)}
              className="whitespace-nowrap"
            >
              {s === 'all'
                ? 'Mọi mức độ'
                : s === 'critical'
                  ? 'Nghiêm trọng'
                  : s === 'warning'
                    ? 'Cảnh báo'
                    : 'Thông tin'}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm nội dung..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} onResolve={handleResolve} />
          ))}
          {filteredAlerts.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <CheckCircle2 className="mx-auto mb-3 h-12 w-12 opacity-20" />
              <p>Không tìm thấy cảnh báo nào phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
