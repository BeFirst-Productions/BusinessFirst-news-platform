import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedArticle {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
}

const relatedArticles: RelatedArticle[] = [
  {
    id: 1,
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: 2,
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1574328405096-7fcfa4a9b583?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: 3,
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: 4,
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&h=300&q=80'
  }
];

const NewsRelated = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3">
        <div className="h-6 w-[4px] bg-[#FF0202] rounded-full"></div>
        <h3 className="text-[#24214c] font-extrabold text-xl md:text-2xl">
          Related Articles
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {relatedArticles.map((article) => (
          <Link
            href="#"
            key={article.id}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col gap-2 flex-grow justify-between bg-white">
              <div>
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block mb-1">
                  {article.category} | {article.date}
                </span>
                <h4 className="text-sm font-bold text-[#24214c] leading-snug line-clamp-2 group-hover:text-[#FF0202] transition-colors">
                  {article.title}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsRelated;
