import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/shared/components/ui/button';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet';
import { Checkbox } from '@/shared/components/ui/checkbox';
import type { Vehicle } from '@/types';

const vehicleSchema = z.object({
  name: z.string().min(2, 'Tên xe phải có ít nhất 2 ký tự'),
  plate: z.string().min(5, 'Biển số không hợp lệ'),
  year: z.coerce
    .number()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  range: z.coerce.number().min(1),
  isDefault: z.boolean().default(false),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface VehicleFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle?: Vehicle | null;
  onSuccess: (vehicle: Partial<Vehicle>) => void;
}

export function VehicleFormSheet({
  open,
  onOpenChange,
  vehicle,
  onSuccess,
}: VehicleFormSheetProps) {
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: vehicle?.name ?? '',
      plate: vehicle?.plate ?? '',
      year: vehicle?.year ?? new Date().getFullYear(),
      range: vehicle?.range ?? 400,
      isDefault: vehicle?.isDefault ?? false,
    },
  });

  function onSubmit(values: VehicleFormValues) {
    onSuccess(values);
    onOpenChange(false);
    toast.success(vehicle ? 'Đã cập nhật thông tin xe' : 'Đã thêm xe mới thành công');
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{vehicle ? 'Chỉnh sửa thông tin xe' : 'Thêm xe mới'}</SheetTitle>
          <SheetDescription>
            Nhập thông tin xe điện của bạn để nhận gợi ý trạm sạc phù hợp.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên xe / Model</FormLabel>
                  <FormControl>
                    <Input placeholder="VD: VinFast VF 8 Plus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biển số xe</FormLabel>
                  <FormControl>
                    <Input placeholder="VD: 51A-123.45" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Năm sản xuất</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phạm vi (km)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Đặt làm xe mặc định</FormLabel>
                    <FormDescription>
                      Xe này sẽ được chọn tự động khi bạn bắt đầu phiên sạc.
                    </FormDescription>
                  </div>
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
                {vehicle ? 'Cập nhật' : 'Thêm xe'}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
