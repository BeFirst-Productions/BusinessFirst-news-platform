/**
 * React Query Configuration for Website
 * 
 * Features:
 * - Server-side prefetching support
 * - Optimistic updates
 * - Stale-while-revalidate strategy
 * - Infinite query support for pagination
 */

import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

// Default stale times based on content type
export const STALE_TIMES = {
  // Real-time content (breaking news, live updates)
  REALTIME: 30 * 1000, // 30 seconds
  
  // Frequently updated content (articles, news)
  FREQUENT: 5 * 60 * 1000, // 5 minutes
  
  // Normal content (categories, tags)
  NORMAL: 30 * 60 * 1000, // 30 minutes
  
  // Static content (settings, SEO)
  STATIC: 24 * 60 * 60 * 1000, // 24 hours
} as const;

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh
      staleTime: STALE_TIMES.FREQUENT,
      
      // Cache time - how long inactive data stays in cache
      gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
      
      // Retry failed requests
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus for real-time feel
      refetchOnWindowFocus: true,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
    },
    mutations: {
      // Don't retry mutations
      retry: 0,
      
      // Show errors automatically
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
};

// Create QueryClient factory (for SSR support)
export function createQueryClient(): QueryClient {
  return new QueryClient(queryClientConfig);
}

// Singleton for client-side
let clientQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    // Server: always create new client
    return createQueryClient();
  }
  
  // Browser: reuse same client
  if (!clientQueryClient) {
    clientQueryClient = createQueryClient();
  }
  
  return clientQueryClient;
}