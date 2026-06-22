'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArticleForm } from '@/components/articles/ArticleForm';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Fetch article details
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const response = await apiClient.get(`/articles/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.put(`/articles/${id}`, data);
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        toast.success('Article updated successfully!');
        router.push('/dashboard/articles');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update article';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading article details...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-xl font-semibold text-destructive">Error Loading Article</h2>
        <p className="text-muted-foreground mt-1">
          The article might not exist or there was a problem fetching its details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ArticleForm initialData={article} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
