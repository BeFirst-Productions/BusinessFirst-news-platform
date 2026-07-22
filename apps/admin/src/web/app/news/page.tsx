import React, { Suspense } from 'react';
import { getPageSeoProps } from '@/web/lib/fetchPageSeo';
import { buildMetadata } from '@/web/components/seo/seo.types';
import CategoryListing from "@/web/components/CategoryListing";

interface Props {
  searchParams: { category?: string };
}

export async function generateMetadata({ searchParams }: Props) {
  const categoryName = searchParams.category || 'Latest News';
  // convert category name to category slug format like 'category/uae-news'
  const categorySlug = categoryName === 'Latest News'
    ? 'news'
    : `category/${categoryName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')}`;

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
