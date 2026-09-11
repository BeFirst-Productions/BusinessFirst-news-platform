'use client';

import React from 'react';
import SectionContainer from './SectionContainer';
import NewsColumn, { NewsItem } from './NewsColumn';
import AdBanner from './AdBanner';
import { DynamicAd } from './ads/DynamicAd';
import MagazineCarousel from './MagazineCarousel';
import Image from 'next/image';
import Link from 'next/link';
import { useArticles } from '../hooks/use-articles';
import { Skeleton } from './ui/Skeleton';

const NewsGridSection = () => {
  // Query Trending Articles
  const { data: trendingRes, isLoading: isTrendingLoading } = useArticles({
    isTrending: true,
    limit: 8,
  });

  // Query UAE Articles
  const { data: uaeRes, isLoading: isUaeLoading } = useArticles({
    isUaeNews: true,
    limit: 8,
  });

  const mapToNewsItem = (article: any): NewsItem => ({
    id: article.slug,
    title: article.title,
    category: article.category?.name || 'News',
    date: article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
      : '',
    imageUrl: article.featuredImage || '/placeholder-news.jpg',
  });

  const trendingList = (trendingRes?.data || []).map(mapToNewsItem);
  const uaeList = (uaeRes?.data || []).map(mapToNewsItem);

  const showSkeleton = isTrendingLoading || isUaeLoading;

  if (showSkeleton) {
    return (
      <SectionContainer as="section" className="bg-white py-6 md:py-8" containerClassName="xl:px-[64px] 2xl:px-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_240px] xl:grid-cols-[1fr_1fr_280px] 2xl:grid-cols-[1fr_1fr_300px] gap-4 lg:gap-5 xl:gap-6 w-full">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full rounded" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full rounded" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
          <div className="flex flex-col justify-between lg:h-full gap-4 xl:gap-5">
            <Skeleton className="w-full flex-1 min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] rounded" />
            <Skeleton className="w-full flex-1 min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] rounded" />
            <Skeleton className="w-full flex-1 min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] rounded" />
          </div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer as="section" className="bg-white py-6 md:py-8" containerClassName="xl:px-[64px] 2xl:px-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_240px] xl:grid-cols-[1fr_1fr_280px] 2xl:grid-cols-[1fr_1fr_300px] items-stretch gap-4 lg:gap-5 xl:gap-6 w-full">

        {/* Left Column - Trending News */}
        <div className="border-r-0 lg:border-r border-gray-200 lg:pr-4 xl:pr-6">
          <NewsColumn
            title="Trending News"
            titleColor="#FF0202"
            articles={trendingList}
          />
        </div>

        {/* Center Column - UAE News */}
        <div className="border-r-0 lg:border-r border-gray-200 lg:pr-4 xl:pr-6">
          <NewsColumn
            title="UAE News"
            titleColor="#FF0202"
            articles={uaeList}
          />
        </div>

        {/* Right Sidebar - Ads & Magazine */}
        <div className="flex flex-col justify-between h-full min-h-0 gap-4 xl:gap-5">
          {/* Top Banner Ad */}
          <DynamicAd
            ratio="ad_2"
            className="w-full aspect-[4/5] lg:aspect-auto lg:h-0 flex-1 min-h-0 relative overflow-hidden shadow-sm bg-gray-100"
            objectFit="cover"
            fallback={
              <Link href="https://investfirst.ae" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                <Image
                  src="/ads/invest_240x300.png"
                  alt="ShopMate Mega Sale"
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </Link>
            }
          />

          {/* Middle Slot: Auto-scrolling Magazine Carousel */}
          <MagazineCarousel className="w-full aspect-[4/5] lg:aspect-auto lg:h-0 flex-1 min-h-0 relative overflow-hidden shadow-sm bg-neutral-950" />

          {/* Bottom Slot: Second Banner Ad */}
          <DynamicAd
            ratio="ad_3"
            className="w-full aspect-[4/5] lg:aspect-auto lg:h-0 flex-1 min-h-0 relative overflow-hidden shadow-sm bg-gray-100"
            objectFit="cover"
            fallback={
              <Link href="https://nextmedia.ae" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                <Image
                  src="/ads/next_240x300.png"
                  alt="Next Media - Leading Media Solutions"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            }
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default NewsGridSection;
