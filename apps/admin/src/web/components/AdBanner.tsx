import React from 'react';
import Image from 'next/image';

interface AdBannerProps {
  imageUrl?: string | null;
  videoUrl?: string | null;
  type?: 'IMAGE' | 'VIDEO' | string;
  altText: string;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ imageUrl, videoUrl, type, altText, className = '' }) => {
  const isVideo = type === 'VIDEO' || (!imageUrl && videoUrl);

  return (
    <div className={`relative overflow-hidden w-full h-full flex items-center justify-center bg-gray-100 ${className}`}>
      {isVideo && videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full absolute inset-0"
        />
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover object-center"
        />
      ) : null}
    </div>
  );
};

export default AdBanner;
