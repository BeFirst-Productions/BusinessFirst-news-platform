'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const adSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  type: z.enum(['IMAGE', 'VIDEO', 'BOTH']),
  redirectUrl: z.string().url().optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  priority: z.coerce.number().min(0).default(0),
});

type AdFormData = z.infer<typeof adSchema>;

export default function CreateAdPage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AdFormData>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      type: 'IMAGE',
      priority: 0,
    },
  });

  const createAd = useMutation({
    mutationFn: async (data: AdFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (imageFile) formData.append('image', imageFile);
      if (videoFile) formData.append('video', videoFile);

      return apiClient.post('/ads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      toast.success('Ad created successfully');
      router.push('/dashboard/ads');
    },
    onError: () => toast.error('Failed to create ad'),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create Advertisement</h1>
          <p className="text-muted-foreground">Add a new advertisement</p>
        </div>
      </div>

      <form onSubmit={handleSubmit((data) => createAd.mutate(data))} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ad Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Ad Name"
              placeholder="Enter ad name"
              {...register('name')}
              error={errors.name?.message}
            />

            <div>
              <Label>Ad Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IMAGE">Image Only</SelectItem>
                      <SelectItem value="VIDEO">Video Only</SelectItem>
                      <SelectItem value="BOTH">Both Image & Video</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Input
              label="Redirect URL (optional)"
              placeholder="https://example.com"
              {...register('redirectUrl')}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="datetime-local"
                {...register('startDate')}
                error={errors.startDate?.message}
              />
              <Input
                label="End Date"
                type="datetime-local"
                {...register('endDate')}
                error={errors.endDate?.message}
              />
            </div>

            <Input
              label="Priority"
              type="number"
              {...register('priority')}
              helperText="Higher priority ads shown first"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Image</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                      }}
                      className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <Label>Video (optional)</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center">
                {videoPreview ? (
                  <div className="relative">
                    <video
                      src={videoPreview}
                      controls
                      className="max-h-48 mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setVideoFile(null);
                        setVideoPreview('');
                      }}
                      className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload video</p>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} leftIcon={<Save className="h-4 w-4" />}>
            Create Ad
          </Button>
        </div>
      </form>
    </div>
  );
}