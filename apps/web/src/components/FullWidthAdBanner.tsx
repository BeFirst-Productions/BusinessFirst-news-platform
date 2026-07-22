import React from 'react';
import AdBanner from './AdBanner';
import { DynamicAd } from './ads/DynamicAd';
import Image from 'next/image';

interface FullWidthAdBannerProps {
  containerClassName?: string;
  adClassName?: string;
  imageUrl?: string;
  altText?: string;
  ratio?: string;
  targetPage?: string;
}

const FullWidthAdBanner: React.FC<FullWidthAdBannerProps> = ({ 
  containerClassName = "w-full", 
  adClassName = "h-[120px] md:h-[200px] xl:h-[250px] shadow-sm",
  imageUrl = "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&h=300&q=80",
  altText = "Free Home Delivery Ad",
  ratio,
  targetPage = "home"
}) => {
  if (ratio) {
    return (
      <div className={containerClassName}>
        <DynamicAd 
          ratio={ratio}
          targetPage={targetPage}
          className={adClassName}
          fallback={
            <div className={`relative overflow-hidden w-full h-full`}>
              <Image 
                src={imageUrl} 
                alt={altText} 
                fill 
                className="object-cover object-center"
              />
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <AdBanner 
        imageUrl={imageUrl} 
        altText={altText} 
        className={adClassName}
      />
    </div>
  );
};

export default FullWidthAdBanner;
