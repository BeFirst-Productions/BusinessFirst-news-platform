'use client';

import React from 'react';
import SectionContainer from './SectionContainer';
import NewsBreadcrumbs from './news-detail/NewsBreadcrumbs';
import NewsHeader from './news-detail/NewsHeader';
import NewsContent from './news-detail/NewsContent';
import NewsSidebar from './news-detail/NewsSidebar';
import NewsRelated from './news-detail/NewsRelated';
import FullWidthAdBanner from './FullWidthAdBanner';
import { useArticle } from '@/hooks/use-articles';
import { Skeleton } from './ui/Skeleton';

interface NewsDetailProps {
  articleId?: string;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ articleId }) => {
  const { data: article, isLoading, error } = useArticle(articleId || '');

  if (isLoading) {
    return (
      <SectionContainer className="bg-white py-8 md:py-12 min-h-screen">
        <Skeleton className="w-1/3 h-6 mb-8" />
        <Skeleton className="w-full h-12 mb-4" />
        <Skeleton className="w-2/3 h-12 mb-8" />
        <Skeleton className="w-full aspect-[16/9]" />
      </SectionContainer>
    );
  }

  if (error || !article) {
    return (
      <SectionContainer className="bg-white py-8 md:py-12 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Article not found</h2>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      {/* Breadcrumbs */}
      <NewsBreadcrumbs category={article.category?.name || 'News'} />

      {/* Layout - Changed to flow layout for text wrapping */}
      <div className="w-full items-start">
        {/* Article Content with embedded Sidebar for text wrapping */}
        <NewsContent
          imageUrl={article.featuredImage || ''}
          title={article.title}
          contentParagraphs={article.content ? [article.content] : []}
          sidebar={<NewsSidebar />}
          header={
            <NewsHeader
              title={article.title}
              description={article.metaDescription || ""}
            />
          }
        />
      </div>

      {/* Full-width Ad Banner under the grid layout */}
      <div className="clear-both pt-8">
        <FullWidthAdBanner containerClassName="w-full" ratio="nd_bottom" targetPage="news_detail" />
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-200 my-12"></div>

      {/* Related Articles Footer Grid */}
      <NewsRelated articleId={article.id} />
    </SectionContainer>
  );
};

export default NewsDetail;
