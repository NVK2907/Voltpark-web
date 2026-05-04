import { Map, Zap, Wallet, User, History } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Bản đồ', href: '/map', icon: Map },
  { label: 'Sạc pin', href: '/checkin', icon: Zap },
  { label: 'Ví', href: '/wallet', icon: Wallet },
  { label: 'Lịch sử', href: '/charging', icon: History },
  { label: 'Cá nhân', href: '/profile', icon: User },
];

export function UserBottomNav() {
  return (
    <nav className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t bg-white/80 px-4 pt-2 backdrop-blur-md dark:bg-slate-900/80 lg:hidden">
      <div className="flex h-14 items-center justify-between">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1.5 transition-all ${
                isActive
                  ? 'scale-110 text-violet-600 dark:text-violet-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
