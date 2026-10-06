import React from 'react';
import Link from 'next/link';
import { getCategorySlug } from '@/lib/category-utils';

interface NewsBreadcrumbsProps {
  category?: string;
  categorySlug?: string;
}

const NewsBreadcrumbs: React.FC<NewsBreadcrumbsProps> = ({ category = 'UAE News', categorySlug }) => {
  const catSlug = categorySlug || getCategorySlug(category);
  const categoryHref = catSlug && catSlug !== 'news' ? `/${catSlug}` : '/news';

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm font-medium mb-6 flex-wrap">
      <Link href="/" className="text-gray-500 hover:text-[#FF0202] transition-colors">
        Home
      </Link>
      <span className="text-[#FF0202] font-semibold">&gt;</span>
      <Link href={categoryHref} className="text-[#FF0202] font-semibold hover:underline transition-colors">
        {category}
      </Link>
    </nav>
  );
};

export default NewsBreadcrumbs;
