import React from 'react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import { Skeleton } from '@/components/ui/Skeleton';

const EventsSection = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[65%] flex flex-col gap-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            <div className="md:col-span-2 flex flex-col gap-3">
               <Skeleton className="w-full aspect-[16/10]" />
               <Skeleton className="h-6 w-full" />
               <Skeleton className="h-6 w-3/4" />
               <Skeleton className="h-4 w-32" />
            </div>
            <div className="md:col-span-1 flex flex-col gap-6">
               {[1, 2].map(i => (
                  <div key={i} className="flex flex-col gap-2">
                     <Skeleton className="w-full aspect-[16/10]" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-3/4" />
                  </div>
               ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 mt-4">
             {[3,4,5].map(i => (
                <div key={i} className="flex flex-col gap-2">
                   <Skeleton className="w-full aspect-[16/10]" />
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-3/4" />
                </div>
             ))}
          </div>
        </div>

        <div className="w-full lg:w-[35%] flex flex-col">
          <div className="bg-[#24214c] rounded-md overflow-hidden flex flex-col shadow-lg h-full">
            <div className="px-6 py-5 md:py-6 flex justify-center">
              <Skeleton className="h-6 w-48 bg-white/20" />
            </div>
            <Skeleton className="w-full aspect-[4/3] bg-white/10" />
            <div className="p-6 md:p-8 flex flex-col gap-2 flex-1">
               <Skeleton className="h-8 w-full bg-white/20" />
               <Skeleton className="h-4 w-3/4 bg-white/20 mt-2" />
               <Skeleton className="h-4 w-1/2 bg-white/20" />
               <div className="mt-auto pt-8 flex justify-center">
                  <Skeleton className="h-10 w-32 bg-white/20" />
               </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full">
        <FullWidthAdBanner ratio="ad_8" />
      </div>
    </SectionContainer>
  );
};

export default EventsSection;
