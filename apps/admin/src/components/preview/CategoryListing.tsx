"use client";

import React from 'react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import { Skeleton } from '@/components/ui/Skeleton';

const CategoryListing: React.FC = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      <SectionContainer className="bg-white pt-6 pb-12">
        <div className="flex items-center gap-2 mb-6">
           <Skeleton className="h-4 w-12" />
           <Skeleton className="h-4 w-4" />
           <Skeleton className="h-4 w-24" />
        </div>

        <div className="border-b border-gray-200 pb-5 mb-8">
          <Skeleton className="h-10 w-64 mb-3" />
          <Skeleton className="h-4 w-full max-w-4xl" />
          <Skeleton className="h-4 w-full max-w-4xl mt-2" />
          <Skeleton className="h-4 w-3/4 max-w-4xl mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2.5">
                  <Skeleton className="w-full aspect-[4/3] rounded-lg" />
                  <div className="flex flex-col gap-1.5 px-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-8 w-full">
            <div className="bg-[#24214c] rounded-2xl p-5 text-white flex flex-col gap-4 shadow-lg">
              <Skeleton className="h-6 w-48 mx-auto mb-2 bg-white/20" />
              <div className="flex flex-col gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-3 pb-3 border-b border-white/10">
                    <Skeleton className="w-20 h-14 shrink-0 rounded bg-white/20" />
                    <div className="flex flex-col justify-between flex-1 py-0.5">
                      <Skeleton className="h-3 w-full bg-white/20" />
                      <Skeleton className="h-3 w-3/4 bg-white/20 mt-1" />
                      <Skeleton className="h-2 w-1/2 bg-white/20 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-900">
               <Skeleton className="w-full h-full" />
            </div>
          </aside>
        </div>

        <div className='w-full py-8 md:py-12'>
          <FullWidthAdBanner ratio="ad_5" />
        </div>
      </SectionContainer>

      <div className="w-full bg-[#f9f9fb] py-12 border-t border-gray-200/50 flex justify-center">
        <SectionContainer className="bg-transparent py-0">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200/70 rounded-2xl p-3 pb-5 shadow-sm flex flex-col gap-3.5">
                <Skeleton className="w-full aspect-[4/3] rounded-xl" />
                <div className="flex flex-col gap-1.5 flex-grow">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-4 w-full mt-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default CategoryListing;
