'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import SectionContainer from './SectionContainer';
import { apiClient } from '@/lib/api-client';
import type { Article, Category } from '@businessfirst/shared-types';
import { Skeleton } from './ui/Skeleton';

// ==================== TYPES ====================

interface CategorySectionData {
  leftCategory: Category | null;
  leftArticles: Article[];
  rightCategory: Category | null;
  rightArticles: Article[];
}

// ==================== CONSTANTS ====================

const CATEGORY_SLUGS = {
  LEFT: 'real-estate-construction',
  RIGHT: 'economy-policy',
} as const;

// ==================== API HOOK ====================

function useCategoryNewsData() {
  return useQuery<CategorySectionData>({
    queryKey: ['category-news-section'],
    queryFn: async () => {
      // Fetch both categories in parallel
      const [leftCategory, rightCategory] = await Promise.all([
        apiClient.get<Category>(`/website/categories/slug/${CATEGORY_SLUGS.LEFT}`, {
          params: { isActive: true },
        }).catch(() => null),
        apiClient.get<Category>(`/website/categories/slug/${CATEGORY_SLUGS.RIGHT}`, {
          params: { isActive: true },
        }).catch(() => null),
      ]);

      // Fetch articles for both categories in parallel
      const [leftArticlesRes, rightArticlesRes] = await Promise.all([
        leftCategory
          ? apiClient.getPaginated<Article>('/website/articles', {
              params: {
                categoryId: leftCategory.id,
                status: 'PUBLISHED',
                limit: 8,
                sortBy: 'publishedAt',
                sortOrder: 'desc',
              },
            }).catch(() => ({ data: [], metadata: { page: 1, limit: 0, total: 0, totalPages: 0 } }))
          : Promise.resolve({ data: [], metadata: { page: 1, limit: 0, total: 0, totalPages: 0 } }),
        rightCategory
          ? apiClient.getPaginated<Article>('/website/articles', {
              params: {
                categoryId: rightCategory.id,
                status: 'PUBLISHED',
                limit: 6,
                sortBy: 'publishedAt',
                sortOrder: 'desc',
              },
            }).catch(() => ({ data: [], metadata: { page: 1, limit: 0, total: 0, totalPages: 0 } }))
          : Promise.resolve({ data: [], metadata: { page: 1, limit: 0, total: 0, totalPages: 0 } }),
      ]);

      return {
        leftCategory,
        leftArticles: leftArticlesRes.data,
        rightCategory,
        rightArticles: rightArticlesRes.data,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
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
}

function FeaturedArticle({ article, imageClassName }: FeaturedArticleProps) {
  return (
    <Link href={`/news/${article.slug}`} className="flex flex-col gap-2 group cursor-pointer">
      <div className={`relative w-full overflow-hidden ${imageClassName || 'aspect-[16/9]'}`}>
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
      <span className="text-xs text-gray-500 font-medium mt-2">
        {article.category?.name || 'News'} | {formatDate(article.publishedAt)}
      </span>
      <h3 className="text-[#24214c] font-bold text-lg md:text-xl leading-tight group-hover:text-[#cd2027] transition-colors line-clamp-2">
        {article.title}
      </h3>
    </Link>
  );
}

interface HorizontalArticleItemProps {
  article: Article;
}

function HorizontalArticleItem({ article }: HorizontalArticleItemProps) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="flex gap-4 group cursor-pointer items-center"
    >
      <div className="relative w-28 h-16 shrink-0 overflow-hidden rounded">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="112px"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-[10px]">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="text-[#24214c] font-bold text-sm leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2">
          {article.title}
        </h4>
        <span className="text-[10px] text-gray-500 font-medium mt-1">
          {article.category?.name || 'News'} | {formatDate(article.publishedAt)}
        </span>
      </div>
    </Link>
  );
}

interface VerticalArticleItemProps {
  article: Article;
  isFirst?: boolean;
}

function VerticalArticleItem({ article, isFirst = false }: VerticalArticleItemProps) {
  return (
    <Link href={`/news/${article.slug}`} className="flex flex-col gap-2 group cursor-pointer">
      <div className={`relative w-full overflow-hidden ${isFirst ? 'aspect-[4/3]' : 'aspect-video'}`}>
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
      <h4 className="text-[#24214c] font-bold text-base leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2">
        {article.title}
      </h4>
      <span className="text-xs text-gray-500 font-medium">
        {article.category?.name || 'News'} | {formatDate(article.publishedAt)}
      </span>
    </Link>
  );
}

// ==================== SKELETON COMPONENTS ====================

function CategorySectionSkeleton() {
  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full">
        {/* Left Block Skeleton */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 flex flex-col gap-6">
              <Skeleton className="aspect-[16/9] w-full rounded-lg" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
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
            <div className="md:col-span-4 flex flex-col gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className={i === 0 ? 'aspect-[4/3] w-full' : 'aspect-video w-full'} />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
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
    <div className="text-center py-12">
      <p className="text-gray-500">
        No articles found in {categoryName}. Check back later for updates.
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
      <SectionContainer as="section" className="bg-white py-8 md:py-12">
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
  const leftSmall = leftArticles.slice(1, 5);
  const leftMedium = leftArticles.slice(5, 8);

  const rightFeatured = rightArticles[0];
  const rightSmall = rightArticles.slice(1, 6);

  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full">
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Sub-column */}
              <div className="md:col-span-8 flex flex-col gap-6">
                {/* Featured Article */}
                {leftFeatured && (
                  <FeaturedArticle
                    article={leftFeatured}
                    imageClassName="aspect-[16/9]"
                  />
                )}

                {/* Small Horizontal List */}
                {leftSmall.length > 0 && (
                  <div className="flex flex-col gap-4 mt-2">
                    {leftSmall.map((article) => (
                      <HorizontalArticleItem
                        key={article.id}
                        article={article}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Sub-column */}
              <div className="md:col-span-4 flex flex-col gap-6">
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
          <div className="bg-[#F5F5F5] p-6 lg:p-8 flex flex-col gap-6 h-full border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <div className="relative">
                <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">
                  {rightCategory?.name || 'Economy & Policy'}
                </h2>
                <div className="absolute -bottom-[9px] left-0 w-full h-[3px] bg-[#FF0202]" />
              </div>
              {rightCategory && (
                <Link
                  href={`/news/category/${rightCategory.slug}`}
                  className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity"
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
                    imageClassName="aspect-[16/9] mt-2"
                  />
                )}

                {/* Small Horizontal List */}
                {rightSmall.length > 0 && (
                  <div className="flex flex-col gap-4 mt-2">
                    {rightSmall.map((article) => (
                      <HorizontalArticleItem
                        key={article.id}
                        article={article}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CategoryNewsSection;