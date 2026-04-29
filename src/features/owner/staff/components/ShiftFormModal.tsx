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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { getOwnerParkings } from '@/lib/utils-owner';
import { MOCK_STAFF } from '../pages/StaffListPage';

const shiftSchema = z.object({
  staffId: z.string().min(1, 'Vui lòng chọn nhân viên'),
  parkingId: z.string().min(1, 'Vui lòng chọn bãi đỗ'),
  type: z.enum(['morning', 'afternoon', 'night']),
  date: z.string().min(1, 'Vui lòng chọn ngày'),
});

type ShiftFormValues = z.infer<typeof shiftSchema>;

interface ShiftFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (values: ShiftFormValues) => void;
}

export function ShiftFormModal({ open, onOpenChange, onSuccess }: ShiftFormModalProps) {
  const parkings = getOwnerParkings();
  const form = useForm<ShiftFormValues>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      staffId: '',
      parkingId: '',
      type: 'morning',
      date: new Date().toISOString().split('T')[0],
    },
  });

  function onSubmit(values: ShiftFormValues) {
    onSuccess(values);
    onOpenChange(false);
    toast.success('Đã phân ca thành công');
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Phân ca làm việc</DialogTitle>
          <DialogDescription>Chọn nhân viên và thời gian để tạo ca trực mới.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="staffId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhân viên</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhân viên" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_STAFF.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
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
              name="parkingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bãi đỗ</FormLabel>
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ca trực</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn ca" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Sáng</SelectItem>
                        <SelectItem value="afternoon">Chiều</SelectItem>
                        <SelectItem value="night">Đêm</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày trực</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                Xác nhận phân ca
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
