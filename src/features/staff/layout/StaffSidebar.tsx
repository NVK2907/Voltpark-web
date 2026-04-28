import {
  LayoutDashboard,
  BatteryCharging,
  Users,
  QrCode,
  CheckSquare,
  AlertTriangle,
  Clock,
  FileText,
  Bell,
  UserCircle,
  LogOut,
} from 'lucide-react';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

export function StaffSidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const location = useLocation();

  const navGroups = [
    {
      label: 'Vận hành',
      items: [
        { label: 'Trang chủ', href: STAFF_ROUTES.HOME, icon: LayoutDashboard },
        { label: 'Phiên sạc', href: STAFF_ROUTES.SESSIONS, icon: BatteryCharging },
        { label: 'Khách hàng', href: STAFF_ROUTES.CUSTOMERS, icon: Users },
        { label: 'Quét QR', href: STAFF_ROUTES.SCAN, icon: QrCode },
      ],
    },
    {
      label: 'Công việc',
      items: [
        { label: 'Việc cần làm', href: STAFF_ROUTES.TASKS, icon: CheckSquare },
        { label: 'Báo cáo', href: STAFF_ROUTES.REPORT, icon: AlertTriangle },
      ],
    },
    {
      label: 'Ca làm việc',
      items: [
        { label: 'Ca của tôi', href: STAFF_ROUTES.SHIFT, icon: Clock },
        { label: 'Bàn giao', href: STAFF_ROUTES.SHIFT_HANDOVER, icon: FileText },
      ],
    },
    {
      label: 'Khẩn cấp',
      items: [
        {
          label: 'Emergency',
          href: STAFF_ROUTES.EMERGENCY,
          icon: AlertTriangle,
          isDestructive: true,
        },
      ],
    },
    {
      label: 'Cá nhân',
      items: [
        { label: 'Thông báo', href: STAFF_ROUTES.NOTIFICATIONS, icon: Bell },
        { label: 'Tài khoản', href: STAFF_ROUTES.ME, icon: UserCircle },
      ],
    },
  ];

  return (
    <div
      className={cn(
        'z-20 flex h-screen flex-col border-r border-slate-800 bg-slate-900 text-slate-300 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Logo Area */}
      <div className="flex h-14 shrink-0 items-center border-b border-slate-800 px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-violet-600 font-bold text-white">
            EV
          </div>
          {!isCollapsed && (
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-bold leading-tight text-slate-100">EVCharge</span>
              <span className="w-fit rounded bg-violet-500/10 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                Staff
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="scrollbar-thin scrollbar-thumb-slate-700 flex-1 overflow-y-auto py-4">
        <TooltipProvider delayDuration={0}>
          {navGroups.map((group, i) => (
            <div key={i} className="mb-6 px-3">
              {!isCollapsed && (
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {group.label}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    location.pathname === item.href ||
                    location.pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  const navItem = (
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center gap-3 whitespace-nowrap rounded-md px-2 py-2 transition-colors',
                        isActive
                          ? 'bg-violet-600/20 font-medium text-violet-400'
                          : 'hover:bg-slate-800 hover:text-slate-100',
                        (item as any).isDestructive &&
                          !isActive &&
                          'text-red-400 hover:bg-red-500/10 hover:text-red-300',
                        (item as any).isDestructive && isActive && 'bg-red-500/20 text-red-400',
                        isCollapsed && 'justify-center px-0',
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  );

                  if (isCollapsed) {
                    return (
                      <Tooltip key={item.href}>
                        <TooltipTrigger asChild>{navItem}</TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="border-slate-800 bg-slate-900 text-slate-100"
                        >
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return <React.Fragment key={item.href}>{navItem}</React.Fragment>;
                })}
              </div>
            </div>
          ))}
        </TooltipProvider>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-800 p-3">
        <button
          className={cn(
            'flex w-full items-center gap-3 rounded-md px-2 py-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100',
            isCollapsed && 'justify-center px-0',
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
}
