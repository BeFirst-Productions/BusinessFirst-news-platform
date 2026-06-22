'use client';

import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Label } from '@/components/ui/Label';
import {
  Mail,
  Users,
  UserCheck,
  UserMinus,
  Send,
  Trash2,
  Download,
  RefreshCw,
  Search,
  Eye,
  EyeOff,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  AlertCircle,
  Sparkles,
  TrendingUp,
  FileText,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
}

interface SubscriberStats {
  total: number;
  active: number;
  unsubscribed: number;
}

interface Campaign {
  id: string;
  subject: string;
  status: 'DRAFT' | 'SENDING' | 'SENT' | 'FAILED';
  sentCount: number;
  failedCount: number;
  sentBy: string | null;
  sentAt: string | null;
  createdAt: string;
}

interface PaginatedResponse<T> {
  data: T[];
  metadata: { total: number; page: number; limit: number; totalPages: number };
}

// ─────────────────────────────────────────────────────────────────────────────
// Email Template Presets
// ─────────────────────────────────────────────────────────────────────────────

const EMAIL_TEMPLATES = [
  {
    id: 'announcement',
    label: 'Announcement',
    icon: '📢',
    content: `<h2>Important Announcement</h2>
<p>We have some exciting news to share with you today.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<div class="cta-block"><a href="#" class="cta-btn">Read Full Story →</a></div>
<hr class="email-divider" />
<p style="font-size:13px;color:#64748b;">Thank you for being a valued subscriber.</p>`,
  },
  {
    id: 'weekly-digest',
    label: 'Weekly Digest',
    icon: '📰',
    content: `<h2>This Week in Business</h2>
<p>Here's a roundup of the biggest stories from this week:</p>
<h3>📈 Markets & Economy</h3>
<p>Global markets continued their upward trend this week as investors remained optimistic about...</p>
<h3>🚀 Startup Spotlight</h3>
<p>This week's featured startup is disrupting the fintech space with their innovative...</p>
<h3>💡 Analysis & Insight</h3>
<p>Our expert analysis of the latest trends shaping the business landscape...</p>
<div class="cta-block"><a href="#" class="cta-btn">Read All Stories →</a></div>`,
  },
  {
    id: 'breaking-news',
    label: 'Breaking News',
    icon: '🔴',
    content: `<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px;">
  <p style="color:#b91c1c;font-weight:700;font-size:13px;margin-bottom:4px;">⚡ BREAKING NEWS</p>
  <p style="color:#7f1d1d;font-size:13px;margin:0;">Developing story — updates will follow</p>
</div>
<h2>Headline Goes Here</h2>
<p>Add your breaking news content here. Keep it concise and factual.</p>
<p>Include key details: who, what, when, where, and why.</p>
<div class="cta-block"><a href="#" class="cta-btn">Full Coverage →</a></div>`,
  },
  {
    id: 'promotion',
    label: 'Promotion',
    icon: '🎉',
    content: `<div style="text-align:center;padding:24px 0;">
  <p style="font-size:40px;margin-bottom:8px">🎉</p>
  <h2 style="font-size:28px;">Special Offer Inside</h2>
  <p style="color:#64748b;">Available for a limited time only</p>
</div>
<p>We're excited to bring you an exclusive offer as a valued subscriber.</p>
<blockquote>Use code <strong>SUBSCRIBER20</strong> for 20% off your next purchase.</blockquote>
<div class="cta-block"><a href="#" class="cta-btn">Claim Your Offer →</a></div>
<p style="font-size:12px;color:#94a3b8;text-align:center;">Offer expires in 48 hours. Terms and conditions apply.</p>`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Campaign Status Badge
// ─────────────────────────────────────────────────────────────────────────────

function CampaignStatusBadge({ status }: { status: Campaign['status'] }) {
  const config = {
    DRAFT: { label: 'Draft', variant: 'secondary' as const, dot: 'bg-slate-400' },
    SENDING: { label: 'Sending...', variant: 'warning' as const, dot: 'bg-amber-400 animate-pulse' },
    SENT: { label: 'Sent', variant: 'success' as const, dot: 'bg-emerald-400' },
    FAILED: { label: 'Failed', variant: 'destructive' as const, dot: 'bg-red-400' },
  };
  const { label, variant, dot } = config[status] ?? config.DRAFT;
  return (
    <Badge variant={variant} className="flex items-center gap-1.5">
      <span className={cn('w-1.5 h-1.5 rounded-full', dot)} />
      {label}
    </Badge>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Compose Campaign Modal
// ─────────────────────────────────────────────────────────────────────────────

interface ComposeCampaignProps {
  activeCount: number;
  onClose: () => void;
  onSuccess: () => void;
}

function ComposeCampaign({ activeCount, onClose, onSuccess }: ComposeCampaignProps) {
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState(EMAIL_TEMPLATES[0]?.content ?? '');
  const [selectedTemplate, setSelectedTemplate] = useState('announcement');
  const [previewMode, setPreviewMode] = useState(false);

  const sendMutation = useMutation({
    mutationFn: (payload: { subject: string; htmlContent: string }) =>
      apiClient.post('/newsletter/campaigns/send', payload),
    onSuccess: () => {
      toast.success('Campaign is being sent!');
      onSuccess();
      onClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? 'Failed to send campaign');
    },
  });

  const saveMutation = useMutation({
    mutationFn: (payload: { subject: string; htmlContent: string }) =>
      apiClient.post('/newsletter/campaigns', payload),
    onSuccess: () => {
      toast.success('Campaign saved as draft');
      onSuccess();
      onClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? 'Failed to save campaign');
    },
  });

  const handleTemplateSelect = (templateId: string) => {
    const tpl = EMAIL_TEMPLATES.find((t) => t.id === templateId);
    if (tpl) {
      setSelectedTemplate(templateId);
      setHtmlContent(tpl.content);
    }
  };

  const isValid = subject.trim().length > 0 && htmlContent.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-background border rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Send className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Compose Campaign</h2>
              <p className="text-xs text-muted-foreground">
                Will be sent to{' '}
                <span className="font-semibold text-foreground">{activeCount.toLocaleString()}</span>{' '}
                active subscribers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Subject */}
          <Input
            label="Subject Line"
            placeholder="e.g. This Week in Business — June 2025"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="text-sm"
          />

          {/* Template Selector */}
          <div className="space-y-2">
            <Label>Email Template</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {EMAIL_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleTemplateSelect(tpl.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all',
                    selectedTemplate === tpl.id
                      ? 'border-primary bg-primary/5 text-primary shadow-sm'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50 text-muted-foreground'
                  )}
                >
                  <span className="text-2xl">{tpl.icon}</span>
                  <span>{tpl.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Editor / Preview Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Email Content (HTML)</Label>
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
              >
                {previewMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {previewMode ? 'Edit HTML' : 'Preview'}
              </button>
            </div>

            {previewMode ? (
              <div
                className="border rounded-xl p-6 bg-slate-50 dark:bg-slate-900 min-h-[320px] prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            ) : (
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                rows={14}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-y"
                placeholder="<h2>Your Newsletter Content</h2>..."
              />
            )}
          </div>

          {/* Info Box */}
          <div className="flex gap-2.5 p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              An <strong>unsubscribe link</strong> is automatically appended to every email. HTML
              in the content area will be wrapped in a professional responsive email template.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 px-6 py-4 border-t flex-shrink-0 bg-muted/20">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto order-last sm:order-first">
            Cancel
          </Button>
          <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
            <Button
              variant="outline"
              onClick={() => saveMutation.mutate({ subject, htmlContent })}
              loading={saveMutation.isPending}
              disabled={!isValid}
              className="flex-1 sm:flex-none"
            >
              <FileText className="h-4 w-4 mr-1.5" />
              Save Draft
            </Button>
            <Button
              onClick={() => sendMutation.mutate({ subject, htmlContent })}
              loading={sendMutation.isPending}
              disabled={!isValid || activeCount === 0}
              className="flex-1 sm:flex-none"
            >
              <Send className="h-4 w-4 mr-1.5" />
              Send to {activeCount.toLocaleString()} Subscribers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function NewsletterPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns'>('subscribers');

  // Subscribers state
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [subscriberPage, setSubscriberPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Campaign state
  const [campaignPage, setCampaignPage] = useState(1);
  const [showCompose, setShowCompose] = useState(false);

  // Debounce search
  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setSubscriberPage(1);
    const t = setTimeout(() => setDebouncedSearch(val), 400);
    return () => clearTimeout(t);
  }, []);

  // ── Queries ──────────────────────────────────────────────────────────────

  const { data: stats } = useQuery<SubscriberStats>({
    queryKey: ['newsletter-stats'],
    queryFn: async () => {
      const res = await apiClient.get('/newsletter/subscribers/stats');
      return res.data.data;
    },
  });

  const { data: subscribersRes, isLoading: subLoading, refetch: refetchSubs } = useQuery<PaginatedResponse<Subscriber>>({
    queryKey: ['newsletter-subscribers', subscriberPage, debouncedSearch, isActiveFilter],
    queryFn: async () => {
      const params: Record<string, string | number> = {
        page: subscriberPage,
        limit: 25,
      };
      if (debouncedSearch) params['search'] = debouncedSearch;
      if (isActiveFilter === 'active') params['isActive'] = 'true';
      if (isActiveFilter === 'inactive') params['isActive'] = 'false';
      const res = await apiClient.get('/newsletter/subscribers', { params });
      return { data: res.data.data, metadata: res.data.metadata };
    },
  });

  const { data: campaignsRes, isLoading: campLoading, refetch: refetchCampaigns } = useQuery<PaginatedResponse<Campaign>>({
    queryKey: ['newsletter-campaigns', campaignPage],
    queryFn: async () => {
      const res = await apiClient.get('/newsletter/campaigns', {
        params: { page: campaignPage, limit: 10 },
      });
      return { data: res.data.data, metadata: res.data.metadata };
    },
  });

  // ── Mutations ────────────────────────────────────────────────────────────

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/newsletter/subscribers/${id}`),
    onSuccess: () => {
      toast.success('Subscriber deleted');
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
      queryClient.invalidateQueries({ queryKey: ['newsletter-stats'] });
    },
    onError: () => toast.error('Failed to delete subscriber'),
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => apiClient.post('/newsletter/subscribers/bulk-delete', { ids }),
    onSuccess: (_, ids) => {
      toast.success(`${ids.length} subscriber(s) deleted`);
      setSelectedIds(new Set());
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
      queryClient.invalidateQueries({ queryKey: ['newsletter-stats'] });
    },
    onError: () => toast.error('Failed to bulk delete'),
  });

  const sendCampaignMutation = useMutation({
    mutationFn: (campaignId: string) => apiClient.post(`/newsletter/campaigns/${campaignId}/send`),
    onSuccess: () => {
      toast.success('Campaign sent!');
      queryClient.invalidateQueries({ queryKey: ['newsletter-campaigns'] });
    },
    onError: (err: any) => toast.error(err?.response?.data?.message ?? 'Send failed'),
  });

  // ── Helpers ──────────────────────────────────────────────────────────────

  const subscribers = subscribersRes?.data ?? [];
  const subMeta = subscribersRes?.metadata;
  const campaigns = campaignsRes?.data ?? [];
  const campMeta = campaignsRes?.metadata;

  const allSelected = subscribers.length > 0 && subscribers.every((s) => selectedIds.has(s.id));
  const toggleAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(subscribers.map((s) => s.id)));
  };
  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleExport = async () => {
    try {
      const res = await apiClient.get('/newsletter/subscribers/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('CSV downloaded');
    } catch {
      toast.error('Export failed');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Newsletter</h1>
          <p className="text-muted-foreground mt-1">
            Manage subscribers and send targeted email campaigns.
          </p>
        </div>
        <Button onClick={() => setShowCompose(true)} leftIcon={<Plus className="h-4 w-4" />}>
          New Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Subscribers', value: stats?.total ?? 0, icon: Users, color: 'text-blue-600 bg-blue-100 dark:bg-blue-950' },
          { label: 'Active Subscribers', value: stats?.active ?? 0, icon: UserCheck, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950' },
          { label: 'Unsubscribed', value: stats?.unsubscribed ?? 0, icon: UserMinus, color: 'text-rose-600 bg-rose-100 dark:bg-rose-950' },
        ].map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                </div>
                <div className={cn('p-3 rounded-xl', stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {(['subscribers', 'campaigns'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-5 py-2 text-sm font-medium rounded-lg capitalize transition-all',
              activeTab === tab
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab === 'subscribers' ? (
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Subscribers
                {stats && (
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                    {stats.active}
                  </span>
                )}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Campaigns
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Subscribers Tab ─────────────────────────────────────────────── */}
      {activeTab === 'subscribers' && (
        <Card>
          <CardHeader className="pb-3 border-b">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <CardTitle className="text-base">Subscriber List</CardTitle>
              <div className="flex flex-wrap gap-2">
                {selectedIds.size > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    loading={bulkDeleteMutation.isPending}
                    onClick={() => bulkDeleteMutation.mutate(Array.from(selectedIds))}
                    leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                  >
                    Delete {selectedIds.size} selected
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetchSubs()}
                  leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
                >
                  Refresh
                </Button>
              </div>
            </div>

            {/* Search + Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-9 pr-4 h-9 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div className="flex gap-1 p-0.5 bg-muted rounded-lg h-9">
                {(['all', 'active', 'inactive'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => { setIsActiveFilter(f); setSubscriberPage(1); }}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-md transition-all capitalize',
                      isActiveFilter === f
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {subLoading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="h-6 w-6 text-primary animate-spin" />
              </div>
            ) : subscribers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Users className="h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground font-medium">No subscribers found</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {debouncedSearch ? 'Try adjusting your search' : 'Subscribers will appear here once someone signs up'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left w-10">
                        <button onClick={toggleAll} className="text-muted-foreground hover:text-foreground">
                          {allSelected ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4" />}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Subscribed</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className={cn('hover:bg-muted/20 transition-colors', selectedIds.has(sub.id) && 'bg-primary/5')}>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleOne(sub.id)} className="text-muted-foreground hover:text-foreground">
                            {selectedIds.has(sub.id)
                              ? <CheckSquare className="h-4 w-4 text-primary" />
                              : <Square className="h-4 w-4" />}
                          </button>
                        </td>
                        <td className="px-4 py-3 font-medium">{sub.email}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{sub.name ?? '—'}</td>
                        <td className="px-4 py-3">
                          <Badge variant={sub.isActive ? 'success' : 'secondary'} className="text-[11px]">
                            {sub.isActive ? 'Active' : 'Unsubscribed'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                          {new Date(sub.subscribedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                            onClick={() => {
                              if (confirm(`Delete ${sub.email}?`)) deleteMutation.mutate(sub.id);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {subMeta && subMeta.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  Showing {((subscriberPage - 1) * 25) + 1}–{Math.min(subscriberPage * 25, subMeta.total)} of {subMeta.total.toLocaleString()}
                </p>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled={subscriberPage <= 1} onClick={() => setSubscriberPage(p => p - 1)} className="h-8 w-8 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="flex items-center px-3 text-xs font-medium">{subscriberPage} / {subMeta.totalPages}</span>
                  <Button variant="outline" size="sm" disabled={subscriberPage >= subMeta.totalPages} onClick={() => setSubscriberPage(p => p + 1)} className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Campaigns Tab ───────────────────────────────────────────────── */}
      {activeTab === 'campaigns' && (
        <Card>
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Email Campaigns</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => refetchCampaigns()} leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
                  Refresh
                </Button>
                <Button size="sm" onClick={() => setShowCompose(true)} leftIcon={<Plus className="h-3.5 w-3.5" />}>
                  New Campaign
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {campLoading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="h-6 w-6 text-primary animate-spin" />
              </div>
            ) : campaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Sparkles className="h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground font-medium">No campaigns yet</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Click "New Campaign" to compose your first newsletter</p>
                <Button size="sm" className="mt-4" onClick={() => setShowCompose(true)}>
                  <Plus className="h-4 w-4 mr-1.5" />
                  Compose First Campaign
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                        <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3" />Results</div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {campaigns.map((camp) => (
                      <tr key={camp.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium truncate max-w-[240px]">{camp.subject}</p>
                        </td>
                        <td className="px-4 py-3">
                          <CampaignStatusBadge status={camp.status} />
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          {camp.status === 'SENT' || camp.status === 'FAILED' ? (
                            <div className="flex gap-3 text-xs">
                              <span className="text-emerald-600 font-medium flex items-center gap-1">
                                <UserCheck className="h-3 w-3" />
                                {camp.sentCount.toLocaleString()} sent
                              </span>
                              {camp.failedCount > 0 && (
                                <span className="text-rose-600 font-medium flex items-center gap-1">
                                  <UserMinus className="h-3 w-3" />
                                  {camp.failedCount.toLocaleString()} failed
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">
                          {new Date(camp.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {camp.status === 'DRAFT' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs"
                              loading={sendCampaignMutation.isPending}
                              onClick={() => {
                                if (confirm(`Send "${camp.subject}" to all active subscribers?`)) {
                                  sendCampaignMutation.mutate(camp.id);
                                }
                              }}
                              leftIcon={<Send className="h-3.5 w-3.5" />}
                            >
                              Send
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {campMeta && campMeta.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  Page {campaignPage} of {campMeta.totalPages}
                </p>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled={campaignPage <= 1} onClick={() => setCampaignPage(p => p - 1)} className="h-8 w-8 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled={campaignPage >= campMeta.totalPages} onClick={() => setCampaignPage(p => p + 1)} className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Compose Campaign Modal */}
      {showCompose && (
        <ComposeCampaign
          activeCount={stats?.active ?? 0}
          onClose={() => setShowCompose(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['newsletter-campaigns'] });
            queryClient.invalidateQueries({ queryKey: ['newsletter-stats'] });
          }}
        />
      )}
    </div>
  );
}
