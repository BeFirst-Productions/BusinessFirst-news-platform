/**
 * Contact Form Hook
 */

'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactFormData) =>
      apiClient.post('/contacts', data),
    onSuccess: () => {
      toast.success('Message sent successfully! We will get back to you soon.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message. Please try again.');
    },
  });
}