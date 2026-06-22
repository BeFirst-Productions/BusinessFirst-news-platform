import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import TopHeadlines from "@/components/TopHeadlines";
import FullWidthAdBanner from "@/components/FullWidthAdBanner";
import SectionContainer from "@/components/SectionContainer";
import NewsGridSection from "@/components/NewsGridSection";
import CategoryNewsSection from "@/components/CategoryNewsSection";
import LogisticsAviationSection from "@/components/LogisticsAviationSection";
import SponsoredContents from "@/components/SponsoredContents";
import TechnologyInnovation from "@/components/TechnologyInnovation";
import NewsletterBanner from "@/components/NewsletterBanner";
import OilSportsSection from "@/components/OilSportsSection";
import BankingFinanceSection from "@/components/BankingFinanceSection";
import DailyInsightsSection from "@/components/DailyInsightsSection";
import HealthcareTourismSection from "@/components/HealthcareTourismSection";
import EventsSection from "@/components/EventsSection";
import MediaCoverageSection from "@/components/MediaCoverageSection";
import CultureLifestyleSection from "@/components/CultureLifestyleSection";
import SocialMediaSection from "@/components/SocialMediaSection";

export async function generateMetadata() {
  const seoProps = await getPageSeoProps('');
  return buildMetadata(seoProps);
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <TopHeadlines />
      <div className="flex flex-col w-full">
        <div className="order-1 w-full">
          <NewsGridSection />
        </div>
        <div className="order-3 lg:order-2 w-full">
          <SectionContainer containerClassName="py-8 md:py-12">
            <FullWidthAdBanner containerClassName="w-full" />
          </SectionContainer>
        </div>
        <div className="order-2 lg:order-3 w-full">
          <CategoryNewsSection />
        </div>
      </div>
      <SponsoredContents />
      <TechnologyInnovation />
      <NewsletterBanner />
      <LogisticsAviationSection />
      <OilSportsSection />
      <BankingFinanceSection />
      <DailyInsightsSection />
      <HealthcareTourismSection />
      <EventsSection />
      <MediaCoverageSection />
      <CultureLifestyleSection />
      <SocialMediaSection />
    </main>
  );
}
