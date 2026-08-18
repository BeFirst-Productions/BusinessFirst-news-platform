'use client';

import React from 'react';
import SectionContainer from './SectionContainer';
import NewsColumn, { NewsItem } from './NewsColumn';
import AdBanner from './AdBanner';
import { DynamicAd } from './ads/DynamicAd';
import NewsletterWidget from './NewsletterWidget';
import Image from 'next/image';
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
      <SectionContainer as="section" className="bg-white py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full">
          <div className="lg:col-span-4 space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full rounded" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full rounded" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full">

        {/* Left Column - Trending News (Spans 4/12) */}
        <div className="lg:col-span-4 border-r-0 lg:border-r border-gray-200 lg:pr-4 xl:pr-6">
          <NewsColumn
            title="Trending News"
            titleColor="#FF0202"
            articles={trendingList}
          />
        </div>

        {/* Center Column - UAE News (Spans 4/12) */}
        <div className="lg:col-span-4 border-r-0 lg:border-r border-gray-200 lg:pr-4 xl:pr-6">
          <NewsColumn
            title="UAE News"
            titleColor="#cd2027"
            articles={uaeList}
          />
        </div>

        {/* Right Column - Ads & Newsletter (Spans 4/12) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6 h-full min-h-0">
          <DynamicAd
            ratio="ad_2"
            className="w-full flex-1 min-h-[260px] lg:min-h-0 relative overflow-hidden shadow-sm"
            fallback={
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
                alt="Burger Ad 1"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            }
          />
          <DynamicAd
            ratio="ad_3"
            className="w-full flex-1 min-h-[220px] lg:min-h-0 relative overflow-hidden shadow-sm"
            fallback={
              <Image
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
                alt="Burger Ad 2"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            }
          />
          <NewsletterWidget />
        </div>
      </div>
    </SectionContainer>
  );
};

export default NewsGridSection;
