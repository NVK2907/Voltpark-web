import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

import { AUTH_ROUTES } from '@/lib/constants';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

const loginSchema = z.object({
  email: z.string().min(1, 'Email là bắt buộc').email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Mock API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            (data.email === 'admin@evcharge.vn' ||
              data.email === 'nva@example.com' ||
              data.email === 'staff@evcharge.vn') &&
            data.password === '123456'
          ) {
            resolve(true);
          } else {
            reject(new Error('Email hoặc mật khẩu không chính xác'));
          }
        }, 1000);
      });

      localStorage.setItem('login_email', data.email);
      toast.success('Đăng nhập thành công');
      navigate(AUTH_ROUTES.VERIFY_2FA);
    } catch (error: any) {
      toast.error(error.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <Card className="border-primary/10 shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="mb-1 text-xl font-bold tracking-tight">Đăng nhập</h2>
          <p className="text-sm text-muted-foreground">
            Dùng{' '}
            <span className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
              admin@evcharge.vn / 123456
            </span>{' '}
            để test
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@evcharge.vn"
              {...register('email')}
              className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link
                to={AUTH_ROUTES.FORGOT_PASSWORD}
                className="text-sm font-medium text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                className={
                  errors.password
                    ? 'border-destructive pr-10 focus-visible:ring-destructive'
                    : 'pr-10'
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 pb-4 pt-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked: boolean | 'indeterminate') =>
                setValue('rememberMe', checked === true)
              }
            />
            <Label
              htmlFor="rememberMe"
              className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ghi nhớ đăng nhập
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
