'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArticleForm } from '@/components/articles/ArticleForm';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function CreateArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.post('/articles', data);
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        toast.success('Article created successfully!');
        router.push('/dashboard/articles');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create article';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <ArticleForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}