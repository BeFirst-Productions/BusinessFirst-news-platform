import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';

const dummyLogisticsFeatured = {
  id: 'log-f1',
  title: 'How 5G Will Transform Class Communication ac aliquet Class putate libero',
  category: 'Oil, Gas & Energy',
  date: 'July 23, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&w=800&q=80'
};

const dummyLogisticsSmall = [
  {
    id: 'log-s1',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'log-s2',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1551281622-d7b3010b9a69?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'log-s3',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80'
  }
];

const dummyAviationFeatured = {
  id: 'av-f1',
  title: 'How 5G Will Transform Class Communication ac aliquet Class putate libero',
  category: 'Oil, Gas & Energy',
  date: 'July 23, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'
};

const dummyAviationSmall = [
  {
    id: 'av-s1',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'av-s2',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'av-s3',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1559060017-445fb9722f2a?auto=format&fit=crop&w=400&q=80'
  }
];

const LogisticsAviationSection = () => {
  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <div className="flex flex-col lg:flex-row w-full gap-0 border border-gray-100 shadow-sm">
        {/* Left Column: Logistics & Trade */}
        <div className="flex-1 bg-white p-6 md:p-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">Logistics & Trade</h2>
            <div className="absolute -bottom-[2px] left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#FF0202] to-transparent"></div>
            <a href="#" className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity">
              View All <ChevronDown size={16} className="ml-1 text-[#24214c]" />
            </a>
          </div>

          {/* Featured Article */}
          <div className="flex flex-col sm:flex-row gap-4 group cursor-pointer pb-2">
            <div className="relative w-full sm:w-[45%] aspect-[4/3] overflow-hidden shrink-0">
              <Image
                src={dummyLogisticsFeatured.imageUrl}
                alt={dummyLogisticsFeatured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-center sm:w-[55%]">
              <h3 className="text-[#24214c] font-bold text-[18px] leading-[1.3] group-hover:text-[#FF0202] transition-colors">
                {dummyLogisticsFeatured.title}
              </h3>
              <span className="text-xs text-gray-500 font-medium mt-3">
                {dummyLogisticsFeatured.category} | {dummyLogisticsFeatured.date}
              </span>
            </div>
          </div>

          {/* Small Articles */}
          <div className="flex flex-col gap-6">
            {dummyLogisticsSmall.map((item) => (
              <div key={item.id} className="flex gap-4 group cursor-pointer items-center">
                <div className="relative w-[30%] aspect-[4/3] shrink-0 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center w-[70%]">
                  <h4 className="text-[#24214c] font-bold text-[14px] leading-snug group-hover:text-[#FF0202] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-medium mt-1.5">
                    {item.category} | {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Aviation & Aerospace */}
        <div className="flex-1 bg-[#24214c] p-6 md:p-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-600 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">Aviation & Aerospace</h2>
            <div className="absolute -bottom-[2px] left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#FF0202] to-transparent"></div>
            <a href="#" className="flex items-center text-[#f1b434] font-bold text-sm hover:opacity-80 transition-opacity">
              View All <ChevronDown size={16} className="ml-1 text-[#f1b434]" />
            </a>
          </div>

          {/* Featured Article */}
          <div className="flex flex-col sm:flex-row gap-4 group cursor-pointer pb-2">
            <div className="relative w-full sm:w-[45%] aspect-[4/3] overflow-hidden shrink-0">
              <Image
                src={dummyAviationFeatured.imageUrl}
                alt={dummyAviationFeatured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-center sm:w-[55%]">
              <h3 className="text-white font-bold text-[18px] leading-[1.3] group-hover:text-[#f1b434] transition-colors">
                {dummyAviationFeatured.title}
              </h3>
              <span className="text-xs text-[#f1b434] font-medium mt-3">
                {dummyAviationFeatured.category} | {dummyAviationFeatured.date}
              </span>
            </div>
          </div>

          {/* Small Articles */}
          <div className="flex flex-col gap-6">
            {dummyAviationSmall.map((item) => (
              <div key={item.id} className="flex gap-4 group cursor-pointer items-center">
                <div className="relative w-[30%] aspect-[4/3] shrink-0 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center w-[70%]">
                  <h4 className="text-white font-bold text-[14px] leading-snug group-hover:text-[#f1b434] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-[#f1b434] font-medium mt-1.5">
                    {item.category} | {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 w-full">
        <FullWidthAdBanner ratio="ad_6" />
      </div>
    </SectionContainer>
  );
};

export default LogisticsAviationSection;
