import { Zap, Search, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OWNER_ROUTES, CONNECTOR_LABELS } from '@/lib/constants';
import { getOwnerChargers, getOwnerParkings } from '@/lib/utils-owner';
import { StatusBadge } from '@/shared/components/common/StatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export default function OwnerChargersListPage() {
  const navigate = useNavigate();
  const allChargers = getOwnerChargers();
  const parkings = getOwnerParkings();

  const [searchTerm, setSearchTerm] = useState('');
  const [parkingFilter, setParkingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const chargers = allChargers.filter((c) => {
    if (searchTerm && !c.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (parkingFilter !== 'all' && c.stationId !== parkingFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Thiết bị sạc</h2>
          <p className="text-muted-foreground">
            Quản lý {allChargers.length} bộ sạc thuộc sở hữu của bạn
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-lg border bg-muted/30 p-3 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo mã ID..."
            className="bg-background pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={parkingFilter} onValueChange={setParkingFilter}>
          <SelectTrigger className="w-full bg-background sm:w-[200px]">
            <SelectValue placeholder="Bãi đỗ" />
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

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full bg-background sm:w-[150px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="available">Sẵn sàng</SelectItem>
            <SelectItem value="charging">Đang sạc</SelectItem>
            <SelectItem value="fault">Lỗi</SelectItem>
            <SelectItem value="offline">Ngoại tuyến</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {chargers.map((charger) => (
          <div
            key={charger.id}
            className="cursor-pointer space-y-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:border-primary/50"
            onClick={() => navigate(`${OWNER_ROUTES.CHARGERS}/${charger.id}`)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Zap className="h-4 w-4 text-primary" /> {charger.id}
                </h3>
                <p className="truncate text-xs text-muted-foreground" title={charger.stationName}>
                  {charger.stationName}
                </p>
              </div>
              <StatusBadge status={charger.status} />
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div className="text-muted-foreground">Công suất</div>
              <div className="text-right font-medium">{charger.powerKw} kW</div>

              <div className="text-muted-foreground">Cổng sạc</div>
              <div className="text-right font-medium">
                {CONNECTOR_LABELS[charger.connectorType]}
              </div>

              <div className="text-muted-foreground">Phần mềm</div>
              <div className="text-right font-medium">{charger.firmwareVersion}</div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-2 border-destructive/50 text-xs text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation();
                  // TBD: Mở modal yêu cầu bảo trì
                }}
              >
                <AlertTriangle className="h-3 w-3" /> Yêu cầu bảo trì
              </Button>
            </div>
          </div>
        ))}
        {chargers.length === 0 && (
          <div className="col-span-full rounded-lg border border-dashed py-12 text-center text-muted-foreground">
            Không tìm thấy bộ sạc nào.
          </div>
        )}
      </div>
    </div>
  );
}
