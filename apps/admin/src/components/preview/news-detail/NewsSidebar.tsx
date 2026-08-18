import React, { Suspense } from 'react';
import FullWidthAdBanner from '../FullWidthAdBanner';
import { Skeleton } from '@/components/ui/Skeleton';

const NewsSidebar = () => {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-8 w-full">
      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
        <div className="bg-[#FF0202] text-white text-center py-3.5 font-bold text-sm tracking-wider uppercase">
          Recent Posts
        </div>
        <div className="flex flex-col divide-y divide-gray-100 p-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4">
              <Skeleton className="w-20 h-16 shrink-0 rounded-lg" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2 w-1/2 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative bg-gray-900">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <FullWidthAdBanner 
            containerClassName="w-full h-full"
            adClassName="w-full h-full object-cover"
            ratio="nd_sidebar"
          />
        </Suspense>
      </div>
    </aside>
  );
};

export default NewsSidebar;
