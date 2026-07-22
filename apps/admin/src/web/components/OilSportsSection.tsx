import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import SectionContainer from './SectionContainer';

const dummyOilFeatured = {
  id: 'oil-f1',
  title: 'How 5G Will Transform CCCC Class Communication and , ac aliquet Class',
  category: 'Oil, Gas & Energy',
  date: 'July 23, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'
};

const dummyOilSmall = [
  {
    id: 'oil-s1',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'oil-s2',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'oil-s3',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80'
  }
];

const dummySportsFeatured = {
  id: 'spo-f1',
  title: 'How 5G Will Transform CCCC Class Communication and , ac aliquet Class',
  category: 'Oil, Gas & Energy',
  date: 'July 23, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80'
};

const dummySportsSmall = [
  {
    id: 'spo-s1',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'spo-s2',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'spo-s3',
    title: 'Borem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero et interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=400&q=80'
  }
];

const OilSportsSection = () => {
  return (
    <SectionContainer as="section" className="bg-[#F5F5F5] py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full lg:divide-x lg:divide-gray-300">
        
        {/* Left Column: Oil, Gas & Energy */}
        <div className="flex flex-col gap-6 w-full lg:pr-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">Oil, Gas & Energy</h2>
            <div className="absolute -bottom-[2px] left-0 w-24 h-[3px] bg-[#FF0202]"></div>
            <a href="#" className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity">
              View All <ChevronDown size={16} className="ml-1 text-[#24214c]" />
            </a>
          </div>

          {/* Featured Article */}
          <div className="flex flex-col gap-3 group cursor-pointer mt-1">
            <div className="relative w-full aspect-[2/1] overflow-hidden">
              <Image 
                src={dummyOilFeatured.imageUrl} 
                alt={dummyOilFeatured.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-[#24214c] font-bold text-[18px] leading-[1.3] group-hover:text-[#FF0202] transition-colors mt-2">
              {dummyOilFeatured.title}
            </h3>
            <span className="text-[11px] text-gray-500 font-medium">
              {dummyOilFeatured.category} | {dummyOilFeatured.date}
            </span>
          </div>

          {/* Small Articles */}
          <div className="flex flex-col gap-5 mt-2">
            {dummyOilSmall.map((item) => (
              <div key={item.id} className="flex gap-4 group cursor-pointer items-center">
                <div className="relative w-[35%] aspect-[16/9] shrink-0 overflow-hidden">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center w-[65%]">
                  <h4 className="text-[#24214c] font-bold text-[13px] leading-[1.4] group-hover:text-[#FF0202] transition-colors line-clamp-3">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-medium mt-1.5">
                    {item.category} | {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sports & Recreation */}
        <div className="flex flex-col gap-6 w-full lg:pl-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">Sports & Recreation</h2>
            <div className="absolute -bottom-[2px] left-0 w-24 h-[3px] bg-[#FF0202]"></div>
            <a href="#" className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity">
              View All <ChevronDown size={16} className="ml-1 text-[#24214c]" />
            </a>
          </div>

          {/* Featured Article */}
          <div className="flex flex-col gap-3 group cursor-pointer mt-1">
            <div className="relative w-full aspect-[2/1] overflow-hidden">
              <Image 
                src={dummySportsFeatured.imageUrl} 
                alt={dummySportsFeatured.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-[#24214c] font-bold text-[18px] leading-[1.3] group-hover:text-[#FF0202] transition-colors mt-2">
              {dummySportsFeatured.title}
            </h3>
            <span className="text-[11px] text-gray-500 font-medium">
              {dummySportsFeatured.category} | {dummySportsFeatured.date}
            </span>
          </div>

          {/* Small Articles */}
          <div className="flex flex-col gap-5 mt-2">
            {dummySportsSmall.map((item) => (
              <div key={item.id} className="flex gap-4 group cursor-pointer items-center">
                <div className="relative w-[35%] aspect-[16/9] shrink-0 overflow-hidden">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center w-[65%]">
                  <h4 className="text-[#24214c] font-bold text-[13px] leading-[1.4] group-hover:text-[#FF0202] transition-colors line-clamp-3">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-medium mt-1.5">
                    {item.category} | {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionContainer>
  );
};

export default OilSportsSection;
