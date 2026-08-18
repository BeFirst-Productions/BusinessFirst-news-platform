import React from 'react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import NewsletterWidget from './NewsletterWidget';
import { Skeleton } from '@/components/ui/Skeleton';

const BankingFinanceSection = () => {
  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full">
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            <div className="md:col-span-8 flex flex-col gap-6">
              <div className="flex flex-col gap-3 pb-2 border-b border-gray-100">
                <Skeleton className="w-full aspect-video" />
                <Skeleton className="h-6 w-full mt-2" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-col gap-5 mt-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 items-center">
                    <Skeleton className="w-[35%] aspect-[16/9] shrink-0" />
                    <div className="flex flex-col w-[65%] gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-3 w-24 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="w-full aspect-video" />
                  <Skeleton className="h-5 w-full mt-1" />
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 w-full h-full pt-10">
          <FullWidthAdBanner
            ratio="ad_7"
            containerClassName="w-full flex-1 aspect-square lg:aspect-auto"
            adClassName="w-full h-full object-cover min-h-[300px]"
          />
          <NewsletterWidget />
        </div>
      </div>
    </SectionContainer>
  );
};

export default BankingFinanceSection;
