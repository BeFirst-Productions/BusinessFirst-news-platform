import React from 'react';
import SectionContainer from './SectionContainer';
import { Skeleton } from '@/components/ui/Skeleton';

const OilSportsSection = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-8 w-64" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-[30%] aspect-[4/3]" />
                <div className="w-[70%] space-y-2 py-1">
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-8 w-64" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-[30%] aspect-[4/3]" />
                <div className="w-[70%] space-y-2 py-1">
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default OilSportsSection;
