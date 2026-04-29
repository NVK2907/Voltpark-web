import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet';
import { getOwnerParkings } from '@/lib/utils-owner';

const maintenanceSchema = z.object({
  parkingId: z.string().min(1, 'Vui lòng chọn bãi đỗ'),
  chargerId: z.string().optional(),
  type: z.enum(['charger_repair', 'facility', 'cleaning', 'upgrade']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
});

type MaintenanceFormValues = z.infer<typeof maintenanceSchema>;

interface MaintenanceFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (values: MaintenanceFormValues) => void;
}

export function MaintenanceFormSheet({ open, onOpenChange, onSuccess }: MaintenanceFormSheetProps) {
  const parkings = getOwnerParkings();
  const form = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      parkingId: '',
      chargerId: '',
      type: 'charger_repair',
      priority: 'medium',
      description: '',
    },
  });

  function onSubmit(values: MaintenanceFormValues) {
    onSuccess(values);
    onOpenChange(false);
    toast.success('Đã gửi yêu cầu hỗ trợ thành công');
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tạo yêu cầu hỗ trợ mới</SheetTitle>
          <SheetDescription>
            Gửi yêu cầu bảo trì hoặc sửa chữa thiết bị tại trạm sạc.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="parkingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bãi đỗ gặp sự cố</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn bãi đỗ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {parkings.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chargerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã trụ sạc (nếu có)</FormLabel>
                  <FormControl>
                    <Input placeholder="VD: CHG-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại yêu cầu</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="charger_repair">Sửa trụ sạc</SelectItem>
                        <SelectItem value="facility">Cơ sở vật chất</SelectItem>
                        <SelectItem value="cleaning">Vệ sinh</SelectItem>
                        <SelectItem value="upgrade">Nâng cấp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Độ ưu tiên</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mức độ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Thấp</SelectItem>
                        <SelectItem value="medium">Bình thường</SelectItem>
                        <SelectItem value="high">Khẩn cấp</SelectItem>
                        <SelectItem value="urgent">Cực kỳ khẩn cấp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả sự cố</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả chi tiết tình trạng sự cố để kỹ thuật viên nắm bắt nhanh hơn..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit" className="flex-1 bg-violet-600 hover:bg-violet-700">
                Gửi yêu cầu
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
