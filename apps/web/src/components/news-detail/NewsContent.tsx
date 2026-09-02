import React from 'react';
import Image from 'next/image';

interface NewsContentProps {
  imageUrl?: string;
  title?: string;
  contentParagraphs?: string[];
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
}

const NewsContent: React.FC<NewsContentProps> = ({
  imageUrl = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&h=600&q=80',
  title = 'How 5G Will Transform Class Communication',
  contentParagraphs,
  sidebar,
  header
}) => {
  const defaultParagraphs = [
    'Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.',
    'Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisl. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisl. Proin vitae facilisis nisl, ac posuere leo.',
    'Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisl, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisl, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.'
  ];

  let paragraphs = contentParagraphs || defaultParagraphs;

  // If the backend sent a single HTML string with multiple paragraphs, split it up
  const firstPara = paragraphs[0];
  if (paragraphs.length === 1 && firstPara && firstPara.includes('<p>')) {
    // Split by </p> to break the HTML string into an array of paragraph strings
    const parts = firstPara.split('</p>');
    // Filter out empty strings and append </p> back
    paragraphs = parts
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map(p => p.endsWith('</p>') ? p : p + '</p>');
  }

  return (
    <article className="w-full block">
      {/* Desktop Sidebar Floated Right */}
      {sidebar && (
        <div className="hidden lg:block float-right w-[32%] ml-12 mb-8 clear-right">
          {sidebar}
        </div>
      )}

      {/* Header if provided */}
      {header && (
        <div className="block">
          {header}
        </div>
      )}

      {/* Main Featured Image */}
      <div className="relative h-[250px] sm:h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm bg-gray-100 mb-8">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Head and Body 1 */}
        <div className="block">
          {paragraphs.slice(0, 3).map((para, index) => (
            <div
              key={index}
              className="text-gray-700 text-sm md:text-base leading-relaxed font-medium [&>p]:mb-4 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-[#24214c]"
              dangerouslySetInnerHTML={{ __html: para }}
            />
          ))}
        </div>

        {/* Article Head and Body 2 */}
        {paragraphs.length > 3 && (
          <div className="block mt-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-4">
              {title}
            </h2>
            {paragraphs.slice(3).map((para, index) => (
              <div
                key={index}
                className="text-gray-700 text-sm md:text-base leading-relaxed font-medium [&>p]:mb-4 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-[#24214c]"
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
          </div>
        )}

        {/* Mobile Sidebar - rendered at bottom on small screens */}
        {sidebar && (
          <div className="block lg:hidden w-full mt-12">
            {sidebar}
          </div>
        )}
      </article>
    );
  };

  export default NewsContent;
