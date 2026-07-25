"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight, Play } from 'lucide-react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';

import Link from 'next/link';
import { useHomeCategories } from '@/hooks/use-articles';

const DailyInsightsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: homeCategories } = useHomeCategories();

  const sectionData = homeCategories?.['daily-insights'];
  const rawArticles = sectionData?.articles || [];

  const insights = rawArticles.map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    category: article.category?.name || 'Daily Insights',
    date: article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Recent',
    imageUrl: article.featuredImage || '/placeholder-news.jpg',
  }));

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; // scroll by 75% of container width
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12 overflow-hidden">
      <div className="flex flex-col items-center w-full gap-8 relative">
        
        {/* Header */}
        <SectionTitle title="Daily Insights" />

        {insights.length === 0 ? (
          <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
            <p className="text-gray-400 text-sm font-semibold">No article available</p>
          </div>
        ) : (
          <>
            {/* Carousel Container */}
            <div className="relative w-full flex items-center group">
              {/* Left Arrow */}
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 z-10 -ml-2 md:-ml-8 bg-white/60 hover:bg-white p-1 md:p-2 rounded-full transition-colors focus:outline-none text-black"
              >
                <ChevronLeft size={40} strokeWidth={3} />
              </button>

              {/* Cards */}
              <div 
                ref={scrollRef}
                className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 px-10 md:px-6 py-4 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {insights.map((item, idx) => (
                  <Link
                    href={`/news/${item.slug || item.id}`}
                    key={`${item.id}-${idx}`} 
                    className="relative snap-center shrink-0 w-[240px] md:w-[260px] aspect-[4/5] rounded-[10px] overflow-hidden cursor-pointer group/card shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-gray-100 bg-white"
                  >
                    {/* Background Image */}
                    <div className="relative w-full h-full pb-[40px]">
                      <Image 
                        src={item.imageUrl}
                        alt={item.title || item.category}
                        fill
                        className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-10">
                        <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm group-hover/card:bg-[#FF0202]/90 transition-colors">
                          <Play className="text-white ml-1" size={24} fill="white" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Text Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-[45px] bg-[#24214c] flex items-center justify-center px-4 z-10">
                      <span className="text-white text-[11px] md:text-xs font-medium tracking-wide line-clamp-1">
                        {item.title || item.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 z-10 -mr-2 md:-mr-8 bg-white/60 hover:bg-white p-1 md:p-2 rounded-full transition-colors focus:outline-none text-black"
              >
                <ChevronRight size={40} strokeWidth={3} />
              </button>
            </div>

            {/* View All Button */}
            <Link href="/news?search=Insights" className="bg-[#FF0202] hover:bg-[#d00000] text-white font-bold text-[13px] px-8 py-2.5 rounded transition-colors flex items-center justify-center mt-2 shadow-sm">
              View All <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </>
        )}

      </div>
    </SectionContainer>
  );
};

export default DailyInsightsSection;
