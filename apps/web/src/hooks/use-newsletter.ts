/**
 * Newsletter Hooks
 */

'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';

export type SubscribePayload =
  | string
  | {
      email: string;
      name?: string;
      category?: string;
      isLead?: boolean;
      source?: string;
    };

export interface UseNewsletterSubscribeOptions {
  showToast?: boolean;
}

export function useNewsletterSubscribe(options?: UseNewsletterSubscribeOptions) {
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: (data: SubscribePayload) => {
      const payload = typeof data === 'string' ? { email: data } : data;
      return apiClient.post('/newsletter/subscribe', payload);
    },
    onSuccess: () => {
      if (showToast) {
        toast.success('Successfully subscribed to newsletter!');
      }
    },
    onError: (error: Error) => {
      if (showToast) {
        toast.error(error.message || 'Failed to subscribe');
      }
    },
  });
}

export function useNewsletterUnsubscribe() {
  return useMutation({
    mutationFn: (email: string) =>
      apiClient.post('/newsletter/unsubscribe', { email }),
    onSuccess: () => {
      toast.success('Unsubscribed from newsletter');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unsubscribe');
    },
  });
}