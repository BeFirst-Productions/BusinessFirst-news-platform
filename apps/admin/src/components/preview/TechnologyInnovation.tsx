import React from 'react';
import SectionContainer from './SectionContainer';
import { Skeleton } from '@/components/ui/Skeleton';
import FullWidthAdBanner from './FullWidthAdBanner';

const TechnologyInnovation = () => {
  return (
    <SectionContainer
      as="section"
      className="bg-white py-8 md:py-12"
      containerClassName="flex flex-col"
    >
      <div className="flex justify-between items-end mb-6 relative pb-2 border-b border-gray-300">
        <Skeleton className="h-8 w-64" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col">
            <Skeleton className="w-full aspect-[16/9] mb-3" />
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-2">
            <div className="flex flex-col">
              <Skeleton className="w-full aspect-[16/9] mb-3" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex flex-col">
              <Skeleton className="w-full aspect-[16/9] mb-3" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3">
                <Skeleton className="w-[110px] md:w-[130px] shrink-0 aspect-[4/3]" />
                <div className="flex flex-col justify-start py-0.5 w-full">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
          <FullWidthAdBanner
            ratio="ad_5"
            containerClassName="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:flex-grow overflow-hidden mt-2 group cursor-pointer"
            adClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default TechnologyInnovation;
