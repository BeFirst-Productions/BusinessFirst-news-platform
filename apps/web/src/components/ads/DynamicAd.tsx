'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePageAds, useAdImpression } from '@/hooks/use-ads';
import { AdBannerSkeleton } from './AdBannerSkeleton';

interface DynamicAdProps {
  ratio: string;
  targetPage?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function DynamicAd({
  ratio,
  targetPage = 'home',
  className = '',
  fallback,
}: DynamicAdProps) {
  const { data: ads, isLoading } = usePageAds(targetPage);
  const { trackImpression, trackClick } = useAdImpression();
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasTrackedImpression = useRef(false);

  // Find matching ad by ratio
  const ad = ads?.find((item) => item.ratio === ratio);

  // Native IntersectionObserver for impression tracking
  useEffect(() => {
    const element = containerRef.current;
    if (!element || !ad?.id) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      { threshold: 0.2 } // trigger when 20% of the ad is visible
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [ad?.id]);

  // Trigger impression tracking once per ad mount
  useEffect(() => {
    if (isIntersecting && ad?.id && !hasTrackedImpression.current) {
      trackImpression(ad.id, ratio);
      hasTrackedImpression.current = true;
    }
  }, [isIntersecting, ad?.id, ratio, trackImpression]);

  // Reset impression tracking ref if ad changes
  useEffect(() => {
    hasTrackedImpression.current = false;
  }, [ad?.id]);

  const handleClick = () => {
    if (ad?.id) {
      trackClick(ad.id, ratio);
    }
  };

  if (isLoading) {
    if (fallback) {
      return (
        <div className={`relative overflow-hidden group cursor-pointer ${className}`}>
          {fallback}
        </div>
      );
    }
    return <AdBannerSkeleton />;
  }

  if (!ad) {
    if (fallback) {
      return (
        <div className={`relative overflow-hidden group cursor-pointer ${className}`}>
          {fallback}
        </div>
      );
    }
    return null;
  }

  const isVideo = ad.type === 'VIDEO' || (!ad.imageUrl && ad.videoUrl);

  const adContent = (
    <div className="relative w-full h-full">
      {isVideo && ad.videoUrl ? (
        <video
          src={ad.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : ad.imageUrl ? (
        <Image
          src={ad.imageUrl}
          alt={ad.name || 'Advertisement'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={ratio === 'ad_1'} // Prioritize above-the-fold header ad
        />
      ) : null}
      

    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
    >
      {ad.redirectUrl ? (
        <Link
          href={ad.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block w-full h-full"
        >
          {adContent}
        </Link>
      ) : (
        <div onClick={handleClick} className="w-full h-full">
          {adContent}
        </div>
      )}
    </div>
  );
}

export default DynamicAd;
