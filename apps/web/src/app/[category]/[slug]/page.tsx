import React from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import NewsDetail from "@/components/NewsDetail";
import { apiClient } from '@/lib/api-client';
import { getCategorySlug } from '@/lib/category-utils';
import type { Article } from '@businessfirst/shared-types';

interface PageProps {
  params: Promise<{ category: string; slug: string }> | { category: string; slug: string };
}

// Known static routes and reserved system slugs that should never match this route
const RESERVED_SLUGS = new Set([
  'about',
  'advertise',
  'api',
  'contact',
  'cookie-policy',
  'copyright-policy',
  'corrections-policy',
  'disclaimer',
  'editorial-policy',
  'llms.txt',
  'news',
  'policy',
  'privacy-policy',
  'terms',
  'robots.txt',
  'sitemap.xml',
  '_next',
  'favicon.ico',
  'icon.svg',
  'placeholder-news.jpg',
  'ads',
  'logo',
]);

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const rawCategory = decodeURIComponent(resolvedParams.category || '');
  const rawSlug = decodeURIComponent(resolvedParams.slug || '');

  if (!rawCategory || !rawSlug || rawCategory.includes('.') || rawSlug.includes('.') || RESERVED_SLUGS.has(rawCategory.toLowerCase())) {
    return { title: '404 - Page Not Found | Business First' };
  }

  try {
    const article = await apiClient.get<Article>(`/articles/slug/${rawSlug}`);

    if (!article) {
      return { title: '404 - Page Not Found | Business First' };
    }

    const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessfirstnews.com';
    const baseUrl = rawBaseUrl.replace(/\/+$/, '');
    const canonicalCategory = getCategorySlug(article.category?.slug || article.category?.name || rawCategory);
    const canonicalUrl = `${baseUrl}/${canonicalCategory}/${encodeURIComponent(article.slug || rawSlug)}`;

    const title = article.metaTitle || article.title;
    const description = article.metaDescription || article.excerpt || '';

    // Robust absolute image resolution for social platforms (WhatsApp, Facebook, LinkedIn, X)
    let ogImageUrl = article.featuredImage || `${baseUrl}/placeholder-news.jpg`;
    if (ogImageUrl.startsWith('/')) {
      ogImageUrl = `${baseUrl}${ogImageUrl}`;
    }

    return {
      title: `${title} | BusinessFirst`,
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
        modifiedTime: article.updatedAt || article.publishedAt,
        section: article.category?.name || 'News',
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

export default async function DynamicArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawCategory = decodeURIComponent(resolvedParams.category || '');
  const rawSlug = decodeURIComponent(resolvedParams.slug || '');

  if (!rawCategory || !rawSlug || rawCategory.includes('.') || rawSlug.includes('.') || RESERVED_SLUGS.has(rawCategory.toLowerCase())) {
    notFound();
  }

  let article: Article | null = null;
  try {
    article = await apiClient.get<Article>(`/articles/slug/${rawSlug}`);
    if (!article) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  // Canonical Category Enforcement:
  // If the URL category slug does not match the article's true category slug,
  // 301 permanent redirect to the canonical category URL to avoid duplicate content
  const actualCategorySlug = getCategorySlug(article.category?.slug || article.category?.name || '');
  if (actualCategorySlug && rawCategory.toLowerCase() !== actualCategorySlug.toLowerCase()) {
    permanentRedirect(`/${actualCategorySlug}/${article.slug || rawSlug}`);
  }

  // Google SEO Rich Snippets: NewsArticle + BreadcrumbList JSON-LD
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessfirstnews.com';
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');
  const catSlug = actualCategorySlug || rawCategory;
  const canonicalUrl = `${baseUrl}/${catSlug}/${encodeURIComponent(article.slug || rawSlug)}`;
  const categoryName = article.category?.name || 'News';

  let ogImageUrl = article.featuredImage || `${baseUrl}/placeholder-news.jpg`;
  if (ogImageUrl.startsWith('/')) {
    ogImageUrl = `${baseUrl}${ogImageUrl}`;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        '@id': `${canonicalUrl}#article`,
        headline: article.title,
        description: article.metaDescription || article.excerpt,
        image: [ogImageUrl],
        datePublished: article.publishedAt || article.createdAt,
        dateModified: article.updatedAt || article.publishedAt || article.createdAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        author: {
          '@type': 'Person',
          name: article.authorName || article.author?.name || 'News Desk',
        },
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: 'BusinessFirst',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/icon.svg`,
          },
        },
        articleSection: categoryName,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: categoryName,
            item: `${baseUrl}/${catSlug}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white flex flex-col items-center w-full">
        <NewsDetail articleId={rawSlug} />
      </main>
    </>
  );
}
