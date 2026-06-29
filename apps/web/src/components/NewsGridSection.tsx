'use client';

import React from 'react';
import SectionContainer from './SectionContainer';
import NewsColumn, { NewsItem } from './NewsColumn';
import AdBanner from './AdBanner';
import NewsletterWidget from './NewsletterWidget';
import { useArticles } from '../hooks/use-articles';
import { Skeleton } from './ui/Skeleton';

// --- Dummy Data (Fallbacks) ---
const dummyFeaturedTrending: NewsItem = {
  id: 'ft1',
  title: 'How 5G Will Transform Communication and Connectivity',
  category: 'Oil, Gas & Energy',
  date: 'July 23, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
};

const dummyFeaturedUAE: NewsItem = {
  id: 'fu1',
  title: 'How 5G Will Transform Communication and Connectivity',
  category: 'Oil, Gas & Energy',
  date: 'July 23, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=800&q=80'
};

const dummyMediumGrid: NewsItem[] = [
  {
    id: 'm1',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'm2',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'm3',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1574328405096-7fcfa4a9b583?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'm4',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80'
  }
];

const dummySmallList: NewsItem[] = [
  {
    id: 's1',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 's2',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 's3',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=200&q=80'
  }
];

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
    imageUrl: article.featuredImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  });

  const trendingList = (trendingRes?.data || []).map(mapToNewsItem);
  const uaeList = (uaeRes?.data || []).map(mapToNewsItem);

  const renderColumnData = (list: NewsItem[], fallbackFeatured: NewsItem) => {
    if (list.length === 0) {
      return {
        featured: fallbackFeatured,
        mediumGrid: dummyMediumGrid,
        smallList: dummySmallList,
      };
    }

    return {
      featured: list[0] || fallbackFeatured,
      mediumGrid: list.slice(1, 5).concat(dummyMediumGrid.slice(Math.max(0, list.length - 1))), // Pad if needed
      smallList: list.slice(5, 8).concat(dummySmallList.slice(Math.max(0, list.length - 5))),   // Pad if needed
    };
  };

  const trendingData = renderColumnData(trendingList, dummyFeaturedTrending);
  const uaeData = renderColumnData(uaeList, dummyFeaturedUAE);

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
            featured={trendingData.featured}
            mediumGrid={trendingData.mediumGrid}
            smallList={trendingData.smallList}
          />
        </div>

        {/* Center Column - UAE News (Spans 4/12) */}
        <div className="lg:col-span-4 border-r-0 lg:border-r border-gray-200 lg:pr-4 xl:pr-6">
          <NewsColumn 
            title="UAE News" 
            titleColor="#cd2027"
            featured={uaeData.featured}
            mediumGrid={uaeData.mediumGrid}
            smallList={uaeData.smallList}
          />
        </div>

        {/* Right Column - Ads & Newsletter (Spans 4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-6 flex-1 min-h-[600px] lg:min-h-0">
            <AdBanner 
              imageUrl="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" 
              altText="Burger Ad 1" 
              className="flex-[7] shadow-sm"
            />
            <AdBanner 
              imageUrl="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80" 
              altText="Burger Ad 2" 
              className="flex-[4] shadow-sm"
            />
          </div>
          <NewsletterWidget />
        </div>
      </div>
    </SectionContainer>
  );
};

export default NewsGridSection;
