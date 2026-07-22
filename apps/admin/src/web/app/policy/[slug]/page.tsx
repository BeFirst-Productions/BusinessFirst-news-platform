import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/web/lib/fetchPageSeo';
import { buildMetadata } from '@/web/components/seo/seo.types';
import SectionContainer from '@/web/components/SectionContainer';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const seoProps = await getPageSeoProps(`policy/${params.slug}`);
  return buildMetadata(seoProps);
}

// Simple map for static content display titles and description paragraphs
const POLICY_CONTENT: Record<string, { title: string; subtitle: string; content: string[] }> = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Learn how we collect, protect, and process your personal information.',
    content: [
      'At BusinessFirst, accessible from our main portal, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by BusinessFirst and how we use it.',
      'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.',
      'We collect personal data such as name, email address, and connection details only when you subscribe to our newsletter, interact with our services, or leave comments. This data is handled in strict compliance with global privacy regulations including GDPR and CCPA.',
      'We use cookies and similar technologies to enhance user experience, run site analytics, and personalize advertising content. You can manage your preferences through your browser settings.'
    ]
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Our terms, conditions, and regulations governing the use of the platform.',
    content: [
      'Welcome to BusinessFirst! These terms and conditions outline the rules and regulations for the use of BusinessFirst\'s Website.',
      'By accessing this website we assume you accept these terms and conditions. Do not continue to use BusinessFirst if you do not agree to take all of the terms and conditions stated on this page.',
      'The following terminology applies to these Terms and Conditions: "Client", "You" and "Your" refers to you, the person log on this website. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company.',
      'All intellectual property rights are reserved. You may access this from BusinessFirst for your own personal use subjected to restrictions set in these terms and conditions.'
    ]
  },
  cookie: {
    title: 'Cookie Policy',
    subtitle: 'Understand how and why we utilize cookies on our news platform.',
    content: [
      'This is the Cookie Policy for BusinessFirst, accessible from our platform.',
      'As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.',
      'We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.',
      'You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.'
    ]
  }
};

export default function PolicyPage({ params }: Props) {
  const policyKey = params.slug.toLowerCase();
  const policy = POLICY_CONTENT[policyKey] || {
    title: 'Policy Document',
    subtitle: 'Legal guidelines and corporate agreements.',
    content: ['The requested policy document is currently being updated by the BusinessFirst legal team. Please check back later.']
  };

  return (
    <main className="min-h-screen bg-[#f9f9fb] flex flex-col items-center w-full py-12">
      <SectionContainer className="bg-transparent py-0 max-w-4xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium mb-8">
          <Link href="/" className="text-gray-500 hover:text-[#cd2027] transition-colors">
            Home
          </Link>
          <span className="text-[#cd2027] font-semibold">&gt;</span>
          <span className="text-[#cd2027] font-semibold">{policy.title}</span>
        </div>

        {/* Policy Document Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-8 md:p-12 shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#24214c] mb-3 tracking-tight">
              {policy.title}
            </h1>
            <p className="text-gray-500 text-sm md:text-base font-medium">
              {policy.subtitle}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed font-normal">
            {policy.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 p-5 bg-[#f9f9fb] rounded-xl border border-gray-150 flex gap-4 items-start">
            <div className="w-8 h-8 rounded-lg bg-[#24214c]/5 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#24214c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-[#24214c] mb-1">Important Notice</h4>
              <p className="text-[11px] md:text-xs text-gray-500 font-medium">
                This document is updated regularly to ensure conformity with local and global legal requirements. By continuing to navigate our platform, you acknowledge and agree to our guidelines.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
