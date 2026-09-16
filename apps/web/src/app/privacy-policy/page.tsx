import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';
import FullWidthAdBanner from '@/components/FullWidthAdBanner';
import PrivacySidebar from '@/components/privacy-policy/PrivacySidebar';
import { ShieldCheck, Lock, UserCheck, Mail, Phone, Globe, Building2 } from 'lucide-react';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps(`policy/privacy`);
  return buildMetadata({
    ...seoProps,
    title: 'Privacy Policy | Business First UAE',
    description: 'Read the official Privacy Policy of Business First, a division of Befirst Media Productions, in accordance with UAE Federal Decree-Law No. 45 of 2021.',
  });
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <ServerSeo slug="policy/privacy" />
      
      {/* Breadcrumbs matching website design */}
      <SectionContainer className="bg-white py-4 mt-4">
        <div className="flex items-center text-xs md:text-sm font-semibold tracking-wide text-[#24214c]">
          <Link href="/" className="hover:text-[#FF0202] transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-[#FF0202]">Privacy Policy</span>
        </div>
      </SectionContainer>

      {/* Main Section matching website layout */}
      <SectionContainer className="bg-white" overflowVisible={true}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">

          {/* Left Column: Privacy Policy Editorial Content */}
          <div className="w-full lg:flex-1 flex flex-col gap-6">

            {/* Title with matching site style (red title + gray divider) */}
            <div className="flex items-center w-full gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
                Privacy Policy
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

            {/* Policy Body */}
            <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">

              {/* 1. INTRODUCTION */}
              <section id="section-1" className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  1. INTRODUCTION
                </h2>
                <p className="mb-3">
                  Business First (“Business First”, “we”, “us” or “our”) respects the privacy of our readers, subscribers, advertisers, contributors, business partners, website visitors and other users of our digital platforms.
                </p>
                <p className="mb-3">
                  Business First is a business news and digital media platform operated as a division of Befirst Media Productions in the United Arab Emirates.
                </p>
                <p className="mb-2">This Privacy Policy explains how we collect, use, process, store, disclose and protect personal data when you:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>visit or use the Business First website;</li>
                  <li>subscribe to our newsletters or publications;</li>
                  <li>register for an account or service;</li>
                  <li>submit an enquiry;</li>
                  <li>contact our editorial, advertising or commercial teams;</li>
                  <li>participate in interviews, surveys, competitions or events;</li>
                  <li>purchase or enquire about advertising, sponsored content or media services;</li>
                  <li>interact with Business First through social media;</li>
                  <li>submit press releases, articles, expert opinions or other content;</li>
                  <li>attend or register for Business First events; or</li>
                  <li>otherwise interact with our services, websites or digital platforms.</li>
                </ul>
                <p className="mb-3">
                  We are committed to processing personal data responsibly and in accordance with applicable laws of the United Arab Emirates, including Federal Decree-Law No. 45 of 2021 Concerning the Protection of Personal Data, where applicable.
                </p>
                <p>
                  This Privacy Policy should be read together with our{' '}
                  <Link href="/terms" className="text-[#FF0202] hover:underline font-medium">Terms &amp; Conditions</Link>,{' '}
                  <Link href="/cookie-policy" className="text-[#FF0202] hover:underline font-medium">Cookie Policy</Link>,{' '}
                  <Link href="/disclaimer" className="text-[#FF0202] hover:underline font-medium">Disclaimer</Link>{' '}
                  and any other notices presented when personal data is collected.
                </p>
              </section>

              {/* 2. WHO WE ARE */}
              <section id="section-2" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  2. WHO WE ARE
                </h2>
                <p className="mb-4">
                  For the purposes of applicable UAE data protection legislation, the relevant data controller is:
                </p>
                <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200 text-sm space-y-2">
                  <p className="font-bold text-[#24214c] text-base">Befirst Media Productions</p>
                  <p className="text-gray-700"><strong>Operating Division:</strong> Business First</p>
                  <p className="text-gray-700"><strong>Country:</strong> United Arab Emirates</p>
                  <p className="text-gray-700"><strong>Registered Address:</strong> Dubai, United Arab Emirates</p>
                  <p className="text-gray-700">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:privacy@businessfirstuae.com" className="text-[#FF0202] hover:underline">
                      privacy@businessfirstuae.com
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Telephone:</strong>{' '}
                    <a href="tel:+97141234567" className="text-gray-800 hover:text-[#FF0202]">
                      +971 4 123 4567
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Website:</strong>{' '}
                    <a href="https://businessfirstuae.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0202] hover:underline">
                      businessfirstuae.com
                    </a>
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Where required, further details regarding the legal entity, licence and relevant data-protection contact may be published on this page.
                </p>
              </section>

              {/* 3. SCOPE OF THIS PRIVACY POLICY */}
              <section id="section-3" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  3. SCOPE OF THIS PRIVACY POLICY
                </h2>
                <p className="mb-2">This Privacy Policy applies to personal data collected through Business First&apos;s:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                  <div className="flex items-center gap-2">• website &amp; mobile-responsive pages</div>
                  <div className="flex items-center gap-2">• newsletters &amp; news alerts</div>
                  <div className="flex items-center gap-2">• subscription &amp; contact forms</div>
                  <div className="flex items-center gap-2">• advertising enquiry forms</div>
                  <div className="flex items-center gap-2">• surveys, polls &amp; reader feedback</div>
                  <div className="flex items-center gap-2">• event registration systems</div>
                  <div className="flex items-center gap-2">• competitions &amp; webinars</div>
                  <div className="flex items-center gap-2">• podcasts &amp; video platforms</div>
                  <div className="flex items-center gap-2">• social media interactions</div>
                  <div className="flex items-center gap-2">• editorial submissions &amp; PR content</div>
                  <div className="flex items-center gap-2">• commercial &amp; advertising partnerships</div>
                  <div className="flex items-center gap-2">• digital media services</div>
                </div>
                <p className="mb-3">
                  It also applies where we receive personal data through legitimate business interactions with advertisers, agencies, PR firms, contributors, event organisers, interviewees, partners and service providers.
                </p>
                <p className="text-xs text-gray-500 italic">
                  This Policy does not govern websites or services operated independently by third parties merely because Business First links to them.
                </p>
              </section>

              {/* 4. WHAT IS PERSONAL DATA? */}
              <section id="section-4" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  4. WHAT IS PERSONAL DATA?
                </h2>
                <p className="mb-3">
                  &ldquo;Personal Data&rdquo; generally means information relating to an identified natural person or a person who can reasonably be identified, directly or indirectly, through that information.
                </p>
                <p className="mb-3">
                  Depending on your interaction with Business First, this may include your name, contact details, online identifiers, professional information, account information, communications and other information connected to you.
                </p>
                <p className="mb-3">
                  Certain categories of information may receive enhanced protection under applicable law.
                </p>
                <p>
                  Business First does not intentionally seek sensitive personal data unless it is necessary for a legitimate and lawful purpose.
                </p>
              </section>

              {/* 5. PERSONAL DATA WE MAY COLLECT */}
              <section id="section-5" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  5. PERSONAL DATA WE MAY COLLECT
                </h2>
                <p className="mb-4">
                  Depending on how you use Business First, we may collect the following categories of information:
                </p>

                <div className="space-y-4">
                  {/* A */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base font-bold text-[#24214c] mb-2">A. Identity Information</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">This may include:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>full name;</li>
                      <li>username or profile name;</li>
                      <li>photograph;</li>
                      <li>job title, company or organisation;</li>
                      <li>professional designation; and</li>
                      <li>other information you voluntarily provide.</li>
                    </ul>
                  </div>

                  {/* B */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base font-bold text-[#24214c] mb-2">B. Contact Information</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">This may include:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>email address;</li>
                      <li>telephone number;</li>
                      <li>business address, city, or country;</li>
                      <li>social media contact information; and</li>
                      <li>preferred communication method.</li>
                    </ul>
                  </div>

                  {/* C */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base font-bold text-[#24214c] mb-2">C. Professional and Business Information</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Where you interact with Business First professionally or commercially, we may collect:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>company name and industry;</li>
                      <li>job title and professional biography;</li>
                      <li>company website and business contact information;</li>
                      <li>professional social media profiles (e.g. LinkedIn);</li>
                      <li>advertising requirements; and</li>
                      <li>information relevant to interviews, features or media partnerships.</li>
                    </ul>
                  </div>

                  {/* D */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base font-bold text-[#24214c] mb-2">D. Account and Subscription Information</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">If account or subscription functionality is available, we may collect:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-2">
                      <li>login credentials and account preferences;</li>
                      <li>newsletter preferences and subscription status;</li>
                      <li>saved content and reading lists;</li>
                      <li>notification preferences; and</li>
                      <li>account activity.</li>
                    </ul>
                    <p className="text-xs text-gray-500 italic">
                      Passwords should be stored using appropriate technical safeguards and should not be accessible to Business First personnel in plain text.
                    </p>
                  </div>

                  {/* E */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base font-bold text-[#24214c] mb-2">E. Technical and Usage Information</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">When you access our website, certain information may be collected automatically, including:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>IP address and approximate location derived from IP address;</li>
                      <li>browser type, device type, and operating system;</li>
                      <li>language and referring website;</li>
                      <li>pages viewed, links clicked, session duration, and date/time of access;</li>
                      <li>advertising interactions and cookie identifiers; and</li>
                      <li>other diagnostic or analytical telemetry.</li>
                    </ul>
                  </div>

                  {/* F */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base font-bold text-[#24214c] mb-2">F. Marketing and Communication Information</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">We may maintain information regarding:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>newsletter subscriptions and marketing consent;</li>
                      <li>communication preferences;</li>
                      <li>campaigns viewed, emails opened, and links clicked; and</li>
                      <li>unsubscribe requests and previous communications with Business First.</li>
                    </ul>
                  </div>

                  {/* G */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base font-bold text-[#24214c] mb-2">G. Commercial Information</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Where you purchase or enquire about advertising or media services, we may process:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-2">
                      <li>company details and campaign requirements;</li>
                      <li>quotation information and invoice details;</li>
                      <li>transaction references, billing information, and payment status; and</li>
                      <li>contractual documents and correspondence relating to the service.</li>
                    </ul>
                    <p className="text-xs text-gray-500 italic">
                      Where payments are processed by a third-party payment provider, Business First may not directly receive or retain complete payment-card information.
                    </p>
                  </div>

                  {/* H */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base font-bold text-[#24214c] mb-2">H. Editorial Information</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">If you submit content, participate in an interview or communicate with our newsroom, we may collect:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-2">
                      <li>name and professional biography;</li>
                      <li>photographs, video, or audio recordings;</li>
                      <li>interview responses, quotes, press releases, and opinions;</li>
                      <li>company information and supporting documents; and</li>
                      <li>information required to verify a story or contributor.</li>
                    </ul>
                    <p className="text-xs text-gray-500 italic">
                      Different considerations may apply to journalistic and publicly available information under applicable law.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. HOW WE COLLECT PERSONAL DATA */}
              <section id="section-6" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  6. HOW WE COLLECT PERSONAL DATA
                </h2>
                <div className="space-y-3">
                  <p>
                    <strong className="text-[#24214c]">Directly from You:</strong> When you complete a form, subscribe to a newsletter, contact Business First, request advertising information, purchase a service, register for an event, participate in an interview, submit a press release, send us an article, or respond to a survey.
                  </p>
                  <p>
                    <strong className="text-[#24214c]">Automatically:</strong> Through cookies, analytics technologies, server logs, pixels, tags, and similar technologies as you navigate the website.
                  </p>
                  <p>
                    <strong className="text-[#24214c]">From Third Parties:</strong> From advertising agencies, PR agencies, event partners, business partners, analytics providers, social media platforms, payment providers, corporate websites, and publicly accessible sources. Where personal data is obtained from third parties, we expect those parties to have appropriate authority to provide the information where required by law.
                  </p>
                </div>
              </section>

              {/* 7. HOW WE USE PERSONAL DATA */}
              <section id="section-7" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  7. HOW WE USE PERSONAL DATA
                </h2>
                <div className="space-y-4 text-sm md:text-base">
                  <div>
                    <h3 className="font-bold text-[#24214c] mb-1">Providing Business First Services</h3>
                    <p>To operate the website, provide requested content, manage subscriptions, respond to enquiries, administer accounts, deliver newsletters, provide advertising services, fulfil commercial agreements, manage events, and provide customer support.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#24214c] mb-1">Editorial Activities</h3>
                    <p>To research stories, communicate with sources, conduct interviews, verify information, manage contributors, publish authorised professional information, contact companies for comment, maintain editorial records, and operate Business First&apos;s journalism and media activities.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#24214c] mb-1">Personalisation</h3>
                    <p>To understand reader interests and, where lawful and appropriate, personalise content, recommendations, newsletters, website experiences, and advertising.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#24214c] mb-1">Analytics and Improvement</h3>
                    <p>To understand website usage, measure readership, improve content, analyse audience behaviour, identify technical problems, optimise website performance, and develop new products and services.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#24214c] mb-1">Advertising and Commercial Services</h3>
                    <p>To administer advertising campaigns, process enquiries, communicate with advertisers, manage sponsored content, provide campaign reporting, measure advertising performance, maintain commercial records, and manage partnerships.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#24214c] mb-1">Marketing</h3>
                    <p>Subject to applicable law and communication preferences, we may use contact information to send newsletters, Business First updates, event invitations, advertising opportunities, offers, and new service announcements. You may withdraw marketing consent or unsubscribe at any time.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#24214c] mb-1">Security and Legal Compliance</h3>
                    <p>To protect our website, detect fraudulent or malicious activity, prevent unauthorised access, enforce our terms, maintain records, protect our legal rights, respond to lawful governmental or regulatory requests, and comply with applicable UAE laws.</p>
                  </div>
                </div>
              </section>

              {/* 8. BASIS FOR PROCESSING */}
              <section id="section-8" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  8. BASIS FOR PROCESSING
                </h2>
                <p className="mb-3">
                  Where required under applicable UAE data protection law, Business First will process personal data on an appropriate legal basis. Depending on the circumstances, this may include:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>your consent;</li>
                  <li>taking steps at your request before entering into a contract;</li>
                  <li>performance of contractual obligations;</li>
                  <li>compliance with legal obligations;</li>
                  <li>protection of public interests where legally applicable;</li>
                  <li>establishment, exercise or defence of legal claims;</li>
                  <li>protection of your interests or those of another person where recognised by law;</li>
                  <li>processing of information made public by the data subject where permitted; or</li>
                  <li>other grounds authorised under applicable UAE law.</li>
                </ul>
                <p>
                  Where processing relies on consent, we will seek to ensure that consent is clear and capable of being withdrawn. Withdrawal of consent will not ordinarily affect the lawfulness of processing undertaken before consent was withdrawn.
                </p>
              </section>

              {/* 9. COOKIES AND SIMILAR TECHNOLOGIES */}
              <section id="section-9" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  9. COOKIES AND SIMILAR TECHNOLOGIES
                </h2>
                <p className="mb-3">
                  Business First may use cookies and similar technologies to operate and improve its website, including Strictly Necessary Cookies, Preference Cookies, Analytics Cookies, Advertising Cookies, and Social Media Technologies.
                </p>
                <p>
                  Where required, users will be given appropriate choices concerning non-essential cookies. For full details, please review our separate{' '}
                  <Link href="/cookie-policy" className="text-[#FF0202] hover:underline font-semibold">
                    Cookie Policy
                  </Link>.
                </p>
              </section>

              {/* 10. NEWSLETTERS AND DIRECT MARKETING */}
              <section id="section-10" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  10. NEWSLETTERS AND DIRECT MARKETING
                </h2>
                <p className="mb-3">
                  Business First may offer newsletters, news alerts and promotional communications. Where required by applicable law, we will obtain consent before sending direct electronic marketing.
                </p>
                <p className="mb-3">
                  Every marketing email provides a clear method to unsubscribe. You may also contact us at{' '}
                  <a href="mailto:privacy@businessfirstuae.com" className="text-[#FF0202] hover:underline font-medium">
                    privacy@businessfirstuae.com
                  </a>{' '}
                  to change your preferences.
                </p>
                <p className="text-xs text-gray-500 italic">
                  Operational or transactional communications necessary to provide a requested service may still be sent where appropriate.
                </p>
              </section>

              {/* 11. ADVERTISING AND ANALYTICS */}
              <section id="section-11" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  11. ADVERTISING AND ANALYTICS
                </h2>
                <p className="mb-3">
                  Business First may work with third-party providers for website analytics, advertising measurement, audience analysis, campaign management, email marketing, content distribution, and website optimisation.
                </p>
                <p className="mb-3">
                  These providers may process information such as device identifiers, IP addresses, browser information and interactions with our website.
                </p>
                <p>
                  Where third parties act as processors on our behalf, we seek to use providers subject to appropriate contractual and security obligations. Where a third party independently determines how information is processed, its own privacy policy will apply.
                </p>
              </section>

              {/* 12. SHARING OF PERSONAL DATA */}
              <section id="section-12" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  12. SHARING OF PERSONAL DATA
                </h2>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 mb-4 font-semibold text-[#24214c]">
                  Business First does not sell personal data as a business model.
                </div>
                <p className="mb-2">We may disclose personal data where reasonably necessary to:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li><strong>Service Providers:</strong> Hosting, cloud storage, cybersecurity, analytics, email delivery, CRM, payments, IT support, event and video technology.</li>
                  <li><strong>Befirst Media Productions:</strong> Within Befirst Media Productions where necessary for legitimate operational, administrative, financial, technical or legal purposes under appropriate controls.</li>
                  <li><strong>Business Partners:</strong> Event organisers, production partners or other commercial partners where necessary to provide a service and legally permitted.</li>
                  <li><strong>Professional Advisers:</strong> Lawyers, accountants, auditors, and consultants where necessary.</li>
                  <li><strong>Authorities:</strong> Where required by UAE law, court order, governmental request, regulator, or law-enforcement body.</li>
                  <li><strong>Corporate Transactions:</strong> In the event of a merger, restructuring, acquisition, or sale of assets, subject to applicable legal requirements.</li>
                </ul>
              </section>

              {/* 13. INTERNATIONAL AND CROSS-BORDER DATA TRANSFERS */}
              <section id="section-13" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  13. INTERNATIONAL AND CROSS-BORDER DATA TRANSFERS
                </h2>
                <p className="mb-3">
                  Some technology, hosting, analytics, communications or cloud service providers used by Business First may operate outside the UAE. Accordingly, personal data may in some circumstances be processed or stored outside the UAE.
                </p>
                <p>
                  Where cross-border transfers are subject to the UAE Personal Data Protection Law, Business First will seek to ensure that transfers are conducted in accordance with applicable legal requirements, including implementing legally recognised safeguards or relying on another permitted statutory mechanism.
                </p>
              </section>

              {/* 14. DATA SECURITY */}
              <section id="section-14" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  14. DATA SECURITY
                </h2>
                <p className="mb-3">
                  Business First takes reasonable and appropriate technical and organisational measures designed to protect personal data against unauthorised access, accidental loss, unlawful disclosure, alteration, destruction, misuse and other unauthorised processing.
                </p>
                <p className="mb-3">
                  Safeguards include access controls, encryption, secure hosting, backups, firewall monitoring, malware protection, role-based permissions, vendor controls, and confidentiality agreements.
                </p>
                <p className="text-xs text-gray-500 italic">
                  No website, internet transmission or electronic storage system can be guaranteed to be completely secure. Users should therefore also take reasonable precautions to protect their accounts and devices.
                </p>
              </section>

              {/* 15. PERSONAL DATA BREACHES */}
              <section id="section-15" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  15. PERSONAL DATA BREACHES
                </h2>
                <p className="mb-3">
                  Business First maintains procedures intended to identify, assess, manage and respond to personal data incidents.
                </p>
                <p>
                  Where a personal data breach triggers a notification obligation under applicable UAE law, Business First will take the steps required by that law, including notification to the competent authority and/or affected data subjects where applicable, and take reasonable steps to contain and remediate the incident.
                </p>
              </section>

              {/* 16. DATA RETENTION */}
              <section id="section-16" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  16. DATA RETENTION
                </h2>
                <p className="mb-3">
                  Business First will not intentionally retain personal data for longer than reasonably necessary for the purposes for which it was collected, subject to applicable legal, regulatory, contractual, accounting, journalistic and legitimate business requirements.
                </p>
                <p>
                  When personal data is no longer required, we seek to delete, anonymise or securely dispose of it. Published editorial material may be retained as part of Business First&apos;s permanent journalistic archive, subject to applicable law and editorial considerations.
                </p>
              </section>

              {/* 17. YOUR DATA PROTECTION RIGHTS */}
              <section id="section-17" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  17. YOUR DATA PROTECTION RIGHTS
                </h2>
                <p className="mb-3">
                  Subject to the conditions, limitations and exemptions contained in applicable UAE law, individuals may have rights concerning their personal data:
                </p>
                <div className="space-y-3">
                  <p><strong>• Access Information:</strong> Request information regarding personal data processed about you.</p>
                  <p><strong>• Data Portability:</strong> Where legally applicable, request transfer of personal data in an appropriate structured, machine-readable form.</p>
                  <p><strong>• Correction:</strong> Request correction or updating of inaccurate personal data.</p>
                  <p><strong>• Erasure:</strong> Request deletion of personal data where statutory legal grounds for deletion are satisfied.</p>
                  <p><strong>• Restriction:</strong> Request restriction or cessation of certain processing in circumstances recognised by law.</p>
                  <p><strong>• Object to Decisions:</strong> Raise objections concerning automated decisions where rights are provided by law.</p>
                  <p><strong>• Withdraw Consent:</strong> Where processing is based on consent, withdraw that consent at any time.</p>
                </div>
                <p className="text-xs text-gray-500 mt-3 italic">
                  Certain requests may be limited where information must be retained or processed for legal, public-interest, journalistic, contractual or claims purposes.
                </p>
              </section>

              {/* 18. HOW TO EXERCISE YOUR RIGHTS */}
              <section id="section-18" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  18. HOW TO EXERCISE YOUR RIGHTS
                </h2>
                <p className="mb-3">Requests concerning personal data may be submitted to:</p>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 text-sm mb-3">
                  <p className="font-bold text-[#24214c]">Privacy Contact — Business First / Befirst Media Productions</p>
                  <p className="text-gray-700 mt-1">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:privacy@businessfirstuae.com" className="text-[#FF0202] hover:underline">
                      privacy@businessfirstuae.com
                    </a>
                  </p>
                  <p className="text-gray-700 mt-0.5"><strong>Address:</strong> Dubai, United Arab Emirates</p>
                </div>
                <p className="text-sm text-gray-600">
                  Please include sufficient information to allow us to identify the relevant data. We may request reasonable evidence of identity before processing a request to prevent unauthorised disclosure or deletion.
                </p>
              </section>

              {/* 19. AUTOMATED PROCESSING AND PROFILING */}
              <section id="section-19" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  19. AUTOMATED PROCESSING AND PROFILING
                </h2>
                <p className="mb-3">
                  Business First may use technology to analyse audience interests, content engagement and website activity.
                </p>
                <p>
                  Where automated processing produces legal consequences or significantly affects an individual, Business First will seek to comply with applicable transparency, objection and human-review requirements. Routine analytics and recommendations do not necessarily constitute legally significant automated decision-making.
                </p>
              </section>

              {/* 20. CHILDREN'S PRIVACY */}
              <section id="section-20" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  20. CHILDREN&apos;S PRIVACY
                </h2>
                <p className="mb-3">
                  Business First is primarily a business news and professional media platform and is not designed specifically for children. We do not knowingly collect personal data from children for commercial marketing purposes.
                </p>
                <p>
                  If we become aware that personal data relating to a child has been collected in circumstances requiring parental or legal authorisation, we will take appropriate steps in accordance with applicable law.
                </p>
              </section>

              {/* 21. EDITORIAL, JOURNALISTIC AND PUBLIC INFORMATION */}
              <section id="section-21" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  21. EDITORIAL, JOURNALISTIC AND PUBLIC INFORMATION
                </h2>
                <p className="mb-3">
                  As a business news and media organisation, Business First may process information relating to business leaders, executives, entrepreneurs, public figures, companies and other persons for legitimate journalistic and editorial activities.
                </p>
                <p className="mb-3">
                  Information may be obtained from interviews, press releases, corporate announcements, public records, regulatory filings, stock exchange disclosures, conferences, and authorised representatives.
                </p>
                <p>
                  Business First considers relevant legal rights, exemptions, journalistic responsibilities and the public interest when handling requests relating to published editorial material. A privacy request does not automatically require alteration or removal of accurate journalistic content where retention or publication is lawful.
                </p>
              </section>

              {/* 22. USER-GENERATED CONTENT */}
              <section id="section-22" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  22. USER-GENERATED CONTENT
                </h2>
                <p className="mb-3">
                  Where Business First permits comments, submissions or other user-generated content, users should avoid publicly posting unnecessary personal or sensitive information.
                </p>
                <p>
                  Information voluntarily published in a public area may become accessible to other users and could be copied or redistributed outside Business First&apos;s control. Business First may moderate or remove content in accordance with its Terms &amp; Conditions and applicable law.
                </p>
              </section>

              {/* 23. EXTERNAL LINKS */}
              <section id="section-23" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  23. EXTERNAL LINKS
                </h2>
                <p className="mb-3">
                  Business First articles may contain links to third-party websites, government portals, corporate websites, social networks and other external services.
                </p>
                <p>
                  Business First does not control the privacy practices of independently operated third-party websites. Users should review the privacy policies of those services before providing personal data.
                </p>
              </section>

              {/* 24. SOCIAL MEDIA */}
              <section id="section-24" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  24. SOCIAL MEDIA
                </h2>
                <p className="mb-3">
                  Business First maintains profiles on platforms such as LinkedIn, Instagram, Facebook, X, YouTube and other networks.
                </p>
                <p>
                  When you interact with Business First through these platforms, both Business First and the relevant platform may process information relating to that interaction under their respective policies.
                </p>
              </section>

              {/* 25. THIRD-PARTY EMBEDDED CONTENT */}
              <section id="section-25" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  25. THIRD-PARTY EMBEDDED CONTENT
                </h2>
                <p className="mb-3">
                  Business First may embed videos, social media posts, maps, charts, podcasts, advertising, and forms. Embedded services may collect technical or usage information subject to their own privacy practices.
                </p>
                <p>
                  Where legally required, non-essential third-party technologies should be activated only in accordance with appropriate cookie or consent controls.
                </p>
              </section>

              {/* 26. ADVERTISERS, SPONSORS AND COMMERCIAL PARTNERS */}
              <section id="section-26" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  26. ADVERTISERS, SPONSORS AND COMMERCIAL PARTNERS
                </h2>
                <p className="mb-3">
                  Business First maintains a strict distinction between editorial content and commercial partnerships. Advertisers or sponsors do not automatically receive personal information about individual Business First readers.
                </p>
                <p>
                  Campaign statistics provided to advertisers are aggregated and non-identifying. Personal data will only be shared with an advertiser or commercial partner where there is an appropriate legal basis consistent with disclosures made to the user.
                </p>
              </section>

              {/* 27. CHANGES TO THIS PRIVACY POLICY */}
              <section id="section-27" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  27. CHANGES TO THIS PRIVACY POLICY
                </h2>
                <p className="mb-3">
                  Business First may update this Privacy Policy from time to time to reflect changes to UAE law, regulatory guidance, website enhancements, new services, or technological developments.
                </p>
                <p>
                  The updated policy will be published on this page with a revised &ldquo;Last Updated&rdquo; date. Users are encouraged to review this Privacy Policy periodically.
                </p>
              </section>

              {/* 28. COMPLAINTS */}
              <section id="section-28" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  28. COMPLAINTS
                </h2>
                <p className="mb-3">
                  If you have concerns about how Business First processes your personal data, please contact our Data Protection Officer first so that we can review the matter:
                </p>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 text-sm mb-3">
                  <p className="text-gray-700"><strong>Privacy Contact:</strong> Data Protection Officer</p>
                  <p className="text-gray-700 mt-1">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:privacy@businessfirstuae.com" className="text-[#FF0202] hover:underline font-medium">
                      privacy@businessfirstuae.com
                    </a>
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  You may also have the right to submit a complaint to the competent UAE data protection authority or another competent regulator in accordance with applicable law.
                </p>
              </section>

              {/* 29. GOVERNING LAW */}
              <section id="section-29" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  29. GOVERNING LAW
                </h2>
                <p className="mb-3">
                  This Privacy Policy and Business First&apos;s processing of personal data are subject to applicable laws and regulations of the United Arab Emirates, including Federal Decree-Law No. 45 of 2021 Concerning the Protection of Personal Data where applicable.
                </p>
                <p>
                  If a specific activity falls within another applicable UAE data protection regime or sector-specific law, that regime will apply to the relevant processing.
                </p>
              </section>

              {/* 30. CONTACT US */}
              <section id="section-30" className="scroll-mt-24 pt-4 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  30. CONTACT US
                </h2>
                <p className="mb-4">
                  Questions, concerns or requests relating to this Privacy Policy or your personal data may be directed to:
                </p>

                <div className="p-6 rounded-2xl bg-[#f8f9fb] border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-[#24214c] block font-bold text-base mb-1">BUSINESS FIRST</strong>
                    <p className="text-gray-600">A division of Befirst Media Productions</p>
                    <p className="text-gray-600 mt-1">Dubai, United Arab Emirates</p>
                    <p className="text-gray-600 mt-1">
                      <strong className="text-gray-800">Website:</strong>{' '}
                      <a href="https://businessfirstuae.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0202] hover:underline">
                        businessfirstuae.com
                      </a>
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Privacy / DPO:</strong>{' '}
                      <a href="mailto:legal@businessfirstuae.com" className="text-[#FF0202] hover:underline">
legal@businessfirstuae.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">General Email:</strong>{' '}
                      <a href="mailto:info@businessfirstuae.com" className="text-[#FF0202] hover:underline">
                        info@businessfirstuae.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Telephone:</strong>{' '}
                      <a href="tel:+97141234567" className="text-gray-800 hover:text-[#FF0202]">
                        +971 4 123 4567
                      </a>
                    </p>
                  </div>
                </div>

                {/* Privacy Commitment Box */}
                <div className="mt-6 p-6 rounded-2xl bg-[#24214c] text-white shadow-md">
                  <h3 className="text-lg font-bold font-newsreader text-[#fbbf24] mb-2 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-[#fbbf24]" />
                    PRIVACY COMMITMENT
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    At Business First, credibility is fundamental to our journalism and to the way we conduct business. We believe the personal information entrusted to us should be handled transparently, responsibly and securely.
                  </p>
                  <p className="text-sm font-semibold text-white font-newsreader mt-3">
                    Business First — News That Means Business.
                  </p>
                </div>
              </section>

            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <PrivacySidebar />

        </div>

        {/* Ad Banner matching website standards */}
        <div className="w-full py-8 md:py-12">
          <FullWidthAdBanner
            ratio="privacy_bottom"
            targetPage="privacy"
            imageUrl="/ads/invest-first_1600x140.jpeg"
          />
        </div>
      </SectionContainer>
    </main>
  );
}
