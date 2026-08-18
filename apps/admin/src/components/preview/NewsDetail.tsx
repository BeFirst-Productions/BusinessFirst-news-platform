import React, { Suspense } from 'react';
import SectionContainer from './SectionContainer';
import NewsSidebar from './news-detail/NewsSidebar';
import FullWidthAdBanner from './FullWidthAdBanner';
import { Skeleton } from '@/components/ui/Skeleton';

interface NewsDetailProps {
  articleId?: string;
}

const NewsDetail: React.FC<NewsDetailProps> = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex items-center gap-2 mb-6">
         <Skeleton className="h-4 w-12" />
         <Skeleton className="h-4 w-4" />
         <Skeleton className="h-4 w-24" />
      </div>

      <div className="border-b border-gray-200 pb-5 mb-8">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-10 w-1/2 mb-6" />
        <Skeleton className="h-4 w-full max-w-4xl" />
        <Skeleton className="h-4 w-full max-w-4xl mt-2" />
        <Skeleton className="h-4 w-3/4 max-w-4xl mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
           <Skeleton className="w-full aspect-video rounded-xl mb-4" />
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-3/4" />
           <Skeleton className="h-4 w-full mt-4" />
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-2/3" />
        </div>

        <NewsSidebar />
      </div>

      <div className="w-full mt-12">
        <Suspense fallback={<Skeleton className="w-full h-[250px]" />}>
          <FullWidthAdBanner containerClassName="w-full" ratio="nd_bottom" />
        </Suspense>
      </div>

      <div className="h-[1px] w-full bg-gray-200 my-12"></div>

      <div className="w-full flex flex-col">
         <Skeleton className="h-8 w-48 mb-8" />
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                 <Skeleton className="w-full aspect-video rounded-xl" />
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-3/4" />
                 <Skeleton className="h-3 w-1/2 mt-1" />
              </div>
            ))}
         </div>
      </div>
    </SectionContainer>
  );
};

export default NewsDetail;
