"use client";

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
  const isHoveredRef = useRef<boolean>(false);
  const isManualScrollingRef = useRef<boolean>(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Fetch live Top Headline articles from Express API
  const { data: articlesRes, isLoading } = useArticles({
    isTopHeadline: true,
    limit: 10,
  });

  const rawHeadlines = articlesRes?.data || [];

  // Format API headlines for rendering
  const headlines = rawHeadlines.map((h) => ({
    id: h.id,
    title: h.title,
    category: h.category?.name || 'News',
    date: h.publishedAt
      ? new Date(h.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      : '',
    image: h.featuredImage || '/placeholder-news.jpg',
    slug: h.slug,
  }));

  // Ensure we repeat the headlines list enough times to have at least 15 items
  const minRequiredItems = 15;
  const replicateCount = headlines.length > 0 ? Math.max(3, Math.ceil(minRequiredItems / headlines.length)) : 0;
  const listToRender = headlines.length > 0 ? Array(replicateCount).fill(headlines).flat() : [];

  // Scroll to the start of the second cycle on load
  useEffect(() => {
    if (headlines.length === 0) return;

    const container = scrollRef.current;
    if (container) {
      const scrollAmount = window.innerWidth >= 768 ? 340 + 16 : 300 + 16;
      const singleSetWidth = headlines.length * scrollAmount;
      container.scrollLeft = singleSetWidth;
    }
  }, [headlines.length]);

  // Continuous smooth auto-scrolling ticker with requestAnimationFrame
  useEffect(() => {
    if (headlines.length === 0) return;

    const scrollAmount = window.innerWidth >= 768 ? 340 + 16 : 300 + 16;
    const singleSetWidth = headlines.length * scrollAmount;

    const step = () => {
      if (
        scrollRef.current && 
        !isHoveredRef.current && 
        !isManualScrollingRef.current
      ) {
        const container = scrollRef.current;
        // Continuous smooth sub-pixel scroll increment
        container.scrollLeft += 0.75;

        // Seamless infinite loop reset
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += singleSetWidth;
        }
      }
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (manualTimeoutRef.current) {
        clearTimeout(manualTimeoutRef.current);
      }
    };
  }, [headlines.length]);

  // Handle manual wrapping when scrolling past boundaries
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = window.innerWidth >= 768 ? 340 + 16 : 300 + 16;
      const singleSetWidth = headlines.length * scrollAmount;

      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft = container.scrollLeft - singleSetWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollLeft + singleSetWidth;
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Temporarily pause auto-ticker so smooth button scrolling works cleanly
      isManualScrollingRef.current = true;
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);

      const cardWidth = window.innerWidth >= 768 ? 340 + 16 : 300 + 16;
      const delta = direction === 'left' ? -cardWidth : cardWidth;
      
      scrollRef.current.scrollBy({
        left: delta,
        behavior: 'smooth'
      });

      // Resume auto-ticker 1.2s after manual scroll
      manualTimeoutRef.current = setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 1200);
    }
  };

  if (isLoading) {
    return (
      <SectionContainer as="section" className="bg-white py-6 md:py-8">
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
    return (
      <SectionContainer as="section" className="bg-white py-6 md:py-8" containerClassName="relative">
        <SectionTitle title="Top Headlines" />
        <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
          <p className="text-gray-400 text-sm font-semibold">No article available</p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer as="section" className="bg-white py-6 md:py-8" containerClassName="relative">
      {/* Title */}
      <SectionTitle title="Top Headlines" />

      {/* Carousel Container */}
      <div 
        className="relative group px-0 md:px-12"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        {/* Left Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            scroll('left');
          }}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#cd2027] hover:bg-[#a61a1f] text-white p-2.5 rounded-full shadow-lg transition-all duration-200 cursor-pointer items-center justify-center hover:scale-110 active:scale-95"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Continuous Area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {listToRender.map((item, index) => (
            <Link
              href={`/news/${item.slug}`}
              key={`${item.id}-${index}`}
              className="flex bg-white rounded-lg border border-gray-200 overflow-hidden w-[300px] md:w-[340px] shrink-0 h-[100px] shadow-sm hover:shadow-md transition-all cursor-pointer group/card"
            >
              <div className="relative w-2/5 h-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                  sizes="150px"
                />
              </div>
              <div className="w-3/5 p-2.5 flex flex-col justify-between bg-white overflow-hidden">
                <h3 className="text-[#24214c] font-bold text-xs sm:text-sm leading-snug line-clamp-2 group-hover/card:text-[#cd2027] transition-colors font-newsreader">
                  {item.title}
                </h3>
                <div className="flex flex-col gap-0.5 mt-1 shrink-0">
                  <span className="text-[10px] md:text-[11px] font-bold text-[#cd2027] uppercase tracking-wider truncate">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap truncate">
                    {item.date}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            scroll('right');
          }}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#cd2027] hover:bg-[#a61a1f] text-white p-2.5 rounded-full shadow-lg transition-all duration-200 cursor-pointer items-center justify-center hover:scale-110 active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </SectionContainer>
  );
};

export default TopHeadlines;
