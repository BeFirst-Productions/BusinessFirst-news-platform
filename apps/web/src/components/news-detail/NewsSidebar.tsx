import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DynamicAd } from '../ads/DynamicAd';

import { useArticles } from '@/hooks/use-articles';

const NewsSidebar = () => {
  const { data: recentResponse } = useArticles({
    limit: 4,
    sortBy: 'publishedAt',
    sortOrder: 'desc'
  });

  const recentPosts = (recentResponse?.data || []).map((item: any) => ({
    id: item.slug || item.id,
    title: item.title,
    category: item.category?.name || 'News',
    date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
    image: item.featuredImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=150&h=150&q=80'
  }));

  return (
    <aside className="flex flex-col gap-8 w-full">
      {/* Recent Posts Section */}
      <div className="order-2 lg:order-1 border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
        <div className="bg-[#FF0202] text-white text-center py-3.5 font-bold text-sm tracking-wider uppercase">
          Recent Posts
        </div>

        <div className="flex flex-col divide-y divide-gray-100">
          {recentPosts.map((post) => (
            <Link
              href={`/news/${post.id}`}
              key={post.id}
              className="flex gap-4 p-4 hover:bg-gray-50 transition-all duration-300 group"
            >
              <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h4 className="text-[#24214c] font-bold text-xs leading-snug line-clamp-2 group-hover:text-[#FF0202] transition-colors">
                  {post.title}
                </h4>
                <span className="text-[10px] text-amber-500 font-bold mt-1 uppercase tracking-wide">
                  {post.category} | {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Square Ad Banner (Burger mock ad) */}
      <DynamicAd
        ratio="nd_sidebar"
        targetPage="news_detail"
        className="order-1 lg:order-2 w-full aspect-square rounded-2xl shadow-sm border border-gray-100 bg-gray-900"
        fallback={
          <>
            <Image
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&h=500&q=80"
              alt="Burger Sidebar Ad"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          
          </>
        }
      />
    </aside>
  );
};

export default NewsSidebar;
