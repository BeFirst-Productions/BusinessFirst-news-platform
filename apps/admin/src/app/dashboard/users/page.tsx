'use client';

import React, { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Modal';
import { Plus, Shield, UserPlus, Ban, CheckCircle, Key, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { UserForm } from '@/components/users/UserForm';
import { usePermission } from '@/hooks/usePermission';

export default function UsersPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { hasPermission, user: currentUser } = usePermission();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const isSuperAdmin = currentUser?.role === 'SUPERADMIN';

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['users', page, limit, search, roleFilter, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(roleFilter && { role: roleFilter }),
        ...(statusFilter && { status: statusFilter }),
      });
      const response = await apiClient.get(`/users?${params}`);
      return response.data;
    },
  });

  const updateUserStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiClient.put(`/users/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User status updated');
    },
    onError: () => toast.error('Failed to update user'),
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    },
  });

  const columns = [
    {
      key: 'name',
      header: 'User',
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {item.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      cell: (item: any) => (
        <Badge
          variant={
            item.role === 'SUPERADMIN'
              ? 'destructive'
              : item.role === 'ADMIN'
              ? 'warning'
              : 'info'
          }
        >
          <Shield className="h-3 w-3 mr-1" />
          {item.role}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item: any) => (
        <Badge
          variant={
            item.status === 'ACTIVE' ? 'success' : item.status === 'SUSPENDED' ? 'destructive' : 'secondary'
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'articles',
      header: 'Articles',
      cell: (item: any) => item._count?.articles || 0,
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      cell: (item: any) =>
        item.lastLoginAt ? formatDate(item.lastLoginAt) : 'Never',
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
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/users/${item.id}/permissions`);
            }}
            title="Manage Permissions"
          >
            <Key className="h-4 w-4" />
          </Button>
          {item.role !== 'SUPERADMIN' && (
            <>
              {hasPermission('USERS', 'edit') && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUser(item);
                    setIsEditModalOpen(true);
                  }}
                  title="Edit User"
                >
                  <Pencil className="h-4 w-4 text-primary" />
                </Button>
              )}
              {hasPermission('USERS', 'delete') && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                      deleteUser.mutate(item.id);
                    }
                  }}
                  disabled={item.id === currentUser?.id}
                  title="Delete User"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </>
          )}
          {hasPermission('USERS', 'edit') && item.role !== 'SUPERADMIN' && (
            item.status === 'ACTIVE' ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Suspend this user?')) {
                    updateUserStatus.mutate({ id: item.id, status: 'SUSPENDED' });
                  }
                }}
                title="Suspend User"
              >
                <Ban className="h-4 w-4 text-destructive" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  updateUserStatus.mutate({ id: item.id, status: 'ACTIVE' });
                }}
                title="Activate User"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
              </Button>
            )
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
        </div>
        {hasPermission('USERS', 'create') && (
          <Button onClick={() => setIsCreateModalOpen(true)} className="w-full sm:w-auto" leftIcon={<UserPlus className="h-4 w-4" />}>
            Add User
          </Button>
        )}
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
            onSearch={(s) => { setSearch(s); setPage(1); }}
            isLoading={isLoading || isRefetching}
            onRowClick={(item) => router.push(`/dashboard/users/${item.id}`)}
            onReload={refetch}
            isReloading={isRefetching}
          />
        </CardContent>
      </Card>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <UserForm
            onSuccess={() => {
              setIsCreateModalOpen(false);
              queryClient.invalidateQueries({ queryKey: ['users'] });
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <UserForm
              initialData={selectedUser}
              onSuccess={() => {
                setIsEditModalOpen(false);
                setSelectedUser(null);
                queryClient.invalidateQueries({ queryKey: ['users'] });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}