import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Car, Clock, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

import { STAFF_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
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
import { Textarea } from '@/shared/components/ui/textarea';

const walkInSchema = z.object({
  plate: z
    .string()
    .regex(/^\d{2}[A-Z]{1,2}-\d{3,4}\.\d{2}$/, 'Biển số không đúng định dạng (VD: 51A-123.45)'),
  type: z.enum(['electric', 'gasoline', 'hybrid']),
  phone: z.string().optional(),
  slotId: z.string().min(1, 'Vui lòng chọn slot'),
  entryTime: z.string().min(1, 'Vui lòng chọn thời gian vào'),
  note: z.string().optional(),
});

type WalkInFormValues = z.infer<typeof walkInSchema>;

export default function StaffWalkInPage() {
  const navigate = useNavigate();

  const form = useForm<WalkInFormValues>({
    resolver: zodResolver(walkInSchema),
    defaultValues: {
      plate: '',
      type: 'electric',
      phone: '',
      slotId: '',
      entryTime: new Date().toISOString().slice(0, 16),
      note: '',
    },
  });

  const onSubmit = (data: WalkInFormValues) => {
    const time = new Date(data.entryTime).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
    toast.success(`Đã đăng ký vào lúc ${time}`);
    navigate(STAFF_ROUTES.HOME);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Đăng ký khách vãng lai
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Ghi nhận thông tin xe vào bãi không qua ứng dụng.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="rounded-[32px] border-slate-100 shadow-sm dark:border-slate-800">
            <CardContent className="p-8">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="plate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Biển số xe</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="VD: 51A-123.45"
                          className="h-12 rounded-xl border-2 bg-slate-50 font-bold focus:bg-white"
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
                        <FormLabel className="font-bold">Loại xe</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl border-2 bg-slate-50 font-bold focus:bg-white">
                              <SelectValue placeholder="Chọn loại xe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="electric">Xe điện (EV)</SelectItem>
                            <SelectItem value="gasoline">Xe xăng/dầu</SelectItem>
                            <SelectItem value="hybrid">Xe Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Số điện thoại (Tùy chọn)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="09xxxxxxx"
                            className="h-12 rounded-xl border-2 bg-slate-50 font-bold focus:bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormItem>
                    <FormLabel className="font-bold">Bãi đỗ</FormLabel>
                    <div className="flex h-12 items-center gap-2 rounded-xl border-2 border-slate-100 bg-slate-100/50 px-4 font-bold text-slate-500">
                      <MapPin className="h-4 w-4" />
                      <span>Trạm Quận 1 - Vincom</span>
                    </div>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="slotId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Slot đỗ</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl border-2 bg-slate-50 font-bold focus:bg-white">
                              <SelectValue placeholder="Chọn slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['A1', 'A5', 'A6', 'A8', 'B2', 'B4'].map((s) => (
                              <SelectItem key={s} value={s}>
                                Slot {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="entryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Thời gian vào</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="datetime-local"
                            className="h-12 rounded-xl border-2 bg-slate-50 font-bold focus:bg-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Ghi chú</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập ghi chú (nếu có)..."
                          className="min-h-[100px] rounded-xl border-2 bg-slate-50 font-medium focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="h-14 w-full rounded-2xl bg-violet-600 text-lg font-black shadow-xl shadow-violet-600/20 hover:bg-violet-700"
            >
              ĐĂNG KÝ VÀO BÃI
            </Button>
            <Button
              variant="link"
              type="button"
              className="font-bold text-violet-600"
              onClick={() => navigate(STAFF_ROUTES.SESSIONS_NEW)}
            >
              Tạo phiên sạc ngay →
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
