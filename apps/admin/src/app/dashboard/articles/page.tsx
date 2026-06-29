'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plus, Search, Filter, Download, Trash2, Edit, Eye, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';
import { showToast } from '@/lib/toast-notification';
import { useConfirmModalStore } from '@/store/confirm-modal.store';
import { TooltipWrapper } from '@/components/ui/Tooltip';
import { usePermission } from '@/hooks/usePermission';

export default function ArticlesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const confirmModal = useConfirmModalStore();
  const { hasPermission } = usePermission();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds([]);
  }, [page, limit, search, statusFilter, categoryFilter]);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['articles', page, limit, search, statusFilter, categoryFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(statusFilter && statusFilter !== 'all' && { status: statusFilter }),
        ...(categoryFilter && { categoryId: categoryFilter }),
      });
      const response = await apiClient.get(`/articles?${params}`);
      return response.data;
    },
  });

  const pageItemIds = data?.data?.map((item: any) => item.id) || [];
  const isAllSelected = pageItemIds.length > 0 && pageItemIds.every((id: string) => selectedIds.includes(id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageItemIds])));
    } else {
      setSelectedIds(prev => prev.filter(id => !pageItemIds.includes(id)));
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const deleteArticle = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/articles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      showToast.success('Article deleted successfully', 'The article has been permanently removed.');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'An error occurred during deletion.';
      showToast.error('Failed to Delete Article', message, {
        details: error.stack || error.message || String(error)
      });
    },
  });

  const bulkDelete = useMutation({
    mutationFn: (ids: string[]) => apiClient.post('/articles/bulk-delete', { ids }),
    onSuccess: (_data, ids) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      setSelectedIds([]);
      showToast.success('Articles deleted successfully', `${ids.length} selected articles were permanently removed.`);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to bulk delete articles.';
      showToast.error('Bulk Delete Failed', message, {
        details: error.stack || error.message || String(error)
      });
    },
  });

  const columns = [
    {
      key: 'select',
      header: (
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={(e) => handleSelectAll(e.target.checked)}
          className="rounded border-input text-primary focus:ring-primary h-4 w-4 cursor-pointer"
        />
      ),
      className: 'w-[40px]',
      cell: (item: any) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(item.id)}
          onChange={(e) => handleSelectOne(item.id, e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-input text-primary focus:ring-primary h-4 w-4 cursor-pointer"
        />
      ),
    },
    {
      key: 'serial',
      header: 'S.No.',
      className: 'w-[60px] text-center font-semibold text-muted-foreground',
      cell: (item: any, index: number) => (
        <div className="text-center font-medium text-muted-foreground text-sm">
          {(page - 1) * limit + index + 1}
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Title',
      className: 'min-w-[250px] max-w-[320px]',
      cell: (item: any) => (
        <div className="flex items-center gap-3 max-w-sm">
          {item.featuredImage ? (
            <img
              src={item.featuredImage}
              alt={item.title}
              className="w-12 h-12 rounded object-cover flex-shrink-0 bg-muted"
            />
          ) : (
            <div className="w-12 h-12 rounded bg-muted flex items-center justify-center flex-shrink-0">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{item.title}</p>
            <p className="text-sm text-muted-foreground truncate">{item.excerpt}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      className: 'w-[130px]',
      cell: (item: any) => {
        const category = item.category;
        if (!category) {
          return <Badge variant="outline">Uncategorized</Badge>;
        }
        return (
          <Badge variant="outline" className="text-xs truncate max-w-[120px]">
            {category.name}
          </Badge>
        );
      },
    },
    {
      key: 'author',
      header: 'Author',
      className: 'w-[140px]',
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-xs">
              {item.author?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <span className="text-sm">{item.author?.name}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      className: 'w-[120px]',
      cell: (item: any) => (
        <Badge
          variant={
            item.status === 'PUBLISHED'
              ? 'success'
              : item.status === 'DRAFT'
                ? 'warning'
                : item.status === 'SCHEDULED'
                  ? 'info'
                  : 'secondary'
          }
        >
          {item.status}
        </Badge>
      ),
    },
    // {
    //   key: 'views',
    //   header: 'Views',
    //   cell: (item: any) => (
    //     <div className="flex items-center gap-1">
    //       <Eye className="h-4 w-4 text-muted-foreground" />
    //       {/* <span>{item.viewCount?.toLocaleString() || 0}</span> */}
    //     </div>
    //   ),
    // },
    {
      key: 'createdAt',
      header: 'Date',
      className: 'w-[130px]',
      cell: (item: any) => formatDate(item.createdAt),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'w-[120px] text-right',
      cell: (item: any) => (
        <div className="flex items-center justify-end gap-2">
          <TooltipWrapper content="View ">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dashboard/articles/${item.id}/view`);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipWrapper>
          {hasPermission('ARTICLES', 'edit') && (
            <TooltipWrapper content="Edit ">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/dashboard/articles/${item.id}/edit`);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipWrapper>
          )}
          {hasPermission('ARTICLES', 'delete') && (
            <TooltipWrapper content="Delete ">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmModal.open({
                    title: 'Delete Article',
                    message: 'Are you sure you want to delete this article? This action cannot be undone and the article will be permanently removed.',
                    confirmText: 'Delete',
                    variant: 'danger',
                    onConfirm: async () => { await deleteArticle.mutateAsync(item.id); },
                  });
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </TooltipWrapper>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your articles
          </p>
        </div>
        {hasPermission('ARTICLES', 'create') && (
          <Button onClick={() => router.push('/dashboard/articles/create')} className="w-full sm:w-auto" leftIcon={<Plus className="h-4 w-4" />}>
            Create Article
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap w-full">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9 w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                {/* <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem> */}
              </SelectContent>
            </Select>
            <TooltipWrapper content="Reload Data">
              <Button
                variant="outline"
                size="icon"
                onClick={() => refetch()}
                disabled={isLoading || isRefetching}
                className="h-10 w-10 flex items-center justify-center border hover:bg-accent"
              >
                <RefreshCw
                  className={cn(
                    'h-4 w-4 text-muted-foreground',
                    isRefetching && 'animate-spin text-primary'
                  )}
                />
              </Button>
            </TooltipWrapper>
            {hasPermission('ARTICLES', 'delete') && (
              <Button
                variant="destructive"
                className="w-full sm:w-auto"
                disabled={selectedIds.length <= 1}
                onClick={() => {
                  confirmModal.open({
                    title: 'Bulk Delete Articles',
                    message: `Are you sure you want to delete these ${selectedIds.length} selected articles? This will permanently remove them from the system.`,
                    confirmText: 'Delete All',
                    variant: 'danger',
                    onConfirm: async () => { await bulkDelete.mutateAsync(selectedIds); },
                  });
                }}
                leftIcon={<Trash2 className="h-4 w-4" />}
              >
                Bulk Delete {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
              </Button>
            )}
            {/* <Button variant="outline" className="w-full sm:w-auto" leftIcon={<Download className="h-4 w-4" />}>
              Export
            </Button> */}
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data?.data || []}
            total={data?.metadata?.total || 0}
            page={page}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
            isLoading={isLoading || isRefetching}
            onRowClick={(item) =>
              hasPermission('ARTICLES', 'edit')
                ? router.push(`/dashboard/articles/${item.id}/edit`)
                : router.push(`/dashboard/articles/${item.id}/view`)
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}