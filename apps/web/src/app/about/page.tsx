import React from 'react';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import AboutContainer from '@/components/about/AboutContainer';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps('about');
  return buildMetadata({
    ...seoProps,
    title:
      seoProps.title === 'BusinessFirst News'
        ? 'About Us | Business First UAE'
        : seoProps.title,
    description:
      seoProps.description === 'Latest business news, analysis and insights.'
        ? 'Business news should do more than report events. It should help people understand what is changing, why it matters and where the next opportunities may emerge.'
        : seoProps.description,
  });
}

export default function AboutPage() {
  return <AboutContainer />;
}
