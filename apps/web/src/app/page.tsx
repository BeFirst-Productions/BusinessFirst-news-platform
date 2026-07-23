import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import { createQueryClient } from '@/lib/query-client';
import { apiClient } from '@/lib/api-client';
import { articleKeys, categoryKeys, adKeys } from '@/lib/query-keys';
import type { Article, Category, Ad } from '@businessfirst/shared-types';

// Import components
import TopHeadlines from '@/components/TopHeadlines';
import FullWidthAdBanner from '@/components/FullWidthAdBanner';
import SectionContainer from '@/components/SectionContainer';
import NewsGridSection from '@/components/NewsGridSection';
import CategoryNewsSection from '@/components/CategoryNewsSection';
import LogisticsAviationSection from '@/components/LogisticsAviationSection';
import SponsoredContents from '@/components/SponsoredContents';
import TechnologyInnovation from '@/components/TechnologyInnovation';
import NewsletterBanner from '@/components/NewsletterBanner';
import OilSportsSection from '@/components/OilSportsSection';
import BankingFinanceSection from '@/components/BankingFinanceSection';
import DailyInsightsSection from '@/components/DailyInsightsSection';
import HealthcareTourismSection from '@/components/HealthcareTourismSection';
import EventsSection from '@/components/EventsSection';
import MediaCoverageSection from '@/components/MediaCoverageSection';
import CultureLifestyleSection from '@/components/CultureLifestyleSection';
import SocialMediaSection from '@/components/SocialMediaSection';

// Skeleton loaders for Suspense fallbacks
import { Skeleton } from '@/components/ui/Skeleton';
import { AdBannerSkeleton } from '@/components/ads/AdBannerSkeleton';

// ==================== METADATA ====================

export async function generateMetadata() {
  const seoProps = await getPageSeoProps('');
  return buildMetadata(seoProps);
}

// ==================== REVALIDATION ====================

// ISR: Revalidate every 5 minutes for fresh content
export const revalidate = 300;

// Force dynamic to ensure fresh data on each request
export const dynamic = 'force-dynamic';

// ==================== PAGE COMPONENT ====================

export default async function HomePage() {
  const queryClient = createQueryClient();

  // Prefetch all required data on the server
  await Promise.all([
    // Prefetch featured/breaking articles for NewsGridSection
    queryClient.prefetchQuery({
      queryKey: articleKeys.list({ isFeatured: true, limit: 8, status: 'PUBLISHED' }),
      queryFn: async () => {
        const response = await apiClient.getPaginated<Article>('/articles', {
          params: {
            isFeatured: true,
            status: 'PUBLISHED',
            limit: 8,
            sortBy: 'publishedAt',
            sortOrder: 'desc',
          },
          next: {
            revalidate: 300,
            tags: ['homepage-featured-articles'],
          },
        });
        return response;
      },
    }),

    // Prefetch breaking news for TopHeadlines
    queryClient.prefetchQuery({
      queryKey: articleKeys.breaking(),
      queryFn: async () => {
        const response = await apiClient.getPaginated<Article>('/articles', {
          params: {
            isBreakingNews: true,
            status: 'PUBLISHED',
            limit: 5,
            sortBy: 'publishedAt',
            sortOrder: 'desc',
          },
          next: {
            revalidate: 60, // More frequent for breaking news
            tags: ['homepage-breaking-news'],
          },
        });
        return response;
      },
    }),

    // Prefetch categories for navigation and sections
    queryClient.prefetchQuery({
      queryKey: categoryKeys.lists(),
      queryFn: async () => {
        const categories = await apiClient.get<Category[]>('/categories', {
          params: {
            isActive: true,
            sortBy: 'order',
            sortOrder: 'asc',
          },
          next: {
            revalidate: 3600, // Cache categories for 1 hour
            tags: ['categories'],
          },
        });
        return categories;
      },
    }),

    // Prefetch ads for home page
    queryClient.prefetchQuery({
      queryKey: adKeys.page('home'),
      queryFn: async () => {
        const ads = await apiClient.get<Ad[]>('/ads', {
          params: {
            targetPage: 'home',
            status: 'ACTIVE',
            limit: 50,
          },
          next: {
            revalidate: 300,
            tags: ['ad-page-home'],
          },
        });
        return ads;
      },
    }),

    // Prefetch category-specific articles for each section
    prefetchCategoryArticles(queryClient, 'technology', 'technology-innovation'),
    prefetchCategoryArticles(queryClient, 'logistics-aviation', 'logistics-aviation'),
    prefetchCategoryArticles(queryClient, 'oil-gas', 'oil-sports'),
    prefetchCategoryArticles(queryClient, 'banking-finance', 'banking-finance'),
    prefetchCategoryArticles(queryClient, 'healthcare-tourism', 'healthcare-tourism'),
    prefetchCategoryArticles(queryClient, 'events', 'events'),
    prefetchCategoryArticles(queryClient, 'media-coverage', 'media-coverage'),
    prefetchCategoryArticles(queryClient, 'culture-lifestyle', 'culture-lifestyle'),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen bg-white flex flex-col items-center w-full">
        {/* Breaking News Ticker */}
        <Suspense fallback={<Skeleton className="h-12 w-full bg-red-100" />}>
          <TopHeadlines />
        </Suspense>

        <div className="flex flex-col w-full">
          {/* Featured News Grid */}
          <div className="order-1 w-full">
            <Suspense fallback={<NewsGridSkeleton />}>
              <NewsGridSection />
            </Suspense>
          </div>

          {/* Full Width Ad Banner */}
          <div className="order-3 lg:order-2 w-full">
            <SectionContainer containerClassName="py-8 md:py-12">
              <Suspense fallback={<AdBannerSkeleton />}>
                <FullWidthAdBanner containerClassName="w-full" ratio="ad_4" />
              </Suspense>
            </SectionContainer>
          </div>

          {/* Category News Section */}
          <div className="order-2 lg:order-3 w-full">
            <Suspense fallback={<NewsGridSkeleton />}>
              <CategoryNewsSection />
            </Suspense>
          </div>
        </div>

        {/* Category-Specific Sections */}
        <Suspense fallback={<SectionSkeleton />}>
          <SponsoredContents />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <TechnologyInnovation />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <NewsletterBanner />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <LogisticsAviationSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <OilSportsSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <BankingFinanceSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <DailyInsightsSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <HealthcareTourismSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <EventsSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <MediaCoverageSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CultureLifestyleSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <SocialMediaSection />
        </Suspense>
      </main>
    </HydrationBoundary>
  );
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Prefetch articles for a specific category section
 */
async function prefetchCategoryArticles(
  queryClient: QueryClient,
  categorySlug: string,
  sectionName: string
) {
  try {
    // First get the category
    const category = await apiClient.get<Category>(
      `/categories/slug/${categorySlug}`,
      {
        next: {
          revalidate: 3600,
          tags: [`category-${categorySlug}`],
        },
      }
    );

    if (category) {
      // Then prefetch articles for that category
      await queryClient.prefetchQuery({
        queryKey: articleKeys.byCategory(categorySlug),
        queryFn: async () => {
          const response = await apiClient.getPaginated<Article>('/articles', {
            params: {
              categoryId: category.id,
              status: 'PUBLISHED',
              limit: 6,
              sortBy: 'publishedAt',
              sortOrder: 'desc',
            },
            next: {
              revalidate: 300,
              tags: [`homepage-${sectionName}`],
            },
          });
          return { category, ...response };
        },
      });
    }
  } catch (error) {
    // Silently fail for individual sections
    console.error(`Failed to prefetch ${sectionName}:`, error);
  }
}

// ==================== SKELETON COMPONENTS ====================

function NewsGridSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}