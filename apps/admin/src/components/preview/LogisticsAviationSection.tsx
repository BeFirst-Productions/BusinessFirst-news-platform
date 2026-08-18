import React from 'react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import { Skeleton } from '@/components/ui/Skeleton';

const LogisticsAviationSection = () => {
  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
        <div className="flex-1 bg-[#F5F5F7] p-6 md:p-8 flex flex-col gap-6 w-full">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="flex gap-4">
             <Skeleton className="w-[45%] aspect-[4/3] shrink-0" />
             <div className="w-[55%] space-y-3 py-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-24" />
             </div>
          </div>
          <div className="space-y-4">
             {[1,2,3].map(i => (
                <div key={i} className="flex gap-4 items-center">
                   <Skeleton className="w-[30%] aspect-[4/3] shrink-0" />
                   <div className="w-[70%] space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                   </div>
                </div>
             ))}
          </div>
        </div>
        <div className="flex-1 bg-[#1E194E] p-6 md:p-8 flex flex-col gap-6 w-full">
          <Skeleton className="h-8 w-64 mb-4 bg-gray-600" />
          <div className="flex gap-4">
             <Skeleton className="w-[45%] aspect-[4/3] shrink-0 bg-gray-600" />
             <div className="w-[55%] space-y-3 py-2">
                <Skeleton className="h-5 w-full bg-gray-600" />
                <Skeleton className="h-5 w-4/5 bg-gray-600" />
                <Skeleton className="h-4 w-24 bg-gray-600" />
             </div>
          </div>
          <div className="space-y-4">
             {[1,2,3].map(i => (
                <div key={i} className="flex gap-4 items-center">
                   <Skeleton className="w-[30%] aspect-[4/3] shrink-0 bg-gray-600" />
                   <div className="w-[70%] space-y-2">
                      <Skeleton className="h-4 w-full bg-gray-600" />
                      <Skeleton className="h-4 w-4/5 bg-gray-600" />
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>
      <div className="mt-16 w-full">
        <FullWidthAdBanner ratio="ad_6" />
      </div>
    </SectionContainer>
  );
};

export default LogisticsAviationSection;
