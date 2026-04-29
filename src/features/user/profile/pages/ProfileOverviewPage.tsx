import {
  User,
  Car,
  Shield,
  Link2,
  IdCard,
  Lock,
  Settings,
  ChevronRight,
  Zap,
  Star,
  Award,
  Edit2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

const QUICK_LINKS = [
  {
    icon: Car,
    label: 'Xe của tôi',
    sub: '1 xe đã đăng ký',
    href: '/profile/vehicles',
    color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/20',
  },
  {
    icon: Shield,
    label: 'Bảo mật',
    sub: '2FA đã bật',
    href: '/profile/security',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20',
  },
  {
    icon: Link2,
    label: 'Tài khoản liên kết',
    sub: 'Google, Apple',
    href: '/profile/connected',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20',
  },
  {
    icon: IdCard,
    label: 'Xác minh KYC',
    sub: 'Chưa xác minh',
    href: '/profile/kyc',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/20',
  },
  {
    icon: Lock,
    label: 'Riêng tư & Dữ liệu',
    sub: 'Quản lý dữ liệu',
    href: '/profile/privacy',
    color: 'bg-red-100 text-red-600 dark:bg-red-900/20',
  },
  {
    icon: Settings,
    label: 'Tùy chọn',
    sub: 'Ngôn ngữ, giao diện',
    href: '/profile/preferences',
    color: 'bg-slate-100 text-slate-600 dark:bg-slate-800',
  },
];

export default function ProfileOverviewPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6 lg:p-10">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-2xl md:p-12">
        <div className="absolute right-0 top-0 opacity-5">
          <User className="h-64 w-64" />
        </div>
        <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-4xl font-black shadow-2xl">
              KV
            </div>
            <button
              className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-900 shadow-lg transition-colors hover:bg-violet-50"
              onClick={() => toast.info('Tính năng thay đổi ảnh đang được phát triển')}
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight">Khánh Vũ</h1>
              <Badge className="gap-1 border-none bg-amber-500 font-black">
                <Star className="h-3 w-3 fill-current" /> GOLD
              </Badge>
            </div>
            <p className="mb-1 font-medium text-slate-400">khanhvu@example.com</p>
            <p className="text-sm font-medium text-slate-500">Thành viên từ tháng 01/2024</p>
          </div>
          <Link to="/profile/preferences">
            <Button
              variant="ghost"
              className="gap-2 rounded-2xl border border-white/20 font-bold text-white hover:bg-white/10"
            >
              <Settings className="h-5 w-5" /> Chỉnh sửa hồ sơ
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Tổng phiên sạc', value: '47', icon: Zap },
          { label: 'Điểm tích lũy', value: '2.350', icon: Award },
          { label: 'Tiết kiệm được', value: '12,4M', icon: Star },
        ].map((s, i) => (
          <div
            key={i}
            className="space-y-2 rounded-3xl border border-slate-100 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900"
          >
            <s.icon className="mx-auto h-6 w-6 text-violet-600" />
            <p className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Links Grid */}
      <div>
        <h2 className="mb-5 text-xl font-black">Quản lý tài khoản</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {QUICK_LINKS.map((ql) => (
            <Link key={ql.href} to={ql.href}>
              <div className="group flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-5 transition-all hover:border-violet-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div
                  className={`w-13 h-13 flex shrink-0 items-center justify-center rounded-2xl p-3.5 ${ql.color}`}
                >
                  <ql.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-slate-900 dark:text-white">{ql.label}</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-400">{ql.sub}</p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-violet-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
