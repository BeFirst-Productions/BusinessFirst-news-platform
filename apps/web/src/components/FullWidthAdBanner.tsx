import React from 'react';
import AdBanner from './AdBanner';
import { DynamicAd } from './ads/DynamicAd';
import Image from 'next/image';
import Link from 'next/link';

interface FullWidthAdBannerProps {
  containerClassName?: string;
  adClassName?: string;
  imageUrl?: string;
  altText?: string;
  ratio?: string;
  targetPage?: string;
  linkUrl?: string;
}

const FullWidthAdBanner: React.FC<FullWidthAdBannerProps> = ({ 
  containerClassName = "w-full", 
  adClassName = "h-[120px] md:h-[200px] xl:h-[250px] shadow-sm",
  imageUrl = "/ads/next 1600x300.png",
  altText = "Free Home Delivery Ad",
  ratio,
  targetPage = "home",
  linkUrl
}) => {
  if (ratio) {
    const fallbackContent = (
      <div className={`relative overflow-hidden w-full h-full`}>
        <Image 
          src={imageUrl} 
          alt={altText} 
          fill 
          className="object-fill object-center"
        />
      </div>
    );

    return (
      <div className={containerClassName}>
        <DynamicAd 
          ratio={ratio}
          targetPage={targetPage}
          className={adClassName}
          objectFit="fill"
          fallback={
            linkUrl ? (
              <Link href={linkUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                {fallbackContent}
              </Link>
            ) : fallbackContent
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
        linkUrl={linkUrl}
      />
    </div>
  );
};

export default FullWidthAdBanner;
