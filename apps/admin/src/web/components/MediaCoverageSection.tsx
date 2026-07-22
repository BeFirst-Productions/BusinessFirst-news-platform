"use client";
import React, { useRef } from 'react';
import SectionContainer from './SectionContainer';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight, Play } from 'lucide-react';
import { beyondBusinessPodcasts, exclusiveCoverages } from '@/web/data/mediaData';

const MediaCoverageSection = () => {
  const beyondBusinessRef = useRef<HTMLDivElement>(null);
  const exclusiveRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      // On mobile (screen < 640px), we show 1 card, so we scroll by 100% of clientWidth.
      // On larger screens, we show 2 cards, so we scroll by roughly 50% (card + gap).
      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
      const scrollAmount = isMobile ? clientWidth : clientWidth * 0.52; 
      ref.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch">
        
        {/* Left Column: Beyond Business */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 h-full">
          {/* Header */}
          <div className="text-center flex flex-col gap-1">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#FF0202]">
              Beyond Business
            </h2>
            <p className="text-gray-500 text-[13px] md:text-sm font-medium tracking-wide">Podcast Series</p>
          </div>

          {/* Carousel */}
          <div className="flex items-stretch gap-2 flex-1 relative">
            <button 
              onClick={() => scroll(beyondBusinessRef, 'left')}
              className="self-center text-black hover:text-[#FF0202] transition-colors focus:outline-none shrink-0 p-1 md:p-2 -ml-2 z-10"
              aria-label="Previous podcast"
            >
              <ChevronLeft size={36} strokeWidth={3} />
            </button>
            
            <div 
              ref={beyondBusinessRef}
              className="flex gap-4 flex-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {beyondBusinessPodcasts.map((item) => (
                <div 
                  key={item.id} 
                  className="w-full sm:w-[calc(50%-8px)] shrink-0 flex flex-col rounded-[12px] overflow-hidden group cursor-pointer border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] h-full snap-start"
                >
                  {/* Top Image */}
                  <div className="relative w-full aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden shrink-0">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.altText} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 md:w-[60px] md:h-[60px] bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-[#FF0202]/90 transition-colors">
                        <Play className="text-white ml-1 w-6 h-6 md:w-8 md:h-8" fill="white" />
                      </div>
                    </div>
                  </div>
                  {/* Bottom Text */}
                  <div className="bg-[#24214c] p-4 md:p-5 flex flex-col gap-2 min-h-[90px] md:min-h-[110px] justify-between flex-1">
                    <h3 className="text-white font-bold text-sm md:text-base leading-tight group-hover:text-[#FF0202] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="text-gray-400 text-[9px] md:text-[11px] font-medium">
                      {item.category} | {item.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => scroll(beyondBusinessRef, 'right')}
              className="self-center text-black hover:text-[#FF0202] transition-colors focus:outline-none shrink-0 p-1 md:p-2 -mr-2 z-10"
              aria-label="Next podcast"
            >
              <ChevronRight size={36} strokeWidth={3} />
            </button>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-2">
            <button className="bg-[#FF0202] hover:bg-[#d00000] text-white font-bold text-[15px] px-8 py-2.5 rounded transition-colors flex items-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF0202]/50">
              View All <ArrowUpRight size={18} className="ml-2" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Right Column: Exclusive Coverage */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 h-full">
          {/* Header */}
          <div className="text-center flex flex-col gap-1">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#FF0202]">
              Exclusive Coverage
            </h2>
            <p className="text-gray-500 text-[13px] md:text-sm font-medium tracking-wide">Yorem ipsum</p>
          </div>

          {/* Carousel */}
          <div className="flex items-stretch gap-2 flex-1 relative">
            <button 
              onClick={() => scroll(exclusiveRef, 'left')}
              className="self-center text-black hover:text-[#FF0202] transition-colors focus:outline-none shrink-0 p-1 md:p-2 -ml-2 z-10"
              aria-label="Previous coverage"
            >
              <ChevronLeft size={36} strokeWidth={3} />
            </button>
            
            <div 
              ref={exclusiveRef}
              className="flex gap-4 flex-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {exclusiveCoverages.map((item) => (
                <div 
                  key={item.id} 
                  className="w-full sm:w-[calc(50%-8px)] shrink-0 flex flex-col rounded-[12px] overflow-hidden group cursor-pointer border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] h-full snap-start"
                >
                  {/* Top Image */}
                  <div className="relative w-full aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden shrink-0">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.altText} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 md:w-[60px] md:h-[60px] bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-[#FF0202]/90 transition-colors">
                        <Play className="text-white ml-1 w-6 h-6 md:w-8 md:h-8" fill="white" />
                      </div>
                    </div>
                  </div>
                  {/* Bottom Text */}
                  <div className="bg-[#24214c] p-4 md:p-5 flex flex-col gap-2 min-h-[90px] md:min-h-[110px] justify-between flex-1">
                    <h3 className="text-white font-bold text-sm md:text-base leading-tight group-hover:text-[#FF0202] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="text-gray-400 text-[9px] md:text-[11px] font-medium">
                      {item.category} | {item.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => scroll(exclusiveRef, 'right')}
              className="self-center text-black hover:text-[#FF0202] transition-colors focus:outline-none shrink-0 p-1 md:p-2 -mr-2 z-10"
              aria-label="Next coverage"
            >
              <ChevronRight size={36} strokeWidth={3} />
            </button>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-2">
            <button className="bg-[#FF0202] hover:bg-[#d00000] text-white font-bold text-[15px] px-8 py-2.5 rounded transition-colors flex items-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF0202]/50">
              View All <ArrowUpRight size={18} className="ml-2" strokeWidth={2.5} />
            </button>
          </div>
        </div>

      </div>
    </SectionContainer>
  );
};

export default MediaCoverageSection;
