import React from 'react';
import Link from 'next/link';

interface NewsBreadcrumbsProps {
  category?: string;
}

const NewsBreadcrumbs: React.FC<NewsBreadcrumbsProps> = ({ category = 'UAE News' }) => {
  return (
    <div className="flex items-center gap-2 text-xs md:text-sm font-medium mb-6">
      <Link href="/" className="text-gray-500 hover:text-[#FF0202] transition-colors">
        Home
      </Link>
      <span className="text-[#FF0202] font-semibold">&gt;</span>
      <span className="text-[#FF0202] font-semibold">{category}</span>
    </div>
  );
};

export default NewsBreadcrumbs;
