import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function BlogListPage() {
  const featuredPost = {
    slug: 'tuong-lai-xe-dien-viet-nam-2025',
    title: 'Tương lai của xe điện tại Việt Nam đến năm 2025',
    excerpt:
      'Khám phá những xu hướng, chính sách và sự phát triển của hạ tầng trạm sạc sẽ định hình lại thói quen di chuyển của người Việt trong 2 năm tới.',
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop',
    date: '15 Thg 10, 2023',
    author: 'Nguyễn Văn A',
    category: 'Xu hướng',
  };

  const posts = [
    {
      slug: 'huong-dan-sac-xe-dung-cach',
      title: 'Hướng dẫn sạc pin xe điện đúng cách giúp kéo dài tuổi thọ',
      excerpt:
        'Bí quyết để duy trì hiệu suất pin ở mức tối ưu. Nên sạc đến bao nhiêu phần trăm? Sạc nhanh có hại pin không?',
      image:
        'https://images.unsplash.com/photo-1660636254703-a2cd1c78484a?q=80&w=800&auto=format&fit=crop',
      date: '12 Thg 10, 2023',
      category: 'Mẹo hay',
    },
    {
      slug: 'review-vinfast-vf8-hanh-trinh-xuyen-viet',
      title: 'Review chi tiết hành trình xuyên Việt 2000km bằng xe điện',
      excerpt:
        'Nhật ký chuyến đi 10 ngày từ Hà Nội vào TP.HCM. Cập nhật chi phí sạc, các điểm dừng chân và trải nghiệm thực tế.',
      image:
        'https://images.unsplash.com/photo-1678174526685-3b99beccfb1f?q=80&w=800&auto=format&fit=crop',
      date: '08 Thg 10, 2023',
      category: 'Trải nghiệm',
    },
    {
      slug: 'ra-mat-tram-sac-sieu-nhanh-250kw',
      title: 'EVCharge ra mắt mạng lưới trạm sạc siêu nhanh 250kW thế hệ mới',
      excerpt:
        'Giảm thời gian sạc từ 10% lên 80% chỉ còn 15 phút. Khám phá bản đồ phân bổ các trạm siêu nhanh trên toàn quốc.',
      image:
        'https://images.unsplash.com/photo-1620803135547-074f76cdb2c9?q=80&w=800&auto=format&fit=crop',
      date: '05 Thg 10, 2023',
      category: 'Tin tức',
    },
    {
      slug: 'so-sanh-chi-phi-xe-dien-vs-xe-xang',
      title: 'So sánh chi phí: Xe điện có thực sự rẻ hơn xe xăng?',
      excerpt:
        'Bài toán chi phí chi tiết bao gồm giá mua, phí sạc, bảo dưỡng và giá trị bán lại sau 5 năm sử dụng.',
      image:
        'https://images.unsplash.com/photo-1582607172584-825590924976?q=80&w=800&auto=format&fit=crop',
      date: '01 Thg 10, 2023',
      category: 'Tài chính',
    },
  ];

  const categories = ['Tất cả', 'Tin tức', 'Xu hướng', 'Trải nghiệm', 'Mẹo hay', 'Tài chính'];

  return (
    <div className="flex w-full flex-col pb-24">
      {/* Header */}
      <section className="bg-slate-50 px-4 pb-12 pt-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-4xl font-black md:text-5xl">Blog & Tin tức</h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600 dark:text-slate-400">
            Cập nhật thông tin mới nhất về thị trường xe điện, công nghệ sạc và chia sẻ kinh nghiệm
            từ cộng đồng.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="mx-auto mb-16 mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="group relative flex aspect-auto flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 md:aspect-[2/1] md:flex-row">
          <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-3/5">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute left-4 top-4 rounded-full bg-violet-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Bài viết nổi bật
            </div>
          </div>
          <div className="flex w-full flex-col justify-center bg-white p-8 dark:bg-slate-900 md:w-2/5 md:p-12">
            <div className="mb-4 flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" /> {featuredPost.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {featuredPost.date}
              </span>
            </div>
            <h2 className="mb-4 line-clamp-3 text-2xl font-bold transition-colors group-hover:text-violet-600 md:text-3xl">
              <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
            </h2>
            <p className="mb-8 line-clamp-3 leading-relaxed text-slate-600 dark:text-slate-400">
              {featuredPost.excerpt}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
                  <User className="h-4 w-4 text-slate-500" />
                </div>
                {featuredPost.author}
              </span>
              <Link to={`/blog/${featuredPost.slug}`}>
                <Button
                  variant="ghost"
                  className="p-0 font-semibold text-violet-600 hover:text-violet-700"
                >
                  Đọc tiếp <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter */}
        <div className="hide-scrollbar mb-8 flex flex-nowrap gap-2 overflow-x-auto border-b border-slate-100 pb-6 dark:border-slate-800">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${idx === 0 ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <article
              key={idx}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 backdrop-blur dark:bg-slate-900/90 dark:text-white">
                  {post.category}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-3 block text-xs text-slate-500">{post.date}</span>
                <h3 className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-violet-600">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mb-6 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                  {post.excerpt}
                </p>
                <div className="mt-auto border-t border-slate-100 pt-4 dark:border-slate-800">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center text-sm font-bold text-violet-600 hover:underline"
                  >
                    Đọc toàn bộ <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 text-center">
          <Button variant="outline" className="h-12 rounded-full px-8 font-bold">
            Tải thêm bài viết
          </Button>
        </div>
      </section>
    </div>
  );
}
