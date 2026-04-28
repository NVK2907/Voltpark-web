import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowLeft, MailCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { AUTH_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email là bắt buộc').email('Email không đúng định dạng'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    // Mock API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Card className="border-primary/10 shadow-lg">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <MailCheck className="h-8 w-8" />
          </div>
          <h2 className="mb-2 text-xl font-bold">Đã gửi email khôi phục</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra hộp thư
            đến hoặc thư mục spam.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link to={AUTH_ROUTES.LOGIN}>Quay lại đăng nhập</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/10 shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold tracking-tight">Khôi phục mật khẩu</h2>
          <p className="text-sm text-muted-foreground">
            Nhập email liên kết với tài khoản của bạn để nhận liên kết đặt lại mật khẩu.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email đăng nhập</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang gửi...
              </>
            ) : (
              'Gửi liên kết'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to={AUTH_ROUTES.LOGIN}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
