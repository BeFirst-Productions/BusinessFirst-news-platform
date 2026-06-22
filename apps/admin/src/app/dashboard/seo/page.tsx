'use client';

import { SeoManager } from '@/components/seo/SeoManager';

/**
 * /dashboard/seo
 *
 * Renders the SEO management panel.
 * All logic lives in SeoManager so the page file stays clean.
 */
export default function SeoPage() {
  return <SeoManager />;
}
