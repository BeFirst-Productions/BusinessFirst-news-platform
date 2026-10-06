import { permanentRedirect } from 'next/navigation';
import { getCategoryUrl } from '@/lib/category-utils';

interface PageProps {
  params: Promise<{ category: string }> | { category: string };
}

export default async function CategoryRedirectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawCategory = resolvedParams.category || '';
  const targetUrl = getCategoryUrl(decodeURIComponent(rawCategory));
  permanentRedirect(targetUrl);
}
