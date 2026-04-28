import { Star, Zap, Gift, Award, Lock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';

const TIERS = [
  {
    name: 'Silver',
    min: 0,
    max: 1000,
    color: 'bg-slate-400',
    textColor: 'text-slate-600',
    ring: 'ring-slate-300',
  },
  {
    name: 'Gold',
    min: 1000,
    max: 5000,
    color: 'bg-amber-400',
    textColor: 'text-amber-600',
    ring: 'ring-amber-300',
  },
  {
    name: 'Platinum',
    min: 5000,
    max: 15000,
    color: 'bg-indigo-500',
    textColor: 'text-indigo-600',
    ring: 'ring-indigo-300',
  },
  {
    name: 'Diamond',
    min: 15000,
    max: null,
    color: 'bg-cyan-400',
    textColor: 'text-cyan-600',
    ring: 'ring-cyan-300',
  },
];

const REWARDS = [
  { id: 'r1', title: 'Giảm 20% 1 phiên sạc', pts: 500, icon: Zap },
  { id: 'r2', title: 'Voucher nạp tiền 100k', pts: 1000, icon: Gift },
  { id: 'r3', title: 'Ưu tiên đặt chỗ VIP', pts: 2000, icon: Star },
  { id: 'r4', title: '1 tháng thành viên Plus miễn phí', pts: 5000, icon: Award },
];

export default function LoyaltyPage() {
  const currentPoints = 2350;
  const currentTier = TIERS[1]!;
  const nextTier = TIERS[2]!;
  const progressPct =
    ((currentPoints - currentTier.min) / ((nextTier.min ?? currentTier.min) - currentTier.min)) *
    100;

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6 lg:p-10">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black text-slate-900 dark:text-white">
          <Award className="h-7 w-7 text-amber-500" /> Chương trình tích điểm
        </h1>
        <p className="mt-1 font-medium text-slate-500">
          Tích lũy điểm thưởng mỗi khi sạc xe và đổi quà hấp dẫn.
        </p>
      </div>

      {/* Tier Card */}
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white shadow-2xl shadow-amber-500/30 md:p-12">
        <div className="absolute right-0 top-0 opacity-10">
          <Award className="-mr-8 -mt-8 h-64 w-64" />
        </div>
        <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Hạng thành viên hiện tại
            </p>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <Star className="h-7 w-7 fill-current text-white" />
              </div>
              <span className="text-5xl font-black tracking-tight">GOLD</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black">{currentPoints.toLocaleString()}</span>
              <span className="pb-1 text-lg font-bold text-amber-200">điểm</span>
            </div>
          </div>
          <div className="w-full space-y-3 md:w-72">
            <div className="flex justify-between text-sm font-bold">
              <span>{currentTier.name}</span>
              <span>{nextTier.name}</span>
            </div>
            <Progress value={progressPct} className="h-3 bg-white/20" />
            <p className="text-sm font-medium text-amber-100">
              Còn{' '}
              <span className="font-black text-white">
                {(nextTier.min - currentPoints).toLocaleString()} điểm
              </span>{' '}
              nữa để lên hạng {nextTier.name}
            </p>
          </div>
        </div>
      </div>

      {/* Tier Roadmap */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {TIERS.map((t, i) => (
          <div
            key={t.name}
            className={cn(
              'flex flex-col items-center gap-2 rounded-3xl border-2 p-5 text-center transition-all',
              t.name === 'Gold'
                ? 'border-amber-400 bg-amber-50 shadow-lg dark:bg-amber-900/10'
                : 'border-slate-100 opacity-60 dark:border-slate-800',
            )}
          >
            <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', t.color)}>
              {t.name === 'Diamond' ? (
                <Lock className="h-6 w-6 text-white" />
              ) : (
                <Star className="h-6 w-6 fill-current text-white" />
              )}
            </div>
            <p className="font-black text-slate-900 dark:text-white">{t.name}</p>
            <p className="text-[10px] font-bold uppercase text-slate-400">
              {t.min.toLocaleString()}+ điểm
            </p>
          </div>
        ))}
      </div>

      {/* Rewards Catalog */}
      <div>
        <h2 className="mb-6 text-2xl font-black">Đổi điểm lấy phần thưởng</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {REWARDS.map((r) => {
            const canRedeem = currentPoints >= r.pts;
            return (
              <div
                key={r.id}
                className={cn(
                  'flex items-center justify-between gap-4 rounded-3xl border-2 bg-white p-6 transition-all dark:bg-slate-900',
                  canRedeem
                    ? 'border-slate-200 hover:border-violet-300 hover:shadow-lg dark:border-slate-700'
                    : 'border-slate-100 opacity-50 dark:border-slate-800',
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/20">
                    <r.icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 dark:text-white">{r.title}</p>
                    <p className="mt-0.5 text-sm font-bold text-amber-500">
                      {r.pts.toLocaleString()} điểm
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={!canRedeem}
                  className="shrink-0 rounded-2xl bg-violet-600 font-bold hover:bg-violet-700"
                >
                  {canRedeem ? 'ĐỔI' : <Lock className="h-4 w-4" />}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
