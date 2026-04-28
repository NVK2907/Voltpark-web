import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col pb-24">
      {/* Header */}
      <section className="px-4 pb-12 pt-20 text-center">
        <h1 className="mb-6 text-4xl font-black md:text-5xl">
          Liên hệ với <span className="text-violet-600">EVCharge</span>
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-slate-600 dark:text-slate-400">
          Chúng tôi rất mong nhận được phản hồi từ bạn. Đội ngũ CSKH luôn sẵn sàng hỗ trợ 24/7.
        </p>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900 lg:grid-cols-2">
          {/* Contact Info & Map */}
          <div className="flex flex-col justify-between border-b border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950 lg:border-b-0 lg:border-r lg:p-12">
            <div>
              <h2 className="mb-8 text-2xl font-bold">Thông tin liên hệ</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                    <MapPin className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Trụ sở chính</h3>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                      Tòa nhà Vincom Center,
                      <br />
                      72 Lê Thánh Tôn, P. Bến Nghé,
                      <br />
                      Quận 1, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Hotline CSKH</h3>
                    <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
                      1900 1234
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="h-3 w-3" /> Hỗ trợ 24/7
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Email</h3>
                    <p className="text-slate-600 dark:text-slate-400">support@evcharge.vn</p>
                    <p className="text-slate-600 dark:text-slate-400">partnership@evcharge.vn</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-slate-800">
              {/* Replace with actual map embed */}
              <div className="text-center text-slate-500">
                <MapPin className="mx-auto mb-2 h-8 w-8 opacity-50" />
                <p>Google Maps Embed Placeholder</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 lg:p-12">
            <h2 className="mb-8 text-2xl font-bold">Gửi tin nhắn cho chúng tôi</h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="h-12 w-full rounded-lg border bg-slate-50 px-4 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-slate-950"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="09xx xxx xxx"
                    className="h-12 w-full rounded-lg border bg-slate-50 px-4 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-slate-950"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="nguyenvana@example.com"
                  className="h-12 w-full rounded-lg border bg-slate-50 px-4 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-slate-950"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Vấn đề cần hỗ trợ</label>
                <select className="h-12 w-full rounded-lg border bg-slate-50 px-4 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-slate-950">
                  <option value="">Chọn chủ đề...</option>
                  <option value="support">Hỗ trợ kỹ thuật / Lỗi trạm sạc</option>
                  <option value="billing">Hóa đơn & Thanh toán</option>
                  <option value="partnership">Hợp tác kinh doanh (Mở trạm sạc)</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Mô tả chi tiết vấn đề của bạn..."
                  className="w-full resize-none rounded-lg border bg-slate-50 p-4 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-slate-950"
                />
              </div>

              <Button className="h-14 w-full bg-violet-600 text-lg font-bold shadow-md hover:bg-violet-700">
                <Send className="mr-2 h-5 w-5" /> Gửi tin nhắn
              </Button>
              <p className="mt-4 text-center text-xs text-slate-500">
                Bằng việc gửi tin nhắn, bạn đồng ý với{' '}
                <a href="/privacy" className="text-violet-600 hover:underline">
                  Chính sách bảo mật
                </a>{' '}
                của chúng tôi.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
