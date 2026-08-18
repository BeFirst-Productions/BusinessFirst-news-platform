import React from 'react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';
import { Skeleton } from '@/components/ui/Skeleton';

const TopHeadlines = () => {
  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <SectionTitle title="Top Headlines" />
      <div className="flex gap-4 overflow-x-hidden py-2 px-4 md:px-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex bg-white rounded-lg border border-gray-200 overflow-hidden w-[300px] md:w-[340px] shrink-0 h-[100px] shadow-sm">
            <Skeleton className="w-2/5 h-full rounded-none" />
            <div className="w-3/5 p-3 flex flex-col justify-between">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default TopHeadlines;
