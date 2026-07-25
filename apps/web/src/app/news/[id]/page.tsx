import React from 'react';
import type { Metadata } from 'next';
import NewsDetail from "@/components/NewsDetail";
import { apiClient } from '@/lib/api-client';
import type { Article } from '@businessfirst/shared-types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const article = await apiClient.get<Article>(`/articles/slug/${id}`);
    
    if (!article) {
      return { title: 'Article Not Found' };
    }

    return {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      keywords: article.metaKeywords ? article.metaKeywords.split(',').map(k => k.trim()) : undefined,
      openGraph: {
        title: article.metaTitle || article.title,
        description: article.metaDescription || article.excerpt,
        images: article.featuredImage ? [article.featuredImage] : [],
        type: 'article',
        publishedTime: article.publishedAt,
        authors: article.author?.name ? [article.author.name] : [],
      },
    };
  } catch (error) {
    return { title: 'Business First News' };
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <NewsDetail articleId={id} />
    </main>
  );
}
