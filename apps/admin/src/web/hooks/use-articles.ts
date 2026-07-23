/**
 * Article Hooks for Website
 * 
 * Uses React Query for data fetching, caching, and state management
 */

'use client';

import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/web/lib/api-client';
import { STALE_TIMES } from '@/web/lib/query-client';
import { articleKeys } from '@/web/lib/query-keys';
import type { 
  Article, 
  ArticleFilters, 
  PaginatedResponse,
  Category 
} from '@businessfirst/shared-types';

// ==================== QUERY KEYS ====================

// ==================== HOOKS ====================

/**
 * Fetch paginated articles with filters
 */
export function useArticles(filters: ArticleFilters = {}) {
  return useQuery({
    queryKey: articleKeys.list(filters),
    queryFn: async () => {
      const response = await apiClient.getPaginated<Article>('/website/articles', {
        params: {
          page: filters.page || 1,
          limit: filters.limit || 12,
          status: 'PUBLISHED',
          ...(filters.categoryId && { categoryId: filters.categoryId }),
          ...(filters.search && { search: filters.search }),
          ...(filters.isFeatured && { isFeatured: filters.isFeatured }),
          ...(filters.isBreakingNews && { isBreakingNews: filters.isBreakingNews }),
          ...(filters.isTopHeadline !== undefined && { isTopHeadline: filters.isTopHeadline }),
          ...(filters.isTrending !== undefined && { isTrending: filters.isTrending }),
          ...(filters.isUaeNews !== undefined && { isUaeNews: filters.isUaeNews }),
          ...(filters.isSponsored !== undefined && { isSponsored: filters.isSponsored }),
          sortBy: filters.sortBy || 'publishedAt',
          sortOrder: filters.sortOrder || 'desc',
        },
        next: {
          revalidate: 300, // Revalidate every 5 minutes
          tags: ['articles'],
        },
      });
      return response;
    },
    staleTime: STALE_TIMES.FREQUENT,
    placeholderData: (previousData) => previousData, // Keep previous data while loading
  });
}

/**
 * Fetch single article by slug
 */
export function useArticle(slug: string) {
  return useQuery({
    queryKey: articleKeys.detail(slug),
    queryFn: async () => {
      const article = await apiClient.get<Article>(`/website/articles/slug/${slug}`, {
        next: {
          revalidate: 60, // Revalidate every minute for article views
          tags: [`article-${slug}`],
        },
      });
      return article;
    },
    staleTime: STALE_TIMES.FREQUENT,
    enabled: !!slug,
  });
}

/**
 * Fetch featured articles for homepage
 */
export function useFeaturedArticles(limit: number = 6) {
  return useQuery({
    queryKey: articleKeys.featured(),
    queryFn: async () => {
      const response = await apiClient.getPaginated<Article>('/website/articles', {
        params: {
          isFeatured: true,
          status: 'PUBLISHED',
          limit,
          sortBy: 'publishedAt',
          sortOrder: 'desc',
        },
        next: {
          revalidate: 300,
          tags: ['featured-articles'],
        },
      });
      return response;
    },
    staleTime: STALE_TIMES.FREQUENT,
  });
}

/**
 * Fetch breaking news
 */
export function useBreakingNews(limit: number = 5) {
  return useQuery({
    queryKey: articleKeys.breaking(),
    queryFn: async () => {
      const response = await apiClient.getPaginated<Article>('/website/articles', {
        params: {
          isBreakingNews: true,
          status: 'PUBLISHED',
          limit,
          sortBy: 'publishedAt',
          sortOrder: 'desc',
        },
        next: {
          revalidate: 30, // More frequent for breaking news
          tags: ['breaking-news'],
        },
      });
      return response;
    },
    staleTime: STALE_TIMES.REALTIME,
    refetchInterval: 60000, // Auto-refresh every minute
  });
}

/**
 * Fetch articles by category slug
 */
export function useArticlesByCategory(categorySlug: string, page: number = 1) {
  return useQuery({
    queryKey: articleKeys.byCategory(categorySlug),
    queryFn: async () => {
      // First get category by slug
      const category = await apiClient.get<Category>(`/website/categories/slug/${categorySlug}`);
      
      // Then get articles for that category
      const response = await apiClient.getPaginated<Article>('/website/articles', {
        params: {
          categoryId: category.id,
          status: 'PUBLISHED',
          page,
          limit: 12,
          sortBy: 'publishedAt',
          sortOrder: 'desc',
        },
        next: {
          revalidate: 300,
          tags: [`category-${categorySlug}`],
        },
      });
      
      return { category, ...response };
    },
    staleTime: STALE_TIMES.FREQUENT,
    enabled: !!categorySlug,
  });
}

/**
 * Fetch related articles
 */
export function useRelatedArticles(articleId: string, limit: number = 4) {
  return useQuery({
    queryKey: articleKeys.related(articleId),
    queryFn: async () => {
      const response = await apiClient.getPaginated<Article>(`/website/articles/${articleId}/related`, {
        params: { limit },
        next: {
          revalidate: 600,
          tags: [`related-${articleId}`],
        },
      });
      return response;
    },
    staleTime: STALE_TIMES.NORMAL,
    enabled: !!articleId,
  });
}

/**
 * Infinite scroll for articles
 */
export function useInfiniteArticles(filters: Omit<ArticleFilters, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: [...articleKeys.lists(), 'infinite', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.getPaginated<Article>('/website/articles', {
        params: {
          page: pageParam,
          limit: 12,
          status: 'PUBLISHED',
          ...filters,
        },
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.metadata;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: STALE_TIMES.FREQUENT,
  });
}

/**
 * Increment article view count
 */
export function useIncrementView() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (articleId: string) => 
      apiClient.post(`/website/articles/${articleId}/view`),
    onSuccess: (_, articleId) => {
      // Invalidate article cache to update view count
      queryClient.invalidateQueries({ 
        queryKey: articleKeys.detail(articleId) 
      });
    },
  });
}