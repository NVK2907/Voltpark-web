import { Bell, ChevronRight, Globe, Monitor, ShieldCheck, Smartphone, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Switch } from '@/shared/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 lg:p-10">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Cài đặt</h1>
        <p className="mt-1 font-medium text-slate-500">
          Quản lý trải nghiệm và bảo mật tài khoản của bạn.
        </p>
      </div>

      <div className="space-y-6">
        {/* Language & Region */}
        <Card className="overflow-hidden rounded-[32px] border-slate-100 shadow-sm dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
              <Globe className="h-4 w-4" /> Ngôn ngữ & Vùng
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-50 dark:divide-slate-800">
            <div className="flex h-14 items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-200">Ngôn ngữ</span>
              <Select defaultValue="vi">
                <SelectTrigger className="h-9 w-32 rounded-xl border-slate-200 font-bold dark:border-slate-700">
                  <SelectValue placeholder="Ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex h-14 items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-200">Múi giờ</span>
              <span className="text-sm font-medium text-slate-400">Asia/Ho_Chi_Minh (UTC+7)</span>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="overflow-hidden rounded-[32px] border-slate-100 shadow-sm dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
              <Bell className="h-4 w-4" /> Thông báo
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-50 dark:divide-slate-800">
            {[
              { label: 'Sạc hoàn tất', defaultOn: true },
              { label: 'Thanh toán', defaultOn: true },
              { label: 'Khuyến mãi', defaultOn: false },
              { label: 'Bản tin VoltPark', defaultOn: false },
              { label: 'Nhận qua Email', defaultOn: true },
              { label: 'Nhận qua SMS', defaultOn: false },
            ].map((item) => (
              <div key={item.label} className="flex h-14 items-center justify-between">
                <span className="font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                <Switch defaultChecked={item.defaultOn} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="overflow-hidden rounded-[32px] border-slate-100 shadow-sm dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
              <Monitor className="h-4 w-4" /> Hiển thị
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-50 dark:divide-slate-800">
            <div className="flex h-14 items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-200">Giao diện</span>
              <Select defaultValue="system">
                <SelectTrigger className="h-9 w-32 rounded-xl border-slate-200 font-bold dark:border-slate-700">
                  <SelectValue placeholder="Giao diện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Sáng</SelectItem>
                  <SelectItem value="dark">Tối</SelectItem>
                  <SelectItem value="system">Hệ thống</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex h-14 items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-200">Đơn vị đo</span>
              <Select defaultValue="km">
                <SelectTrigger className="h-9 w-32 rounded-xl border-slate-200 font-bold dark:border-slate-700">
                  <SelectValue placeholder="Đơn vị" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">Kilômét (km)</SelectItem>
                  <SelectItem value="mi">Dặm (mi)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security & Privacy */}
        <Card className="overflow-hidden rounded-[32px] border-slate-100 shadow-sm dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
              <ShieldCheck className="h-4 w-4" /> Bảo mật & Quyền riêng tư
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-50 dark:divide-slate-800">
            <button className="flex h-14 w-full items-center justify-between hover:text-violet-600">
              <span className="font-bold">Thay đổi mật khẩu</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
            <button className="flex h-14 w-full items-center justify-between hover:text-violet-600">
              <span className="font-bold">Xác thực 2 lớp (2FA)</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Tắt</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </button>
            <button className="flex h-14 w-full items-center justify-between hover:text-violet-600">
              <span className="font-bold">Quản lý phiên đăng nhập</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="overflow-hidden rounded-[32px] border-red-100 bg-red-50/20 shadow-sm dark:border-red-900/20 dark:bg-red-900/5">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-black text-red-600">Xóa tài khoản</p>
                <p className="text-xs font-medium text-slate-500">
                  Tất cả dữ liệu và lịch sử của bạn sẽ bị xóa vĩnh viễn.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="h-10 rounded-xl font-bold">
                    Xóa tài khoản
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[32px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Xóa tài khoản?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác. Tất cả dữ liệu, ví tiền và lịch sử giao dịch
                      của bạn sẽ bị xóa vĩnh viễn khỏi hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      className="rounded-xl bg-red-600 hover:bg-red-700"
                      onClick={() =>
                        toast.error(
                          'Đã gửi yêu cầu xóa tài khoản. Chúng tôi sẽ xử lý trong vòng 30 ngày.',
                        )
                      }
                    >
                      Xác nhận xóa
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
