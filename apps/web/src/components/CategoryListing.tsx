"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import SectionContainer from './SectionContainer';
import FullWidthAdBanner from './FullWidthAdBanner';
import { DynamicAd } from './ads/DynamicAd';
import { useArticles } from '@/hooks/use-articles';
import { useCategories } from '@/hooks/use-categories';

// Normalized categorization mappings to handle section clicks
const SECTION_MAPPINGS: Record<string, string[]> = {
  'Region': ['UAE News', 'MENA', 'Economy & Policy', 'International'],
  'Key Sectors': [
    'Oil, Gas & Energy',
    'Real Estate & Construction',
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
    'Media & Entertainment',
    'Tourism & Hospitality',
    'Retail & E-commerce',
    'Healthcare & Pharma',
    'Sports & Recreation',
    'Lifestyle & Culture'
  ],
  'Exclusive Segments': [
    'Featured Analysis',
    'Sponsored Contents',
    // 'Events & Coverage',
    // 'Business & Beyond',
    'Daily Insights',
    // 'Careers'
  ]
};

const normalizeWords = (str: string) =>
  str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0 && w !== 'and')
    .sort()
    .join(' ');

const CATEGORY_ALIASES: Record<string, string[]> = {
  'culture & lifestyle': ['lifestyle & culture', 'lifestyle-culture', 'culture-lifestyle', 'lifestyle', 'culture'],
  'lifestyle & culture': ['culture & lifestyle', 'lifestyle-culture', 'culture-lifestyle', 'lifestyle', 'culture'],
  'media & entertainment': ['media and entertainment', 'media-entertainment', 'media', 'entertainment', 'media coverage'],
  'media and entertainment': ['media & entertainment', 'media-entertainment', 'media', 'entertainment', 'media coverage'],
  'daily insights': ['insights', 'daily-insights', 'daily insight', 'insight'],
  'insights': ['daily insights', 'daily-insights', 'daily insight', 'insight'],
  'events': ['events & coverage', 'events-coverage', 'events and coverage', 'event'],
  'events & coverage': ['events', 'events-coverage', 'events and coverage', 'event'],
  'economy & policy': ['economy and policy', 'economy-policy', 'economy', 'policy'],
  'economy and policy': ['economy & policy', 'economy-policy', 'economy', 'policy'],
  'real estate & construction': ['real estate and construction', 'real estate', 'construction', 'real-estate-construction'],
  'real estate and construction': ['real estate & construction', 'real estate', 'construction', 'real-estate-construction'],
  'technology & innovation': ['technology and innovation', 'tech', 'technology', 'innovation', 'technology-innovation'],
  'technology and innovation': ['technology & innovation', 'tech', 'technology', 'innovation', 'technology-innovation'],
  'logistics & trade': ['logistics and trade', 'logistics', 'trade', 'logistics-trade'],
  'logistics and trade': ['logistics & trade', 'logistics', 'trade', 'logistics-trade'],
  'aviation & aerospace': ['aviation and aerospace', 'aviation', 'aerospace', 'aviation-aerospace'],
  'aviation and aerospace': ['aviation & aerospace', 'aviation', 'aerospace', 'aviation-aerospace'],
  'banking & finance': ['banking and finance', 'banking', 'finance', 'banking-finance'],
  'banking and finance': ['banking & finance', 'banking', 'finance', 'banking-finance'],
  'oil, gas & energy': ['oil and gas', 'oil & gas', 'energy', 'oil-gas-energy', 'oil', 'gas'],
  'oil & gas': ['oil, gas & energy', 'oil and gas', 'energy', 'oil-gas-energy', 'oil', 'gas'],
  'healthcare & pharma': ['healthcare and pharma', 'healthcare', 'pharma', 'health', 'healthcare-pharma'],
  'healthcare and pharma': ['healthcare & pharma', 'healthcare', 'pharma', 'health', 'healthcare-pharma'],
  'tourism & hospitality': ['tourism and hospitality', 'tourism', 'hospitality', 'tourism-hospitality'],
  'tourism and hospitality': ['tourism & hospitality', 'tourism', 'hospitality', 'tourism-hospitality'],
  'sports & recreation': ['sports and recreation', 'sports', 'recreation', 'sports-recreation'],
  'sports and recreation': ['sports & recreation', 'sports', 'recreation', 'sports-recreation'],
};

const findCategory = (categories: any[] | undefined, targetName: string) => {
  if (!categories || !targetName) return undefined;
  const target = targetName.toLowerCase().trim();
  const targetSlug = target.replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-');
  const targetNorm = normalizeWords(target);
  const aliases = CATEGORY_ALIASES[target] || [];

  // 1. Exact name or slug match
  const exact = categories.find(
    (c: any) =>
      c.name?.toLowerCase().trim() === target ||
      c.slug?.toLowerCase().trim() === targetSlug ||
      c.slug?.toLowerCase().trim() === target
  );
  if (exact) return exact;

  // 2. Normalized words match (e.g. "Culture & Lifestyle" matches "Lifestyle & Culture")
  const normMatch = categories.find(
    (c: any) => normalizeWords(c.name || '') === targetNorm || normalizeWords(c.slug || '') === targetNorm
  );
  if (normMatch) return normMatch;

  // 3. Known aliases match
  const aliasMatch = categories.find((c: any) => {
    const cName = c.name?.toLowerCase().trim();
    const cSlug = c.slug?.toLowerCase().trim();
    return (
      aliases.includes(cName) ||
      aliases.includes(cSlug) ||
      (CATEGORY_ALIASES[cName] && (CATEGORY_ALIASES[cName].includes(target) || CATEGORY_ALIASES[cName].includes(targetSlug)))
    );
  });
  if (aliasMatch) return aliasMatch;

  // 4. Word subset match
  const targetWords = targetNorm.split(' ').filter(Boolean);
  const subsetMatch = categories.find((c: any) => {
    const cWords = normalizeWords(c.name || '').split(' ').filter(Boolean);
    return targetWords.length > 0 && (
      cWords.every((w) => targetWords.includes(w)) ||
      targetWords.every((w) => cWords.includes(w))
    );
  });
  if (subsetMatch) return subsetMatch;

  // 5. Substring match
  return categories.find((c: any) => {
    const cName = c.name?.toLowerCase().trim();
    return cName && (cName.includes(target) || target.includes(cName));
  });
};

const CategoryListing: React.FC = () => {
  const searchParams = useSearchParams();
  const rawSearchQuery = searchParams.get('search') || searchParams.get('q') || '';
  const searchQuery = rawSearchQuery.trim();
  const isSearchMode = searchQuery.length > 0;

  const isSponsoredParam = searchParams.get('isSponsored') === 'true';
  const isFeaturedParam = searchParams.get('isFeatured') === 'true';
  const isTrendingParam = searchParams.get('isTrending') === 'true';
  const isUaeNewsParam = searchParams.get('isUaeNews') === 'true';
  const rawCategoryName = searchParams.get('category');

  const isTrending = isTrendingParam || rawCategoryName?.toLowerCase() === 'trending news' || rawCategoryName?.toLowerCase() === 'trending';
  const isUaeNews = isUaeNewsParam || rawCategoryName?.toLowerCase() === 'uae news' || rawCategoryName?.toLowerCase() === 'uae';
  const isSponsored = isSponsoredParam || rawCategoryName?.toLowerCase() === 'sponsored contents' || rawCategoryName?.toLowerCase() === 'sponsored';
  const isFeatured = isFeaturedParam || rawCategoryName?.toLowerCase() === 'featured analysis';

  const categoryName = isSearchMode
    ? `Search: "${searchQuery}"`
    : isSponsored
    ? 'Sponsored Contents'
    : isFeatured
    ? 'Featured Analysis'
    : isTrending
    ? 'Trending News'
    : isUaeNews
    ? 'UAE News'
    : (rawCategoryName || 'Latest News');

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const itemsPerPage = 12;

  // Fetch all categories to get matched category & ID
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const matchedCategory = findCategory(categories, categoryName);

  const isFeaturedAnalysis = categoryName === 'Featured Analysis';
  const targetCategoryId =
    matchedCategory?.id || (isFeaturedAnalysis ? '79db4f54-ed90-4bae-9866-ef5f97a348c2' : undefined);

  const isSpecialCategory = isSearchMode || isSponsored || isTrending || isUaeNews || isFeatured || categoryName === 'Latest News';
  const isArticlesEnabled = isSpecialCategory || !isCategoriesLoading;

  // Fetch live published articles from Express API (/api/v1/website/articles)
  const { data: apiResponse, isLoading: isArticlesLoading } = useArticles(
    {
      page: currentPage,
      limit: itemsPerPage,
      ...(isSearchMode
        ? { search: searchQuery }
        : isSponsored
        ? { isSponsored: true }
        : isTrending
        ? { isTrending: true }
        : isUaeNews
        ? { isUaeNews: true }
        : targetCategoryId
        ? { categoryId: targetCategoryId }
        : categoryName !== 'Latest News'
        ? { search: categoryName }
        : {}),
    },
    { enabled: isArticlesEnabled }
  );

  const isLoading = isArticlesLoading || (!isSpecialCategory && isCategoriesLoading);

  // Fetch dedicated UAE News for the suggested section
  const { data: uaeResponse } = useArticles({
    isUaeNews: true,
    limit: 16,
  });

  const categoryDescription = isSearchMode
    ? `Showing search results for "${searchQuery}".`
    : matchedCategory?.description ||
      (categoryName === 'Featured Analysis'
        ? 'Explore in-depth business perspectives, expert insights, and featured analyses.'
        : categoryName === 'Trending News'
        ? 'Stay informed with the most popular and trending business stories right now.'
        : categoryName === 'UAE News'
        ? 'Comprehensive coverage of business, economy, and leadership across the United Arab Emirates.'
        : `Explore the latest news, insights, and expert analysis on ${categoryName}.`);

  // Extract live articles from API strictly for this category
  const rawApiArticles = apiResponse?.data || [];

  const displayArticles = rawApiArticles.map((item: any) => ({
    id: item.slug || item.id,
    title: item.title,
    category: item.category?.name || (isSearchMode ? 'News' : categoryName),
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
    if (isSearchMode) {
      return `/news?search=${encodeURIComponent(searchQuery)}&page=${pageNum}`;
    }
    if (isTrendingParam) {
      return `/news?isTrending=true&page=${pageNum}`;
    }
    if (isUaeNewsParam) {
      return `/news?isUaeNews=true&page=${pageNum}`;
    }
    if (isSponsoredParam) {
      return `/news?isSponsored=true&page=${pageNum}`;
    }
    return `/news?category=${encodeURIComponent(categoryName)}&page=${pageNum}`;
  };

  // Sidebar widget: Show UAE News if currently on Trending News page, otherwise show Trending News
  const isTrendingPage = isTrending;
  const sidebarTitle = isTrendingPage ? 'UAE News' : 'Trending News';

  // Fetch dedicated Trending News for sidebar (skip if on Trending News page)
  const { data: trendingSidebarResponse } = useArticles(
    {
      isTrending: true,
      limit: 7,
    },
    { enabled: !isTrendingPage }
  );

  const rawSidebarArticles = isTrendingPage
    ? (uaeResponse?.data || []).slice(0, 7)
    : (trendingSidebarResponse?.data || []);

  const sidebarArticles = rawSidebarArticles.map((item: any) => ({
    id: item.slug || item.id,
    title: item.title,
    category: item.category?.name || (isTrendingPage ? 'UAE News' : 'Trending News'),
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

  // Suggested UAE News articles from API response (excluding current category and already displayed articles)
  const suggestedArticles = (uaeResponse?.data || [])
    .filter((item: any) => {
      const itemCatName = item.category?.name?.toLowerCase().trim();
      const itemCatSlug = item.category?.slug?.toLowerCase().trim();
      const currentCat = categoryName?.toLowerCase().trim();
      
      // Exclude articles belonging to the currently viewed category (e.g. MENA)
      if (currentCat && (itemCatName === currentCat || itemCatSlug === currentCat)) {
        return false;
      }
      
      // Exclude articles already displayed in the main list or sidebar
      if (
        displayArticles.some((a: any) => a.id === item.id || a.id === item.slug) ||
        sidebarArticles.some((a: any) => a.id === item.id || a.id === item.slug)
      ) {
        return false;
      }
      
      return true;
    })
    .slice(0, 4)
    .map((item: any) => ({
      id: item.slug || item.id,
      title: item.title,
      category: item.category?.name || 'UAE News',
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



  return (
    <div className="w-full bg-white flex flex-col items-center">
      {/* Upper Content Section */}
      <SectionContainer className="bg-white pt-6 pb-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium mb-6 flex-wrap">
          <Link href="/" className="text-gray-500 hover:text-[#cd2027] transition-colors">
            Home
          </Link>
          <span className="text-[#cd2027] font-semibold">&gt;</span>
          {isSearchMode ? (
            <>
              <Link href="/news" className="text-gray-500 hover:text-[#cd2027] transition-colors">
                News
              </Link>
              <span className="text-[#cd2027] font-semibold">&gt;</span>
              <span className="text-[#cd2027] font-semibold">Search: &ldquo;{searchQuery}&rdquo;</span>
            </>
          ) : (
            <span className="text-[#cd2027] font-semibold">{categoryName}</span>
          )}
        </div>

        {/* Category / Search Header */}
        <div className="border-b border-gray-200 pb-5 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#cd2027] mb-2 tracking-tight font-newsreader">
              {isSearchMode ? (
                <>
                  Search Results for <span className="text-[#24214c]">&ldquo;{searchQuery}&rdquo;</span>
                </>
              ) : (
                categoryName
              )}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-4xl font-medium">
              {isSearchMode
                ? `Found ${apiResponse?.metadata?.total ?? rawApiArticles.length} article${(apiResponse?.metadata?.total ?? rawApiArticles.length) === 1 ? '' : 's'} matching your search.`
                : categoryDescription}
            </p>
          </div>
          {isSearchMode && (
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-[#24214c] hover:bg-gray-50 hover:text-[#FF0202] transition-colors shrink-0 shadow-sm self-start sm:self-auto"
            >
              Clear Search
            </Link>
          )}
        </div>

        {/* Main Grid: Grid Listing + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
          {/* Left Side: News Cards Grid & Pagination */}
          <div className="lg:col-span-8 flex flex-col gap-10 min-h-[75vh]">
            {paginatedArticles.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50/80 rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 mb-4 border border-gray-100">
                  <Search size={26} />
                </div>
                <h3 className="text-lg font-bold text-[#24214c] mb-1 font-newsreader">
                  {isSearchMode ? `No articles found for "${searchQuery}"` : 'No articles available'}
                </h3>
                <p className="text-sm text-gray-500 max-w-md mb-6 font-normal">
                  {isSearchMode
                    ? 'Try checking for spelling errors, using more general keywords, or browsing our primary news categories.'
                    : 'Please check back later for updates.'}
                </p>
                {isSearchMode && (
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#24214c] hover:bg-[#FF0202] text-white rounded-full text-xs font-bold transition-colors shadow-sm"
                  >
                    Browse All News
                  </Link>
                )}
              </div>
            ) : (
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
                      <h3 className="font-bold text-sm text-[#24214c] line-clamp-2 leading-snug group-hover:text-[#cd2027] transition-colors duration-200 font-newsreader">
                        {article.title}
                      </h3>
                      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                        {article.category} | {article.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="sticky bottom-6 mt-auto flex justify-center z-30 pointer-events-none">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200/50 rounded-full px-2 py-2 w-max pointer-events-auto transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]">
                  {/* Prev Button */}
                  {activePage > 1 ? (
                    <Link
                      href={getPageUrl(activePage - 1)}
                      className="group flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 hover:text-[#cd2027] transition-all shadow-sm border border-gray-100"
                    >
                      <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                      <span className="hidden sm:inline">Prev</span>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="flex items-center gap-1.5 px-4 py-2 bg-gray-50/50 text-gray-400 text-sm font-semibold rounded-full cursor-not-allowed border border-gray-100/50"
                    >
                      <ChevronLeft size={16} />
                      <span className="hidden sm:inline">Prev</span>
                    </button>
                  )}

                  {/* Page Indicator */}
                  <div className="flex items-center justify-center px-4 border-l border-r border-gray-200/50 h-8">
                    <span className="text-sm font-medium text-gray-500">
                      Page <span className="font-bold text-[#24214c]">{activePage}</span> <span className="mx-0.5">of</span> {totalPages}
                    </span>
                  </div>

                  {/* Next Button */}
                  {activePage < totalPages ? (
                    <Link
                      href={getPageUrl(activePage + 1)}
                      className="group flex items-center gap-1.5 px-4 py-2 bg-[#24214c] text-white text-sm font-semibold rounded-full hover:bg-[#cd2027] hover:shadow-md transition-all"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-400 text-sm font-semibold rounded-full cursor-not-allowed border border-gray-200"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Sidebar Widgets */}
          <aside className="lg:col-span-4 flex flex-col gap-8 w-full">
            {/* Sidebar News Section */}
            <div className="bg-[#24214c] rounded-2xl p-5 text-white flex flex-col gap-4 shadow-lg border border-white/5">
              <h2 className="text-[#cd2027] font-extrabold tracking-wider uppercase text-left text-lg border-b border-white/10 pb-3 font-newsreader">
                {sidebarTitle}
              </h2>
              <div className="flex flex-col gap-4">
                {sidebarArticles.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className={`flex gap-3 hover:opacity-90 transition-opacity pb-3 ${index !== sidebarArticles.length - 1 ? 'border-b border-white/10' : ''
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
                      <h4 className="text-[11px] text-white line-clamp-2 leading-snug font-semibold hover:text-[#cd2027] transition-colors font-newsreader">
                        {item.title}
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
                <Link
                  href="https://investfirst.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative"
                >
                  <Image
                    src="/ads/invest_500x500.png"
                    alt="InvestFirst - Investment & Finance Platform"
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </Link>
              }
            />
          </aside>
        </div>

        {/* McDonald's Banner Ad Container */}
        <div className='w-full pt-8 md:pt-10'>
          <FullWidthAdBanner targetPage="news_category" ratio="nc_bottom" imageUrl="/ads/ad-banner-1600x140.jpeg" linkUrl="https://investfirst.ae" />
        </div>
      </SectionContainer>

      {/* Suggested UAE News Section (Light grey background, breaks out of content spacing) */}
      {categoryName !== 'UAE News' && !isTrendingPage && suggestedArticles.length > 0 && (
        <div className="w-full bg-[#f9f9fb] pb-12 border-t border-gray-200/50 flex justify-center">
          <SectionContainer className="bg-transparent py-0">
            <h2 className="text-[#cd2027] font-extrabold text-2xl mb-8 tracking-tight font-newsreader">
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
                    <h3 className="font-bold text-sm text-[#24214c] line-clamp-2 leading-snug group-hover:text-[#cd2027] transition-colors duration-200 font-newsreader">
                      {article.title || 'How 5G Will Transform Communication and Connectivity'}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </SectionContainer>
        </div>
      )}
    </div>
  );
};

export default CategoryListing;
