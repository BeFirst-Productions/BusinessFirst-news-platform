import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export interface NewsItem {
  id: string | number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

interface NewsColumnProps {
  title: string;
  titleColor?: string;
  featured: NewsItem;
  mediumGrid: NewsItem[];
  smallList: NewsItem[];
}

const NewsColumn: React.FC<NewsColumnProps> = ({ title, titleColor = '#FF0202', featured, mediumGrid, smallList }) => {
  return (
    <div className="flex flex-col gap-6 w-full ">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-2">
        <div className="relative">
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: titleColor }}>{title}</h2>
          <div className="absolute -bottom-[9px] left-0 w-full h-[3px]" style={{ backgroundColor: titleColor }}></div>
        </div>
        <a href="#" className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity">
          View All <ChevronDown size={16} className="ml-1 text-gray-500" />
        </a>
      </div>

      {/* Featured Large Card */}
      <Link href={`/news/${featured.id}`} className="flex flex-col gap-2 group cursor-pointer w-full">
        <div className="relative w-full aspect-[16/9] border-4 border-[#2ca4e8] overflow-hidden">
          <Image 
            src={featured.imageUrl} 
            alt={featured.title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <span className="text-xs text-gray-500 font-medium mt-1">
          {featured.category} | {featured.date}
        </span>
        <h3 className="text-[#24214c] font-bold text-lg leading-tight group-hover:text-[#cd2027] transition-colors">
          {featured.title}
        </h3>
      </Link>

      {/* Medium 2-Column Grid */}
      <div className="grid grid-cols-2 gap-4">
        {mediumGrid.slice(0, 4).map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} className="flex flex-col gap-2 group cursor-pointer">
            <div className="relative w-full aspect-video overflow-hidden">
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-[#24214c] font-bold text-sm leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-3">
              {item.title}
            </h4>
            <span className="text-[10px] text-gray-500 font-medium">
              {item.category} | {item.date}
            </span>
          </Link>
        ))}
      </div>

      {/* Small Horizontal List */}
      <div className="flex flex-col gap-4">
        {smallList.slice(0, 3).map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} className="flex gap-3 group cursor-pointer items-center">
            <div className="relative w-24 h-16 shrink-0 overflow-hidden">
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsColumn;
