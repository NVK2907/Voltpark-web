import { Home, ClipboardList, Scan, Users, MoreHorizontal } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Trang chủ', href: '/staff/home', icon: Home },
  { label: 'Phiên sạc', href: '/staff/sessions', icon: ClipboardList },
  { label: 'Quét mã', href: '/staff/scan', icon: Scan },
  { label: 'Khách', href: '/staff/customers', icon: Users },
  { label: 'Thêm', href: '/staff/more', icon: MoreHorizontal },
];

export function StaffBottomNav() {
  return (
    <nav className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t bg-background px-4 pt-2 md:hidden">
      <div className="flex justify-between">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
