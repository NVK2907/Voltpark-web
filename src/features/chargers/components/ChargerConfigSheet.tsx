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
import type { Charger, ChargerConfigFormData, ChargerConfigSheetProps } from '@/types';

const schema = z.object({
  powerKw: z.coerce.number().refine((v) => [22, 50, 150].includes(v), {
    message: 'Chọn công suất hợp lệ',
  }),
  connectorType: z.enum(['Type2', 'CCS2', 'CHAdeMO']),
  status: z.enum(['available', 'offline']),
  maxSessionMin: z.coerce.number().min(10).max(480),
  pricePerKwh: z.coerce.number().min(0),
  notes: z.string().max(300).optional().default(''),
});

export function ChargerConfigSheet({
  open,
  onOpenChange,
  charger,
  onSave,
}: ChargerConfigSheetProps) {
  const form = useForm<ChargerConfigFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      powerKw: charger.powerKw as 22 | 50 | 150,
      connectorType: charger.connectorType,
      status:
        charger.status === 'charging'
          ? 'available'
          : charger.status === 'available' || charger.status === 'offline'
            ? charger.status
            : 'offline',
      maxSessionMin: 120,
      pricePerKwh: 3500,
      notes: '',
    },
  });

  const onSubmit = (data: ChargerConfigFormData) => {
    onSave({
      powerKw: data.powerKw as 22 | 50 | 150,
      connectorType: data.connectorType,
      status: data.status,
    });
    toast.success(`Đã cập nhật cấu hình bộ sạc ${charger.id}`);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-lg overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-black">Cấu hình bộ sạc</SheetTitle>
          <SheetDescription className="font-mono text-xs uppercase tracking-widest text-slate-500">
            {charger.id} · {charger.stationName}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8 pb-20">
            {/* Section 1: Hardware */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Thông số phần cứng
              </h3>
              <FormField
                control={form.control}
                name="powerKw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Công suất tối đa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-2 font-medium">
                          <SelectValue placeholder="Chọn công suất" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="22">22 kW — AC</SelectItem>
                        <SelectItem value="50">50 kW — DC</SelectItem>
                        <SelectItem value="150">150 kW — DC Fast</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="connectorType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Chuẩn kết nối</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-2 font-medium">
                          <SelectValue placeholder="Chọn chuẩn kết nối" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Type2">Type 2 (AC)</SelectItem>
                        <SelectItem value="CCS2">CCS2 (DC)</SelectItem>
                        <SelectItem value="CHAdeMO">CHAdeMO (DC)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Section 2: Operations */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Trạng thái vận hành
              </h3>
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
                        <SelectItem value="available">Hoạt động (Sẵn sàng)</SelectItem>
                        <SelectItem value="offline">Ngoại tuyến</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Trạng thái 'Đang sạc' và 'Lỗi' được cập nhật tự động bởi hệ thống.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Section 3: Limits */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Giới hạn phiên sạc
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="maxSessionMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Thời gian tối đa (phút)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={10}
                          max={480}
                          step={10}
                          className="h-12 rounded-xl border-2 font-medium"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-[10px] text-muted-foreground">Tối đa 480 phút (8 giờ)</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pricePerKwh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Giá điện (đ/kWh)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step={100}
                          className="h-12 rounded-xl border-2 font-medium"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-[10px] text-muted-foreground">
                        Đơn giá tính theo kWh tiêu thụ
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 4: Notes */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Ghi chú kỹ thuật
              </h3>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Ghi chú kỹ thuật, cảnh báo..."
                        className="resize-none rounded-xl border-2 font-medium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Firmware Info */}
            <div className="space-y-3 rounded-2xl bg-slate-50 p-6 dark:bg-slate-900/50">
              <p className="text-sm font-bold">Thông tin Firmware</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phiên bản hiện tại</span>
                <span className="font-mono font-bold text-indigo-600">
                  {charger.firmwareVersion}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ngày cài đặt</span>
                <span className="font-medium">{charger.installationDate}</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full rounded-xl border-2 font-bold"
                onClick={() => toast.info('Đang kiểm tra bản cập nhật firmware...')}
              >
                Kiểm tra cập nhật firmware
              </Button>
            </div>

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
                className="flex-1 rounded-2xl bg-indigo-600 font-black text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700"
              >
                LƯU CẤU HÌNH
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
