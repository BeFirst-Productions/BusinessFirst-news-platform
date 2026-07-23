import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import SectionContainer from './SectionContainer';
import FullWidthAdBanner from '@/components/preview/FullWidthAdBanner';

const MiddleSection = () => {
  return (
    <SectionContainer
      as="div"
      className="bg-white"
      containerClassName="py-6 flex flex-col md:flex-row justify-between items-center"
    >
      {/* Logo area */}
      <Link href="/" className="flex flex-col mb-4 md:mb-0 cursor-pointer">
        <Image
          src="/logo/logo.svg"
          alt="Business First Logo"
          width={200}
          height={60}
          priority
          className="object-contain"
        />
      </Link>

      {/* Banner ad area */}
      <FullWidthAdBanner 
        ratio="ad_1"
        containerClassName="w-full md:w-2/3 group cursor-pointer"
        adClassName="h-24 md:h-28 w-full group-hover:scale-105 transition-transform duration-500"
      />
    </SectionContainer>
  );
};

export default MiddleSection;
