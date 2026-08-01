"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import { DynamicAd } from './ads/DynamicAd';
import { useArticles } from '@/hooks/use-articles';

// Normalized categorization mappings to handle section clicks
const SECTION_MAPPINGS: Record<string, string[]> = {
  'Region': ['UAE News', 'MENA', 'Economy & Policy', 'International'],
  'Key Sectors': [
    'Oil, Gas & Energy',
    'Real Estate &Construction',
    'Technology & Innovation',
    'Logistics & Trade',
    'Banking & Finance'
  ],
  'Other Sectors': [
    'Education & Training',
    'Aviation & Aerospace',
    'Manufacturing & Industrial',
    'Sustainability & CSR'
  ],
  'Lifestyle': [
    'Media &Entertainment',
    'Tourism & Hospitality',
    'Retail & E-commerce',
    'Healthcare &Pharma',
    'Sports & Recreation',
    'Lifestyle & Culture'
  ],
  'Exclusive Segments': [
    'Sponsored Contents',
    'Events & Coverage',
    'Business & Beyond',
    'Daily Insights',
    'Careers'
  ]
};

const CategoryListing: React.FC = () => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get('category') || 'Latest News';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const itemsPerPage = 15;

  // Fetch live published articles from Express API (/api/v1/website/articles)
  const { data: apiResponse, isLoading } = useArticles({
    page: currentPage,
    limit: itemsPerPage,
    ...(categoryName !== 'Latest News' && { search: categoryName }),
  });

  // Extract live articles from API
  const rawApiArticles = apiResponse?.data || [];
  
  const displayArticles = rawApiArticles.map((item: any) => ({
    id: item.slug || item.id,
    title: item.title,
    category: item.category?.name || categoryName,
    date: item.publishedAt
      ? new Date(item.publishedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      : '',
    imageUrl: item.featuredImage || '/placeholder-news.jpg',
    excerpt: item.excerpt || item.title,
  }));

  const totalPages = apiResponse?.metadata?.totalPages || 1;
  const activePage = Math.min(currentPage, totalPages);
  const paginatedArticles = displayArticles;

  // Helper to build URL with kept category and set page
  const getPageUrl = (pageNum: number) => {
    return `/news?category=${encodeURIComponent(categoryName)}&page=${pageNum}`;
  };

  // Extract exclusive articles from API response
  const exclusiveArticles = displayArticles.slice(0, 5);

  // Suggested UAE News articles from API response
  const suggestedArticles = displayArticles.slice(4, 8);

  return (
    <div className="w-full bg-white flex flex-col items-center">
      {/* Upper Content Section */}
      <SectionContainer className="bg-white pt-6 pb-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#cd2027] transition-colors">
            Home
          </Link>
          <span className="text-[#cd2027] font-semibold">&gt;</span>
          <span className="text-[#cd2027] font-semibold">{categoryName}</span>
        </div>

        {/* Category Header */}
        <div className="border-b border-gray-200 pb-5 mb-8">
          <h1 className="text-3xl font-extrabold text-[#cd2027] mb-3 tracking-tight">
            {categoryName}
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-4xl font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et odio 
            mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos 
            himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.
          </p>
        </div>

        {/* Main Grid: Grid Listing + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          {/* Left Side: News Cards Grid & Pagination */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
              {paginatedArticles.map((article) => (
                <Link 
                  key={article.id} 
                  href={`/news/${article.id}`} 
                  className="group flex flex-col gap-2.5 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 px-1">
                    <h3 className="font-bold text-sm text-[#24214c] line-clamp-2 leading-snug group-hover:text-[#cd2027] transition-colors duration-200">
                      {article.title}
                    </h3>
                    <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                      {article.category} | {article.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                {activePage > 1 ? (
                  <Link
                    href={getPageUrl(activePage - 1)}
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 bg-white text-gray-600 text-xs font-bold rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={14} /> Previous
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 bg-gray-50 text-gray-400 text-xs font-bold rounded-md cursor-not-allowed"
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                )}

                {activePage < totalPages ? (
                  <Link
                    href={getPageUrl(activePage + 1)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-bold rounded-md hover:bg-zinc-800 transition-colors"
                  >
                    Next <ChevronRight size={14} />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-200 text-gray-400 text-xs font-bold rounded-md cursor-not-allowed"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Side: Sidebar Widgets */}
          <aside className="lg:col-span-4 flex flex-col gap-8 w-full">
            {/* Exclusives News Section */}
            <div className="bg-[#24214c] rounded-2xl p-5 text-white flex flex-col gap-4 shadow-lg border border-white/5">
              <h2 className="text-[#cd2027] font-extrabold tracking-wider uppercase text-center text-lg border-b border-white/10 pb-3">
                Exclusives News
              </h2>
              <div className="flex flex-col gap-4">
                {exclusiveArticles.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className={`flex gap-3 hover:opacity-90 transition-opacity pb-3 ${
                      index !== exclusiveArticles.length - 1 ? 'border-b border-white/10' : ''
                    }`}
                  >
                    <div className="relative w-20 h-14 shrink-0 rounded overflow-hidden bg-gray-800 border border-white/10">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-0.5">
                      <h4 className="text-[11px] text-white line-clamp-2 leading-snug font-semibold hover:text-[#cd2027] transition-colors">
                        Yorem ipsum dolor sit amet, Nunc vulputate libero et vel interdum, ac aliquet nisl.
                      </h4>
                      <span className="text-[9px] text-amber-400 font-extrabold uppercase mt-1 tracking-wider">
                        {item.category} | {item.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Square Ad Banner */}
            <DynamicAd
              ratio="nc_sidebar"
              targetPage="news_category"
              className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-900 group cursor-pointer"
              fallback={
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&h=500&q=80"
                  alt="Burger Sidebar Ad"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              }
            />
          </aside>
        </div>

        {/* McDonald's Banner Ad Container */}
       <div className='w-full py-8 md:py-12'>
          <FullWidthAdBanner targetPage="news_category" ratio="nc_bottom" />
        </div>
      </SectionContainer>

      {/* Suggested UAE News Section (Light grey background, breaks out of content spacing) */}
      <div className="w-full bg-[#f9f9fb] py-12 border-t border-gray-200/50 flex justify-center">
        <SectionContainer className="bg-transparent py-0">
          <h2 className="text-[#cd2027] font-extrabold text-2xl mb-8 tracking-tight">
            Suggested UAE News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {suggestedArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/news/${article.id}`} 
                className="group bg-white border border-gray-200/70 rounded-2xl p-3 pb-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3.5 cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 200px"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-grow">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                    {article.category} | {article.date}
                  </span>
                  <h3 className="font-bold text-sm text-[#24214c] line-clamp-2 leading-snug group-hover:text-[#cd2027] transition-colors duration-200">
                    How 5G Will Transform Communication and Connectivity
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default CategoryListing;
