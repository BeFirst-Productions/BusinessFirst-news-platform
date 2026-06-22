import React from 'react';
import AdBanner from './AdBanner';

interface FullWidthAdBannerProps {
  containerClassName?: string;
  adClassName?: string;
  imageUrl?: string;
  altText?: string;
}

const FullWidthAdBanner: React.FC<FullWidthAdBannerProps> = ({ 
  containerClassName = "w-full", 
  adClassName = "h-[120px] md:h-[200px] xl:h-[250px] shadow-sm",
  imageUrl = "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&h=300&q=80",
  altText = "Free Home Delivery Ad"
}) => {
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
