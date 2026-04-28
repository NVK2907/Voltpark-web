import { Download, Wallet, CreditCard, Building } from 'lucide-react';

import { MOCK_OWNER } from '@/lib/mock-owner';
import { formatCurrency } from '@/lib/utils';
import { DataTable } from '@/shared/components/common/DataTable';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import type { Payout } from '@/types';

export default function PayoutsPage() {
  const MOCK_PAYOUTS: Payout[] = [
    {
      id: 'PO-2026-04-001',
      ownerId: 'OWN001',
      periodStart: new Date(Date.now() - 86400000 * 15).toISOString(),
      periodEnd: new Date(Date.now()).toISOString(),
      grossRevenue: 185000000,
      platformFee: 37000000,
      vat: 18500000,
      netAmount: 129500000,
      status: 'processing',
      scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    },
    {
      id: 'PO-2026-03-002',
      ownerId: 'OWN001',
      periodStart: new Date(Date.now() - 86400000 * 45).toISOString(),
      periodEnd: new Date(Date.now() - 86400000 * 15).toISOString(),
      grossRevenue: 160000000,
      platformFee: 32000000,
      vat: 16000000,
      netAmount: 112000000,
      status: 'paid',
      scheduledDate: new Date(Date.now() - 86400000 * 10).toISOString(),
      paidDate: new Date(Date.now() - 86400000 * 9).toISOString(),
      invoiceUrl: '#',
    },
  ];

  const columns = [
    {
      key: 'period',
      header: 'Kỳ thanh toán',
      render: (row: any) => (
        <span>
          {new Date(row.periodStart).toLocaleDateString('vi-VN')} -{' '}
          {new Date(row.periodEnd).toLocaleDateString('vi-VN')}
        </span>
      ),
    },
    {
      key: 'grossRevenue',
      header: 'Tổng thu (Gross)',
      render: (row: any) => <span>{formatCurrency(row.grossRevenue)}</span>,
    },
    {
      key: 'fees',
      header: 'Phí & VAT',
      render: (row: any) => (
        <span className="text-destructive">-{formatCurrency(row.platformFee + row.vat)}</span>
      ),
    },
    {
      key: 'netAmount',
      header: 'Thực nhận (NET)',
      render: (row: any) => (
        <span className="font-bold text-primary">{formatCurrency(row.netAmount)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (row: any) => <StatusBadge status={row.status} />,
    },
    {
      key: 'date',
      header: 'Ngày xử lý',
      render: (row: any) => (
        <span>
          {row.paidDate
            ? new Date(row.paidDate).toLocaleDateString('vi-VN')
            : new Date(row.scheduledDate).toLocaleDateString('vi-VN')}
        </span>
      ),
    },
    {
      key: 'action',
      header: '',
      render: (row: any) =>
        row.invoiceUrl ? (
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Download className="h-4 w-4" /> Hóa đơn
          </Button>
        ) : (
          <span className="text-xs italic text-muted-foreground">Chưa có HĐ</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Thanh toán</h2>
          <p className="text-muted-foreground">
            Theo dõi tiến độ đối soát và thanh toán từ nền tảng EV Charge
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Đang xử lý (Sắp nhận)</p>
                <p className="mt-1 text-2xl font-bold text-primary">{formatCurrency(129500000)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-success/10 p-3">
                <CreditCard className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Đã thanh toán (Năm nay)</p>
                <p className="mt-1 text-2xl font-bold">{formatCurrency(350000000)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Account Info */}
        <Card className="bg-muted/30">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Building className="h-4 w-4" /> Thông tin nhận tiền
              </span>
              <Button variant="link" size="sm" className="h-auto p-0">
                Sửa đổi
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="mt-2 space-y-1 text-sm">
              <p className="font-semibold">{MOCK_OWNER.bankAccount.bankName}</p>
              <p className="font-mono">
                **** **** {MOCK_OWNER.bankAccount.accountNumber.slice(-4)}
              </p>
              <p className="text-muted-foreground">{MOCK_OWNER.bankAccount.accountHolder}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={MOCK_PAYOUTS} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}
