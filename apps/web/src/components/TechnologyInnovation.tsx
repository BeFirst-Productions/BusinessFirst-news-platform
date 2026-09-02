'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from './SectionContainer';
import { ChevronDown } from 'lucide-react';
import { DynamicAd } from './ads/DynamicAd';
import { useHomeCategories } from '@/hooks/use-articles';

const EmptyCategoryState = ({ categoryName }: { categoryName: string }) => (
  <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
    <p className="text-gray-400 text-sm font-semibold">No articles available in {categoryName}</p>
  </div>
);

const TechnologyInnovation = () => {
  const { data: homeCategories } = useHomeCategories();
  const sectionData = homeCategories?.['technology-innovation'];
  const articles = sectionData?.articles || [];

  const mainArticle = articles[0];
  const bottomArticles = articles.slice(1, 3);
  const sidebarArticles = articles.slice(3, 6);

  const categoryName = sectionData?.categoryName || 'Technology & Innovation';

  return (
    <SectionContainer
      as="section"
      className="bg-white py-8 md:py-12 "
      containerClassName="flex flex-col"
    >
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6 relative pb-2 border-b border-gray-300">
        <div className="absolute left-0 bottom-[-1px] h-[2px] w-full max-w-[300px] bg-gradient-to-r from-[#cd2027] via-[#24214c] to-transparent"></div>
        <h2 className="text-[#cd2027] text-2xl md:text-3xl font-bold">
          {categoryName}
        </h2>
        <Link href={`/news?category=${encodeURIComponent(categoryName)}`} className="text-[#24214c] font-bold text-sm flex items-center gap-1 hover:text-[#cd2027] transition">
          View All <ChevronDown size={16} strokeWidth={2.5} />
        </Link>
      </div>

      {articles.length === 0 ? (
        <EmptyCategoryState categoryName={categoryName} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Column (Main Content) - Spans 7 cols on lg */}
          <div className="lg:col-span-7 flex flex-col gap-6">
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
                <div className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wider">
                  {mainArticle.category?.name || categoryName} | {mainArticle.publishedAt ? new Date(mainArticle.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                </div>
                <h3 className="text-[#24214c] text-2xl md:text-3xl font-bold leading-tight group-hover:text-[#cd2027] transition-colors line-clamp-2">
                  {mainArticle.title}
                </h3>
              </Link>
            )}

            {/* Bottom Two Articles */}
            {bottomArticles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-2">
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
                    <h4 className="text-[#24214c] font-bold text-base leading-tight mb-2 group-hover:text-[#cd2027] transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider">
                      {article.category?.name || categoryName} | {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sidebarArticles.length > 0 && (
              <div className="flex flex-col gap-5">
                {sidebarArticles.map((article) => (
                  <Link key={article.id} href={`/news/${article.slug || article.id}`} className="flex gap-3 group cursor-pointer">
                    <div className="relative w-[110px] md:w-[130px] shrink-0 aspect-[4/3] overflow-hidden rounded bg-gray-100">
                      <Image
                        src={article.featuredImage || '/placeholder-news.jpg'}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-start py-0.5">
                      <h4 className="text-[#24214c] font-bold text-sm md:text-[15px] leading-tight mb-2 group-hover:text-[#cd2027] transition-colors line-clamp-3">
                        {article.title}
                      </h4>
                      <div className="text-gray-500 text-[9px] md:text-[10px] font-medium uppercase tracking-wider">
                        {article.category?.name || categoryName} | {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Ad Banner */}
            <DynamicAd
              ratio="ad_5"
              className="w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:flex-grow overflow-hidden mt-2"
              objectFit="fill"
              fallback={
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                  alt="Advertisement Banner"
                  fill
                  className="object-fill group-hover:scale-105 transition-transform duration-500"
                />
              }
            />
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default TechnologyInnovation;
