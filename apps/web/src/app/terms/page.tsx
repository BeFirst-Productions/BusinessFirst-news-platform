import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps(`policy/terms`);
  return buildMetadata(seoProps);
}

export default function TermsPage() {
  const title = 'Terms & Conditions';
  const subtitle = 'Our terms, conditions, and regulations governing the use of the platform.';

  return (
    <main className="min-h-screen bg-[#f9f9fb] flex flex-col items-center w-full py-12">
      <ServerSeo slug="policy/terms" />
      <SectionContainer className="bg-transparent py-0">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium mb-8">
          <Link href="/" className="text-gray-500 hover:text-[#cd2027] transition-colors">
            Home
          </Link>
          <span className="text-[#cd2027] font-semibold">&gt;</span>
          <span className="text-[#cd2027] font-semibold">{title}</span>
        </div>

        {/* Policy Document Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-8 md:p-12 shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#24214c] mb-3 tracking-tight">
              {title}
            </h1>
            <p className="text-gray-500 text-sm md:text-base font-medium">
              {subtitle}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed font-normal">
            <p><strong>Last Updated: August 2026</strong></p>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using BusinessFirst (the "Website"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p>Unless otherwise stated, BusinessFirst and/or its licensors own the intellectual property rights for all material on BusinessFirst. All intellectual property rights are reserved. You may access this from BusinessFirst for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <p>You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republish material from BusinessFirst without proper attribution.</li>
              <li>Sell, rent, or sub-license material from BusinessFirst.</li>
              <li>Reproduce, duplicate, or copy material from BusinessFirst for commercial purposes.</li>
              <li>Redistribute content from BusinessFirst (unless content is specifically made for redistribution).</li>
            </ul>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">3. User-Generated Content</h2>
            <p>Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas of the website (e.g., Comments). BusinessFirst does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of BusinessFirst, its agents, and/or affiliates.</p>
            <p>BusinessFirst reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive, or causes a breach of these Terms and Conditions.</p>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">4. Disclaimers and Limitation of Liability</h2>
            <p>The materials on BusinessFirst's website are provided on an 'as is' basis. BusinessFirst makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p>In no event shall BusinessFirst or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BusinessFirst's website.</p>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">5. Modifications to Terms</h2>
            <p>We reserve the right to modify these terms and conditions at any time. We do so by posting and drawing attention to the updated terms on the Site. Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms & Conditions.</p>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
