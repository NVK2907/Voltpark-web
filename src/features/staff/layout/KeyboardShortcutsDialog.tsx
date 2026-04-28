import { useState, useEffect } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '?' || (e.key === '/' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Phím tắt bàn phím</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 py-4">
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Hệ thống
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Tìm kiếm toàn cầu</span>
                <kbd className="rounded bg-muted px-2 py-1 text-xs">⌘ K</kbd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Hiển thị trợ giúp này</span>
                <kbd className="rounded bg-muted px-2 py-1 text-xs">?</kbd>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Thao tác
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Tạo phiên sạc mới</span>
                <kbd className="rounded bg-muted px-2 py-1 text-xs">⌘ N</kbd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Làm mới dữ liệu (Refresh)</span>
                <kbd className="rounded bg-muted px-2 py-1 text-xs">⌘ R</kbd>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Điều hướng (G + Phím)
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Trang chủ</span>
                <div className="flex gap-1">
                  <kbd className="rounded bg-muted px-2 py-1 text-xs">G</kbd>
                  <kbd className="rounded bg-muted px-2 py-1 text-xs">H</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Phiên sạc</span>
                <div className="flex gap-1">
                  <kbd className="rounded bg-muted px-2 py-1 text-xs">G</kbd>
                  <kbd className="rounded bg-muted px-2 py-1 text-xs">S</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Công việc</span>
                <div className="flex gap-1">
                  <kbd className="rounded bg-muted px-2 py-1 text-xs">G</kbd>
                  <kbd className="rounded bg-muted px-2 py-1 text-xs">T</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
