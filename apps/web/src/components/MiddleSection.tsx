import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import SectionContainer from './SectionContainer';
import { DynamicAd } from './ads/DynamicAd';

const MiddleSection = () => {
  return (
    <SectionContainer
      as="div"
      className="bg-white"
      containerClassName="py-6 flex flex-col md:flex-row justify-between items-center"
    >
      {/* Logo area */}
      <Link href="/" className="hidden md:flex flex-col mb-4 md:mb-0 cursor-pointer">
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
      <DynamicAd
        ratio="ad_1"
        className="w-full md:w-2/3 h-24 md:h-28 bg-gray-200"
        objectFit="fill"
        fallback={
          <Link href="https://nextmedia.ae" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
            <Image
              src="/ads/next 1600x224.png"
              alt="Advertisement"
              fill
              className="object-fill group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        }
      />
    </SectionContainer>
  );
};

export default MiddleSection;
