import React from 'react';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import AdvertiseContainer from '@/components/advertise/AdvertiseContainer';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps('advertise');
  return buildMetadata(seoProps);
}

export default function AdvertisePage() {
  return <AdvertiseContainer />;
}
