import { CalendarClock, Plus, Filter } from 'lucide-react';
import React from 'react';

import { MOCK_STAFF } from './StaffListPage';

import { getOwnerParkings } from '@/lib/utils-owner';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export default function SchedulePage() {
  const parkings = getOwnerParkings();
  const [parkingFilter, setParkingFilter] = React.useState('all');

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];

  // Mock simple weekly schedule grid
  const renderCell = (staffId: string, dayIndex: number) => {
    const staff = MOCK_STAFF.find((s) => s.id === staffId);
    if (!staff) return null;

    // Just some random mock logic to show off days
    const isOff = (staffId.length + dayIndex) % 7 === 0;

    if (isOff)
      return (
        <div className="flex h-full items-center justify-center rounded border border-dashed bg-muted/50 p-2 text-center text-xs text-muted-foreground">
          OFF
        </div>
      );

    const shiftColors = {
      morning: 'bg-sky-100 text-sky-800 border-sky-200',
      afternoon: 'bg-amber-100 text-amber-800 border-amber-200',
      night: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      rotating: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };

    const shiftLabels = {
      morning: 'Sáng (06-14)',
      afternoon: 'Chiều (14-22)',
      night: 'Đêm (22-06)',
      rotating: 'Ca xoay',
    };

    return (
      <div
        className={`flex h-full flex-col items-center justify-center gap-1 rounded border p-2 text-xs ${shiftColors[staff.shift]}`}
      >
        <span className="text-center text-[10px] font-medium sm:text-xs">
          {shiftLabels[staff.shift]}
        </span>
      </div>
    );
  };

  const filteredStaff = MOCK_STAFF.filter(
    (s) => parkingFilter === 'all' || s.parkingId === parkingFilter,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lịch ca trực</h2>
          <p className="text-muted-foreground">Phân công lịch làm việc cho nhân viên tại bãi đỗ</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Phân ca mới
        </Button>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border bg-muted/30 p-3 sm:flex-row">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Tuần 16, 2026 (13/04 - 19/04)</span>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={parkingFilter} onValueChange={setParkingFilter}>
            <SelectTrigger className="w-full bg-background sm:w-[250px]">
              <SelectValue placeholder="Tất cả bãi đỗ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả bãi đỗ</SelectItem>
              {parkings.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-8 border-b bg-muted/50">
              <div className="border-r p-4 text-sm font-semibold">Nhân viên</div>
              {days.map((d, i) => (
                <div
                  key={i}
                  className="border-r p-4 text-center text-sm font-semibold last:border-0"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Staff Rows */}
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className="grid grid-cols-8 border-b transition-colors last:border-0 hover:bg-muted/10"
              >
                <div className="border-r p-3">
                  <p className="text-sm font-medium">{staff.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {parkings.find((p) => p.id === staff.parkingId)?.name}
                  </p>
                  <Badge variant="outline" className="mt-1 text-[10px]">
                    {staff.role}
                  </Badge>
                </div>
                {days.map((_, i) => (
                  <div key={i} className="h-24 border-r p-2 last:border-0">
                    {renderCell(staff.id, i)}
                  </div>
                ))}
              </div>
            ))}

            {filteredStaff.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                Không tìm thấy nhân viên nào cho bãi đỗ này.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
