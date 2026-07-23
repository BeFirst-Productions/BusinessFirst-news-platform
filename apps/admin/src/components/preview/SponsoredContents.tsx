'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from './SectionContainer';
import { ChevronRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useArticles } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/Skeleton';

const dummySponsoredArticles = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, sectur consectetur',
    date: '16 mins / Sep 22, 2025',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
    slug: '#',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet, sectur consectetur',
    date: '16 mins / Sep 22, 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    slug: '#',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet, sectur consectetur',
    date: '16 mins / Sep 22, 2025',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    slug: '#',
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet, sectur consectetur',
    date: '16 mins / Sep 22, 2025',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
    slug: '#',
  },
];

const SponsoredContents = () => {
  // Query Sponsored Articles
  const { data: articlesRes, isLoading } = useArticles({
    isSponsored: true,
    limit: 4,
  });

  const rawArticles = articlesRes?.data || [];

  const articles = rawArticles.length > 0
    ? rawArticles.map((h) => ({
      id: h.id,
      title: h.title,
      date: h.publishedAt
        ? `${h.readingTime || 5} mins / ${new Date(h.publishedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}`
        : '',
      image: h.featuredImage || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
      slug: `/news/${h.slug}`,
    }))
    : dummySponsoredArticles;

  if (isLoading) {
    return (
      <SectionContainer
        as="section"
        className="bg-black py-8 md:py-12 border-t-[8px] border-black"
        containerClassName="flex flex-col"
      >
        <SectionTitle title="Sponsored Contents" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#24214c] rounded-xl overflow-hidden flex flex-col h-72">
              <Skeleton className="h-48 w-full bg-gray-700" />
              <div className="p-5 flex-grow space-y-2 bg-[#24214c]">
                <Skeleton className="h-4 w-full bg-gray-600" />
                <Skeleton className="h-4 w-3/4 bg-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      as="section"
      className="bg-black py-8 md:py-12 border-t-[8px] border-black"
      containerClassName="flex flex-col"
    >
      {/* Title Section */}
      <SectionTitle title="Sponsored Contents" />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Link
            href={article.slug}
            key={article.id}
            className="bg-[#24214c] rounded-xl overflow-hidden flex flex-col hover:transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer shadow-lg group"
          >
            <div className="relative h-48 sm:h-52 w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow justify-between">
              <h3 className="text-white font-medium text-sm md:text-base leading-snug mb-3 line-clamp-2 group-hover:text-[#e2b036] transition-colors">
                {article.title}
              </h3>
              <p className="text-[#e2b036] text-xs font-semibold">
                {article.date}
              </p>
            </div>
          </Link>
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
