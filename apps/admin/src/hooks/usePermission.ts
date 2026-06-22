import { useAuthStore } from '@/store/auth.store';

export function usePermission() {
  const { user } = useAuthStore();

  const hasPermission = (
    moduleCode: string,
    action: 'view' | 'create' | 'edit' | 'delete'
  ) => {
    if (!user) return false;
    if (user.role === 'SUPERADMIN') return true;
    const perm = user.modules?.find((m) => m.module.code === moduleCode);
    if (!perm) return false;
    if (action === 'view') return perm.canView;
    if (action === 'create') return perm.canCreate;
    if (action === 'edit') return perm.canEdit;
    if (action === 'delete') return perm.canDelete;
    return false;
  };

  return { hasPermission, role: user?.role, user };
}
