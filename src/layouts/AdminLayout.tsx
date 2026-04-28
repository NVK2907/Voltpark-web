import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

import { cn } from '@/lib/utils';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Close mobile sidebar on route change
  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex transform transition-transform duration-300 lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onMobileClose={handleMobileClose}
        />
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-neutral-50/50 p-4 dark:bg-background md:p-6 lg:p-8">
          <div className="mx-auto h-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
