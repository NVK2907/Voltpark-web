import { Search, Bell, Menu, User, LogOut, Settings, CreditCard, ChevronDown } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';

interface UserHeaderProps {
  onMenuClick: () => void;
}

export function UserHeader({ onMenuClick }: UserHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 md:px-8">
      <div className="flex flex-1 items-center gap-4">
        <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative hidden w-full max-w-md md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Tìm trạm sạc, địa điểm..."
            className="h-10 rounded-xl border-none bg-slate-100 pl-10 focus-visible:ring-violet-500 dark:bg-slate-900"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="mr-2 hidden flex-col items-end sm:flex">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Số dư ví
          </span>
          <span className="text-sm font-black text-violet-600">540.000đ</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900"
        >
          <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-950" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 gap-2 rounded-xl pl-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white shadow-sm">
                KV
              </div>
              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-bold leading-none text-slate-900 dark:text-white">
                  Khánh Vũ
                </span>
                <span className="mt-0.5 text-[10px] font-medium uppercase text-slate-500">
                  Thành viên Plus
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-2 w-56 rounded-2xl border-slate-200 p-2 shadow-2xl dark:border-slate-800"
          >
            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              Tài khoản của tôi
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-3 rounded-xl px-3 py-2.5">
              <User className="h-4 w-4 text-violet-600" />
              <span className="font-semibold">Hồ sơ cá nhân</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-3 rounded-xl px-3 py-2.5">
              <CreditCard className="h-4 w-4 text-violet-600" />
              <span className="font-semibold">Ví & Thanh toán</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-3 rounded-xl px-3 py-2.5">
              <Settings className="h-4 w-4 text-violet-600" />
              <span className="font-semibold">Cài đặt</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-3 rounded-xl px-3 py-2.5 text-red-500 focus:bg-red-50 focus:text-red-500 dark:focus:bg-red-900/20">
              <LogOut className="h-4 w-4" />
              <span className="font-bold">Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
