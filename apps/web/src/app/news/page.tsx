import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import CategoryListing from "@/components/CategoryListing";
import { apiClient } from '@/lib/api-client';
import { isCategoryValid } from '@/lib/category-validation';
import type { Category } from '@businessfirst/shared-types';

interface Props {
  searchParams: {
    category?: string;
    isSponsored?: string;
    search?: string;
    q?: string;
    isTrending?: string;
    isUaeNews?: string;
    isFeatured?: string;
  };
}

export async function generateMetadata({ searchParams }: Props) {
  const searchQuery = (searchParams.search || searchParams.q || '').trim();
  if (searchQuery) {
    return buildMetadata({
      title: `Search: "${searchQuery}" | BusinessFirst`,
      description: `Search results for "${searchQuery}" across BusinessFirst news, analysis, and reports.`,
      canonicalUrl: `/news?search=${encodeURIComponent(searchQuery)}`,
    });
  }

  const isSponsoredParam = searchParams.isSponsored === 'true';
  const isTrendingParam = searchParams.isTrending === 'true';
  const isUaeNewsParam = searchParams.isUaeNews === 'true';
  const rawCat = searchParams.category || '';

  if (rawCat && !isSponsoredParam && !isTrendingParam && !isUaeNewsParam && searchParams.isFeatured !== 'true') {
    let categories: Category[] = [];
    try {
      categories = await apiClient.get<Category[]>('/categories', {
        params: { isActive: true },
        next: { revalidate: 3600, tags: ['categories'] },
      });
    } catch {
      // ignore
    }

    if (!isCategoryValid(rawCat, categories)) {
      return { title: '404 - Page Not Found | Business First' };
    }
  }

  const isTrending = isTrendingParam || rawCat.toLowerCase() === 'trending news' || rawCat.toLowerCase() === 'trending';
  const isUaeNews = isUaeNewsParam || rawCat.toLowerCase() === 'uae news' || rawCat.toLowerCase() === 'uae';
  const isSponsored = isSponsoredParam || rawCat.toLowerCase() === 'sponsored contents' || rawCat.toLowerCase() === 'sponsored';

  const categoryName = isSponsored
    ? 'Sponsored Contents'
    : isTrending
      ? 'Trending News'
      : isUaeNews
        ? 'UAE News'
        : (searchParams.category || 'Latest News');

  let categorySlug = 'news';
  if (isSponsored) {
    categorySlug = 'sponsored';
  } else if (isUaeNews) {
    categorySlug = 'uae-news';
  } else if (isTrending) {
    categorySlug = 'trending';
  } else if (categoryName !== 'Latest News') {
    categorySlug = `category/${categoryName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')}`;
  }

  const seoProps = await getPageSeoProps(categorySlug);
  return buildMetadata(seoProps);
}

export default async function NewsPage({ searchParams }: Props) {
  const rawCat = searchParams.category || '';
  const searchQuery = (searchParams.search || searchParams.q || '').trim();
  const isSpecialParam =
    searchParams.isSponsored === 'true' ||
    searchParams.isTrending === 'true' ||
    searchParams.isUaeNews === 'true' ||
    searchParams.isFeatured === 'true';

  if (rawCat && !searchQuery && !isSpecialParam) {
    let categories: Category[] = [];
    try {
      categories = await apiClient.get<Category[]>('/categories', {
        params: { isActive: true },
        next: { revalidate: 3600, tags: ['categories'] },
      });
    } catch {
      // ignore
    }

    if (!isCategoryValid(rawCat, categories)) {
      notFound();
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-[#24214c] font-semibold text-lg">
          Loading News...
        </div>
      }>
        <CategoryListing />
      </Suspense>
    </main>
  );
}
