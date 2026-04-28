import {
  Search,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  Zap,
  CreditCard,
  MapPin,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Input } from '@/shared/components/ui/input';

const CATEGORIES = [
  {
    icon: Zap,
    label: 'Sạc xe',
    count: 12,
    color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/20',
  },
  {
    icon: CreditCard,
    label: 'Thanh toán',
    count: 8,
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20',
  },
  {
    icon: MapPin,
    label: 'Trạm sạc',
    count: 15,
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/20',
  },
  {
    icon: Settings,
    label: 'Tài khoản',
    count: 10,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20',
  },
];

const POPULAR = [
  { id: 'a1', title: 'Cách kết nối cổng sạc CCS2 với xe VinFast?', views: 1240 },
  { id: 'a2', title: 'Tại sao thanh toán của tôi bị từ chối?', views: 890 },
  { id: 'a3', title: 'Làm thế nào để hủy đặt chỗ trước?', views: 740 },
  { id: 'a4', title: 'Pin không lên sau khi cắm sạc?', views: 620 },
];

export default function HelpCenterPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 p-6 lg:p-10">
      {/* Hero Search */}
      <div className="space-y-6 rounded-[40px] bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-center text-white shadow-2xl shadow-violet-500/20 md:p-14">
        <h1 className="text-4xl font-black tracking-tight">Chúng tôi có thể giúp gì cho bạn?</h1>
        <p className="font-medium text-violet-200">
          Tìm kiếm câu trả lời trong hơn 45 bài viết hướng dẫn.
        </p>
        <div className="relative mx-auto max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Tìm kiếm: sạc, thanh toán, tài khoản..."
            className="h-14 rounded-2xl border-none bg-white pl-12 text-base font-medium text-slate-900 shadow-xl"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="mb-6 text-2xl font-black">Duyệt theo chủ đề</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.label}
              to="/support/articles/sac-xe"
              className="group flex flex-col items-center gap-3 rounded-3xl border border-slate-100 bg-white p-6 text-center transition-all hover:border-violet-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.color}`}>
                <c.icon className="h-7 w-7" />
              </div>
              <p className="font-black text-slate-900 dark:text-white">{c.label}</p>
              <p className="text-xs font-medium text-slate-400">{c.count} bài viết</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div>
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-black">
          <BookOpen className="h-6 w-6 text-violet-600" /> Bài viết phổ biến
        </h2>
        <div className="divide-y divide-slate-50 rounded-[32px] border border-slate-100 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {POPULAR.map((a) => (
            <Link
              key={a.id}
              to={`/support/articles/${a.id}`}
              className="flex items-center justify-between p-5 transition-colors first:rounded-t-[32px] last:rounded-b-[32px] hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <span className="font-bold text-slate-900 dark:text-white">{a.title}</span>
              <div className="ml-4 flex shrink-0 items-center gap-3">
                <span className="text-xs font-bold text-slate-400">
                  {a.views.toLocaleString()} lượt xem
                </span>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Options */}
      <div>
        <h2 className="mb-6 text-2xl font-black">Vẫn cần hỗ trợ?</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              icon: MessageCircle,
              label: 'Live Chat',
              sub: 'Trả lời ngay lập tức',
              href: '/support/chat',
              color: 'bg-violet-600 hover:bg-violet-700',
            },
            {
              icon: Mail,
              label: 'Gửi ticket',
              sub: 'Phản hồi trong 24h',
              href: '/support/tickets/new',
              color: 'bg-slate-800 hover:bg-slate-700',
            },
            {
              icon: Phone,
              label: 'Gọi hotline',
              sub: '1900 xxxx (8h–22h)',
              href: 'tel:1900xxxx',
              color: 'bg-emerald-600 hover:bg-emerald-700',
            },
          ].map((c) => (
            <Link key={c.label} to={c.href}>
              <div
                className={`${c.color} flex cursor-pointer items-center gap-4 rounded-3xl p-6 text-white transition-all`}
              >
                <c.icon className="h-8 w-8 shrink-0" />
                <div>
                  <p className="text-lg font-black">{c.label}</p>
                  <p className="text-sm font-medium opacity-80">{c.sub}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
