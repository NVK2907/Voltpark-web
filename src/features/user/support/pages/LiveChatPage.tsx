import { Send, Bot, User, X, Phone } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const INITIAL_MESSAGES = [
  {
    id: 'm0',
    role: 'bot',
    text: 'Xin chào! Tôi là trợ lý ảo EVCharge AI 🤖\nTôi có thể giúp bạn giải quyết các vấn đề thường gặp về sạc xe, thanh toán và trạm sạc.\nBạn đang gặp vấn đề gì?',
    time: 'Vừa xong',
  },
];

const QUICK_REPLIES = [
  'Cổng sạc bị lỗi',
  'Vấn đề thanh toán',
  'Tìm trạm sạc gần đây',
  'Hủy đặt chỗ',
];

export default function LiveChatPage() {
  const [messages, setMessages] = React.useState(INITIAL_MESSAGES);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [agentJoined, setAgentJoined] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { id: `m${Date.now()}`, role: 'user', text, time: 'Vừa xong' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (!agentJoined) {
        setAgentJoined(true);
        setMessages((prev) => [
          ...prev,
          {
            id: `m${Date.now()}`,
            role: 'bot',
            text: 'Tôi đã kết nối bạn với nhân viên hỗ trợ. Bạn vui lòng chờ trong giây lát nhé!',
            time: 'Vừa xong',
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `m${Date.now()}`,
            role: 'bot',
            text: 'Cảm ơn bạn đã cung cấp thông tin. Nhân viên của chúng tôi sẽ kiểm tra và phản hồi trong vài phút.',
            time: 'Vừa xong',
          },
        ]);
      }
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-slate-50 dark:bg-slate-950">
      {/* Chat Header */}
      <div className="flex shrink-0 items-center justify-between bg-violet-600 px-6 py-4 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black">EVCharge Support</h2>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <p className="text-xs font-bold text-violet-200">
                Trực tuyến · Phản hồi trong &lt;2 phút
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl text-white hover:bg-white/10">
            <Phone className="h-5 w-5" />
          </Button>
          <Link to="/support">
            <Button variant="ghost" size="icon" className="rounded-xl text-white hover:bg-white/10">
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Agent joined banner */}
      {agentJoined && (
        <div className="flex items-center gap-2 border-b border-emerald-100 bg-emerald-50 px-6 py-2 dark:border-emerald-800 dark:bg-emerald-900/20">
          <Badge className="border-none bg-emerald-500 text-[10px] font-bold">LIVE</Badge>
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
            Minh Anh đã tham gia cuộc trò chuyện
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-800'}`}
            >
              {m.role === 'user' ? (
                <User className="h-4 w-4 text-white" />
              ) : (
                <Bot className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              )}
            </div>
            <div
              className={`max-w-xs whitespace-pre-line rounded-3xl px-5 py-3.5 text-sm font-medium leading-relaxed lg:max-w-md ${
                m.role === 'user'
                  ? 'rounded-tr-sm bg-violet-600 text-white'
                  : 'rounded-tl-sm border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
              <Bot className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            </div>
            <div className="flex items-center gap-1 rounded-3xl rounded-tl-sm border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="scrollbar-none flex shrink-0 gap-2 overflow-x-auto px-6 pb-3">
          {QUICK_REPLIES.map((qr) => (
            <button
              key={qr}
              onClick={() => sendMessage(qr)}
              className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition-all hover:border-violet-400 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {qr}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-4xl gap-3">
          <Input
            placeholder="Nhập tin nhắn..."
            className="h-12 flex-1 rounded-2xl border-slate-200 bg-slate-50 font-medium dark:border-slate-800 dark:bg-slate-900"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          />
          <Button
            className="h-12 w-12 shrink-0 rounded-2xl bg-violet-600 hover:bg-violet-700"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
