import React from 'react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import { Skeleton } from '@/components/ui/Skeleton';

const CultureLifestyleSection = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[65%] flex flex-col gap-6">
          <Skeleton className="h-8 w-64 mb-4" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex flex-col gap-2">
                <Skeleton className="w-full aspect-[16/10]" />
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2 mt-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[35%]">
          <div className="bg-[#050505] rounded-xl p-6 md:p-8 flex flex-col h-full shadow-lg">
            <Skeleton className="h-8 w-48 mb-6 bg-gray-800" />
            <div className="flex flex-col gap-6 mt-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex gap-4 items-center">
                  <Skeleton className="w-[110px] md:w-[130px] aspect-[16/10] shrink-0 bg-gray-800" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Skeleton className="h-4 w-full bg-gray-800" />
                    <Skeleton className="h-4 w-3/4 bg-gray-800" />
                    <Skeleton className="h-3 w-1/2 bg-gray-800 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full">
        <FullWidthAdBanner ratio="ad_9" />
      </div>
    </SectionContainer>
  );
};

export default CultureLifestyleSection;
