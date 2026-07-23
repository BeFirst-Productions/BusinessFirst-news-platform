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
      <DynamicAd
        ratio="ad_1"
        className="w-full md:w-2/3 h-24 md:h-28 bg-gray-200"
        fallback={
          <Image
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&h=300&q=80"
            alt="Advertisement"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        }
      />
    </SectionContainer>
  );
};

export default MiddleSection;
