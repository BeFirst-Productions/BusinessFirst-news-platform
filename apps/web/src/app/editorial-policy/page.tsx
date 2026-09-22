import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';
import FullWidthAdBanner from '@/components/FullWidthAdBanner';
import EditorialSidebar from '@/components/editorial-policy/EditorialSidebar';
import { CheckCircle2, ShieldCheck, Newspaper, AlertCircle, Compass, Target, Scale, Clock, Sparkles } from 'lucide-react';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps(`policy/editorial`);
  return buildMetadata({
    ...seoProps,
    title: 'Editorial Policy | Business First UAE',
    description: 'Explore the editorial values, reporting standards, source verification rules, and UAE media compliance guidelines that guide Business First journalism.',
  });
}

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full  py-8 md:py-12">
      <ServerSeo slug="policy/editorial" />
      
      {/* Breadcrumbs matching website design */}
      <SectionContainer className="bg-white py-4 mt-4">
        <div className="flex items-center text-xs md:text-sm font-semibold tracking-wide text-[#24214c]">
          <Link href="/" className="hover:text-[#FF0202] transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-[#FF0202]">Editorial Policy</span>
        </div>
      </SectionContainer>

      {/* Main Section matching website layout */}
      <SectionContainer className="bg-white" overflowVisible={true}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">

          {/* Left Column: Editorial Policy Content */}
          <div className="w-full lg:flex-1 flex flex-col gap-6">

            {/* Title with matching site style (red title + gray divider) */}
            <div className="flex items-center w-full gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
                Editorial Policy
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

            {/* Highlight Editorial Commitment Banner */}
            <div className="p-6 rounded-2xl bg-[#f8f9fb] border-l-4 border-[#FF0202] border border-gray-200/80 shadow-2xs">
              <h2 className="text-lg md:text-xl font-bold text-[#24214c] font-newsreader mb-2">
                Our Editorial Commitment
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                Business First exists to help people understand the businesses, markets, policies, investments, leaders and ideas shaping the UAE economy.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24214c] text-white text-xs font-bold uppercase tracking-wider">
                What happened. Why it matters. What&apos;s next.
              </div>
            </div>

            {/* Introductory Statement */}
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                We believe speed should never come at the expense of accuracy, commercial relationships should never be disguised as independent journalism, and strong business reporting should provide readers with context rather than simply repeat announcements.
              </p>
              <p>
                Business First is committed to producing journalism that is accurate, responsible, relevant, clear and professionally presented, while respecting the laws, culture, values and media standards of the United Arab Emirates.
              </p>
              <p className="text-xs text-gray-500 italic">
                This Editorial Policy applies to Business First journalists, editors, freelancers, contributors, photographers, videographers, producers and other persons involved in creating or approving editorial content across our website, newsletters, social media channels, video, podcasts, interviews and other publishing platforms.
              </p>
            </div>

            {/* Policy Body: Sections 1 through 59 */}
            <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">

              {/* 1. OUR EDITORIAL MISSION */}
              <section id="section-mission" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  1. OUR EDITORIAL MISSION
                </h2>
                <p className="mb-3">
                  Business First aims to become a credible source of UAE-focused business information for entrepreneurs, executives, investors, professionals, companies and decision-makers.
                </p>
                <p className="mb-3 font-semibold text-[#24214c]">
                  Our role is not simply to publish more news. Our role is to identify what matters.
                </p>
                <p className="mb-2">We aim to explain important developments across:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700 mb-3">
                  <div>• Business &amp; Corporate Affairs</div>
                  <div>• UAE Economy</div>
                  <div>• Government &amp; Policy</div>
                  <div>• Finance &amp; Investment</div>
                  <div>• Markets</div>
                  <div>• Real Estate &amp; Infrastructure</div>
                  <div>• Startups &amp; Entrepreneurship</div>
                  <div>• Technology &amp; Artificial Intelligence</div>
                  <div>• Trade &amp; International Investment</div>
                  <div>• Leadership</div>
                  <div>• SMEs</div>
                  <div>• Aviation &amp; Logistics</div>
                  <div>• Energy &amp; Sustainability</div>
                  <div>• Healthcare Business</div>
                  <div>• Hospitality &amp; Tourism</div>
                  <div>• Events &amp; Conferences</div>
                  <div>• Innovation</div>
                  <div>• Business Lifestyle</div>
                </div>
                <p className="italic text-gray-600">
                  Our journalism should leave readers better informed than they were before they opened the story.
                </p>
              </section>

              {/* 2. OUR CORE EDITORIAL VALUES */}
              <section id="section-values" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  2. OUR CORE EDITORIAL VALUES
                </h2>
                <p className="mb-4">Every Business First story should reflect six foundational principles:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="font-bold text-[#24214c] text-sm md:text-base mb-1">Accuracy</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Facts come before speed.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="font-bold text-[#24214c] text-sm md:text-base mb-1">Credibility</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Information should come from identifiable, reliable and appropriate sources.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="font-bold text-[#24214c] text-sm md:text-base mb-1">Clarity</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Business information should be understandable without unnecessary jargon.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="font-bold text-[#24214c] text-sm md:text-base mb-1">Relevance</h3>
                    <p className="text-xs sm:text-sm text-gray-600">We ask why a development matters to our business audience.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="font-bold text-[#24214c] text-sm md:text-base mb-1">Context</h3>
                    <p className="text-xs sm:text-sm text-gray-600">A press release tells readers what happened. Journalism should explain what it means.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200">
                    <h3 className="font-bold text-[#24214c] text-sm md:text-base mb-1">Responsibility</h3>
                    <p className="text-xs sm:text-sm text-gray-600">We recognise that published information can affect individuals, companies, markets and reputations.</p>
                  </div>
                </div>
              </section>

              {/* 3. UAE MEDIA STANDARDS */}
              <section id="section-uae-standards" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  3. UAE MEDIA STANDARDS
                </h2>
                <p className="mb-3">
                  Business First operates within the UAE and will comply with applicable UAE media laws, regulations and standards.
                </p>
                <p className="mb-2">Our editorial and commercial content must respect, among other applicable requirements:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>the UAE&apos;s sovereignty, institutions and national interests;</li>
                  <li>Islamic beliefs and other religions and beliefs;</li>
                  <li>UAE national identity, culture and heritage;</li>
                  <li>national unity and social cohesion;</li>
                  <li>public order and public morals;</li>
                  <li>the legal, economic, judicial and security systems of the UAE;</li>
                  <li>individual privacy;</li>
                  <li>children&apos;s rights;</li>
                  <li>applicable restrictions concerning hate, discrimination, violence and extremism;</li>
                  <li>applicable intellectual-property rights; and</li>
                  <li>requirements relating to false, misleading or fabricated information.</li>
                </ul>
                <p className="mb-3">
                  Business First will not knowingly publish rumours, fabricated documents, deliberately false information or material falsely attributed to a person, company, government authority or other entity.
                </p>
                <p className="text-xs text-gray-500 italic">
                  Where a subject creates heightened legal, regulatory, diplomatic, national-security or public-interest considerations, publication may require enhanced editorial and/or legal review.
                </p>
              </section>

              {/* 4. ACCURACY BEFORE SPEED */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  4. ACCURACY BEFORE SPEED
                </h2>
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-100 mb-3 font-semibold text-red-900">
                  Being first is valuable. Being right is essential.
                </div>
                <p className="mb-3">
                  Business First journalists should verify material facts before publication, including names, titles, company names, numbers, financial figures, dates, locations, quotations, funding rounds, valuations, and government decisions.
                </p>
                <p>
                  A journalist should never knowingly publish information simply because competitors have already reported it. Another media outlet publishing something does not automatically make it true.
                </p>
              </section>

              {/* 5. SOURCE STANDARDS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  5. SOURCE STANDARDS
                </h2>
                <p className="mb-3">
                  Business First follows a source hierarchy. Where possible, reporters should begin with primary information:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-[#f8f9fb] border border-gray-200">
                    <strong className="text-[#24214c]">Tier 1 — Primary &amp; Official Sources:</strong> UAE government entities, regulators, official legislation, stock exchanges, courts, audited financial statements, official company filings, and direct interviews.
                  </div>
                  <div className="p-3 rounded-lg bg-[#f8f9fb] border border-gray-200">
                    <strong className="text-[#24214c]">Tier 2 — Authoritative Independent Sources:</strong> Recognised news agencies, reputable established media, recognised research institutions, major professional-services organisations, and respected market-data providers.
                  </div>
                  <div className="p-3 rounded-lg bg-[#f8f9fb] border border-gray-200">
                    <strong className="text-[#24214c]">Tier 3 — Secondary Sources:</strong> Industry publications, professional databases, credible trade publications, and specialist research platforms.
                  </div>
                  <div className="p-3 rounded-lg bg-[#f8f9fb] border border-gray-200">
                    <strong className="text-[#24214c]">Tier 4 — Discovery Sources:</strong> LinkedIn, X, Instagram, blogs, and user-generated content. Discovery sources may alert us to a story, but should never be treated as confirmation.
                  </div>
                </div>
              </section>

              {/* 6. TWO-SOURCE PRINCIPLE */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  6. TWO-SOURCE PRINCIPLE
                </h2>
                <p className="mb-3">
                  For sensitive, disputed or potentially reputation-damaging claims, Business First should seek confirmation from more than one reliable source wherever reasonably possible.
                </p>
                <p>
                  A single source may be sufficient where the information comes directly from an authoritative primary source (such as an official gazette, regulatory disclosure, or court document). The level of verification should increase with the seriousness of the claim.
                </p>
              </section>

              {/* 7. ATTRIBUTION */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  7. ATTRIBUTION
                </h2>
                <p className="mb-3">
                  Readers should be able to understand where important information came from. Business First attributes material information using phrases like &ldquo;According to…&rdquo;, &ldquo;The company said…&rdquo;, or &ldquo;In a statement…&rdquo;.
                </p>
                <p>
                  Attribution should never be written in a way that makes a third party&apos;s unverified claim appear to be an independently established fact.
                </p>
              </section>

              {/* 8. PRESS RELEASES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  8. PRESS RELEASES
                </h2>
                <p className="mb-3">
                  Press releases are useful sources of information, but they are not automatically journalism. When using a press release, our journalists ask: What is genuinely new? What can be independently verified? What context is missing?
                </p>
                <p>
                  Marketing language such as &ldquo;revolutionary&rdquo;, &ldquo;world-leading&rdquo;, &ldquo;best&rdquo;, or &ldquo;unprecedented&rdquo; should not be presented as objective fact unless independently substantiated.
                </p>
              </section>

              {/* 9. HEADLINES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  9. HEADLINES
                </h2>
                <p className="mb-3">
                  Business First headlines must be accurate, specific, concise, informative, compelling without being misleading, and consistent with the article. We do not use clickbait that materially exaggerates what a story establishes.
                </p>
                <p>
                  A reader who only sees the headline should not leave with a materially false impression of the story.
                </p>
              </section>

              {/* 10. BUSINESS FIRST 1-MINUTE READ STANDARD */}
              <section id="section-10" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3 flex items-center gap-2">
                  <Clock size={22} className="text-[#FF0202]" />
                  10. BUSINESS FIRST 1-MINUTE READ STANDARD
                </h2>
                <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200 mb-4">
                  <p className="font-bold text-[#24214c] mb-2">Our signature editorial format is designed for busy business readers:</p>
                  <p className="text-sm font-semibold text-[#FF0202] tracking-wide mb-2">
                    WHAT HAPPENED &rarr; KEY DETAILS &rarr; CONTEXT &rarr; WHY IT MATTERS &rarr; WHAT&apos;S NEXT
                  </p>
                  <p className="text-xs text-gray-600">Typical length: 180–220 words. Short does not mean incomplete.</p>
                </div>
                <p className="text-sm text-gray-700">
                  Every 1-Minute Read should clearly answer: What happened? Who is involved? What are the important numbers? Why does it matter? What should readers watch next?
                </p>
              </section>

              {/* 11. NUMBERS, DATA AND STATISTICS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  11. NUMBERS, DATA AND STATISTICS
                </h2>
                <p className="mb-3">
                  Business First covers industries where numbers matter. Journalists must verify currencies, distinguish millions from billions, distinguish revenue from profit, distinguish funding from valuation, and identify the relevant reporting period.
                </p>
                <p>
                  Statistics should never be stripped of context simply to create a dramatic headline.
                </p>
              </section>

              {/* 12. FINANCIAL AND MARKET REPORTING */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  12. FINANCIAL AND MARKET REPORTING
                </h2>
                <p className="mb-3">
                  Stories concerning listed companies, securities, funds or markets require heightened care. Business First distinguishes between verified facts, company statements, analyst opinions, forecasts, and editorial analysis.
                </p>
                <p>
                  Business First&apos;s general journalism does not constitute personalized investment advice.
                </p>
              </section>

              {/* 13. MARKET-SENSITIVE INFORMATION */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  13. MARKET-SENSITIVE INFORMATION
                </h2>
                <p className="mb-3">
                  Before publishing information concerning mergers, acquisitions, funding rounds, insolvency, executive departures, or IPOs, the editorial team must seek appropriate verification.
                </p>
                <p>
                  Rumour should never be converted into fact through the wording of a headline.
                </p>
              </section>

              {/* 14. GOVERNMENT AND REGULATORY NEWS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  14. GOVERNMENT AND REGULATORY NEWS
                </h2>
                <p className="mb-3">
                  Government reporting must rely directly on the relevant ministry, regulator, official gazette, or media office. Before publishing a regulatory change, journalists must confirm who issued it, when it takes effect, who it applies to, and whether an older rule has been superseded.
                </p>
                <p>
                  Announcements and legislation should not be treated as interchangeable.
                </p>
              </section>

              {/* 15. CORRECTIONS */}
              <section id="section-corrections" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  15. CORRECTIONS
                </h2>
                <p className="mb-3">
                  Responsible journalism includes correcting mistakes promptly. Where a material factual error is confirmed, we correct it openly. Depending on significance, we may amend the article, add a correction note, add an editor&apos;s note, or update the headline.
                </p>
                <p className="text-xs text-gray-500 italic">
                  Minor spelling, grammar, or formatting fixes that do not alter meaning do not require a correction notice.
                </p>
              </section>

              {/* 16. UPDATES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  16. UPDATES
                </h2>
                <p>
                  When an update materially changes a developing story, Business First clearly labels the article as updated and explains what changed. We do not silently rewrite the substance of stories.
                </p>
              </section>

              {/* 17. RIGHT OF REPLY */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  17. RIGHT OF REPLY
                </h2>
                <p className="mb-3">
                  When publishing a serious allegation or potentially damaging claim concerning an individual or company, reasonable efforts are made to seek their response before publication.
                </p>
                <p>
                  If no response is received by a reasonable deadline, the article will note that comment was requested. A refusal to comment will never be portrayed as evidence of wrongdoing.
                </p>
              </section>

              {/* 18. ALLEGATIONS, INVESTIGATIONS AND COURT MATTERS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  18. ALLEGATIONS, INVESTIGATIONS AND COURT MATTERS
                </h2>
                <p className="mb-3">
                  We maintain strict legal distinction between allegation, investigation, charge, prosecution, judgment, conviction, and appeal. A person accused of wrongdoing is not described as guilty unless legally established.
                </p>
                <p>
                  Court reporting receives enhanced editorial review to adhere to UAE judicial reporting restrictions.
                </p>
              </section>

              {/* 19. PRIVACY */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  19. PRIVACY
                </h2>
                <p>
                  Business First respects individual privacy. Being technically available online does not automatically mean personal information should be republished. Editors evaluate public relevance, legality, and potential harm before publication.
                </p>
              </section>

              {/* 20. CHILDREN */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  20. CHILDREN
                </h2>
                <p>
                  Content involving children requires heightened care. We protect children&apos;s dignity, privacy, and welfare in strict compliance with UAE child-protection legislation.
                </p>
              </section>

              {/* 21. DISCRIMINATION, HATRED AND EXTREMISM */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  21. DISCRIMINATION, HATRED AND EXTREMISM
                </h2>
                <p>
                  Business First does not publish content intended to incite discrimination, hatred, sectarian conflict, violence or extremism. References to personal characteristics are included only where relevant and lawful.
                </p>
              </section>

              {/* 22. CRIME, VIOLENCE AND DISTURBING MATERIAL */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  22. CRIME, VIOLENCE AND DISTURBING MATERIAL
                </h2>
                <p>
                  As a business publication, we do not sensationalize crime or violence to generate clicks. We avoid material that unnecessarily glorifies criminal activity.
                </p>
              </section>

              {/* 23. TRAGEDY AND HUMAN SUFFERING */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  23. TRAGEDY AND HUMAN SUFFERING
                </h2>
                <p>
                  Victims and families affected by tragedy are treated with dignity. A person&apos;s distress will never be treated merely as content.
                </p>
              </section>

              {/* 24. RELIGION, CULTURE AND UAE VALUES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  24. RELIGION, CULTURE AND UAE VALUES
                </h2>
                <p>
                  Business First respects Islam, other religions, UAE culture, national identity and social values. Content must not undermine social cohesion or insult religious beliefs.
                </p>
              </section>

              {/* 25. NATIONAL AND INTERNATIONAL AFFAIRS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  25. NATIONAL AND INTERNATIONAL AFFAIRS
                </h2>
                <p>
                  Coverage involving UAE institutions, national interests, diplomatic relations or sensitive international affairs requires heightened editorial review.
                </p>
              </section>

              {/* 26. IMAGES AND VIDEO */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  26. IMAGES AND VIDEO
                </h2>
                <p className="mb-3">
                  Visual journalism must provide context rather than create deception. We do not materially alter news photographs or present generated imagery as documentary evidence.
                </p>
                <p>
                  Illustrations, composites and AI-generated visuals must be clearly labelled where their nature could otherwise mislead readers.
                </p>
              </section>

              {/* 27. ARTIFICIAL INTELLIGENCE */}
              <section id="section-ai" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3 flex items-center gap-2">
                  <Sparkles size={22} className="text-[#FF0202]" />
                  27. ARTIFICIAL INTELLIGENCE
                </h2>
                <p className="mb-3">
                  Business First may use AI tools for transcription, research organization, summarization, proofreading, and production assistance. However, AI output is not automatically a reliable source.
                </p>
                <p className="mb-3 font-semibold text-[#24214c]">
                  Human editorial accountability remains central to Business First journalism.
                </p>
                <p>
                  AI will never be used to fabricate quotations, interviews, sources, statistics, documents, or photographs presented as real events.
                </p>
              </section>

              {/* 28. COPYRIGHT AND ATTRIBUTION */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  28. COPYRIGHT AND ATTRIBUTION
                </h2>
                <p className="mb-3">
                  Business First respects intellectual property. Journalists must not copy articles from competitors. Images must originate from authorized photo agencies, media kits, or licensed libraries.
                </p>
                <p className="text-xs text-gray-500 italic">
                  &ldquo;Found on Google&rdquo; is never an acceptable copyright status.
                </p>
              </section>

              {/* 29. PLAGIARISM */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  29. PLAGIARISM
                </h2>
                <p>
                  Plagiarism is strictly unacceptable. Material plagiarism results in immediate removal of content and disciplinary action or termination of the contributor relationship.
                </p>
              </section>

              {/* 30. SOCIAL MEDIA VERIFICATION */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  30. SOCIAL MEDIA VERIFICATION
                </h2>
                <div className="p-3 rounded-xl bg-[#f8f9fb] border border-gray-200 mb-2 font-semibold text-[#24214c]">
                  Virality is not verification.
                </div>
                <p>
                  Before relying on social content, reporters verify account authenticity, origin, timestamp, and cross-reference with official entities.
                </p>
              </section>

              {/* 31. USER-GENERATED CONTENT */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  31. USER-GENERATED CONTENT
                </h2>
                <p>
                  User-generated photos, videos and claims are verified before use, and copyright permissions confirmed.
                </p>
              </section>

              {/* 32. INTERVIEWS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  32. INTERVIEWS
                </h2>
                <p>
                  Interviewees are represented fairly. Quotes are edited only for length or grammar without distorting meaning. Sponsored interviews are clearly disclosed.
                </p>
              </section>

              {/* 33. ANONYMOUS SOURCES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  33. ANONYMOUS SOURCES
                </h2>
                <p>
                  Anonymity is granted cautiously—only where legitimate safety, confidentiality, or retaliation concerns exist. The editor must know the identity of the source.
                </p>
              </section>

              {/* 34. CONFIDENTIAL SOURCES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  34. CONFIDENTIAL SOURCES
                </h2>
                <p>
                  Confidentiality commitments are taken seriously and handled subject to applicable law. Journalists do not casually promise confidentiality without editorial consultation.
                </p>
              </section>

              {/* 35. EMBARGOES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  35. EMBARGOES
                </h2>
                <p>
                  Agreed embargoes are respected unless the information becomes legitimately public or the source releases it.
                </p>
              </section>

              {/* 36. CONFLICTS OF INTEREST */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  36. CONFLICTS OF INTEREST
                </h2>
                <p>
                  Editorial employees disclose financial interests, personal investments, consultancy, or close relationships in companies covered to preserve editorial independence.
                </p>
              </section>

              {/* 37. GIFTS AND HOSPITALITY */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  37. GIFTS AND HOSPITALITY
                </h2>
                <p>
                  Journalists do not accept money or benefits in exchange for favourable editorial coverage. Expensive gifts or incentives that could compromise integrity are declined.
                </p>
              </section>

              {/* 38. TRAVEL AND PRESS TRIPS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  38. TRAVEL AND PRESS TRIPS
                </h2>
                <p>
                  Where third parties fund press trips, appropriate disclosure is made. Sponsored travel never guarantees positive coverage.
                </p>
              </section>

              {/* 39. EDITORIAL AND COMMERCIAL SEPARATION */}
              <section id="section-commercial-separation" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3 flex items-center gap-2">
                  <Scale size={22} className="text-[#FF0202]" />
                  39. EDITORIAL AND COMMERCIAL SEPARATION
                </h2>
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-100 font-semibold text-red-900 mb-3">
                  Commercial success must not require misleading readers about what is independent journalism and what is paid communication.
                </div>
                <p className="mb-3">
                  Purchasing advertising does not guarantee independent news coverage. Refusing to advertise does not exclude a company from legitimate news coverage.
                </p>
              </section>

              {/* 40. SPONSORED CONTENT */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  40. SPONSORED CONTENT
                </h2>
                <p className="mb-3">
                  Commercial content is clearly labelled using markers such as <em>Sponsored</em>, <em>Partner Content</em>, <em>Brand Feature</em>, or <em>Advertisement</em>.
                </p>
                <p>
                  Payment never permits false claims, defamatory content, or disguised advertising.
                </p>
              </section>

              {/* 41. EXPERT OPINIONS AND THOUGHT LEADERSHIP */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  41. EXPERT OPINIONS AND THOUGHT LEADERSHIP
                </h2>
                <p>
                  We welcome credible perspectives from verified experts. Opinion content is distinguished from straight news and vetted against disguised marketing.
                </p>
              </section>

              {/* 42. CONTRIBUTORS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  42. CONTRIBUTORS
                </h2>
                <p>
                  Guest contributors must disclose commercial affiliations. Business First reserves the right to edit, request evidence, or reject non-compliant submissions.
                </p>
              </section>

              {/* 43. REAL ESTATE REPORTING */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  43. REAL ESTATE REPORTING
                </h2>
                <p>
                  We distinguish asking price from transaction price, gross development value, and rental yield. Projected returns are never presented as guaranteed outcomes.
                </p>
              </section>

              {/* 44. STARTUP AND FUNDING NEWS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  44. STARTUP AND FUNDING NEWS
                </h2>
                <p>
                  Funding stories specify amounts, stage, investors, and whether funding is equity or debt. Company valuations are attributed unless verified independently.
                </p>
              </section>

              {/* 45. COMPANY RANKINGS AND AWARDS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  45. COMPANY RANKINGS AND AWARDS
                </h2>
                <p>
                  We distinguish editorial rankings from paid awards or sponsored lists. Fee-based programmes are transparently disclosed.
                </p>
              </section>

              {/* 46. POLLS AND SURVEYS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  46. POLLS AND SURVEYS
                </h2>
                <p>
                  Surveys report sample size, methodology, and dates. Unrepresentative polls are not described as representing the entire UAE population.
                </p>
              </section>

              {/* 47. BREAKING NEWS PROTOCOL */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  47. BREAKING NEWS PROTOCOL
                </h2>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 text-xs sm:text-sm space-y-1 mb-3">
                  <div>1. Identify original source</div>
                  <div>2. Verify the essential fact</div>
                  <div>3. Publish only what is confirmed</div>
                  <div>4. Attribute clearly</div>
                  <div>5. Mark developing stories</div>
                  <div>6. Continue verification &amp; update</div>
                </div>
                <p className="font-semibold text-[#24214c]">
                  We would rather publish three confirmed facts than ten uncertain ones.
                </p>
              </section>

              {/* 48. RUMOURS AND UNVERIFIED CLAIMS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  48. RUMOURS AND UNVERIFIED CLAIMS
                </h2>
                <p>
                  Business First does not publish rumours simply because they are trending. Unverified social media speculation is never rewritten as confirmed news.
                </p>
              </section>

              {/* 49. EDITORIAL APPROVAL LEVELS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  49. EDITORIAL APPROVAL LEVELS
                </h2>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-lg bg-[#f8f9fb] border border-gray-200">
                    <strong className="text-[#24214c]">Level 1 — Routine (Editor):</strong> Company launches, appointments, events, product news.
                  </div>
                  <div className="p-3 rounded-lg bg-[#f8f9fb] border border-gray-200">
                    <strong className="text-[#24214c]">Level 2 — Enhanced Review (Senior Editor / Editor-in-Chief):</strong> Investment claims, regulatory shifts, sensitive departures.
                  </div>
                  <div className="p-3 rounded-lg bg-[#f8f9fb] border border-gray-200">
                    <strong className="text-[#24214c]">Level 3 — High Risk (Editor-in-Chief + Legal Review):</strong> Legal allegations, court cases, national security, leaked documents.
                  </div>
                </div>
              </section>

              {/* 50. PRE-PUBLICATION CHECKLIST */}
              <section id="section-checklist" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  50. PRE-PUBLICATION CHECKLIST
                </h2>
                <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div>☑ Is the headline accurate?</div>
                  <div>☑ Is the primary fact verified?</div>
                  <div>☑ Are names and titles correct?</div>
                  <div>☑ Are dates &amp; figures correct?</div>
                  <div>☑ Have important claims been attributed?</div>
                  <div>☑ Has promotional fluff been removed?</div>
                  <div>☑ Does the story distinguish fact from opinion?</div>
                  <div>☑ Has the subject been contacted for reply?</div>
                  <div>☑ Are quotations accurate?</div>
                  <div>☑ Are images authorized?</div>
                  <div>☑ Does it comply with UAE media laws?</div>
                  <div>☑ Does it explain why the story matters?</div>
                </div>
              </section>

              {/* 51. POST-PUBLICATION MONITORING */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  51. POST-PUBLICATION MONITORING
                </h2>
                <p>
                  Publishing is not the end of the reporting cycle. Editors monitor significant stories for official responses, changed data, and reader feedback.
                </p>
              </section>

              {/* 52. COMPLAINTS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  52. COMPLAINTS
                </h2>
                <p className="mb-2">Editorial complaints should include article URL, date, and supporting evidence sent to:</p>
                <p className="font-semibold text-[#FF0202]">editorial@businessfirstnews.com</p>
              </section>

              {/* 53. TAKEDOWN REQUESTS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  53. TAKEDOWN REQUESTS
                </h2>
                <p>
                  We do not remove accurate journalism simply because it is inconvenient to the subject. Takedowns are evaluated on legal, privacy, and public relevance grounds.
                </p>
              </section>

              {/* 54. EDITORIAL ARCHIVE */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  54. EDITORIAL ARCHIVE
                </h2>
                <p>
                  Published journalism forms part of the permanent historical record. Archived stories may be appended with editor notes as facts evolve.
                </p>
              </section>

              {/* 55. STAFF SOCIAL MEDIA CONDUCT */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  55. STAFF SOCIAL MEDIA CONDUCT
                </h2>
                <p>
                  Staff avoid public social media activities that compromise newsroom confidentiality, spread unverified rumours, or create undisclosed conflicts of interest.
                </p>
              </section>

              {/* 56. EDITORIAL INDEPENDENCE */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  56. EDITORIAL INDEPENDENCE
                </h2>
                <p className="font-semibold text-[#24214c]">
                  Advertisers may purchase visibility. They cannot purchase undisclosed editorial conclusions.
                </p>
              </section>

              {/* 57. OUR STANDARD FOR EVERY STORY */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  57. OUR STANDARD FOR EVERY STORY
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>IS IT TRUE?</strong> Verified essential facts.</div>
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>IS IT FAIR?</strong> Balanced representation.</div>
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>IS IT RELEVANT?</strong> Matters to business.</div>
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>IS IT CLEAR?</strong> Fast to understand.</div>
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg sm:col-span-2"><strong>IS IT RESPONSIBLE?</strong> Meets UAE media standards.</div>
                </div>
              </section>

              {/* 58. POLICY REVIEW */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  58. POLICY REVIEW
                </h2>
                <p>
                  This Editorial Policy is reviewed periodically and whenever UAE media legislation, technology, or publishing practices evolve.
                </p>
              </section>

              {/* 59. CONTACT THE NEWSROOM */}
              <section id="section-contact" className="scroll-mt-24 pt-4 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  59. CONTACT THE NEWSROOM
                </h2>
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
                      <strong className="text-[#24214c]">News Tips &amp; Editorial:</strong>{' '}
                      <a href="mailto:editorial@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                        editorial@businessfirstnews.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Press Releases:</strong>{' '}
                      <a href="mailto:pr@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                        pr@businessfirstnews.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Advertising &amp; Commercial:</strong>{' '}
                      <a href="mailto:ads@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                        ads@businessfirstnews.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Legal &amp; Privacy:</strong>{' '}
                      <a href="mailto:legal@businessfirstnews.com" className="text-[#FF0202] hover:underline">
                        legal@businessfirstnews.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* OUR EDITORIAL PROMISE */}
                <div className="mt-6 p-6 rounded-2xl bg-[#24214c] text-white shadow-md">
                  <h3 className="text-lg font-bold font-newsreader text-[#fbbf24] mb-2 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-[#fbbf24]" />
                    OUR EDITORIAL PROMISE
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-3">
                    Business First believes credibility is earned one story at a time. We will pursue speed without sacrificing accuracy, commercial growth without disguising advertising as independent journalism, and simplicity without removing the context readers need to make sense of business.
                  </p>
                  <p className="text-xs font-bold tracking-wider text-amber-300 uppercase mb-1">
                    FAST. FACTUAL. FOCUSED. FORWARD-LOOKING.
                  </p>
                  <p className="text-sm font-semibold text-white font-newsreader">
                    Business First — News That Means Business.
                  </p>
                </div>
              </section>

            </div>
          </div>

          {/* Right Column: Sticky Editorial Sidebar */}
          <EditorialSidebar />

        </div>

        {/* Ad Banner matching website standards */}
        
      </SectionContainer>
    </main>
  );
}
