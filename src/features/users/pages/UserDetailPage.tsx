import {
  User as UserIcon,
  Building,
  Mail,
  Phone,
  Calendar,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/lib/constants';
import { MOCK_USERS } from '@/lib/mock-data';
import { formatCurrency, formatRelativeTime, cn } from '@/lib/utils';
import { DataTable } from '@/shared/components/common/DataTable';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

export function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = MOCK_USERS.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-2 text-xl font-bold">Không tìm thấy người dùng</h2>
        <Button onClick={() => navigate(ROUTES.USERS)}>Quay lại danh sách</Button>
      </div>
    );
  }

  // Mock data for user's charging history
  const chargingHistory = Array.from({ length: 15 }).map((_, i) => ({
    id: `SS-${Math.floor(Math.random() * 10000)}`,
    stationName: i % 2 === 0 ? 'Trạm sạc Quận 1' : 'Trạm sạc Quận 7',
    energyKwh: (Math.random() * 30 + 5).toFixed(1),
    cost: Math.floor(Math.random() * 150000) + 50000,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));

  // Mock data for wallet transactions
  const walletTransactions = Array.from({ length: 10 }).map((_, i) => {
    const isDeposit = Math.random() > 0.5;
    return {
      id: `TX-${Math.floor(Math.random() * 10000)}`,
      type: isDeposit ? 'deposit' : 'payment',
      amount: isDeposit
        ? Math.floor(Math.random() * 500000) + 100000
        : -(Math.floor(Math.random() * 150000) + 50000),
      timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      description: isDeposit ? 'Nạp tiền qua VNPay' : 'Thanh toán phí sạc',
    };
  });

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        breadcrumbs={[{ label: 'Người dùng', href: ROUTES.USERS }, { label: user.name }]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Col 1: Profile & Wallet */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hồ sơ người dùng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  {user.role === 'owner' ? (
                    <Building className="h-8 w-8 text-primary" />
                  ) : (
                    <UserIcon className="h-8 w-8 text-primary" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <span
                    className={cn(
                      'mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium',
                      user.role === 'owner'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-slate-100 text-slate-700',
                    )}
                  >
                    {user.role === 'owner' ? 'Doanh nghiệp' : 'Cá nhân'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="font-mono">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>Tham gia từ {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Wallet className="h-5 w-5" /> Ví EVPay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="mb-1 text-sm text-muted-foreground">Số dư khả dụng</p>
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(user.walletBalance)}
                </p>
              </div>
              <Button className="w-full" onClick={() => alert('Mở modal nạp tiền')}>
                <CreditCard className="mr-2 h-4 w-4" /> Nạp tiền vào ví
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Col 2: Tabs */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <Tabs defaultValue="sessions" className="flex h-full w-full flex-col">
              <CardHeader className="border-b px-6 py-4">
                <TabsList className="grid w-full max-w-sm grid-cols-2">
                  <TabsTrigger value="sessions">Lịch sử sạc</TabsTrigger>
                  <TabsTrigger value="wallet">Giao dịch ví</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <TabsContent value="sessions" className="m-0 border-none p-6 outline-none">
                  <DataTable
                    columns={[
                      {
                        key: 'id',
                        header: 'ID Phiên',
                        render: (r) => <span className="font-mono text-xs">{r.id}</span>,
                      },
                      {
                        key: 'stationName',
                        header: 'Trạm sạc',
                        render: (r) => <span className="font-medium">{r.stationName}</span>,
                      },
                      {
                        key: 'energyKwh',
                        header: 'Điện năng',
                        render: (r) => (
                          <span className="font-medium text-sky-600">{r.energyKwh} kWh</span>
                        ),
                      },
                      { key: 'cost', header: 'Thành tiền', render: (r) => formatCurrency(r.cost) },
                      {
                        key: 'timestamp',
                        header: 'Thời gian',
                        render: (r) => (
                          <span className="text-sm text-muted-foreground">
                            {formatRelativeTime(r.timestamp)}
                          </span>
                        ),
                      },
                    ]}
                    data={chargingHistory}
                    onRowClick={() => {}}
                  />
                </TabsContent>
                <TabsContent value="wallet" className="m-0 border-none p-6 outline-none">
                  <DataTable
                    columns={[
                      {
                        key: 'id',
                        header: 'Mã GD',
                        render: (r) => <span className="font-mono text-xs">{r.id}</span>,
                      },
                      {
                        key: 'type',
                        header: 'Loại',
                        render: (r) => (
                          <div
                            className={cn(
                              'flex items-center gap-1',
                              r.type === 'deposit' ? 'text-success' : 'text-muted-foreground',
                            )}
                          >
                            {r.type === 'deposit' ? (
                              <ArrowDownRight className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                            {r.type === 'deposit' ? 'Nạp tiền' : 'Thanh toán'}
                          </div>
                        ),
                      },
                      { key: 'description', header: 'Nội dung' },
                      {
                        key: 'amount',
                        header: 'Số tiền',
                        render: (r) => (
                          <span
                            className={cn(
                              'font-medium',
                              r.amount > 0 ? 'text-success' : 'text-foreground',
                            )}
                          >
                            {r.amount > 0 ? '+' : ''}
                            {formatCurrency(r.amount)}
                          </span>
                        ),
                      },
                      {
                        key: 'timestamp',
                        header: 'Thời gian',
                        render: (r) => (
                          <span className="text-sm text-muted-foreground">
                            {formatRelativeTime(r.timestamp)}
                          </span>
                        ),
                      },
                    ]}
                    data={walletTransactions}
                    onRowClick={() => {}}
                  />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
