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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet';
import { Textarea } from '@/shared/components/ui/textarea';
import type { AddStationFormData, AddStationSheetProps, Station } from '@/types';

const schema = z.object({
  name: z.string().min(3, 'Tên trạm tối thiểu 3 ký tự'),
  address: z.string().min(10, 'Địa chỉ tối thiểu 10 ký tự'),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  totalSlots: z.coerce.number().min(1, 'Tối thiểu 1 slot').max(500),
  operatingHours: z.string().min(5, 'Ví dụ: 06:00 - 22:00'),
  status: z.enum(['online', 'offline', 'maintenance']),
  managerId: z.string().min(1, 'Nhập mã quản lý'),
});

export function AddStationSheet({ open, onOpenChange, onAdd }: AddStationSheetProps) {
  const form = useForm<AddStationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      address: '',
      lat: 10.7769,
      lng: 106.7009,
      totalSlots: 10,
      operatingHours: '06:00 - 22:00',
      status: 'online',
      managerId: '',
    },
  });

  const onSubmit = (data: AddStationFormData) => {
    const newStation: Station = {
      id: `ST${String(Date.now()).slice(-4)}`,
      name: data.name,
      address: data.address,
      coordinates: { lat: data.lat, lng: data.lng },
      totalSlots: data.totalSlots,
      activeChargers: 0,
      status: data.status,
      loadPercent: 0,
      revenueToday: 0,
      revenueMonth: 0,
      operatingHours: data.operatingHours,
      managerId: data.managerId,
    };

    onAdd(newStation);
    toast.success(`Đã thêm trạm "${data.name}" thành công`);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-lg overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-black">Thêm trạm sạc mới</SheetTitle>
          <SheetDescription>Điền đầy đủ thông tin bên dưới để tạo trạm mới</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6 pb-20">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Tên trạm sạc</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Trạm sạc Vincom Center ..."
                      className="h-12 rounded-xl border-2 font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Địa chỉ</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Số nhà, đường, quận, TP..."
                      className="resize-none rounded-xl border-2 font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Vĩ độ (lat)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.0001"
                        className="h-12 rounded-xl border-2 font-medium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lng"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Kinh độ (lng)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.0001"
                        className="h-12 rounded-xl border-2 font-medium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="totalSlots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Tổng số slot</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-12 rounded-xl border-2 font-medium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="operatingHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Giờ hoạt động</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="06:00 - 22:00"
                        className="h-12 rounded-xl border-2 font-medium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Trạng thái ban đầu</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl border-2 font-medium">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="online">Hoạt động</SelectItem>
                      <SelectItem value="offline">Tạm ngưng</SelectItem>
                      <SelectItem value="maintenance">Bảo trì</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="managerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Mã quản lý (managerId)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MGR-001"
                      className="h-12 rounded-xl border-2 font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="absolute bottom-0 left-0 right-0 border-t bg-background p-6 sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-2xl border-2 font-bold"
                onClick={() => onOpenChange(false)}
              >
                HỦY
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-2xl bg-indigo-600 font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700"
              >
                THÊM TRẠM
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
