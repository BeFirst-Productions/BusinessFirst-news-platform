import React from 'react';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import AdvertiseContainer from '@/components/advertise/AdvertiseContainer';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps('advertise');
  return buildMetadata({
    ...seoProps,
    title:
      seoProps.title === 'BusinessFirst News'
        ? 'Advertise With Us | Business First UAE'
        : seoProps.title,
    description:
      seoProps.description === 'Latest business news, analysis and insights.'
        ? 'Put Your Business Where Business Is. Business First connects brands, founders, and organisations with a business-focused audience across the UAE.'
        : seoProps.description,
  });
}

export default function AdvertisePage() {
  return <AdvertiseContainer />;
}
