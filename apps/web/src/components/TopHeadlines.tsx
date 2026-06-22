"use client"
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';

const headlines = [
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
  },
  {
    id: 5,
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: 6,
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&h=300&q=80'
  }
];

const TopHeadlines = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (scrollRef.current) {
          const container = scrollRef.current;
          const scrollAmount = window.innerWidth >= 768 ? 340 + 16 : 300 + 16;
          
          // The exact width of one original set of items
          const singleSetWidth = headlines.length * scrollAmount;
          
          // Seamless infinite scroll logic:
          // If we have scrolled far enough that the first duplicate is at the front,
          // instantly jump back to the exact same visual position in the original set.
          if (container.scrollLeft >= singleSetWidth) {
            container.scrollLeft = container.scrollLeft - singleSetWidth;
          }
          
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
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350 + 16; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2 px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {[...headlines, ...headlines].map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="flex bg-white rounded-lg border border-gray-200 overflow-hidden w-[300px] md:w-[340px] shrink-0 h-[100px] shadow-sm hover:shadow-md transition-shadow snap-start"
            >
              <div className="relative w-2/5 h-full">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="w-3/5 p-3 flex flex-col justify-between bg-white">
                <h3 className="text-[#24214c] font-bold text-xs leading-snug line-clamp-3">
                  {item.title}
                </h3>
                <span className="text-[10px] text-gray-500 font-medium">
                  {item.category} | {item.date}
                </span>
              </div>
            </div>
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
