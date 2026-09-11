/**
 * use-articles hook for Admin (preview components)
 *
 * Uses the public website API endpoint so the preview footer
 * shows real published articles without needing admin auth.
 * Falls back gracefully if the API is unavailable.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

interface ArticleFilters {
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  publishedAt?: string;
}

interface PaginatedData<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const WEBSITE_API_URL =
  process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1$/, '')}/api/v1/website`
    : 'http://localhost:8083/api/v1/website';

async function fetchLatestArticles(filters: ArticleFilters): Promise<PaginatedData<Article>> {
  const params = new URLSearchParams({
    status: filters.status ?? 'PUBLISHED',
    limit: String(filters.limit ?? 3),
    sortBy: filters.sortBy ?? 'publishedAt',
    sortOrder: filters.sortOrder ?? 'desc',
  });

  const res = await fetch(`${WEBSITE_API_URL}/articles?${params.toString()}`, {
    // Don't throw on network errors — let React Query handle retry
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Articles fetch failed: ${res.status}`);
  }

  const json = await res.json();
  // The website API wraps data in { success, data: { data: [], metadata: {} } }
  return json.data as PaginatedData<Article>;
}

export function useArticles(filters: ArticleFilters = {}) {
  return useQuery<PaginatedData<Article>>({
    queryKey: ['footer-top-stories', filters],
    queryFn: () => fetchLatestArticles(filters),
    staleTime: 5 * 60 * 1000,   // 5 minutes — no unnecessary refetches
    gcTime: 10 * 60 * 1000,     // Keep in cache for 10 minutes
    retry: 1,                    // Only retry once to keep footer snappy
    retryDelay: 2000,
    refetchOnWindowFocus: false, // Footer data doesn't need live sync
  });
}
