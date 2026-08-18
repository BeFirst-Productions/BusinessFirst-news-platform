import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const seoProps = await getPageSeoProps(`policy/${params.slug}`);
  return buildMetadata(seoProps);
}

// Realistic static content for policies with JSX formatting
const POLICY_CONTENT: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Learn how we collect, protect, and process your personal information.',
    content: (
      <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed font-normal">
        <p><strong>Last Updated: August 2026</strong></p>

        <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">1. Introduction</h2>
        <p>Welcome to BusinessFirst. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>

        <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">2. The Data We Collect About You</h2>
        <p>We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identity Data:</strong> includes first name, last name, username, or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
          <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and our third parties.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">3. How We Use Your Personal Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and maintain our news platform and services.</li>
          <li>To notify you about changes to our services.</li>
          <li>To allow you to participate in interactive features of our service (e.g., commenting on articles).</li>
          <li>To provide customer support and respond to inquiries.</li>
          <li>To gather analysis or valuable information so that we can improve our services.</li>
          <li>To monitor the usage of our platform and detect technical issues.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">4. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>

        <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">5. Your Legal Rights</h2>
        <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, and to withdraw consent (where applicable, such as GDPR and CCPA frameworks).</p>

        <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">6. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or our privacy practices, please contact our Data Protection Officer at privacy@businessfirst.com.</p>
      </div>
    )
  },


};

export default function PolicyPage({ params }: Props) {
  const policyKey = params.slug.toLowerCase();
  const policy = POLICY_CONTENT[policyKey] || {
    title: 'Policy Document',
    subtitle: 'Legal guidelines and corporate agreements.',
    content: (
      <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed font-normal">
        <p>The requested policy document is currently being updated by the BusinessFirst legal team. Please check back later.</p>
      </div>
    )
  };

  return (
    <main className="min-h-screen bg-[#f9f9fb] flex flex-col items-center w-full py-12">
      <ServerSeo slug={`policy/${params.slug}`} />
      <SectionContainer className="bg-transparent py-0">
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
          {policy.content}

          {/* Note */}

        </div>
      </SectionContainer>
    </main>
  );
}
