import React from 'react';
import { getPageSeoProps } from '@/lib/fetchPageSeo';

interface ServerSeoProps {
  slug: string;
}

export default async function ServerSeo({ slug }: ServerSeoProps) {
  const seoProps = await getPageSeoProps(slug);
  
  if (!seoProps.structuredData) {
    return null;
  }

  // Ensure structuredData is stringified safely
  const jsonLdString = typeof seoProps.structuredData === 'string' 
    ? seoProps.structuredData 
    : JSON.stringify(seoProps.structuredData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}
