'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import { useHomeCategories } from '@/hooks/use-articles';

const EmptyCategoryState = ({ categoryName, isDark = false }: { categoryName: string; isDark?: boolean }) => (
  <div className={`w-full py-12 flex flex-col items-center justify-center border border-dashed rounded-lg text-center my-4 ${isDark ? 'bg-white/5 border-gray-700 text-gray-400' : 'bg-gray-50/50 border-gray-200 text-gray-400'}`}>
    <p className="text-sm font-semibold">No articles available in {categoryName}</p>
  </div>
);

const LogisticsAviationSection: React.FC = () => {
  const { data: homeCategories } = useHomeCategories();

  const logisticsData = homeCategories?.['logistics-trade'];
  const logisticsArticles = logisticsData?.articles || [];
  const logisticsFeatured = logisticsArticles[0];
  const logisticsSmall = logisticsArticles.slice(1, 4);

  const aviationData = homeCategories?.['aviation-aerospace'];
  const aviationArticles = aviationData?.articles || [];
  const aviationFeatured = aviationArticles[0];
  const aviationSmall = aviationArticles.slice(1, 4);

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Recent';

  return (
    <SectionContainer as="section" className="py-8 md:py-12 bg-white">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
        {/* Left Column: Logistics & Trade */}
        <div className="flex-1 bg-white border border-gray-200 p-6 md:p-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#24214c]">
              {logisticsData?.categoryName || 'Logistics & Trade'}
            </h2>
            <div className="absolute -bottom-[2px] left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#FF0202] to-transparent"></div>
            <Link
              href={`/news?category=${encodeURIComponent(
                logisticsData?.categoryName || 'Logistics & Trade'
              )}`}
              className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity"
            >
              View All <ChevronDown size={16} className="ml-1 text-[#24214c]" />
            </Link>
          </div>

          {logisticsArticles.length === 0 ? (
            <EmptyCategoryState categoryName={logisticsData?.categoryName || 'Logistics & Trade'} />
          ) : (
            <>
              {/* Featured Article */}
              {logisticsFeatured && (
                <Link
                  href={`/news/${logisticsFeatured.slug || logisticsFeatured.id}`}
                  className="flex flex-col sm:flex-row gap-4 group cursor-pointer pb-2"
                >
                  <div className="relative w-full sm:w-[45%] aspect-[4/3] overflow-hidden shrink-0 bg-gray-100 rounded">
                    <Image
                      src={logisticsFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={logisticsFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center sm:w-[55%]">
                    <h3 className="text-[#24214c] font-bold text-[18px] leading-[1.3] group-hover:text-[#FF0202] transition-colors line-clamp-3">
                      {logisticsFeatured.title}
                    </h3>
                    <span className="text-xs text-gray-500 font-medium mt-3">
                      {logisticsFeatured.category?.name || 'Logistics & Trade'} | {formatDate(logisticsFeatured.publishedAt)}
                    </span>
                  </div>
                </Link>
              )}

              {/* Small Articles */}
              {logisticsSmall.length > 0 && (
                <div className="flex flex-col gap-6">
                  {logisticsSmall.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug || item.id}`}
                      className="flex gap-4 group cursor-pointer items-center"
                    >
                      <div className="relative w-[30%] aspect-[4/3] shrink-0 overflow-hidden bg-gray-100 rounded">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-center w-[70%]">
                        <h4 className="text-[#24214c] font-bold text-[14px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-gray-500 font-medium mt-1.5">
                          {item.category?.name || 'Logistics & Trade'} | {formatDate(item.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Aviation & Aerospace */}
        <div className="flex-1 bg-[#24214c] p-6 md:p-8 flex flex-col gap-6 w-full rounded">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-600 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">
              {aviationData?.categoryName || 'Aviation & Aerospace'}
            </h2>
            <div className="absolute -bottom-[2px] left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#FF0202] to-transparent"></div>
            <Link
              href={`/news?category=${encodeURIComponent(
                aviationData?.categoryName || 'Aviation & Aerospace'
              )}`}
              className="flex items-center text-[#f1b434] font-bold text-sm hover:opacity-80 transition-opacity"
            >
              View All <ChevronDown size={16} className="ml-1 text-[#f1b434]" />
            </Link>
          </div>

          {aviationArticles.length === 0 ? (
            <EmptyCategoryState categoryName={aviationData?.categoryName || 'Aviation & Aerospace'} isDark />
          ) : (
            <>
              {/* Featured Article */}
              {aviationFeatured && (
                <Link
                  href={`/news/${aviationFeatured.slug || aviationFeatured.id}`}
                  className="flex flex-col sm:flex-row gap-4 group cursor-pointer pb-2"
                >
                  <div className="relative w-full sm:w-[45%] aspect-[4/3] overflow-hidden shrink-0 bg-gray-700 rounded">
                    <Image
                      src={aviationFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={aviationFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center sm:w-[55%]">
                    <h3 className="text-white font-bold text-[18px] leading-[1.3] group-hover:text-[#f1b434] transition-colors line-clamp-3">
                      {aviationFeatured.title}
                    </h3>
                    <span className="text-xs text-[#f1b434] font-medium mt-3">
                      {aviationFeatured.category?.name || 'Aviation & Aerospace'} | {formatDate(aviationFeatured.publishedAt)}
                    </span>
                  </div>
                </Link>
              )}

              {/* Small Articles */}
              {aviationSmall.length > 0 && (
                <div className="flex flex-col gap-6">
                  {aviationSmall.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug || item.id}`}
                      className="flex gap-4 group cursor-pointer items-center"
                    >
                      <div className="relative w-[30%] aspect-[4/3] shrink-0 overflow-hidden bg-gray-700 rounded">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-center w-[70%]">
                        <h4 className="text-white font-bold text-[14px] leading-snug group-hover:text-[#f1b434] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-[#f1b434] font-medium mt-1.5">
                          {item.category?.name || 'Aviation & Aerospace'} | {formatDate(item.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-16 w-full">
        <FullWidthAdBanner ratio="ad_6" />
      </div>
    </SectionContainer>
  );
};

export default LogisticsAviationSection;
