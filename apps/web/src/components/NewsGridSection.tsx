'use client';

import React from 'react';
import SectionContainer from './SectionContainer';
import NewsColumn, { NewsItem } from './NewsColumn';
import AdBanner from './AdBanner';
import { DynamicAd } from './ads/DynamicAd';
import NewsletterWidget from './NewsletterWidget';
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
      <SectionContainer as="section" className="bg-white py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_320px] gap-4 lg:gap-6 w-full">
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
            <Skeleton className="w-full flex-1 min-h-[340px] lg:min-h-[380px] rounded" />
            <Skeleton className="w-full flex-1 min-h-[340px] lg:min-h-[380px] rounded" />
            <Skeleton className="w-full h-[340px] xl:h-[350px] rounded-3xl" />
          </div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer as="section" className="bg-white py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_320px] items-stretch gap-4 lg:gap-6 w-full">

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

        {/* Right Sidebar - Ads & Newsletter (Fixed Width & Stretches Full Height) */}
        <div className="flex flex-col justify-between h-full gap-4 xl:gap-5">
          <DynamicAd
            ratio="ad_2"
            className="w-full flex-1 min-h-[340px] lg:min-h-[350px] xl:min-h-[380px] relative overflow-hidden shadow-sm bg-gray-100"
            objectFit="cover"
            fallback={
              <Link href="https://investfirst.ae" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                <Image
                  src="/ads/invest_600x500.png"
                  alt="InvestFirst - Investment & Finance Platform"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            }
          />
          <DynamicAd
            ratio="ad_3"
            className="w-full flex-1 min-h-[340px] lg:min-h-[350px] xl:min-h-[380px] relative overflow-hidden shadow-sm bg-gray-100"
            objectFit="cover"
            fallback={
              <Link href="https://nextmedia.ae" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                <Image
                  src="/ads/next_600x500.png"
                  alt="Next Media - Leading Media Solutions"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            }
          />
          <NewsletterWidget className="shrink-0" />
        </div>
      </div>
    </SectionContainer>
  );
};

export default NewsGridSection;
