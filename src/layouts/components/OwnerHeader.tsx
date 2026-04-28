import { Menu, Bell } from 'lucide-react';

import { MOCK_OWNER } from '@/lib/mock-owner';
import { getOwnerParkings } from '@/lib/utils-owner';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

interface OwnerHeaderProps {
  onMenuClick: () => void;
}

export function OwnerHeader({ onMenuClick }: OwnerHeaderProps) {
  const parkings = getOwnerParkings();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="hidden items-center gap-2 md:flex">
          <span className="max-w-[200px] truncate text-sm font-semibold">{MOCK_OWNER.name}</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            OWNER
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Parking Selector */}
        <div className="hidden w-[200px] sm:block">
          <Select defaultValue="all">
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Chọn bãi đỗ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả bãi đỗ</SelectItem>
              {parkings.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          <span className="sr-only">Thông báo</span>
        </Button>

        {/* User Profile */}
        <div className="ml-2 flex items-center gap-2">
          <div className="hidden text-right md:block">
            <div className="text-sm font-medium">{MOCK_OWNER.name}</div>
            <div className="text-xs text-muted-foreground">{MOCK_OWNER.contactEmail}</div>
          </div>
          <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
            <AvatarImage src="" alt={MOCK_OWNER.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {MOCK_OWNER.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
