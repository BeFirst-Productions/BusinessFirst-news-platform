import React from 'react';
import SectionContainer from './SectionContainer';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const HealthcareTourismSection = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left Column: Healthcare & Pharma */}
        < div className="w-full lg:w-[65%] flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202]">
              Healthcare & Pharma
            </h2>
            <button className="text-[#24214c] font-bold text-sm flex items-center hover:text-[#FF0202] transition-colors">
              View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
            </button>
          </div>

          {/* Featured Article */}
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                alt="Healthcare professional in lab"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-[11px] md:text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
              Oil, Gas & Energy | July 23, 2024
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-[#24214c] group-hover:text-[#FF0202] transition-colors">
              How 5G Will Communication and Connectivity
            </h3>
          </div>

          {/* Grid of smaller articles */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mt-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group cursor-pointer flex flex-col gap-2">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80"
                    alt="City buildings"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-bold text-sm md:text-base text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-tight">
                  Yorem ipsum dolor sit amet, consectetur
                </h4>
                <div className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto pt-1">
                  Oil, Gas & Energy | July 23, 2024
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Tourism & Hospitality */}
        <div className="w-full lg:w-[35%] bg-[#f5f5f5] p-5 md:p-6 lg:p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202]">
              Tourism & Hospitality
            </h2>
            <button className="text-[#24214c] font-bold text-sm flex items-center hover:text-[#FF0202] transition-colors">
              View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
            </button>
          </div>

          {/* Featured Article */}
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-[16/10] mb-4 overflow-hidden bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
                alt="City skyline at dusk"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-[11px] md:text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
              Oil, Gas & Energy | July 23, 2024
            </div>
            <h3 className="text-[17px] md:text-xl font-bold text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-tight">
              How 5G Will Communication and Connectivity
            </h3>
          </div>

          {/* Vertical List of smaller articles */}
          <div className="flex flex-col gap-5 mt-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer flex gap-4 items-center">
                <div className="relative w-[110px] md:w-[130px] aspect-[16/10] shrink-0 overflow-hidden bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=200&q=80"
                    alt="City buildings"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center gap-1.5 flex-1">
                  <h4 className="font-bold text-[15px] text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-tight">
                    Yorem ipsum dolor sit amet, secte consectetur
                  </h4>
                  <div className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-auto">
                    Oil, Gas & Energy | July 23, 2024
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </SectionContainer>
  );
};

export default HealthcareTourismSection;
