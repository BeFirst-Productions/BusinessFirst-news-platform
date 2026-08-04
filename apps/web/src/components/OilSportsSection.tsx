'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import SectionContainer from './SectionContainer';
import { useHomeCategories } from '@/hooks/use-articles';

const EmptyCategoryState = ({ categoryName }: { categoryName: string }) => (
  <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
    <p className="text-gray-400 text-sm font-semibold">No articles available in {categoryName}</p>
  </div>
);

const OilSportsSection: React.FC = () => {
  const { data: homeCategories } = useHomeCategories();

  const oilData = homeCategories?.['oil-gas-energy'];
  const oilArticles = oilData?.articles || [];
  const oilFeatured = oilArticles[0];
  const oilSmall = oilArticles.slice(1, 4);

  const sportsData = homeCategories?.['sports-recreation'];
  const sportsArticles = sportsData?.articles || [];
  const sportsFeatured = sportsArticles[0];
  const sportsSmall = sportsArticles.slice(1, 4);

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Recent';

  return (
    <SectionContainer as="section" className="py-8 md:py-12 bg-[#F5F5F7]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
        {/* Left Column: Oil, Gas & Energy */}
        <div className="flex flex-col gap-6 w-full lg:border-r border-gray-300 lg:pr-8 xl:pr-10">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">
                {oilData?.categoryName || 'Oil, Gas & Energy'}
              </h2>
              <div className="absolute -bottom-[9px] left-0 w-full h-[3px] bg-[#FF0202]"></div>
            </div>
            <Link
              href={`/news?category=${encodeURIComponent(
                oilData?.categoryName || 'Oil, Gas & Energy'
              )}`}
              className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity"
            >
              View All <ChevronDown size={16} className="ml-1 text-gray-500" />
            </Link>
          </div>

          {oilArticles.length === 0 ? (
            <EmptyCategoryState categoryName={oilData?.categoryName || 'Oil, Gas & Energy'} />
          ) : (
            <>
              {/* Featured Article - Big Image on Top */}
              {oilFeatured && (
                <Link
                  href={`/news/${oilFeatured.slug || oilFeatured.id}`}
                  className="flex flex-col gap-2 group cursor-pointer w-full"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200">
                    <Image
                      src={oilFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={oilFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-[#24214c] font-bold text-lg md:text-xl leading-snug group-hover:text-[#FF0202] transition-colors mt-1">
                    {oilFeatured.title}
                  </h3>
                  <span className="text-xs text-gray-500 font-medium">
                    {oilFeatured.category?.name || 'Oil, Gas & Energy'} | {formatDate(oilFeatured.publishedAt)}
                  </span>
                </Link>
              )}

              {/* Small Articles List */}
              {oilSmall.length > 0 && (
                <div className="flex flex-col gap-4 mt-2">
                  {oilSmall.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug || item.id}`}
                      className="flex gap-4 group cursor-pointer items-center"
                    >
                      <div className="relative w-28 md:w-36 h-20 shrink-0 overflow-hidden bg-gray-200">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[#24214c] font-bold text-sm md:text-[15px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-3">
                          {item.title}
                        </h4>
                        <span className="text-[10px] md:text-xs text-gray-500 font-medium mt-1">
                          {item.category?.name || 'Oil, Gas & Energy'} | {formatDate(item.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Sports & Recreation */}
        <div className="flex flex-col gap-6 w-full lg:pl-2">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">
                {sportsData?.categoryName || 'Sports & Recreation'}
              </h2>
              <div className="absolute -bottom-[9px] left-0 w-full h-[3px] bg-[#FF0202]"></div>
            </div>
            <Link
              href={`/news?category=${encodeURIComponent(
                sportsData?.categoryName || 'Sports & Recreation'
              )}`}
              className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity"
            >
              View All <ChevronDown size={16} className="ml-1 text-gray-500" />
            </Link>
          </div>

          {sportsArticles.length === 0 ? (
            <EmptyCategoryState categoryName={sportsData?.categoryName || 'Sports & Recreation'} />
          ) : (
            <>
              {/* Featured Article - Big Image on Top */}
              {sportsFeatured && (
                <Link
                  href={`/news/${sportsFeatured.slug || sportsFeatured.id}`}
                  className="flex flex-col gap-2 group cursor-pointer w-full"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200">
                    <Image
                      src={sportsFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={sportsFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-[#24214c] font-bold text-lg md:text-xl leading-snug group-hover:text-[#FF0202] transition-colors mt-1">
                    {sportsFeatured.title}
                  </h3>
                  <span className="text-xs text-gray-500 font-medium">
                    {sportsFeatured.category?.name || 'Sports & Recreation'} | {formatDate(sportsFeatured.publishedAt)}
                  </span>
                </Link>
              )}

              {/* Small Articles List */}
              {sportsSmall.length > 0 && (
                <div className="flex flex-col gap-4 mt-2">
                  {sportsSmall.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug || item.id}`}
                      className="flex gap-4 group cursor-pointer items-center"
                    >
                      <div className="relative w-28 md:w-36 h-20 shrink-0 overflow-hidden bg-gray-200">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[#24214c] font-bold text-sm md:text-[15px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-3">
                          {item.title}
                        </h4>
                        <span className="text-[10px] md:text-xs text-gray-500 font-medium mt-1">
                          {item.category?.name || 'Sports & Recreation'} | {formatDate(item.publishedAt)}
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
    </SectionContainer>
  );
};

export default OilSportsSection;
