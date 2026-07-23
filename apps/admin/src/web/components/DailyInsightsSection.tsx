"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight, Play } from 'lucide-react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';

const dummyInsights = [
  {
    id: 'di-1',
    category: 'Daily Insights',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'di-2',
    category: 'Daily Insights',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'di-3',
    category: 'Daily Insights',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'di-4',
    category: 'Daily Insights',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'di-5',
    category: 'Daily Insights',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'di-6',
    category: 'Daily Insights',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&w=400&q=80'
  },
];

const DailyInsightsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
            {dummyInsights.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                className="relative snap-center shrink-0 w-[240px] md:w-[260px] aspect-[4/5] rounded-[10px] overflow-hidden cursor-pointer group/card shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-gray-100 bg-white"
              >
                {/* Background Image */}
                <div className="relative w-full h-full pb-[40px]">
                  <Image 
                    src={item.imageUrl}
                    alt={item.category}
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
                  <span className="text-white text-[11px] md:text-xs font-medium tracking-wide">
                    {item.category} | {item.date}
                  </span>
                </div>
              </div>
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
        <button className="bg-[#FF0202] hover:bg-[#d00000] text-white font-bold text-[13px] px-8 py-2.5 rounded transition-colors flex items-center justify-center mt-2 shadow-sm">
          View All <ArrowUpRight size={16} className="ml-1" />
        </button>

      </div>
    </SectionContainer>
  );
};

export default DailyInsightsSection;
