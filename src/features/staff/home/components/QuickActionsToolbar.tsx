import { Plus, QrCode, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';

export function QuickActionsToolbar() {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex flex-wrap gap-3 rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900">
      <Button
        onClick={() => navigate(STAFF_ROUTES.SESSIONS_NEW)}
        className="bg-violet-600 shadow-sm hover:bg-violet-700"
      >
        <Plus className="mr-2 h-4 w-4" /> Phiên mới
      </Button>

      <Button variant="outline" onClick={() => navigate(STAFF_ROUTES.SCAN)}>
        <QrCode className="mr-2 h-4 w-4" /> Quét QR
      </Button>

      <Button variant="outline" onClick={() => navigate(STAFF_ROUTES.REPORT)}>
        <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" /> Báo lỗi
      </Button>

      <Button
        variant="ghost"
        onClick={() => navigate(STAFF_ROUTES.EMERGENCY)}
        className="ml-auto text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
      >
        <ShieldAlert className="mr-2 h-4 w-4" /> Khẩn cấp
      </Button>
    </div>
  );
}
