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
    <SectionContainer as="section" className="py-8 md:py-12 bg-white">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
        {/* Left Column: Oil, Gas & Energy */}
        <div className="flex-1 bg-white border border-gray-200 p-6 md:p-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#24214c]">
              {oilData?.categoryName || 'Oil, Gas & Energy'}
            </h2>
            <div className="absolute -bottom-[2px] left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#FF0202] to-transparent"></div>
            <Link
              href={`/news?category=${encodeURIComponent(
                oilData?.categoryName || 'Oil, Gas & Energy'
              )}`}
              className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity"
            >
              View All <ChevronDown size={16} className="ml-1 text-[#24214c]" />
            </Link>
          </div>

          {oilArticles.length === 0 ? (
            <EmptyCategoryState categoryName={oilData?.categoryName || 'Oil, Gas & Energy'} />
          ) : (
            <>
              {/* Featured Article */}
              {oilFeatured && (
                <Link
                  href={`/news/${oilFeatured.slug || oilFeatured.id}`}
                  className="flex flex-col sm:flex-row gap-4 group cursor-pointer pb-2"
                >
                  <div className="relative w-full sm:w-[45%] aspect-[4/3] overflow-hidden shrink-0 bg-gray-100 rounded">
                    <Image
                      src={oilFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={oilFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center sm:w-[55%]">
                    <h3 className="text-[#24214c] font-bold text-[18px] leading-[1.3] group-hover:text-[#FF0202] transition-colors line-clamp-3">
                      {oilFeatured.title}
                    </h3>
                    <span className="text-xs text-gray-500 font-medium mt-3">
                      {oilFeatured.category?.name || 'Oil, Gas & Energy'} | {formatDate(oilFeatured.publishedAt)}
                    </span>
                  </div>
                </Link>
              )}

              {/* Small Articles */}
              {oilSmall.length > 0 && (
                <div className="flex flex-col gap-6">
                  {oilSmall.map((item) => (
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
        <div className="flex-1 bg-white border border-gray-200 p-6 md:p-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#24214c]">
              {sportsData?.categoryName || 'Sports & Recreation'}
            </h2>
            <div className="absolute -bottom-[2px] left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#FF0202] to-transparent"></div>
            <Link
              href={`/news?category=${encodeURIComponent(
                sportsData?.categoryName || 'Sports & Recreation'
              )}`}
              className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity"
            >
              View All <ChevronDown size={16} className="ml-1 text-[#24214c]" />
            </Link>
          </div>

          {sportsArticles.length === 0 ? (
            <EmptyCategoryState categoryName={sportsData?.categoryName || 'Sports & Recreation'} />
          ) : (
            <>
              {/* Featured Article */}
              {sportsFeatured && (
                <Link
                  href={`/news/${sportsFeatured.slug || sportsFeatured.id}`}
                  className="flex flex-col sm:flex-row gap-4 group cursor-pointer pb-2"
                >
                  <div className="relative w-full sm:w-[45%] aspect-[4/3] overflow-hidden shrink-0 bg-gray-100 rounded">
                    <Image
                      src={sportsFeatured.featuredImage || '/placeholder-news.jpg'}
                      alt={sportsFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center sm:w-[55%]">
                    <h3 className="text-[#24214c] font-bold text-[18px] leading-[1.3] group-hover:text-[#FF0202] transition-colors line-clamp-3">
                      {sportsFeatured.title}
                    </h3>
                    <span className="text-xs text-gray-500 font-medium mt-3">
                      {sportsFeatured.category?.name || 'Sports & Recreation'} | {formatDate(sportsFeatured.publishedAt)}
                    </span>
                  </div>
                </Link>
              )}

              {/* Small Articles */}
              {sportsSmall.length > 0 && (
                <div className="flex flex-col gap-6">
                  {sportsSmall.map((item) => (
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
