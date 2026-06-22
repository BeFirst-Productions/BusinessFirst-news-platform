import React from 'react';
import Image from 'next/image';
import SectionContainer from './SectionContainer';
import { ChevronRight } from 'lucide-react';
import SectionTitle from './SectionTitle';

const sponsoredArticles = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, sectur consectetur',
    date: '16 mins / Sep 22, 2025',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet, sectur consectetur',
    date: '16 mins / Sep 22, 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet, sectur consectetur',
    date: '16 mins / Sep 22, 2025',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet, sectur consectetur',
    date: '16 mins / Sep 22, 2025',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
  },
];

const SponsoredContents = () => {
  return (
    <SectionContainer 
      as="section"
      className="bg-black py-8 md:py-12 border-t-[8px] border-black" // Extra border/margin to separate if needed
      containerClassName="flex flex-col"
    >
      {/* Title Section */}
      <SectionTitle title="Sponsored Contents" />
     
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sponsoredArticles.map((article) => (
          <div 
            key={article.id} 
            className="bg-[#24214c] rounded-xl overflow-hidden flex flex-col hover:transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer shadow-lg"
          >
            <div className="relative h-48 sm:h-52 w-full">
              <Image 
                src={article.image} 
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow justify-between">
              <h3 className="text-white font-medium text-sm md:text-base leading-snug mb-3 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-[#e2b036] text-xs font-semibold">
                {article.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-12 flex justify-center">
        <button className="bg-[#cd2027] hover:bg-[#a61a1f] text-white px-6 py-2 rounded font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-1">
          View All <ChevronRight size={16} strokeWidth={3} />
        </button>
      </div>
    </SectionContainer>
  );
};

export default SponsoredContents;
