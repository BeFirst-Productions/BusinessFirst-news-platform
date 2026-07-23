'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  Save,
  Send,
  Image as ImageIcon,
  Globe,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'in', 'on', 'at', 'for', 'with', 'to', 'of', 'by', 'from',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'it', 'its', 'this', 'that', 'these', 'those',
  'as', 'into', 'onto', 'your', 'my', 'their', 'her', 'his', 'our', 'us', 'them', 'about', 'above',
  'after', 'again', 'against', 'all', 'am', 'any', 'because', 'before', 'below', 'between', 'both',
  'during', 'each', 'few', 'further', 'had', 'has', 'have', 'having', 'how', 'if', 'once', 'only',
  'other', 'ought', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'some',
  'such', 'than', 'then', 'through', 'too', 'under', 'until', 'up', 'very', 'what', 'when',
  'where', 'which', 'while', 'who', 'whom', 'why', 'would', 'you', 'yours', 'yourself', 'yourselves'
]);

export function generateSeoSlug(title: string): string {
  let slug = title.toLowerCase();
  slug = slug.replace(/[^a-z0-9\s-]/g, ''); // Keep only alphanumeric, spaces, and hyphens (removes punctuation/underscores)
  slug = slug.replace(/[\s-]+/g, ' '); // Normalize spaces and hyphens to spaces
  
  const words = slug.trim().split(' ');
  const filteredWords = words.filter(word => word && !STOP_WORDS.has(word));
  
  const finalWords = filteredWords.length > 0 ? filteredWords : words.filter(Boolean);
  const truncatedWords = finalWords.slice(0, 8); // Keep max 8 words for SEO focus
  
  return truncatedWords.join('-');
}

const articleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(300),
  categoryId: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  scheduledAt: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isBreakingNews: z.boolean().default(false),
  isTopHeadline: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  isUaeNews: z.boolean().default(false),
  isSponsored: z.boolean().default(false),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
  metaKeywords: z.string().optional().nullable(),
  featuredImage: z.string().optional().nullable(),
  featuredImageTitle: z.string().optional().nullable(),
}).superRefine((data, ctx) => {
  if (data.status === 'PUBLISHED') {
    if (!data.metaTitle || data.metaTitle.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Meta Title is required for publishing',
        path: ['metaTitle'],
      });
    }
    if (!data.metaDescription || data.metaDescription.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Meta Description is required for publishing',
        path: ['metaDescription'],
      });
    }
    if (!data.featuredImage || data.featuredImage.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Featured Image is required for publishing',
        path: ['featuredImage'],
      });
    }
  }
});

export type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  initialData?: any;
  onSubmit: (data: ArticleFormData & { content: string }) => Promise<void>;
  isSubmitting?: boolean;
}

const formatDateTimeLocal = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

export function ArticleForm({ initialData, onSubmit, isSubmitting = false }: ArticleFormProps) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isSlugCustomized, setIsSlugCustomized] = useState(() => !!initialData?.slug);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      categoryId: initialData?.categoryId || (initialData?.category?.id) || '',
      status: initialData?.status || 'DRAFT',
      scheduledAt: formatDateTimeLocal(initialData?.scheduledAt),
      isFeatured: !!initialData?.isFeatured,
      isBreakingNews: !!initialData?.isBreakingNews,
      isTopHeadline: !!initialData?.isTopHeadline,
      isTrending: !!initialData?.isTrending,
      isUaeNews: !!initialData?.isUaeNews,
      isSponsored: !!initialData?.isSponsored,
      metaTitle: initialData?.metaTitle || '',
      metaDescription: initialData?.metaDescription || '',
      metaKeywords: initialData?.metaKeywords || '',
      featuredImage: initialData?.featuredImage || '',
      featuredImageTitle: initialData?.featuredImageTitle || '',
      tags: initialData?.tags?.map((t: any) => typeof t === 'string' ? t : t.id) || [],
    },
  });

  const status = watch('status');
  const featuredImage = watch('featuredImage');
  const title = watch('title');
  const categoryId = watch('categoryId');
  const slug = watch('slug');

  // Fetch categories using standardized apiClient
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get('/categories');
      return response.data.data;
    },
  });

  const selectedCategory = categoriesData?.find((c: any) => c.id === categoryId);
  const categorySlug = selectedCategory?.slug || '';

  useEffect(() => {
    if (initialData) {
      if (initialData.slug) {
        setIsSlugCustomized(true);
      }
      reset({
        title: initialData.title || '',
        slug: initialData.slug || '',
        excerpt: initialData.excerpt || '',
        categoryId: initialData.categoryId || (initialData.category?.id) || '',
        status: initialData.status || 'DRAFT',
        scheduledAt: formatDateTimeLocal(initialData.scheduledAt),
        isFeatured: !!initialData.isFeatured,
        isBreakingNews: !!initialData.isBreakingNews,
        isTopHeadline: !!initialData.isTopHeadline,
        isTrending: !!initialData.isTrending,
        isUaeNews: !!initialData.isUaeNews,
        isSponsored: !!initialData.isSponsored,
        metaTitle: initialData.metaTitle || '',
        metaDescription: initialData.metaDescription || '',
        metaKeywords: initialData.metaKeywords || '',
        featuredImage: initialData.featuredImage || '',
        featuredImageTitle: initialData.featuredImageTitle || '',
        tags: initialData.tags?.map((t: any) => typeof t === 'string' ? t : t.id) || [],
      });
      if (initialData.content) {
        setContent(initialData.content);
      }
    }
  }, [initialData, reset]);

  // Dynamic real-time SEO slug generator (Only for NEW articles when slug is not customized)
  useEffect(() => {
    if (!initialData && !isSlugCustomized) {
      if (title) {
        const generatedSlug = generateSeoSlug(title);
        setValue('slug', generatedSlug, { shouldValidate: true });
      } else {
        setValue('slug', '', { shouldValidate: true });
      }
    }
  }, [title, isSlugCustomized, initialData, setValue]);



  // Fetch tags using standardized apiClient
  const { data: tagsData } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await apiClient.get('/tags');
      return response.data.data;
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageTitle = watch('featuredImageTitle');
    if (!imageTitle || imageTitle.trim() === '') {
      toast.error('Please enter a Featured Image Title first to optimize the filename for SEO.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('files', file);

      const response = await apiClient.post(`/media/upload?customName=${encodeURIComponent(imageTitle.trim())}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.data?.[0]?.url) {
        setValue('featuredImage', response.data.data[0].url);
        toast.success('Image uploaded successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Featured image upload error:', error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFormSubmit = async (formData: ArticleFormData) => {
    if (!content || content === '<p></p>') {
      toast.error('Content is required');
      return;
    }
    // Clean scheduledAt if status is not SCHEDULED
    const submissionData = {
      ...formData,
      content,
      scheduledAt: null,
    };
    await onSubmit(submissionData);
  };

  const handleSaveDraft = async () => {
    setValue('status', 'DRAFT');
    await handleSubmit(handleFormSubmit)();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard/articles')}
            className="h-9 w-9 rounded-full border"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {initialData ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {initialData ? 'Update article content and settings' : 'Write and publish a new article'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {initialData?.status !== 'PUBLISHED' && (
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              leftIcon={<Save className="h-4 w-4" />}
              className="flex-1 sm:flex-none"
            >
              Save Draft
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            leftIcon={<Send className="h-4 w-4" />}
            className="flex-1 sm:flex-none"
          >
            {initialData ? 'Update Article' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & SEO URL */}
          <Card>
            <CardContent className="pt-6 space-y-5">
              <Input
                label="Article Title"
                placeholder="Enter article title"
                {...register('title')}
                error={errors.title?.message}
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="slug" className="text-sm font-semibold text-foreground">Article URL Slug</Label>
                  <button
                    type="button"
                    onClick={() => {
                      const newCustomized = !isSlugCustomized;
                      setIsSlugCustomized(newCustomized);
                      if (!newCustomized) {
                        setValue('slug', generateSeoSlug(title || ''), { shouldValidate: true });
                      }
                    }}
                    className="text-xs text-primary hover:underline font-semibold focus:outline-none focus:ring-0"
                  >
                    {isSlugCustomized ? 'Auto-generate from title' : 'Customize URL'}
                  </button>
                </div>
                
                <div className="relative flex items-stretch shadow-sm rounded-lg border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
                  <div className="flex items-center bg-muted/50 px-3 border-r text-sm text-muted-foreground select-none font-medium whitespace-nowrap">
                    <span>Domain Name/</span>
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ml-1.5 transition-all duration-300",
                      categorySlug 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "bg-amber-100 text-amber-800 border border-amber-200 animate-pulse"
                    )}>
                      {categorySlug || 'category-name'}
                    </span>
                    <span className="ml-1.5">/</span>
                  </div>
                  <input
                    id="slug"
                    type="text"
                    className={cn(
                      "flex-1 bg-transparent px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:text-muted-foreground/60 font-mono tracking-tight",
                      errors.slug && "text-destructive font-semibold"
                    )}
                    disabled={!isSlugCustomized}
                    placeholder="article-url-slug"
                    {...register('slug')}
                  />
                </div>
                {errors.slug && (
                  <p className="text-sm text-destructive mt-1 font-semibold">{errors.slug.message}</p>
                )}

                {/* Google Search Snippet Preview Widget */}
                <div className="mt-4 p-4 rounded-xl border border-border/85 bg-muted/20 space-y-2.5 shadow-sm transition-all hover:bg-muted/30">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border-b pb-1.5 font-medium">
                    <Globe className="h-3.5 w-3.5 text-primary" />
                    <span>Dynamic Search Engine Snippet Preview</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-emerald-700 dark:text-emerald-500 font-medium truncate flex items-center gap-1">
                      <span>https://businessfirst.ae</span>
                      <span className="text-gray-400">›</span>
                      <span className={cn(
                        "font-semibold",
                        categorySlug ? "text-emerald-800 dark:text-emerald-400" : "text-amber-700 dark:text-amber-500 italic"
                      )}>
                        {categorySlug || 'category-name'}
                      </span>
                      <span className="text-gray-400">›</span>
                      <span className="truncate text-gray-600 dark:text-gray-400">{slug || 'article-url-slug'}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-blue-800 hover:underline cursor-pointer dark:text-blue-400 leading-tight">
                      {watch('metaTitle') || watch('title') || 'Article Title Preview'}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {watch('metaDescription') || 'Please enter a meta description under the SEO tab to see how this article will describe itself in search engines.'}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <strong>Premium URL Builder:</strong> The URL automatically updates to include the active category slug above to build a hierarchy structure. Make sure you select a category under the <em>Category & Tags</em> sidebar panel.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Editor Tabs */}
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b px-6 pt-4">
                <TabsList>
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="seo"
                    className={cn(
                      'flex items-center gap-2',
                      (errors.metaTitle || errors.metaDescription) && 'text-destructive border-destructive'
                    )}
                  >
                    <Globe className="h-4 w-4" />
                    SEO
                    {(errors.metaTitle || errors.metaDescription) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="content" className="p-0">
                <TipTapEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing your article..."
                  minHeight="500px"
                />
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 p-6">
                <Input
                  label="Meta Title"
                  placeholder="SEO title (defaults to article title)"
                  {...register('metaTitle')}
                  error={errors.metaTitle?.message}
                />
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Meta Description
                  </label>
                  <textarea
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                    placeholder="Brief description for search engines (max 160 characters)"
                    maxLength={160}
                    {...register('metaDescription')}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {watch('metaDescription')?.length || 0}/160 characters
                  </p>
                  {errors.metaDescription && (
                    <p className="text-sm text-destructive mt-1">{errors.metaDescription.message}</p>
                  )}
                </div>
                <Input
                  label="Meta Keywords"
                  placeholder="Comma-separated keywords"
                  {...register('metaKeywords')}
                />
              </TabsContent>
            </Tabs>
          </Card>

          {/* Excerpt */}
          <Card>
            <CardContent className="pt-6">
              <label className="block text-sm font-medium mb-1.5">
                Excerpt
              </label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                placeholder="Brief description of the article"
                {...register('excerpt')}
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      key={`status-${initialData?.id || 'new'}-${field.value}`}
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={initialData?.status === 'PUBLISHED'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Category & Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Category & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Category *</Label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      key={`category-${initialData?.id || 'new'}-${field.value}`}
                      value={field.value || ''}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData?.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categoryId && (
                  <p className="text-sm text-destructive mt-1">{errors.categoryId.message}</p>
                )}
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tagsData?.map((tag: any) => {
                    const currentTags = watch('tags') || [];
                    const isChecked = currentTags.includes(tag.id);
                    return (
                      <label
                        key={tag.id}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm cursor-pointer hover:bg-accent transition-colors ${isChecked ? 'bg-primary/10 border-primary text-primary' : ''
                          }`}
                      >
                        <input
                          type="checkbox"
                          value={tag.id}
                          checked={isChecked}
                          className="rounded"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setValue('tags', [...currentTags, tag.id]);
                            } else {
                              setValue('tags', currentTags.filter((t) => t !== tag.id));
                            }
                          }}
                        />
                        {tag.name}
                      </label>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Choose Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Top Headlines</Label>
                <Controller
                  name="isTopHeadline"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Trending News</Label>
                <Controller
                  name="isTrending"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>UAE News</Label>
                <Controller
                  name="isUaeNews"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Sponsered Contents</Label>
                <Controller
                  name="isSponsored"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              {featuredImage ? (
                <div className="relative group rounded-lg overflow-hidden border">
                  <img
                    src={featuredImage}
                    alt="Featured Image Preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="text-white border-white hover:bg-white/20"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                    >
                      Change
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setValue('featuredImage', null)}
                      disabled={isUploadingImage}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors flex flex-col items-center justify-center min-h-[192px]"
                >
                  {isUploadingImage ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground font-medium">Click to upload featured image</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              )}
              {errors.featuredImage && (
                <p className="text-sm text-destructive mt-2">{errors.featuredImage.message}</p>
              )}
              <div className="mt-4">
                <Input
                  label="Featured Image Title (for SEO)"
                  placeholder="Enter title first, then click to upload"
                  {...register('featuredImageTitle')}
                  error={errors.featuredImageTitle?.message}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
