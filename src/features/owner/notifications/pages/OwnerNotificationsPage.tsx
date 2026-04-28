import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function OwnerNotificationsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Thông báo</h2>
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử thông báo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed py-12 text-center text-muted-foreground">
            Danh sách thông báo (TBD)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
