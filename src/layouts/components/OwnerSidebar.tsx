import {
  Zap,
  LayoutDashboard,
  MapPin,
  Activity,
  Calendar,
  Users,
  MessageSquare,
  Tag,
  PieChart,
  Wallet,
  DollarSign,
  FileText,
  UserCircle,
  CalendarClock,
  Wrench,
  Bell,
  Settings,
  X,
  LogOut,
} from 'lucide-react';
import type React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { OWNER_NAV_GROUPS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

// Map icon string to Lucide component
const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  MapPin,
  Zap,
  Activity,
  Calendar,
  Users,
  MessageSquare,
  Tag,
  PieChart,
  Wallet,
  DollarSign,
  FileText,
  UserCircle,
  CalendarClock,
  Wrench,
  Bell,
  Settings,
};

interface OwnerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OwnerSidebar({ isOpen, onClose }: OwnerSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
            EV Charge
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground lg:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-6 px-4">
          {OWNER_NAV_GROUPS.map((group, i) => (
            <div key={i} className="flex flex-col gap-1">
              <h4 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                {group.label}
              </h4>
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] || Zap;
                const isActive =
                  location.pathname.startsWith(item.href) &&
                  (item.href !== '/owner/dashboard' || location.pathname === '/owner/dashboard');

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={cn(
                      'relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-border/50 hover:text-sidebar-foreground',
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-border/50 hover:text-sidebar-foreground"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </Button>
      </div>
    </aside>
  );
}
