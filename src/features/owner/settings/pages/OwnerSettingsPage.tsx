import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function OwnerSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Cài đặt</h2>
      <Card>
        <CardHeader>
          <CardTitle>Thiết lập hệ thống</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed py-12 text-center text-muted-foreground">
            Màn hình cài đặt (TBD)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
