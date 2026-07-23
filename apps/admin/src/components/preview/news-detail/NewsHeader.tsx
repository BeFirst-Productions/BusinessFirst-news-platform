import React from 'react';

interface NewsHeaderProps {
  title: string;
  description: string;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202] leading-tight">
        {title}
      </h1>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-4xl font-medium">
        {description}
      </p>
    </div>
  );
};

export default NewsHeader;
