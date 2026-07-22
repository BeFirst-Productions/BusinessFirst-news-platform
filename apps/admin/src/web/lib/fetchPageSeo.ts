/**
 * Lightweight server-side helper for fetching PageSeo records
 * from the API.  Intended for use in Next.js generateMetadata()
 * or server components.
 *
 * Public endpoint – no auth token required.
 */

import { PageSeoData, mapPageSeoToHeadProps, SeoHeadProps } from '@/web/components/seo/seo.types';

const API_BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8083/api/v1';

/**
 * Fetch SEO data for a given page slug.
 * Returns null if no record was found (404) or on network error.
 *
 * @param slug – page slug without leading slash,
 *               e.g. "" (home), "contact", "category/tech"
 */
export async function fetchPageSeo(slug: string): Promise<PageSeoData | null> {
  const encodedSlug = encodeURIComponent(slug);
  try {
    const res = await fetch(`${API_BASE}/seo/public/by-slug/${encodedSlug}`, {
      // Revalidate every 5 minutes in production
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const data = json?.data as PageSeoData | undefined;
    return data?.isActive ? data : null;
  } catch {
    return null;
  }
}

/** Default fallback SEO props used when no record exists in the DB */
const DEFAULT_SEO: SeoHeadProps = {
  title:       'BusinessFirst News',
  description: 'Latest business news, analysis and insights.',
  robots:      'index, follow',
  twitterCard: 'SUMMARY_LARGE_IMAGE',
};

/**
 * Fetches the PageSeo record for a slug and converts it to SeoHeadProps.
 * Falls back to DEFAULT_SEO if the record is missing or inactive.
 */
export async function getPageSeoProps(slug: string): Promise<SeoHeadProps> {
  const seo = await fetchPageSeo(slug);
  if (!seo) return DEFAULT_SEO;
  return mapPageSeoToHeadProps(seo);
}
