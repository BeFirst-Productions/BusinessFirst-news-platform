/**
 * Category URL and Slug utility functions
 * Provides SEO-friendly clean routing and URL resolution
 */

export const SPECIAL_CATEGORY_MAP: Record<string, { name: string; slug: string }> = {
  'uae-news': { name: 'UAE News', slug: 'uae-news' },
  'uae': { name: 'UAE News', slug: 'uae-news' },
  'trending': { name: 'Trending News', slug: 'trending' },
  'trending-news': { name: 'Trending News', slug: 'trending' },
  'sponsored': { name: 'Sponsored Contents', slug: 'sponsored' },
  'sponsored-contents': { name: 'Sponsored Contents', slug: 'sponsored' },
  'featured-analysis': { name: 'Featured Analysis', slug: 'featured-analysis' },
  'featured': { name: 'Featured Analysis', slug: 'featured-analysis' },
  'daily-insights': { name: 'Daily Insights', slug: 'daily-insights' },
};

/**
 * Normalizes any category name or slug into a standard clean URL slug.
 * e.g. "Oil, Gas & Energy" -> "oil-gas-energy"
 *      "UAE News" -> "uae-news"
 *      "Sponsored Contents" -> "sponsored"
 *      "International" -> "international"
 */
export function getCategorySlug(categoryNameOrSlug: string): string {
  if (!categoryNameOrSlug) return '';
  const trimmed = categoryNameOrSlug.trim().toLowerCase();

  // Special cases
  if (trimmed === 'uae news' || trimmed === 'uae' || trimmed === 'uae-news') return 'uae-news';
  if (trimmed === 'trending news' || trimmed === 'trending' || trimmed === 'trending-news') return 'trending';
  if (trimmed === 'sponsored contents' || trimmed === 'sponsored' || trimmed === 'sponsored-contents' || trimmed === 'sponsored content') return 'sponsored';
  if (trimmed === 'featured analysis' || trimmed === 'featured' || trimmed === 'featured-analysis') return 'featured-analysis';
  if (trimmed === 'daily insights' || trimmed === 'daily-insights' || trimmed === 'insights' || trimmed === 'daily insight') return 'daily-insights';

  // Standard sluggify matching DB category slugs
  return trimmed
    .replace(/&/g, '')
    .replace(/,/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Returns the clean SEO URL for a category page.
 * e.g. "UAE News" -> "/uae-news"
 *      "International" -> "/international"
 *      "Oil, Gas & Energy" -> "/oil-gas-energy"
 */
export function getCategoryUrl(categoryNameOrSlug: string): string {
  const slug = getCategorySlug(categoryNameOrSlug);
  return slug ? `/${slug}` : '/news';
}

/**
 * Returns a readable title from a slug as a fallback
 */
export function slugToTitle(slug: string): string {
  if (!slug) return '';
  const special = SPECIAL_CATEGORY_MAP[slug.toLowerCase()];
  if (special) return special.name;

  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export interface ArticleUrlItem {
  slug?: string;
  id?: string | number;
  category?: {
    slug?: string;
    name?: string;
  } | string | null;
  categorySlug?: string;
}

/**
 * Returns the SEO-friendly URL for an article:
 * format: `/[category-slug]/[article-slug]`
 * e.g. `/sustainability-csr/1000-days-uae-humanitarian-support-palestinian-people`
 *
 * Falls back to `/news/[article-slug]` if no category is assigned.
 */
export function getArticleUrl(
  article?: ArticleUrlItem | null,
  fallbackCategory?: string
): string {
  if (!article) return '/news';
  const articleSlug = article.slug || (article.id ? String(article.id) : '');
  if (!articleSlug) return '/news';

  let rawCat = '';
  if (article.categorySlug) {
    rawCat = article.categorySlug;
  } else if (article.category && typeof article.category === 'object') {
    rawCat = article.category.slug || article.category.name || '';
  } else if (typeof article.category === 'string') {
    rawCat = article.category;
  }

  if (!rawCat && fallbackCategory) {
    rawCat = fallbackCategory;
  }

  const catSlug = getCategorySlug(rawCat);
  if (!catSlug || catSlug === 'news') {
    return `/news/${articleSlug}`;
  }

  return `/${catSlug}/${articleSlug}`;
}

