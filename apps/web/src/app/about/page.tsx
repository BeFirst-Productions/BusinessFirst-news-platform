import React from 'react';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import AboutContainer from '@/components/about/AboutContainer';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps('about');
  return buildMetadata(seoProps);
}

export default function AboutPage() {
  return <AboutContainer />;
}
