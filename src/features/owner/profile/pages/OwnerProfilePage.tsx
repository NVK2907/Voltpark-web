import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function OwnerProfilePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Hồ sơ cá nhân</h2>
      <Card>
        <CardHeader>
          <CardTitle>Thông tin chủ bãi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed py-12 text-center text-muted-foreground">
            Cập nhật profile và mật khẩu (TBD)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
