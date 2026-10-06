import React, { Suspense } from 'react';
import { permanentRedirect } from 'next/navigation';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import CategoryListing from '@/components/CategoryListing';
import { getCategoryUrl, getCategorySlug } from '@/lib/category-utils';

interface Props {
  searchParams: {
    category?: string;
    isSponsored?: string;
    search?: string;
    q?: string;
    isTrending?: string;
    isUaeNews?: string;
    isFeatured?: string;
    page?: string;
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

  const isSponsored = searchParams.isSponsored === 'true';
  const isTrending = searchParams.isTrending === 'true';
  const isUaeNews = searchParams.isUaeNews === 'true';
  const isFeatured = searchParams.isFeatured === 'true';
  const rawCat = searchParams.category;

  if (rawCat || isSponsored || isTrending || isUaeNews || isFeatured) {
    let target = rawCat || '';
    if (isSponsored) target = 'sponsored';
    else if (isTrending) target = 'trending';
    else if (isUaeNews) target = 'uae-news';
    else if (isFeatured) target = 'featured-analysis';

    const slug = getCategorySlug(target);
    const seoProps = await getPageSeoProps(slug);
    return buildMetadata({
      ...seoProps,
      canonicalUrl: `/${slug}`,
    });
  }

  const seoProps = await getPageSeoProps('news');
  return buildMetadata(seoProps);
}

export default async function NewsPage({ searchParams }: Props) {
  const searchQuery = (searchParams.search || searchParams.q || '').trim();
  const rawCat = searchParams.category;
  const isSponsored = searchParams.isSponsored === 'true';
  const isTrending = searchParams.isTrending === 'true';
  const isUaeNews = searchParams.isUaeNews === 'true';
  const isFeatured = searchParams.isFeatured === 'true';

  // Issue 301 Permanent Redirect for legacy query parameter URLs to clean URLs
  if (!searchQuery && (rawCat || isSponsored || isTrending || isUaeNews || isFeatured)) {
    let targetCategory = rawCat || '';
    if (isSponsored) targetCategory = 'sponsored';
    else if (isTrending) targetCategory = 'trending';
    else if (isUaeNews) targetCategory = 'uae-news';
    else if (isFeatured) targetCategory = 'featured-analysis';

    let targetUrl = getCategoryUrl(targetCategory);
    if (searchParams.page && parseInt(searchParams.page, 10) > 1) {
      targetUrl += `?page=${searchParams.page}`;
    }
    permanentRedirect(targetUrl);
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-[#24214c] font-semibold text-lg">
            Loading News...
          </div>
        }
      >
        <CategoryListing />
      </Suspense>
    </main>
  );
}
