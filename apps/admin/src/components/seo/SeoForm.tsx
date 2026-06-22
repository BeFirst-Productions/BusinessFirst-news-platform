'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  PageSeoRecord,
  CreatePageSeoDto,
  UpdatePageSeoDto,
  PageType,
  TwitterCard,
  PAGE_TYPE_META,
  ExtraMetaItem,
} from '@/types/seo';
import {
  Globe,
  Twitter,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Info,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

// ──────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────

type FormValues = CreatePageSeoDto & {
  extraMeta: ExtraMetaItem[];
};

interface SeoFormProps {
  /** Existing record to pre-fill – always required (edit-only form) */
  defaultValues: PageSeoRecord;
  /** Called after successful submit */
  onSuccess: (record: PageSeoRecord) => void;
  /** Called when user cancels */
  onCancel: () => void;
}

// ──────────────────────────────────────────────────────────
// Character-count indicator helper
// ──────────────────────────────────────────────────────────

function CharCount({
  value,
  max,
  ideal,
}: {
  value: string;
  max: number;
  ideal: [number, number];
}) {
  const len = value?.length ?? 0;
  const color =
    len === 0 ? 'text-muted-foreground'
    : len < ideal[0] ? 'text-yellow-500'
    : len <= ideal[1] ? 'text-green-600'
    : 'text-destructive';

  return (
    <span className={`text-xs ${color}`}>
      {len}/{max}
      {len >= ideal[0] && len <= ideal[1] && (
        <CheckCircle2 className="inline h-3 w-3 ml-1 text-green-600" />
      )}
    </span>
  );
}

// ──────────────────────────────────────────────────────────
// Section collapse wrapper
// ──────────────────────────────────────────────────────────

function Section({
  title,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card>
      <CardHeader
        className="cursor-pointer select-none flex flex-row items-center justify-between py-3 px-4"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-2 font-semibold text-sm">
          {icon}
          {title}
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      {open && <CardContent className="pt-0 pb-4 px-4 space-y-4">{children}</CardContent>}
    </Card>
  );
}

// ──────────────────────────────────────────────────────────
// Field wrapper
// ──────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  error,
  required,
  children,
  suffix,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        {suffix}
      </div>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────

export function SeoForm({ defaultValues, onSuccess, onCancel }: SeoFormProps) {

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      slug:              defaultValues?.slug ?? '',
      label:             defaultValues?.label ?? '',
      pageType:          (defaultValues?.pageType as PageType) ?? 'CUSTOM',
      categoryId:        defaultValues?.categoryId ?? null,
      metaTitle:         defaultValues?.metaTitle ?? '',
      metaDescription:   defaultValues?.metaDescription ?? '',
      canonicalUrl:      defaultValues?.canonicalUrl ?? '',
      ogTitle:           defaultValues?.ogTitle ?? '',
      ogDescription:     defaultValues?.ogDescription ?? '',
      ogImage:           defaultValues?.ogImage ?? '',
      twitterCard:       (defaultValues?.twitterCard as TwitterCard) ?? 'SUMMARY_LARGE_IMAGE',
      twitterTitle:      defaultValues?.twitterTitle ?? '',
      twitterDescription:defaultValues?.twitterDescription ?? '',
      twitterImage:      defaultValues?.twitterImage ?? '',
      robots:            defaultValues?.robots ?? 'index, follow',
      extraMeta:         (defaultValues?.extraMeta as ExtraMetaItem[]) ?? [],
      isActive:          defaultValues?.isActive ?? true,
    },
  });

  const { fields: extraMetaFields, append: appendMeta, remove: removeMeta } = useFieldArray({
    control,
    name: 'extraMeta',
  });

  const pageType = watch('pageType') as PageType;
  const metaTitle = watch('metaTitle') ?? '';
  const metaDescription = watch('metaDescription') ?? '';
  const ogTitle = watch('ogTitle') ?? '';
  const ogDescription = watch('ogDescription') ?? '';

  // Auto-fill OG/Twitter fields from primary meta if empty
  useEffect(() => {
    if (!watch('ogTitle') && metaTitle) setValue('ogTitle', metaTitle);
    if (!watch('ogDescription') && metaDescription) setValue('ogDescription', metaDescription);
  }, [metaTitle, metaDescription]); // eslint-disable-line

  // Fetch categories for the CATEGORY pageType selector
  const { data: categoriesData } = useQuery({
    queryKey: ['categories-for-seo'],
    queryFn: async () => {
      const res = await apiClient.get('/categories');
      return res.data.data as { id: string; name: string; slug: string }[];
    },
    enabled: pageType === 'CATEGORY',
    staleTime: 5 * 60_000,
  });

  // ── Submit ────────────────────────────────────────────────

  const onSubmit = async (values: FormValues) => {
    try {
      const payload: UpdatePageSeoDto = {
        label:              values.label,
        metaTitle:          values.metaTitle,
        metaDescription:    values.metaDescription,
        canonicalUrl:       values.canonicalUrl || null,
        ogTitle:            values.ogTitle || null,
        ogDescription:      values.ogDescription || null,
        ogImage:            values.ogImage || null,
        twitterCard:        values.twitterCard,
        twitterTitle:       values.twitterTitle || null,
        twitterDescription: values.twitterDescription || null,
        twitterImage:       values.twitterImage || null,
        robots:             values.robots || null,
        extraMeta:          values.extraMeta?.length ? values.extraMeta : null,
        isActive:           values.isActive,
      };

      const res = await apiClient.put(`/seo/${defaultValues.id}`, payload);
      onSuccess(res.data.data as PageSeoRecord);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* General Settings */}
      <Section title="General Information" icon={<Info className="h-4 w-4 text-primary" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Page type – read-only in edit mode */}
          <Field label="Page Type">
            <div className="flex items-center gap-2 h-10 px-3 rounded-md border border-input bg-muted/50">
              <Badge variant="outline" className={`text-xs ${PAGE_TYPE_META[defaultValues.pageType].color}`}>
                {PAGE_TYPE_META[defaultValues.pageType].label}
              </Badge>
              <span className="text-sm text-muted-foreground">{PAGE_TYPE_META[defaultValues.pageType].description}</span>
            </div>
          </Field>

          {/* Label */}
          <Field label="Label" required error={errors.label?.message} hint="Human-readable name shown in the admin list">
            <Input
              {...register('label', { required: 'Label is required' })}
              placeholder="e.g. Home Page"
              className={errors.label ? 'border-destructive' : ''}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Slug – always read-only */}
          <Field label="Slug" hint="Read-only – set at page creation time">
            <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted/50 font-mono text-sm text-muted-foreground">
              /{defaultValues.slug || ''}
            </div>
          </Field>

          {/* Category relation display if pageType is CATEGORY */}
          {defaultValues.pageType === 'CATEGORY' && (
            <Field label="Linked Category">
              <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted/50 text-sm text-muted-foreground font-semibold">
                {defaultValues.category?.name || 'Unknown Category'}
              </div>
            </Field>
          )}
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-3">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="seo-isActive"
                checked={field.value}
                onChange={field.onChange}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
            )}
          />
          <label htmlFor="seo-isActive" className="text-sm cursor-pointer">
            Active (page will receive SEO tags on the website)
          </label>
        </div>
      </Section>

      {/* ── Core SEO ──────────────────────────────────────── */}
      <Section title="Search Engine Tags" icon={<Globe className="h-4 w-4 text-primary" />}>
        <Field
          label="Meta Title"
          required
          error={errors.metaTitle?.message}
          suffix={<CharCount value={metaTitle} max={70} ideal={[50, 60]} />}
          hint="Ideal: 50–60 characters"
        >
          <Input
            {...register('metaTitle', { required: 'Meta title is required', maxLength: { value: 70, message: 'Max 70 characters' } })}
            placeholder="Page title for search engines"
            className={errors.metaTitle ? 'border-destructive' : ''}
          />
        </Field>

        <Field
          label="Meta Description"
          required
          error={errors.metaDescription?.message}
          suffix={<CharCount value={metaDescription} max={160} ideal={[120, 155]} />}
          hint="Ideal: 120–155 characters"
        >
          <textarea
            {...register('metaDescription', {
              required: 'Meta description is required',
              maxLength: { value: 160, message: 'Max 160 characters' },
            })}
            rows={3}
            placeholder="Brief description for search engine results"
            className={`w-full rounded-md border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring ${errors.metaDescription ? 'border-destructive' : 'border-input'}`}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Canonical URL" hint="Leave empty to use page URL" error={errors.canonicalUrl?.message}>
            <Input
              {...register('canonicalUrl')}
              placeholder="https://example.com/page"
              type="url"
            />
          </Field>

          <Field label="Robots Directive" hint='e.g. "index, follow" or "noindex, nofollow"'>
            <Input
              {...register('robots')}
              placeholder="index, follow"
            />
          </Field>
        </div>
      </Section>

      {/* ── Open Graph ────────────────────────────────────── */}
      <Section title="Open Graph (Facebook / LinkedIn)" icon={<Globe className="h-4 w-4 text-blue-600" />} defaultOpen={false}>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" />
          Leave blank to inherit from Meta Title / Description above.
        </p>

        <Field label="OG Title" suffix={<CharCount value={ogTitle} max={70} ideal={[50, 60]} />}>
          <Input {...register('ogTitle')} placeholder="Inherits Meta Title" />
        </Field>

        <Field label="OG Description" suffix={<CharCount value={ogDescription} max={200} ideal={[120, 160]} />}>
          <textarea
            {...register('ogDescription')}
            rows={2}
            placeholder="Inherits Meta Description"
            className="w-full rounded-md border border-input px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </Field>

        <Field label="OG Image URL" hint="Recommended: 1200×630 px">
          <Input {...register('ogImage')} placeholder="https://..." type="url" />
        </Field>
      </Section>

      {/* ── Twitter Card ──────────────────────────────────── */}
      <Section title="Twitter / X Card" icon={<Twitter className="h-4 w-4 text-sky-500" />} defaultOpen={false}>
        <Field label="Card Type">
          <Controller
            name="twitterCard"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUMMARY">Summary</SelectItem>
                  <SelectItem value="SUMMARY_LARGE_IMAGE">Summary with Large Image</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field label="Twitter Title">
          <Input {...register('twitterTitle')} placeholder="Inherits OG / Meta Title" />
        </Field>

        <Field label="Twitter Description">
          <textarea
            {...register('twitterDescription')}
            rows={2}
            placeholder="Inherits OG / Meta Description"
            className="w-full rounded-md border border-input px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </Field>

        <Field label="Twitter Image URL" hint="Recommended: 1200×628 px">
          <Input {...register('twitterImage')} placeholder="https://..." type="url" />
        </Field>
      </Section>

      {/* ── Extra Meta Tags ───────────────────────────────── */}
      <Section title="Extra Meta Tags" icon={<Plus className="h-4 w-4 text-muted-foreground" />} defaultOpen={false}>
        <p className="text-xs text-muted-foreground">
          Add custom <code>&lt;meta name=&quot;...&quot; content=&quot;...&quot;&gt;</code> tags.
        </p>
        <div className="space-y-2">
          {extraMetaFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 items-center">
              <Input
                {...register(`extraMeta.${idx}.name`)}
                placeholder="name (e.g. author)"
                className="flex-1"
              />
              <Input
                {...register(`extraMeta.${idx}.content`)}
                placeholder="content"
                className="flex-1"
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeMeta(idx)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendMeta({ name: '', content: '' })}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Meta Tag
          </Button>
        </div>
      </Section>

      {/* ── Actions ───────────────────────────────────────── */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
