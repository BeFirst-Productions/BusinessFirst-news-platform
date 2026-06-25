'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  ArrowLeft,
  Edit,
  Calendar,
  Clock,
  Eye,
  Globe,
  Tag,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Megaphone,
  Star,
  Search,
  Folder
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function ViewArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Fetch article details
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const response = await apiClient.get(`/articles/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading article preview...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-md mx-auto px-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-destructive">Error Loading Article</h2>
        <p className="text-muted-foreground mt-2">
          The article might not exist, or there was a server connection problem. Please check that the ID is correct and try again.
        </p>
        <Button
          className="mt-6"
          onClick={() => router.push('/dashboard/articles')}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Articles
        </Button>
      </div>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'success';
      case 'DRAFT':
        return 'warning';
      case 'SCHEDULED':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard/articles')}
            className="h-9 w-9 rounded-full border"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Articles</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary truncate max-w-[150px]">
                {article.title}
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground mt-0.5">Article Details</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={() => router.push('/dashboard/articles')}
          >
            All Articles
          </Button>
          <Button
            onClick={() => router.push(`/dashboard/articles/${id}/edit`)}
            leftIcon={<Edit className="h-4 w-4" />}
            className="flex-1 sm:flex-none"
          >
            Edit Article
          </Button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column - Article Content Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border shadow-sm">
            {/* Featured Image */}
            {article.featuredImage && (
              <div className="relative w-full max-h-[380px] overflow-hidden bg-slate-900 border-b">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-auto max-h-[380px] object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-extrabold leading-tight line-clamp-2 drop-shadow-md">
                    {article.title}
                  </h2>
                </div>
              </div>
            )}

            <CardContent className="p-6 md:p-8 space-y-6">
              {/* Header Details if no Featured Image */}
              {!article.featuredImage && (
                <div className="border-b pb-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {article.category ? (
                      <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-1">
                        {article.category.name}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-1">
                        Uncategorized
                      </Badge>
                    )}
                    <Badge variant={getStatusBadgeVariant(article.status)}>
                      {article.status}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-foreground">
                    {article.title}
                  </h2>
                </div>
              )}

              {/* Author & Read Time Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 rounded-xl bg-muted/40 border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center ring-2 ring-background">
                    {article.author?.avatar ? (
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="text-white h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground leading-none">{article.author?.name || 'Unknown Author'}</p>
                    <p className="text-xs text-muted-foreground mt-1">{article.author?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    {article.publishedAt ? formatDate(article.publishedAt, 'long') : formatDate(article.createdAt, 'long')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    {article.readingTime || 1} min read
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-primary" />
                    {article.viewCount?.toLocaleString() || 0} views
                  </span>
                </div>
              </div>

              {/* Excerpt Block */}
              {article.excerpt && (
                <div className="border-l-4 border-primary pl-4 py-1.5 italic text-lg text-muted-foreground bg-muted/20 rounded-r-md">
                  {article.excerpt}
                </div>
              )}

              {/* Article Content Area */}
              <div className="pt-4 border-t">
                {article.content ? (
                  <div
                    className="prose dark:prose-invert max-w-none break-words"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    <FileText className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                    No content provided for this article.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Settings */}
        <div className="space-y-6">

          {/* Card 1: Publish Settings */}
          <Card className="border shadow-sm">
            <CardHeader className="border-b py-4 px-5">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Publish Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-center py-1.5 border-b border-dashed">
                <span className="text-sm text-muted-foreground font-medium">Status</span>
                <Badge variant={getStatusBadgeVariant(article.status)} className="font-semibold px-2.5 py-0.5">
                  {article.status}
                </Badge>
              </div>

              {article.status === 'SCHEDULED' && article.scheduledAt && (
                <div className="flex justify-between items-start py-1.5 border-b border-dashed">
                  <span className="text-sm text-muted-foreground font-medium">Scheduled For</span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {formatDate(article.scheduledAt, 'long')}
                  </span>
                </div>
              )}

              {article.publishedAt && (
                <div className="flex justify-between items-start py-1.5 border-b border-dashed">
                  <span className="text-sm text-muted-foreground font-medium">Published At</span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {formatDate(article.publishedAt, 'long')}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-1.5 border-b border-dashed">
                <span className="text-sm text-muted-foreground font-medium">Created On</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatDate(article.createdAt, 'short')}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-sm text-muted-foreground font-medium">Last Updated</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatDate(article.updatedAt, 'short')}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Features Toggles */}
          <Card className="border shadow-sm">
            <CardHeader className="border-b py-4 px-5">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Article Badging & Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5">
              <div className="flex items-center justify-between p-2 rounded-lg border bg-muted/10">
                <div className="flex items-center gap-2.5">
                  <Star className={`h-4.5 w-4.5 ${article.isFeatured ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/40'}`} />
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">Featured Article</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Highlight on homepage top spot</p>
                  </div>
                </div>
                <Badge variant={article.isFeatured ? 'success' : 'secondary'} className="text-xs">
                  {article.isFeatured ? 'YES' : 'NO'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg border bg-muted/10">
                <div className="flex items-center gap-2.5">
                  <Megaphone className={`h-4.5 w-4.5 ${article.isBreakingNews ? 'text-red-500 fill-red-100' : 'text-muted-foreground/40'}`} />
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">Breaking News</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Show in ticker bar at top</p>
                  </div>
                </div>
                <Badge variant={article.isBreakingNews ? 'destructive' : 'secondary'} className="text-xs">
                  {article.isBreakingNews ? 'YES' : 'NO'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: SEO Metadata Info */}
          <Card className="border shadow-sm">
            <CardHeader className="border-b py-4 px-5">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                SEO Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {/* Google Preview Widget */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg space-y-1 text-left">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Search className="h-3 w-3" /> Search Snippet Preview
                </p>
                <h4 className="text-blue-800 dark:text-blue-400 font-medium text-sm hover:underline cursor-pointer truncate">
                  {article.metaTitle || article.title}
                </h4>
                <p className="text-emerald-700 dark:text-emerald-500 text-xs truncate">
                  https://businessfirst.com/articles/{article.slug}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2">
                  {article.metaDescription || article.excerpt || 'No description provided. Add a meta description to stand out in search results.'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Meta Title</label>
                <p className="text-sm font-medium text-foreground break-words bg-muted/30 p-2 rounded border">
                  {article.metaTitle || <span className="text-muted-foreground italic font-normal text-xs">Defaults to Title</span>}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Meta Keywords</label>
                <p className="text-sm font-medium text-foreground break-words bg-muted/30 p-2 rounded border">
                  {article.metaKeywords || <span className="text-muted-foreground italic font-normal text-xs">No keywords specified</span>}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card: Category */}
          <Card className="border shadow-sm">
            <CardHeader className="border-b py-4 px-5">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Folder className="h-4 w-4 text-primary" />
                Article Category
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              {article.category ? (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1 px-2.5 py-1 text-xs">
                    <Folder className="h-3 w-3 text-muted-foreground" />
                    {article.category.name}
                  </Badge>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm flex flex-col items-center justify-center border border-dashed rounded-lg">
                  <Folder className="h-5 w-5 text-muted-foreground/40 mb-1" />
                  No category associated with this article.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card 4: Tags */}
          <Card className="border shadow-sm">
            <CardHeader className="border-b py-4 px-5">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                Article Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              {article.tags && article.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: any) => (
                    <Badge key={tag.id} variant="outline" className="flex items-center gap-1 px-2.5 py-1 text-xs">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm flex flex-col items-center justify-center border border-dashed rounded-lg">
                  <Tag className="h-5 w-5 text-muted-foreground/40 mb-1" />
                  No tags associated with this article.
                </div>
              )}
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
