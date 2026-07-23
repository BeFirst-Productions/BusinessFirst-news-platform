import React from 'react';
import SectionContainer from './SectionContainer';
import NewsBreadcrumbs from './news-detail/NewsBreadcrumbs';
import NewsHeader from './news-detail/NewsHeader';
import NewsContent from './news-detail/NewsContent';
import NewsSidebar from './news-detail/NewsSidebar';
import NewsRelated from './news-detail/NewsRelated';
import FullWidthAdBanner from './FullWidthAdBanner';
import { getArticleById } from '@/data/newsData';

interface NewsDetailProps {
  articleId?: string;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ articleId }) => {
  const article = getArticleById(articleId || 'default');

  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      {/* Breadcrumbs */}
      <NewsBreadcrumbs category={article.category} />

      {/* Main Title Header */}
      <NewsHeader 
        title={article.title}
        description={article.description || "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
      />

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
        {/* Left Side: Article Content */}
        <NewsContent imageUrl={article.imageUrl} title={article.title} contentParagraphs={article.contentParagraphs} />

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
