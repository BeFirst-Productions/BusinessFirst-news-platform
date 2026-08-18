'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function AutoScroller({ children, speed = 1 }: { children: React.ReactNode, speed?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const scroll = () => {
      // Don't auto-scroll if hovering or actively dragging
      if (scrollRef.current && !isHovered && !isDragging) {
        scrollRef.current.scrollLeft += speed;
        
        if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth / 2)) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsHovered(true); // Pause auto-scroll
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setStartScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll multiplier
    scrollRef.current.scrollLeft = startScrollLeft - walk;
  };

  return (
    <div 
      ref={scrollRef}
      className={`flex gap-6 w-full overflow-x-auto pb-4 scrollbar-hide snap-x ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none',  /* IE and Edge */
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
      {children}
    </div>
  );
}
