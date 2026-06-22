'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus, Eye, MousePointer, BarChart3, Trash2, Edit, Image, Video } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { usePermission } from '@/hooks/usePermission';

export default function AdsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { hasPermission } = usePermission();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['ads', page, limit],
    queryFn: async () => {
      const response = await apiClient.get(`/ads?page=${page}&limit=${limit}`);
      return response.data;
    },
  });

  const deleteAd = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/ads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast.success('Ad deleted');
    },
  });

  const toggleAdStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiClient.put(`/ads/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast.success('Ad status updated');
    },
  });

  const columns = [
    {
      key: 'name',
      header: 'Ad',
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
            {item.type === 'VIDEO' ? (
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
      key: 'performance',
      header: 'Performance',
      cell: (item: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Eye className="h-3 w-3" />
            <span>{item.impressions?.toLocaleString() || 0} impressions</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MousePointer className="h-3 w-3" />
            <span>{item.clicks?.toLocaleString() || 0} clicks</span>
          </div>
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/dashboard/ads/${item.id}`)}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
          {hasPermission('ADS', 'edit') && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const newStatus = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
                toggleAdStatus.mutate({ id: item.id, status: newStatus });
              }}
            >
              {item.status === 'ACTIVE' ? (
                <span className="text-yellow-600 text-xs font-medium">Pause</span>
              ) : (
                <span className="text-green-600 text-xs font-medium">Activate</span>
              )}
            </Button>
          )}
          {hasPermission('ADS', 'delete') && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (confirm('Delete this ad?')) deleteAd.mutate(item.id);
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
          <Button variant="outline" onClick={() => router.push('/dashboard/ads/slots')}>
            Manage Ad Spaces
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