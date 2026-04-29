import { Search, Plus, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';

export default function StaffCustomersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock list
  const recentLookups = [
    {
      id: 'CUST-001',
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      plate: '51F-123.45',
      type: 'app',
      balance: 150000,
    },
    {
      id: 'CUST-002',
      name: 'Trần B',
      phone: '0912345678',
      plate: '30G-999.99',
      type: 'walk-in',
      balance: 0,
    },
    {
      id: 'CUST-003',
      name: 'Lê C',
      phone: '0987654321',
      plate: '60A-111.22',
      type: 'app',
      balance: 50000,
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('customer-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tra cứu khách hàng</h1>
          <p className="mt-1 text-muted-foreground">
            Tìm kiếm thông tin khách hàng bằng SĐT, Email hoặc Biển số
          </p>
        </div>
        <Button
          className="bg-violet-600 hover:bg-violet-700"
          onClick={() => navigate(STAFF_ROUTES.WALKIN)}
        >
          <Plus className="mr-2 h-4 w-4" /> Khách walk-in
        </Button>
      </div>

      <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-900">
        <div className="relative max-w-2xl">
          <input
            id="customer-search"
            type="text"
            placeholder="Tìm theo SĐT, Biển số xe, Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-full rounded-lg border bg-slate-50 pl-12 pr-4 text-lg outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-slate-950"
            autoFocus
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded bg-slate-200 px-1.5 py-0.5 font-mono text-xs text-muted-foreground dark:bg-slate-800 sm:inline-block">
            /
          </kbd>
        </div>

        {searchQuery ? (
          <div>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Kết quả tìm kiếm cho "{searchQuery}"
            </h3>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50 text-muted-foreground dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 font-medium">Khách hàng</th>
                    <th className="px-4 py-3 font-medium">SĐT</th>
                    <th className="px-4 py-3 font-medium">Biển số</th>
                    <th className="px-4 py-3 font-medium">Số dư ví</th>
                    <th className="px-4 py-3 font-medium">Lần ghé gần nhất</th>
                    <th className="px-4 py-3 text-right font-medium">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentLookups
                    .filter(
                      (c) =>
                        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.phone.includes(searchQuery) ||
                        c.plate.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((c) => (
                      <tr
                        key={c.id}
                        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        onClick={() => navigate(`${STAFF_ROUTES.CUSTOMERS}/${c.id}`)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 font-medium">
                            {c.name}
                            {c.type === 'app' ? (
                              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] text-emerald-700">
                                App
                              </span>
                            ) : (
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-700">
                                Walk-in
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">{c.phone}</td>
                        <td className="px-4 py-3 font-mono">{c.plate}</td>
                        <td className="px-4 py-3 font-medium text-violet-600">
                          {c.balance.toLocaleString()} ₫
                        </td>
                        <td className="px-4 py-3">2 ngày trước</td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-violet-600 hover:bg-violet-50 hover:text-violet-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(STAFF_ROUTES.SESSIONS_NEW);
                            }}
                          >
                            Bắt đầu sạc
                          </Button>
                        </td>
                      </tr>
                    ))}
                  {recentLookups.filter(
                    (c) =>
                      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.phone.includes(searchQuery) ||
                      c.plate.toLowerCase().includes(searchQuery.toLowerCase()),
                  ).length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        Không tìm thấy khách hàng nào.
                        <Button
                          variant="link"
                          className="mx-auto mt-2 block text-violet-600"
                          onClick={() => navigate(STAFF_ROUTES.WALKIN)}
                        >
                          Tạo khách walk-in mới
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Tra cứu gần đây</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recentLookups.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`${STAFF_ROUTES.CUSTOMERS}/${c.id}`)}
                  className="flex cursor-pointer items-center justify-between rounded-lg border bg-slate-50 p-4 transition-all hover:border-violet-500 hover:shadow-sm dark:bg-slate-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-600 dark:bg-violet-900/30">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {c.phone} • {c.plate}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
