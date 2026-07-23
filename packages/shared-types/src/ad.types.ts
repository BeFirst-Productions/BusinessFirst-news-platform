import { BaseEntity } from './common.types';

export type AdType = 'IMAGE' | 'VIDEO' | 'BOTH';
export type AdStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';

export interface Ad extends BaseEntity {
  name: string;
  description?: string;
  type: AdType;
  imageUrl?: string;
  videoUrl?: string;
  redirectUrl?: string;
  startDate: string;
  endDate: string;
  status: AdStatus;
  priority: number;
  targetPage?: string;
  ratio?: string;
  pageName?: string;
  placementName?: string;
  createdBy: string;
}

export interface AdSpace extends BaseEntity {
  name: string;
  code: string;
  description?: string;
  maxAds: number;
}
