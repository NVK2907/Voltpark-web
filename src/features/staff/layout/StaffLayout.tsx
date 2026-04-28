import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { KeyboardShortcutsDialog } from './KeyboardShortcutsDialog';
import { StaffHeader } from './StaffHeader';
import { StaffSidebar } from './StaffSidebar';

export default function StaffLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('staffSidebarCollapsed');
      return saved ? JSON.parse(saved) : window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('staffSidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  return (
    <div className="theme-staff flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <StaffSidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <StaffHeader onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

        <main className="scrollbar-thin flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <KeyboardShortcutsDialog />
      <Toaster position="top-right" richColors />
    </div>
  );
}
