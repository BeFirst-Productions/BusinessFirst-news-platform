import React from 'react';
import SectionContainer from './SectionContainer';
import Image from 'next/image';
import AutoScroller from './AutoScroller';
import apiClient from '@/lib/api-client';

import SocialImage from './SocialImage';

interface InstagramCard {
  id: string | number;
  image: string;
  title: string;
  description: string;
  dateText: string;
  permalink: string;
}

async function fetchInstagramCards(): Promise<InstagramCard[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

  // 1. If Instagram Access Token is configured, fetch directly from Instagram Graph API
  if (token) {
    try {
      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=12&access_token=${token}`;
      const res = await fetch(url, {
        next: { revalidate: 1800 }, // Revalidate every 30 minutes
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          return data.data.map((item: any, i: number) => {
            const dateStr = item.timestamp
              ? new Date(item.timestamp).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Latest News';

            const firstLine = item.caption
              ? item.caption.split('\n')[0].replace(/^[#@\s]+/, '').trim()
              : `Business First Instagram Post ${i + 1}`;

            const imageUrl =
              item.media_type === 'VIDEO'
                ? item.thumbnail_url || item.media_url
                : item.media_url;

            return {
              id: item.id || `insta-${i + 1}`,
              image: imageUrl || `/Instagram/insta-${(i % 10) + 1}.jpg`,
              title: firstLine || `Business First Instagram Post ${i + 1}`,
              description: item.caption || '',
              dateText: `${dateStr} | Instagram`,
              permalink: item.permalink || 'https://www.instagram.com/businessfirstuae',
            };
          });
        }
      } else {
        const errorText = await res.text();
        console.error('Instagram Graph API error:', res.status, errorText);
      }
    } catch (error) {
      console.error('Failed to fetch from Instagram Graph API directly:', error);
    }
  }

  // 2. Fallback to backend API if available
  try {
    const res = await apiClient.get<InstagramCard[]>('/instagram-posts', {
      next: { revalidate: 3600 },
    });
    if (res && Array.isArray(res) && res.length > 0) {
      return res;
    }
  } catch {
    // Backend endpoint might not be active, fall through to default cards
  }

  // 3. Fallback placeholder cards
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    image: `/Instagram/insta-${i + 1}.jpg`,
    title: `Business First Instagram Post ${i + 1}`,
    description: 'Catch the latest updates and exclusive insights from Business First on our official Instagram page.',
    dateText: 'Latest News | Business First',
    permalink: 'https://www.instagram.com/businessfirstuae',
  }));
}

const SocialMediaSection = async () => {
  const cards = await fetchInstagramCards();

  return (
    <SectionContainer className="bg-white py-6 md:py-8">
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center w-full border-b-[1.5px] border-gray-300 pb-2">
          <h2 className="text-2xl md:text-[28px] font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202] font-newsreader">
            Social Media
          </h2>
        </div>

        {/* Cards Slider */}
        <div className="w-full mt-4 relative">
          <AutoScroller speed={0.5}>
            {[...cards, ...cards].map((card, index) => (
              <a 
                href={card.permalink}
                target="_blank"
                rel="noopener noreferrer"
                key={`${index}-${card.id}`} 
                draggable={false}
                className="w-[280px] md:w-[320px] lg:w-[350px] shrink-0 flex flex-col rounded-[20px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.15)] group cursor-pointer bg-black h-auto"
              >

                {/* Gradient Top Part */}
                <div className="bg-gradient-to-b from-[#0a1b4d] to-[#020514] flex flex-col flex-1 p-3 pb-3">

                  {/* Image and Banner Wrapper */}
                  <div className="flex flex-col w-full rounded-t-xl rounded-b-md overflow-hidden">
                    {/* Image Container */}
                    <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                      <SocialImage
                        src={card.image || `/Instagram/insta-${(index % 10) + 1}.jpg`}
                        alt={card.title || 'Instagram Post'}
                        fallbackSrc={`/Instagram/insta-${(index % 10) + 1}.jpg`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Top Left Tag */}
                      <div className="absolute top-0 left-0 bg-[#FF0202] text-white text-[9px] font-bold px-2.5 py-1 z-10">
                        NEWS
                      </div>

                      {/* Top Right Tag */}
                      <div className="absolute top-0 right-0 bg-[#000a2d]/90 backdrop-blur-sm px-2 py-1 flex flex-col items-center z-10">
                        <span className="text-white text-[8px] font-bold leading-none tracking-wide">BUSINESS</span>
                        <span className="text-[#FF0202] text-[8px] font-bold leading-none mt-0.5 tracking-wide">FIRST</span>
                      </div>
                    </div>

                    {/* Red Date Banner */}
                    <div className="w-full bg-[#FF0202] py-1.5 px-2 text-center flex items-center justify-center min-h-[24px]">
                      <span className="text-white text-[7.5px] uppercase font-bold tracking-[0.05em] leading-tight line-clamp-1">
                        {card.dateText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Black Area */}
                <div className="bg-black p-4 text-[#a3a3a3] text-[12px] md:text-[13px] leading-snug border-t border-gray-800/50">
                  Click to view full post on Instagram
                </div>
              </a>
            ))}
          </AutoScroller>
        </div>

      </div>
    </SectionContainer>
  );
};

export default SocialMediaSection;
