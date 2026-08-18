import React from 'react';
import SectionContainer from './SectionContainer';
import { Skeleton } from '@/components/ui/Skeleton';

const SponsoredContents = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <Skeleton className="h-8 w-64 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="w-full aspect-[4/3] rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default SponsoredContents;
