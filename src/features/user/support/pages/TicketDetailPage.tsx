import { ArrowLeft, Send, User, Bot, Paperclip } from 'lucide-react';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const MESSAGES = [
  {
    id: 'm1',
    role: 'user',
    text: 'Cổng sạc DC tại Giga Mall slot GM-DC-02 không hoạt động. Tôi đã thử cắm nhiều lần nhưng màn hình hiển thị lỗi E04.',
    time: '14:30 27/04',
  },
  {
    id: 'm2',
    role: 'support',
    name: 'Minh Anh (EVCharge)',
    text: 'Xin chào anh/chị! Cảm ơn đã liên hệ EVCharge Support. Tôi đã ghi nhận sự cố với cổng GM-DC-02. Anh/chị có thể cho tôi biết xe của bạn là dòng nào không? Và lỗi E04 xuất hiện ngay khi cắm hay sau vài giây?',
    time: '14:45 27/04',
  },
  {
    id: 'm3',
    role: 'user',
    text: 'Xe VinFast VF 8. Lỗi xuất hiện ngay sau khi cắm, khoảng 3-5 giây.',
    time: '15:00 27/04',
  },
  {
    id: 'm4',
    role: 'support',
    name: 'Minh Anh (EVCharge)',
    text: 'Cảm ơn thông tin. Lỗi E04 thường do vấn đề khởi tạo giao tiếp CCS2. Đội kỹ thuật của chúng tôi đã được thông báo và sẽ kiểm tra cổng trong vòng 2 giờ. Trong thời gian chờ, anh/chị có thể thử cổng GM-DC-03 ở ngay bên cạnh, cổng đó đang hoạt động bình thường.',
    time: '15:10 27/04',
  },
];

export default function TicketDetailPage() {
  const { id } = useParams();
  const [input, setInput] = React.useState('');
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-3">
          <Link to="/support/tickets">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-slate-900 dark:text-white">
                Cổng sạc DC không hoạt động tại Giga Mall
              </h2>
              <Badge className="border-none bg-blue-500 font-bold">Đang xử lý</Badge>
            </div>
            <p className="text-xs font-bold text-slate-400">#{id} · Cập nhật 2 giờ trước</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="hidden rounded-xl border-slate-200 font-bold dark:border-slate-800 md:flex"
        >
          Đóng ticket
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-950">
        {MESSAGES.map((m) => (
          <div
            key={m.id}
            className={cn('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
          >
            <div
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                m.role === 'user'
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
              )}
            >
              {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div
              className={cn(
                'max-w-md space-y-1',
                m.role === 'user' ? 'items-end' : 'items-start',
                'flex flex-col',
              )}
            >
              {m.role === 'support' && (
                <p className="px-1 text-xs font-black text-slate-400">{m.name}</p>
              )}
              <div
                className={cn(
                  'rounded-3xl px-5 py-3.5 text-sm font-medium leading-relaxed',
                  m.role === 'user'
                    ? 'rounded-tr-sm bg-violet-600 text-white'
                    : 'rounded-tl-sm border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
                )}
              >
                {m.text}
              </div>
              <p className="px-1 text-[10px] font-bold text-slate-400">{m.time}</p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-4xl gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 shrink-0 rounded-xl text-slate-400 hover:text-violet-600"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Nhập tin nhắn phản hồi..."
            className="h-12 flex-1 rounded-2xl border-slate-200 bg-slate-50 font-medium dark:border-slate-800 dark:bg-slate-900"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="h-12 w-12 shrink-0 rounded-2xl bg-violet-600 hover:bg-violet-700"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
