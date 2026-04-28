import { Zap, Menu, X, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export function MarketingLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đóng menu mobile khi chuyển trang
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tìm trạm sạc', href: '/map' },
    { label: 'Bảng giá', href: '/pricing' },
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans dark:bg-slate-950">
      {/* Header */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 py-3 shadow-sm backdrop-blur-md dark:bg-slate-950/80'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg transition-transform group-hover:scale-105">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-black tracking-tight text-transparent dark:from-white dark:to-slate-300">
              EVCharge
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link to="/login">
              <Button variant="ghost" className="font-semibold">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-violet-600 font-semibold shadow-md hover:bg-violet-700">
                Bắt đầu ngay
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 text-slate-600 dark:text-slate-300 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white px-6 pt-24 dark:bg-slate-950 md:hidden">
          <nav className="mb-8 flex flex-col gap-6 text-xl font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800"
              >
                {link.label}
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4 pb-12">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="h-14 w-full text-lg">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button className="h-14 w-full bg-violet-600 text-lg hover:bg-violet-700">
                Tạo tài khoản miễn phí
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 bg-slate-900 px-4 py-16 text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <Link to="/" className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
                <span className="text-xl font-bold text-white">EVCharge</span>
              </Link>
              <p className="mb-6 max-w-sm leading-relaxed text-slate-400">
                Nền tảng quản lý sạc xe điện thông minh hàng đầu Việt Nam. Giúp bạn tìm trạm, đặt
                lịch và thanh toán dễ dàng.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-violet-600 hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-violet-600 hover:text-white"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-violet-600 hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-violet-600 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-6 font-semibold text-white">Sản phẩm</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link to="/map" className="transition-colors hover:text-violet-400">
                    Bản đồ trạm sạc
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="transition-colors hover:text-violet-400">
                    Bảng giá & Gói cước
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="transition-colors hover:text-violet-400">
                    Tính năng nổi bật
                  </Link>
                </li>
                <li>
                  <Link to="/app" className="transition-colors hover:text-violet-400">
                    Tải ứng dụng
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-semibold text-white">Hỗ trợ</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link to="/support" className="transition-colors hover:text-violet-400">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="transition-colors hover:text-violet-400">
                    Câu hỏi thường gặp
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="transition-colors hover:text-violet-400">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link to="/report" className="transition-colors hover:text-violet-400">
                    Báo cáo sự cố
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-semibold text-white">Công ty</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link to="/about" className="transition-colors hover:text-violet-400">
                    Về EVCharge
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="transition-colors hover:text-violet-400">
                    Blog & Tin tức
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="transition-colors hover:text-violet-400">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="transition-colors hover:text-violet-400">
                    Điều khoản sử dụng
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
            <p>© {new Date().getFullYear()} EVCharge Vietnam. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
              <Link to="/cookies" className="transition-colors hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
