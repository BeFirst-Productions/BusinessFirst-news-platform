import React from 'react';
import Image from 'next/image';

interface NewsContentProps {
  imageUrl?: string;
  title?: string;
  content?: string;
}

const NewsContent: React.FC<NewsContentProps> = ({ 
  imageUrl,
  title = 'News Article',
  content = ''
}) => {
  return (
    <article className="lg:col-span-8 flex flex-col gap-8 w-full">
      {/* Main Featured Image */}
      {imageUrl && (
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Main Article Rich Text Body */}
      {content ? (
        <div 
          className="prose tiptap-content max-w-none w-full text-gray-800 text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      ) : (
        <div className="py-8 text-gray-400 font-medium">
          No content available for this article.
        </div>
      )}
    </article>
  );
};

export default NewsContent;
