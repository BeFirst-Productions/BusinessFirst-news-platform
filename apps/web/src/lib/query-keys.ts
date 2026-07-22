import type { ArticleFilters } from '@businessfirst/shared-types';

export const articleKeys = {
  all: ['articles'] as const,
  lists: () => [...articleKeys.all, 'list'] as const,
  list: (filters: ArticleFilters) => [...articleKeys.lists(), filters] as const,
  details: () => [...articleKeys.all, 'detail'] as const,
  detail: (slug: string) => [...articleKeys.details(), slug] as const,
  featured: () => [...articleKeys.all, 'featured'] as const,
  breaking: () => [...articleKeys.all, 'breaking'] as const,
  popular: () => [...articleKeys.all, 'popular'] as const,
  related: (articleId: string) => [...articleKeys.all, 'related', articleId] as const,
  byCategory: (categorySlug: string) => [...articleKeys.all, 'byCategory', categorySlug] as const,
};

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...categoryKeys.details(), slug] as const,
};

export const adKeys = {
  all: ['ads'] as const,
  slot: (slotCode: string) => [...adKeys.all, 'slot', slotCode] as const,
  page: (targetPage: string) => [...adKeys.all, 'page', targetPage] as const,
};
