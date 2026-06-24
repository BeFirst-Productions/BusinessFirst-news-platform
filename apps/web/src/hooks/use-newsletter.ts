/**
 * Newsletter Hooks
 */

'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';

export function useNewsletterSubscribe() {
  return useMutation({
    mutationFn: (email: string) =>
      apiClient.post('/website/newsletter/subscribe', { email }),
    onSuccess: () => {
      toast.success('Successfully subscribed to newsletter!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to subscribe');
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