import { MetadataRoute } from 'next';
import { apiClient } from '@/lib/api-client';

// Revalidate sitemap every hour in ISR background
export const revalidate = 3600;

interface SitemapArticle {
  slug: string;
  updatedAt?: string | null;
  publishedAt?: string | null;
  category?: {
    slug?: string | null;
  } | null;
}

interface SitemapCategory {
  slug: string;
  updatedAt?: string | null;
}

interface SitemapData {
  articles: SitemapArticle[];
  categories: SitemapCategory[];
}

const parseSafeDate = (dateVal: string | null | undefined): Date => {
  if (!dateVal) return new Date();
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? new Date() : d;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessfirstnews.com';
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');

  // 1. Core Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/advertise`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/corrections-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/copyright-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Dynamic Articles & Categories from API
  let articleRoutes: MetadataRoute.Sitemap = [];
  let categoryRoutes: MetadataRoute.Sitemap = [];

  try {
    const response = await apiClient.get<SitemapData>('/sitemap-entries', {
      timeout: 10000,
    });

    if (response?.articles && Array.isArray(response.articles)) {
      articleRoutes = response.articles
        .filter((article) => Boolean(article?.slug))
        .map((article) => {
          const catSegment = article.category?.slug
            ? encodeURIComponent(article.category.slug)
            : 'news';
          return {
            url: `${baseUrl}/${catSegment}/${encodeURIComponent(article.slug)}`,
            lastModified: parseSafeDate(article.updatedAt || article.publishedAt),
            changeFrequency: 'daily',
            priority: 0.8,
          };
        });
    }

    if (response?.categories && Array.isArray(response.categories)) {
      categoryRoutes = response.categories
        .filter((category) => Boolean(category?.slug))
        .map((category) => ({
          url: `${baseUrl}/${encodeURIComponent(category.slug)}`,
          lastModified: parseSafeDate(category.updatedAt),
          changeFrequency: 'daily',
          priority: 0.7,
        }));
    }
  } catch (error) {
    // If API is temporarily unavailable during build or network blip,
    // graceful fallback ensures static routes are still served to search engines
    console.error('Failed to fetch dynamic sitemap entries:', error);
  }

  // Curated prominent landing sections
  const curatedSections: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/uae-news`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sponsored`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/featured-analysis`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/daily-insights`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  // Guaranteed URL deduplication for Search Console compliance
  const allEntries = [...staticRoutes, ...curatedSections, ...categoryRoutes, ...articleRoutes];
  const uniqueUrlMap = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of allEntries) {
    if (!uniqueUrlMap.has(entry.url)) {
      uniqueUrlMap.set(entry.url, entry);
    }
  }

  return Array.from(uniqueUrlMap.values());
}