import React from 'react';
import Image from 'next/image';
import SectionContainer from './SectionContainer';
import { ChevronDown } from 'lucide-react';
import { DynamicAd } from './ads/DynamicAd';

const TechnologyInnovation = () => {
  return (
    <SectionContainer
      as="section"
      className="bg-white py-8 md:py-12 "
      containerClassName="flex flex-col"
    >
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6 relative pb-2 border-b border-gray-300">
        <div className="absolute left-0 bottom-[-1px] h-[2px] w-full max-w-[300px] bg-gradient-to-r from-[#cd2027] via-[#24214c] to-transparent"></div>
        <h2 className="text-[#cd2027] text-2xl md:text-3xl font-bold">
          Technology & Innovation
        </h2>
        <a href="#" className="text-[#24214c] font-bold text-sm flex items-center gap-1 hover:text-[#cd2027] transition">
          View All <ChevronDown size={16} strokeWidth={2.5} />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">

        {/* Left Column (Main Content) - Spans 7 cols on lg */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Main Top Article */}
          <div className="flex flex-col group cursor-pointer">
            <div className="relative w-full aspect-[16/9] mb-3 overflow-hidden">
              <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80"
                alt="Cityscape"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wider">
              Oil, Gas & Energy | July 23, 2024
            </div>
            <h3 className="text-[#24214c] text-2xl md:text-3xl font-bold leading-tight group-hover:text-[#cd2027] transition-colors">
              How 5G Will Communication and Connectivity
            </h3>
          </div>

          {/* Bottom Two Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-2">

            {/* Article 1 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="relative w-full aspect-[16/9] mb-3 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                  alt="Buildings"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="text-[#24214c] font-bold text-base leading-tight mb-2 group-hover:text-[#cd2027] transition-colors line-clamp-2">
                Borem ipsum dolor sit amet vulputate libero
              </h4>
              <div className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider">
                Oil, Gas & Energy | July 23, 2024
              </div>
            </div>

            {/* Article 2 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="relative w-full aspect-[16/9] mb-3 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80"
                  alt="City at night"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="text-[#24214c] font-bold text-base leading-tight mb-2 group-hover:text-[#cd2027] transition-colors line-clamp-2">
                Borem ipsum dolor sit amet vulputate libero
              </h4>
              <div className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider">
                Oil, Gas & Energy | July 23, 2024
              </div>
            </div>

          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* List of 3 small articles */}
          <div className="flex flex-col gap-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3 group cursor-pointer">
                <div className="relative w-[110px] md:w-[130px] shrink-0 aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80"
                    alt="Office"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-start py-0.5">
                  <h4 className="text-[#24214c] font-bold text-sm md:text-[15px] leading-tight mb-2 group-hover:text-[#cd2027] transition-colors line-clamp-3">
                    Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
                  </h4>
                  <div className="text-gray-500 text-[9px] md:text-[10px] font-medium uppercase tracking-wider">
                    Oil, Gas & Energy | July 23, 2024
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ad Banner */}
          <DynamicAd
            ratio="ad_5"
            className="w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:flex-grow overflow-hidden mt-2"
            fallback={
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                alt="Advertisement Banner"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            }
          />

        </div>

      </div>
    </SectionContainer>
  );
};

export default TechnologyInnovation;
