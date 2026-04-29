import { Search, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OWNER_ROUTES } from '@/lib/constants';
import { getOwnerParkings } from '@/lib/utils-owner';
import { DataTable } from '@/shared/components/common/DataTable';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { StaffFormSheet } from '../components/StaffFormSheet';
import type { Staff } from '@/types';

export const MOCK_STAFF: Staff[] = [
  {
    id: 'STF-001',
    ownerId: 'OWN001',
    parkingId: 'ST001',
    name: 'Bùi Văn Kỹ',
    email: 'ky.bv@evsolutions.vn',
    phone: '0987654321',
    role: 'technician',
    shift: 'rotating',
    status: 'on_duty',
    hireDate: new Date(Date.now() - 86400000 * 200).toISOString(),
    performance: { sessionsHandled: 125, complaintsResolved: 10, rating: 4.8 },
  },
  {
    id: 'STF-002',
    ownerId: 'OWN001',
    parkingId: 'ST003',
    name: 'Phạm Thị Quản',
    email: 'quan.pt@evsolutions.vn',
    phone: '0912345678',
    role: 'manager',
    shift: 'morning',
    status: 'off_duty',
    hireDate: new Date(Date.now() - 86400000 * 300).toISOString(),
    performance: { sessionsHandled: 500, complaintsResolved: 45, rating: 4.9 },
  },
  {
    id: 'STF-003',
    ownerId: 'OWN001',
    parkingId: 'ST001',
    name: 'Lê Văn Trực',
    email: 'truc.lv@evsolutions.vn',
    phone: '0923456789',
    role: 'operator',
    shift: 'night',
    status: 'on_duty',
    hireDate: new Date(Date.now() - 86400000 * 50).toISOString(),
    performance: { sessionsHandled: 80, complaintsResolved: 2, rating: 4.2 },
  },
];

export default function StaffListPage() {
  const navigate = useNavigate();
  const parkings = getOwnerParkings();
  const [searchTerm, setSearchTerm] = useState('');
  const [staffList, setStaffList] = useState<Staff[]>(MOCK_STAFF);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleAddSuccess = (values: any) => {
    const newStaff: Staff = {
      id: `STF-${Math.floor(Math.random() * 1000)}`,
      ownerId: 'OWN001',
      status: 'off_duty',
      hireDate: new Date().toISOString(),
      performance: { sessionsHandled: 0, complaintsResolved: 0, rating: 5.0 },
      ...values,
    };
    setStaffList([newStaff, ...staffList]);
  };

  const staff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns = [
    {
      key: 'name',
      header: 'Tên nhân viên',
      render: (row: any) => <span className="font-medium text-foreground">{row.name}</span>,
    },
    {
      key: 'role',
      header: 'Vị trí',
      render: (row: any) => {
        const roles = { manager: 'Quản lý', operator: 'Vận hành', technician: 'Kỹ thuật viên' };
        return <span>{roles[row.role as keyof typeof roles]}</span>;
      },
    },
    {
      key: 'parking',
      header: 'Bãi đỗ trực',
      render: (row: any) => (
        <span>{parkings.find((p) => p.id === row.parkingId)?.name || 'N/A'}</span>
      ),
    },
    {
      key: 'shift',
      header: 'Ca làm việc',
      render: (row: any) => {
        const shifts = { morning: 'Sáng', afternoon: 'Chiều', night: 'Đêm', rotating: 'Xoay ca' };
        return <span>{shifts[row.shift as keyof typeof shifts]}</span>;
      },
    },
    {
      key: 'rating',
      header: 'Đánh giá',
      render: (row: any) => (
        <span className="font-semibold text-amber-500">{row.performance.rating} ⭐️</span>
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
          <h2 className="text-2xl font-bold tracking-tight">Nhân sự</h2>
          <p className="text-muted-foreground">Quản lý đội ngũ nhân viên tại các bãi đỗ</p>
        </div>
        <Button className="gap-2" onClick={() => setIsSheetOpen(true)}>
          <UserPlus className="h-4 w-4" /> Thêm nhân viên
        </Button>
      </div>

      <StaffFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSuccess={handleAddSuccess}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, email..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        data={staff}
        columns={columns}
        onRowClick={(row) => navigate(`${OWNER_ROUTES.STAFF}/${row.id}`)}
      />
    </div>
  );
}
