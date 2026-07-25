'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import SectionContainer from './SectionContainer';
import { DynamicAd } from './ads/DynamicAd';
import NewsletterWidget from './NewsletterWidget';
import { useHomeCategories } from '@/hooks/use-articles';

const EmptyCategoryState = ({ categoryName }: { categoryName: string }) => (
  <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
    <p className="text-gray-400 text-sm font-semibold">No articles available in {categoryName}</p>
  </div>
);

const BankingFinanceSection: React.FC = () => {
  const { data: homeCategories } = useHomeCategories();

  const bankingData = homeCategories?.['banking-finance'];
  const articles = bankingData?.articles || [];

  const mainFeatured = articles[0];
  const smallArticles = articles.slice(1, 4);
  const mediumArticles = articles.slice(4, 7);

  const categoryName = bankingData?.categoryName || 'Banking & Finance';

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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full items-start">
        {/* Left 8 Cols */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#24214c]">{categoryName}</h2>
            <div className="absolute -bottom-[2px] left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#FF0202] to-transparent"></div>
            <Link
              href={`/news?category=${encodeURIComponent(categoryName)}`}
              className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity"
            >
              View All <ChevronDown size={16} className="ml-1 text-[#24214c]" />
            </Link>
          </div>

          {articles.length === 0 ? (
            <EmptyCategoryState categoryName={categoryName} />
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-6 w-full items-stretch">
                {/* Main Featured Article (Left 50%) */}
                {mainFeatured && (
                  <div className="w-full md:w-1/2 flex flex-col">
                    <Link
                      href={`/news/${mainFeatured.slug || mainFeatured.id}`}
                      className="flex flex-col group cursor-pointer h-full"
                    >
                      <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0 bg-gray-100 rounded">
                        <Image
                          src={mainFeatured.featuredImage || '/placeholder-news.jpg'}
                          alt={mainFeatured.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col mt-3 flex-grow">
                        <h3 className="text-[#24214c] font-bold text-[18px] leading-[1.3] group-hover:text-[#FF0202] transition-colors line-clamp-3">
                          {mainFeatured.title}
                        </h3>
                        <span className="text-xs text-gray-500 font-medium mt-2">
                          {mainFeatured.category?.name || categoryName} | {formatDate(mainFeatured.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Small Articles (Right 50%) */}
                {smallArticles.length > 0 && (
                  <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
                    {smallArticles.map((item) => (
                      <Link
                        key={item.id}
                        href={`/news/${item.slug || item.id}`}
                        className="flex gap-3 group cursor-pointer items-center"
                      >
                        <div className="relative w-[35%] aspect-[4/3] shrink-0 overflow-hidden bg-gray-100 rounded">
                          <Image
                            src={item.featuredImage || '/placeholder-news.jpg'}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex flex-col justify-center w-[65%]">
                          <h4 className="text-[#24214c] font-bold text-[13px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-medium mt-1">
                            {item.category?.name || categoryName} | {formatDate(item.publishedAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Medium Grid Cards */}
              {mediumArticles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                  {mediumArticles.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug || item.id}`}
                      className="flex flex-col group cursor-pointer"
                    >
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 rounded mb-2">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-[#24214c] font-bold text-[13px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-medium mt-1">
                        {item.category?.name || categoryName} | {formatDate(item.publishedAt)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right 4 Cols: Ad Banner & Newsletter */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <DynamicAd
            ratio="ad_5"
            className="w-full aspect-[4/3] rounded overflow-hidden"
            fallback={
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                alt="Ad Banner"
                fill
                className="object-cover"
              />
            }
          />
          <NewsletterWidget />
        </div>
      </div>
    </SectionContainer>
  );
};

export default BankingFinanceSection;
