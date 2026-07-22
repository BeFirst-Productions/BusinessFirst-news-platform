/**
 * Category Hooks for Website
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/web/lib/api-client';
import { STALE_TIMES } from '@/web/lib/query-client';
import { categoryKeys } from '@/web/lib/query-keys';
import type { Category } from '@businessfirst/shared-types';

// ==================== QUERY KEYS ====================

// ==================== HOOKS ====================

/**
 * Fetch all active categories
 */
export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: async () => {
      const categories = await apiClient.get<Category[]>('/website/categories', {
        params: {
          isActive: true,
          sortBy: 'order',
          sortOrder: 'asc',
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
          tags: ['categories'],
        },
      });
      return categories;
    },
    staleTime: STALE_TIMES.STATIC,
  });
}

/**
 * Fetch single category by slug
 */
export function useCategory(slug: string) {
  return useQuery({
    queryKey: categoryKeys.detail(slug),
    queryFn: async () => {
      const category = await apiClient.get<Category>(`/website/categories/slug/${slug}`, {
        next: {
          revalidate: 3600,
          tags: [`category-${slug}`],
        },
      });
      return category;
    },
    staleTime: STALE_TIMES.STATIC,
    enabled: !!slug,
  });
}

/**
 * Fetch category tree (for navigation)
 */
export function useCategoryTree() {
  return useQuery({
    queryKey: [...categoryKeys.all, 'tree'],
    queryFn: async () => {
      const categories = await apiClient.get<Category[]>('/website/categories/tree', {
        next: {
          revalidate: 3600,
          tags: ['category-tree'],
        },
      });
      return categories;
    },
    staleTime: STALE_TIMES.STATIC,
  });
}