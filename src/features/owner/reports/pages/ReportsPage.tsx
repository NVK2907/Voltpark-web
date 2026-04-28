import { Download, FileText } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Báo cáo</h2>
          <p className="text-muted-foreground">Xuất dữ liệu hệ thống (TBD)</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" /> Xuất báo cáo tổng hợp
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Trung tâm báo cáo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed py-12 text-center text-muted-foreground">
            Tính năng Báo cáo động theo yêu cầu (Custom Reports) đang được phát triển.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
