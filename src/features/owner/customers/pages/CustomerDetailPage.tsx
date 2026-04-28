import { ArrowLeft, User, Phone, Mail, Award, Zap, CreditCard, Activity } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { OWNER_ROUTES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { getOwnerCustomers, getOwnerSessions } from '@/lib/utils-owner';
import { DataTable } from '@/shared/components/common/DataTable';
import { EmptyState } from '@/shared/components/common/EmptyState';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = getOwnerCustomers().find((c) => c.id === id);
  const customerSessions = getOwnerSessions().filter((s) => s.userId === id);

  if (!customer) {
    return (
      <EmptyState
        title="Không tìm thấy khách hàng"
        description="Khách hàng không tồn tại hoặc bạn không có quyền truy cập."
      />
    );
  }

  const spentHere = customerSessions.reduce((acc, s) => acc + s.amount, 0);
  const kwhHere = customerSessions.reduce((acc, s) => acc + s.energyKwh, 0);

  const sessionColumns = [
    { key: 'id', header: 'Mã phiên' },
    { key: 'stationName', header: 'Bãi đỗ' },
    {
      key: 'startTime',
      header: 'Thời gian',
      render: (row: any) => new Date(row.startTime).toLocaleString('vi-VN'),
    },
    {
      key: 'energyKwh',
      header: 'Điện năng',
      render: (row: any) => <span>{row.energyKwh} kWh</span>,
    },
    {
      key: 'amount',
      header: 'Thanh toán',
      render: (row: any) => (
        <span className="font-semibold text-primary">{formatCurrency(row.amount)}</span>
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
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(OWNER_ROUTES.CUSTOMERS)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{customer.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">ID: {customer.id}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hồ sơ khách hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{customer.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Award className="h-3 w-3 text-warning" />
                  {customer.totalSessions > 20
                    ? 'Hạng VIP'
                    : customer.totalSessions > 5
                      ? 'Khách Thân Thiết'
                      : 'Khách Mới'}
                </div>
              </div>
            </div>
            <div className="space-y-3 border-t pt-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats at my parkings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Hoạt động tại bãi đỗ của bạn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-muted p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" /> Số phiên sạc
                </div>
                <p className="text-2xl font-bold">{customerSessions.length}</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Zap className="h-4 w-4" /> Điện năng sạc
                </div>
                <p className="text-2xl font-bold">{kwhHere.toFixed(1)} kWh</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
                <div className="mb-2 flex items-center gap-2 font-medium text-primary">
                  <CreditCard className="h-4 w-4" /> Đã chi tiêu
                </div>
                <p className="text-2xl font-bold text-primary">{formatCurrency(spentHere)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao dịch (Tại bãi đỗ của bạn)</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={customerSessions}
            columns={sessionColumns}
            onRowClick={(row) => navigate(`${OWNER_ROUTES.SESSIONS}/${row.id}`)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
