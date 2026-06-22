import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import SectionContainer from './SectionContainer';
import { NewsItem } from './NewsColumn';

// --- Dummy Data ---
const dummyRealEstateFeatured: NewsItem = {
  id: 're-f1',
  title: 'How 5G Will Transform Communication and Connectivity',
  category: 'Oil, Gas & Energy',
  date: 'July 23, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=800&q=80'
};

const dummyRealEstateSmall: NewsItem[] = [
  {
    id: 're-s1',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 're-s2',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 're-s3',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=200&q=80'
  }
  ,
  {
    id: 're-s4',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=200&q=80'
  }
];

const dummyRealEstateMedium: NewsItem[] = [
  {
    id: 're-m1',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1574328405096-7fcfa4a9b583?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 're-m2',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 're-m3',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80'
  }
];

const dummyEconomyFeatured: NewsItem = {
  id: 'ec-f1',
  title: 'How 5G Will Transform Communication and Connectivity',
  category: 'Oil, Gas & Energy',
  date: 'July 23, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
};

const dummyEconomySmall: NewsItem[] = [
  {
    id: 'ec-s1',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ec-s2',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ec-s3',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ec-s4',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ec-s5',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=200&q=80'
  }
];


const CategoryNewsSection = () => {
  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full">
        
        {/* Left Block - Real Estate & Construction (Spans 8/12) */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">Real Estate & Construction</h2>
              <div className="absolute -bottom-[9px] left-0 w-full h-[3px] bg-[#FF0202]"></div>
            </div>
            <a href="#" className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity">
              View All <ChevronDown size={16} className="ml-1 text-gray-500" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Sub-column */}
            <div className="md:col-span-8 flex flex-col gap-6">
              {/* Featured Article */}
              <div className="flex flex-col gap-2 group cursor-pointer">
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image 
                    src={dummyRealEstateFeatured.imageUrl} 
                    alt={dummyRealEstateFeatured.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium mt-2">
                  {dummyRealEstateFeatured.category} | {dummyRealEstateFeatured.date}
                </span>
                <h3 className="text-[#24214c] font-bold text-lg md:text-xl leading-tight group-hover:text-[#cd2027] transition-colors">
                  {dummyRealEstateFeatured.title}
                </h3>
              </div>

              {/* Small Horizontal List */}
              <div className="flex flex-col gap-4 mt-2">
                {dummyRealEstateSmall.map((item) => (
                  <div key={item.id} className="flex gap-4 group cursor-pointer items-center">
                    <div className="relative w-28 h-16 shrink-0 overflow-hidden">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[#24214c] font-bold text-sm leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-medium mt-1">
                        {item.category} | {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sub-column */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {dummyRealEstateMedium.map((item, index) => {
                const isFirst = index === 0;
                return (
                  <div key={item.id} className="flex flex-col gap-2 group cursor-pointer">
                    <div className={`relative w-full ${isFirst ? 'aspect-[4/3]' : 'aspect-video'} overflow-hidden`}>
                      <Image 
                        src={item.imageUrl} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-[#24214c] font-bold text-base leading-snug group-hover:text-[#cd2027] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs text-gray-500 font-medium">
                      {item.category} | {item.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Block - Economy & Policy (Spans 4/12) */}
        <div className="lg:col-span-4 flex flex-col w-full h-full">
          <div className="bg-[#F5F5F5] p-6 lg:p-8 flex flex-col gap-6 h-full border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <div className="relative">
                <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">Economy & Policy</h2>
                <div className="absolute -bottom-[9px] left-0 w-full h-[3px] bg-[#FF0202]"></div>
              </div>
              <a href="#" className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity">
                View All <ChevronDown size={16} className="ml-1 text-gray-500" />
              </a>
            </div>

            {/* Featured Article */}
            <div className="flex flex-col gap-2 group cursor-pointer">
              <div className="relative w-full aspect-[16/9] overflow-hidden mt-2">
                <Image 
                  src={dummyEconomyFeatured.imageUrl} 
                  alt={dummyEconomyFeatured.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs text-gray-500 font-medium mt-2">
                {dummyEconomyFeatured.category} | {dummyEconomyFeatured.date}
              </span>
              <h3 className="text-[#24214c] font-bold text-lg md:text-xl leading-tight group-hover:text-[#cd2027] transition-colors">
                {dummyEconomyFeatured.title}
              </h3>
            </div>

            {/* Small Horizontal List */}
            <div className="flex flex-col gap-4 mt-2">
              {dummyEconomySmall.map((item) => (
                <div key={item.id} className="flex gap-4 group cursor-pointer items-center">
                  <div className="relative w-28 h-16 shrink-0 overflow-hidden">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-[#24214c] font-bold text-sm leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-medium mt-1">
                      {item.category} | {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </SectionContainer>
  );
};

export default CategoryNewsSection;
