'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';

const createUserSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name is required'),
  role: z.enum(['ADMIN', 'EDITOR']),
  canCreateUsers: z.boolean().default(false),
});

const editUserSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name is required'),
  role: z.enum(['ADMIN', 'EDITOR']),
  canCreateUsers: z.boolean().default(false),
});

type UserFormData = z.infer<typeof createUserSchema>;

interface UserFormProps {
  onSuccess?: () => void;
  initialData?: any;
}

export function UserForm({ onSuccess, initialData }: UserFormProps) {
  const isEdit = !!initialData;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(isEdit ? editUserSchema : createUserSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      role: initialData?.role || 'EDITOR',
      canCreateUsers: initialData?.canCreateUsers ?? false,
    },
  });

  const roleValue = watch('role');

  React.useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('email', initialData.email);
      setValue('role', initialData.role);
      setValue('canCreateUsers', initialData.canCreateUsers);
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEdit) {
        const { password, ...updateData } = data as any;
        await apiClient.put(`/users/${initialData.id}`, updateData);
        toast.success('User updated successfully');
      } else {
        await apiClient.post('/users', data);
        toast.success('User created successfully');
      }
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} user`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Enter full name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter email"
        {...register('email')}
        error={errors.email?.message}
      />
      {!isEdit && (
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          {...register('password')}
          error={errors.password?.message}
        />
      )}
      <div>
        <Label>Role</Label>
        <Select onValueChange={(v) => setValue('role', v as any)} value={roleValue}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="EDITOR">Editor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="canCreateUsers"
          {...register('canCreateUsers')}
          className="rounded border-gray-300"
        />
        <Label htmlFor="canCreateUsers">Allow user to create other users</Label>
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isEdit ? 'Save Changes' : 'Create User'}
        </Button>
      </div>
    </form>
  );
}