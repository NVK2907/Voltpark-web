import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import * as React from 'react';

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
import { Checkbox } from '@/shared/components/ui/checkbox';
import type { CreatePromotionSheetProps, Promotion } from '@/types';

const schema = z
  .object({
    name: z.string().min(5, 'Tên chiến dịch tối thiểu 5 ký tự'),
    type: z.enum(['percent_off', 'fixed_off', 'free_minutes']),
    value: z.coerce.number().positive('Giá trị phải lớn hơn 0'),
    parkingIds: z.array(z.string()).min(1, 'Chọn ít nhất 1 bãi đỗ'),
    startDate: z.string().min(1, 'Chọn ngày bắt đầu'),
    endDate: z.string().min(1, 'Chọn ngày kết thúc'),
    maxUsage: z.coerce.number().min(1).optional(),
  })
  .refine((d) => new Date(d.endDate) > new Date(d.startDate), {
    message: 'Ngày kết thúc phải sau ngày bắt đầu',
    path: ['endDate'],
  })
  .superRefine((d, ctx) => {
    if (d.type === 'percent_off' && d.value > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Giảm giá không được vượt quá 100%',
        path: ['value'],
      });
    }
    if (d.type === 'free_minutes' && d.value > 120) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Thời gian tặng không quá 120 phút',
        path: ['value'],
      });
    }
  });

type FormData = z.infer<typeof schema>;

export function CreatePromotionSheet({
  open,
  onOpenChange,
  parkings,
  onAdd,
}: CreatePromotionSheetProps) {
  const today = new Date().toISOString().split('T')[0];

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      type: 'percent_off',
      value: 10,
      parkingIds: [],
      startDate: '',
      endDate: '',
    },
  });

  const { watch, setValue, reset } = form;
  const promoType = watch('type');
  const startDate = watch('startDate');

  // Reset value when type changes
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'type') {
        setValue('value', 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onSubmit = (data: FormData) => {
    const now = new Date().toISOString();
    const isActive = new Date(data.startDate) <= new Date();

    const newPromo: Promotion = {
      id: `PRM-${String(Date.now()).slice(-4)}`,
      ownerId: 'OWN001',
      parkingIds: data.parkingIds,
      name: data.name,
      type: data.type,
      value: data.value,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      status: isActive ? 'active' : 'scheduled',
      usageCount: 0,
      maxUsage: data.maxUsage ?? undefined,
    };

    onAdd(newPromo);
    toast.success(`Chiến dịch "${data.name}" đã được tạo thành công`);
    reset();
    onOpenChange(false);
  };

  const getUnit = () => {
    switch (promoType) {
      case 'percent_off':
        return '%';
      case 'fixed_off':
        return 'VNĐ';
      case 'free_minutes':
        return 'phút';
      default:
        return '';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-lg overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-black">Tạo chiến dịch khuyến mãi</SheetTitle>
          <SheetDescription>Thiết lập ưu đãi mới cho bãi đỗ của bạn</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8 pb-20">
            {/* Section 1: Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Thông tin chiến dịch
              </h3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Tên chiến dịch</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ví dụ: Giảm 20% cuối tuần..."
                        className="h-12 rounded-xl border-2 font-medium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Loại ưu đãi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl border-2 font-medium">
                            <SelectValue placeholder="Chọn loại" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percent_off">Giảm theo % (phí sạc)</SelectItem>
                          <SelectItem value="fixed_off">Giảm số tiền cố định (VNĐ)</SelectItem>
                          <SelectItem value="free_minutes">Tặng phút sạc miễn phí</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Giá trị ưu đãi</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min={1}
                            step={promoType === 'fixed_off' ? 1000 : 1}
                            placeholder={promoType === 'fixed_off' ? '50000' : ''}
                            className="h-12 rounded-xl border-2 pr-14 font-medium"
                            {...field}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                            {getUnit()}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 2: Parkings */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Áp dụng cho bãi đỗ
              </h3>
              <FormField
                control={form.control}
                name="parkingIds"
                render={() => (
                  <FormItem>
                    <div className="space-y-2 rounded-xl border-2 p-4">
                      {parkings.map((parking) => (
                        <FormField
                          key={parking.id}
                          control={form.control}
                          name="parkingIds"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={parking.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(parking.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, parking.id])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== parking.id),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  {parking.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Section 3: Period */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Thời gian hiệu lực
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Ngày bắt đầu</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          min={today}
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
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Ngày kết thúc</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          min={startDate || today}
                          className="h-12 rounded-xl border-2 font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 4: Usage Limit */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Giới hạn sử dụng (tùy chọn)
              </h3>
              <FormField
                control={form.control}
                name="maxUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Số lượt tối đa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Không giới hạn"
                        className="h-12 rounded-xl border-2 font-medium"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Bỏ trống nếu không muốn giới hạn số lượt dùng
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className="absolute bottom-0 left-0 right-0 border-t bg-background p-6 sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-2xl border-2 font-bold"
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
              >
                HỦY
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-2xl bg-emerald-600 font-black text-white shadow-xl shadow-emerald-600/20 hover:bg-emerald-700"
              >
                TẠO CHIẾN DỊCH
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
