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
import type { EditStationFormData, EditStationSheetProps } from '@/types';

const schema = z.object({
  name: z.string().min(3, 'Tên trạm tối thiểu 3 ký tự'),
  address: z.string().min(10, 'Địa chỉ tối thiểu 10 ký tự'),
  operatingHours: z.string().min(5, 'Nhập giờ hoạt động'),
  totalSlots: z.coerce.number().min(1).max(200),
  status: z.enum(['active', 'inactive', 'maintenance']),
});

export function EditStationSheet({ open, onOpenChange, station, onSave }: EditStationSheetProps) {
  const form = useForm<EditStationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: station.name,
      address: station.address,
      operatingHours: station.operatingHours,
      totalSlots: station.totalSlots,
      status:
        station.status === 'online'
          ? 'active'
          : station.status === 'offline'
            ? 'inactive'
            : 'maintenance',
    },
  });

  const onSubmit = (data: EditStationFormData) => {
    onSave(data);
    toast.success(`Đã cập nhật trạm ${station.name}`);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-lg overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-black">Chỉnh sửa trạm sạc</SheetTitle>
          <SheetDescription className="font-mono text-xs uppercase tracking-widest text-slate-500">
            ID: {station.id}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Tên trạm</FormLabel>
                  <FormControl>
                    <Input className="h-12 rounded-xl border-2 font-medium" {...field} />
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
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Trạng thái</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl border-2 font-medium">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Tạm ngưng</SelectItem>
                      <SelectItem value="maintenance">Bảo trì</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-10 flex-col gap-3 sm:flex-col">
              <Button
                type="submit"
                className="h-14 w-full rounded-2xl bg-indigo-600 text-lg font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700"
              >
                LƯU THAY ĐỔI
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-2xl border-2 font-bold"
                onClick={() => onOpenChange(false)}
              >
                HỦY
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
