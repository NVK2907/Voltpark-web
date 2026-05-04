import { Menu, Bell, Plus, Sun, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { GlobalSearch } from './GlobalSearch';
import { ShiftStatusPill } from './ShiftStatusPill';

import { STAFF_ROUTES, AUTH_ROUTES } from '@/lib/constants';
import { MOCK_STAFF_CONTEXT } from '@/lib/mock-staff';
import { useStaffActionQueue } from '@/lib/staff-action-queue';
import { useAuthStore } from '@/features/auth';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

export function StaffHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const navigate = useNavigate();
  const { queue, isOnline } = useStaffActionQueue();
  const pendingCount = queue.filter((a) => a.status === 'pending' || a.status === 'failed').length;

  return (
    <div className="sticky top-0 z-10 flex flex-col border-b bg-background">
      {!isOnline && (
        <div className="bg-red-500 px-4 py-1 text-center text-xs font-medium text-white">
          Mất kết nối mạng — {pendingCount} hành động đang chờ đồng bộ
        </div>
      )}
      <header className="flex h-14 shrink-0 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-muted-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden max-w-[200px] truncate font-semibold sm:block">
            {MOCK_STAFF_CONTEXT.assignedParkingName}
          </div>
        </div>

        <div className="flex max-w-xl flex-1 justify-center px-4">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ShiftStatusPill />
          </div>

          <Button
            variant="default"
            size="sm"
            className="hidden h-8 gap-1 bg-violet-600 hover:bg-violet-700 sm:flex"
            onClick={() => navigate(STAFF_ROUTES.SESSIONS_NEW)}
          >
            <Plus className="h-4 w-4" /> Phiên sạc mới
          </Button>

          <Button variant="ghost" size="icon" className="relative text-muted-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-background bg-red-500" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden text-muted-foreground sm:flex">
            <Sun className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-muted/50 text-muted-foreground"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tài khoản Staff</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(STAFF_ROUTES.PROFILE)}>
                <User className="mr-2 h-4 w-4" /> Hồ sơ
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(STAFF_ROUTES.NOTIFICATIONS)}>
                <Bell className="mr-2 h-4 w-4" /> Thông báo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <Settings className="mr-2 h-4 w-4" /> Cài đặt
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                onSelect={(e) => {
                  e.preventDefault();
                  useAuthStore.getState().logout();
                  window.location.href = AUTH_ROUTES.LOGIN;
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
