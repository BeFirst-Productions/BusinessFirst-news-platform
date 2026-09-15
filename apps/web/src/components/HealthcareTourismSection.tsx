'use client';

import React from 'react';
import SectionContainer from './SectionContainer';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useHomeCategories } from '@/hooks/use-articles';

const EmptyCategoryState = ({ categoryName }: { categoryName: string }) => (
  <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
    <p className="text-gray-400 text-sm font-semibold">No articles available in {categoryName}</p>
  </div>
);

const HealthcareTourismSection = () => {
  const { data: homeCategories } = useHomeCategories();

  const healthData = homeCategories?.['healthcare-pharma'];
  const healthArticles = healthData?.articles || [];
  const healthFeatured = healthArticles[0];
  const healthGrid = healthArticles.slice(1, 7);

  const tourismData = homeCategories?.['tourism-hospitality'];
  const tourismArticles = tourismData?.articles || [];
  const tourismFeatured = tourismArticles[0];
  const tourismList = tourismArticles.slice(1, 5);

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
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Healthcare & Pharma */}
        <div className="w-full lg:w-[58%] flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202] font-newsreader">
              {healthData?.categoryName || 'Healthcare & Pharma'}
            </h2>
            <Link
              href={`/news?category=${encodeURIComponent(
                healthData?.categoryName || 'Healthcare & Pharma'
              )}`}
              className="text-[#24214c] font-bold text-sm flex items-center hover:text-[#FF0202] transition-colors"
            >
              View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
            </Link>
          </div>

          {healthArticles.length === 0 ? (
            <EmptyCategoryState categoryName={healthData?.categoryName || 'Healthcare & Pharma'} />
          ) : (
            <>
              {/* Featured Main Article */}
              {healthFeatured && (
                <Link href={`/news/${healthFeatured.slug || healthFeatured.id}`} className="group cursor-pointer flex flex-col">
                  <div className="relative w-full aspect-[2/1] overflow-hidden bg-gray-200 rounded-md">
                    <Image
                      src={healthFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={healthFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-[#24214c] font-bold text-lg xl:text-[22px] leading-tight group-hover:text-[#FF0202] transition-colors line-clamp-2 min-h-[45px] font-newsreader">
                    {healthFeatured.title}
                  </h3>
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto">
                    {healthFeatured.category?.name || 'Healthcare & Pharma'} | {formatDate(healthFeatured.publishedAt)}
                  </span>
                </Link>
              )}

              {/* 3-Column Grid of Articles */}
              {healthGrid.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5 mt-2">
                  {healthGrid.map((item) => (
                    <Link key={item.id} href={`/news/${item.slug || item.id}`} className="group cursor-pointer flex flex-col">
                      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200 rounded-md">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="text-[#24214c] font-bold text-xs sm:text-sm md:text-[16px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2 min-h-[2.4rem] font-newsreader mt-2">
                        {item.title}
                      </h4>
                      <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto">
                        {item.category?.name || 'Healthcare & Pharma'} | {formatDate(item.publishedAt)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Tourism & Hospitality (With Light Gray Background Container) */}
        <div className="w-full lg:w-[42%] bg-[#f4f4f6] p-4 sm:p-5 rounded-xl flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202] font-newsreader">
              {tourismData?.categoryName || 'Tourism & Hospitality'}
            </h2>
            <Link
              href={`/news?category=${encodeURIComponent(
                tourismData?.categoryName || 'Tourism & Hospitality'
              )}`}
              className="text-[#24214c] font-bold text-sm flex items-center hover:text-[#FF0202] transition-colors"
            >
              View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
            </Link>
          </div>

          {tourismArticles.length === 0 ? (
            <EmptyCategoryState categoryName={tourismData?.categoryName || 'Tourism & Hospitality'} />
          ) : (
            <div className="flex flex-col gap-6">
              {/* Top Featured Large Article */}
              {tourismFeatured && (
                <Link href={`/news/${tourismFeatured.slug || tourismFeatured.id}`} className="group cursor-pointer flex flex-col">
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200 rounded-md">
                    <Image
                      src={tourismFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={tourismFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-[#24214c] font-bold text-lg xl:text-[22px] leading-tight group-hover:text-[#FF0202] transition-colors line-clamp-2 min-h-[45px] font-newsreader">
                    {tourismFeatured.title}
                  </h3>
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto">
                    {tourismFeatured.category?.name || 'Tourism & Hospitality'} | {formatDate(tourismFeatured.publishedAt)}
                  </span>
                </Link>
              )}

              {/* Vertical Stack of Horizontal Article Cards */}
              {tourismList.length > 0 && (
                <div className="flex flex-col gap-4">
                  {tourismList.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug || item.id}`}
                      className={`flex gap-3.5 items-center group cursor-pointer ${
                        index === 3 ? 'lg:hidden xl:flex' : ''
                      }`}
                    >
                      <div className="relative w-28 md:w-36 aspect-[4/3] shrink-0 overflow-hidden bg-gray-200 rounded-md">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <h4 className="text-[#24214c] font-bold text-xs sm:text-sm md:text-[16px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2 min-h-[2.4rem] font-newsreader">
                          {item.title}
                        </h4>
                        <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto">
                          {item.category?.name || 'Tourism & Hospitality'} | {formatDate(item.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </SectionContainer>
  );
};

export default HealthcareTourismSection;
