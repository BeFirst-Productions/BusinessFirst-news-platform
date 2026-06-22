'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { showToast } from '@/lib/toast-notification';
import { useConfirmModalStore } from '@/store/confirm-modal.store';
import { usePermission } from '@/hooks/usePermission';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
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
  X,
  Lock,
  Twitter,
} from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────
// Environment
// ─────────────────────────────────────────────────────────

const WEB_URL =
  process.env.NEXT_PUBLIC_WEB_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

// ─────────────────────────────────────────────────────────
// Helper: build the live page URL from a slug
// ─────────────────────────────────────────────────────────

function buildPageUrl(slug: string): string {
  return slug ? `${WEB_URL}/${slug}` : WEB_URL;
}

// ─────────────────────────────────────────────────────────
// SERP Preview Panel
// ─────────────────────────────────────────────────────────

function SerpPreviewPanel({
  record,
  isOpen,
  onClose,
}: {
  record: PageSeoRecord;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<'google' | 'og' | 'twitter'>('google');

  const displayUrl = record.canonicalUrl
    ? record.canonicalUrl.replace(/^https?:\/\//, '')
    : `businessfirst.com${record.slug ? '/' + record.slug : ''}`;

  const ogTitle    = record.ogTitle    ?? record.metaTitle;
  const ogDesc     = record.ogDescription ?? record.metaDescription;
  const twTitle    = record.twitterTitle ?? ogTitle;
  const twDesc     = record.twitterDescription ?? ogDesc;
  const twImg      = record.twitterImage ?? record.ogImage;
  const pageUrl    = buildPageUrl(record.slug);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent size="lg" className="sm:max-w-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <DialogTitle className="text-sm font-semibold">Preview – {record.label}</DialogTitle>
            <Badge variant="outline" className={`text-xs ${PAGE_TYPE_META[record.pageType].color}`}>
              {PAGE_TYPE_META[record.pageType].label}
            </Badge>
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline ml-auto mr-6"
            >
              <ExternalLink className="h-3 w-3" /> Open Page
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
                'px-4 py-3 text-xs font-medium transition-colors capitalize border-b-2 -mb-[1px]',
                tab === t
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'og' ? 'Open Graph' : t === 'twitter' ? 'Twitter / X' : 'Google SERP'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Google SERP preview */}
          {tab === 'google' && (
            <div className="max-w-xl font-sans">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-muted border flex items-center justify-center text-[9px] font-bold text-muted-foreground">G</div>
                <p className="text-[13px] text-[#202124] leading-none">{displayUrl}</p>
              </div>
              <p className="text-[20px] text-[#1a0dab] font-normal leading-tight hover:underline cursor-default line-clamp-1">
                {record.metaTitle}
              </p>
              <p className="text-sm text-[#4d5156] mt-1 leading-snug line-clamp-2">
                {record.metaDescription}
              </p>
              <div className="mt-3 pt-3 border-t flex flex-wrap gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Title length: </span>
                  <span className={cn('font-medium', record.metaTitle.length > 60 ? 'text-destructive' : record.metaTitle.length < 30 ? 'text-yellow-600' : 'text-green-600')}>
                    {record.metaTitle.length}/60 chars
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Desc length: </span>
                  <span className={cn('font-medium', record.metaDescription.length > 155 ? 'text-destructive' : record.metaDescription.length < 70 ? 'text-yellow-600' : 'text-green-600')}>
                    {record.metaDescription.length}/155 chars
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Robots: </span>
                  <span className="font-medium font-mono">{record.robots ?? 'index, follow'}</span>
                </div>
              </div>
            </div>
          )}

          {/* OG (Facebook / LinkedIn) preview */}
          {tab === 'og' && (
            <div className="max-w-md mx-auto rounded-lg overflow-hidden border border-[#dddfe2] font-sans bg-[#f2f3f5]">
              {record.ogImage ? (
                <img
                  src={record.ogImage}
                  alt="OG"
                  className="w-full h-48 object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-40 bg-muted flex items-center justify-center">
                  <Globe className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
              <div className="px-3 py-2 bg-[#f2f3f5]">
                <p className="text-[10px] uppercase text-[#606770] tracking-wide">
                  {displayUrl.split('/')[0]}
                </p>
                <p className="text-sm font-semibold text-[#1d2129] line-clamp-2 mt-0.5">{ogTitle}</p>
                <p className="text-xs text-[#606770] line-clamp-2 mt-0.5">{ogDesc}</p>
              </div>
            </div>
          )}

          {/* Twitter card preview */}
          {tab === 'twitter' && (
            <div className="max-w-md mx-auto rounded-2xl overflow-hidden border font-sans bg-background">
              {twImg ? (
                <img
                  src={twImg}
                  alt="Twitter OG"
                  className={cn(
                    'w-full object-cover',
                    record.twitterCard === 'SUMMARY_LARGE_IMAGE' ? 'h-48' : 'h-24'
                  )}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-36 bg-muted flex items-center justify-center">
                  <Twitter className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="px-3 py-2">
                <p className="text-sm font-semibold line-clamp-1">{twTitle}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{twDesc}</p>
                <p className="text-xs text-muted-foreground mt-1">{displayUrl.split('/')[0]}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────
// Main SeoManager component
// ─────────────────────────────────────────────────────────

type ViewMode = 'list' | 'edit';

export function SeoManager() {
  const queryClient   = useQueryClient();
  const confirmModal  = useConfirmModalStore();
  const { hasPermission } = usePermission();

  const [viewMode, setViewMode]         = useState<ViewMode>('list');
  const [editRecord, setEditRecord]     = useState<PageSeoRecord | null>(null);
  const [previewRecord, setPreviewRecord] = useState<PageSeoRecord | null>(null);
  const [page, setPage]                 = useState(1);
  const [limit, setLimit]               = useState(15);
  const [search, setSearch]             = useState('');
  const [typeFilter, setTypeFilter]     = useState<PageType | 'all'>('all');

  // ── Data query ───────────────────────────────────────────

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['page-seo', page, limit, search, typeFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page:  page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(typeFilter !== 'all' && { pageType: typeFilter }),
      });
      const res = await apiClient.get(`/seo?${params}`);
      return res.data;
    },
    staleTime: 30_000,
  });

  // ── Seed categories mutation ─────────────────────────────

  const seedMutation = useMutation({
    mutationFn: () => apiClient.post('/seo/seed-categories'),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['page-seo'] });
      const { created } = res.data.data;
      showToast.success(
        'Categories synced',
        created > 0
          ? `${created} new category SEO records created.`
          : 'All categories already have SEO records.'
      );
    },
    onError: (err: any) => {
      showToast.error('Sync failed', err.response?.data?.message ?? 'Unknown error');
    },
  });

  // ── Handlers ─────────────────────────────────────────────

  const handleSuccess = (record: PageSeoRecord) => {
    queryClient.invalidateQueries({ queryKey: ['page-seo'] });
    showToast.success('SEO updated', `"${record.label}" has been updated.`);
    setViewMode('list');
    setEditRecord(null);
  };

  const handleEdit = (record: PageSeoRecord) => {
    setEditRecord(record);
    setPreviewRecord(null);
    setViewMode('edit');
  };

  const handlePreviewToggle = (record: PageSeoRecord) => {
    setPreviewRecord((prev) => (prev?.id === record.id ? null : record));
  };

  // ── Table columns ────────────────────────────────────────

  const columns = [
    {
      key: 'label',
      header: 'Page',
      cell: (item: PageSeoRecord) => (
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium truncate">{item.label}</p>
            <TooltipWrapper content="Open live page">
              <a
                href={buildPageUrl(item.slug)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </TooltipWrapper>
          </div>
          <p className="text-xs text-muted-foreground font-mono truncate">
            /{item.slug || ''}
          </p>
        </div>
      ),
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
      header: 'Meta Title / Description',
      cell: (item: PageSeoRecord) => (
        <div className="max-w-xs">
          <p className="truncate text-sm font-medium">{item.metaTitle}</p>
          <p className="text-xs text-muted-foreground truncate">{item.metaDescription}</p>
        </div>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      cell: (item: PageSeoRecord) =>
        item.isActive ? (
          <span className="flex items-center gap-1 text-green-600 text-xs font-medium whitespace-nowrap">
            <CheckCircle2 className="h-4 w-4" /> Active
          </span>
        ) : (
          <span className="flex items-center gap-1 text-muted-foreground text-xs font-medium whitespace-nowrap">
            <XCircle className="h-4 w-4" /> Inactive
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
          {/* SERP / OG / Twitter preview toggle */}
          <TooltipWrapper content="Preview (SERP / OG / Twitter)">
            <Button
              variant={previewRecord?.id === item.id ? 'secondary' : 'ghost'}
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePreviewToggle(item);
              }}
            >
              <Globe className="h-4 w-4 text-blue-500" />
            </Button>
          </TooltipWrapper>

          {/* Edit */}
          {hasPermission('SEO', 'edit') && (
            <TooltipWrapper content="Edit SEO">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(item);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipWrapper>
          )}
        </div>
      ),
    },
  ];

  // ── Render: Edit view ────────────────────────────────────

  if (viewMode === 'edit' && editRecord) {
    return (
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setViewMode('list'); setEditRecord(null); }}
                className="text-muted-foreground -ml-3"
              >
                ← Back to list
              </Button>
            </div>
            <h1 className="text-3xl font-bold">Edit SEO – {editRecord.label}</h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-muted-foreground text-sm font-mono">/{editRecord.slug || ''}</p>
              <Badge variant="outline" className={`text-xs ${PAGE_TYPE_META[editRecord.pageType].color}`}>
                {PAGE_TYPE_META[editRecord.pageType].label}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Slug &amp; type are read-only
              </span>
            </div>
          </div>
          <a
            href={buildPageUrl(editRecord.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" /> Open live page
          </a>
        </div>

        <SeoForm
          defaultValues={editRecord}
          onSuccess={handleSuccess}
          onCancel={() => { setViewMode('list'); setEditRecord(null); }}
        />
      </div>
    );
  }

  // ── Render: List view ────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">SEO Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage search-engine metadata for each website page.{' '}
            <span className="text-muted-foreground/70">
              Each page always has exactly one SEO record. Article SEO is
              handled separately during article creation.
            </span>
          </p>
        </div>

        {/* Sync categories button */}
        {hasPermission('SEO', 'edit') && (
          <TooltipWrapper content="Auto-create SEO records for newly added categories that don't have one yet">
            <Button
              variant="outline"
              onClick={() =>
                confirmModal.open({
                  title: 'Sync Category SEO',
                  message:
                    'This will create default SEO records for any active categories that do not yet have one. Existing records will not be changed.',
                  confirmText: 'Sync',
                  onConfirm: async () => { await seedMutation.mutateAsync(); },
                })
              }
              loading={seedMutation.isPending}
              leftIcon={<Zap className="h-4 w-4" />}
            >
              Sync Category Pages
            </Button>
          </TooltipWrapper>
        )}
      </div>

      {/* SERP / OG / Twitter preview panel (modal) */}
      {previewRecord && (
        <SerpPreviewPanel
          record={previewRecord}
          isOpen={!!previewRecord}
          onClose={() => setPreviewRecord(null)}
        />
      )}

      {/* Filter bar + table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap w-full">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9"
              />
            </div>

            {/* Type filter */}
            <Select
              value={typeFilter}
              onValueChange={(v) => { setTypeFilter(v as PageType | 'all'); setPage(1); }}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Page Types</SelectItem>
                {(Object.entries(PAGE_TYPE_META) as [PageType, typeof PAGE_TYPE_META[PageType]][]).map(
                  ([type, meta]) => (
                    <SelectItem key={type} value={type}>
                      {meta.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            {/* Refresh */}
            <TooltipWrapper content="Refresh">
              <Button
                variant="outline"
                size="icon"
                onClick={() => refetch()}
                disabled={isLoading || isRefetching}
                className="h-10 w-10"
              >
                <RefreshCw className={cn('h-4 w-4', isRefetching && 'animate-spin text-primary')} />
              </Button>
            </TooltipWrapper>
          </div>
        </CardHeader>

        <CardContent>
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
