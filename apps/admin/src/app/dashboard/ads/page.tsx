'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Plus, Eye, MousePointer, BarChart3, Trash2, Edit, Image, Video } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { usePermission } from '@/hooks/usePermission';
import { useConfirmModalStore } from '@/store/confirm-modal.store';

export default function AdsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { hasPermission } = usePermission();
  const confirmModal = useConfirmModalStore();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [targetPage, setTargetPage] = useState<string>('home');

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['ads', page, limit, targetPage],
    queryFn: async () => {
      const url = `/ads?page=${page}&limit=${limit}&targetPage=${targetPage}`;
      const response = await apiClient.get(url);
      return response.data;
    },
  });

  const deleteAd = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/ads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['ads-active'] });
      toast.success('Ad deleted');
    },
  });

  const toggleAdStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiClient.put(`/ads/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['ads-active'] });
      toast.success('Ad status updated');
    },
  });

  const columns = [
    {
      key: 'name',
      header: 'Ad',
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            ) : item.type === 'VIDEO' ? (
              <Video className="h-5 w-5 text-blue-600" />
            ) : (
              <Image className="h-5 w-5 text-green-600" />
            )}
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.type}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item: any) => (
        <Badge variant={item.status === 'ACTIVE' ? 'success' : item.status === 'EXPIRED' ? 'destructive' : 'secondary'}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'adNumber',
      header: 'Ad Number',
      cell: (item: any) => (
        <div className="text-sm font-medium">
          {item.placementName || item.ratio || 'N/A'}
        </div>
      ),
    },
    {
      key: 'schedule',
      header: 'Schedule',
      cell: (item: any) => (
        <div className="text-sm">
          <p>From: {formatDate(item.startDate)}</p>
          <p>To: {formatDate(item.endDate)}</p>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      cell: (item: any) => (
        <div className="flex items-center justify-end gap-2">
        
          {hasPermission('ADS', 'edit') && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const isPausing = item.status === 'ACTIVE';
                const newStatus = isPausing ? 'INACTIVE' : 'ACTIVE';
                confirmModal.open({
                  title: isPausing ? 'Pause Ad' : 'Activate Ad',
                  message: `Are you sure you want to ${isPausing ? 'pause' : 'activate'} this ad?`,
                  confirmText: isPausing ? 'Pause' : 'Activate',
                  variant: isPausing ? 'warning' : 'success',
                  onConfirm: async () => {
                    await toggleAdStatus.mutateAsync({ id: item.id, status: newStatus });
                  },
                });
              }}
            >
              {item.status === 'ACTIVE' ? (
                <span className="text-yellow-600 text-xs font-medium">Pause</span>
              ) : (
                <span className="text-green-600 text-xs font-medium">Activate</span>
              )}
            </Button>
          )}
          {hasPermission('ADS', 'edit') && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/dashboard/ads/edit/${item.id}`)}
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
          )}
          {hasPermission('ADS', 'delete') && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                confirmModal.open({
                  title: 'Delete Ad',
                  message: 'Are you sure you want to delete this ad? This action cannot be undone.',
                  confirmText: 'Delete',
                  variant: 'danger',
                  onConfirm: async () => {
                    await deleteAd.mutateAsync(item.id);
                  },
                });
              }}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ads Management</h1>
          <p className="text-muted-foreground mt-1">Manage advertisements and track performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => window.open(`/ads-preview?page=${targetPage}`, '_blank')} leftIcon={<Eye className="h-4 w-4" />}>
            Preview
          </Button>
          {hasPermission('ADS', 'create') && (
            <Button onClick={() => router.push('/dashboard/ads/create')} leftIcon={<Plus className="h-4 w-4" />}>
              Create Ad
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-end">
            <div className="w-[250px]">
              <Select value={targetPage} onValueChange={(val) => {
                setTargetPage(val);
                setPage(1); // Reset to first page on filter change
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Target Page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Homepage</SelectItem>
                  <SelectItem value="news_detail">News Detail Page</SelectItem>
                  <SelectItem value="contact">Contact Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={data?.data || []}
            total={data?.metadata?.total || 0}
            page={page}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
            isLoading={isLoading || isRefetching}
            onReload={refetch}
            isReloading={isRefetching}
          />
        </CardContent>
      </Card>
    </div>
  );
}