'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowLeft, Save, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

interface ModulePermission {
  moduleId: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

const MODULE_SUPPORTED_ACTIONS: Record<
  string,
  { view: boolean; create: boolean; edit: boolean; delete: boolean }
> = {
  DASHBOARD: { view: true, create: false, edit: false, delete: false },
  ANALYTICS: { view: true, create: false, edit: false, delete: false },
  SETTINGS: { view: true, create: false, edit: true, delete: false },
  SEO: { view: true, create: false, edit: true, delete: false },
  CONTACTS: { view: true, create: false, edit: false, delete: true },
  COMMENTS: { view: true, create: false, edit: true, delete: true },
  NEWSLETTER: { view: true, create: true, edit: false, delete: true },
  MEDIA: { view: true, create: true, edit: false, delete: true },
  ARTICLES: { view: true, create: true, edit: true, delete: true },
  CATEGORIES: { view: true, create: true, edit: true, delete: true },
  TAGS: { view: true, create: true, edit: true, delete: true },
  ADS: { view: true, create: true, edit: true, delete: true },
  USERS: { view: true, create: true, edit: true, delete: true },
};

const isActionSupported = (
  moduleCode: string,
  action: 'view' | 'create' | 'edit' | 'delete'
) => {
  const supported = MODULE_SUPPORTED_ACTIONS[moduleCode];
  if (!supported) return true;
  return supported[action];
};

export default function UserPermissionsPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [permissions, setPermissions] = useState<ModulePermission[]>([]);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${id}`);
      return response.data.data;
    },
  });

  const { data: modules, isLoading: modulesLoading } = useQuery({
    queryKey: ['modules'],
    queryFn: async () => {
      const response = await apiClient.get('/modules');
      return response.data.data;
    },
  });

  const { data: userPermissions, isLoading: permissionsLoading } = useQuery({
    queryKey: ['user-permissions', id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${id}/permissions`);
      return response.data.data;
    },
  });

  useEffect(() => {
    if (modules && userPermissions) {
      const currentPermissions = modules.map((module: any) => {
        const existing = userPermissions.find(
          (p: any) => p.moduleId === module.id
        );
        const code = module.code;
        return {
          moduleId: module.id,
          canView: isActionSupported(code, 'view') ? (existing?.canView ?? true) : false,
          canCreate: isActionSupported(code, 'create') ? (existing?.canCreate ?? false) : false,
          canEdit: isActionSupported(code, 'edit') ? (existing?.canEdit ?? false) : false,
          canDelete: isActionSupported(code, 'delete') ? (existing?.canDelete ?? false) : false,
        };
      });
      setPermissions(currentPermissions);
    }
  }, [modules, userPermissions]);

  const updatePermissions = useMutation({
    mutationFn: async () => {
      return apiClient.put(`/users/${id}/permissions`, { permissions });
    },
    onSuccess: () => {
      toast.success('Permissions updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user-permissions', id] });
    },
    onError: () => toast.error('Failed to update permissions'),
  });

  const handlePermissionChange = (
    moduleId: string,
    field: keyof ModulePermission,
    value: boolean
  ) => {
    setPermissions((prev) =>
      prev.map((p) => (p.moduleId === moduleId ? { ...p, [field]: value } : p))
    );
  };

  if (userLoading || modulesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="flex-shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold truncate">User Permissions</h1>
            <p className="text-muted-foreground text-sm truncate">
              {user?.name} ({user?.email})
            </p>
          </div>
          <Badge variant={user?.role === 'SUPERADMIN' ? 'destructive' : 'info'} className="flex-shrink-0">
            <Shield className="h-3 w-3 mr-1" />
            {user?.role}
          </Badge>
        </div>
        <Button
          onClick={() => updatePermissions.mutate()}
          loading={updatePermissions.isPending}
          leftIcon={<Save className="h-4 w-4" />}
          className="w-full md:w-auto"
        >
          Save Permissions
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Module Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Module</th>
                  <th className="text-center py-3 px-4 font-medium">View</th>
                  <th className="text-center py-3 px-4 font-medium">Create</th>
                  <th className="text-center py-3 px-4 font-medium">Edit</th>
                  <th className="text-center py-3 px-4 font-medium">Delete</th>
                </tr>
              </thead>
              <tbody>
                {modules?.map((module: any) => {
                  const permission = permissions.find(
                    (p) => p.moduleId === module.id
                  );
                  if (!permission) return null;

                  return (
                    <tr key={module.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{module.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {module.description}
                          </p>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Switch
                          checked={permission.canView}
                          onCheckedChange={(v) =>
                            handlePermissionChange(module.id, 'canView', v)
                          }
                          disabled={user?.role === 'SUPERADMIN' || !isActionSupported(module.code, 'view')}
                        />
                      </td>
                      <td className="text-center py-3 px-4">
                        <Switch
                          checked={permission.canCreate}
                          onCheckedChange={(v) =>
                            handlePermissionChange(module.id, 'canCreate', v)
                          }
                          disabled={user?.role === 'SUPERADMIN' || !isActionSupported(module.code, 'create')}
                        />
                      </td>
                      <td className="text-center py-3 px-4">
                        <Switch
                          checked={permission.canEdit}
                          onCheckedChange={(v) =>
                            handlePermissionChange(module.id, 'canEdit', v)
                          }
                          disabled={user?.role === 'SUPERADMIN' || !isActionSupported(module.code, 'edit')}
                        />
                      </td>
                      <td className="text-center py-3 px-4">
                        <Switch
                          checked={permission.canDelete}
                          onCheckedChange={(v) =>
                            handlePermissionChange(module.id, 'canDelete', v)
                          }
                          disabled={user?.role === 'SUPERADMIN' || !isActionSupported(module.code, 'delete')}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}