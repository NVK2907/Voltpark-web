import { ArrowLeft, Link2, Unlink, CheckCircle2, AlertCircle } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

const PROVIDERS = [
  { id: 'google', name: 'Google', icon: '🔵', connected: true, email: 'khanhvu@gmail.com' },
  { id: 'apple', name: 'Apple ID', icon: '⚫', connected: true, email: 'khanhvu@icloud.com' },
  { id: 'facebook', name: 'Facebook', icon: '🔷', connected: false, email: null },
  { id: 'zalo', name: 'Zalo', icon: '🟦', connected: false, email: null },
];

export default function ConnectedAccountsPage() {
  const [providers, setProviders] = React.useState(PROVIDERS);
  const toggle = (id: string) =>
    setProviders((ps) => ps.map((p) => (p.id === id ? { ...p, connected: !p.connected } : p)));

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-10">
      <div className="flex items-center gap-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Tài khoản liên kết</h1>
          <p className="font-medium text-slate-500">Đăng nhập nhanh qua tài khoản mạng xã hội.</p>
        </div>
      </div>

      <div className="space-y-4">
        {providers.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-5 rounded-3xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl dark:bg-slate-800">
              {p.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <p className="font-black text-slate-900 dark:text-white">{p.name}</p>
                {p.connected ? (
                  <Badge className="gap-1 border-none bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/20">
                    <CheckCircle2 className="h-3 w-3" /> Đã liên kết
                  </Badge>
                ) : (
                  <Badge className="border-none bg-slate-100 text-[10px] font-bold text-slate-500 dark:bg-slate-800">
                    Chưa liên kết
                  </Badge>
                )}
              </div>
              {p.connected && p.email && (
                <p className="truncate text-xs font-medium text-slate-400">{p.email}</p>
              )}
            </div>
            <Button
              onClick={() => toggle(p.id)}
              variant={p.connected ? 'outline' : 'default'}
              className={`shrink-0 gap-2 rounded-2xl font-bold ${p.connected ? 'border-red-200 text-red-500 hover:bg-red-50' : 'bg-violet-600 hover:bg-violet-700'}`}
            >
              {p.connected ? (
                <>
                  <Unlink className="h-4 w-4" /> Hủy liên kết
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4" /> Liên kết
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 rounded-3xl border border-amber-100 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/10">
        <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" />
        <p className="text-sm font-medium leading-relaxed text-amber-800 dark:text-amber-300">
          Giữ ít nhất một phương thức đăng nhập để không bị mất quyền truy cập vào tài khoản. Hủy
          liên kết sẽ xóa quyền truy cập của ứng dụng đó.
        </p>
      </div>
    </div>
  );
}
