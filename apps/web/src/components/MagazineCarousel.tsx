'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface MagazineItem {
  id: string;
  title: string;
  subtitle: string;
  issue: string;
  date: string;
  image: string;
  linkUrl?: string;
}

const DEFAULT_MAGAZINES: MagazineItem[] = [
  {
    id: 'mag-1',
    title: 'Business First Magazine - Issue 1',
    subtitle: 'Business First Magazine',
    issue: 'Issue 1',
    date: '',
    image: '/magazines/1.png',
    linkUrl: '#',
  },
  {
    id: 'mag-2',
    title: 'Business First Magazine - Issue 2',
    subtitle: 'Business First Magazine',
    issue: 'Issue 2',
    date: '',
    image: '/magazines/2.png',
    linkUrl: '#',
  },
  {
    id: 'mag-3',
    title: 'Business First Magazine - Issue 3',
    subtitle: 'Business First Magazine',
    issue: 'Issue 3',
    date: '',
    image: '/magazines/3.png',
    linkUrl: '#',
  },
  {
    id: 'mag-4',
    title: 'Business First Magazine - Issue 4',
    subtitle: 'Business First Magazine',
    issue: 'Issue 4',
    date: '',
    image: '/magazines/4.png',
    linkUrl: '#',
  },
  {
    id: 'mag-5',
    title: 'Business First Magazine - Issue 5',
    subtitle: 'Business First Magazine',
    issue: 'Issue 5',
    date: '',
    image: '/magazines/5.png',
    linkUrl: '#',
  },
  {
    id: 'mag-6',
    title: 'Business First Magazine - Issue 6',
    subtitle: 'Business First Magazine',
    issue: 'Issue 6',
    date: '',
    image: '/magazines/6.png',
    linkUrl: '#',
  },
  {
    id: 'mag-7',
    title: 'Business First Magazine - Issue 7',
    subtitle: 'Business First Magazine',
    issue: 'Issue 7',
    date: '',
    image: '/magazines/7.png',
    linkUrl: '#',
  },
];

interface MagazineCarouselProps {
  className?: string;
  items?: MagazineItem[];
  autoScrollInterval?: number;
}

const MagazineCarousel: React.FC<MagazineCarouselProps> = ({
  className = '',
  items = DEFAULT_MAGAZINES,
  autoScrollInterval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, autoScrollInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, items.length, autoScrollInterval, nextSlide]);

  return (
    <div
      className={`relative overflow-hidden group shadow-sm bg-neutral-950 select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Business First Magazine Issues"
    >
      {/* Slides Track */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="min-w-full w-full h-full relative flex items-center justify-center bg-neutral-950"
          >
            {/* Magazine Cover Image */}
            <Image
              src={item.image}
              alt={`${item.title} - ${item.issue}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 280px, 300px"
              className="object-contain object-center transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous magazine"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-md backdrop-blur-sm"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next magazine"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-md backdrop-blur-sm"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to magazine ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-5 bg-[#FF0202]'
                : 'w-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MagazineCarousel;
