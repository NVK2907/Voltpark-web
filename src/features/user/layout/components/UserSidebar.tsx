import * as Icons from 'lucide-react';
import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

interface UserSidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  className?: string;
  onMobileClose?: () => void;
}

const USER_NAV_GROUPS = [
  {
    label: 'Khám phá',
    items: [
      { label: 'Bản đồ', href: '/map', icon: 'Map' },
      { label: 'Trạm sạc', href: '/stations', icon: 'Zap' },
      { label: 'Lộ trình', href: '/trip-planner', icon: 'Navigation' },
      { label: 'Yêu thích', href: '/favorites', icon: 'Heart' },
    ],
  },
  {
    label: 'Cá nhân',
    items: [
      { label: 'Lịch sử sạc', href: '/bookings', icon: 'Calendar' },
      { label: 'Ví & Thanh toán', href: '/wallet', icon: 'Wallet' },
      { label: 'Xe của tôi', href: '/vehicles', icon: 'Car' },
    ],
  },
  {
    label: 'Cộng đồng',
    items: [
      { label: 'Đánh giá', href: '/reviews', icon: 'Star' },
      { label: 'Check-in', href: '/checkins', icon: 'MapPin' },
    ],
  },
];

export function UserSidebar({
  collapsed,
  setCollapsed,
  className,
  onMobileClose,
}: UserSidebarProps) {
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-slate-800 bg-slate-900 text-slate-300 transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[260px]',
        className,
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-5">
        <div
          className={cn(
            'flex items-center gap-3 overflow-hidden',
            collapsed && 'w-full justify-center',
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-500/20">
            <Icons.Zap className="h-5 w-5 fill-current text-white" />
          </div>
          {!collapsed && (
            <span className="whitespace-nowrap text-xl font-black tracking-tight text-white">
              EVCharge
            </span>
          )}
        </div>
      </div>

      <div className="scrollbar-none flex-1 overflow-y-auto py-6">
        <TooltipProvider delayDuration={0}>
          <div className="space-y-8">
            {USER_NAV_GROUPS.map((group, i) => (
              <div key={i} className="px-4">
                {!collapsed && (
                  <h4 className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                    {group.label}
                  </h4>
                )}
                <div className="space-y-1.5">
                  {group.items.map((item) => {
                    const Icon = (Icons as any)[item.icon];
                    const isActive = location.pathname.startsWith(item.href);

                    const linkContent = (
                      <NavLink
                        to={item.href}
                        onClick={onMobileClose}
                        className={cn(
                          'group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200',
                          isActive
                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                        )}
                      >
                        {Icon && (
                          <Icon
                            className={cn(
                              'h-5 w-5 shrink-0',
                              isActive ? 'text-white' : 'group-hover:text-violet-400',
                            )}
                          />
                        )}
                        {!collapsed && <span className="truncate">{item.label}</span>}
                        {isActive && !collapsed && (
                          <div className="absolute right-2 h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        )}
                      </NavLink>
                    );

                    if (collapsed) {
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="ml-2 border-none bg-violet-600 font-bold"
                          >
                            {item.label}
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return <React.Fragment key={item.href}>{linkContent}</React.Fragment>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>

      <div className="shrink-0 border-t border-slate-800 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="hidden h-10 w-full justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-800 hover:text-white lg:flex"
        >
          {collapsed ? (
            <Icons.ChevronRight className="h-5 w-5" />
          ) : (
            <div className="flex items-center gap-2">
              <Icons.ChevronLeft className="h-5 w-5" />{' '}
              <span className="text-xs font-bold">THU GỌN</span>
            </div>
          )}
        </Button>
      </div>
    </aside>
  );
}
