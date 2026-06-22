import React from 'react';
import Image from 'next/image';

interface AdBannerProps {
  imageUrl: string;
  altText: string;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ imageUrl, altText, className = '' }) => {
  return (
    <div className={`relative overflow-hidden w-full ${className}`}>
      <Image 
        src={imageUrl} 
        alt={altText} 
        fill 
        className="object-cover object-center"
      />
    </div>
  );
};

export default AdBanner;
