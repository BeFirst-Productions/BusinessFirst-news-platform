import React from 'react';
import { getPageSeoProps } from '@/web/lib/fetchPageSeo';
import { buildMetadata } from '@/web/components/seo/seo.types';
import SectionContainer from "@/web/components/SectionContainer";
import ContactBreadcrumbs from "@/web/components/contact/ContactBreadcrumbs";
import ContactNewsroom from "@/web/components/contact/ContactNewsroom";
import ContactSocials from "@/web/components/contact/ContactSocials";
import ContactForm from "@/web/components/contact/ContactForm";
import ContactMap from "@/web/components/contact/ContactMap";
import FullWidthAdBanner from '@/web/components/FullWidthAdBanner';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps('contact');
  return buildMetadata(seoProps);
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      {/* Breadcrumbs */}
      <ContactBreadcrumbs />

      {/* Main Section */}
      <SectionContainer className="bg-white ">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center w-full">
          {/* Left Column: Heading and Text */}
          <ContactNewsroom />
          
          {/* Right Column: Social Media Card */}
          <ContactSocials />
        </div>

        {/* Lower Row: Form & Map */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch w-full mt-16">
          {/* Contact Form */}
          <ContactForm />
          
          {/* Map Section */}
          <ContactMap />

        </div>
        <div className='w-full py-8 md:py-12'>
          <FullWidthAdBanner />
        </div>
      </SectionContainer>
    </main>
  );
}
