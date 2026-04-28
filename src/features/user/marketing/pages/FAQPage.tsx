import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const categories = [
    { id: 'all', name: 'Tất cả câu hỏi' },
    { id: 'charging', name: 'Sạc & Trạm sạc' },
    { id: 'payment', name: 'Thanh toán & Ví' },
    { id: 'account', name: 'Tài khoản & Bảo mật' },
  ];

  const faqs = [
    {
      id: '1',
      categoryId: 'charging',
      question: 'Làm thế nào để tìm trạm sạc gần nhất?',
      answer:
        'Bạn có thể sử dụng tính năng "Bản đồ" trên ứng dụng hoặc website EVCharge. Hệ thống sẽ tự động định vị vị trí của bạn và hiển thị các trạm sạc khả dụng xung quanh. Bạn cũng có thể lọc theo loại cổng sạc tương thích với xe của mình.',
    },
    {
      id: '2',
      categoryId: 'charging',
      question: 'Tôi có thể đặt chỗ trước được không?',
      answer:
        'Có. Tùy thuộc vào gói cước của bạn (Cơ bản, Plus, Pro) mà bạn có thể đặt chỗ trước từ 30 phút lên đến 24 giờ. Tính năng này giúp bạn đảm bảo luôn có slot sạc khi đến nơi.',
    },
    {
      id: '3',
      categoryId: 'payment',
      question: 'Ví EVCharge hoạt động như thế nào?',
      answer:
        'Ví EVCharge là phương thức thanh toán nội bộ. Bạn có thể nạp tiền vào ví thông qua chuyển khoản ngân hàng, thẻ tín dụng hoặc nạp tiền mặt tại quầy của trạm. Sau mỗi phiên sạc, chi phí sẽ tự động được trừ vào số dư ví.',
    },
    {
      id: '4',
      categoryId: 'payment',
      question: 'Giá sạc được tính như thế nào?',
      answer:
        'Giá sạc được tính dựa trên số điện năng (kWh) thực tế mà xe bạn đã tiêu thụ, nhân với đơn giá sạc của gói cước bạn đang sử dụng. Nếu bạn để xe tại trạm sau khi sạc đầy quá thời gian quy định, hệ thống có thể tính thêm phí lưu bãi.',
    },
    {
      id: '5',
      categoryId: 'account',
      question: 'Tôi có thể chia sẻ tài khoản cho người nhà không?',
      answer:
        'Nếu bạn sử dụng gói EVCharge Pro, bạn có thể thêm tối đa 3 thành viên gia đình vào cùng một tài khoản để dùng chung số dư ví và các ưu đãi.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.categoryId === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex w-full flex-col pb-24">
      {/* Header */}
      <section className="bg-slate-50 px-4 pb-16 pt-20 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-black">Bạn cần hỗ trợ?</h1>
          <p className="mb-10 text-xl text-slate-600 dark:text-slate-400">
            Tìm kiếm câu trả lời nhanh chóng cho các thắc mắc thường gặp.
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-16 w-full rounded-full border-2 border-slate-200 bg-white pl-14 pr-4 text-lg shadow-sm outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-8 px-4 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="space-y-2 lg:col-span-1">
          <h3 className="mb-4 hidden text-lg font-bold lg:block">Danh mục</h3>
          <div className="hide-scrollbar flex flex-row gap-2 overflow-x-auto pb-4 lg:flex-col lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-4 lg:col-span-3">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-slate-500">
                Không tìm thấy kết quả nào phù hợp với từ khóa "{searchQuery}"
              </p>
              <Button
                variant="link"
                onClick={() => setSearchQuery('')}
                className="mt-2 text-violet-600"
              >
                Xóa tìm kiếm
              </Button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 dark:border-slate-800 dark:bg-slate-900"
                >
                  <button
                    className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                    onClick={() => toggleItem(faq.id)}
                  >
                    <span className="pr-8 text-lg font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="border-t border-slate-100 pt-2 leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}

          <div className="mt-12 rounded-2xl bg-violet-50 p-8 text-center dark:bg-violet-900/20">
            <h3 className="mb-2 text-xl font-bold">Vẫn chưa tìm thấy câu trả lời?</h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng 24/7 để giải đáp mọi thắc mắc của bạn.
            </p>
            <Button className="h-12 bg-violet-600 px-8 font-bold hover:bg-violet-700">
              Liên hệ hỗ trợ ngay
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
