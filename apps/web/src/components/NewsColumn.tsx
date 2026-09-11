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
  articles?: NewsItem[];
  featured?: NewsItem;
  mediumGrid?: NewsItem[];
  smallList?: NewsItem[];
}

const NewsColumn: React.FC<NewsColumnProps> = ({
  title,
  titleColor = '#FF0202',
  articles,
  featured: propFeatured,
  mediumGrid: propMediumGrid = [],
  smallList: propSmallList = []
}) => {
  const featured = articles ? articles[0] : propFeatured;
  const mediumGrid = articles ? articles.slice(1, 5) : propMediumGrid;
  const smallList = articles ? articles.slice(5, 8) : propSmallList;

  const hasArticles = Boolean(featured || mediumGrid.length > 0 || smallList.length > 0);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-2">
        <div className="relative">
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: titleColor }}>{title}</h2>
          <div className="absolute -bottom-[9px] left-0 w-full h-[3px]" style={{ backgroundColor: titleColor }}></div>
        </div>
        <Link href={`/news?search=${encodeURIComponent(title)}`} className="flex items-center text-[#24214c] font-bold text-sm hover:opacity-80 transition-opacity">
          View All <ChevronDown size={16} className="ml-1 text-gray-500" />
        </Link>
      </div>

      {!hasArticles ? (
        <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
          <p className="text-gray-400 text-sm font-semibold">No article available</p>
        </div>
      ) : (
        <>
          {/* Featured Large Card */}
          {featured && (
            <Link href={`/news/${featured.id}`} className="flex flex-col gap-2 group cursor-pointer w-full">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs text-gray-500 font-medium mt-1">
                {featured.category ? `${featured.category} | ` : ''}{featured.date}
              </span>
              <h3 className="text-[#24214c] font-bold text-lg xl:text-xl leading-tight group-hover:text-[#cd2027] transition-colors line-clamp-2 min-h-[45px]">
                {featured.title}
              </h3>
            </Link>
          )}

          {/* Medium 2-Column Grid */}
          {mediumGrid.length > 0 && (
            <div className="grid grid-cols-2 gap-3 xl:gap-4">
              {mediumGrid.slice(0, 4).map((item) => (
                <Link href={`/news/${item.id}`} key={item.id} className="flex flex-col group cursor-pointer h-full">
                  <div className="relative w-full aspect-video overflow-hidden rounded mb-2">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-between gap-1.5">
                    <h4 className="text-[#24214c] font-bold text-xs sm:text-sm leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2 min-h-[2.4rem]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-medium mt-auto">
                      {item.category ? `${item.category} | ` : ''}{item.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Small Horizontal List */}
          {smallList.length > 0 && (
            <div className="flex flex-col gap-3 xl:gap-4">
              {smallList.slice(0, 3).map((item, index) => (
                <Link
                  href={`/news/${item.id}`}
                  key={item.id}
                  className="flex gap-2.5 sm:gap-3 group cursor-pointer items-center"
                >
                  <div className="relative w-20 xl:w-24 h-14 xl:h-16 shrink-0 overflow-hidden rounded">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-h-[3.5rem] xl:min-h-[4rem] min-w-0 flex-1 gap-1">
                    <h4 className="text-[#24214c] font-bold text-xs sm:text-sm leading-snug group-hover:text-[#cd2027] transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-medium leading-tight">
                      {item.category ? `${item.category} | ` : ''}{item.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsColumn;
