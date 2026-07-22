import React from 'react';
import SectionContainer from './SectionContainer';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import FullWidthAdBanner from './FullWidthAdBanner';

const CultureLifestyleSection = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Culture & Lifestyle */}
        <div className="w-full lg:w-[65%] flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202]">
              Culture & Lifestyle
            </h2>
            <button className="text-[#24214c] font-bold text-sm flex items-center hover:text-[#FF0202] transition-colors">
              View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
            </button>
          </div>

          {/* Grid of smaller articles */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group cursor-pointer flex flex-col gap-2">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200">
                  <Image 
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80" 
                    alt="Culture" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-bold text-sm md:text-base text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-tight mt-1">
                  Yorem ipsum dolor sit ametamet, consectetur
                </h4>
                <div className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto pt-1 uppercase">
                  Oil, Gas & Energy | July 23, 2024
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Media and Entertainment */}
        <div className="w-full lg:w-[35%]">
          <div className="bg-[#050505] rounded-xl p-6 md:p-8 flex flex-col h-full shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-start border-b-[1.5px] border-gray-800 pb-4">
              <h2 className="text-xl md:text-[22px] font-bold text-[#FF0202] leading-tight">
                Media and<br/>Entertainment
              </h2>
              <button className="text-white font-bold text-sm flex items-center hover:text-[#FF0202] transition-colors mt-1">
                View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
              </button>
            </div>

            {/* Vertical List of articles */}
            <div className="flex flex-col gap-6 mt-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group cursor-pointer flex gap-4 items-center">
                  <div className="relative w-[110px] md:w-[130px] aspect-[16/10] shrink-0 overflow-hidden bg-gray-800">
                    <Image 
                      src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=400&q=80" 
                      alt="Entertainment" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1.5 flex-1">
                    <h4 className="font-bold text-sm md:text-[15px] text-white group-hover:text-[#FF0202] transition-colors leading-tight">
                      Yorem ipsum dolor sit amet, consectetur
                    </h4>
                    <div className="text-[#fbbf24] text-[10px] md:text-[11px] font-medium mt-auto">
                      Oil, Gas & Energy | July 23, 2024
                    </div>
                  </div>
                </div>
              ))}
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

export default CultureLifestyleSection;
