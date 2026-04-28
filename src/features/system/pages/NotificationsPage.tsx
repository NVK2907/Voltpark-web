import { Save, Bell, Mail } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { PageHeader } from '@/shared/components/common/PageHeader';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';

export function NotificationsPage() {
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    toast.success('Đã lưu cấu hình thông báo');
  };

  return (
    <div className="animate-fade-in space-y-6 pb-12">
      <PageHeader
        title="Cấu hình Thông báo"
        actions={
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" /> Lưu cấu hình
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> Thông báo ứng dụng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cảnh báo nghiêm trọng</Label>
                <p className="text-sm text-muted-foreground">Thông báo push khi có lỗi thiết bị.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div className="space-y-0.5">
                <Label>Giao dịch nạp tiền</Label>
                <p className="text-sm text-muted-foreground">
                  Thông báo khi user nạp tiền thành công.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div className="space-y-0.5">
                <Label>Báo cáo hàng ngày</Label>
                <p className="text-sm text-muted-foreground">Gửi thông báo tổng hợp cuối ngày.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" /> Thông báo Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cảnh báo bảo mật</Label>
                <p className="text-sm text-muted-foreground">
                  Gửi email khi đăng nhập từ thiết bị lạ.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div className="space-y-0.5">
                <Label>Báo cáo hệ thống</Label>
                <p className="text-sm text-muted-foreground">Email báo cáo doanh thu hàng tuần.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div className="space-y-0.5">
                <Label>Trạng thái trạm sạc</Label>
                <p className="text-sm text-muted-foreground">
                  Email ngay khi trạm sạc mất kết nối quá 15 phút.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
