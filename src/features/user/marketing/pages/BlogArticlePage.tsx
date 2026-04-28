import { ArrowLeft, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function BlogArticlePage() {
  const { slug } = useParams();

  // Mock content for any slug
  return (
    <div className="flex w-full flex-col bg-white pb-24 dark:bg-slate-950">
      {/* Article Header */}
      <section className="mx-auto w-full max-w-4xl px-4 pb-12 pt-24 text-center">
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-violet-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại Blog
          </Link>
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
          Xu hướng
        </div>

        <h1 className="mb-6 text-3xl font-black leading-tight md:text-5xl">
          Tương lai của xe điện tại Việt Nam đến năm 2025
        </h1>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
              <User className="h-4 w-4 text-slate-500" />
            </div>
            <span className="font-medium text-slate-900 dark:text-white">Nguyễn Văn A</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> 15 Thg 10, 2023 • 5 phút đọc
          </span>
        </div>
      </section>

      {/* Hero Image */}
      <section className="mx-auto mb-16 w-full max-w-5xl px-4">
        <div className="aspect-[21/9] overflow-hidden rounded-3xl bg-slate-100 shadow-xl dark:bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2000&auto=format&fit=crop"
            alt="EV Charging Station"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Article Body */}
      <article className="prose prose-lg prose-slate dark:prose-invert prose-violet mx-auto w-full max-w-3xl px-4">
        <p className="lead mb-8 text-xl font-medium text-slate-600 dark:text-slate-400">
          Khám phá những xu hướng, chính sách và sự phát triển của hạ tầng trạm sạc sẽ định hình lại
          thói quen di chuyển của người Việt trong 2 năm tới.
        </p>

        <h2>Sự bùng nổ của doanh số xe điện</h2>
        <p>
          Thị trường xe điện Việt Nam đang chứng kiến sự tăng trưởng phi mã. Theo báo cáo mới nhất,
          doanh số xe điện năm 2023 đã tăng hơn 200% so với cùng kỳ năm ngoái. Sự xuất hiện của hàng
          loạt các mẫu xe mới từ đa dạng phân khúc đã mang đến nhiều sự lựa chọn hơn cho người tiêu
          dùng.
        </p>
        <p>
          Không chỉ dừng lại ở các mẫu xe cỡ nhỏ đi trong đô thị, các dòng SUV điện tầm trung và cao
          cấp cũng đang nhận được sự quan tâm lớn. Điều này chứng tỏ người dùng đã bắt đầu sẵn sàng
          cho việc sử dụng xe điện như một phương tiện di chuyển chính, kể cả cho những chuyến đi
          xa.
        </p>

        <blockquote className="my-8 border-l-4 border-violet-500 pl-6 text-xl italic text-slate-800 dark:text-slate-200">
          "Hạ tầng trạm sạc chính là chìa khóa để mở ra kỷ nguyên di chuyển xanh tại Việt Nam. Không
          có trạm sạc, xe điện chỉ là những cỗ máy đẹp nằm trong gara."
        </blockquote>

        <h2>Hạ tầng trạm sạc: Xương sống của hệ sinh thái</h2>
        <p>
          Nhận thức được tầm quan trọng của hạ tầng, các đơn vị cung cấp trạm sạc như EVCharge đang
          dốc toàn lực để mở rộng mạng lưới. Mục tiêu đến năm 2025 là sẽ có hơn 10.000 điểm sạc trên
          toàn quốc, phủ kín 100% các tuyến quốc lộ và cao tốc.
        </p>
        <ul>
          <li>
            <strong>Sạc nhanh DC (50kW - 250kW):</strong> Dành cho các trạm dừng nghỉ trên cao tốc,
            giúp sạc đầy 80% pin chỉ trong 20-30 phút.
          </li>
          <li>
            <strong>Sạc AC (11kW - 22kW):</strong> Phổ biến tại các trung tâm thương mại, bãi đỗ xe
            văn phòng, khách sạn, nơi người dùng có thể để xe trong thời gian dài.
          </li>
        </ul>

        <h2>Chính sách hỗ trợ từ chính phủ</h2>
        <p>
          Việc miễn 100% lệ phí trước bạ cho xe ô tô điện chạy pin trong 3 năm đầu và giảm thuế tiêu
          thụ đặc biệt xuống chỉ còn 3% là những cú hích mạnh mẽ từ nhà nước. Các chính sách này dự
          kiến sẽ tiếp tục được duy trì hoặc mở rộng để khuyến khích quá trình chuyển đổi năng
          lượng.
        </p>
        <p>
          Trong tương lai, chúng ta có thể kỳ vọng thêm các quy định bắt buộc về việc bố trí bãi đỗ
          xe điện có trạm sạc tại các tòa nhà chung cư, trung tâm thương mại xây mới.
        </p>

        {/* Share & Tags */}
        <div className="not-prose mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 dark:border-slate-800 md:flex-row">
          <div className="flex gap-2">
            <span className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
              #XeDien
            </span>
            <span className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
              #TramSac
            </span>
            <span className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
              #TuongLai
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Share2 className="h-4 w-4" /> Chia sẻ:
            </span>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <Facebook className="h-4 w-4 text-[#1877F2]" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <Twitter className="h-4 w-4 text-[#1DA1F2]" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <Linkedin className="h-4 w-4 text-[#0A66C2]" />
            </Button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="mt-16 border-t border-slate-100 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="mb-8 text-center text-2xl font-bold">Bài viết liên quan</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Add 3 small cards similar to BlogListPage here if needed, omitted for brevity */}
            <p className="col-span-3 text-center text-slate-500">
              Các bài viết khác sẽ hiển thị tại đây.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
