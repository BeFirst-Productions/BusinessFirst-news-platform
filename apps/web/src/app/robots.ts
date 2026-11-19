import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessfirstnews.com';
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');

  return {
    rules: [
      // 1. Standard Search Engines (Always Allowed)
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },

      // 2. AI Citation & Real-time Search Bots (Allowed - They give attribution & backlink traffic)
      {
        userAgent: ['PerplexityBot', 'ChatGPT-User', 'Claude-Web'],
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },

      // 3. AI Bulk Scrapers & Dataset Training Crawlers (Blocked as per Copyright Policy)
      {
        userAgent: [
          'GPTBot',          // OpenAI model training
          'ClaudeBot',       // Anthropic model training
          'Google-Extended', // Gemini training (separate from Google Search Googlebot)
          'CCBot',           // Common Crawl dataset scraper
          'Bytespider',      // ByteDance / TikTok scraper
          'FacebookBot',     // Meta AI training
          'Diffbot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
