import * as Icons from 'lucide-react';
import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { NAV_GROUPS } from '@/lib/constants';
import { MOCK_ADMIN_PROFILE } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  className?: string;
  onMobileClose?: () => void;
}

export function Sidebar({ collapsed, setCollapsed, className, onMobileClose }: SidebarProps) {
  const location = useLocation();

  // Load state from local storage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) {
      setCollapsed(saved === 'true');
    }
  }, [setCollapsed]);

  const toggleCollapse = () => {
    const newVal = !collapsed;
    setCollapsed(newVal);
    localStorage.setItem('sidebar-collapsed', String(newVal));
  };

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-[64px]' : 'w-[240px]',
        className,
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
        <div
          className={cn(
            'flex items-center gap-2 overflow-hidden',
            collapsed && 'w-full justify-center',
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary">
            <Icons.Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="whitespace-nowrap text-lg font-bold tracking-tight text-white">
              EVCharge Admin
            </span>
          )}
        </div>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent flex-1 overflow-y-auto py-4">
        <TooltipProvider delayDuration={0}>
          <div className="space-y-6">
            {NAV_GROUPS.map((group, i) => (
              <div key={i} className="px-3">
                {!collapsed && (
                  <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                    {group.label}
                  </h4>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = (Icons as any)[item.icon];
                    const isActive =
                      location.pathname.startsWith(item.href) &&
                      (item.href !== '/dashboard' || location.pathname === '/dashboard');

                    const linkContent = (
                      <NavLink
                        to={item.href}
                        onClick={onMobileClose}
                        className={cn(
                          'relative flex items-center gap-3 overflow-hidden rounded-md px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'border-r-2 border-primary bg-primary/10 text-primary'
                            : 'text-sidebar-foreground/70 hover:bg-white/5 hover:text-white',
                        )}
                      >
                        {Icon && <Icon className="h-4 w-4 shrink-0" />}
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </NavLink>
                    );

                    if (collapsed) {
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                          <TooltipContent side="right" className="ml-2">
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

      <div className="shrink-0 space-y-2 border-t border-sidebar-border p-3">
        <div className="mb-2 hidden justify-center lg:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="w-full text-sidebar-foreground/50 hover:bg-white/5 hover:text-white"
          >
            {collapsed ? (
              <Icons.ChevronRight className="h-4 w-4" />
            ) : (
              <Icons.ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className={cn('flex items-center gap-3', collapsed ? 'justify-center' : 'px-2')}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
            <Icons.User className="h-4 w-4 text-muted-foreground" />
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-white">
                {MOCK_ADMIN_PROFILE.name}
              </span>
              <span className="truncate text-xs text-sidebar-foreground/60">
                {MOCK_ADMIN_PROFILE.role}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
