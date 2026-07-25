'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRelatedArticles } from '@/hooks/use-articles';
import { Skeleton } from '../ui/Skeleton';

interface NewsRelatedProps {
  articleId?: string;
}

const NewsRelated: React.FC<NewsRelatedProps> = ({ articleId }) => {
  const { data: relatedRes, isLoading } = useRelatedArticles(articleId || '', 4);

  if (!articleId || (!isLoading && (!relatedRes || relatedRes.data.length === 0))) {
    return null; // Return nothing if no related articles
  }

  const articles = relatedRes?.data || [];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3">
        <div className="h-6 w-[4px] bg-[#FF0202] rounded-full"></div>
        <h3 className="text-[#24214c] font-extrabold text-xl md:text-2xl">
          Related Articles
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-full flex flex-col gap-2">
                <Skeleton className="w-full h-40 rounded-2xl" />
                <Skeleton className="w-full h-4 mt-2" />
                <Skeleton className="w-2/3 h-4" />
              </div>
            ))
          : articles.map((article) => (
              <Link
                href={`/news/${article.slug}`}
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
                  <Image
                    src={article.featuredImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&h=300&q=80'}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-grow justify-between bg-white">
                  <div>
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block mb-1">
                      {article.category?.name || 'News'} | {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
