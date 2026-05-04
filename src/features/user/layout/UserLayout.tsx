import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { UserHeader } from './components/UserHeader';
import { UserSidebar } from './components/UserSidebar';
import { UserBottomNav } from './components/UserBottomNav';

import { cn } from '@/lib/utils';

export default function UserLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Close mobile sidebar on route change
  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans dark:bg-slate-950">
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm duration-300 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex transform shadow-2xl transition-all duration-300 ease-in-out lg:static lg:translate-x-0 lg:shadow-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <UserSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onMobileClose={handleMobileClose}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <UserHeader onMenuClick={() => setMobileOpen(true)} />

        <main className="scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 flex-1 overflow-y-auto bg-slate-50 pb-20 dark:bg-slate-950 lg:pb-0">
          <div className="mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>

      <UserBottomNav />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
