import { Save, RefreshCw, Key, Shield, Percent, DollarSign, Plug } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { formatCurrency } from '@/lib/utils';
import { PageHeader } from '@/shared/components/common/PageHeader';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Switch } from '@/shared/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

export function SettingsPage() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [apiKeyVisible, setApiKeyVisible] = React.useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    toast.success('Lưu cài đặt thành công');
  };

  return (
    <div className="animate-fade-in space-y-6 pb-12">
      <PageHeader
        title="Cài đặt hệ thống"
        actions={
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Lưu thay đổi
          </Button>
        }
      />

      <Tabs defaultValue="pricing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto md:grid-cols-4">
          <TabsTrigger value="pricing">
            <DollarSign className="mr-2 hidden h-4 w-4 sm:block" />
            Giá cước
          </TabsTrigger>
          <TabsTrigger value="revenue">
            <Percent className="mr-2 hidden h-4 w-4 sm:block" />
            Chia sẻ doanh thu
          </TabsTrigger>
          <TabsTrigger value="api">
            <Plug className="mr-2 hidden h-4 w-4 sm:block" />
            API & Webhook
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 hidden h-4 w-4 sm:block" />
            Bảo mật
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình giá cước cơ bản</CardTitle>
              <CardDescription>
                Mức giá này sẽ được áp dụng làm mặc định cho tất cả trạm sạc nếu không có cấu hình
                riêng.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" id="settings-pricing" onSubmit={handleSave}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="base_price">Giá điện cơ bản (VNĐ/kWh)</Label>
                    <Input id="base_price" type="number" defaultValue="3150" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parking_fee">Phí đỗ xe khi sạc xong (VNĐ/phút)</Label>
                    <Input id="parking_fee" type="number" defaultValue="1000" />
                    <p className="text-xs text-muted-foreground">Áp dụng sau 15 phút miễn phí</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startup_fee">Phí khởi động phiên sạc (VNĐ)</Label>
                    <Input id="startup_fee" type="number" defaultValue="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vat_rate">Thuế VAT (%)</Label>
                    <Input id="vat_rate" type="number" defaultValue="8" />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="mb-4 text-lg font-medium">Mô phỏng tính giá</h3>
                  <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                    <div className="text-sm">Phiên sạc 50 kWh:</div>
                    <div className="text-xl font-bold text-primary">
                      {formatCurrency(50 * 3150 * 1.08)}
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình chia sẻ doanh thu</CardTitle>
              <CardDescription>
                Tỉ lệ chia sẻ doanh thu mặc định giữa nền tảng và đối tác nhượng quyền.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Tỉ lệ phí nền tảng (%)</Label>
                    <div className="flex items-center gap-4">
                      <Input type="number" defaultValue="15" className="w-24" />
                      <span className="text-sm text-muted-foreground">
                        Phần trăm doanh thu giữ lại cho EVCharge
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Tỉ lệ đối tác (%)</Label>
                    <div className="flex items-center gap-4">
                      <Input type="number" value="85" disabled className="w-24" />
                      <span className="text-sm text-muted-foreground">
                        Tự động tính từ phí nền tảng
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API & Tích hợp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Admin API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type={apiKeyVisible ? 'text' : 'password'}
                    value="evc_live_9f8d7c6b5a41234567890abcdef"
                    readOnly
                    className="bg-muted font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                  >
                    {apiKeyVisible ? <Key className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                  </Button>
                  <Button variant="destructive">Tạo lại</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Sử dụng key này để xác thực các request từ hệ thống bên thứ ba.
                </p>
              </div>

              <div className="space-y-2 border-t pt-4">
                <Label>Webhook URL (Nhận sự kiện sạc)</Label>
                <div className="flex gap-2">
                  <Input defaultValue="https://api.partner.com/ev-webhook" />
                  <Button variant="secondary">Test</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật hệ thống</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bắt buộc xác thực 2 bước (2FA)</Label>
                  <p className="text-sm text-muted-foreground">
                    Yêu cầu tất cả Admin phải cấu hình 2FA để đăng nhập.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="space-y-0.5">
                  <Label>Giới hạn phiên đăng nhập</Label>
                  <p className="text-sm text-muted-foreground">
                    Tự động đăng xuất sau thời gian không hoạt động.
                  </p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 phút</SelectItem>
                    <SelectItem value="30">30 phút</SelectItem>
                    <SelectItem value="60">1 giờ</SelectItem>
                    <SelectItem value="240">4 giờ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 border-t pt-4">
                <Label>IP Whitelist cho API (Mỗi IP một dòng)</Label>
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="192.168.1.100&#10;10.0.0.5"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
