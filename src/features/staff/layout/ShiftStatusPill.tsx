import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { STAFF_ROUTES } from '@/lib/constants';
import { MOCK_STAFF_CONTEXT } from '@/lib/mock-staff';
import { cn } from '@/lib/utils';

export function ShiftStatusPill() {
  const { currentShift, isClockedIn } = MOCK_STAFF_CONTEXT;
  const [timeLeft, setTimeLeft] = useState('');
  const [statusColor, setStatusColor] = useState('bg-slate-100 text-slate-500');

  useEffect(() => {
    if (!isClockedIn) {
      setTimeLeft('Chưa chấm công');
      setStatusColor('bg-slate-100 text-slate-500 border-slate-200');
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const timeParts = currentShift.end.split(':').map(Number);
      const endHour = timeParts[0] || 0;
      const endMin = timeParts[1] || 0;
      const endTime = new Date();
      endTime.setHours(endHour, endMin, 0, 0);

      const diffMs = endTime.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeLeft('Đã hết ca');
        setStatusColor('bg-red-100 text-red-700 border-red-200');
        return;
      }

      const diffMins = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;

      setTimeLeft(`Còn ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);

      if (diffMins <= 30) {
        setStatusColor('bg-amber-100 text-amber-700 border-amber-200');
      } else {
        setStatusColor('bg-emerald-100 text-emerald-700 border-emerald-200');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // update every minute
    return () => clearInterval(interval);
  }, [isClockedIn, currentShift.end]);

  return (
    <Link
      to={STAFF_ROUTES.SHIFT}
      className={cn(
        'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:brightness-95',
        statusColor,
      )}
    >
      <span className="capitalize">
        {currentShift.type === 'morning'
          ? 'Ca sáng'
          : currentShift.type === 'afternoon'
            ? 'Ca chiều'
            : 'Ca đêm'}
      </span>
      <span className="h-1 w-1 rounded-full bg-current opacity-50"></span>
      <span>{timeLeft}</span>
    </Link>
  );
}
