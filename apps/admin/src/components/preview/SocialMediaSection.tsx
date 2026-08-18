import React from 'react';
import SectionContainer from './SectionContainer';
import { Skeleton } from '@/components/ui/Skeleton';

const SocialMediaSection = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <Skeleton className="h-8 w-64 mx-auto mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-full aspect-square rounded-xl" />
        ))}
      </div>
    </SectionContainer>
  );
};

export default SocialMediaSection;
