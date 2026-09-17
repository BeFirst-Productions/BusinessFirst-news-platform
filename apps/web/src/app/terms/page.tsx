import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';
import FullWidthAdBanner from '@/components/FullWidthAdBanner';
import TermsSidebar from '@/components/terms/TermsSidebar';
import {
  Scale,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  AlertTriangle,
  Gavel,
  Mail,
  Info,
  Layers,
  Sparkles,
  ExternalLink,
  Ban,
  Lock,
  DollarSign
} from 'lucide-react';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps(`policy/terms`);
  return buildMetadata({
    ...seoProps,
    title: 'Terms & Conditions | Business First UAE',
    description: 'Read the official Terms & Conditions governing access to Business First news, advertising, sponsored content, and media services in the UAE.',
  });
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full  py-8 md:py-12">
      <ServerSeo slug="policy/terms" />

      {/* Breadcrumbs */}
      <SectionContainer className="bg-white py-4 mt-4">
        <div className="flex items-center text-xs md:text-sm font-semibold tracking-wide text-[#24214c]">
          <Link href="/" className="hover:text-[#FF0202] transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-[#FF0202]">Terms &amp; Conditions</span>
        </div>
      </SectionContainer>

      {/* Main Section */}
      <SectionContainer className="bg-white" overflowVisible={true}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">

          {/* Left Column: Terms Content */}
          <div className="w-full lg:flex-1 flex flex-col gap-6">

            {/* Header with Site Style */}
            <div className="flex items-center w-full gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
                Terms &amp; Conditions
              </h1>
              <div className="h-[2px] flex-1 bg-gray-300"></div>
            </div>

            {/* Division and Dates */}
            <div className="pb-4 border-b border-gray-200">
              <p className="text-base sm:text-lg font-bold text-[#24214c] font-newsreader mb-2">
                Business First — A division of Befirst Media Productions
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500">
                <span><strong>Effective Date:</strong> 14 September 2026</span>
                <span>•</span>
                <span><strong>Last Updated:</strong> 14 September 2026</span>
              </div>
            </div>

            {/* Key Notice Banner */}
            <div className="bg-[#fcf8ed] border-l-4 border-[#fbbf24] p-5 rounded-r-xl my-2">
              <h4 className="text-base font-bold text-[#24214c] mb-1 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#fbbf24]" />
                Notice to Users &amp; Commercial Clients
              </h4>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                These Terms &amp; Conditions govern access to Business First&apos;s digital journalism, commercial advertising, PR distribution, and media production services in the United Arab Emirates. By accessing or using the platform, you agree to be bound by these Terms.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-8 mt-2">

              {/* 1. INTRODUCTION */}
              <section id="section-1" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  1. INTRODUCTION
                </h2>
                <p className="mb-3">
                  Welcome to <strong>Business First</strong>.
                </p>
                <p className="mb-3">
                  Business First is a business news, media, advertising and content platform operated as a division of Befirst Media Productions in the United Arab Emirates.
                </p>
                <p className="mb-3">
                  These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the Business First website, digital platforms, news content, newsletters, social media-related services, advertising services, sponsored content, interviews, events, video and podcast content, subscriptions and other products or services provided by Business First.
                </p>
                <p className="mb-3">
                  In these Terms, &ldquo;Business First&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Business First and, where applicable, Befirst Media Productions. &ldquo;You&rdquo; and &ldquo;your&rdquo; refer to any visitor, reader, subscriber, advertiser, client, contributor, interviewee, partner or other person accessing or using our website or services.
                </p>
                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#24214c] font-medium">
                  By accessing or using Business First, you agree to these Terms. If you do not agree with these Terms, you should discontinue use of the website and applicable services.
                </div>
              </section>

              {/* 2. LEGAL ENTITY */}
              <section id="section-2" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  2. LEGAL ENTITY
                </h2>
                <p className="mb-3">Business First operates as a division/brand of:</p>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs md:text-sm space-y-1.5">
                  <p><strong>Legal Entity:</strong> Befirst Media Productions (operating through Business First)</p>
                  <p><strong>Registered Address:</strong> Dubai, United Arab Emirates</p>
                  <p><strong>Licensing Jurisdiction:</strong> United Arab Emirates</p>
                  <p><strong>General Enquiries:</strong> <a href="mailto:info@businessfirstuae.com" className="text-[#cd2027] hover:underline">info@businessfirstuae.com</a></p>
                  <p><strong>Official Website:</strong> <a href="https://businessfirstuae.com" target="_blank" rel="noopener noreferrer" className="text-[#cd2027] hover:underline">https://businessfirstuae.com</a></p>
                </div>
              </section>

              {/* 3. BUSINESS FIRST SERVICES */}
              <section id="section-3" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  3. BUSINESS FIRST SERVICES
                </h2>
                <p className="mb-3">Business First may provide services including:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
                  {[
                    'Business news & analysis',
                    'UAE news & market updates',
                    '1-Minute Reads',
                    'Economic & industry analysis',
                    'Corporate & startup coverage',
                    'Real estate & tech news',
                    'Interviews & expert opinions',
                    'Thought leadership',
                    'Newsletters & podcasts',
                    'Video & social media content',
                    'Sponsored news & branded content',
                    'PR & media visibility services',
                    'Website & banner advertising',
                    'Social media advertising',
                    'Event promotion & coverage',
                    'Media partnerships',
                    'Founder & executive profiles',
                    'Commercial photography & video',
                    'Market-entry visibility campaigns',
                    'Corporate communications',
                    'Advertising campaigns',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded text-xs md:text-sm font-medium text-gray-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cd2027]"></span>
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-gray-500">
                  Business First may add, modify, suspend or discontinue services from time to time.
                </p>
              </section>

              {/* 4. WEBSITE ACCESS */}
              <section id="section-4" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  4. WEBSITE ACCESS
                </h2>
                <p className="mb-3">
                  Business First grants users a limited, revocable, non-exclusive and non-transferable right to access and use the website for lawful personal or legitimate business purposes, subject to these Terms.
                </p>
                <p className="mb-2 font-semibold text-[#24214c]">Access to some content or functionality may require:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-sm">
                  <li>registration;</li>
                  <li>subscription;</li>
                  <li>payment;</li>
                  <li>acceptance of additional terms; or</li>
                  <li>verification.</li>
                </ul>
                <p className="text-sm text-gray-600">
                  We may modify, suspend, restrict or discontinue all or part of the website where reasonably necessary for operational, security, legal, maintenance or commercial reasons. We do not guarantee uninterrupted or error-free access.
                </p>
              </section>

              {/* 5. ELIGIBILITY */}
              <section id="section-5" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  5. ELIGIBILITY
                </h2>
                <p className="mb-3">
                  By using services involving contracts, purchases, advertising or other commercial transactions, you represent that you have the legal capacity and authority to enter into the relevant agreement.
                </p>
                <p className="text-sm text-gray-600">
                  If you act on behalf of a company or organisation, you represent that you have authority to bind that organisation.
                </p>
              </section>

              {/* 6. NEWS AND EDITORIAL CONTENT */}
              <section id="section-6" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  6. NEWS AND EDITORIAL CONTENT
                </h2>
                <p className="mb-3">
                  Business First seeks to provide professional, credible and timely business journalism. However, news is inherently dynamic and information may change after publication.
                </p>
                <p className="mb-2 font-semibold text-[#24214c]">
                  Business First does not warrant that every article or item will always be:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-sm">
                  <li>complete;</li>
                  <li>current;</li>
                  <li>error-free;</li>
                  <li>exhaustive; or</li>
                  <li>suitable for a particular decision.</li>
                </ul>
                <p className="text-sm text-gray-600">
                  We may update, correct, clarify, amend or remove editorial content where appropriate. Publication of a story does not constitute an endorsement of any company, individual, investment, product or service mentioned in that story.
                </p>
              </section>

              {/* 7. EDITORIAL INDEPENDENCE */}
              <section id="section-7" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  7. EDITORIAL INDEPENDENCE
                </h2>
                <p className="mb-3">
                  Business First maintains editorial discretion over its independent news coverage. Our editorial team determines newsworthiness, story presentation, headlines, editing, categorisation, publication timing, updates, corrections, and removals.
                </p>
                <div className="p-3 bg-red-50 border-l-4 border-[#cd2027] text-red-950 text-xs md:text-sm font-medium rounded-r-lg">
                  Providing information, sending a press release or purchasing an unrelated Business First service does not guarantee independent editorial coverage. Advertising relationships do not entitle advertisers to influence independent editorial reporting.
                </div>
              </section>

              {/* 8. CORRECTIONS AND UPDATES */}
              <section id="section-8" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  8. CORRECTIONS AND UPDATES
                </h2>
                <p className="mb-3">
                  Business First aims to correct material factual errors brought to its attention. If you believe published content contains a significant factual error, contact:
                </p>
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm mb-3">
                  <strong>Editorial Team:</strong>{' '}
                  <a href="mailto:editorial@businessfirstuae.com" className="text-[#cd2027] font-semibold hover:underline">
                    editorial@businessfirstuae.com
                  </a>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  Requests should identify the article, disputed statement, alleged error, correct information, and supporting evidence. Submitting a request does not automatically require modification or removal.
                </p>
              </section>

              {/* 9. OPINIONS, COMMENTARY AND EXPERT CONTENT */}
              <section id="section-9" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  9. OPINIONS, COMMENTARY AND EXPERT CONTENT
                </h2>
                <p className="mb-3">
                  Business First may publish opinion pieces, expert columns, guest articles, interviews, commentary, and contributed thought leadership.
                </p>
                <p className="text-sm text-gray-600">
                  Views expressed by an identified contributor, interviewee or expert are generally those of that person and do not necessarily represent the views of Business First or Befirst Media Productions. Business First may edit contributed material for clarity, accuracy, style, length, compliance and publication standards.
                </p>
              </section>

              {/* 10. NO FINANCIAL OR INVESTMENT ADVICE */}
              <section id="section-10" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  10. NO FINANCIAL OR INVESTMENT ADVICE
                </h2>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mb-3">
                  <p className="text-sm font-semibold text-amber-950">
                    Business First provides news and information for general informational purposes only.
                  </p>
                </div>
                <p className="mb-2 font-semibold text-[#24214c]">Nothing published should be treated solely as:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-sm text-gray-700">
                  <li>investment advice;</li>
                  <li>financial advice;</li>
                  <li>securities recommendations;</li>
                  <li>tax or accounting advice;</li>
                  <li>legal advice; or</li>
                  <li>an offer or solicitation to purchase or sell an investment.</li>
                </ul>
                <p className="text-sm text-gray-600">
                  Financial markets, businesses, securities and investments involve risk. Readers should obtain independent professional advice and conduct their own due diligence before making financial or investment decisions.
                </p>
              </section>

              {/* 11. NO PROFESSIONAL ADVICE */}
              <section id="section-11" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  11. NO PROFESSIONAL ADVICE
                </h2>
                <p className="mb-3">
                  Articles concerning law, taxation, immigration, company formation, finance, real estate, employment, healthcare, technology or other professional subjects are intended primarily for general informational purposes.
                </p>
                <p className="text-sm text-gray-600">
                  Users should consult appropriately qualified professionals before making decisions requiring professional advice.
                </p>
              </section>

              {/* 12. ADVERTISING */}
              <section id="section-12" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  12. ADVERTISING
                </h2>
                <p className="mb-3">
                  Business First displays advertising across banners, social media, sponsored posts, newsletters, videos, podcasts, and branded formats.
                </p>
                <p className="mb-3 text-sm text-gray-600">
                  The presence of an advertisement does not constitute an endorsement, warranty or recommendation. Advertisers are responsible for ensuring that their claims, products, and creatives comply with applicable laws and UAE advertising regulations.
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Business First reserves the right to reject, suspend or remove advertising deemed inappropriate, misleading, unlawful, or inconsistent with our standards.
                </p>
              </section>

              {/* 13. SPONSORED AND COMMERCIAL CONTENT */}
              <section id="section-13" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  13. SPONSORED AND COMMERCIAL CONTENT
                </h2>
                <p className="mb-3">
                  Business First publishes paid commercial content clearly labelled with markers such as <em>Sponsored</em>, <em>Partner Content</em>, <em>Brand Feature</em>, <em>Paid Partnership</em>, or <em>Advertisement</em>.
                </p>
                <p className="text-sm text-gray-600">
                  Payment does not entitle any advertiser to publish false, misleading, defamatory, unlawful or otherwise unacceptable material. Business First reserves the right to require changes necessary for compliance.
                </p>
              </section>

              {/* 14. ADVERTISING AND MEDIA SERVICE ORDERS */}
              <section id="section-14" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  14. ADVERTISING AND MEDIA SERVICE ORDERS
                </h2>
                <p className="mb-3">
                  Commercial services may be governed by quotations, proposals, insertion orders, service agreements, email approvals, or invoices. Specifically agreed written commercial terms apply together with these Terms.
                </p>
              </section>

              {/* 15. PR AND MEDIA SERVICES */}
              <section id="section-15" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  15. PR AND MEDIA SERVICES
                </h2>
                <p className="mb-3">
                  Unless expressly stated in writing, purchasing PR services does not guarantee third-party media publication, journalist acceptance, search engine rankings, viral reach, leads, sales, investment, awards, or specific commercial returns.
                </p>
                <p className="text-xs text-gray-500">
                  Packages including distribution only through Business First-owned channels do not imply distribution to independent third-party newsrooms.
                </p>
              </section>

              {/* 16. ADVERTISING RESULTS */}
              <section id="section-16" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  16. ADVERTISING RESULTS
                </h2>
                <p className="mb-3">
                  Advertising performance can be affected by numerous external factors. Unless specifically guaranteed in writing, Business First does not guarantee impressions, clicks, leads, conversions, sales, followers, inquiries, or revenue.
                </p>
              </section>

              {/* 17. ADVERTISER RESPONSIBILITIES */}
              <section id="section-17" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  17. ADVERTISER RESPONSIBILITIES
                </h2>
                <p className="mb-3">
                  Advertisers must provide accurate company information, authorised logos/trademarks, legally cleared photos/videos, substantiated claims, and required campaign materials by agreed deadlines.
                </p>
                <p className="text-sm text-gray-600">
                  The client warrants that supplied materials do not infringe third-party IP, privacy, or publicity rights.
                </p>
              </section>

              {/* 18. APPROVALS */}
              <section id="section-18" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  18. APPROVALS
                </h2>
                <p className="mb-3">
                  Where creative materials are sent for client review, approval by email, messaging, or digital workflow is treated as authorisation to publish. Changes requested after final approval or publication may incur additional production charges.
                </p>
              </section>

              {/* 19. CAMPAIGN SCHEDULING */}
              <section id="section-19" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  19. CAMPAIGN SCHEDULING
                </h2>
                <p className="mb-3">
                  Advertising and publication dates are subject to availability, payment, receipt of materials, and compliance review. Business First may reasonably reschedule campaigns in the event of breaking news, technical disruption, or circumstances outside reasonable control.
                </p>
              </section>

              {/* 20. PRICES AND VAT */}
              <section id="section-20" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  20. PRICES AND VAT
                </h2>
                <p className="mb-3">
                  Prices displayed on the website, rate card, or media kit are quoted in UAE Dirhams (AED) unless stated otherwise. Applicable VAT or other statutory taxes are additional.
                </p>
              </section>

              {/* 21. PAYMENT */}
              <section id="section-21" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  21. PAYMENT
                </h2>
                <p className="mb-3">
                  Unless otherwise agreed in writing, payment is required in advance before campaign activation, content production, advertising placement, or publication. Business First may withhold services while payments remain outstanding.
                </p>
              </section>

              {/* 22. CANCELLATIONS AND REFUNDS */}
              <section id="section-22" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  22. CANCELLATIONS AND REFUNDS
                </h2>
                <div className="space-y-3">
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-[#24214c] text-sm">Before Work Begins</h4>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                      Cancellation requests must be submitted in writing. Where no production, reservation, or third-party cost has begun, Business First may determine whether a refund or credit is available.
                    </p>
                  </div>
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-[#24214c] text-sm">After Work Begins</h4>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                      Amounts relating to work performed, resources committed, inventory reserved, or third-party expenses incurred are non-refundable to the extent permitted by law.
                    </p>
                  </div>
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-[#24214c] text-sm">After Publication or Campaign Activation</h4>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                      Fees for completed publication or delivered advertising are generally non-refundable except where required by mandatory UAE consumer legislation.
                    </p>
                  </div>
                </div>
              </section>

              {/* 23. EVENTS */}
              <section id="section-23" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  23. EVENTS
                </h2>
                <p className="mb-3">
                  Business First may organise, promote, sponsor, cover or partner with conferences, exhibitions, webinars, and ceremonies. Where Business First acts solely as media partner or promoter, responsibility for the event remains with the primary organizer.
                </p>
              </section>

              {/* 24. INTERVIEWS */}
              <section id="section-24" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  24. INTERVIEWS
                </h2>
                <p className="mb-3">
                  By voluntarily participating in an interview, participants grant Business First permission to record, edit, and publish the interview across digital platforms, podcasts, video, newsletters, and archives. Business First will not intentionally misrepresent statements.
                </p>
              </section>

              {/* 25. PHOTOGRAPHY, VIDEO AND RECORDINGS */}
              <section id="section-25" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  25. PHOTOGRAPHY, VIDEO AND RECORDINGS
                </h2>
                <p className="mb-3">
                  Where Business First produces media assets as part of a commercial service, usage rights are defined by the written contract or license. Third-party stock music, footage, or fonts remain subject to their respective licenses.
                </p>
              </section>

              {/* 26. USER SUBMISSIONS */}
              <section id="section-26" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  26. USER SUBMISSIONS
                </h2>
                <p className="mb-3">
                  Submission of press releases, opinion pieces, or story tips does not guarantee publication. By submitting material, you confirm that you hold necessary authority, the material is accurate and lawful, and Business First may review, edit, or decline it.
                </p>
              </section>

              {/* 27. LICENCE FOR SUBMITTED CONTENT */}
              <section id="section-27" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  27. LICENCE FOR SUBMITTED CONTENT
                </h2>
                <p className="mb-3">
                  Unless otherwise agreed, submitting content for publication grants Business First a non-exclusive, worldwide, royalty-free license to publish, edit, format, and distribute that material across our media channels. You retain lawful ownership of your underlying content.
                </p>
              </section>

              {/* 28. BUSINESS FIRST INTELLECTUAL PROPERTY */}
              <section id="section-28" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  28. BUSINESS FIRST INTELLECTUAL PROPERTY
                </h2>
                <p className="mb-3">
                  Unless otherwise stated, the Business First website, branding, original journalism, layouts, infographics, video, audio, podcasts, and newsletters are owned by or licensed to Business First / Befirst Media Productions. All rights reserved.
                </p>
              </section>

              {/* 29. PERMITTED USE OF ARTICLES */}
              <section id="section-29" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  29. PERMITTED USE OF ARTICLES
                </h2>
                <p className="mb-3">
                  Users may share links to Business First articles through personal and professional channels. Users must not reproduce complete articles, republish substantial portions, scrape the website, resell content, or remove copyright attribution without written authorization.
                </p>
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm">
                  <strong>Licensing Desk:</strong>{' '}
                  <a href="mailto:licensing@businessfirstuae.com" className="text-[#cd2027] font-semibold hover:underline">
                    licensing@businessfirstuae.com
                  </a>
                </div>
              </section>

              {/* 30. AUTOMATED SCRAPING AND AI USE */}
              <section id="section-30" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  30. AUTOMATED SCRAPING AND AI USE
                </h2>
                <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-r-xl mb-3">
                  <p className="text-sm font-semibold text-red-900">
                    Systematic web scraping, automated extraction, model training, and AI harvesting of Business First content are strictly prohibited without a commercial written license.
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  Automated access that disrupts website operations or bypasses technical barriers is unlawful and prohibited.
                </p>
              </section>

              {/* 31. TRADEMARKS */}
              <section id="section-31" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  31. TRADEMARKS
                </h2>
                <p className="mb-3">
                  &ldquo;Business First&rdquo;, its logo, visual identity, programme names, and related brand elements constitute proprietary intellectual property. No license is granted merely through accessing the site.
                </p>
              </section>

              {/* 32. THIRD-PARTY CONTENT */}
              <section id="section-32" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  32. THIRD-PARTY CONTENT
                </h2>
                <p className="mb-3">
                  Third-party quotations, photographs, advertisements, and embedded feeds remain the property of their respective rights holders.
                </p>
              </section>

              {/* 33. EXTERNAL LINKS */}
              <section id="section-33" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  33. EXTERNAL LINKS
                </h2>
                <p className="mb-3">
                  Business First links to external websites for sourcing and background. External websites are operated independently; we are not responsible for their availability, security, privacy practices, or content.
                </p>
              </section>

              {/* 34. USER CONDUCT */}
              <section id="section-34" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  34. USER CONDUCT
                </h2>
                <p className="mb-2">Users must not misuse the platform to:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-3">
                  <li>violate UAE laws or commit fraud;</li>
                  <li>impersonate any person or entity;</li>
                  <li>distribute malware or interfere with website security;</li>
                  <li>scrape protected content or harvest user information;</li>
                  <li>submit defamatory, knowingly false, or harassing material; or</li>
                  <li>manipulate website features.</li>
                </ul>
              </section>

              {/* 35. COMMENTS AND COMMUNITY FEATURES */}
              <section id="section-35" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  35. COMMENTS AND COMMUNITY FEATURES
                </h2>
                <p className="mb-3">
                  Users remain solely responsible for community contributions. Business First reserves the right to moderate, hide, or delete comments violating our standards or UAE regulations.
                </p>
              </section>

              {/* 36. ACCOUNTS AND PASSWORDS */}
              <section id="section-36" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  36. ACCOUNTS AND PASSWORDS
                </h2>
                <p className="mb-3">
                  Where accounts exist, users are responsible for safeguarding login credentials. Business First may suspend accounts reasonably suspected of fraud, abuse, or security compromise.
                </p>
              </section>

              {/* 37. PRIVACY */}
              <section id="section-37" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  37. PRIVACY
                </h2>
                <p className="mb-3">
                  Personal data collected through Business First is processed in accordance with our{' '}
                  <Link href="/privacy-policy" className="text-[#cd2027] font-semibold hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  and applicable UAE data protection laws.
                </p>
              </section>

              {/* 38. NEWSLETTER */}
              <section id="section-38" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  38. NEWSLETTER
                </h2>
                <p className="mb-3">
                  Newsletter content is provided for informational purposes. Subscribers may opt out of marketing communications at any time via the unsubscribe mechanism.
                </p>
              </section>

              {/* 39. WEBSITE AVAILABILITY AND SECURITY */}
              <section id="section-39" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  39. WEBSITE AVAILABILITY AND SECURITY
                </h2>
                <p className="mb-3">
                  While reasonable measures are maintained, Business First does not warrant uninterrupted, error-free operation or absolute immunity from malicious third-party interference.
                </p>
              </section>

              {/* 40. LIMITATION OF LIABILITY */}
              <section id="section-40" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  40. LIMITATION OF LIABILITY
                </h2>
                <p className="mb-3">
                  To the maximum extent permitted by applicable law, Business First and Befirst Media Productions will not be liable for indirect, incidental, consequential, or special losses arising from reliance on general informational content or circumstances beyond reasonable control.
                </p>
                <p className="text-xs text-gray-500">
                  Nothing in these Terms limits liability where such limitation is prohibited by applicable UAE law.
                </p>
              </section>

              {/* 41. INDEMNITY */}
              <section id="section-41" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  41. INDEMNITY
                </h2>
                <p className="mb-3">
                  To the extent permitted by law, a user, advertiser or contributor may be responsible for claims and reasonable costs arising from supplied materials that infringe third-party rights, are unlawful, or breach express warranties.
                </p>
              </section>

              {/* 42. FORCE MAJEURE */}
              <section id="section-42" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  42. FORCE MAJEURE
                </h2>
                <p className="mb-3">
                  Business First is not liable for performance delays or failures caused by events beyond reasonable control, including government actions, internet outages, cyber incidents, natural disasters, or venue closures.
                </p>
              </section>

              {/* 43. SUSPENSION OR TERMINATION */}
              <section id="section-43" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  43. SUSPENSION OR TERMINATION
                </h2>
                <p className="mb-3">
                  We reserve the right to suspend or terminate service access for Terms violations, non-payment, fraud, regulatory requirements, or platform modifications. Provisions intended to survive termination remain in effect.
                </p>
              </section>

              {/* 44. CHANGES TO THESE TERMS */}
              <section id="section-44" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  44. CHANGES TO THESE TERMS
                </h2>
                <p className="mb-3">
                  Business First may update these Terms to reflect legal changes, new services, or operational developments. Continued use after revisions constitutes acceptance.
                </p>
              </section>

              {/* 45. ELECTRONIC COMMUNICATIONS */}
              <section id="section-45" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  45. ELECTRONIC COMMUNICATIONS
                </h2>
                <p className="mb-3">
                  Communications, approvals, notices, invoices, and agreements may be transmitted and executed electronically under applicable UAE laws.
                </p>
              </section>

              {/* 46. SEVERABILITY */}
              <section id="section-46" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  46. SEVERABILITY
                </h2>
                <p className="mb-3">
                  If any provision is deemed invalid or unenforceable, it shall be modified to the minimum extent necessary, while the remainder of these Terms continues in full effect.
                </p>
              </section>

              {/* 47. NO WAIVER */}
              <section id="section-47" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  47. NO WAIVER
                </h2>
                <p className="mb-3">
                  Failure to enforce any provision on one occasion does not constitute a waiver of future enforcement or any other right.
                </p>
              </section>

              {/* 48. ENTIRE AGREEMENT */}
              <section id="section-48" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  48. ENTIRE AGREEMENT
                </h2>
                <p className="mb-3">
                  These Terms, together with our Privacy Policy, Cookie Policy, and specific commercial contracts, constitute the entire agreement governing platform use.
                </p>
              </section>

              {/* 49. GOVERNING LAW */}
              <section id="section-49" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  49. GOVERNING LAW
                </h2>
                <p className="mb-3">
                  These Terms are governed by the laws of the United Arab Emirates. Media activities are conducted in accordance with UAE media laws, regulations, and competent authority standards.
                </p>
              </section>

              {/* 50. DISPUTE RESOLUTION AND JURISDICTION */}
              <section id="section-50" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  50. DISPUTE RESOLUTION AND JURISDICTION
                </h2>
                <p className="mb-3">
                  The parties shall first attempt in good faith to resolve disputes amicably through negotiation. If unresolved, disputes shall be submitted to the competent courts of Dubai, United Arab Emirates.
                </p>
              </section>

              {/* 51. CONSUMER RIGHTS */}
              <section id="section-51" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  51. CONSUMER RIGHTS
                </h2>
                <p className="mb-3">
                  Nothing in these Terms is intended to waive mandatory statutory consumer rights that cannot legally be excluded under UAE consumer protection legislation.
                </p>
              </section>

              {/* 52. CONTACT BUSINESS FIRST */}
              <section id="section-52" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  52. CONTACT BUSINESS FIRST
                </h2>
                <div className="bg-[#24214c] text-white p-6 md:p-8 rounded-2xl shadow-md space-y-4">
                  <h3 className="text-lg font-bold text-[#fbbf24]">
                    Business First — A division of Befirst Media Productions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm pt-2">
                    <div>
                      <p className="text-white/50 text-[11px] uppercase font-bold">General Enquiries</p>
                      <a href="mailto:info@businessfirstuae.com" className="text-white hover:text-[#fbbf24] font-semibold break-all">
                        info@businessfirstuae.com
                      </a>
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase font-bold">Legal &amp; Privacy</p>
                      <a href="mailto:legal@businessfirstuae.com" className="text-white hover:text-[#fbbf24] font-semibold break-all">
                        legal@businessfirstuae.com
                      </a>
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase font-bold">Editorial Desk</p>
                      <a href="mailto:editorial@businessfirstuae.com" className="text-white hover:text-[#fbbf24] font-semibold break-all">
                        editorial@businessfirstuae.com
                      </a>
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase font-bold">Advertising &amp; Commercial</p>
                      <a href="mailto:advertise@businessfirstuae.com" className="text-white hover:text-[#fbbf24] font-semibold break-all">
                        advertise@businessfirstuae.com
                      </a>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4 text-xs text-white/60 space-y-1">
                    <p><strong>Registered Legal Entity:</strong> Befirst Media Productions (operating through Business First)</p>
                    <p><strong>Registered Address:</strong> Dubai, United Arab Emirates</p>
                    <p><strong>Official Website:</strong> <a href="https://businessfirstuae.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">https://businessfirstuae.com</a></p>
                  </div>
                </div>
              </section>

              {/* 53. IMPORTANT WEBSITE LINKS */}
              <section id="section-53" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  53. IMPORTANT WEBSITE LINKS
                </h2>
                <p className="mb-3">
                  These documents operate together as Business First&apos;s legal and editorial governance framework:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
                  {[
                    { label: 'About Business First', href: '/about' },
                    { label: 'Contact Us', href: '/contact' },
                    { label: 'Terms & Conditions', href: '/terms' },
                    { label: 'Privacy Policy', href: '/privacy-policy' },
                    { label: 'Cookie Policy', href: '/cookie-policy' },
                    { label: 'Editorial Policy', href: '/editorial-policy' },
                    { label: 'Disclaimer', href: '/disclaimer' },
                    { label: 'Copyright & Content Policy', href: '/copyright-policy' },
                    { label: 'Corrections & Complaints Policy', href: '/corrections-policy' },
                  ].map((doc, idx) => (
                    <Link
                      key={idx}
                      href={doc.href}
                      className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#cd2027] hover:text-[#cd2027] font-medium transition-colors flex items-center justify-between"
                    >
                      <span>{doc.label}</span>
                      <span className="text-gray-400">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Closing Acknowledgment Box */}
              <div className="mt-8 p-6 md:p-8 bg-gradient-to-br from-[#24214c] to-[#161435] text-white rounded-2xl shadow-xl border border-white/10">
                <div className="flex items-center gap-2 text-[#fbbf24] text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles size={16} /> Compliance &amp; Acceptance
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3">
                  Business First — News That Means Business.
                </h3>
                <p className="text-sm md:text-base text-white/85 leading-relaxed">
                  By using Business First, you acknowledge that you have read and understood these Terms &amp; Conditions and agree to comply with them.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Sticky Sidebar */}
          <TermsSidebar />

        </div>
      </SectionContainer>

      {/* Ad Banner */}
     
    </main>
  );
}
