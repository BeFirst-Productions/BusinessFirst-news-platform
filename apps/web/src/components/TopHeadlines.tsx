"use client"
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';
import { useArticles } from '../hooks/use-articles';
import { Skeleton } from './ui/Skeleton';

const TopHeadlines = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch articles from the server
  const { data: articlesRes, isLoading } = useArticles({
    isTopHeadline: true,
    limit: 10,
  });

  const rawHeadlines = articlesRes?.data || [];

  // Format headlines for rendering
  const headlines = rawHeadlines.map((h) => ({
    id: h.id,
    title: h.title,
    category: h.category?.name || 'News',
    date: h.publishedAt
      ? new Date(h.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
    image: h.featuredImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&h=300&q=80',
    slug: h.slug,
  }));

  // Ensure we repeat the headlines list enough times to have at least 15 items.
  // This guarantees there is always enough scroll range for infinite loop resets.
  const minRequiredItems = 15;
  const replicateCount = headlines.length > 0 ? Math.max(3, Math.ceil(minRequiredItems / headlines.length)) : 0;
  const listToRender = headlines.length > 0 ? Array(replicateCount).fill(headlines).flat() : [];

  // Scroll to the start of the second cycle on load to allow scrolling left and right immediately
  useEffect(() => {
    if (headlines.length === 0) return;

    const container = scrollRef.current;
    if (container) {
      const scrollAmount = window.innerWidth >= 768 ? 340 + 16 : 300 + 16;
      const singleSetWidth = headlines.length * scrollAmount;
      container.scrollLeft = singleSetWidth;
    }
  }, [headlines.length]);

  // Set up the auto-scrolling interval
  useEffect(() => {
    if (headlines.length === 0) return;

    let intervalId: NodeJS.Timeout;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (scrollRef.current) {
          const container = scrollRef.current;
          const scrollAmount = window.innerWidth >= 768 ? 340 + 16 : 300 + 16;
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3000); // 3 seconds interval
    };

    startAutoScroll();

    const handleResize = () => {
      clearInterval(intervalId);
      startAutoScroll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [headlines.length]);

  // Handle manual wrapping when scrolling past Cycle boundaries
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = window.innerWidth >= 768 ? 340 + 16 : 300 + 16;
      const singleSetWidth = headlines.length * scrollAmount;

      // Wrapping logic:
      // If we scroll past the end of Cycle 2 (entering Cycle 3), subtract singleSetWidth
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft = container.scrollLeft - singleSetWidth;
      }
      // If we scroll past the start of Cycle 2 (entering Cycle 1), add singleSetWidth
      else if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollLeft + singleSetWidth;
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350 + 16; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <SectionContainer as="section" className="bg-white py-8 md:py-12">
        <SectionTitle title="Top Headlines" />
        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-4 md:px-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex bg-white rounded-lg border border-gray-200 overflow-hidden w-[300px] md:w-[340px] shrink-0 h-[100px] shadow-sm">
              <Skeleton className="w-2/5 h-full" />
              <div className="w-3/5 p-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  if (headlines.length === 0) {
    return null; // Don't show if there are no headlines
  }

  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12" containerClassName="relative">
      {/* Title */}
      <SectionTitle title="Top Headlines" />

      {/* Carousel Container */}
      <div className="relative group px-0 md:px-12">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#cd2027] hover:bg-[#a61a1f] text-white p-1.5 md:p-2 rounded-full shadow-md transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Area */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2 px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {listToRender.map((item, index) => (
            <Link 
              href={`/news/${item.slug}`}
              key={`${item.id}-${index}`} 
              className="flex bg-white rounded-lg border border-gray-200 overflow-hidden w-[300px] md:w-[340px] shrink-0 h-[100px] shadow-sm hover:shadow-md transition-shadow snap-start cursor-pointer"
            >
              <div className="relative w-2/5 h-full">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                  sizes="150px"
                />
              </div>
              <div className="w-3/5 p-3 flex flex-col justify-between bg-white">
                <h3 className="text-[#24214c] font-bold text-xs leading-snug line-clamp-3 hover:text-[#cd2027] transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] text-gray-500 font-medium">
                  {item.category} | {item.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#cd2027] hover:bg-[#a61a1f] text-white p-1.5 md:p-2 rounded-full shadow-md transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </SectionContainer>
  );
};

export default TopHeadlines;
