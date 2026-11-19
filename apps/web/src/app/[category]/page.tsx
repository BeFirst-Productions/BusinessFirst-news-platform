import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import CategoryListing from '@/components/CategoryListing';
import { apiClient } from '@/lib/api-client';
import { isCategoryValid, findCategory } from '@/lib/category-validation';
import { getCategorySlug, SPECIAL_CATEGORY_MAP, slugToTitle } from '@/lib/category-utils';
import type { Category } from '@businessfirst/shared-types';

interface PageProps {
  params: Promise<{ category: string }> | { category: string };
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

async function resolveCategory(rawCategory: string) {
  const raw = decodeURIComponent(rawCategory || '').trim().toLowerCase();
  if (!raw || raw.includes('.') || RESERVED_SLUGS.has(raw)) {
    return null;
  }
  const cleanSlug = getCategorySlug(raw);
  if (RESERVED_SLUGS.has(cleanSlug)) {
    return null;
  }

  // Check special categories
  if (SPECIAL_CATEGORY_MAP[cleanSlug]) {
    return {
      slug: cleanSlug,
      name: SPECIAL_CATEGORY_MAP[cleanSlug].name,
      isSpecial: true,
    };
  }

  // Fetch active categories to validate against database
  let categories: Category[] = [];
  try {
    categories = await apiClient.get<Category[]>('/categories', {
      params: { isActive: true },
      next: { revalidate: 3600, tags: ['categories'] },
    });
  } catch (error) {
    // Network / API blip fallback
  }

  if (isCategoryValid(cleanSlug, categories)) {
    const matched = findCategory(categories, cleanSlug);
    return {
      slug: cleanSlug,
      name: matched?.name || slugToTitle(cleanSlug),
      isSpecial: false,
      category: matched,
    };
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawCategory = resolvedParams.category;
  if (!rawCategory) return { title: '404 - Page Not Found | Business First' };

  const resolved = await resolveCategory(rawCategory);
  if (!resolved) {
    return { title: '404 - Page Not Found | Business First' };
  }

  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessfirstnews.com';
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');
  const canonicalPath = `/${resolved.slug}`;

  // Fetch database PageSeo record (supports 'category/slug' or 'slug')
  const seoProps = await getPageSeoProps(resolved.slug);

  // If no custom title was specified in DB PageSeo, provide rich editorial title
  const title =
    seoProps.title && !seoProps.title.includes('BusinessFirst News')
      ? seoProps.title
      : `${resolved.name} – Latest News & Updates | BusinessFirst`;

  const description =
    seoProps.description && !seoProps.description.includes('Latest business news, analysis and insights')
      ? seoProps.description
      : `Explore the latest news, market trends, and in-depth business coverage on ${resolved.name} from BusinessFirst.`;

  return buildMetadata({
    ...seoProps,
    title,
    description,
    canonicalUrl: seoProps.canonicalUrl || `${baseUrl}${canonicalPath}`,
  });
}

export default async function DynamicCategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawCategory = resolvedParams.category;
  if (!rawCategory) notFound();

  const resolved = await resolveCategory(rawCategory);
  if (!resolved) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-[#24214c] font-semibold text-lg">
            Loading {resolved.name}...
          </div>
        }
      >
        <CategoryListing
          initialSlug={resolved.slug}
          initialCategoryName={resolved.name}
        />
      </Suspense>
    </main>
  );
}
