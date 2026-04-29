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
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet';
import { getOwnerParkings } from '@/lib/utils-owner';
import type { Staff } from '@/types';

const staffSchema = z.object({
  name: z.string().min(2, 'Tên nhân viên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  role: z.enum(['manager', 'operator', 'technician']),
  parkingId: z.string().min(1, 'Vui lòng chọn bãi đỗ'),
  shift: z.enum(['morning', 'afternoon', 'night', 'rotating']),
});

type StaffFormValues = z.infer<typeof staffSchema>;

interface StaffFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (values: StaffFormValues) => void;
}

export function StaffFormSheet({ open, onOpenChange, onSuccess }: StaffFormSheetProps) {
  const parkings = getOwnerParkings();
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'operator',
      parkingId: '',
      shift: 'morning',
    },
  });

  function onSubmit(values: StaffFormValues) {
    onSuccess(values);
    onOpenChange(false);
    toast.success('Đã thêm nhân viên mới thành công');
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Thêm nhân viên mới</SheetTitle>
          <SheetDescription>
            Tạo tài khoản và gán vị trí làm việc cho nhân viên mới.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="VD: Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="a.nguyen@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="09xxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vị trí" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="manager">Quản lý</SelectItem>
                      <SelectItem value="operator">Vận hành</SelectItem>
                      <SelectItem value="technician">Kỹ thuật viên</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parkingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bãi đỗ gán trực</FormLabel>
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
              name="shift"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ca làm việc mặc định</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn ca làm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="morning">Sáng (06:00 - 14:00)</SelectItem>
                      <SelectItem value="afternoon">Chiều (14:00 - 22:00)</SelectItem>
                      <SelectItem value="night">Đêm (22:00 - 06:00)</SelectItem>
                      <SelectItem value="rotating">Xoay ca</SelectItem>
                    </SelectContent>
                  </Select>
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
                Thêm nhân viên
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
