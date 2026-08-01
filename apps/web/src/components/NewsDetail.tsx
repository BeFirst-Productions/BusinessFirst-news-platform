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
<<<<<<< HEAD
import { Skeleton } from './ui/Skeleton';
=======
>>>>>>> 48ee161fc907aae17fb9c1467aed5f8684efa424

interface NewsDetailProps {
  articleId?: string;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ articleId }) => {
<<<<<<< HEAD
  const { data: article, isLoading, error } = useArticle(articleId || '');

  if (isLoading) {
    return (
      <SectionContainer className="bg-white py-8 md:py-12 min-h-screen">
        <Skeleton className="w-1/3 h-6 mb-8" />
        <Skeleton className="w-full h-12 mb-4" />
        <Skeleton className="w-2/3 h-12 mb-8" />
        <Skeleton className="w-full aspect-[16/9]" />
=======
  const slug = articleId || 'default';
  const {data: article, isLoading } = useArticle(slug);

        if (isLoading) {
    return (
        <SectionContainer className="bg-white py-12 text-center">
          <p className="text-gray-500 font-semibold">Loading article details...</p>
>>>>>>> 48ee161fc907aae17fb9c1467aed5f8684efa424
        </SectionContainer>
    );
  }

<<<<<<< HEAD
    if (error || !article) {
      return (
        <SectionContainer className="bg-white py-8 md:py-12 min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-700">Article not found</h2>
        </SectionContainer>
      );
    }
=======
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
<<<<<<< HEAD
  const description = article.excerpt || '';
  const content = article.content || '';
=======
  const description = article.excerpt || article.title;
  const contentParagraphs = article.content ? [article.content] : [];
>>>>>>> 48ee161fc907aae17fb9c1467aed5f8684efa424
>>>>>>> 5c5d64b32540ad2af355376a0e5a85e6a0bb8252

    return (
      <SectionContainer className="bg-white py-8 md:py-12">
        {/* Breadcrumbs */}
<<<<<<< HEAD
    <NewsBreadcrumbs category={article.category?.name || 'News'} />

    {/* Main Title Header */ }
    <NewsHeader
      title={article.title}
      description={article.summary || article.seoDescription || ""}
    />

    {/* Layout - Changed to flow layout for text wrapping */ }
    <div className="w-full items-start">
      {/* Article Content with embedded Sidebar for text wrapping */}
      <NewsContent
        imageUrl={article.featuredImage || ''}
        title={article.title}
        contentParagraphs={[article.content]}
        sidebar={<NewsSidebar />}
      />
=======
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
>>>>>>> 48ee161fc907aae17fb9c1467aed5f8684efa424
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
