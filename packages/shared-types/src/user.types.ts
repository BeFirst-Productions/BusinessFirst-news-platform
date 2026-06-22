import { BaseEntity } from './common.types';

export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'EDITOR';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  bio?: string;
  canCreateUsers: boolean;
  lastLoginAt?: string;
}

export interface UserModulePermission {
  id: string;
  userId: string;
  moduleId: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  module: Module;
}

export interface Module {
  id: string;
  name: string;
  description?: string;
}
