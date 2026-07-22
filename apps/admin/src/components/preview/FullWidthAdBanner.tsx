'use client';

import React from 'react';
import AdBanner from './AdBanner';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

interface FullWidthAdBannerProps {
  containerClassName?: string;
  adClassName?: string;
  imageUrl?: string;
  videoUrl?: string;
  type?: 'IMAGE' | 'VIDEO' | string;
  altText?: string;
  ratio?: string;
}

const FullWidthAdBanner: React.FC<FullWidthAdBannerProps> = ({
  containerClassName = "w-full",
  adClassName = "h-[120px] md:h-[200px] xl:h-[250px] shadow-sm",
  imageUrl,
  videoUrl,
  type,
  altText,
  ratio = "ad_1"
}) => {
  const { data: adsResponse } = useQuery({
    queryKey: ['preview-ads'],
    queryFn: async () => {
      const response = await apiClient.get('/ads?status=ACTIVE&limit=50');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const activeAds = adsResponse?.data || [];

  // Choose ad by ratio
  const ad = activeAds.find((a: any) => a.ratio === ratio);
  const finalType = type || ad?.type || (ad?.videoUrl ? 'VIDEO' : 'IMAGE');
  const finalImageUrl = imageUrl || ad?.imageUrl || (finalType === 'IMAGE' ? (ratio === 'nd_sidebar' ? "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&h=500&q=80" : "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&h=300&q=80") : undefined);
  const finalVideoUrl = videoUrl || ad?.videoUrl;
  const finalAltText = altText || ad?.name || (ratio === 'nd_sidebar' ? "Burger Sidebar Ad" : "Advertisement");

  return (
    <div className={containerClassName}>
      <AdBanner
        type={finalType}
        imageUrl={finalImageUrl}
        videoUrl={finalVideoUrl}
        altText={finalAltText}
        className={adClassName}
      />
    </div>
  );
};

export default FullWidthAdBanner;
