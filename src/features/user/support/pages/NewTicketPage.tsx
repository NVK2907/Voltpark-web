import { ArrowLeft, Upload, ShieldCheck } from 'lucide-react';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const CATEGORIES = ['Sạc xe', 'Thanh toán', 'Trạm sạc', 'Tài khoản', 'Ứng dụng', 'Khác'];

export default function NewTicketPage() {
  const [category, setCategory] = React.useState('Sạc xe');
  const [priority, setPriority] = React.useState('medium');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/support/tickets/TK-NEW');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-12">
      <div className="flex items-center gap-4">
        <Link to="/support/tickets">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Tạo ticket hỗ trợ</h1>
          <p className="font-medium text-slate-500">
            Mô tả vấn đề của bạn, chúng tôi sẽ phản hồi sớm nhất.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Chủ đề
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  'rounded-xl border-2 px-4 py-2 text-sm font-bold transition-all',
                  category === c
                    ? 'border-violet-600 bg-violet-50 text-violet-600 dark:bg-violet-900/10'
                    : 'border-slate-200 text-slate-500 hover:border-violet-200 dark:border-slate-800',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Mức độ khẩn cấp
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                id: 'low',
                label: 'Thấp',
                color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600',
              },
              {
                id: 'medium',
                label: 'Trung bình',
                color: 'border-amber-500 bg-amber-50 dark:bg-amber-900/10 text-amber-600',
              },
              {
                id: 'high',
                label: 'Cao',
                color: 'border-red-500 bg-red-50 dark:bg-red-900/10 text-red-600',
              },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPriority(p.id)}
                className={cn(
                  'rounded-2xl border-2 py-3 text-sm font-bold transition-all',
                  priority === p.id
                    ? p.color
                    : 'border-slate-200 text-slate-400 dark:border-slate-800',
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Tiêu đề
          </label>
          <Input
            required
            placeholder="Tóm tắt ngắn gọn vấn đề của bạn"
            className="h-12 rounded-2xl border-slate-200 dark:border-slate-800"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Mô tả chi tiết
          </label>
          <textarea
            required
            rows={5}
            placeholder="Mô tả đầy đủ vấn đề: thời điểm xảy ra, trạm sạc nào, xe gì, lỗi gì..."
            className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-900"
          />
        </div>

        {/* Attachment */}
        <div className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center transition-colors hover:border-violet-300 dark:border-slate-800">
          <Upload className="mx-auto mb-2 h-8 w-8 text-slate-300" />
          <p className="text-sm font-bold text-slate-400">
            Kéo thả ảnh/video vào đây hoặc <span className="text-violet-600">chọn tệp</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">PNG, JPG, MP4 · Tối đa 10MB</p>
        </div>

        <Button
          type="submit"
          className="h-14 w-full rounded-2xl bg-violet-600 text-lg font-black shadow-xl hover:bg-violet-700"
        >
          GỬI YÊU CẦU HỖ TRỢ
        </Button>
        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <ShieldCheck className="h-4 w-4" /> Thông tin của bạn được bảo mật tuyệt đối
        </div>
      </form>
    </div>
  );
}
