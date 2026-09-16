import React from 'react';
import SectionContainer from "@/components/SectionContainer";
import AboutBreadcrumbs from "./AboutBreadcrumbs";
import AboutEditorial from "./AboutEditorial";
import AboutSidebar from "./AboutSidebar";
import FullWidthAdBanner from '@/components/FullWidthAdBanner';

const AboutContainer = () => {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      {/* Breadcrumbs matching Contact Breadcrumbs */}
      <AboutBreadcrumbs />

      {/* Main Section matching Contact page structure */}
      <SectionContainer className="bg-white" overflowVisible={true}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">
          {/* Left Column: Heading and Editorial Text */}
          <AboutEditorial />

          {/* Right Column: Platform Overview & Socials */}
          <AboutSidebar />
        </div>

        {/* Ad Banner matching website standards */}
        <div className="w-full py-8 md:py-12">
          <FullWidthAdBanner
            ratio="about_bottom"
            targetPage="about"
            imageUrl="/ads/invest-first_1600x140.jpeg"
          />
        </div>
      </SectionContainer>
    </main>
  );
};

export default AboutContainer;
