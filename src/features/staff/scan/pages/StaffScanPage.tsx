import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function StaffScanPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-xl bg-slate-950 md:flex-row">
      <div className="absolute right-4 top-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-white/20 bg-black/50 text-white hover:bg-black/70"
          onClick={() => navigate(-1)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Camera Viewfinder (Left on Desktop) */}
      <div className="relative flex flex-1 items-center justify-center border-b border-white/10 bg-black md:border-b-0 md:border-r">
        {/* Mock camera feed */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity blur-sm" />

        {/* Scanner Reticle */}
        <div className="relative h-64 w-64 overflow-hidden rounded-lg border-2 border-violet-500">
          {/* Scanning line animation */}
          <div className="h-1 w-full animate-[scan_2s_ease-in-out_infinite] bg-violet-500 shadow-[0_0_10px_2px_rgba(139,92,246,0.5)]" />

          {/* Corners */}
          <div className="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-violet-500" />
          <div className="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-violet-500" />
          <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-violet-500" />
          <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-violet-500" />
        </div>

        <p className="absolute bottom-8 font-medium tracking-wide text-white/70">
          Đưa mã QR vào khung hình
        </p>

        <style>{`
          @keyframes scan {
            0% { transform: translateY(0); }
            50% { transform: translateY(256px); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </div>

      {/* Manual Input Panel (Right on Desktop) */}
      <div className="flex w-full shrink-0 flex-col bg-white p-6 dark:bg-slate-900 md:w-96">
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Nhập thủ công</h2>

        <div className="mb-6 flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          <button className="flex-1 rounded-md bg-white py-2 text-sm font-medium text-foreground shadow-sm dark:bg-slate-700">
            Khách
          </button>
          <button className="flex-1 rounded-md py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Xe
          </button>
          <button className="flex-1 rounded-md py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Bộ sạc
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-500">
              SĐT hoặc Email khách hàng
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập SĐT..."
                className="h-12 w-full rounded-lg border bg-slate-50 px-4 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-slate-950"
                autoFocus
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 bg-violet-600 hover:bg-violet-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="mb-3 text-sm font-medium text-slate-500">Lịch sử tra cứu</h3>
            <div className="space-y-2">
              {['0912***789 (Anh Tú)', '51F-123.45', 'CHG-002'].map((item, i) => (
                <button
                  key={i}
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
