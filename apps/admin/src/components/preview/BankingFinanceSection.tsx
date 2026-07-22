import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import SectionContainer from './SectionContainer';
import AdBanner from './AdBanner';
import FullWidthAdBanner from './FullWidthAdBanner';
import NewsletterWidget from './NewsletterWidget';

const dummyBankingFeatured = {
  id: 'bf-f1',
  title: 'How 5G Will Transform CCCC Class Communication and , ac aliquet Class',
  category: 'Oil, Gas & Energy',
  date: 'July 23, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80'
};

const dummyBankingSmall = [
  {
    id: 'bf-s1',
    title: 'Yorem ipsum dolor sit amet, secte consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bf-s2',
    title: 'Yorem ipsum dolor sit amet, secte consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1551281622-d7b3010b9a69?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bf-s3',
    title: 'Yorem ipsum dolor sit amet, secte consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80'
  }
];

const dummyBankingMedium = [
  {
    id: 'bf-m1',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bf-m2',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bf-m3',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80'
  }
];

const BankingFinanceSection = () => {
  return (
    <SectionContainer as="section" className="bg-white py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full">

        {/* Left Block - Banking & Finance (Spans 8/12) */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2 relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202]">Banking & Finance</h2>
            <div className="absolute -bottom-[2px] left-0 w-32 h-[3px] bg-gradient-to-r from-[#FF0202] to-transparent"></div>
            <a href="#" className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity">
              View All <ChevronDown size={16} className="ml-1 text-[#24214c]" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Sub-column */}
            <div className="md:col-span-8 flex flex-col gap-6">
              {/* Featured Article */}
              <Link href={`/news/${dummyBankingFeatured.id}`} className="flex flex-col gap-3 group cursor-pointer pb-2 border-b border-gray-100">
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={dummyBankingFeatured.imageUrl}
                    alt={dummyBankingFeatured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-[#24214c] font-bold text-[18px] leading-[1.3] group-hover:text-[#FF0202] transition-colors mt-2">
                  {dummyBankingFeatured.title}
                </h3>
                <span className="text-[11px] text-gray-500 font-medium">
                  {dummyBankingFeatured.category} | {dummyBankingFeatured.date}
                </span>
              </Link>

              {/* Small Articles */}
              <div className="flex flex-col gap-5 mt-2">
                {dummyBankingSmall.map((item) => (
                  <Link href={`/news/${item.id}`} key={item.id} className="flex gap-4 group cursor-pointer items-center">
                    <div className="relative w-[35%] aspect-[16/9] shrink-0 overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col justify-center w-[65%]">
                      <h4 className="text-[#24214c] font-bold text-[14px] leading-snug group-hover:text-[#FF0202] transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-medium mt-1.5">
                        {item.category} | {item.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Sub-column */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {dummyBankingMedium.map((item) => (
                <Link href={`/news/${item.id}`} key={item.id} className="flex flex-col gap-2 group cursor-pointer">
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-[#24214c] font-bold text-[16px] leading-[1.3] group-hover:text-[#FF0202] transition-colors mt-1">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {item.category} | {item.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Block - Ad & Newsletter (Spans 4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full h-full pt-10">
          {/* Ad Banner - Takes up available space */}
          <FullWidthAdBanner
            ratio="ad_7"
            containerClassName="w-full flex-1 aspect-square lg:aspect-auto"
            adClassName="w-full h-full object-cover min-h-[300px]"
          />
          {/* Newsletter Widget */}
          <NewsletterWidget />
        </div>

      </div>
    </SectionContainer>
  );
};

export default BankingFinanceSection;
