import { ThumbsUp, ThumbsDown, ChevronRight, BookOpen, MessageCircle } from 'lucide-react';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

const ARTICLE = {
  title: 'Cách kết nối cổng sạc CCS2 với xe VinFast?',
  category: 'Sạc xe',
  readTime: '3 phút',
  updated: '20/04/2024',
  content: [
    {
      type: 'p',
      text: 'Cổng CCS2 (Combined Charging System 2) là tiêu chuẩn sạc DC siêu nhanh phổ biến nhất tại Việt Nam, được sử dụng trên hầu hết các mẫu xe VinFast VF 8, VF 9, VF e34.',
    },
    { type: 'h3', text: 'Bước 1: Kiểm tra loại cổng sạc' },
    {
      type: 'p',
      text: 'Trước khi kết nối, hãy đảm bảo bạn đang sử dụng đúng loại cổng. Cổng CCS2 có 7 chân kết nối và thường có màu xanh dương hoặc trắng tại các trạm sạc EVCharge.',
    },
    { type: 'h3', text: 'Bước 2: Mở cửa sạc trên xe' },
    {
      type: 'p',
      text: 'Nhấn nút mở nắp sạc trên xe hoặc sử dụng ứng dụng EVCharge để mở từ xa. Đảm bảo xe đã được tắt máy và phanh tay đã kéo.',
    },
    { type: 'h3', text: 'Bước 3: Kết nối cáp sạc' },
    {
      type: 'p',
      text: 'Cầm chắc đầu cáp CCS2 và cắm thẳng vào cổng sạc của xe. Nghe thấy tiếng "click" là đã kết nối thành công. Không kéo cáp ở góc nghiêng để tránh hư hỏng cổng sạc.',
    },
  ],
  related: [
    { id: 'a2', title: 'Tại sao thanh toán của tôi bị từ chối?' },
    { id: 'a3', title: 'Làm thế nào để hủy đặt chỗ trước?' },
  ],
};

export default function HelpArticlePage() {
  const { slug } = useParams();
  const [helpful, setHelpful] = React.useState<boolean | null>(null);

  return (
    <div className="mx-auto max-w-3xl space-y-10 p-6 lg:p-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
        <Link to="/support" className="transition-colors hover:text-violet-600">
          Trung tâm hỗ trợ
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-600 dark:text-slate-300">{ARTICLE.category}</span>
      </div>

      {/* Article Header */}
      <div>
        <Badge className="mb-4 border-none bg-violet-100 font-bold text-violet-600 dark:bg-violet-900/20">
          {ARTICLE.category}
        </Badge>
        <h1 className="mb-4 text-3xl font-black leading-tight text-slate-900 dark:text-white">
          {ARTICLE.title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          <span>Cập nhật: {ARTICLE.updated}</span>
          <span>·</span>
          <span>Đọc trong {ARTICLE.readTime}</span>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        {ARTICLE.content.map((block, i) => {
          if (block.type === 'h3')
            return (
              <h3 key={i} className="mb-3 mt-8 text-xl font-black text-slate-900 dark:text-white">
                {block.text}
              </h3>
            );
          return (
            <p key={i} className="font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              {block.text}
            </p>
          );
        })}
      </div>

      {/* Helpful? */}
      <div className="space-y-4 rounded-3xl border border-slate-100 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-lg font-black">Bài viết này có hữu ích không?</p>
        {helpful === null ? (
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setHelpful(true)}
              variant="outline"
              className="h-12 gap-2 rounded-2xl border-slate-200 px-8 font-bold dark:border-slate-700"
            >
              <ThumbsUp className="h-4 w-4" /> Có, rất hữu ích
            </Button>
            <Button
              onClick={() => setHelpful(false)}
              variant="outline"
              className="h-12 gap-2 rounded-2xl border-slate-200 px-8 font-bold dark:border-slate-700"
            >
              <ThumbsDown className="h-4 w-4" /> Không giúp được
            </Button>
          </div>
        ) : helpful ? (
          <p className="font-bold text-emerald-500">🎉 Cảm ơn phản hồi của bạn!</p>
        ) : (
          <div className="space-y-3">
            <p className="font-medium text-slate-500">Rất tiếc bài viết chưa giúp được bạn.</p>
            <Link to="/support/tickets/new">
              <Button className="gap-2 rounded-2xl bg-violet-600 font-bold hover:bg-violet-700">
                <MessageCircle className="h-4 w-4" /> Liên hệ hỗ trợ trực tiếp
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Related Articles */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-black">
          <BookOpen className="h-5 w-5 text-violet-600" /> Bài viết liên quan
        </h2>
        <div className="space-y-2">
          {ARTICLE.related.map((a) => (
            <Link
              key={a.id}
              to={`/support/articles/${a.id}`}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:border-violet-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="font-bold text-slate-900 dark:text-white">{a.title}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
