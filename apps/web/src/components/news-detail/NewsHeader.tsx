import React from 'react';

interface NewsHeaderProps {
  title: string;
  description: string;
  author?: string;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ title, description, author }) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#BF2025] leading-tight font-newsreader">
        {title}
      </h1>
      {author && (
        <div className="text-sm md:text-base font-medium text-gray-500 -mt-2">
          {author}
        </div>
      )}
      {description && (
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-4xl font-medium">
          {description}
        </p>
      )}
    </div>
  );
};

export default NewsHeader;
