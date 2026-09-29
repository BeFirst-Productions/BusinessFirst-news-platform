import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

// Revalidate llms.txt hourly in background (ISR)
export const revalidate = 3600;

interface ArticleSummary {
  title: string;
  slug: string;
  excerpt?: string | null;
}

export async function GET() {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessfirstnews.com';
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');

  let latestArticles: ArticleSummary[] = [];
  try {
    const res: any = await apiClient.get('/articles?limit=8&sortBy=publishedAt&sortOrder=desc', {
      timeout: 5000,
    });
    const items = Array.isArray(res) ? res : (res?.data || res?.articles || []);
    if (Array.isArray(items)) {
      latestArticles = items.slice(0, 8);
    }
  } catch (error) {
    // Graceful fallback: If API is unavailable, static content is still served reliably
    console.error('Failed to fetch articles for llms.txt:', error);
  }

  const articlesMarkdown = latestArticles.length > 0
    ? latestArticles
        .filter((a) => Boolean(a?.title && a?.slug))
        .map((a) => {
          const cleanExcerpt = (a.excerpt || '').replace(/[\r\n]+/g, ' ').trim();
          return `- [${a.title}](${baseUrl}/news/${encodeURIComponent(a.slug)})${cleanExcerpt ? `: ${cleanExcerpt}` : ''}`;
        })
        .join('\n')
    : `- Visit [Latest News](${baseUrl}/news) for current coverage.`;

  const content = `# Business First (BF News)
> Leading business, economy, real estate, technology, and regional news platform covering the UAE, MENA, and global markets.

## About Business First
Business First is an independent digital news publication providing breaking business news, key sector insights, economic analysis, and exclusive corporate coverage.

## Core Categories
- [Real Estate & Construction](${baseUrl}/news?category=real-estate-construction): Property deals, developments, and infrastructure.
- [Economy & Policy](${baseUrl}/news?category=economy-policy): Macroeconomic trends, fiscal policies, and government initiatives.
- [Technology & Innovation](${baseUrl}/news?category=technology-innovation): Digital transformation, tech investments, and AI.
- [Banking & Finance](${baseUrl}/news?category=banking-finance): Financial markets, fintech, and banking sector updates.
- [Oil, Gas & Energy](${baseUrl}/news?category=oil-gas-energy): Energy sector, renewables, and petroleum news.
- [UAE News](${baseUrl}/news?category=uae-news): Local regional developments across Dubai, Abu Dhabi, and the Emirates.

## Latest Published Stories
${articlesMarkdown}

## Legal & Editorial Policies
- [Editorial Policy](${baseUrl}/editorial-policy): Journalism standards and ethics.
- [Corrections Policy](${baseUrl}/corrections-policy): Commitment to accuracy and transparency.
- [Copyright Policy](${baseUrl}/copyright-policy): Intellectual property and AI mining terms.
- [Privacy Policy](${baseUrl}/privacy-policy): User data protection.
- [Terms & Conditions](${baseUrl}/terms): Usage terms.

## Contact & Inquiries
- Editorial Desk: editorial@businessfirstnews.com
- Advertising: ads@businessfirstnews.com
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
