'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatsCard } from '@/components/ui/StatsCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Modal';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Key,
  Ban,
  CheckCircle,
  Shield,
  User,
  Mail,
  Calendar,
  Clock,
  UserPlus,
  FileText,
  AlertTriangle,
  Check,
  X,
  Plus
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { UserForm } from '@/components/users/UserForm';
import { usePermission } from '@/hooks/usePermission';
import { useConfirmModalStore } from '@/store/confirm-modal.store';

export default function UserDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { hasPermission, user: currentUser } = usePermission();
  const confirmModal = useConfirmModalStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isSuperAdmin = currentUser?.role === 'SUPERADMIN';

  // Fetch user details
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  // Fetch user permissions for summary table
  const { data: permissions, isLoading: isPermissionsLoading } = useQuery({
    queryKey: ['user-permissions', id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${id}/permissions`);
      return response.data.data;
    },
    enabled: !!id,
  });

  const updateUserStatus = useMutation({
    mutationFn: ({ status }: { status: string }) =>
      apiClient.put(`/users/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User status updated');
    },
    onError: () => toast.error('Failed to update user status'),
  });

  const deleteUser = useMutation({
    mutationFn: () => apiClient.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
      router.push('/dashboard/users');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete user');
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-md mx-auto px-4">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-destructive">Error Loading User</h2>
        <p className="text-muted-foreground mt-2">
          The user might not exist, or there was a server connection problem. Please verify the URL or ID and try again.
        </p>
        <Button
          className="mt-6"
          onClick={() => router.push('/dashboard/users')}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Users
        </Button>
      </div>
    );
  }

  const handleStatusToggle = () => {
    const isCurrentlyActive = user.status === 'ACTIVE';
    const actionText = isCurrentlyActive ? 'suspend' : 'activate';
    
    confirmModal.open({
      title: `${isCurrentlyActive ? 'Suspend' : 'Activate'} User`,
      message: `Are you sure you want to ${actionText} ${user.name}?`,
      confirmText: isCurrentlyActive ? 'Suspend' : 'Activate',
      variant: isCurrentlyActive ? 'danger' : 'info',
      onConfirm: async () => {
        await updateUserStatus.mutateAsync({
          status: isCurrentlyActive ? 'SUSPENDED' : 'ACTIVE',
        });
      },
    });
  };

  const handleDelete = () => {
    confirmModal.open({
      title: 'Delete User',
      message: `Are you sure you want to delete ${user.name}? This action is permanent and cannot be undone.`,
      confirmText: 'Delete',
      variant: 'danger',
      onConfirm: async () => {
        await deleteUser.mutateAsync();
      },
    });
  };

  const canEditUser = hasPermission('USERS', 'edit') && user.role !== 'SUPERADMIN';
  const canDeleteUser = hasPermission('USERS', 'delete') && user.role !== 'SUPERADMIN' && user.id !== currentUser?.id;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard/users')}
            className="h-9 w-9 rounded-full border bg-card"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary truncate max-w-[150px]">
                {user.name}
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground mt-0.5">User Details</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          {/* Manage Permissions */}
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/users/${user.id}/permissions`)}
            leftIcon={<Key className="h-4 w-4" />}
          >
            Permissions
          </Button>

          {/* Edit */}
          {canEditUser && (
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(true)}
              leftIcon={<Pencil className="h-4 w-4 text-primary" />}
            >
              Edit
            </Button>
          )}

          {/* Activate / Suspend */}
          {canEditUser && (
            <Button
              variant="outline"
              onClick={handleStatusToggle}
              leftIcon={
                user.status === 'ACTIVE' ? (
                  <Ban className="h-4 w-4 text-destructive" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )
              }
            >
              {user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
            </Button>
          )}

          {/* Delete */}
          {canDeleteUser && (
            <Button
              variant="outline"
              onClick={handleDelete}
              leftIcon={<Trash2 className="h-4 w-4 text-destructive" />}
              className="hover:bg-destructive/10 text-destructive border-destructive/20 hover:border-destructive/40"
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns - Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile overview card */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar/Initial */}
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-inner flex-shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-primary font-semibold text-4xl">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Profile Core Data */}
                <div className="flex-1 space-y-4 text-center sm:text-left w-full">
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                      <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                      <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                        <Badge
                          variant={
                            user.role === 'SUPERADMIN'
                              ? 'destructive'
                              : user.role === 'ADMIN'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {user.role}
                        </Badge>
                        <Badge
                          variant={
                            user.status === 'ACTIVE'
                              ? 'success'
                              : user.status === 'SUSPENDED'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-1.5 justify-center sm:justify-start">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Biography</h3>
                    {user.bio ? (
                      <p className="text-sm text-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border">
                        {user.bio}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground/60 italic">No biography provided for this user.</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 bg-muted/30 px-3 py-2.5 rounded-lg border w-fit">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">User Creation Access:</span>
                    <Badge variant={user.canCreateUsers ? 'success' : 'secondary'} className="text-[11px]">
                      {user.canCreateUsers ? 'Allowed to Create Users' : 'No Creation Rights'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity / Metadata Card */}
          <Card>
            <CardHeader className="border-b py-4 px-5">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Calendar className="h-4.5 w-4.5 text-primary" />
                Account Metadata & History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Dates info */}
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center py-1.5 border-b border-dashed">
                    <span className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary/70" />
                      Joined On
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {formatDate(user.createdAt, 'short')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-dashed">
                    <span className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary/70" />
                      Last Login
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {user.lastLoginAt ? formatDate(user.lastLoginAt, 'long') : 'Never logged in'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary/70" />
                      Profile Updated
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {formatDate(user.updatedAt, 'short')}
                    </span>
                  </div>
                </div>

                {/* Creator info */}
                <div className="bg-muted/30 p-4 rounded-xl border flex flex-col justify-center">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Created By</span>
                  {user.creator ? (
                    <div className="space-y-1">
                      <p className="font-semibold text-sm text-foreground">{user.creator.name}</p>
                      <p className="text-xs text-muted-foreground">{user.creator.email}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground/60 italic">System-initialized or primary user</p>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Columns - Stats & Permission Summary */}
        <div className="space-y-6">
          {/* Quick Statistics */}
          <div className="grid grid-cols-1 gap-4">
            <StatsCard
              title="Articles Authored"
              value={user._count?.articles || 0}
              icon={<FileText className="h-5 w-5 text-blue-600" />}
              iconBg="bg-blue-50 dark:bg-blue-950"
            />
            {user.role !== 'EDITOR' && (
              <StatsCard
                title="Users Invited/Created"
                value={user._count?.createdUsers || 0}
                icon={<UserPlus className="h-5 w-5 text-emerald-600" />}
                iconBg="bg-emerald-50 dark:bg-emerald-950"
              />
            )}
          </div>

          {/* Permissions Matrix summary */}
          <Card>
            <CardHeader className="border-b py-4 px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Shield className="h-4.5 w-4.5 text-primary" />
                Permissions Summary
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/dashboard/users/${user.id}/permissions`)}
                className="h-8 px-2"
              >
                Manage
              </Button>
            </CardHeader>
            <CardContent className="p-5">
              {isPermissionsLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                </div>
              ) : permissions && permissions.length > 0 ? (
                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {permissions.map((p: any) => (
                    <div key={p.id} className="flex justify-between items-center py-2 px-3 bg-muted/20 border rounded-lg hover:bg-muted/45 transition-colors">
                      <div className="min-w-0">
                        <span className="font-semibold text-xs block text-foreground truncate">{p.module?.name}</span>
                        <span className="text-[10px] text-muted-foreground block font-mono">{p.module?.code}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[9px]">
                        <span className={`px-1.5 py-0.5 rounded ${p.canView ? 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>V</span>
                        <span className={`px-1.5 py-0.5 rounded ${p.canCreate ? 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>C</span>
                        <span className={`px-1.5 py-0.5 rounded ${p.canEdit ? 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>E</span>
                        <span className={`px-1.5 py-0.5 rounded ${p.canDelete ? 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>D</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm border border-dashed rounded-lg">
                  <Shield className="h-6 w-6 text-muted-foreground/30 mx-auto mb-2" />
                  {user.role === 'SUPERADMIN' ? (
                    <p className="text-xs italic text-green-600 font-medium px-2">Superadmin accounts bypass standard permissions checks with unrestricted system access.</p>
                  ) : (
                    <p className="text-xs">No direct module permissions configured.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Edit User Form Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
          </DialogHeader>
          {user && (
            <UserForm
              initialData={user}
              onSuccess={() => {
                setIsEditModalOpen(false);
                queryClient.invalidateQueries({ queryKey: ['user', id] });
                queryClient.invalidateQueries({ queryKey: ['users'] });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
