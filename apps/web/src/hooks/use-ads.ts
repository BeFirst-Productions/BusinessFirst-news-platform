/**
 * Advertisement Hooks for Website
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { STALE_TIMES } from '@/lib/query-client';
import { adKeys } from '@/lib/query-keys';
import type { Ad } from '@businessfirst/shared-types';

// ==================== QUERY KEYS ====================

// ==================== HOOKS ====================

/**
 * Fetch ads for a specific slot
 */
export function useAdSlot(slotCode: string) {
  return useQuery({
    queryKey: adKeys.slot(slotCode),
    queryFn: async () => {
      const ads = await apiClient.get<Ad[]>(`/website/ads/slot/${slotCode}`, {
        next: {
          revalidate: 300, // Refresh ads every 5 minutes
          tags: [`ad-slot-${slotCode}`],
        },
      });
      return ads;
    },
    staleTime: STALE_TIMES.FREQUENT,
    enabled: !!slotCode,
  });
}

/**
 * Fetch ads for a specific page (e.g. 'home')
 */
export function usePageAds(targetPage: string) {
  return useQuery({
    queryKey: adKeys.page(targetPage),
    queryFn: async () => {
      const ads = await apiClient.get<Ad[]>('/ads', {
        params: {
          targetPage,
          status: 'ACTIVE',
          limit: 50,
        },
      });
      return ads;
    },
    staleTime: STALE_TIMES.FREQUENT,
    enabled: !!targetPage,
  });
}

/**
 * Track ad impression
 */
export function useAdImpression() {
  return {
    trackImpression: async (adId: string, slotCode: string) => {
      try {
        await apiClient.post(`/website/ads/${adId}/impression`, {
          slotCode,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        // Silently fail for analytics
        console.debug('Failed to track impression:', error);
      }
    },
    trackClick: async (adId: string, slotCode: string) => {
      try {
        await apiClient.post(`/website/ads/${adId}/click`, {
          slotCode,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.debug('Failed to track click:', error);
      }
    },
  };
}