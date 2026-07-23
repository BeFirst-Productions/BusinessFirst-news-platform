// ============================================================
// Shared SEO types for the web front-end.
// The web app fetches PageSeo records from the API and passes
// them to <SeoHead> to inject meta tags into the page <head>.
// ============================================================

import type { Metadata } from 'next';

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'BusinessFirst';

export type TwitterCard = 'SUMMARY' | 'SUMMARY_LARGE_IMAGE';

export type PageType = 'HOME' | 'CONTACT' | 'POLICY' | 'CATEGORY' | 'CUSTOM';

export interface ExtraMetaItem {
  name: string;
  content: string;
}

/** Full PageSeo record returned by GET /seo/public/by-slug/:slug */
export interface PageSeoData {
  id: string;
  slug: string;
  label: string;
  pageType: PageType;
  categoryId: string | null;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterCard: TwitterCard;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  structuredData: Record<string, unknown> | null;
  robots: string | null;
  extraMeta: ExtraMetaItem[] | null;
  isActive: boolean;
}

/** Props accepted by the <SeoHead> component */
export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterCard?: TwitterCard;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
  robots?: string | null;
  extraMeta?: ExtraMetaItem[] | null;
  /** Optional JSON-LD structured data to inject as a <script type="application/ld+json"> */
  structuredData?: Record<string, unknown> | null;
}

/** Maps a full PageSeoData record to SeoHeadProps */
export function mapPageSeoToHeadProps(seo: PageSeoData): SeoHeadProps {
  return {
    title:             seo.metaTitle,
    description:       seo.metaDescription,
    canonicalUrl:      seo.canonicalUrl,
    ogTitle:           seo.ogTitle ?? seo.metaTitle,
    ogDescription:     seo.ogDescription ?? seo.metaDescription,
    ogImage:           seo.ogImage,
    twitterCard:       seo.twitterCard,
    twitterTitle:      seo.twitterTitle ?? seo.ogTitle ?? seo.metaTitle,
    twitterDescription:seo.twitterDescription ?? seo.ogDescription ?? seo.metaDescription,
    twitterImage:      seo.twitterImage ?? seo.ogImage,
    robots:            seo.robots,
    extraMeta:         seo.extraMeta,
    structuredData:    seo.structuredData,
  };
}

export function buildMetadata(props: SeoHeadProps): Metadata {
  const fullTitle = `${props.title} | ${SITE_NAME}`;
  const ogTitle   = props.ogTitle ?? props.title;
  const ogDesc    = props.ogDescription ?? props.description;

  return {
    title: fullTitle,
    description: props.description,
    ...(props.canonicalUrl && {
      alternates: { canonical: props.canonicalUrl },
    }),
    ...(props.robots && {
      robots: props.robots,
    }),
    openGraph: {
      title:       ogTitle,
      description: ogDesc,
      type:        'website',
      ...(props.canonicalUrl && { url: props.canonicalUrl }),
      ...(props.ogImage && { images: [props.ogImage] }),
    },
    twitter: {
      card:        props.twitterCard === 'SUMMARY_LARGE_IMAGE' ? 'summary_large_image' : 'summary',
      title:       props.twitterTitle ?? ogTitle,
      description: props.twitterDescription ?? ogDesc,
      ...(props.twitterImage ?? props.ogImage
        ? { images: [props.twitterImage ?? props.ogImage!] }
        : {}),
    },
  };
}
