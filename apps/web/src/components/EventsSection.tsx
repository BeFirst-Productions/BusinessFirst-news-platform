'use client';

import React, { useState, useEffect } from 'react';
import SectionContainer from './SectionContainer';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import FullWidthAdBanner from './FullWidthAdBanner';
import { useHomeCategories } from '@/hooks/use-articles';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

const EmptyCategoryState = ({ categoryName }: { categoryName: string }) => (
  <div className="w-full py-12 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-lg text-center my-4">
    <p className="text-gray-400 text-sm font-semibold">No articles available in {categoryName}</p>
  </div>
);

const EventsSection = () => {
  const { data: homeCategories } = useHomeCategories();

  const { data: activeEvents } = useQuery({
    queryKey: ['website', 'events', 'active'],
    queryFn: async () => {
      try {
        const res = await apiClient.get<any[]>('/events/active');
        return Array.isArray(res) ? res : res ? [res] : [];
      } catch (e) {
        const res = await apiClient.get<any[]>('/website/events/active');
        return Array.isArray(res) ? res : res ? [res] : [];
      }
    }
  });

  const eventsList = activeEvents && activeEvents.length > 0 ? activeEvents : null;
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    if (!eventsList || eventsList.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % eventsList.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [eventsList]);

  const eventsData = homeCategories?.['events'];
  const eventsArticles = eventsData?.articles || [];

  const mainArticle = eventsArticles[0];
  const stackedArticles = eventsArticles.slice(1, 3);
  const bottomArticles = eventsArticles.slice(3, 6);

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      : 'Recent';

  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Events */}
        <div className="w-full lg:w-[65%] flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202]">
              {eventsData?.categoryName || 'Events'}
            </h2>
            <Link
              href={`/news?category=${encodeURIComponent(
                eventsData?.categoryName || 'Events'
              )}`}
              className="text-[#24214c] font-bold text-sm flex items-center hover:text-[#FF0202] transition-colors"
            >
              View All <ChevronDown size={18} className="ml-1" strokeWidth={3} />
            </Link>
          </div>

          {eventsArticles.length === 0 ? (
            <EmptyCategoryState categoryName={eventsData?.categoryName || 'Events'} />
          ) : (
            <>
              {/* Top Section: Large Article + Stacked Articles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                {/* Large Article */}
                {mainArticle && (
                  <div className="md:col-span-2 group cursor-pointer flex flex-col gap-3">
                    <Link href={`/news/${mainArticle.slug || mainArticle.id}`} className="flex flex-col gap-3">
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200 rounded">
                        <Image
                          src={mainArticle.featuredImage || '/placeholder-news.jpg'}
                          alt={mainArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-lg md:text-[22px] font-bold text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-snug line-clamp-2">
                        {mainArticle.title}
                      </h3>
                      <div className="text-[11px] md:text-xs text-gray-500 font-medium">
                        {mainArticle.category?.name || 'Events'} | {formatDate(mainArticle.publishedAt)}
                      </div>
                    </Link>
                  </div>
                )}

                {/* Stacked Articles */}
                {stackedArticles.length > 0 && (
                  <div className="md:col-span-1 flex flex-col gap-6">
                    {stackedArticles.map((item) => (
                      <Link key={item.id} href={`/news/${item.slug || item.id}`} className="group cursor-pointer flex flex-col gap-2">
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200 rounded">
                          <Image
                            src={item.featuredImage || '/placeholder-news.jpg'}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="font-bold text-[15px] md:text-base text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-tight line-clamp-2">
                          {item.title}
                        </h4>
                        <div className="text-[10px] md:text-[11px] text-gray-500 font-medium">
                          {item.category?.name || 'Events'} | {formatDate(item.publishedAt)}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Grid Cards */}
              {bottomArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
                  {bottomArticles.map((item) => (
                    <Link key={item.id} href={`/news/${item.slug || item.id}`} className="group cursor-pointer flex flex-col gap-2">
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200 rounded">
                        <Image
                          src={item.featuredImage || '/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-bold text-[15px] text-[#24214c] group-hover:text-[#FF0202] transition-colors leading-tight line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="text-[10px] text-gray-500 font-medium">
                        {item.category?.name || 'Events'} | {formatDate(item.publishedAt)}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Events Coverage Banner */}
        <div className="w-full lg:w-[35%] flex flex-col gap-6">
          <div className="flex justify-between items-end border-b-[1.5px] border-gray-300 pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202]">
              Events Coverage
            </h2>
          </div>

          {eventsList ? (
            <div className="relative w-full flex-1 min-h-[400px] rounded block overflow-hidden group">
              {eventsList.map((event: any, index: number) => (
                <Link
                  key={event.id || index}
                  href={event.linkUrl || "/news?category=Events"}
                  className={`absolute inset-0 cursor-pointer transition-opacity duration-1000 ${
                    index === currentEventIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                    {event.badge && (
                      <span className="text-[#FF0202] font-bold text-xs uppercase tracking-wider mb-2">
                        {event.badge}
                      </span>
                    )}
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-snug mb-4">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-white text-sm font-semibold group-hover:text-[#FF0202] transition-colors">
                      {event.linkText || "Explore Events"} <ArrowUpRight className="ml-1" size={18} />
                    </div>
                  </div>
                </Link>
              ))}

              {/* Slider dots for multiple events */}
              {eventsList.length > 1 && (
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                  {eventsList.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.preventDefault(); setCurrentEventIndex(idx); }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentEventIndex ? 'bg-[#FF0202] w-6' : 'bg-white/50 hover:bg-white w-2'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full flex-1 min-h-[400px] bg-gray-100 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center p-6 text-center">
              <span className="text-gray-400 font-medium">No event coverage available.</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 w-full">
        <FullWidthAdBanner ratio="ad_8" imageUrl="/ads/investtt 1600x300.png" linkUrl="https://investfirst.ae" />
      </div>
    </SectionContainer>
  );
};

export default EventsSection;
