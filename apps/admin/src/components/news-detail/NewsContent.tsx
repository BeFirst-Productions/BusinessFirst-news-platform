import React from 'react';
import Image from 'next/image';

interface NewsContentProps {
  imageUrl?: string;
  title?: string;
  contentParagraphs?: string[];
}

const NewsContent: React.FC<NewsContentProps> = ({ 
  imageUrl = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&h=600&q=80',
  title = 'How 5G Will Transform Class Communication',
  contentParagraphs
}) => {
  const defaultParagraphs = [
    'Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.',
    'Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisl. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisl. Proin vitae facilisis nisl, ac posuere leo.',
    'Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisl, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisl, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.'
  ];

  const paragraphs = contentParagraphs || defaultParagraphs;

  return (
    <article className="lg:col-span-8 flex flex-col gap-8 w-full">
      {/* Main Featured Image */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Article Head and Body 1 */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#24214c]">
          {title}
        </h2>
        {paragraphs.slice(0, 3).map((para, index) => (
          <p key={index} className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
            {para}
          </p>
        ))}
      </div>

      {/* Article Head and Body 2 */}
      {paragraphs.length > 3 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#24214c]">
            Deep Dive: {title}
          </h2>
          {paragraphs.slice(3).map((para, index) => (
            <p key={index} className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
              {para}
            </p>
          ))}
        </div>
      )}
    </article>
  );
};

export default NewsContent;
