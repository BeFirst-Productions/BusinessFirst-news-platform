'use client';

import React from 'react';
import SectionContainer from './SectionContainer';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import FullWidthAdBanner from './FullWidthAdBanner';
import { useHomeCategories } from '@/hooks/use-articles';

const EmptyCategoryState = ({ categoryName, isDark = false }: { categoryName: string; isDark?: boolean }) => (
  <div className={`w-full py-12 flex flex-col items-center justify-center border border-dashed rounded-lg text-center my-4 ${isDark ? 'bg-white/5 border-gray-800 text-gray-400' : 'bg-gray-50/50 border-gray-200 text-gray-400'}`}>
    <p className="text-sm font-semibold">No articles available in {categoryName}</p>
  </div>
);

const CultureLifestyleSection = () => {
  const { data: homeCategories } = useHomeCategories();

  const cultureData = homeCategories?.['culture-lifestyle'];
  const cultureArticles = cultureData?.articles || [];

  const mediaData = homeCategories?.['media-entertainment'];
  const mediaArticles = mediaData?.articles || [];

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      : 'Recent';

  return (
    <SectionContainer className="bg-white py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
        {/* Left Column: Culture & Lifestyle (3 cols = 60%) */}
        <div className="lg:col-span-3 flex flex-col justify-between h-full">
          {/* Header */}
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2.5 gap-3 sm:gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2.5 -mb-[12px] border-b-[3px] border-[#FF0202] font-newsreader min-w-0 break-words leading-tight">
              {cultureData?.categoryName || 'Culture & Lifestyle'}
            </h2>
            <Link
              href={`/news?category=${encodeURIComponent(
                cultureArticles[0]?.category?.name || cultureData?.categoryName || 'Lifestyle & Culture'
              )}`}
              className="text-[#24214c] font-bold text-xs sm:text-sm flex items-center hover:text-[#FF0202] transition-colors shrink-0 whitespace-nowrap pb-0.5"
            >
              View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
            </Link>
          </div>

          {cultureArticles.length === 0 ? (
            <EmptyCategoryState categoryName={cultureData?.categoryName || 'Culture & Lifestyle'} />
          ) : (
            <div className="flex-1 grid grid-cols-2 gap-x-5 gap-y-3.5 xl:gap-y-4 content-between mt-3.5">
              {cultureArticles.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug || item.id}`}
                  className="group cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200 rounded">
                      <Image
                        src={item.featuredImage || '/placeholder-news.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="text-[#24214c] font-bold text-xs sm:text-sm md:text-[15px] xl:text-[16px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2 min-h-0 md:min-h-[2.4rem] break-words font-newsreader">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-1">
                    {item.category?.name || 'Lifestyle & Culture'} | {formatDate(item.publishedAt)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Media and Entertainment (2 cols = 40%) */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="bg-[#050505] rounded-xl p-5 sm:p-6 xl:p-6 flex flex-col justify-between flex-1 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-end border-b-[1.5px] border-gray-800 pb-2.5">
              <h2 className="text-xl md:text-[22px] font-bold text-[#FF0202] leading-tight font-newsreader">
                {mediaData?.categoryName || 'Media and Entertainment'}
              </h2>
              <Link
                href={`/news?category=${encodeURIComponent(
                  mediaArticles[0]?.category?.name || mediaData?.categoryName || 'Media & Entertainment'
                )}`}
                className="text-white font-bold text-xs sm:text-sm flex items-center hover:text-[#FF0202] transition-colors shrink-0 whitespace-nowrap pb-0.5"
              >
                View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
              </Link>
            </div>

            {mediaArticles.length === 0 ? (
              <EmptyCategoryState categoryName={mediaData?.categoryName || 'Media and Entertainment'} isDark />
            ) : (
              <div className="flex-1 flex flex-col justify-between divide-y divide-gray-800/80 mt-2 sm:mt-2.5">
                {mediaArticles.slice(0, 6).map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug || item.id}`}
                    className="py-2 xl:py-2.5 first:pt-1 last:pb-0 group cursor-pointer flex gap-3 sm:gap-3.5 xl:gap-4 items-center flex-1"
                  >
                    <div className="relative w-28 sm:w-32 xl:w-36 aspect-[16/9] shrink-0 overflow-hidden bg-gray-800 rounded">
                      <Image
                        src={item.featuredImage || '/placeholder-news.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1 gap-1 min-w-0">
                      <h4 className="text-white font-bold text-xs sm:text-sm md:text-[14px] xl:text-[15px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2 break-words font-newsreader">
                        {item.title}
                      </h4>
                      <span className="text-[10px] md:text-[11px] text-[#fbb03b] font-medium mt-auto">
                        {item.category?.name || 'Media & Entertainment'} | {formatDate(item.publishedAt)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 w-full">
        <FullWidthAdBanner ratio="ad_9" imageUrl="/ads/ad-banner-1600x140.jpeg" linkUrl="" />
      </div>
    </SectionContainer>
  );
};

export default CultureLifestyleSection;
