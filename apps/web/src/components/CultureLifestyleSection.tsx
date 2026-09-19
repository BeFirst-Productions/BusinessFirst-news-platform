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
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Culture & Lifestyle */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2 gap-3 sm:gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202] font-newsreader min-w-0 break-words leading-tight">
              {cultureData?.categoryName || 'Culture & Lifestyle'}
            </h2>
            <Link
              href={`/news?category=${encodeURIComponent(
                cultureData?.categoryName || 'Culture & Lifestyle'
              )}`}
              className="text-[#24214c] font-bold text-xs sm:text-sm flex items-center hover:text-[#FF0202] transition-colors shrink-0 whitespace-nowrap pb-0.5"
            >
              View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
            </Link>
          </div>

          {cultureArticles.length === 0 ? (
            <EmptyCategoryState categoryName={cultureData?.categoryName || 'Culture & Lifestyle'} />
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 mt-2">
              {cultureArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug || item.id}`}
                  className="group cursor-pointer flex flex-col gap-1"
                >
                  <div className="relative w-full aspect-[21/9] overflow-hidden bg-gray-200 rounded">
                    <Image
                      src={item.featuredImage || '/placeholder-news.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-[#24214c] font-bold text-xs sm:text-sm md:text-[16px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2 min-h-0 md:min-h-[2.4rem] break-words font-newsreader">
                    {item.title}
                  </h4>
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto">
                    {item.category?.name || 'Culture & Lifestyle'} | {formatDate(item.publishedAt)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Media and Entertainment */}
        <div className="w-full lg:w-[40%]">
          <div className="bg-[#050505] rounded-xl p-6 md:p-8 flex flex-col h-full shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-start border-b-[1.5px] border-gray-800 pb-4">
              <h2 className="text-xl md:text-[22px] font-bold text-[#FF0202] leading-tight font-newsreader">
                {mediaData?.categoryName || 'Media and Entertainment'}
              </h2>
              <Link
                href={`/news?category=${encodeURIComponent(
                  mediaData?.categoryName || 'Media and Entertainment'
                )}`}
                className="text-white font-bold text-sm flex items-center hover:text-[#FF0202] transition-colors mt-1"
              >
                View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
              </Link>
            </div>

            {mediaArticles.length === 0 ? (
              <EmptyCategoryState categoryName={mediaData?.categoryName || 'Media and Entertainment'} isDark />
            ) : (
              <div className="flex-1 flex flex-col justify-between divide-y divide-gray-800/80 mt-2 sm:mt-4">
                {mediaArticles.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug || item.id}`}
                    className={`py-3 xl:py-3.5 2xl:py-4 first:pt-2 last:pb-1 group cursor-pointer flex gap-4 items-center ${
                      index === 4
                        ? 'lg:hidden xl:flex'
                        : index >= 5
                        ? 'lg:hidden xl:hidden 2xl:flex'
                        : ''
                    }`}
                  >
                    <div className="relative w-32 md:w-40 aspect-[16/9] shrink-0 overflow-hidden bg-gray-800 rounded">
                      <Image
                        src={item.featuredImage || '/placeholder-news.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1 gap-1">
                      <h4 className="text-white font-bold text-xs sm:text-sm md:text-[16px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2 min-h-0 md:min-h-[2.4rem] break-words font-newsreader">
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
