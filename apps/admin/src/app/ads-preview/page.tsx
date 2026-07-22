import { Suspense } from 'react';


// Import components
import TopHeadlines from '@/components/preview/TopHeadlines';
import FullWidthAdBanner from '@/components/preview/FullWidthAdBanner';
import SectionContainer from '@/components/preview/SectionContainer';
import NewsGridSection from '@/components/preview/NewsGridSection';
import CategoryNewsSection from '@/components/preview/CategoryNewsSection';
import LogisticsAviationSection from '@/components/preview/LogisticsAviationSection';
import SponsoredContents from '@/components/preview/SponsoredContents';
import TechnologyInnovation from '@/components/preview/TechnologyInnovation';
import NewsletterBanner from '@/components/preview/NewsletterBanner';
import OilSportsSection from '@/components/preview/OilSportsSection';
import BankingFinanceSection from '@/components/preview/BankingFinanceSection';
import DailyInsightsSection from '@/components/preview/DailyInsightsSection';
import HealthcareTourismSection from '@/components/preview/HealthcareTourismSection';
import EventsSection from '@/components/preview/EventsSection';
import MediaCoverageSection from '@/components/preview/MediaCoverageSection';
import CultureLifestyleSection from '@/components/preview/CultureLifestyleSection';
import SocialMediaSection from '@/components/preview/SocialMediaSection';

// Import contact components
import ContactBreadcrumbs from '@/components/contact/ContactBreadcrumbs';
import ContactNewsroom from '@/components/contact/ContactNewsroom';
import ContactSocials from '@/components/contact/ContactSocials';
import ContactForm from '@/components/contact/ContactForm';
import ContactMap from '@/components/contact/ContactMap';

// Import NewsDetail component
import NewsDetail from '@/components/preview/NewsDetail';

// Skeleton loaders for Suspense fallbacks
import { Skeleton } from '@/components/ui/Skeleton';
import Header from '@/web/components/Header';
import Footer from '@/components/preview/Footer';
// import { AdBannerSkeleton } from '@/components/ads/AdBannerSkeleton'; // Missing in admin


// ==================== REVALIDATION ====================

// ISR: Revalidate every 5 minutes for fresh content
export const revalidate = 300;

// Force dynamic to ensure fresh data on each request
export const dynamic = 'force-dynamic';

// ==================== PAGE COMPONENT ====================

interface AdsPreviewPageProps {
  searchParams?: {
    page?: string;
  };
}

export default function HomePage({ searchParams }: AdsPreviewPageProps) {
  const page = searchParams?.page || 'home';

  if (page === 'news_detail') {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center w-full">
        <Header />

        <Suspense fallback={<SectionSkeleton />}>
          <NewsDetail />
        </Suspense>

        <Footer />
      </main>
    );
  }

  if (page === 'contact') {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center w-full">
        <Header />

        {/* Breadcrumbs */}
        <ContactBreadcrumbs />

        {/* Main Section */}
        <SectionContainer className="bg-white">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center w-full">
            {/* Left Column: Heading and Text */}
            <ContactNewsroom />

            {/* Right Column: Social Media Card */}
            <ContactSocials />
          </div>

          {/* Lower Row: Form & Map */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch w-full mt-16">
            {/* Contact Form */}
            <ContactForm />

            {/* Map Section */}
            <ContactMap />
          </div>

          <div className="w-full py-8 md:py-12">
            <Suspense fallback={<Skeleton className="w-full h-[250px]" />}>
              <FullWidthAdBanner containerClassName="w-full" ratio="contact_bottom" />
            </Suspense>
          </div>
        </SectionContainer>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <Header />
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
            <Suspense fallback={<Skeleton className="w-full h-[250px]" />}>
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
      <Footer />
    </main>
  );
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