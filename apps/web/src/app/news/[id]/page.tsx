import React from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import NewsDetail from "@/components/NewsDetail";
import { apiClient } from '@/lib/api-client';
import { getCategorySlug } from '@/lib/category-utils';
import type { Article } from '@businessfirst/shared-types';

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const id = decodeURIComponent(resolvedParams.id || '');

  try {
    const article = await apiClient.get<Article>(`/articles/slug/${id}`);

    if (!article) {
      return { title: '404 - Page Not Found | Business First' };
    }

    const catSlug = getCategorySlug(article.category?.slug || article.category?.name || '');
    const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessfirstnews.com';
    const baseUrl = rawBaseUrl.replace(/\/+$/, '');
    const canonicalUrl = catSlug
      ? `${baseUrl}/${catSlug}/${encodeURIComponent(article.slug || id)}`
      : `${baseUrl}/news/${encodeURIComponent(article.slug || id)}`;

    let ogImageUrl = article.featuredImage || `${baseUrl}/placeholder-news.jpg`;
    if (ogImageUrl.startsWith('/')) {
      ogImageUrl = `${baseUrl}${ogImageUrl}`;
    }

    const title = article.metaTitle || article.title;
    const description = article.metaDescription || article.excerpt;

    return {
      title,
      description,
      keywords: article.metaKeywords ? article.metaKeywords.split(',').map(k => k.trim()) : undefined,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: 'Business First',
        locale: 'en_US',
        type: 'article',
        publishedTime: article.publishedAt,
        authors: (article.authorName || article.author?.name) ? [article.authorName || article.author!.name] : ['News Desk'],
        images: [
          {
            url: ogImageUrl,
            secureUrl: ogImageUrl.startsWith('https://') ? ogImageUrl : undefined,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@businessfirstuae',
        creator: '@businessfirstuae',
        title,
        description,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    return { title: '404 - Page Not Found | Business First' };
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = decodeURIComponent(resolvedParams.id || '');

  let article: Article | null = null;
  try {
    article = await apiClient.get<Article>(`/articles/slug/${id}`);
    if (!article) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  // 301/308 Permanent Redirect for SEO:
  // Forward all legacy /news/[id] requests to /[category]/[slug]
  const categorySlug = getCategorySlug(article.category?.slug || article.category?.name || '');
  if (categorySlug && categorySlug !== 'news') {
    permanentRedirect(`/${categorySlug}/${article.slug || id}`);
  }

  // Graceful fallback for un-categorized articles
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <NewsDetail articleId={id} />
    </main>
  );
}
