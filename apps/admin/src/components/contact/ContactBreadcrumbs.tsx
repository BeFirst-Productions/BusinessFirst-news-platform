import React from 'react';
import Link from 'next/link';
import SectionContainer from '../preview/SectionContainer';

const ContactBreadcrumbs = () => {
  return (
    <SectionContainer className="bg-white py-4 mt-4">
      <div className="flex items-center text-xs md:text-sm font-semibold tracking-wide text-[#24214c]">
        <Link href="/" className="hover:text-[#FF0202] transition-colors">Home</Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-[#FF0202]">Contact Us</span>
      </div>
    </SectionContainer>
  );
};

export default ContactBreadcrumbs;
