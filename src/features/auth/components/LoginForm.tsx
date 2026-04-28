import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: loginMutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Login form"
      className="space-y-4"
    >
      <Input
        {...register('email')}
        id="login-email"
        type="email"
        label="Email address"
        placeholder="admin@example.com"
        autoComplete="email"
        autoFocus
        startIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        disabled={isPending}
      />

      <Input
        {...register('password')}
        id="login-password"
        type={showPassword ? 'text' : 'password'}
        label="Password"
        placeholder="••••••••"
        autoComplete="current-password"
        startIcon={<Lock className="h-4 w-4" />}
        endIcon={
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        error={errors.password?.message}
        disabled={isPending}
      />

      <Button
        type="submit"
        id="login-submit"
        className="w-full"
        loading={isPending}
        disabled={isPending}
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
