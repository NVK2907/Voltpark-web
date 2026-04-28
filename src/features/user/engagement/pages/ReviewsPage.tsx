import { Star, MapPin, Clock, PenLine } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

const MY_REVIEWS = [
  {
    id: 'rv1',
    station: 'Vincom Center Landmark 81',
    rating: 5,
    date: '25/04/2024',
    comment: 'Trạm sạc tuyệt vời, cổng DC 250kW sạc rất nhanh. Khu vực sạch sẽ, an ninh tốt.',
    type: 'published',
  },
  {
    id: 'rv2',
    station: 'Sân bay Tân Sơn Nhất',
    rating: 3,
    date: '20/04/2024',
    comment: 'Cổng DC thường xuyên hỏng, phải chuyển sang dùng cổng AC chậm hơn.',
    type: 'published',
  },
];

const PENDING_REVIEWS = [
  { id: 'pv1', station: 'Giga Mall Phạm Văn Đồng', date: '22/04/2024', sessionId: 'CS-1122' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            'h-4 w-4',
            s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700',
          )}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6 lg:p-10">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black text-slate-900 dark:text-white">
          <Star className="h-7 w-7 fill-current text-amber-400" /> Đánh giá của tôi
        </h1>
        <p className="mt-1 font-medium text-slate-500">
          Chia sẻ trải nghiệm để giúp cộng đồng lựa chọn trạm sạc tốt hơn.
        </p>
      </div>

      {/* Pending Reviews Prompt */}
      {PENDING_REVIEWS.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
            <PenLine className="h-5 w-5 text-violet-600" /> Chờ đánh giá ({PENDING_REVIEWS.length})
          </h2>
          {PENDING_REVIEWS.map((p) => (
            <div
              key={p.id}
              className="flex flex-col items-start justify-between gap-4 rounded-3xl border-2 border-violet-200 bg-violet-50 p-6 dark:border-violet-800 dark:bg-violet-900/10 md:flex-row md:items-center"
            >
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-violet-600" />
                  <span className="font-black text-violet-900 dark:text-violet-300">
                    {p.station}
                  </span>
                  <Badge className="border-none bg-amber-400 text-[10px] font-bold text-white">
                    CHƯA ĐÁNH GIÁ
                  </Badge>
                </div>
                <p className="text-sm text-slate-500">
                  Phiên sạc ngày {p.date} · #{p.sessionId}
                </p>
              </div>
              <Button className="h-11 shrink-0 gap-2 rounded-2xl bg-violet-600 px-8 font-bold hover:bg-violet-700">
                <Star className="h-4 w-4" /> ĐÁNH GIÁ NGAY
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Published Reviews */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          Đã đánh giá ({MY_REVIEWS.length})
        </h2>
        {MY_REVIEWS.map((r) => (
          <div
            key={r.id}
            className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white">{r.station}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Clock className="h-3 w-3" /> {r.date}
                </div>
              </div>
              <StarRating rating={r.rating} />
            </div>
            <p className="font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              {r.comment}
            </p>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 rounded-xl font-bold text-slate-400 hover:text-violet-600"
              >
                <PenLine className="h-4 w-4" /> Chỉnh sửa
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
