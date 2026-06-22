  import React from 'react';
import SectionContainer from './SectionContainer';
import Image from 'next/image';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import FullWidthAdBanner from './FullWidthAdBanner';

const EventsSection = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Events */}
        <div className="w-full lg:w-[65%] flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202]">
              Events
            </h2>
            <button className="text-[#24214c] font-bold text-sm flex items-center hover:text-[#FF0202] transition-colors">
              View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
            </button>
          </div>

          {/* Top Section: Large Article + 2 Stacked Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            {/* Large Article (Spans 2 columns) */}
            <div className="md:col-span-2 group cursor-pointer flex flex-col gap-3">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200">
                <Image 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80" 
                  alt="Party and fireworks" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg md:text-[22px] font-bold text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-snug">
                How 5G Will Transform CCCC Class Communication and , ac aliquet Class
              </h3>
              <div className="text-[11px] md:text-xs text-gray-500 font-medium">
                Oil, Gas & Energy | July 23, 2024
              </div>
            </div>
            
            {/* 2 Stacked Articles */}
            <div className="md:col-span-1 flex flex-col gap-6">
              {[1, 2].map((item) => (
                <div key={item} className="group cursor-pointer flex flex-col gap-2">
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200">
                    <Image 
                      src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80" 
                      alt="City buildings" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-bold text-[15px] md:text-base text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-tight">
                    Yorem ipsum dolor sit amet, consectetur
                  </h4>
                  <div className="text-[10px] md:text-[11px] text-gray-500 font-medium">
                    Oil, Gas & Energy | July 23, 2024
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: 3 Articles */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 mt-4">
            {[3, 4, 5].map((item) => (
              <div key={item} className="group cursor-pointer flex flex-col gap-2">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200">
                  <Image 
                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80" 
                    alt="City buildings" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-bold text-[15px] md:text-base text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-tight">
                  Yorem ipsum dolor sit amet, consectetur
                </h4>
                <div className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto pt-1">
                  Oil, Gas & Energy | July 23, 2024
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Events in UAE */}
        <div className="w-full lg:w-[35%] flex flex-col">
          <div className="bg-[#24214c] rounded-md overflow-hidden flex flex-col shadow-lg h-full">
            {/* Top Header inside the box */}
            <div className="px-6 py-5 md:py-6 text-center flex items-center justify-center min-h-[80px]">
              <h2 className="text-[#fbbf24] font-bold text-xl md:text-[22px]">
                Upcoming Events in UAE
              </h2>
            </div>
            
            {/* Large Image */}
            <div className="relative w-full aspect-[4/3] group cursor-pointer overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80" 
                alt="Concert Event" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Bottom Content */}
            <div className="p-6 md:p-8 flex flex-col gap-2 flex-1">
              <h3 className="text-white font-bold text-xl md:text-2xl leading-tight">
                Persian Music Festival
              </h3>
              <div className="text-[#fbbf24] text-[13px] md:text-sm font-medium mt-2">
                Coco Cola Arena, Dubai
              </div>
              <div className="text-[#fbbf24] text-[13px] md:text-sm font-medium">
                December 31, 2025 | 6:00 pm onwards
              </div>
              
              <div className="mt-auto pt-8 mb-2 flex justify-center md:justify-start lg:justify-center">
                <button className="bg-[#FF0202] hover:bg-[#d00000] text-white font-bold text-sm px-8 py-3 rounded transition-colors flex items-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF0202]/50">
                  Book Now <ArrowUpRight size={18} className="ml-1.5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
           <div className="mt-16 w-full">
              <FullWidthAdBanner />
            </div>
    </SectionContainer>
  );
};

export default EventsSection;
