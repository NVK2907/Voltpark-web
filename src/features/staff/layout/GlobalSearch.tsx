import { Search } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

export function GlobalSearch() {
  return (
    <Button
      variant="outline"
      className="hidden h-9 w-full max-w-sm justify-start gap-2 text-muted-foreground md:flex"
      onClick={() => alert('Search dialog opened (Cmd+K)')}
    >
      <Search className="h-4 w-4" />
      <span>Tìm kiếm (Khách hàng, Slot, Phiên sạc)...</span>
      <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
