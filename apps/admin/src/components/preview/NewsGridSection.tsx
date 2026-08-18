import React from 'react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import NewsletterWidget from './NewsletterWidget';
import { Skeleton } from '@/components/ui/Skeleton';

const NewsGridSection = () => {
  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full">
        {/* Left Column */}
        <div className="lg:col-span-4 border-r-0 lg:border-r border-gray-200 lg:pr-4 xl:pr-6 space-y-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-64 w-full rounded" />
          <div className="grid grid-cols-2 gap-4 mt-4">
             <Skeleton className="h-32 w-full" />
             <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-4 mt-6">
             <Skeleton className="h-20 w-full" />
             <Skeleton className="h-20 w-full" />
             <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Center Column */}
        <div className="lg:col-span-4 border-r-0 lg:border-r border-gray-200 lg:pr-4 xl:pr-6 space-y-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-64 w-full rounded" />
          <div className="grid grid-cols-2 gap-4 mt-4">
             <Skeleton className="h-32 w-full" />
             <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-4 mt-6">
             <Skeleton className="h-20 w-full" />
             <Skeleton className="h-20 w-full" />
             <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Right Column - Ads & Newsletter */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6 h-full min-h-0">
          <FullWidthAdBanner
            ratio="ad_2"
            containerClassName="w-full flex-1 min-h-[260px] lg:min-h-0 relative overflow-hidden shadow-sm flex flex-col"
            adClassName="w-full h-full object-cover"
          />
          <FullWidthAdBanner
            ratio="ad_3"
            containerClassName="w-full flex-1 min-h-[220px] lg:min-h-0 relative overflow-hidden shadow-sm flex flex-col"
            adClassName="w-full h-full object-cover"
          />
          <NewsletterWidget />
        </div>
      </div>
    </SectionContainer>
  );
};

export default NewsGridSection;
