import React, { Suspense } from 'react';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import CategoryListing from "@/components/CategoryListing";

interface Props {
  searchParams: { category?: string; isSponsored?: string };
}

export async function generateMetadata({ searchParams }: Props) {
  const isSponsoredParam = searchParams.isSponsored === 'true';
  const categoryName = searchParams.category || 'Latest News';
  
  let categorySlug = 'news';
  if (isSponsoredParam || categoryName === 'Sponsored Contents') {
    categorySlug = 'sponsored';
  } else if (categoryName === 'UAE News') {
    categorySlug = 'uae-news';
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
