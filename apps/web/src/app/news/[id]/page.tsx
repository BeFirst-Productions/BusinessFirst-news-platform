import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
      return { title: '404 - Page Not Found | Business First' };
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
        authors: (article.authorName || article.author?.name) ? [article.authorName || article.author!.name] : [],
      },
    };
  } catch (error) {
    return { title: '404 - Page Not Found | Business First' };
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const article = await apiClient.get<Article>(`/articles/slug/${id}`);
    if (!article) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <NewsDetail articleId={id} />
    </main>
  );
}

