import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Lock,
  Mail,
  ShieldCheck,
  Camera,
  Smartphone,
  Globe,
  Monitor,
  LogOut,
  QrCode,
} from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { MOCK_ADMIN_PROFILE } from '@/lib/mock-data';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Switch } from '@/shared/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

const profileSchema = z.object({
  name: z.string().min(2, 'Tên quá ngắn'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  role: z.string(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),
    newPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().min(8, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export function ProfilePage() {
  const [show2FA, setShow2FA] = React.useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: MOCK_ADMIN_PROFILE.name,
      phone: '0901234567',
      role: MOCK_ADMIN_PROFILE.role,
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    toast.success('Đã cập nhật thông tin cá nhân');
  };

  const onPasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    toast.success('Đã cập nhật mật khẩu mới');
    passwordForm.reset();
  };

  return (
    <div className="animate-fade-in space-y-6 pb-12">
      <PageHeader title="Hồ sơ cá nhân" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="overflow-hidden rounded-2xl border-slate-100 shadow-sm dark:border-slate-800">
            <CardContent className="flex flex-col items-center pt-8 text-center">
              <div className="relative mb-6">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
                  <span className="text-3xl font-black">{MOCK_ADMIN_PROFILE.name.charAt(0)}</span>
                </div>
                <button
                  onClick={() => toast.info('Tính năng tải ảnh đang phát triển')}
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-lg hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-black">{MOCK_ADMIN_PROFILE.name}</h2>
              <p className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-500">
                {MOCK_ADMIN_PROFILE.role}
              </p>

              <div className="w-full space-y-3 border-t border-slate-50 pt-6 text-left dark:border-slate-800">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 dark:bg-slate-800">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="truncate">{MOCK_ADMIN_PROFILE.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 dark:bg-emerald-900/20">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-emerald-600">Admin Toàn quyền</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2FA Section */}
          <Card className="rounded-2xl border-slate-100 shadow-sm dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black">Bảo mật 2 lớp</CardTitle>
              <CardDescription className="text-xs">
                Xác thực qua ứng dụng để tăng độ an toàn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-bold">Xác thực 2FA</span>
                </div>
                <Switch checked={show2FA} onCheckedChange={setShow2FA} />
              </div>

              {show2FA && (
                <div className="animate-in fade-in slide-in-from-top-2 mt-4 flex flex-col items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-white p-2">
                    <QrCode className="h-full w-full" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Mã khôi phục (Backup codes)
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456'].map((code) => (
                        <code
                          key={code}
                          className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold dark:bg-slate-950"
                        >
                          {code}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Forms Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Profile Form */}
          <Card className="rounded-2xl border-slate-100 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg font-black">Thông tin tài khoản</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Họ và tên</FormLabel>
                          <FormControl>
                            <Input className="rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Số điện thoại</FormLabel>
                          <FormControl>
                            <Input className="rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormItem className="md:col-span-2">
                      <FormLabel className="font-bold">Địa chỉ Email</FormLabel>
                      <FormControl>
                        <Input
                          value={MOCK_ADMIN_PROFILE.email}
                          disabled
                          className="rounded-xl bg-slate-50 dark:bg-slate-800/50"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Email dùng để đăng nhập và không thể thay đổi.
                      </FormDescription>
                    </FormItem>
                  </div>
                  <Button
                    type="submit"
                    className="rounded-xl bg-indigo-600 font-bold hover:bg-indigo-700"
                  >
                    Lưu thay đổi
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Password Form */}
          <Card className="rounded-2xl border-slate-100 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-black">
                <Lock className="h-5 w-5 text-amber-500" /> Thay đổi mật khẩu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Mật khẩu hiện tại</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Mật khẩu mới</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Xác nhận mật khẩu</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" variant="secondary" className="rounded-xl font-bold">
                    Cập nhật mật khẩu
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Login Sessions */}
          <Card className="rounded-2xl border-slate-100 shadow-sm dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black">Phiên đăng nhập</CardTitle>
                <CardDescription className="text-xs">
                  Các thiết bị đang đăng nhập vào tài khoản này.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => toast.success('Đã đăng xuất khỏi tất cả thiết bị khác')}
              >
                Đăng xuất tất cả
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">
                      Thiết bị
                    </TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">
                      IP
                    </TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">
                      Trạng thái
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      device: 'Chrome / Windows 11',
                      ip: '113.160.xx.xx',
                      time: 'Đang hoạt động',
                      active: true,
                    },
                    {
                      device: 'EVCharge App / iPhone 15',
                      ip: '27.72.xx.xx',
                      time: '2 giờ trước',
                      active: false,
                    },
                    {
                      device: 'Safari / MacBook Air',
                      ip: '14.161.xx.xx',
                      time: 'Hôm qua 15:20',
                      active: false,
                    },
                  ].map((session, i) => (
                    <TableRow key={i}>
                      <TableCell className="py-4">
                        <p className="text-sm font-bold">{session.device}</p>
                        {!session.active && (
                          <p className="text-[10px] font-medium text-slate-500">{session.time}</p>
                        )}
                      </TableCell>
                      <TableCell className="text-xs font-medium text-slate-500">
                        {session.ip}
                      </TableCell>
                      <TableCell className="text-right">
                        {session.active ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                            Hiện tại
                          </span>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-red-500"
                          >
                            <LogOut className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
