'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from './SectionContainer';
import { ChevronRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useArticles } from '../hooks/use-articles';
import { useCategories } from '../hooks/use-categories';
import { Skeleton } from './ui/Skeleton';

const FEATURED_ANALYSIS_CATEGORY_ID = '79db4f54-ed90-4bae-9866-ef5f97a348c2';

const SponsoredContents = () => {
  const { data: categories } = useCategories();
  const featuredCategory = categories?.find(
    (c: any) =>
      c.name?.toLowerCase() === 'featured analysis' ||
      c.slug?.toLowerCase() === 'featured-analysis' ||
      c.id === FEATURED_ANALYSIS_CATEGORY_ID
  );
  const featuredCategoryId = featuredCategory?.id || FEATURED_ANALYSIS_CATEGORY_ID;

  // Query articles belonging strictly to the Featured Analysis category
  const { data: featuredRes, isLoading: isFeaturedLoading } = useArticles({
    categoryId: featuredCategoryId,
    limit: 2,
  });

  // Query Sponsored Articles
  const { data: sponsoredRes, isLoading: isSponsoredLoading } = useArticles({
    isSponsored: true,
    limit: 2,
  });

  const rawFeatured = featuredRes?.data || [];
  const rawSponsored = sponsoredRes?.data || [];

  const mapArticle = (h: any) => ({
    id: h.id,
    title: h.title,
    date: h.publishedAt
      ? `${h.readingTime || 5} mins / ${new Date(h.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`
      : '',
    image: h.featuredImage || '/placeholder-news.jpg',
    slug: `/news/${h.slug}`,
  });

  const featuredArticles = rawFeatured.map(mapArticle);
  const sponsoredArticles = rawSponsored.map(mapArticle);

  const isLoading = isFeaturedLoading || isSponsoredLoading;

  if (isLoading) {
    return (
      <SectionContainer
        as="section"
        className="bg-black py-6 md:py-8 border-t-[8px] border-black"
        containerClassName="flex flex-col"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
          {/* Featured Analysis Skeleton */}
          <div className="flex flex-col">
            <SectionTitle
              title="Featured Analysis"
              showBorder={true}
              borderColor="border-gray-800"
              titleColor="#FF0202"
              underlineColor="#FF0202"
              viewAllHref="/news?category=Featured Analysis"
              viewAllColor="#ffffff"
              viewAllHoverColor="hover:text-[#FF0202]"
              viewAllIcon={<ChevronRight size={16} strokeWidth={2.5} />}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-[#24214c] rounded-xl overflow-hidden flex flex-col h-72">
                  <Skeleton className="h-48 w-full bg-gray-700" />
                  <div className="p-5 flex-grow space-y-2 bg-[#24214c]">
                    <Skeleton className="h-4 w-full bg-gray-600" />
                    <Skeleton className="h-4 w-3/4 bg-gray-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsored Content Skeleton */}
          <div className="flex flex-col">
            <SectionTitle
              title="Sponsored Content"
              showBorder={true}
              borderColor="border-gray-800"
              titleColor="#FF0202"
              underlineColor="#FF0202"
              viewAllHref="/news?isSponsored=true"
              viewAllColor="#ffffff"
              viewAllHoverColor="hover:text-[#FF0202]"
              viewAllIcon={<ChevronRight size={16} strokeWidth={2.5} />}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-[#24214c] rounded-xl overflow-hidden flex flex-col h-72">
                  <Skeleton className="h-48 w-full bg-gray-700" />
                  <div className="p-5 flex-grow space-y-2 bg-[#24214c]">
                    <Skeleton className="h-4 w-full bg-gray-600" />
                    <Skeleton className="h-4 w-3/4 bg-gray-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      as="section"
      className="bg-black py-6 md:py-8 border-t-[8px] border-black"
      containerClassName="flex flex-col"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
        {/* Left Column: Featured Analysis */}
        <div className="flex flex-col w-full">
          <SectionTitle
            title="Featured Analysis"
            showBorder={true}
            borderColor="border-gray-800"
            titleColor="#FF0202"
            underlineColor="#FF0202"
            viewAllHref="/news?category=Featured Analysis"
            viewAllColor="#ffffff"
            viewAllHoverColor="hover:text-[#FF0202]"
            viewAllIcon={<ChevronRight size={16} strokeWidth={2.5} />}
          />

          {featuredArticles.length === 0 ? (
            <div className="w-full py-12 flex flex-col items-center justify-center bg-white/5 border border-dashed border-gray-700 rounded-lg text-center my-4">
              <p className="text-gray-400 text-sm font-semibold">No article available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  href={article.slug}
                  key={article.id}
                  className="bg-[#24214c] rounded-xl overflow-hidden flex flex-col hover:transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer shadow-lg group"
                >
                  <div className="relative h-48 sm:h-52 w-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-[16px] leading-snug mb-3 line-clamp-2 min-h-0 md:min-h-[2.4rem] break-words group-hover:text-[#e2b036] transition-colors font-newsreader">
                      {article.title}
                    </h3>
                    <span className="text-[#e2b036] text-[10px] md:text-[11px] font-medium mt-auto">
                      {article.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Sponsored Content */}
        <div className="flex flex-col w-full">
          <SectionTitle
            title="Sponsored Content"
            showBorder={true}
            borderColor="border-gray-800"
            titleColor="#FF0202"
            underlineColor="#FF0202"
            viewAllHref="/news?isSponsored=true"
            viewAllColor="#ffffff"
            viewAllHoverColor="hover:text-[#FF0202]"
            viewAllIcon={<ChevronRight size={16} strokeWidth={2.5} />}
          />

          {sponsoredArticles.length === 0 ? (
            <div className="w-full py-12 flex flex-col items-center justify-center bg-white/5 border border-dashed border-gray-700 rounded-lg text-center my-4">
              <p className="text-gray-400 text-sm font-semibold">No article available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sponsoredArticles.map((article) => (
                <Link
                  href={article.slug}
                  key={article.id}
                  className="bg-[#24214c] rounded-xl overflow-hidden flex flex-col hover:transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer shadow-lg group"
                >
                  <div className="relative h-48 sm:h-52 w-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-[16px] leading-snug mb-3 line-clamp-2 min-h-0 md:min-h-[2.4rem] break-words group-hover:text-[#e2b036] transition-colors font-newsreader">
                      {article.title}
                    </h3>
                    <span className="text-[#e2b036] text-[10px] md:text-[11px] font-medium mt-auto">
                      {article.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default SponsoredContents;
