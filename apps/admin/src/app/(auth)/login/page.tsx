'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'superadmin@businessfirst.com', password: 'SuperAdmin@123!' },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold">BF</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">BusinessFirst</h1>
              <p className="text-blue-200">News Platform</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Manage Your News Platform Like a Pro
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Powerful admin panel to manage articles, users, ads, and analytics all in one place.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-3xl font-bold">1.2K+</p>
              <p className="text-blue-200 text-sm">Articles Published</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-blue-200 text-sm">Monthly Readers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-950">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <span className="text-white text-2xl font-bold">BF</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">BusinessFirst</h1>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Sign in to your admin account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@businessfirst.com"
                leftIcon={<Mail className="h-4 w-4" />}
                {...register('email')}
                error={errors.email?.message}
              />
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  leftIcon={<Lock className="h-4 w-4" />}
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={isSubmitting} rightIcon={<ArrowRight className="h-4 w-4" />}>
                Sign In to Admin
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-2">Demo Credentials</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Email: admin@businessfirst.com</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Password: SuperAdmin@123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}