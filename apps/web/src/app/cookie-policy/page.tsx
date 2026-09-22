import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';
import FullWidthAdBanner from '@/components/FullWidthAdBanner';
import CookieSidebar from '@/components/cookie-policy/CookieSidebar';
import { ShieldCheck, Cookie } from 'lucide-react';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps(`policy/cookie`);
  return buildMetadata({
    ...seoProps,
    title: 'Cookie Policy | Business First UAE',
    description: 'Learn how Business First, a division of Befirst Media Productions, uses cookies and similar technologies to manage sessions, understand readership, and enhance digital services.',
  });
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full  py-8 md:py-12">
      <ServerSeo slug="policy/cookie" />
      
      {/* Breadcrumbs matching website design */}
      <SectionContainer className="bg-white py-4 mt-4">
        <div className="flex items-center text-xs md:text-sm font-semibold tracking-wide text-[#24214c]">
          <Link href="/" className="hover:text-[#FF0202] transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-[#FF0202]">Cookie Policy</span>
        </div>
      </SectionContainer>

      {/* Main Section matching website layout */}
      <SectionContainer className="bg-white" overflowVisible={true}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">

          {/* Left Column: Cookie Policy Editorial Content */}
          <div className="w-full lg:flex-1 flex flex-col gap-6">

            {/* Title with matching site style (red title + gray divider) */}
            <div className="flex items-center w-full gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
                Cookie Policy
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
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3 flex items-center gap-2">
                  1. INTRODUCTION
                </h2>
                <p className="mb-3">
                  This Cookie Policy explains how Business First, a division of Befirst Media Productions (“Business First”, “we”, “us” or “our”), uses cookies and similar technologies when you visit or interact with our website and digital services.
                </p>
                <p className="mb-2">This Cookie Policy should be read together with our:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li><Link href="/privacy-policy" className="text-[#FF0202] hover:underline font-medium">Privacy Policy</Link>;</li>
                  <li><Link href="/terms" className="text-[#FF0202] hover:underline font-medium">Terms &amp; Conditions</Link>; and</li>
                  <li>any additional privacy or consent notices displayed on our website.</li>
                </ul>
                <p>
                  Business First is committed to using cookies and similar technologies transparently and responsibly and to providing users with appropriate choices regarding non-essential tracking technologies.
                </p>
              </section>

              {/* 2. WHAT ARE COOKIES? */}
              <section id="section-2" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  2. WHAT ARE COOKIES?
                </h2>
                <p className="mb-3">
                  Cookies are small text files stored on your computer, mobile phone, tablet or other device when you visit a website.
                </p>
                <p className="mb-3">
                  Cookies allow websites to recognise devices, remember preferences, maintain sessions, understand how websites are used and, where applicable, support advertising and content personalisation.
                </p>
                <p className="mb-2">Cookies may store or generate information including:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>session identifiers;</li>
                  <li>browser information;</li>
                  <li>device information;</li>
                  <li>user preferences;</li>
                  <li>IP-related information;</li>
                  <li>website activity;</li>
                  <li>pages viewed;</li>
                  <li>links clicked;</li>
                  <li>timestamps;</li>
                  <li>advertising identifiers; and</li>
                  <li>other technical information.</li>
                </ul>
                <p>
                  Some cookie-related information may constitute personal data where it can identify or relate to an identifiable individual.
                </p>
              </section>

              {/* 3. WHY BUSINESS FIRST USES COOKIES */}
              <section id="section-3" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  3. WHY BUSINESS FIRST USES COOKIES
                </h2>
                <p className="mb-2">Business First may use cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>operate and secure our website;</li>
                  <li>maintain user sessions;</li>
                  <li>remember preferences;</li>
                  <li>improve website functionality;</li>
                  <li>analyse website usage;</li>
                  <li>understand readership behaviour;</li>
                  <li>measure content performance;</li>
                  <li>improve our editorial products;</li>
                  <li>measure advertising campaigns;</li>
                  <li>manage newsletter and subscription functionality;</li>
                  <li>optimise website performance;</li>
                  <li>personalise content where appropriate;</li>
                  <li>prevent fraud and abuse; and</li>
                  <li>provide relevant advertising where legally permitted.</li>
                </ul>
              </section>

              {/* 4. TYPES OF COOKIES WE MAY USE */}
              <section id="section-4" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  4. TYPES OF COOKIES WE MAY USE
                </h2>
                <p className="mb-4">
                  Business First may use the following categories of cookies:
                </p>

                <div className="space-y-6">
                  {/* A */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base md:text-lg font-bold text-[#24214c] mb-2">
                      A. STRICTLY NECESSARY COOKIES
                    </h3>
                    <p className="mb-2 text-sm md:text-base">
                      These cookies are required for the website to function properly. They may be used for:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-sm md:text-base mb-3">
                      <li>website security;</li>
                      <li>session management;</li>
                      <li>network management;</li>
                      <li>load balancing;</li>
                      <li>authentication;</li>
                      <li>fraud prevention;</li>
                      <li>remembering cookie-consent choices; and</li>
                      <li>providing services specifically requested by the user.</li>
                    </ul>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      Because these cookies are necessary for core functionality, they may not always be capable of being disabled through our cookie preference tool. Disabling them through your browser may cause parts of the website to stop functioning correctly.
                    </p>
                  </div>

                  {/* B */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base md:text-lg font-bold text-[#24214c] mb-2">
                      B. FUNCTIONAL COOKIES
                    </h3>
                    <p className="mb-2 text-sm md:text-base">
                      Functional cookies help improve usability and remember choices made by visitors. They may remember:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-sm md:text-base mb-3">
                      <li>preferred language;</li>
                      <li>display settings;</li>
                      <li>location or regional preferences;</li>
                      <li>newsletter settings;</li>
                      <li>previously selected options; and</li>
                      <li>other customisation preferences.</li>
                    </ul>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      If these cookies are disabled, certain personalised website functions may not operate as intended.
                    </p>
                  </div>

                  {/* C */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base md:text-lg font-bold text-[#24214c] mb-2">
                      C. ANALYTICS AND PERFORMANCE COOKIES
                    </h3>
                    <p className="mb-2 text-sm md:text-base">
                      These cookies help us understand how users interact with Business First. They may collect information about pages visited, time spent on pages, traffic sources, browser and device types, navigation patterns, article engagement, website performance, error messages, and user interactions.
                    </p>
                    <p className="mb-2 text-sm md:text-base">
                      We may use this information to measure readership, improve website design, identify popular content, optimise editorial strategy, and improve technical performance. Where appropriate, analytics data may be aggregated or anonymised.
                    </p>
                  </div>

                  {/* D */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base md:text-lg font-bold text-[#24214c] mb-2">
                      D. ADVERTISING AND TARGETING COOKIES
                    </h3>
                    <p className="mb-2 text-sm md:text-base">
                      Where implemented, Business First and authorised advertising partners may use cookies or similar technologies to support advertising. These technologies may be used to measure advertising performance, limit the number of times an advertisement is shown, understand whether users interact with advertisements, build aggregated audience insights, measure campaign reach, attribute conversions, and display advertising based on relevant interests where legally permitted.
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      Advertising cookies may recognise a browser or device across websites and services. Where applicable and required, these cookies should be activated only after appropriate user consent.
                    </p>
                  </div>

                  {/* E */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base md:text-lg font-bold text-[#24214c] mb-2">
                      E. SOCIAL MEDIA COOKIES
                    </h3>
                    <p className="mb-2 text-sm md:text-base">
                      Business First may integrate services from social media platforms such as LinkedIn, Instagram, Facebook, X (Twitter), YouTube, and other platforms. These integrations allow users to share Business First articles, watch embedded videos, interact with social posts, or access Business First social channels.
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      Third-party social platforms may set their own cookies when embedded content or social functions are used and may independently collect information according to their own policies. Business First does not control independently operated third-party cookies.
                    </p>
                  </div>

                  {/* F */}
                  <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="text-base md:text-lg font-bold text-[#24214c] mb-2">
                      F. VIDEO, PODCAST AND EMBEDDED CONTENT COOKIES
                    </h3>
                    <p className="mb-2 text-sm md:text-base">
                      Business First may embed content from third-party platforms, including YouTube, video-hosting providers, podcast players, audio platforms, charts, social media posts, maps, and other interactive tools. These providers may set cookies or collect technical information when their embedded content is loaded or used. Where technically and legally appropriate, non-essential embedded services may be blocked until the relevant consent is provided.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. FIRST-PARTY AND THIRD-PARTY COOKIES */}
              <section id="section-5" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  5. FIRST-PARTY AND THIRD-PARTY COOKIES
                </h2>
                <p className="mb-3">Cookies may be classified according to who places them:</p>
                <div className="space-y-3">
                  <p>
                    <strong className="text-[#24214c]">First-Party Cookies:</strong> These cookies are set directly by Business First or its website infrastructure. They support essential website functions, preferences, security, analytics, and user experience.
                  </p>
                  <p>
                    <strong className="text-[#24214c]">Third-Party Cookies:</strong> Third-party cookies may be set by external service providers used by Business First, including providers of analytics, advertising, social media, video hosting, email marketing, website optimisation, content delivery, and other digital services. Third-party providers are responsible for cookies they set independently and process information according to their own privacy policies.
                  </p>
                </div>
              </section>

              {/* 6. SESSION AND PERSISTENT COOKIES */}
              <section id="section-6" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  6. SESSION AND PERSISTENT COOKIES
                </h2>
                <div className="space-y-3">
                  <p>
                    <strong className="text-[#24214c]">Session Cookies:</strong> These exist only during a browsing session and are generally deleted when the browser is closed. They are used for navigation, security, temporary settings, and session continuity.
                  </p>
                  <p>
                    <strong className="text-[#24214c]">Persistent Cookies:</strong> These remain on a device for a defined period or until deleted manually. They are used to remember preferences, recognise returning visitors, remember consent choices, and support analytics or advertising. Cookie duration depends on the purpose of the relevant cookie.
                  </p>
                </div>
              </section>

              {/* 7. SIMILAR TECHNOLOGIES */}
              <section id="section-7" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  7. SIMILAR TECHNOLOGIES
                </h2>
                <p className="mb-2">
                  In addition to traditional cookies, Business First may use or permit technologies such as:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>pixels;</li>
                  <li>web beacons;</li>
                  <li>tags;</li>
                  <li>SDKs;</li>
                  <li>local storage (HTML5);</li>
                  <li>session storage; and</li>
                  <li>device identifiers.</li>
                </ul>
                <p>
                  For the purposes of this policy, references to &ldquo;cookies&rdquo; include these similar tracking technologies.
                </p>
              </section>

              {/* 8. COOKIE CONSENT */}
              <section id="section-8" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  8. COOKIE CONSENT
                </h2>
                <p className="mb-3">
                  Where consent is required for particular cookies or similar technologies, Business First will seek to provide a cookie consent mechanism through the website.
                </p>
                <p className="mb-2">When you first visit Business First, you may be presented with options such as:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>Accept All</li>
                  <li>Reject Non-Essential</li>
                  <li>Manage Preferences</li>
                </ul>
                <p>
                  You should be able to make a meaningful choice regarding non-essential categories. Strictly necessary cookies may remain active because they are required for website operation. Where Business First relies on consent for cookie-related processing, we will seek to make that consent clear and capable of being withdrawn.
                </p>
              </section>

              {/* 9. COOKIE PREFERENCE CENTRE */}
              <section id="section-9" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  9. COOKIE PREFERENCE CENTRE
                </h2>
                <p className="mb-3">
                  Where available, the Business First cookie preference centre may allow users to enable or disable categories such as Necessary Cookies, Functional Cookies, Analytics Cookies, Advertising Cookies, and Social Media Cookies.
                </p>
                <p>
                  Your preference may itself be stored using an essential cookie so that we can remember your selection. You may change your preferences at any time by accessing cookie settings from the website footer or cookie banner.
                </p>
              </section>

              {/* 10. WITHDRAWING CONSENT */}
              <section id="section-10" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  10. WITHDRAWING CONSENT
                </h2>
                <p className="mb-3">
                  Where cookie processing is based on consent, you may withdraw that consent at any time. Withdrawal may be available through the Business First cookie preference centre, your browser settings, or other controls provided by the relevant third-party service.
                </p>
                <p>
                  Withdrawing consent does not ordinarily affect processing that lawfully took place before consent was withdrawn.
                </p>
              </section>

              {/* 11. MANAGING COOKIES THROUGH YOUR BROWSER */}
              <section id="section-11" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  11. MANAGING COOKIES THROUGH YOUR BROWSER
                </h2>
                <p className="mb-2">
                  Most browsers allow users to manage cookies through their settings. Depending on your browser, you may be able to:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>view stored cookies;</li>
                  <li>block all cookies;</li>
                  <li>block third-party cookies;</li>
                  <li>delete cookies;</li>
                  <li>receive alerts when cookies are set; or</li>
                  <li>clear browsing data.</li>
                </ul>
                <p>
                  Please note that blocking all cookies may affect the functionality of Business First and other websites. Browser settings vary by provider and version, so users should refer to their browser&apos;s current support information for specific instructions.
                </p>
              </section>

              {/* 12. ANALYTICS SERVICES */}
              <section id="section-12" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  12. ANALYTICS SERVICES
                </h2>
                <p className="mb-3">
                  Business First may use third-party analytics services (such as Google Analytics) to understand website performance and visitor behaviour. Analytics providers may process IP address, device type, browser, pages viewed, session duration, traffic source, interaction events, and approximate geographic information to improve editorial content and platform design.
                </p>
              </section>

              {/* 13. ADVERTISING TECHNOLOGIES */}
              <section id="section-13" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  13. ADVERTISING TECHNOLOGIES
                </h2>
                <p className="mb-3">
                  Business First may use advertising technologies to sell, serve, measure or optimise advertising. Where applicable, these technologies may process advertising identifiers, cookie identifiers, device information, page activity, advertisement interactions, referral information, and campaign performance data. Where consent is required, advertising technologies should remain disabled until consent has been provided.
                </p>
              </section>

              {/* 14. NEWSLETTER AND EMAIL TRACKING */}
              <section id="section-14" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  14. NEWSLETTER AND EMAIL TRACKING
                </h2>
                <p className="mb-3">
                  Where permitted and appropriately disclosed, Business First newsletters or commercial emails may contain technologies that help us understand whether an email was delivered, opened, or clicked, and which content generated engagement. This information is used to improve our editorial newsletters and measure campaigns. Users may unsubscribe at any time via the unsubscribe link in the footer of every newsletter.
                </p>
              </section>

              {/* 15. THIRD-PARTY WEBSITES */}
              <section id="section-15" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  15. THIRD-PARTY WEBSITES
                </h2>
                <p>
                  Business First may link to websites operated by government authorities, businesses, advertisers, event organisers, sources, partner organisations, and other third parties. Once you leave Business First, the privacy and cookie practices of the third-party website will apply. Business First is not responsible for cookies or tracking technologies independently used by third-party websites.
                </p>
              </section>

              {/* 16. ADVERTISERS AND COMMERCIAL PARTNERS */}
              <section id="section-16" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  16. ADVERTISERS AND COMMERCIAL PARTNERS
                </h2>
                <p className="mb-3">
                  Business First may provide advertisers with campaign statistics such as views, impressions, clicks, engagement, campaign delivery, and other performance metrics. Where possible and appropriate, advertiser reporting is aggregated and does not unnecessarily identify individual readers.
                </p>
                <p>
                  Business First does not provide advertisers with personal information about individual users merely because those users viewed an advertisement. Any sharing of identifiable information must have an appropriate legal basis and be consistent with our Privacy Policy.
                </p>
              </section>

              {/* 17. COOKIE RETENTION */}
              <section id="section-17" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  17. COOKIE RETENTION
                </h2>
                <p>
                  Different cookies remain active for different periods depending on their technical purpose, user consent, service provider, and security requirements. Business First seeks to ensure that cookies are not retained longer than reasonably necessary for their stated purpose.
                </p>
              </section>

              {/* 18. DATA TRANSFERS */}
              <section id="section-18" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  18. DATA TRANSFERS
                </h2>
                <p>
                  Some third-party service providers used for analytics, advertising, hosting, social media or other digital functionality may process information outside the United Arab Emirates. Where cookie-related information constitutes personal data and is transferred internationally, Business First handles such transfers in accordance with applicable UAE data protection requirements.
                </p>
              </section>

              {/* 19. SECURITY */}
              <section id="section-19" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  19. SECURITY
                </h2>
                <p>
                  Business First takes reasonable technical and organisational measures designed to protect personal data and website information against unauthorised access, misuse, alteration, unlawful processing, disclosure, and loss. However, no internet service or tracking technology can be guaranteed to be completely secure.
                </p>
              </section>

              {/* 20. CHILDREN */}
              <section id="section-20" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  20. CHILDREN
                </h2>
                <p>
                  Business First is primarily a professional business news and media platform and is not designed specifically for children. We do not intentionally use cookies for targeted commercial profiling of children. Where services accessible to children trigger additional legal obligations, Business First will implement appropriate safeguards in accordance with applicable UAE law.
                </p>
              </section>

              {/* 21. UAE DATA PROTECTION FRAMEWORK */}
              <section id="section-21" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  21. UAE DATA PROTECTION FRAMEWORK
                </h2>
                <p className="mb-2">
                  Where cookie technologies involve the processing of personal data, Business First will seek to process that data in accordance with applicable UAE legislation, including Federal Decree-Law No. 45 of 2021 Concerning the Protection of Personal Data, where applicable. This includes requirements relating to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>lawful processing;</li>
                  <li>transparency;</li>
                  <li>purpose limitation;</li>
                  <li>data minimisation;</li>
                  <li>security;</li>
                  <li>retention;</li>
                  <li>consent where relied upon;</li>
                  <li>data subject rights; and</li>
                  <li>international data transfers.</li>
                </ul>
              </section>

              {/* 22. CHANGES TO THIS COOKIE POLICY */}
              <section id="section-22" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  22. CHANGES TO THIS COOKIE POLICY
                </h2>
                <p>
                  Business First may update this Cookie Policy from time to time to reflect changes in UAE law, regulatory developments, website functionality, or our data practices. The most recent version will be displayed on the Business First website with an updated Last Updated date. Where a material change requires additional notice or consent, Business First will take appropriate steps.
                </p>
              </section>

              {/* 23. COOKIE INVENTORY */}
              <section id="section-23" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  23. COOKIE INVENTORY
                </h2>
                <p className="mb-4">
                  Business First maintains an accurate internal and website-facing cookie inventory structure:
                </p>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full text-left text-xs md:text-sm text-gray-700">
                    <thead className="bg-[#f8f9fb] text-[#24214c] font-bold border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4">Cookie / Technology</th>
                        <th className="py-3 px-4">Provider</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Purpose</th>
                        <th className="py-3 px-4">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-gray-900">bf_session</td>
                        <td className="py-3 px-4">Business First</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">Necessary</span></td>
                        <td className="py-3 px-4">Maintains active session state and security verification</td>
                        <td className="py-3 px-4">Session</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-gray-900">bf_consent</td>
                        <td className="py-3 px-4">Business First</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">Necessary</span></td>
                        <td className="py-3 px-4">Stores user cookie preference choices</td>
                        <td className="py-3 px-4">12 Months</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-gray-900">_ga, _gid</td>
                        <td className="py-3 px-4">Google Analytics</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">Analytics</span></td>
                        <td className="py-3 px-4">Distinguishes unique users and measures site traffic engagement</td>
                        <td className="py-3 px-4">Up to 2 Years</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-gray-900">bf_display_pref</td>
                        <td className="py-3 px-4">Business First</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">Functional</span></td>
                        <td className="py-3 px-4">Remembers regional reading and display preferences</td>
                        <td className="py-3 px-4">6 Months</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-gray-900">ad_partner_id</td>
                        <td className="py-3 px-4">Ad Partners</td>
                        <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">Advertising</span></td>
                        <td className="py-3 px-4">Delivers contextual banner ads and frequency capping</td>
                        <td className="py-3 px-4">90 Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 24. CONTACT US */}
              <section id="section-24" className="scroll-mt-24 pt-4 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  24. CONTACT US
                </h2>
                <p className="mb-4">
                  If you have questions about this Cookie Policy or the way Business First uses cookies and similar technologies, contact:
                </p>

                <div className="p-6 rounded-2xl bg-[#f8f9fb] border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-[#24214c] block font-bold text-base mb-1">BUSINESS FIRST</strong>
                    <p className="text-gray-600">A division of Befirst Media Productions</p>
                    <p className="text-gray-600 mt-1">United Arab Emirates</p>
                    <p className="text-gray-600 mt-1">
                      <strong className="text-gray-800">Website:</strong>{' '}
                      <a href="https://businessfirstnews.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0202] hover:underline">
                        businessfirstnews.com
                      </a>
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Privacy Email:</strong>{' '}
                      <a href="mailto:privacy@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                        privacy@businessfirstnews.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">General Email:</strong>{' '}
                      <a href="mailto:info@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                        info@businessfirstnews.com
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

                {/* Business First Privacy Commitment Box */}
                <div className="mt-6 p-6 rounded-2xl bg-[#24214c] text-white shadow-md">
                  <h3 className="text-lg font-bold font-newsreader text-[#fbbf24] mb-2 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-[#fbbf24]" />
                    BUSINESS FIRST PRIVACY COMMITMENT
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    Business First believes that readers should understand how digital technologies are used when they engage with our journalism and media services. Our aim is to use cookies responsibly, minimise unnecessary tracking and give users meaningful control over non-essential technologies.
                  </p>
                  <p className="text-sm font-semibold text-white font-newsreader mt-3">
                    Business First — News That Means Business.
                  </p>
                </div>
              </section>

            </div>
          </div>

          {/* Right Column: Sticky Legal Summary & Navigation Sidebar */}
          <CookieSidebar />

        </div>

        {/* Ad Banner matching website standards */}
       
      </SectionContainer>
    </main>
  );
}
