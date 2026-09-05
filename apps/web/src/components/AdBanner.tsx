import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AdBannerProps {
  imageUrl: string;
  altText: string;
  className?: string;
  linkUrl?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ imageUrl, altText, className = '', linkUrl }) => {
  const content = (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <Image 
        src={imageUrl} 
        alt={altText} 
        fill 
        className="object-cover object-center"
      />
    </div>
  );

  if (linkUrl) {
    return (
      <Link href={linkUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        {content}
      </Link>
    );
  }

  return content;
};

export default AdBanner;
