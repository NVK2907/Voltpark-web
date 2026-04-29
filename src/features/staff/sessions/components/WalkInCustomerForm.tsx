import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

const walkInSchema = z.object({
  plate: z.string().min(5, 'Biển số không hợp lệ'),
  phone: z.string().optional(),
});

type WalkInFormValues = z.infer<typeof walkInSchema>;

interface WalkInCustomerFormProps {
  onConfirm: (data: WalkInFormValues) => void;
}

export function WalkInCustomerForm({ onConfirm }: WalkInCustomerFormProps) {
  const form = useForm<WalkInFormValues>({
    resolver: zodResolver(walkInSchema),
    defaultValues: {
      plate: '',
      phone: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onConfirm)}
        className="space-y-4 rounded-lg border bg-slate-50 p-4 dark:bg-slate-800"
      >
        <p className="font-medium text-slate-900 dark:text-white">Nhập thông tin vãng lai</p>

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

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại (Tùy chọn)</FormLabel>
              <FormControl>
                <Input placeholder="09xxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" className="bg-violet-600">
            Xác nhận thông tin
          </Button>
        </div>
      </form>
    </Form>
  );
}
