// ============================================================
// Shared SEO types used across admin panel components and API
// client calls.  These mirror the Prisma model and API DTOs.
// ============================================================

export type TwitterCard = 'SUMMARY' | 'SUMMARY_LARGE_IMAGE';

export type PageType = 'HOME' | 'CONTACT' | 'POLICY' | 'CATEGORY' | 'CUSTOM';

export interface ExtraMetaItem {
  name: string;
  content: string;
}

/** Full PageSeo record returned by the API */
export interface PageSeoRecord {
  id: string;
  slug: string;
  label: string;
  pageType: PageType;
  categoryId: string | null;
  category: { id: string; name: string; slug: string } | null;
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
  createdAt: string;
  updatedAt: string;
}

/** Payload for creating a new PageSeo record */
export interface CreatePageSeoDto {
  slug: string;
  label: string;
  pageType: PageType;
  categoryId?: string | null;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterCard?: TwitterCard;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
  structuredData?: Record<string, unknown> | null;
  robots?: string | null;
  extraMeta?: ExtraMetaItem[] | null;
  isActive?: boolean;
}

/** Payload for updating (all fields optional) */
export type UpdatePageSeoDto = Partial<Omit<CreatePageSeoDto, 'slug'>>;

/** Page-type display metadata for the UI */
export const PAGE_TYPE_META: Record<PageType, { label: string; color: string; description: string }> = {
  HOME:     { label: 'Home',     color: 'bg-blue-100 text-blue-800',   description: 'Homepage / Landing page' },
  CONTACT:  { label: 'Contact',  color: 'bg-green-100 text-green-800', description: 'Contact us page' },
  POLICY:   { label: 'Policy',   color: 'bg-purple-100 text-purple-800',description: 'Privacy, terms & policy pages' },
  CATEGORY: { label: 'Category', color: 'bg-orange-100 text-orange-800',description: 'Category article listing page' },
  CUSTOM:   { label: 'Custom',   color: 'bg-gray-100 text-gray-800',   description: 'Custom / other page' },
};
