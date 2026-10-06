'use client';

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { showToast } from '@/lib/toast-notification';
import { useConfirmModalStore } from '@/store/confirm-modal.store';
import { usePermission } from '@/hooks/usePermission';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { TooltipWrapper } from '@/components/ui/Tooltip';
import { SeoForm } from './SeoForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Modal';
import {
  PageSeoRecord,
  PageType,
  PAGE_TYPE_META,
} from '@/types/seo';
import {
  Edit,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Zap,
  Globe,
  ExternalLink,
  Lock,
  Twitter,
  FolderTree,
  FileText,
  Layers,
  Sparkles,
  ArrowLeft,
  Eye,
  Check,
} from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────
// Environment & Constants
// ─────────────────────────────────────────────────────────

const WEB_URL =
  process.env.NEXT_PUBLIC_WEB_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

function buildPageUrl(record: PageSeoRecord): string {
  if (record.pageType === 'CATEGORY') {
    const slug = record.category?.slug || record.slug.replace(/^category\//, '');
    return `${WEB_URL}/${slug}`;
  }
  return record.slug ? `${WEB_URL}/${record.slug}` : WEB_URL;
}

// ─────────────────────────────────────────────────────────
// SERP & Social Preview Modal
// ─────────────────────────────────────────────────────────

function SerpPreviewModal({
  record,
  isOpen,
  onClose,
}: {
  record: PageSeoRecord;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<'google' | 'og' | 'twitter'>('google');

  const pageUrl = buildPageUrl(record);
  const cleanDisplayUrl = pageUrl.replace(/^https?:\/\//, '');

  const ogTitle = record.ogTitle || record.metaTitle;
  const ogDesc = record.ogDescription || record.metaDescription;
  const twTitle = record.twitterTitle || ogTitle;
  const twDesc = record.twitterDescription || ogDesc;
  const twImg = record.twitterImage || record.ogImage;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent size="lg" className="sm:max-w-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/20">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <DialogTitle className="text-sm font-semibold">
                Preview – {record.label}
              </DialogTitle>
              <Badge variant="outline" className={`text-xs ml-1 ${PAGE_TYPE_META[record.pageType].color}`}>
                {PAGE_TYPE_META[record.pageType].label}
              </Badge>
            </div>
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" /> Live Page
            </a>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b px-6 bg-muted/10">
          {(['google', 'og', 'twitter'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-4 py-3 text-xs font-medium transition-colors border-b-2 -mb-[1px]',
                tab === t
                  ? 'border-primary text-primary font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'og' ? 'Facebook / LinkedIn' : t === 'twitter' ? 'Twitter / X' : 'Google Search'}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="p-6">
          {tab === 'google' && (
            <div className="max-w-xl font-sans bg-background p-4 rounded-xl border border-border shadow-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-4 h-4 rounded-full bg-slate-100 border flex items-center justify-center text-[9px] font-bold text-slate-700">
                  G
                </div>
                <p className="text-[12px] text-[#202124] leading-none truncate">
                  {cleanDisplayUrl}
                </p>
              </div>
              <p className="text-[19px] text-[#1a0dab] dark:text-[#8ab4f8] font-normal leading-tight hover:underline cursor-pointer line-clamp-1">
                {record.metaTitle}
              </p>
              <p className="text-[13px] text-[#4d5156] dark:text-[#bdc1c6] mt-1.5 leading-snug line-clamp-2">
                {record.metaDescription}
              </p>
              <div className="mt-4 pt-3 border-t flex flex-wrap gap-4 text-xs text-muted-foreground">
                <div>
                  <span>Title length: </span>
                  <span className={cn('font-medium', record.metaTitle.length > 60 ? 'text-destructive' : 'text-emerald-600')}>
                    {record.metaTitle.length}/60 chars
                  </span>
                </div>
                <div>
                  <span>Description length: </span>
                  <span className={cn('font-medium', record.metaDescription.length > 155 ? 'text-destructive' : 'text-emerald-600')}>
                    {record.metaDescription.length}/155 chars
                  </span>
                </div>
                <div>
                  <span>Robots: </span>
                  <span className="font-medium font-mono">{record.robots ?? 'index, follow'}</span>
                </div>
              </div>
            </div>
          )}

          {tab === 'og' && (
            <div className="max-w-md mx-auto rounded-xl overflow-hidden border border-[#dddfe2] font-sans bg-white dark:bg-slate-900 shadow-xs">
              {record.ogImage ? (
                <img
                  src={record.ogImage}
                  alt="OG"
                  className="w-full h-44 object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-36 bg-muted/40 flex flex-col items-center justify-center text-muted-foreground gap-1">
                  <Globe className="h-8 w-8 stroke-1" />
                  <span className="text-xs">No OG Image Provided</span>
                </div>
              )}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-border">
                <p className="text-[10px] uppercase text-[#606770] dark:text-slate-400 font-semibold tracking-wider">
                  businessfirstnews.com
                </p>
                <p className="text-sm font-semibold text-[#1d2129] dark:text-slate-100 line-clamp-2 mt-0.5">
                  {ogTitle}
                </p>
                <p className="text-xs text-[#606770] dark:text-slate-400 line-clamp-2 mt-1">
                  {ogDesc}
                </p>
              </div>
            </div>
          )}

          {tab === 'twitter' && (
            <div className="max-w-md mx-auto rounded-2xl overflow-hidden border font-sans bg-background shadow-xs">
              {twImg ? (
                <img
                  src={twImg}
                  alt="Twitter OG"
                  className={cn(
                    'w-full object-cover',
                    record.twitterCard === 'SUMMARY_LARGE_IMAGE' ? 'h-44' : 'h-24'
                  )}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-32 bg-muted/40 flex flex-col items-center justify-center text-muted-foreground gap-1">
                  <Twitter className="h-7 w-7 text-sky-500 stroke-1" />
                  <span className="text-xs">No Twitter Image</span>
                </div>
              )}
              <div className="p-3.5">
                <p className="text-xs text-muted-foreground">businessfirstnews.com</p>
                <p className="text-sm font-semibold line-clamp-1 mt-0.5">{twTitle}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{twDesc}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────
// Main SeoManager Component
// ─────────────────────────────────────────────────────────

type ViewMode = 'list' | 'edit';
type TabKey = 'all' | 'static' | 'categories';

export function SeoManager() {
  const queryClient = useQueryClient();
  const confirmModal = useConfirmModalStore();
  const { hasPermission } = usePermission();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [editRecord, setEditRecord] = useState<PageSeoRecord | null>(null);
  const [previewRecord, setPreviewRecord] = useState<PageSeoRecord | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<PageType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // ── Query SEO records ─────────────────────────────────────
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['page-seo', page, limit, search, typeFilter, statusFilter, activeTab],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(activeTab !== 'all' && { tab: activeTab }),
        ...(activeTab === 'all' && typeFilter !== 'all' && { pageType: typeFilter }),
        ...(statusFilter === 'active' && { isActive: 'true' }),
        ...(statusFilter === 'inactive' && { isActive: 'false' }),
      });
      const res = await apiClient.get(`/seo?${params}`);
      return res.data;
    },
    staleTime: 30_000,
  });

  // Query global counts for KPI summary badges
  const { data: allCountsData } = useQuery({
    queryKey: ['page-seo-counts'],
    queryFn: async () => {
      const res = await apiClient.get('/seo?limit=100');
      const records = (res.data?.data as PageSeoRecord[]) || [];
      const total = res.data?.metadata?.total || records.length;
      const categoriesCount = records.filter((r) => r.pageType === 'CATEGORY').length;
      const staticCount = records.filter((r) => r.pageType !== 'CATEGORY').length;
      const totalArticlesInCategories = records
        .filter((r) => r.pageType === 'CATEGORY')
        .reduce((sum, r) => sum + (r.category?._count?.articles || 0), 0);
      const activeCount = records.filter((r) => r.isActive).length;

      return {
        total,
        categoriesCount,
        staticCount,
        totalArticlesInCategories,
        activeCount,
      };
    },
    staleTime: 60_000,
  });

  // ── Sync categories mutation ──────────────────────────────
  const seedMutation = useMutation({
    mutationFn: () => apiClient.post('/seo/seed-categories'),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['page-seo'] });
      queryClient.invalidateQueries({ queryKey: ['page-seo-counts'] });
      const { created } = res.data?.data || {};
      showToast.success(
        'SEO Sync Complete',
        created > 0
          ? `${created} new category/preset SEO profiles were created.`
          : 'All categories and static pages are already synchronized.'
      );
    },
    onError: (err: any) => {
      showToast.error('Sync failed', err.response?.data?.message || 'Failed to sync categories');
    },
  });

  // ── Handlers ──────────────────────────────────────────────
  const handleSuccess = (record: PageSeoRecord) => {
    queryClient.invalidateQueries({ queryKey: ['page-seo'] });
    queryClient.invalidateQueries({ queryKey: ['page-seo-counts'] });
    showToast.success('SEO updated', `"${record.label}" metadata saved successfully.`);
    setViewMode('list');
    setEditRecord(null);
  };

  const handleEdit = (record: PageSeoRecord) => {
    setEditRecord(record);
    setPreviewRecord(null);
    setViewMode('edit');
  };

  const handlePreviewToggle = (record: PageSeoRecord) => {
    setPreviewRecord(record);
  };

  // ── Columns definition ────────────────────────────────────
  const columns = useMemo(() => {
    return [
      {
        key: 'label',
        header: 'Page & Route',
        cell: (item: PageSeoRecord) => {
          const liveUrl = buildPageUrl(item);
          const isCategory = item.pageType === 'CATEGORY';
          const cleanSlug = isCategory
            ? item.category?.slug || item.slug.replace(/^category\//, '')
            : item.slug;

          return (
            <div className="min-w-0 max-w-xs sm:max-w-sm">
              <div className="flex items-center gap-2">
                {isCategory ? (
                  <FolderTree className="h-4 w-4 text-orange-500 shrink-0" />
                ) : (
                  <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                )}
                <span className="font-semibold text-foreground text-sm truncate">
                  {item.label}
                </span>
                <TooltipWrapper content="Open live page in new tab">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground/60 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TooltipWrapper>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground font-mono truncate">
                  /{cleanSlug || ''}
                </span>
                {isCategory && item.category?._count?.articles !== undefined && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                    {item.category._count.articles} articles
                  </Badge>
                )}
              </div>
            </div>
          );
        },
      },
      {
        key: 'pageType',
        header: 'Type',
        cell: (item: PageSeoRecord) => {
          const meta = PAGE_TYPE_META[item.pageType];
          return (
            <Badge variant="outline" className={`text-xs whitespace-nowrap ${meta.color}`}>
              {meta.label}
            </Badge>
          );
        },
      },
      {
        key: 'metaTitle',
        header: 'Meta Title & Description',
        cell: (item: PageSeoRecord) => {
          const titleLen = item.metaTitle?.length || 0;
          const descLen = item.metaDescription?.length || 0;

          return (
            <div className="max-w-md min-w-[220px]">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-foreground">
                  {item.metaTitle}
                </p>
                <span className={cn('text-[10px] font-mono shrink-0', titleLen > 60 ? 'text-destructive font-bold' : 'text-muted-foreground')}>
                  {titleLen}c
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {item.metaDescription}
              </p>
            </div>
          );
        },
      },
      {
        key: 'robots',
        header: 'Indexing',
        cell: (item: PageSeoRecord) => {
          const isIndex = !item.robots || item.robots.includes('index');
          return (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-mono',
                isIndex
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
              )}
            >
              {item.robots || 'index, follow'}
            </span>
          );
        },
      },
      {
        key: 'isActive',
        header: 'Status',
        cell: (item: PageSeoRecord) =>
          item.isActive ? (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-medium whitespace-nowrap">
              <CheckCircle2 className="h-3.5 w-3.5" /> Active
            </span>
          ) : (
            <span className="flex items-center gap-1 text-muted-foreground text-xs font-medium whitespace-nowrap">
              <XCircle className="h-3.5 w-3.5" /> Inactive
            </span>
          ),
      },
      {
        key: 'updatedAt',
        header: 'Updated',
        cell: (item: PageSeoRecord) => (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDate(item.updatedAt)}
          </span>
        ),
      },
      {
        key: 'actions',
        header: 'Actions',
        className: 'text-right',
        cell: (item: PageSeoRecord) => (
          <div className="flex items-center justify-end gap-1">
            <TooltipWrapper content="Live SERP & Social Preview">
              <Button
                variant={previewRecord?.id === item.id ? 'secondary' : 'ghost'}
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviewToggle(item);
                }}
                className="h-8 w-8"
              >
                <Eye className="h-4 w-4 text-blue-500" />
              </Button>
            </TooltipWrapper>

            {hasPermission('SEO', 'edit') && (
              <TooltipWrapper content="Edit SEO Metadata">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(item);
                  }}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4 text-foreground/80" />
                </Button>
              </TooltipWrapper>
            )}
          </div>
        ),
      },
    ];
  }, [hasPermission, previewRecord]);

  // ── Render: Edit View ─────────────────────────────────────
  if (viewMode === 'edit' && editRecord) {
    const isCategory = editRecord.pageType === 'CATEGORY';

    return (
      <div className="space-y-6">
        {/* Back navigation & header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setViewMode('list');
                setEditRecord(null);
              }}
              className="text-muted-foreground -ml-3 mb-2 hover:text-foreground"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to SEO Management
            </Button>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Edit SEO: {editRecord.label}
              </h1>
              <Badge variant="outline" className={`text-xs ${PAGE_TYPE_META[editRecord.pageType].color}`}>
                {PAGE_TYPE_META[editRecord.pageType].label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Configure search engine metadata, Open Graph sharing cards, and crawler indexing directives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={buildPageUrl(editRecord)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border bg-background hover:bg-muted/50 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5 text-primary" /> View Live Page
            </a>
          </div>
        </div>

        <SeoForm
          defaultValues={editRecord}
          onSuccess={handleSuccess}
          onCancel={() => {
            setViewMode('list');
            setEditRecord(null);
          }}
        />
      </div>
    );
  }

  // ── Render: List View ─────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">SEO Management</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Centralized metadata, canonical routing, and search optimization for all static pages &amp; category listings.
              </p>
            </div>
          </div>
        </div>

        {/* Sync categories button */}
        {hasPermission('SEO', 'edit') && (
          <TooltipWrapper content="Auto-generate SEO records for any newly created categories or missing static pages">
            <Button
              variant="outline"
              onClick={() =>
                confirmModal.open({
                  title: 'Synchronize Category & Static SEO',
                  message:
                    'This scans all active categories in the database and ensures every category listing page has a configured SEO profile with canonical URLs. Existing custom edits will not be overwritten.',
                  confirmText: 'Sync Now',
                  onConfirm: async () => {
                    await seedMutation.mutateAsync();
                  },
                })
              }
              loading={seedMutation.isPending}
              leftIcon={<Zap className="h-4 w-4 text-amber-500" />}
              className="border-primary/20 hover:bg-primary/5"
            >
              Sync Category SEO
            </Button>
          </TooltipWrapper>
        )}
      </div>

      {/* ── KPI Metric Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-card shadow-xs border">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Total Managed Pages</p>
            <Layers className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            {allCountsData?.total ?? data?.metadata?.total ?? '—'}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            All system static &amp; category routes
          </p>
        </Card>

        <Card className="p-4 bg-card shadow-xs border">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Static Pages</p>
            <FileText className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            {allCountsData?.staticCount ?? '—'}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Home, About, Policies, News &amp; Contact
          </p>
        </Card>

        <Card className="p-4 bg-card shadow-xs border">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Category Pages</p>
            <FolderTree className="h-4 w-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            {allCountsData?.categoriesCount ?? '—'}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Covering {allCountsData?.totalArticlesInCategories ?? 'all'} published articles
          </p>
        </Card>

        <Card className="p-4 bg-card shadow-xs border">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Active &amp; Indexable</p>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold mt-2 text-emerald-600">
            {allCountsData?.activeCount ?? '—'}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Search engine index enabled
          </p>
        </Card>
      </div>

      {/* ── SERP Preview Modal ───────────────────────────────── */}
      {previewRecord && (
        <SerpPreviewModal
          record={previewRecord}
          isOpen={!!previewRecord}
          onClose={() => setPreviewRecord(null)}
        />
      )}

      {/* ── Tabs Navigation ─────────────────────────────────── */}
      <div className="flex items-center border-b border-border gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab('all');
            setPage(1);
          }}
          className={cn(
            'flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all',
            activeTab === 'all'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          <Layers className="h-4 w-4" />
          <span>All Pages</span>
          {allCountsData?.total !== undefined && (
            <Badge variant="secondary" className="text-xs py-0 px-1.5 ml-0.5">
              {allCountsData.total}
            </Badge>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('static');
            setPage(1);
          }}
          className={cn(
            'flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all',
            activeTab === 'static'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          <FileText className="h-4 w-4" />
          <span>Static Pages</span>
          {allCountsData?.staticCount !== undefined && (
            <Badge variant="secondary" className="text-xs py-0 px-1.5 ml-0.5">
              {allCountsData.staticCount}
            </Badge>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('categories');
            setPage(1);
          }}
          className={cn(
            'flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all',
            activeTab === 'categories'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          <FolderTree className="h-4 w-4" />
          <span>Category Pages</span>
          {allCountsData?.categoriesCount !== undefined && (
            <Badge variant="secondary" className="text-xs py-0 px-1.5 ml-0.5 bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
              {allCountsData.categoriesCount}
            </Badge>
          )}
        </button>
      </div>

      {/* ── Category Tab Notice Banner ──────────────────────── */}
      {activeTab === 'categories' && (
        <div className="bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40 rounded-xl p-4 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-orange-900 dark:text-orange-200">
              Dynamic Category Pages &amp; Article Lists
            </p>
            <p className="text-orange-800/80 dark:text-orange-300/80 leading-relaxed">
              Every category created in <span className="font-semibold">Categories</span> is dynamically listed here. When a new category is added, its SEO profile is automatically generated with default branding and canonical URLs (`https://businessfirstnews.com/[category]`). Click <span className="font-semibold">Edit</span> on any category to customize meta titles, descriptions, and target keywords for maximum Google rankings.
            </p>
          </div>
        </div>
      )}

      {/* ── Table & Filters ─────────────────────────────────── */}
      <Card className="border shadow-xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-center justify-between w-full">
            <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={
                    activeTab === 'categories'
                      ? 'Search category pages…'
                      : activeTab === 'static'
                      ? 'Search static pages…'
                      : 'Search all pages…'
                  }
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9 h-10"
                />
              </div>

              {/* Status filter */}
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v as any);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-36 h-10">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>

              {/* Page type filter (only shown on 'all' tab) */}
              {activeTab === 'all' && (
                <Select
                  value={typeFilter}
                  onValueChange={(v) => {
                    setTypeFilter(v as PageType | 'all');
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-44 h-10">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Page Types</SelectItem>
                    {(
                      Object.entries(PAGE_TYPE_META) as [
                        PageType,
                        (typeof PAGE_TYPE_META)[PageType],
                      ][]
                    ).map(([type, meta]) => (
                      <SelectItem key={type} value={type}>
                        {meta.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Refresh */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <TooltipWrapper content="Refresh SEO list">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => refetch()}
                  disabled={isLoading || isRefetching}
                  className="h-10 w-10"
                >
                  <RefreshCw
                    className={cn(
                      'h-4 w-4',
                      isRefetching && 'animate-spin text-primary'
                    )}
                  />
                </Button>
              </TooltipWrapper>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <DataTable
            columns={columns}
            data={(data?.data as PageSeoRecord[]) ?? []}
            total={data?.metadata?.total ?? 0}
            page={page}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
            isLoading={isLoading || isRefetching}
            onRowClick={(item: PageSeoRecord) =>
              hasPermission('SEO', 'edit') ? handleEdit(item) : undefined
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
