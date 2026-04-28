import { Zap } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 p-4 dark:bg-background">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/10 opacity-50 blur-3xl dark:opacity-20" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 opacity-50 blur-3xl dark:opacity-20" />
      </div>

      <div className="z-10 w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Zap className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">EVCharge Admin</h1>
          <p className="text-sm text-muted-foreground">Hệ thống quản trị trạm sạc xe điện</p>
        </div>

        <Outlet />
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}
