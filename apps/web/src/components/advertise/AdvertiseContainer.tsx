"use client";

import React, { useState } from 'react';
import SectionContainer from "@/components/SectionContainer";
import AdvertiseBreadcrumbs from "./AdvertiseBreadcrumbs";
import AdvertiseEditorial from "./AdvertiseEditorial";
import AdvertiseSidebar from "./AdvertiseSidebar";
import { MediaKitModal } from "./MediaKitModal";
import FullWidthAdBanner from '@/components/FullWidthAdBanner';

const AdvertiseContainer = () => {
  const [isMediaKitOpen, setIsMediaKitOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      {/* Breadcrumbs matching site style */}
      <AdvertiseBreadcrumbs />

      {/* Main 2-Column Section with Sticky Sidebar */}
      <SectionContainer className="bg-white" overflowVisible={true}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">
          {/* Left Column: Heading, Pitch, Full Editorial Narrative & Proposal Form */}
          <AdvertiseEditorial />

          {/* Right Column: Sticky Commercial Contacts & Media Kit Sidebar */}
          <AdvertiseSidebar onOpenMediaKit={() => setIsMediaKitOpen(true)} />
        </div>

        {/* Ad Banner matching website standards */}
        <div className="w-full py-8 md:py-12">
          <FullWidthAdBanner
            ratio="advertise_bottom"
            targetPage="advertise"
            imageUrl="/ads/invest-first_1600x140.jpeg"
          />
        </div>
      </SectionContainer>

      {/* Media Kit Download Modal */}
      <MediaKitModal
        isOpen={isMediaKitOpen}
        onClose={() => setIsMediaKitOpen(false)}
      />
    </main>
  );
};

export default AdvertiseContainer;
