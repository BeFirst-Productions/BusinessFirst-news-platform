import { BaseEntity } from './common.types';
import { User } from './user.types';

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  image?: string;
  order: number;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED';

export interface Article extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  featuredImageTitle?: string;
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
  category?: Category;
  categories?: Category[];
  authorId: string;
  author?: User;
}

export interface ArticleFilters {
  page?: number;
  limit?: number;
  categoryId?: string;
  categorySlug?: string;
  search?: string;
  isFeatured?: boolean;
  isBreakingNews?: boolean;
  status?: ArticleStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

