'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
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
  type: z.enum(['IMAGE', 'VIDEO']),
  targetPage: z.string().min(1, 'Target page is required'),
  ratio: z.string().min(1, 'Ratio is required'),
  redirectUrl: z.string().url('Please enter a valid URL (e.g., https://example.com)').optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

type AdFormData = z.infer<typeof adSchema>;

const RATIO_OPTIONS_BY_PAGE: Record<string, any[]> = {
  home: [
    { value: 'ad_1', label: 'Ad 1', ratio: 'Hero Banner', aspectClass: 'aspect-[4/1] w-full max-w-[100px]', desc: 'Header Section', dimensions: '1200 × 300 px' },
    { value: 'ad_2', label: 'Ad 2', ratio: 'Vertical', aspectClass: 'aspect-[1/2] h-12', desc: 'Sidebar Top', dimensions: '300 × 600 px' },
    { value: 'ad_3', label: 'Ad 3', ratio: 'Square', aspectClass: 'aspect-square h-12', desc: 'Sidebar Bottom', dimensions: '300 × 250 px' },
    { value: 'ad_4', label: 'Ad 4', ratio: 'Billboard', aspectClass: 'aspect-[16/3] w-full max-w-[120px]', desc: 'Middle Page', dimensions: '1600 × 300 px' },
    { value: 'ad_5', label: 'Ad 5', ratio: 'Square', aspectClass: 'aspect-square h-12', desc: 'Technology Section', dimensions: '300 × 250 px' },
    { value: 'ad_6', label: 'Ad 6', ratio: 'Billboard', aspectClass: 'aspect-[16/3] w-full max-w-[120px]', desc: 'Logistics Section', dimensions: '1600 × 300 px' },
    { value: 'ad_7', label: 'Ad 7', ratio: 'Square', aspectClass: 'aspect-square h-12', desc: 'Banking Section', dimensions: '300 × 250 px' },
    { value: 'ad_8', label: 'Ad 8', ratio: 'Billboard', aspectClass: 'aspect-[16/3] w-full max-w-[120px]', desc: 'Events Section', dimensions: '1600 × 300 px' },
    { value: 'ad_9', label: 'Ad 9', ratio: 'Billboard', aspectClass: 'aspect-[16/3] w-full max-w-[120px]', desc: 'Culture Section', dimensions: '1600 × 300 px' },
  ],
  news_detail: [
    { value: 'nd_sidebar', label: 'Sidebar Ad', ratio: 'Square', aspectClass: 'aspect-square h-12', desc: 'Article Sidebar', dimensions: '500 × 500 px' },
    { value: 'nd_bottom', label: 'Bottom Ad', ratio: 'Billboard', aspectClass: 'aspect-[16/3] w-full max-w-[120px]', desc: 'Below Article', dimensions: '1600 × 300 px' },
  ],
  contact: [
    { value: 'contact_bottom', label: 'Bottom Ad', ratio: 'Billboard', aspectClass: 'aspect-[16/3] w-full max-w-[120px]', desc: 'Above Footer', dimensions: '1600 × 300 px' },
  ]
};

const formatToDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().split('T')[0];
};

export default function EditAdPage() {
  const router = useRouter();
  const params = useParams();
  const adId = params.id as string;
  const queryClient = useQueryClient();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [isNavigating, setIsNavigating] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdFormData>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      type: 'IMAGE',
      targetPage: 'home',
    },
  });

  const { data: adData, isLoading } = useQuery({
    queryKey: ['ad', adId],
    queryFn: async () => {
      const res = await apiClient.get(`/ads/${adId}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (adData?.data) {
      const ad = adData.data;
      console.log("ad", ad);
      reset({
        name: ad.name,
        type: ad.type,
        targetPage: ad.targetPage || 'home',
        ratio: ad.ratio || '',
        redirectUrl: ad.redirectUrl || '',
        startDate: formatToDate(ad.startDate),
        endDate: formatToDate(ad.endDate),
      });
      if (ad.imageUrl) setImagePreview(ad.imageUrl);
      if (ad.videoUrl) setVideoPreview(ad.videoUrl);
    }
  }, [adData, reset]);

  const selectedPage = watch('targetPage');
  const adType = watch('type');
  const currentRatioOptions = selectedPage ? RATIO_OPTIONS_BY_PAGE[selectedPage] || [] : [];

  const { data: activeAdsResponse } = useQuery({
    queryKey: ['ads-active', selectedPage],
    queryFn: async () => {
      if (!selectedPage) return null;
      const res = await apiClient.get(`/ads?targetPage=${selectedPage}&status=ACTIVE&limit=100`);
      return res.data;
    },
    enabled: !!selectedPage,
  });

  const occupiedRatios = activeAdsResponse?.data?.map((ad: any) => ad.ratio) || [];

  const updateAd = useMutation({
    mutationFn: async (data: AdFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (imageFile) formData.append('image', imageFile);
      if (videoFile) formData.append('video', videoFile);

      const pageNames: Record<string, string> = {
        home: 'Homepage',
        news_detail: 'News Detail Page',
        contact: 'Contact Page'
      };
      const selectedRatioOption = currentRatioOptions.find(opt => opt.value === data.ratio);
      const placementName = selectedRatioOption ? `${selectedRatioOption.label} - ${selectedRatioOption.desc}` : data.ratio;

      formData.append('pageName', pageNames[data.targetPage] || data.targetPage);
      formData.append('placementName', placementName);

      return apiClient.put(`/ads/${adId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      setIsNavigating(true);
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['ads-active'] });
      toast.success('Ad updated successfully');
      router.push('/dashboard/ads');
    },
    onError: () => toast.error('Failed to update ad'),
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

  if (isLoading) {
    return <div className="flex h-[200px] items-center justify-center">Loading ad details...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Advertisement</h1>
          <p className="text-muted-foreground">Update the advertisement details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit((data) => updateAd.mutate(data))} className="space-y-6">
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
                    </SelectContent>
                  </Select>
                )}
              />
            </div>


            <Input
              label="Redirect URL (optional)"
              placeholder="https://example.com"
              {...register('redirectUrl')}
              error={errors.redirectUrl?.message}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                {...register('startDate')}
                error={errors.startDate?.message}
              />
              <Input
                label="End Date"
                type="date"
                {...register('endDate')}
                error={errors.endDate?.message}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ad Placement</CardTitle>
            <CardDescription>
              Select the target page and the specific placement where you want this ad to appear.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Target Page</Label>
              <Controller
                name="targetPage"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={(val) => {
                    field.onChange(val);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Homepage</SelectItem>
                      <SelectItem value="news_detail">News Detail Page</SelectItem>
                      <SelectItem value="contact">Contact Page</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.targetPage && (
                <p className="text-sm text-destructive mt-1">{errors.targetPage.message}</p>
              )}
            </div>

            {selectedPage && currentRatioOptions.length > 0 && (
              <div>
                <Label className="mb-4 block">Select Placement Ratio</Label>
                <Controller
                  name="ratio"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {currentRatioOptions.map((option) => {
                        const isOccupied = occupiedRatios.includes(option.value) && option.value !== adData?.data?.ratio;
                        return (
                          <div
                            key={option.value}
                            onClick={() => !isOccupied && field.onChange(option.value)}
                            className={`border-2 rounded-lg p-4 flex flex-col gap-3 transition-colors ${isOccupied
                              ? 'opacity-50 bg-gray-50 cursor-not-allowed border-gray-200'
                              : field.value === option.value
                                ? 'border-primary bg-primary/5 cursor-pointer'
                                : 'border-muted hover:border-primary/50 cursor-pointer'
                              }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-lg">{option.label}</span>
                              <div className="flex items-center gap-2">
                                {isOccupied && <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase">Taken</span>}
                                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{option.ratio}</span>
                              </div>
                            </div>
                            <div className="h-16 flex items-center justify-center w-full bg-slate-50 rounded-md border border-slate-100">
                              <div className={`bg-slate-300 rounded ${option.aspectClass}`}></div>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-sm text-muted-foreground text-center">{option.desc}</span>
                              <span className="text-xs font-medium text-gray-500 mt-1">{option.dimensions}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.ratio && (
                  <p className="text-sm text-destructive mt-2">{errors.ratio.message}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {adType === 'IMAGE' && (
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
            )}

            {adType === 'VIDEO' && (
              <div>
                <Label>Video</Label>
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
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isNavigating || updateAd.isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={isNavigating || updateAd.isPending} leftIcon={<Save className="h-4 w-4" />}>
            Update Ad
          </Button>
        </div>
      </form>
    </div>
  );
}
