'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import { useHomeCategories, useArticles } from '@/hooks/use-articles';

const EmptyCategoryState = ({ categoryName, isDark = false }: { categoryName: string; isDark?: boolean }) => (
  <div className={`w-full py-12 flex flex-col items-center justify-center border border-dashed rounded-lg text-center my-4 ${isDark ? 'bg-white/5 border-gray-700 text-gray-400' : 'bg-gray-50/50 border-gray-200 text-gray-400'}`}>
    <p className="text-sm font-semibold">No articles available in {categoryName}</p>
  </div>
);

const LogisticsAviationSection: React.FC = () => {
  const { data: homeCategories } = useHomeCategories();

  const logisticsData = homeCategories?.['logistics-trade'];
  const initialLogisticsArticles = logisticsData?.articles || [];
  const logisticsCategoryId = initialLogisticsArticles[0]?.category?.id || '84ef6ad2-dc4b-4a96-92b1-43bf3919bc23';

  // Fallback to fetch 5 articles if homeCategories aggregate returned fewer
  const { data: fullLogisticsResponse } = useArticles(
    {
      categoryId: logisticsCategoryId,
      limit: 5,
    },
    { enabled: initialLogisticsArticles.length < 5 }
  );

  const logisticsArticles =
    fullLogisticsResponse?.data && fullLogisticsResponse.data.length >= 5
      ? fullLogisticsResponse.data
      : initialLogisticsArticles;

  const logisticsFeatured = logisticsArticles[0];
  const logisticsSmall = logisticsArticles.slice(1, 5);

  const aviationData = homeCategories?.['aviation-aerospace'];
  const initialAviationArticles = aviationData?.articles || [];
  const aviationCategoryId = initialAviationArticles[0]?.category?.id || '2c22a2c3-08bc-48bb-8774-8b88217be351';

  // Fallback to fetch 5 articles if homeCategories aggregate returned fewer
  const { data: fullAviationResponse } = useArticles(
    {
      categoryId: aviationCategoryId,
      limit: 5,
    },
    { enabled: initialAviationArticles.length < 5 }
  );

  const aviationArticles =
    fullAviationResponse?.data && fullAviationResponse.data.length >= 5
      ? fullAviationResponse.data
      : initialAviationArticles;

  const aviationFeatured = aviationArticles[0];
  const aviationSmall = aviationArticles.slice(1, 5);

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      : 'Recent';

  return (
    <SectionContainer as="section" className="py-6 md:py-8 bg-white">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
        {/* Left Column: Logistics & Trade */}
        <div className="flex-1 bg-[#F5F5F7] p-6 md:p-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">
                {logisticsData?.categoryName || 'Logistics & Trade'}
              </h2>
              <div className="absolute -bottom-[9px] left-0 w-full h-[3px] bg-[#FF0202]"></div>
            </div>
            <Link
              href={`/news?category=${encodeURIComponent(
                logisticsData?.categoryName || 'Logistics & Trade'
              )}`}
              className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity"
            >
              View All <ChevronDown size={16} className="ml-1 text-gray-500" />
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
                  <div className="relative w-full sm:w-[45%] aspect-[4/3] overflow-hidden shrink-0 bg-gray-200 rounded">
                    <Image
                      src={logisticsFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={logisticsFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center sm:w-[55%]">
                    <h3 className="text-[#24214c] font-bold text-lg md:text-xl leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-3">
                      {logisticsFeatured.title}
                    </h3>
                    <span className="text-xs text-gray-500 font-medium mt-3">
                      {logisticsFeatured.category?.name || 'Logistics & Trade'} | {formatDate(logisticsFeatured.publishedAt)}
                    </span>
                  </div>
                </Link>
              )}

              {/* Small Articles - 2 columns x 2 rows (4 items) */}
              {logisticsSmall.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2 border-t border-gray-200">
                  {logisticsSmall.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug || item.id}`}
                      className="flex flex-col group cursor-pointer h-full"
                    >
                      <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden bg-gray-200 rounded mb-2">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col flex-1 justify-between">
                        <h4 className="text-[#24214c] font-bold text-xs sm:text-[13px] md:text-[15px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium mt-1.5">
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
        <div className="flex-1 bg-[#1E194E] p-6 md:p-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-600/60 pb-2">
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">
                {aviationData?.categoryName || 'Aviation & Aerospace'}
              </h2>
              <div className="absolute -bottom-[9px] left-0 w-full h-[3px] bg-[#FF0202]"></div>
            </div>
            <Link
              href={`/news?category=${encodeURIComponent(
                aviationData?.categoryName || 'Aviation & Aerospace'
              )}`}
              className="flex items-center text-[#FBB03B] font-bold text-sm hover:opacity-80 transition-opacity"
            >
              View All <ChevronDown size={16} className="ml-1 text-[#FBB03B]" />
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
                  <div className="relative w-full sm:w-[45%] aspect-[4/3] overflow-hidden shrink-0 bg-gray-800 rounded">
                    <Image
                      src={aviationFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={aviationFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center sm:w-[55%]">
                    <h3 className="text-white font-bold text-lg md:text-xl leading-snug group-hover:text-[#FBB03B] transition-colors line-clamp-3">
                      {aviationFeatured.title}
                    </h3>
                    <span className="text-xs text-[#FBB03B] font-medium mt-3">
                      {aviationFeatured.category?.name || 'Aviation & Aerospace'} | {formatDate(aviationFeatured.publishedAt)}
                    </span>
                  </div>
                </Link>
              )}

              {/* Small Articles - 2 columns x 2 rows (4 items) */}
              {aviationSmall.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2 border-t border-gray-700/60">
                  {aviationSmall.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug || item.id}`}
                      className="flex flex-col group cursor-pointer h-full"
                    >
                      <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden bg-gray-800 rounded mb-2">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col flex-1 justify-between">
                        <h4 className="text-white font-bold text-xs sm:text-[13px] md:text-[15px] leading-snug group-hover:text-[#FBB03B] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] text-[#FBB03B] font-medium mt-1.5">
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
        <FullWidthAdBanner ratio="ad_6" imageUrl="/ads/invest-first_1600x140.jpeg" linkUrl="https://investfirst.ae" />
      </div>
    </SectionContainer>
  );
};

export default LogisticsAviationSection;
