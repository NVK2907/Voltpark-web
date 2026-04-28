import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { OwnerHeader } from './components/OwnerHeader';
import { OwnerSidebar } from './components/OwnerSidebar';

export default function OwnerLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="theme-owner flex min-h-screen bg-background">
      {/* Sidebar for desktop & mobile */}
      <OwnerSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content wrapper */}
      <div className="flex flex-1 flex-col transition-all duration-300 lg:pl-64">
        <OwnerHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="animate-in fade-in flex-1 p-4 duration-300 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
