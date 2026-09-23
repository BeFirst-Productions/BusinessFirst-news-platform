import React, { Suspense } from 'react';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import CategoryListing from "@/components/CategoryListing";

interface Props {
  searchParams: { category?: string; isSponsored?: string; search?: string; q?: string; isTrending?: string; isUaeNews?: string };
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

export default function NewsPage() {
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
