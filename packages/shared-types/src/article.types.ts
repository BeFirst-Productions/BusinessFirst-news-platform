import { BaseEntity } from './common.types';
import { User } from './user.types';

export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED';

export interface Article extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: ArticleStatus;
  isFeatured: boolean;
  isBreakingNews: boolean;
  viewCount: number;
  scheduledAt?: string;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  categoryId?: string;
  category?: any;
  categories?: any[];
  authorId: string;
}
