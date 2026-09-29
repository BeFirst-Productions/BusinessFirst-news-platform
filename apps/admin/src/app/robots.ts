import { MetadataRoute } from 'next';

/**
 * Professional Bot Exclusion for Admin Panel
 * Completely disallows all search engine crawlers from indexing administrative routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
