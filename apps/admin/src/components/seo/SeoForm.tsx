'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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
import { TooltipWrapper } from '@/components/ui/Tooltip';
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
  HelpCircle,
  ExternalLink,
  Sparkles,
  RotateCcw,
  Eye,
  FolderTree,
  FileText,
  Search,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ──────────────────────────────────────────────────────────
// Form types
// ──────────────────────────────────────────────────────────

type FormValues = CreatePageSeoDto & {
  keywords: string;
  extraMeta: ExtraMetaItem[];
};

interface SeoFormProps {
  /** Existing record to edit */
  defaultValues: PageSeoRecord;
  /** Called after successful submit */
  onSuccess: (record: PageSeoRecord) => void;
  /** Called when user cancels */
  onCancel: () => void;
}

const WEB_URL =
  process.env.NEXT_PUBLIC_WEB_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

// ──────────────────────────────────────────────────────────
// Section Accordion Component
// ──────────────────────────────────────────────────────────

function Section({
  title,
  icon,
  badge,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="border border-border/80 shadow-sm overflow-hidden">
      <CardHeader
        className="cursor-pointer select-none flex flex-row items-center justify-between py-3.5 px-5 bg-muted/20 hover:bg-muted/40 transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-2.5 font-semibold text-sm">
          <div className="p-1 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <span>{title}</span>
          {badge}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </CardHeader>
      {open && <CardContent className="pt-4 pb-5 px-5 space-y-4">{children}</CardContent>}
    </Card>
  );
}

// ──────────────────────────────────────────────────────────
// Enhanced Field with Tooltip & Help
// ──────────────────────────────────────────────────────────

function Field({
  label,
  tooltip,
  hint,
  error,
  required,
  children,
  suffix,
}: {
  label: string;
  tooltip: string;
  hint?: React.ReactNode;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <label className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
          <TooltipWrapper content={<div className="max-w-xs text-xs leading-relaxed">{tooltip}</div>}>
            <button
              type="button"
              className="text-muted-foreground/70 hover:text-primary transition-colors focus:outline-none"
            >
              <HelpCircle className="h-3.5 w-3.5" />
            </button>
          </TooltipWrapper>
        </div>
        {suffix}
      </div>
      {children}
      {hint && !error && <div className="text-xs text-muted-foreground">{hint}</div>}
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive font-medium">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Visual SEO Character Health Bar
// ──────────────────────────────────────────────────────────

function SeoHealthCounter({
  value,
  idealRange,
  maxRecommend,
  label,
}: {
  value: string;
  idealRange: [number, number];
  maxRecommend: number;
  label: string;
}) {
  const len = value?.length ?? 0;

  let status: 'short' | 'optimal' | 'acceptable' | 'too-long' = 'optimal';
  let badgeText = 'Optimal';
  let badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300';
  let barColor = 'bg-emerald-500';

  if (len === 0) {
    status = 'short';
    badgeText = 'Empty';
    badgeColor = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    barColor = 'bg-slate-300 dark:bg-slate-700';
  } else if (len < idealRange[0]) {
    status = 'short';
    badgeText = 'Too Short';
    badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300';
    barColor = 'bg-amber-500';
  } else if (len <= idealRange[1]) {
    status = 'optimal';
    badgeText = 'Optimal for Google';
    badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300';
    barColor = 'bg-emerald-500';
  } else if (len <= maxRecommend) {
    status = 'acceptable';
    badgeText = 'Acceptable (May clip on mobile)';
    badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300';
    barColor = 'bg-blue-500';
  } else {
    status = 'too-long';
    badgeText = 'Truncated by Google (Too long)';
    badgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300';
    barColor = 'bg-rose-500';
  }

  const percentage = Math.min(100, Math.round((len / maxRecommend) * 100));

  return (
    <div className="flex items-center gap-2">
      <span className={cn('text-xs font-mono font-medium', len > maxRecommend ? 'text-destructive font-bold' : 'text-muted-foreground')}>
        {len}/{maxRecommend} chars
      </span>
      <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full', badgeColor)}>
        {badgeText}
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Main SEO Form Component
// ──────────────────────────────────────────────────────────

export function SeoForm({ defaultValues, onSuccess, onCancel }: SeoFormProps) {
  const isCategory = defaultValues.pageType === 'CATEGORY';
  const categorySlug = defaultValues.category?.slug || defaultValues.slug.replace(/^category\//, '');
  const cleanSlug = isCategory ? categorySlug : defaultValues.slug;
  const liveUrl = cleanSlug ? `${WEB_URL}/${cleanSlug}` : WEB_URL;

  // Extract initial keywords from extraMeta
  const initialKeywords =
    (defaultValues?.extraMeta as ExtraMetaItem[])?.find(
      (m) => m.name.toLowerCase() === 'keywords'
    )?.content ?? '';

  // Extract non-keyword extra meta items
  const nonKeywordExtraMeta =
    (defaultValues?.extraMeta as ExtraMetaItem[])?.filter(
      (m) => m.name.toLowerCase() !== 'keywords'
    ) ?? [];

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      slug: defaultValues?.slug ?? '',
      label: defaultValues?.label ?? '',
      pageType: (defaultValues?.pageType as PageType) ?? 'CUSTOM',
      categoryId: defaultValues?.categoryId ?? null,
      metaTitle: defaultValues?.metaTitle ?? '',
      metaDescription: defaultValues?.metaDescription ?? '',
      keywords: initialKeywords,
      canonicalUrl: defaultValues?.canonicalUrl ?? '',
      ogTitle: defaultValues?.ogTitle ?? '',
      ogDescription: defaultValues?.ogDescription ?? '',
      ogImage: defaultValues?.ogImage ?? '',
      twitterCard: (defaultValues?.twitterCard as TwitterCard) ?? 'SUMMARY_LARGE_IMAGE',
      twitterTitle: defaultValues?.twitterTitle ?? '',
      twitterDescription: defaultValues?.twitterDescription ?? '',
      twitterImage: defaultValues?.twitterImage ?? '',
      robots: defaultValues?.robots ?? 'index, follow',
      extraMeta: nonKeywordExtraMeta,
      isActive: defaultValues?.isActive ?? true,
    },
  });

  const {
    fields: extraMetaFields,
    append: appendMeta,
    remove: removeMeta,
  } = useFieldArray({
    control,
    name: 'extraMeta',
  });

  const metaTitle = watch('metaTitle') ?? '';
  const metaDescription = watch('metaDescription') ?? '';
  const canonicalUrl = watch('canonicalUrl') ?? '';
  const ogTitle = watch('ogTitle') ?? '';
  const ogDescription = watch('ogDescription') ?? '';
  const ogImage = watch('ogImage') ?? '';
  const twitterCard = watch('twitterCard') ?? 'SUMMARY_LARGE_IMAGE';
  const twitterTitle = watch('twitterTitle') ?? '';
  const twitterDescription = watch('twitterDescription') ?? '';
  const twitterImage = watch('twitterImage') ?? '';
  const robots = watch('robots') ?? 'index, follow';

  // Live SERP Preview State inside Form
  const [serpTab, setSerpTab] = useState<'google' | 'og' | 'twitter'>('google');

  // One-click reset to recommended category SEO
  const handleResetCategoryDefaults = () => {
    if (!defaultValues.category) return;
    const catName = defaultValues.category.name;
    const catSlug = defaultValues.category.slug;

    setValue('metaTitle', `${catName} – Latest News & Updates | BusinessFirst`);
    setValue(
      'metaDescription',
      `Read the latest ${catName} news, in-depth analysis, market updates, and insights from BusinessFirst.`
    );
    setValue('canonicalUrl', `https://businessfirstnews.com/${catSlug}`);
    setValue(
      'keywords',
      `${catName}, ${catName} news, UAE ${catName}, latest ${catName} updates, BusinessFirst`
    );
    setValue('robots', 'index, follow');
  };

  // Submit handler
  const onSubmit = async (values: FormValues) => {
    try {
      // Build final extraMeta array: merge custom items + keywords entry
      const finalExtraMeta: ExtraMetaItem[] = [];

      if (values.keywords?.trim()) {
        finalExtraMeta.push({
          name: 'keywords',
          content: values.keywords.trim(),
        });
      }

      if (values.extraMeta && values.extraMeta.length > 0) {
        values.extraMeta.forEach((item) => {
          if (item.name?.trim() && item.content?.trim()) {
            finalExtraMeta.push({
              name: item.name.trim(),
              content: item.content.trim(),
            });
          }
        });
      }

      const payload: UpdatePageSeoDto = {
        label: values.label,
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        canonicalUrl: values.canonicalUrl?.trim() || null,
        ogTitle: values.ogTitle?.trim() || null,
        ogDescription: values.ogDescription?.trim() || null,
        ogImage: values.ogImage?.trim() || null,
        twitterCard: values.twitterCard,
        twitterTitle: values.twitterTitle?.trim() || null,
        twitterDescription: values.twitterDescription?.trim() || null,
        twitterImage: values.twitterImage?.trim() || null,
        robots: values.robots?.trim() || null,
        extraMeta: finalExtraMeta.length > 0 ? finalExtraMeta : null,
        isActive: values.isActive,
      };

      const res = await apiClient.put(`/seo/${defaultValues.id}`, payload);
      onSuccess(res.data.data as PageSeoRecord);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ── Category Banner (if editing a category) ────────── */}
      {isCategory && (
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/20 rounded-xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500 text-white mt-0.5">
                <FolderTree className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-base text-foreground">
                    Category: {defaultValues.category?.name || defaultValues.label}
                  </h3>
                  <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                    Category Page
                  </Badge>
                  {defaultValues.category?._count?.articles !== undefined && (
                    <Badge variant="secondary" className="text-xs">
                      {defaultValues.category._count.articles} Articles Linked
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This SEO profile dynamically powers the category listing page on the website.
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-mono text-muted-foreground">
                  <span>URL: /{categorySlug}</span>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline font-sans"
                  >
                    <ExternalLink className="h-3 w-3" /> View Category Live
                  </a>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetCategoryDefaults}
              className="text-xs shrink-0 self-start sm:self-center border-orange-200 hover:bg-orange-50"
              leftIcon={<Sparkles className="h-3.5 w-3.5 text-orange-600" />}
            >
              Fill Recommended SEO
            </Button>
          </div>
        </div>
      )}

      {/* ── Real-Time Live SERP Preview Card ────────────────── */}
      <Card className="border border-primary/20 bg-muted/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-background/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Live Search & Social Preview</h3>
            <span className="text-xs text-muted-foreground">(Updates in real time)</span>
          </div>

          <div className="flex items-center bg-muted/60 p-1 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setSerpTab('google')}
              className={cn(
                'px-3 py-1 rounded-md font-medium transition-all',
                serpTab === 'google' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Google Search
            </button>
            <button
              type="button"
              onClick={() => setSerpTab('og')}
              className={cn(
                'px-3 py-1 rounded-md font-medium transition-all',
                serpTab === 'og' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Facebook / LinkedIn
            </button>
            <button
              type="button"
              onClick={() => setSerpTab('twitter')}
              className={cn(
                'px-3 py-1 rounded-md font-medium transition-all',
                serpTab === 'twitter' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Twitter / X
            </button>
          </div>
        </div>

        <div className="p-5">
          {serpTab === 'google' && (
            <div className="max-w-xl font-sans bg-background p-4 rounded-xl border border-border shadow-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-4 h-4 rounded-full bg-slate-100 border flex items-center justify-center text-[9px] font-bold text-slate-700">
                  G
                </div>
                <div className="text-[12px] text-[#202124] leading-tight truncate">
                  <span>businessfirstnews.com</span>
                  <span className="text-muted-foreground"> &gt; {cleanSlug || 'home'}</span>
                </div>
              </div>
              <h4 className="text-[19px] text-[#1a0dab] dark:text-[#8ab4f8] font-normal leading-tight hover:underline cursor-pointer line-clamp-1">
                {metaTitle || 'Page Title will appear here | BusinessFirst'}
              </h4>
              <p className="text-[13px] text-[#4d5156] dark:text-[#bdc1c6] mt-1.5 leading-snug line-clamp-2">
                {metaDescription ||
                  'Your meta description will appear here. Provide a concise, engaging summary to encourage clicks from search results.'}
              </p>
            </div>
          )}

          {serpTab === 'og' && (
            <div className="max-w-md mx-auto rounded-xl overflow-hidden border border-[#dddfe2] font-sans bg-white dark:bg-slate-900 shadow-xs">
              {ogImage ? (
                <img
                  src={ogImage}
                  alt="OG"
                  className="w-full h-44 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-36 bg-muted/50 flex flex-col items-center justify-center text-muted-foreground gap-1">
                  <Globe className="h-8 w-8 stroke-1" />
                  <span className="text-xs">No OG Image specified (uses default)</span>
                </div>
              )}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-border">
                <p className="text-[10px] uppercase text-[#606770] dark:text-slate-400 font-semibold tracking-wider">
                  businessfirstnews.com
                </p>
                <p className="text-sm font-semibold text-[#1d2129] dark:text-slate-100 line-clamp-2 mt-0.5">
                  {ogTitle || metaTitle || 'Open Graph Title'}
                </p>
                <p className="text-xs text-[#606770] dark:text-slate-400 line-clamp-2 mt-1">
                  {ogDescription || metaDescription || 'Open Graph description snippet for social shares.'}
                </p>
              </div>
            </div>
          )}

          {serpTab === 'twitter' && (
            <div className="max-w-md mx-auto rounded-2xl overflow-hidden border font-sans bg-background shadow-xs">
              {twitterImage || ogImage ? (
                <img
                  src={twitterImage || ogImage}
                  alt="Twitter Card"
                  className={cn(
                    'w-full object-cover',
                    twitterCard === 'SUMMARY_LARGE_IMAGE' ? 'h-44' : 'h-24'
                  )}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-32 bg-muted/50 flex flex-col items-center justify-center text-muted-foreground gap-1">
                  <Twitter className="h-7 w-7 text-sky-500 stroke-1" />
                  <span className="text-xs">No Twitter image specified</span>
                </div>
              )}
              <div className="p-3.5">
                <p className="text-xs text-muted-foreground">businessfirstnews.com</p>
                <p className="text-sm font-semibold line-clamp-1 mt-0.5">
                  {twitterTitle || ogTitle || metaTitle || 'Twitter Post Title'}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {twitterDescription || ogDescription || metaDescription || 'Twitter post description summary.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* ── 1. Page Configuration ────────────────────────────── */}
      <Section
        title="Page Identification & Status"
        icon={<Info className="h-4 w-4" />}
        badge={
          <Badge variant="outline" className={`text-xs ml-2 ${PAGE_TYPE_META[defaultValues.pageType].color}`}>
            {PAGE_TYPE_META[defaultValues.pageType].label}
          </Badge>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Internal Page Label"
            required
            tooltip="Descriptive name used inside the admin panel to identify this page. Does not appear on the public website."
            error={errors.label?.message}
            hint="Identifies the page inside the admin dashboard"
          >
            <Input
              {...register('label', { required: 'Label is required' })}
              placeholder="e.g. Home Page or Banking & Finance"
              className={errors.label ? 'border-destructive' : ''}
            />
          </Field>

          <Field
            label="Live Page Slug / Path"
            tooltip="The permanent URL slug route for this page on the website. Managed automatically by the system to avoid broken URLs."
            hint="Read-only system route identifier"
          >
            <div className="flex items-center justify-between h-10 px-3 rounded-md border border-input bg-muted/40 font-mono text-sm text-muted-foreground">
              <span>/{cleanSlug || ''}</span>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs flex items-center gap-1 font-sans"
              >
                <ExternalLink className="h-3 w-3" /> Visit
              </a>
            </div>
          </Field>
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-3 pt-1">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="seo-isActive"
                checked={field.value}
                onChange={field.onChange}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
              />
            )}
          />
          <label htmlFor="seo-isActive" className="text-sm cursor-pointer select-none">
            <span className="font-medium text-foreground">SEO Enabled</span>
            <span className="text-muted-foreground text-xs block">
              When checked, this page injects custom metadata tags into the website &lt;head&gt;. If disabled, defaults are used.
            </span>
          </label>
        </div>
      </Section>

      {/* ── 2. Primary Search Engine Meta ─────────────────────── */}
      <Section
        title="Primary Search Engine Metadata (SERP)"
        icon={<Globe className="h-4 w-4" />}
        badge={<span className="text-xs text-muted-foreground font-normal ml-2">Google, Bing, Yahoo</span>}
      >
        <Field
          label="Meta Title"
          required
          tooltip="The single most crucial on-page SEO element. Displayed as the blue headline in search results and the browser tab. Best practice: 50–60 characters. Place high-value keywords near the beginning and end with '| BusinessFirst'."
          error={errors.metaTitle?.message}
          suffix={
            <SeoHealthCounter
              value={metaTitle}
              idealRange={[50, 60]}
              maxRecommend={60}
              label="Title"
            />
          }
          hint="Standard search limit: 50–60 characters"
        >
          <Input
            {...register('metaTitle', {
              required: 'Meta title is required',
              maxLength: { value: 100, message: 'Max 100 characters allowed' },
            })}
            placeholder="e.g. Banking & Finance News UAE | BusinessFirst"
            className={errors.metaTitle ? 'border-destructive' : ''}
          />
        </Field>

        <Field
          label="Meta Description"
          required
          tooltip="The summary snippet shown beneath your title in Google search results. While not a direct ranking factor, a persuasive description significantly increases search Click-Through Rate (CTR). Best practice: 120–155 characters."
          error={errors.metaDescription?.message}
          suffix={
            <SeoHealthCounter
              value={metaDescription}
              idealRange={[120, 155]}
              maxRecommend={155}
              label="Description"
            />
          }
          hint="Standard snippet limit: 120–155 characters"
        >
          <textarea
            {...register('metaDescription', {
              required: 'Meta description is required',
              maxLength: { value: 300, message: 'Max 300 characters allowed' },
            })}
            rows={3}
            placeholder="Write an informative, compelling description of the page's contents..."
            className={cn(
              'w-full rounded-md border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background',
              errors.metaDescription ? 'border-destructive' : 'border-input'
            )}
          />
        </Field>

        {/* Dedicated Keywords Input */}
        <Field
          label="Target Keywords"
          tooltip="Comma-separated target keywords and phrases for search engines, internal indexing, news aggregators, and RSS feeds. (e.g. 'UAE business news, Dubai economy, investment updates')."
          hint="Comma-separated keyword phrases (e.g. UAE banking, Dubai financial markets, fintech)"
        >
          <Input
            {...register('keywords')}
            placeholder="e.g. UAE news, Dubai business, banking and finance, market analysis"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Canonical URL"
            tooltip="Specifies the authoritative, preferred URL version of this page to prevent duplicate content penalties across search engines (e.g. https://businessfirstnews.com/banking-finance)."
            error={errors.canonicalUrl?.message}
            hint="Self-referencing canonical URL (must include https://)"
          >
            <Input
              {...register('canonicalUrl')}
              placeholder={`https://businessfirstnews.com/${cleanSlug}`}
              type="url"
            />
          </Field>

          <Field
            label="Robots Directive"
            tooltip="Directs web crawlers how to index this page and follow outbound links. Standard for public pages is 'index, follow'. Use 'index, nofollow' or 'noindex, follow' for policy or administrative pages."
            hint="Search crawler indexing instruction"
          >
            <Input
              {...register('robots')}
              placeholder="index, follow"
            />
            {/* Quick-pick robot pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[
                { label: 'index, follow (Standard)', value: 'index, follow' },
                { label: 'index, nofollow (Policies)', value: 'index, nofollow' },
                { label: 'noindex, follow (Internal)', value: 'noindex, follow' },
                { label: 'noindex, nofollow (Hidden)', value: 'noindex, nofollow' },
              ].map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setValue('robots', p.value)}
                  className={cn(
                    'text-[11px] px-2 py-0.5 rounded border transition-colors',
                    robots === p.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted/50 hover:bg-muted text-muted-foreground border-border'
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </Section>

      {/* ── 3. Open Graph (Social Sharing) ──────────────────── */}
      <Section
        title="Open Graph Metadata (Facebook, LinkedIn, WhatsApp)"
        icon={<Globe className="h-4 w-4 text-blue-600" />}
        defaultOpen={false}
      >
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-primary shrink-0" />
          Fields left blank will automatically inherit values from Meta Title &amp; Description above.
        </p>

        <Field
          label="OG Title"
          tooltip="Title displayed when shared on social networks like Facebook, LinkedIn, WhatsApp, and Slack. Inherits Meta Title if left blank."
        >
          <Input {...register('ogTitle')} placeholder={metaTitle || 'Inherits Meta Title'} />
        </Field>

        <Field
          label="OG Description"
          tooltip="Summary text displayed inside social media link preview cards. Inherits Meta Description if left blank."
        >
          <textarea
            {...register('ogDescription')}
            rows={2}
            placeholder={metaDescription || 'Inherits Meta Description'}
            className="w-full rounded-md border border-input px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
          />
        </Field>

        <Field
          label="OG Image URL"
          tooltip="The high-resolution banner image shown when the link is shared. Optimal dimensions: 1200 x 630 pixels (1.91:1 ratio). Recommended file format: WebP, JPEG, or PNG."
          hint="Recommended: 1200 × 630 px (1.91:1 ratio)"
        >
          <Input {...register('ogImage')} placeholder="https://..." type="url" />
        </Field>
      </Section>

      {/* ── 4. Twitter / X Cards ────────────────────────────── */}
      <Section
        title="Twitter / X Card Optimization"
        icon={<Twitter className="h-4 w-4 text-sky-500" />}
        defaultOpen={false}
      >
        <Field
          label="Twitter Card Type"
          tooltip="'Summary with Large Image' produces an eye-catching full-width card with high click engagement. 'Summary' displays a small square thumbnail."
        >
          <Controller
            name="twitterCard"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full sm:w-[280px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUMMARY_LARGE_IMAGE">Summary with Large Image (Recommended)</SelectItem>
                  <SelectItem value="SUMMARY">Compact Summary Card</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          label="Twitter Title"
          tooltip="Custom title specifically for Twitter/X cards. If blank, inherits OG Title or Meta Title."
        >
          <Input {...register('twitterTitle')} placeholder="Inherits OG / Meta Title" />
        </Field>

        <Field
          label="Twitter Description"
          tooltip="Custom description specifically for Twitter/X cards. If blank, inherits OG Description or Meta Description."
        >
          <textarea
            {...register('twitterDescription')}
            rows={2}
            placeholder="Inherits OG / Meta Description"
            className="w-full rounded-md border border-input px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
          />
        </Field>

        <Field
          label="Twitter Image URL"
          tooltip="Custom image for Twitter/X cards. Optimal size for large image card is 1200 x 628 px. If empty, falls back to the OG Image."
          hint="Recommended: 1200 × 628 px"
        >
          <Input {...register('twitterImage')} placeholder="https://..." type="url" />
        </Field>
      </Section>

      {/* ── 5. Extra Custom Meta Tags ───────────────────────── */}
      <Section
        title="Additional Meta Tags & Custom Directives"
        icon={<Plus className="h-4 w-4 text-muted-foreground" />}
        defaultOpen={false}
      >
        <p className="text-xs text-muted-foreground">
          Inject arbitrary HTML <code>&lt;meta name=&quot;...&quot; content=&quot;...&quot;&gt;</code> tags for specialized services, author credits, or geographic geo-targeting.
        </p>

        <div className="space-y-2.5">
          {extraMetaFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 items-center">
              <Input
                {...register(`extraMeta.${idx}.name`)}
                placeholder="Meta name (e.g. author, geo.region)"
                className="flex-1"
              />
              <Input
                {...register(`extraMeta.${idx}.content`)}
                placeholder="Meta content (e.g. BusinessFirst Team, AE-DU)"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeMeta(idx)}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendMeta({ name: '', content: '' })}
            className="w-full border-dashed"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add Custom Meta Tag
          </Button>
        </div>
      </Section>

      {/* ── Action Buttons ─────────────────────────────────── */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel &amp; Return
        </Button>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            loading={isSubmitting}
            leftIcon={<Check className="h-4 w-4" />}
          >
            Save SEO Changes
          </Button>
        </div>
      </div>
    </form>
  );
}
