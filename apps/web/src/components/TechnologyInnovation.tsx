'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from './SectionContainer';
import { ChevronDown } from 'lucide-react';
import { DynamicAd } from './ads/DynamicAd';
import { useHomeCategories, useArticles } from '@/hooks/use-articles';

const EmptyCategoryState = ({ categoryName }: { categoryName: string }) => (
  <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
    <p className="text-gray-400 text-sm font-semibold">No articles available in {categoryName}</p>
  </div>
);

const TechnologyInnovation = () => {
  const { data: homeCategories } = useHomeCategories();
  const sectionData = homeCategories?.['technology-innovation'];
  const initialArticles = sectionData?.articles || [];

  const categoryId = initialArticles[0]?.category?.id || '5dd42c29-4bd4-4e79-b6a6-909c9cf2b14e';

  // If homeCategories returns fewer than 9 articles, fetch all 9 articles for this category
  const { data: fullArticlesResponse } = useArticles(
    {
      categoryId,
      limit: 9,
    },
    { enabled: initialArticles.length < 9 }
  );

  const articles =
    fullArticlesResponse?.data && fullArticlesResponse.data.length >= 9
      ? fullArticlesResponse.data
      : initialArticles;

  const mainArticle = articles[0];
  const bottomArticles = articles.slice(1, 3);
  const sidebarArticles = articles.slice(3, 9);

  const categoryName = sectionData?.categoryName || 'Technology & Innovation';

  const mainExcerpt =
    mainArticle?.excerpt ||
    (mainArticle as any)?.content?.replace(/<[^>]*>/g, '').trim();

  return (
    <SectionContainer
      as="section"
      className="bg-white py-6 md:py-8 "
      containerClassName="flex flex-col"
    >
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6 relative pb-2 border-b border-gray-300 gap-3 sm:gap-4 md:gap-6">
        <div className="absolute left-0 bottom-[-1px] h-[2px] w-full max-w-[300px] bg-gradient-to-r from-[#cd2027] via-[#24214c] to-transparent pointer-events-none"></div>
        <h2 className="text-[#FF0202] text-xl sm:text-2xl md:text-3xl font-bold font-newsreader min-w-0 break-words leading-tight">
          {categoryName}
        </h2>
        <Link href={`/news?category=${encodeURIComponent(categoryName)}`} className="text-[#24214c] font-bold text-xs sm:text-sm flex items-center gap-1 hover:text-[#cd2027] transition shrink-0 whitespace-nowrap pb-0.5">
          View All <ChevronDown size={16} strokeWidth={2.5} />
        </Link>
      </div>

      {articles.length === 0 ? (
        <EmptyCategoryState categoryName={categoryName} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
          {/* Left Column (Main Content) - Spans 7 cols on lg */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            {/* Main Top Article */}
            {mainArticle && (
              <Link href={`/news/${mainArticle.slug || mainArticle.id}`} className="flex flex-col group cursor-pointer">
                <div className="relative w-full aspect-[16/9] mb-3 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={mainArticle.featuredImage || '/placeholder-news.jpg'}
                    alt={mainArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-[#24214c] font-bold text-lg xl:text-[22px] leading-tight group-hover:text-[#cd2027] transition-colors line-clamp-2 min-h-0 md:min-h-[45px] break-words font-newsreader">
                  {mainArticle.title}
                </h3>
                <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-1">
                  {mainArticle.category?.name || categoryName} | {mainArticle.publishedAt ? new Date(mainArticle.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                </span>
                {mainExcerpt && (
                  <p className="text-gray-600 text-xs sm:text-[13px] xl:text-[14px] leading-relaxed line-clamp-2 mt-2 font-normal">
                    {mainExcerpt}
                  </p>
                )}
              </Link>
            )}

            {/* Bottom Two Articles */}
            {bottomArticles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4 pt-3 border-t border-gray-100">
                {bottomArticles.map((article) => (
                  <Link key={article.id} href={`/news/${article.slug || article.id}`} className="flex flex-col group cursor-pointer">
                    <div className="relative w-full aspect-[16/9] mb-3 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={article.featuredImage || '/placeholder-news.jpg'}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="text-[#24214c] font-bold text-xs sm:text-sm md:text-[16px] leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2 min-h-0 md:min-h-[2.4rem] break-words font-newsreader">
                      {article.title}
                    </h4>
                    <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto pt-1">
                      {article.category?.name || categoryName} | {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            {sidebarArticles.length > 0 && (
              <div className="flex flex-col justify-between flex-1 gap-2.5 sm:gap-3 lg:gap-2 xl:gap-2.5 2xl:gap-3 mb-4">
                {sidebarArticles.map((article) => (
                  <Link key={article.id} href={`/news/${article.slug || article.id}`} className="flex gap-2.5 lg:gap-3 xl:gap-3.5 group cursor-pointer items-start">
                    <div className="relative w-[85px] sm:w-[95px] lg:w-[84px] xl:w-[98px] 2xl:w-[115px] shrink-0 aspect-[4/3] overflow-hidden rounded-md lg:rounded-lg bg-gray-100">
                      <Image
                        src={article.featuredImage || '/placeholder-news.jpg'}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-start min-w-0 flex-1 py-0.5">
                      <h4 className="text-[#24214c] font-bold text-xs sm:text-sm md:text-[15px] xl:text-[16px] leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2 min-h-0 md:min-h-[2.4rem] break-words font-newsreader">
                        {article.title}
                      </h4>
                      <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto">
                        {article.category?.name || categoryName} | {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Ad Banner - Proportional 12/5 aspect ratio matching 600x250 */}
            <div className="mt-auto shrink-0">
              <DynamicAd
                ratio="ad_5"
                className="w-full aspect-[12/5] rounded-lg overflow-hidden"
                objectFit="cover"
                fallback={
                  <Link href="https://nextmedia.ae" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                    <Image
                      src="/ads/Business_First_600X250.jpeg"
                      alt="Next Media - Branding & Marketing Solutions"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default TechnologyInnovation;
