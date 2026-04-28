import { Users, Copy, CheckCircle2, Twitter, Facebook, MessageCircle, Gift } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

const REFERRED = [
  { name: 'Minh Tuấn', date: '22/04/2024', status: 'completed', reward: '50.000đ' },
  { name: 'Thu Hà', date: '18/04/2024', status: 'pending', reward: 'Chờ sạc lần đầu' },
  { name: 'Bảo Long', date: '10/04/2024', status: 'completed', reward: '50.000đ' },
];

export default function ReferralPage() {
  const [copied, setCopied] = React.useState(false);
  const code = 'KHANHVU2024';
  const link = `evcharge.vn/ref/${code}`;

  const copy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6 lg:p-10">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black text-slate-900 dark:text-white">
          <Users className="h-7 w-7 text-violet-600" /> Giới thiệu bạn bè
        </h1>
        <p className="mt-1 font-medium text-slate-500">
          Mỗi người bạn giới thiệu sạc lần đầu — cả hai cùng nhận 50.000đ.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Đã giới thiệu', value: '3', icon: Users },
          { label: 'Hoàn thành', value: '2', icon: CheckCircle2 },
          { label: 'Thưởng nhận được', value: '100k', icon: Gift },
        ].map((s, i) => (
          <div
            key={i}
            className="space-y-2 rounded-3xl border border-slate-100 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900"
          >
            <s.icon className="mx-auto h-6 w-6 text-violet-600" />
            <p className="text-3xl font-black text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Referral Code Card */}
      <div className="space-y-6 rounded-[40px] bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-2xl shadow-violet-500/20 md:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-200">
          Mã giới thiệu của bạn
        </p>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-black tracking-widest md:text-5xl">{code}</span>
          <button
            onClick={copy}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 transition-all hover:bg-white/30"
          >
            {copied ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
          <span className="flex-1 truncate text-sm font-bold text-violet-200">{link}</span>
          <button
            onClick={copy}
            className="rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-violet-700"
          >
            {copied ? 'Đã sao chép!' : 'Sao chép link'}
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <p className="self-center text-sm font-bold text-violet-200">Chia sẻ qua:</p>
          {[
            { icon: Facebook, label: 'Facebook', bg: 'bg-blue-600' },
            { icon: Twitter, label: 'Twitter', bg: 'bg-sky-500' },
            { icon: MessageCircle, label: 'Zalo', bg: 'bg-cyan-500' },
          ].map((s) => (
            <Button
              key={s.label}
              className={`${s.bg} h-11 gap-2 rounded-2xl border-none font-bold hover:opacity-90`}
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Referred Friends */}
      <div className="rounded-[32px] border border-slate-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-xl font-black">Người bạn đã giới thiệu</h2>
        <div className="space-y-4">
          {REFERRED.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-black text-white">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    r.status === 'completed'
                      ? 'border-none bg-emerald-500 font-bold'
                      : 'border-none bg-amber-400 font-bold text-white'
                  }
                >
                  {r.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                </Badge>
                <span
                  className={`font-black ${r.status === 'completed' ? 'text-emerald-500' : 'text-slate-400'}`}
                >
                  {r.reward}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
