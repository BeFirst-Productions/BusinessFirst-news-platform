import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';
import FullWidthAdBanner from '@/components/FullWidthAdBanner';
import DisclaimerSidebar from '@/components/disclaimer/DisclaimerSidebar';
import { AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps(`policy/disclaimer`);
  return buildMetadata({
    ...seoProps,
    title: 'Disclaimer | Business First UAE',
    description: 'Read the official disclaimer for Business First, a division of Befirst Media Productions. Understand our editorial standards, financial risk notices, and general news disclaimers.',
  });
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full  py-8 md:py-12">
      <ServerSeo slug="policy/disclaimer" />
      
      {/* Breadcrumbs matching website design */}
      <SectionContainer className="bg-white py-4 mt-4">
        <div className="flex items-center text-xs md:text-sm font-semibold tracking-wide text-[#24214c]">
          <Link href="/" className="hover:text-[#FF0202] transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-[#FF0202]">Disclaimer</span>
        </div>
      </SectionContainer>

      {/* Main Section matching website layout */}
      <SectionContainer className="bg-white" overflowVisible={true}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">

          {/* Left Column: Disclaimer Editorial Content */}
          <div className="w-full lg:flex-1 flex flex-col gap-6">

            {/* Title with matching site style (red title + gray divider) */}
            <div className="flex items-center w-full gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
                Disclaimer
              </h1>
              <div className="h-[2px] flex-1 bg-gray-300"></div>
            </div>

            {/* Platform Division and Dates */}
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

            {/* Highlight Disclaimer Banner */}
            <div className="p-6 rounded-2xl bg-[#f8f9fb] border-l-4 border-[#FF0202] border border-gray-200/80 shadow-2xs">
              <p className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed font-newsreader">
                The information, news, articles, reports, interviews, opinions, videos, podcasts, newsletters, market updates and other content published on Business First are provided primarily for general information, news and educational purposes.
              </p>
            </div>

            {/* Intro Narrative */}
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                Business First aims to maintain high standards of accuracy, credibility and relevance. However, business, financial, regulatory and market information can change rapidly. While reasonable efforts are made to verify information before publication, Business First and Befirst Media Productions do not warrant that all information published on the website will at all times be complete, current, error-free or suitable for a particular purpose.
              </p>
              <p className="font-semibold text-[#24214c]">
                Users should independently verify information where it is material to a business, financial, investment, legal or other important decision.
              </p>
            </div>

            {/* Policy Body */}
            <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">

              {/* Editorial Content */}
              <section id="section-editorial" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Editorial Content
                </h2>
                <p className="mb-3">
                  Business First exercises editorial discretion over its independent news coverage. Information may be obtained from official government announcements, regulatory authorities, companies, stock exchanges, press releases, interviews, public records, industry reports, research organisations, authorised representatives and other sources considered relevant at the time of publication.
                </p>
                <p className="mb-3">
                  Where appropriate, Business First may update, clarify or correct published content as additional information becomes available.
                </p>
                <p>
                  Publication of information about a company, individual, product, service, investment, event or organisation does not by itself constitute endorsement or recommendation by Business First.
                </p>
              </section>

              {/* No Financial or Investment Advice */}
              <section id="section-financial" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3 flex items-center gap-2">
                  <AlertCircle size={22} className="text-[#FF0202]" />
                  No Financial or Investment Advice
                </h2>
                <div className="p-5 rounded-2xl bg-red-50/70 border border-red-100 text-gray-800 space-y-3 mb-4">
                  <p className="font-semibold text-red-900">
                    Business First is a business news and media platform and does not provide regulated financial or investment advice through its general editorial content.
                  </p>
                  <p>
                    Nothing published on Business First should be interpreted solely as investment advice, financial advice, securities advice, portfolio advice or a recommendation to buy, sell, hold or otherwise transact in any security, investment, financial product, cryptocurrency, real estate asset or other instrument.
                  </p>
                </div>
                <p className="mb-3">
                  Market data, company information, forecasts, valuations, analyst views and investment-related commentary may change without notice and may involve risk.
                </p>
                <p className="mb-3">
                  Readers should conduct their own research and seek advice from appropriately qualified and authorised professionals before making investment or financial decisions.
                </p>
                <p>
                  Business First does not guarantee the performance, profitability or future value of any investment, company, project or financial product mentioned on the platform.
                </p>
              </section>

              {/* No Legal, Tax or Professional Advice */}
              <section id="section-legal" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  No Legal, Tax or Professional Advice
                </h2>
                <p className="mb-3">
                  Content concerning UAE laws, regulations, taxation, company formation, immigration, employment, real estate, accounting, compliance or other professional matters is provided for general informational purposes unless expressly stated otherwise.
                </p>
                <p className="mb-3">
                  Laws, regulations, fees, procedures and government requirements may change.
                </p>
                <p>
                  Readers should consult the relevant UAE authority and/or an appropriately qualified professional before acting on information that may affect their legal, tax, financial or regulatory position.
                </p>
              </section>

              {/* Business and Economic Information */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Business and Economic Information
                </h2>
                <p className="mb-3">
                  Business First may publish economic indicators, company announcements, market statistics, investment figures, property data, funding information and other business-related information obtained from third-party or public sources.
                </p>
                <p className="mb-3">
                  Although reasonable efforts may be made to use credible sources, Business First cannot independently guarantee every figure supplied by third parties.
                </p>
                <p>
                  Historical performance, past business success, market growth or previous investment returns should not be regarded as a guarantee of future results.
                </p>
              </section>

              {/* Opinions and Expert Contributions */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Opinions and Expert Contributions
                </h2>
                <p className="mb-2">Business First may publish:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>expert opinions;</li>
                  <li>guest articles;</li>
                  <li>thought leadership;</li>
                  <li>interviews;</li>
                  <li>contributed articles;</li>
                  <li>columns;</li>
                  <li>commentary; and</li>
                  <li>analysis.</li>
                </ul>
                <p className="mb-3">
                  Views expressed in such content belong to the respective author, contributor, expert or interviewee unless explicitly stated otherwise.
                </p>
                <p className="mb-3">
                  Those views do not necessarily represent the views, policies or positions of Business First or Befirst Media Productions.
                </p>
                <p>
                  The appearance of an expert or contributor on Business First does not constitute an endorsement of all products, services, businesses or opinions associated with that individual or organisation.
                </p>
              </section>

              {/* Sponsored Content, PR and Advertising */}
              <section id="section-sponsored" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Sponsored Content, PR and Advertising
                </h2>
                <p className="mb-3">
                  Business First may generate revenue through advertising, sponsorships, sponsored news, branded content, PR services, business features, interviews, media partnerships, event coverage and other commercial arrangements.
                </p>
                <p className="mb-2">
                  Paid or sponsored content will be identified where required and appropriate using labels such as:
                </p>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 text-sm font-semibold text-[#24214c] mb-3">
                  Sponsored, Partner Content, Brand Feature, Paid Partnership, Advertisement, or another suitable disclosure.
                </div>
                <p className="mb-3">
                  Statements, claims, offers, product information and representations contained in advertisements or advertiser-supplied materials remain the responsibility of the relevant advertiser or commercial partner.
                </p>
                <p className="mb-3">
                  The presence of advertising on Business First does not automatically constitute an endorsement, certification or recommendation of the advertiser, its products or its services.
                </p>
                <p>
                  Readers should conduct their own due diligence before entering into a commercial relationship with an advertiser or featured organisation.
                </p>
              </section>

              {/* Press Releases and Corporate Announcements */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Press Releases and Corporate Announcements
                </h2>
                <p className="mb-3">
                  Business First may publish information based on press releases, corporate announcements or information supplied by companies, PR agencies, government entities or authorised representatives.
                </p>
                <p className="mb-3">
                  Where content substantially originates from such material, Business First may edit it for clarity, style, length and relevance.
                </p>
                <p className="mb-3">
                  The organisation providing the underlying information remains responsible for the accuracy of statements, representations, claims and figures it supplies.
                </p>
                <p>
                  Publication of a press release does not necessarily constitute independent verification or endorsement of every statement contained within it.
                </p>
              </section>

              {/* Interviews */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Interviews
                </h2>
                <p className="mb-3">
                  Statements made by individuals during interviews represent the views, experiences or claims of the interviewee.
                </p>
                <p className="mb-3">
                  Business First may edit interviews for length, clarity, formatting and presentation while seeking to preserve the intended meaning.
                </p>
                <p>
                  Business First does not automatically endorse the personal, professional, commercial or investment views expressed by an interviewee.
                </p>
              </section>

              {/* Third-Party Links */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Third-Party Links
                </h2>
                <p className="mb-3">
                  Business First may include links to external websites, government portals, company websites, event platforms, research sources, social media platforms and other third-party services.
                </p>
                <p className="mb-3">
                  These links may be provided for convenience, attribution or additional information.
                </p>
                <p className="mb-3">
                  Business First does not control independently operated third-party websites and is not responsible for their content, security, availability, accuracy, privacy practices, products or services.
                </p>
                <p>
                  Accessing an external website is at the user&apos;s discretion and subject to that website&apos;s own terms and policies.
                </p>
              </section>

              {/* Events and Media Partnerships */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Events and Media Partnerships
                </h2>
                <p className="mb-3">
                  Business First may promote, cover, sponsor or act as a media partner for third-party conferences, exhibitions, networking events, awards, launches and other activities.
                </p>
                <p className="mb-3">
                  Unless Business First is expressly identified as the organiser, promotion or media partnership does not mean Business First operates or controls the event.
                </p>
                <p>
                  Attendees should review the organiser&apos;s own terms, policies and event information before registering or attending.
                </p>
              </section>

              {/* Accuracy and Corrections */}
              <section id="section-corrections" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Accuracy and Corrections
                </h2>
                <p className="mb-3">
                  Business First is committed to responsible business journalism and welcomes legitimate correction requests.
                </p>
                <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200 mb-3">
                  <p className="font-semibold text-[#24214c] mb-1">
                    If you believe an article contains a material factual error, please contact:
                  </p>
                  <p className="text-sm">
                    <strong>Editorial:</strong>{' '}
                    <a href="mailto:editorial@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                      editorial@businessfirstnews.com
                    </a>
                  </p>
                </div>
                <p className="mb-3">
                  Please provide the article URL, the information you believe is inaccurate and, where possible, reliable supporting evidence.
                </p>
                <p>
                  Business First will review legitimate requests and determine whether a correction, clarification, update or other editorial action is appropriate.
                </p>
              </section>

              {/* Content Availability */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Content Availability
                </h2>
                <p className="mb-3">
                  Business First may update, modify, correct, archive or remove content where appropriate.
                </p>
                <p>
                  We do not guarantee that any article, video, report, advertisement, feature or other content will remain permanently available.
                </p>
              </section>

              {/* Website Availability */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Website Availability
                </h2>
                <p className="mb-3">
                  Business First takes reasonable steps to maintain the security and availability of its website. However, uninterrupted or error-free access cannot be guaranteed.
                </p>
                <p>
                  The website may occasionally be unavailable due to maintenance, technical issues, cybersecurity incidents, hosting failures, third-party platform issues or circumstances beyond our reasonable control.
                </p>
              </section>

              {/* Limitation of Responsibility */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Limitation of Responsibility
                </h2>
                <p className="mb-3">
                  To the maximum extent permitted by applicable law, Business First and Befirst Media Productions will not be responsible for decisions made solely in reliance upon general information published on the platform or for indirect or consequential losses arising from such reliance.
                </p>
                <p className="mb-3">
                  Users remain responsible for evaluating information and obtaining appropriate professional advice where necessary.
                </p>
                <p>
                  Nothing in this Disclaimer is intended to exclude or restrict liability that cannot lawfully be excluded under applicable UAE law.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Intellectual Property
                </h2>
                <p className="mb-3">
                  Unless otherwise stated, original Business First articles, graphics, videos, photographs, podcasts, branding and other proprietary content are owned by or licensed to Business First / Befirst Media Productions and are subject to applicable intellectual property protections.
                </p>
                <p className="mb-3">
                  Third-party trademarks, logos, photographs and other materials remain the property of their respective owners.
                </p>
                <p>
                  For permissions or content-licensing enquiries, contact:{' '}
                  <a href="mailto:editorial@businessfirstnews.com" className="text-[#FF0202] hover:underline font-semibold">
                    editorial@businessfirstnews.com
                  </a>
                </p>
              </section>

              {/* Artificial Intelligence and Technology-Assisted Content */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Artificial Intelligence and Technology-Assisted Content
                </h2>
                <p className="mb-3">
                  Business First may use digital tools, automation or artificial intelligence technologies to assist certain internal activities such as research organisation, transcription, translation, content formatting, data processing or production workflows.
                </p>
                <p className="mb-3">
                  Where such technologies are used, Business First remains committed to appropriate editorial oversight for published journalistic content.
                </p>
                <p>
                  AI-generated or technology-assisted information should not replace verification of material facts from appropriate sources.
                </p>
              </section>

              {/* Governing Framework */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Governing Framework
                </h2>
                <p className="mb-3">
                  Business First operates in the United Arab Emirates and seeks to conduct its media and commercial activities in accordance with applicable UAE laws, regulations, media standards and requirements of competent authorities.
                </p>
                <p className="mb-2">This Disclaimer should be read together with the Business First:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>
                    <Link href="/terms" className="text-[#FF0202] hover:underline font-medium">Terms &amp; Conditions</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-[#FF0202] hover:underline font-medium">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/cookie-policy" className="text-[#FF0202] hover:underline font-medium">Cookie Policy</Link>
                  </li>
                </ul>
                <p>
                  Where there is a conflict between this general Disclaimer and mandatory applicable law, the applicable legal requirement will prevail.
                </p>
              </section>

              {/* Contact Us */}
              <section id="section-contact" className="scroll-mt-24 pt-4 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  Contact Us
                </h2>
                <p className="mb-4">
                  For questions regarding this Disclaimer:
                </p>

                <div className="p-6 rounded-2xl bg-[#f8f9fb] border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-[#24214c] block font-bold text-base mb-1">BUSINESS FIRST</strong>
                    <p className="text-gray-600">A division of Befirst Media Productions</p>
                    <p className="text-gray-600 mt-1">Dubai, United Arab Emirates</p>
                    <p className="text-gray-600 mt-1">
                      <strong className="text-gray-800">Website:</strong>{' '}
                      <a href="https://businessfirstnews.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0202] hover:underline">
                        businessfirstnews.com
                      </a>
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">General Enquiries:</strong>{' '}
                      <a href="mailto:info@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                        info@businessfirstnews.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Editorial:</strong>{' '}
                      <a href="mailto:editorial@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                        editorial@businessfirstnews.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Legal:</strong>{' '}
                      <a href="mailto:legal@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                        legal@businessfirstnews.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Tagline */}
                <div className="mt-6 p-6 rounded-2xl bg-[#24214c] text-white shadow-md flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-newsreader text-[#fbbf24] mb-1 flex items-center gap-2">
                      <ShieldAlert size={20} className="text-[#fbbf24]" />
                      EDITORIAL INTEGRITY
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200">
                      Business First is committed to clear, relevant, and credible business reporting across the UAE.
                    </p>
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-white font-newsreader text-right shrink-0">
                    News That Means Business.
                  </span>
                </div>
              </section>

            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <DisclaimerSidebar />

        </div>

        {/* Ad Banner matching website standards */}
        
      </SectionContainer>
    </main>
  );
}
