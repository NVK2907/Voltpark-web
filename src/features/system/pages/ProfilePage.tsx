import { User, Lock, Mail, ShieldCheck } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

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
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

export function ProfilePage() {
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    toast.success('Đã cập nhật hồ sơ cá nhân');
  };

  return (
    <div className="animate-fade-in space-y-6 pb-12">
      <PageHeader title="Hồ sơ cá nhân" />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <Card>
            <CardContent className="flex flex-col items-center pt-6 text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-xl font-bold">{MOCK_ADMIN_PROFILE.name}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{MOCK_ADMIN_PROFILE.role}</p>
              <div className="w-full space-y-2 border-t pt-4 text-left text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" /> {MOCK_ADMIN_PROFILE.email}
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-success" /> Quyền Quản trị viên cấp cao
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSave}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input id="name" defaultValue={MOCK_ADMIN_PROFILE.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" defaultValue="0901234567" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={MOCK_ADMIN_PROFILE.email} disabled />
                    <p className="text-xs text-muted-foreground">
                      Email được sử dụng để đăng nhập không thể thay đổi ở đây.
                    </p>
                  </div>
                </div>
                <Button type="submit" disabled={isSaving}>
                  Lưu thông tin
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" /> Đổi mật khẩu
              </CardTitle>
              <CardDescription>
                Bạn nên sử dụng mật khẩu mạnh với ít nhất 8 ký tự, bao gồm số và ký tự đặc biệt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Mật khẩu hiện tại</Label>
                  <Input id="current_password" type="password" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new_password">Mật khẩu mới</Label>
                    <Input id="new_password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm_password">Xác nhận mật khẩu mới</Label>
                    <Input id="confirm_password" type="password" />
                  </div>
                </div>
                <Button type="button" variant="secondary">
                  Cập nhật mật khẩu
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
