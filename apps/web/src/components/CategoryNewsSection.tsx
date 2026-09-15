'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import SectionContainer from './SectionContainer';
import type { Article, Category } from '@businessfirst/shared-types';
import { Skeleton } from './ui/Skeleton';



// ==================== API HOOK ====================

import { useHomeCategories } from '@/hooks/use-articles';

function useCategoryNewsData() {
  const { data: homeCategories, isLoading, isError } = useHomeCategories();

  const leftSec = homeCategories?.['real-estate-construction'];
  const rightSec = homeCategories?.['economy-policy'];

  const leftCategory: Category = {
    id: leftSec?.categorySlug || 'real-estate-construction',
    name: leftSec?.categoryName || 'Real Estate & Construction',
    slug: leftSec?.categorySlug || 'real-estate-construction',
    isActive: true,
  } as Category;

  const rightCategory: Category = {
    id: rightSec?.categorySlug || 'economy-policy',
    name: rightSec?.categoryName || 'Economy & Policy',
    slug: rightSec?.categorySlug || 'economy-policy',
    isActive: true,
  } as Category;

  return {
    data: {
      leftCategory,
      leftArticles: leftSec?.articles || [],
      rightCategory,
      rightArticles: rightSec?.articles || [],
    },
    isLoading,
    isError,
    error: isError ? new Error('Failed to load category sections') : null,
  };
}

// ==================== HELPER FUNCTIONS ====================

function formatDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// ==================== SUB-COMPONENTS ====================

interface FeaturedArticleProps {
  article: Article;
  imageClassName?: string;
  showExcerpt?: boolean;
}

function FeaturedArticle({ article, imageClassName, showExcerpt = false }: FeaturedArticleProps) {
  const excerptText = article.excerpt || (article as any).content?.replace(/<[^>]*>/g, '').trim();

  return (
    <Link href={`/news/${article.slug}`} className="flex flex-col gap-1.5 group cursor-pointer">
      <div className={`relative w-full overflow-hidden rounded ${imageClassName || 'aspect-[16/9]'}`}>
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
      </div>
      <h3 className="text-[#24214c] font-bold text-lg xl:text-[22px] leading-tight group-hover:text-[#cd2027] transition-colors line-clamp-2 min-h-[45px] font-newsreader mt-1.5">
        {article.title}
      </h3>
      <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-0.5">
        {article.category?.name || 'News'} | {formatDate(article.publishedAt)}
      </span>
      {showExcerpt && excerptText && (
        <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed line-clamp-2 2xl:line-clamp-3 mt-1 font-normal">
          {excerptText}
        </p>
      )}
    </Link>
  );
}

interface HorizontalArticleItemProps {
  article: Article;
  isSidebar?: boolean;
  showExcerpt?: boolean;
  className?: string;
}

function HorizontalArticleItem({
  article,
  isSidebar = false,
  showExcerpt = false,
  className,
}: HorizontalArticleItemProps) {
  const excerptText = article.excerpt || (article as any).content?.replace(/<[^>]*>/g, '').trim();

  return (
    <Link
      href={`/news/${article.slug}`}
      className={`group cursor-pointer py-1 items-start ${isSidebar ? 'gap-3 xl:gap-4' : 'gap-4 sm:gap-5'} ${className ?? 'flex'}`}
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-md ${
          isSidebar
            ? 'w-[95px] h-[72px] sm:w-[105px] sm:h-[80px] xl:w-[135px] xl:h-[95px] 2xl:w-[155px] 2xl:h-[105px]'
            : 'w-[130px] sm:w-[160px] h-[95px] sm:h-[110px] 2xl:w-[170px] 2xl:h-[115px]'
        }`}
      >
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes={isSidebar ? '(max-width: 1280px) 105px, 155px' : '170px'}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-[10px]">No Image</span>
          </div>
        )}
      </div>
      <div className={`flex flex-col min-w-0 flex-1 ${showExcerpt && !isSidebar ? 'min-h-[95px] sm:min-h-[110px] 2xl:min-h-[115px]' : ''}`}>
        <h4 className="text-[#24214c] font-bold text-xs sm:text-sm md:text-[16px] leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2 font-newsreader">
          {article.title}
        </h4>
        <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-1">
          {article.category?.name || 'News'} | {formatDate(article.publishedAt)}
        </span>
        {showExcerpt && excerptText && (
          <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed line-clamp-2 2xl:line-clamp-3 mt-1 font-normal">
            {excerptText}
          </p>
        )}
      </div>
    </Link>
  );
}

interface VerticalArticleItemProps {
  article: Article;
  isFirst?: boolean;
}

function VerticalArticleItem({ article, isFirst = false }: VerticalArticleItemProps) {
  const excerptText = article.excerpt || (article as any).content?.replace(/<[^>]*>/g, '').trim();

  return (
    <Link href={`/news/${article.slug}`} className="flex flex-col gap-1.5 group cursor-pointer flex-1">
      <div className={`relative w-full overflow-hidden rounded ${isFirst ? 'aspect-[4/3]' : 'aspect-video'}`}>
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
      </div>
      <h4 className="text-[#24214c] font-bold text-xs sm:text-sm md:text-[16px] leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2 font-newsreader mt-0.5">
        {article.title}
      </h4>
      <span className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-0.5">
        {article.category?.name || 'News'} | {formatDate(article.publishedAt)}
      </span>
      {excerptText && (
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 2xl:line-clamp-3 mt-1 font-normal">
          {excerptText}
        </p>
      )}
    </Link>
  );
}

// ==================== SKELETON COMPONENTS ====================

function CategorySectionSkeleton() {
  return (
    <SectionContainer as="section" className="bg-white py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full">
        {/* Left Block Skeleton */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              <Skeleton className="aspect-[16/9] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-4 pt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-40 h-28 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 space-y-6">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="aspect-video w-full rounded-lg" />
            </div>
          </div>
        </div>
        {/* Right Block Skeleton */}
        <div className="lg:col-span-4">
          <div className="bg-[#F5F5F5] p-6 lg:p-8 flex flex-col gap-6 h-full border border-gray-100">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="aspect-[16/9] w-full rounded-lg" />
            <Skeleton className="h-6 w-full" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="w-28 h-16 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function EmptyState({ categoryName }: { categoryName: string }) {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
      <p className="text-gray-400 text-sm font-semibold">
        No article available in {categoryName}
      </p>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

const CategoryNewsSection = () => {
  const { data, isLoading, error } = useCategoryNewsData();

  // Loading state
  if (isLoading) {
    return <CategorySectionSkeleton />;
  }

  // Error state - show empty sections gracefully
  if (error || !data) {
    return (
      <SectionContainer as="section" className="bg-white py-6 md:py-8">
        <div className="text-center py-8">
          <p className="text-red-500 text-sm">
            Unable to load category news. Please try again later.
          </p>
        </div>
      </SectionContainer>
    );
  }

  const { leftCategory, leftArticles, rightCategory, rightArticles } = data;

  // Get featured article and split remaining
  const leftFeatured = leftArticles[0];
  // On 2xl screens, leftSmall displays 4 articles (the 4th is hidden below 2xl) to fill vertical space
  const leftSmall = leftArticles.length >= 8
    ? leftArticles.slice(1, 5)
    : leftArticles.slice(1, 4);
  const leftMedium = leftArticles.length >= 8
    ? leftArticles.slice(5, 8)
    : leftArticles.slice(4, 7);

  const rightFeatured = rightArticles[0];
  const rightSmall = rightArticles.slice(1, 6);

  return (
    <SectionContainer as="section" className="bg-white py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full items-stretch">
        {/* Left Block - Spans 8/12 */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">
                {leftCategory?.name || 'Real Estate & Construction'}
              </h2>
              <div className="absolute -bottom-[9px] left-0 w-full h-[3px] bg-[#FF0202]" />
            </div>
            {leftCategory && (
              <Link
                href={`/news/category/${leftCategory.slug}`}
                className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity"
              >
                View All{' '}
                <ChevronDown size={16} className="ml-1 text-gray-500" />
              </Link>
            )}
          </div>

          {leftArticles.length === 0 ? (
            <EmptyState categoryName={leftCategory?.name || 'this category'} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch flex-1">
              {/* Left Sub-column */}
              <div className="md:col-span-8 flex flex-col justify-between h-full">
                {/* Featured Article */}
                {leftFeatured && (
                  <FeaturedArticle
                    article={leftFeatured}
                    imageClassName="aspect-[16/9]"
                    showExcerpt={true}
                  />
                )}

                {/* Small Horizontal List - 4th article displays on 2xl screens to fill vertical space */}
                {leftSmall.length > 0 && (
                  <div className="flex flex-col gap-4 sm:gap-5 2xl:gap-4 mt-4 sm:mt-5">
                    {leftSmall.map((article, index) => (
                      <HorizontalArticleItem
                        key={article.id}
                        article={article}
                        showExcerpt={true}
                        className={index >= 3 ? 'hidden 2xl:flex' : 'flex'}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Sub-column */}
              <div className="md:col-span-4 flex flex-col justify-between h-full gap-4 lg:gap-5">
                {leftMedium.map((article, index) => (
                  <VerticalArticleItem
                    key={article.id}
                    article={article}
                    isFirst={index === 0}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Block - Spans 4/12 */}
        <div className="lg:col-span-4 flex flex-col w-full h-full">
          <div className="bg-[#F5F5F5] p-5 lg:p-6 xl:p-7 2xl:p-8 flex flex-col justify-between flex-1 border border-gray-100 rounded">
            <div>
              {/* Header */}
              <div className="flex flex-wrap lg:flex-col xl:flex-row justify-between items-start xl:items-center border-b border-gray-300 pb-2 gap-2 xl:gap-0">
                <div className="relative">
                  <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">
                    {rightCategory?.name || 'Economy & Policy'}
                  </h2>
                  <div className="absolute -bottom-[9px] left-0 w-full h-[3px] bg-[#FF0202] hidden xl:block" />
                </div>
                {rightCategory && (
                  <Link
                    href={`/news/category/${rightCategory.slug}`}
                    className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity whitespace-nowrap lg:mt-1 xl:mt-0"
                  >
                    View All{' '}
                    <ChevronDown size={16} className="ml-1 text-gray-500" />
                  </Link>
                )}
              </div>

              {rightArticles.length === 0 ? (
                <EmptyState categoryName={rightCategory?.name || 'this category'} />
              ) : (
                <>
                  {/* Featured Article */}
                  {rightFeatured && (
                    <FeaturedArticle
                      article={rightFeatured}
                      imageClassName="aspect-[16/9] mt-3"
                      showExcerpt={true}
                    />
                  )}
                </>
              )}
            </div>

            {/* Small Horizontal List - evenly distributed to fill available height on 2xl */}
            {rightSmall.length > 0 && (
              <div className="flex flex-col justify-between flex-1 gap-4 xl:gap-5 2xl:gap-6 mt-4 2xl:mt-6 pt-3 2xl:pt-4 border-t border-gray-200/60">
                {rightSmall.map((article) => (
                  <HorizontalArticleItem
                    key={article.id}
                    article={article}
                    isSidebar={true}
                    showExcerpt={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CategoryNewsSection;