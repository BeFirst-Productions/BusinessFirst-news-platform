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

interface NewsDetailProps {
  articleId?: string;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ articleId }) => {
  const slug = articleId || 'default';
  const { data: article, isLoading } = useArticle(slug);

  if (isLoading) {
    return (
      <SectionContainer className="bg-white py-12 text-center">
        <p className="text-gray-500 font-semibold">Loading article details...</p>
      </SectionContainer>
    );
  }

  if (!article) {
    return (
      <SectionContainer className="bg-white py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Article Not Found</h1>
        <p className="text-gray-500 mt-2">The requested article is currently unavailable.</p>
      </SectionContainer>
    );
  }

  const title = article.title;
  const categoryName = article.category?.name || 'News';
  const imageUrl = article.featuredImage || '/placeholder-news.jpg';
  const description = article.excerpt || '';
  const content = article.content || '';

  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      {/* Breadcrumbs */}
      <NewsBreadcrumbs category={categoryName} />

      {/* Main Title Header */}
      <NewsHeader 
        title={title}
        description={description}
      />

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
        {/* Left Side: Article Content */}
        <NewsContent imageUrl={imageUrl} title={title} content={content} />

        {/* Right Side: Sidebar */}
        <NewsSidebar />
      </div>

      {/* Full-width Ad Banner under the grid layout */}
      <FullWidthAdBanner containerClassName="w-full mt-12" ratio="nd_bottom" targetPage="news_detail" />

      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-200 my-12"></div>

      {/* Related Articles Footer Grid */}
      <NewsRelated />
    </SectionContainer>
  );
};

export default NewsDetail;
