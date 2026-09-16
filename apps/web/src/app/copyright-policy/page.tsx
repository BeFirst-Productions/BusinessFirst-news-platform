import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';
import FullWidthAdBanner from '@/components/FullWidthAdBanner';
import CopyrightSidebar from '@/components/copyright-policy/CopyrightSidebar';
import { Copyright, ShieldCheck, FileCheck2, AlertCircle, Sparkles, Scale, Share2, Ban, Lock } from 'lucide-react';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps(`policy/copyright`);
  return buildMetadata({
    ...seoProps,
    title: 'Copyright & Content Licensing Policy | Business First UAE',
    description: 'Understand how Business First content may and may not be used, shared, quoted, republished, or commercially licensed under UAE Federal Decree-Law No. 38 of 2021.',
  });
}

export default function CopyrightPolicyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <ServerSeo slug="policy/copyright" />
      
      {/* Breadcrumbs matching website design */}
      <SectionContainer className="bg-white py-4 mt-4">
        <div className="flex items-center text-xs md:text-sm font-semibold tracking-wide text-[#24214c]">
          <Link href="/" className="hover:text-[#FF0202] transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-[#FF0202]">Copyright &amp; Content Policy</span>
        </div>
      </SectionContainer>

      {/* Main Section matching website layout */}
      <SectionContainer className="bg-white" overflowVisible={true}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">

          {/* Left Column: Copyright Policy Content */}
          <div className="w-full lg:flex-1 flex flex-col gap-6">

            {/* Title with matching site style (red title + gray divider) */}
            <div className="flex items-center w-full gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
                Copyright &amp; Content Policy
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

            {/* Highlight Banner */}
            <div className="p-6 rounded-2xl bg-[#f8f9fb] border-l-4 border-[#FF0202] border border-gray-200/80 shadow-2xs">
              <h2 className="text-lg md:text-xl font-bold text-[#24214c] font-newsreader mb-2">
                Protecting Editorial Investment &amp; Original Reporting
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                Business First creates and publishes original journalism, business news, analysis, interviews, photography, graphics, newsletters, podcasts, and multimedia.
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24214c] text-white text-xs font-bold uppercase tracking-wider">
                <Share2 size={13} className="text-amber-300" /> Share the link — not the article
              </div>
            </div>

            {/* Policy Body: Sections 1 to 57 */}
            <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">

              {/* 1. INTRODUCTION */}
              <section id="section-1" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  1. INTRODUCTION
                </h2>
                <p className="mb-3">
                  Business First creates and publishes original journalism, business news, analysis, interviews, articles, videos, photographs, graphics, newsletters, podcasts, reports, social media content and other editorial and commercial media.
                </p>
                <p className="mb-3">
                  The purpose of this Copyright &amp; Content Licensing Policy is to explain how Business First content may and may not be used, copied, shared, reproduced, republished, licensed, distributed or commercially exploited.
                </p>
                <p className="mb-3">
                  Business First supports the responsible sharing of credible journalism. At the same time, the investment involved in creating original reporting, editorial content, photography, design and multimedia must be respected.
                </p>
                <p className="font-semibold text-[#24214c]">
                  Unless otherwise stated, original content published by Business First is protected by applicable intellectual property laws and may not be reproduced or commercially exploited without appropriate permission.
                </p>
              </section>

              {/* 2. OWNERSHIP OF BUSINESS FIRST CONTENT */}
              <section id="section-ownership" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  2. OWNERSHIP OF BUSINESS FIRST CONTENT
                </h2>
                <p className="mb-3">
                  Unless expressly stated otherwise, copyright and other intellectual property rights in original Business First content are owned by or lawfully licensed to:
                </p>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 mb-3 font-semibold text-[#24214c]">
                  Befirst Media Productions, operating through Business First.
                </div>
                <p className="mb-2">This includes:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700 mb-3">
                  <div>• news articles &amp; analysis</div>
                  <div>• interviews &amp; opinion pieces</div>
                  <div>• headlines &amp; proprietary editorial formats</div>
                  <div>• original research &amp; special reports</div>
                  <div>• newsletters &amp; market digests</div>
                  <div>• photographs &amp; video footage</div>
                  <div>• illustrations, infographics &amp; charts</div>
                  <div>• data visualisations &amp; graphics</div>
                  <div>• social media reels &amp; creatives</div>
                  <div>• podcasts &amp; audio recordings</div>
                  <div>• website layouts &amp; design elements</div>
                  <div>• brand marks, logos &amp; programmes</div>
                </div>
                <p className="text-xs text-gray-500 italic">
                  All rights are reserved unless Business First expressly grants permission otherwise.
                </p>
              </section>

              {/* 3. BUSINESS FIRST BRANDING */}
              <section id="section-branding" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  3. BUSINESS FIRST BRANDING
                </h2>
                <p className="mb-3">
                  The name Business First, its logo, visual identity, design system, slogans, programme names, publication names and other distinctive brand elements (such as <em>News That Means Business</em> and <em>1-Minute Read</em>) constitute protected trademarks, trade names, and proprietary intellectual property.
                </p>
                <p className="mb-2">Business First branding must not be used in a manner that:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>suggests endorsement or partnership where none exists;</li>
                  <li>misrepresents affiliation or creates audience confusion;</li>
                  <li>damages or disparages the brand; or</li>
                  <li>falsely implies that Business First produced third-party content.</li>
                </ul>
              </section>

              {/* 4. READING AND PERSONAL USE */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  4. READING AND PERSONAL USE
                </h2>
                <p className="mb-3">
                  Business First content may generally be accessed and read for legitimate personal and internal informational purposes, subject to our Terms &amp; Conditions. Users may read articles, bookmark pages, share article links, and discuss content.
                </p>
                <p>
                  Access to content does not transfer ownership or grant a general right to copy, republish or commercially exploit it.
                </p>
              </section>

              {/* 5. SHARING BUSINESS FIRST ARTICLES */}
              <section id="section-sharing" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  5. SHARING BUSINESS FIRST ARTICLES
                </h2>
                <p className="mb-3">
                  We encourage readers to share links to Business First journalism. You may freely share the article URL, the Business First headline, a brief description written in your own words, and official posts via social sharing tools.
                </p>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 text-xs sm:text-sm font-mono text-gray-800 mb-3">
                  Example: &ldquo;Business First reports that [brief summary]. Read the full story: [link]&rdquo;
                </div>
                <p className="font-semibold text-[#24214c]">
                  Sharing a link is different from republishing the article. Users should direct audiences to the original Business First publication.
                </p>
              </section>

              {/* 6. QUOTING BUSINESS FIRST CONTENT */}
              <section id="section-quoting" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  6. QUOTING BUSINESS FIRST CONTENT
                </h2>
                <p className="mb-3">
                  Limited quotations are permissible where allowed by applicable law and subject to appropriate attribution. Any quotation should:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>be reasonably limited to what is necessary;</li>
                  <li>accurately reflect the original meaning;</li>
                  <li>identify Business First as the source (&ldquo;According to Business First…&rdquo;);</li>
                  <li>include a direct hyperlink to the original article; and</li>
                  <li>not substitute for reading the original article.</li>
                </ul>
              </section>

              {/* 7. WHAT IS NOT PERMITTED WITHOUT AUTHORISATION */}
              <section id="section-prohibited" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3 flex items-center gap-2">
                  <Ban size={22} className="text-[#FF0202]" />
                  7. WHAT IS NOT PERMITTED WITHOUT AUTHORISATION
                </h2>
                <div className="p-5 rounded-2xl bg-red-50/70 border border-red-100 mb-3">
                  <p className="font-bold text-red-900 mb-2">Except where authorised in writing, users must not:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs sm:text-sm text-gray-800">
                    <div>✕ Republish complete articles</div>
                    <div>✕ Copy articles onto another website</div>
                    <div>✕ Translate and republish articles</div>
                    <div>✕ Reproduce newsletters or reports</div>
                    <div>✕ Reproduce proprietary graphics/charts</div>
                    <div>✕ Download and redistribute videos/audio</div>
                    <div>✕ Incorporate content into paid databases</div>
                    <div>✕ Create unauthorized syndication feeds</div>
                    <div>✕ Systematically scrape the website</div>
                    <div>✕ Remove watermarks or copyright notices</div>
                    <div>✕ Remove author attribution or credits</div>
                    <div>✕ Commercially exploit IP without license</div>
                  </div>
                </div>
              </section>

              {/* 8. REPUBLICATION */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  8. REPUBLICATION
                </h2>
                <p className="mb-3">
                  Republishing Business First content requires prior written permission. Businesses, publishers, news aggregators and educational institutions seeking republication should contact:
                </p>
                <p className="font-semibold text-[#FF0202] mb-3">
                  <a href="mailto:licensing@businessfirstuae.com" className="hover:underline">
                    licensing@businessfirstuae.com
                  </a>
                </p>
                <p className="text-xs text-gray-500 italic">
                  No licence should be assumed unless Business First confirms it in writing.
                </p>
              </section>

              {/* 9. CONTENT LICENSING */}
              <section id="section-licensing" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  9. CONTENT LICENSING
                </h2>
                <p className="mb-3">
                  Business First licenses selected content assets including individual articles, article packages, news feeds, newsletters, special reports, video, photography, infographics, podcasts, and market summaries.
                </p>
                <p>
                  Licensing may be structured as single-use, multiple-use, time-limited, territory-limited, platform-specific, exclusive, or non-exclusive based on individual agreement.
                </p>
              </section>

              {/* 10. CORPORATE CONTENT LICENSING */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  10. CORPORATE CONTENT LICENSING
                </h2>
                <p className="mb-3">
                  Companies may request permission to reuse Business First coverage on corporate websites, investor relations portals, annual reports, presentations, and media centres.
                </p>
                <p className="font-semibold text-[#24214c]">
                  Publication by Business First does not automatically give the company featured in an article ownership of that article.
                </p>
              </section>

              {/* 11. INTERNAL CORPORATE USE */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  11. INTERNAL CORPORATE USE
                </h2>
                <p>
                  We offer licences allowing organisations to circulate selected content internally among staff. An internal licence does not permit public website republication, commercial resale, or client redistribution.
                </p>
              </section>

              {/* 12. MEDIA SYNDICATION */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  12. MEDIA SYNDICATION
                </h2>
                <p>
                  Business First enters into syndication agreements with regional and international publishers. Syndicated content must carry agreed Business First attribution and may not be materially altered without authorization.
                </p>
              </section>

              {/* 13. TRANSLATION RIGHTS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  13. TRANSLATION RIGHTS
                </h2>
                <p>
                  Translation of Business First content for republication requires express permission, must preserve original meaning, identify Business First as original publisher, and may require pre-publication review.
                </p>
              </section>

              {/* 14. SOCIAL MEDIA USE */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  14. SOCIAL MEDIA USE
                </h2>
                <p>
                  Users may reshare Business First posts using native platform tools. Businesses must not download graphics, remove our branding, or systematically repost social creatives into their own channels without a licence.
                </p>
              </section>

              {/* 15. PHOTOGRAPHS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  15. PHOTOGRAPHS
                </h2>
                <p>
                  Photographs on Business First originate from staff photographers, wire agencies, company submissions, and licensed libraries. Appearance on our site does not imply sublicensing rights. Permission must be requested per image.
                </p>
              </section>

              {/* 16. COMPANY-SUPPLIED PHOTOGRAPHS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  16. COMPANY-SUPPLIED PHOTOGRAPHS
                </h2>
                <p>
                  Submitting parties warrant that they possess all requisite rights to supply logos, imagery, and video for publication. The supplier remains responsible for securing third-party intellectual property and personality rights.
                </p>
              </section>

              {/* 17. VIDEO AND AUDIO CONTENT */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  17. VIDEO AND AUDIO CONTENT
                </h2>
                <p>
                  Video and podcast content may not be downloaded, ripped, re-edited, or re-uploaded. Embedding via official player embeds is permitted subject to platform rules.
                </p>
              </section>

              {/* 18. INTERVIEWS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  18. INTERVIEWS
                </h2>
                <p>
                  Business First owns copyright in the recording, editing, and published presentation of produced interviews. Interviewees may share article links, but do not automatically acquire rights to re-edit or commercialize the production.
                </p>
              </section>

              {/* 19. INFOGRAPHICS, CHARTS AND DATA VISUALISATIONS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  19. INFOGRAPHICS, CHARTS AND DATA VISUALISATIONS
                </h2>
                <p>
                  Original data visualisations, selections, layouts, and designs are protected. They may not be reproduced merely because underlying statistical data is publicly available.
                </p>
              </section>

              {/* 20. DATABASES AND CONTENT COLLECTIONS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  20. DATABASES AND CONTENT COLLECTIONS
                </h2>
                <p>
                  Structured archives, market trackers, and article compilations are protected databases. Automated extraction intended to recreate competing databases or commercial archives is strictly prohibited.
                </p>
              </section>

              {/* 21. AUTOMATED SCRAPING */}
              <section id="section-ai-scraping" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  21. AUTOMATED SCRAPING
                </h2>
                <p className="mb-3">
                  Business First does not grant permission for unrestricted automated scraping. Automated systems must not crawl for content extraction, scrape articles, harvest databases, download bulk archives, or bypass technical rate limits.
                </p>
              </section>

              {/* 22. ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3 flex items-center gap-2">
                  <Sparkles size={22} className="text-[#FF0202]" />
                  22. ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING
                </h2>
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-gray-800 space-y-2 mb-3">
                  <p className="font-bold text-amber-900">
                    Prohibition on Unauthorised AI Ingestion:
                  </p>
                  <p className="text-xs sm:text-sm">
                    Unless specifically authorised in writing, Business First content may not be collected, mined, or reproduced for building commercial AI datasets, training machine-learning models, fine-tuning LLMs, constructing retrieval databases, or generating competing automated news services.
                  </p>
                </div>
                <p className="text-xs text-gray-600">
                  Organisations seeking commercial AI licensing should contact{' '}
                  <a href="mailto:licensing@businessfirstuae.com" className="text-[#FF0202] font-semibold hover:underline">
                    licensing@businessfirstuae.com
                  </a>.
                </p>
              </section>

              {/* 23. SEARCH ENGINES AND DISCOVERY SERVICES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  23. SEARCH ENGINES AND DISCOVERY SERVICES
                </h2>
                <p>
                  Recognised search engines may index website content in accordance with standard robots protocols. Indexing does not grant rights to create commercial copies of our archive or sublicense material.
                </p>
              </section>

              {/* 24. NEWS AGGREGATORS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  24. NEWS AGGREGATORS
                </h2>
                <p>
                  Aggregators displaying content beyond basic headlines and brief excerpts must obtain licensing agreements. We reserve the right to restrict access to services that substitute for visits to the original article.
                </p>
              </section>

              {/* 25. EDUCATIONAL USE */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  25. EDUCATIONAL USE
                </h2>
                <p>
                  Educational institutions and students may cite and quote Business First content under statutory fair dealing rules. Extensive reproduction in course packets or paid training programmes requires permission.
                </p>
              </section>

              {/* 26. RESEARCH USE */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  26. RESEARCH USE
                </h2>
                <p>
                  Researchers may cite articles following standard academic conventions. Large-scale dataset or archival access must be discussed with our licensing desk.
                </p>
              </section>

              {/* 27. PRESENTATIONS AND REPORTS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  27. PRESENTATIONS AND REPORTS
                </h2>
                <p>
                  Limited quotations may be used in internal reports with attribution. Reproducing complete graphics, photos, or articles in external corporate reports requires a content licence.
                </p>
              </section>

              {/* 28. GOVERNMENT AND PUBLIC-SECTOR USE */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  28. GOVERNMENT AND PUBLIC-SECTOR USE
                </h2>
                <p>
                  Public sector entities seeking reproduction should contact Business First. Copyright in our original journalistic treatment remains separate from underlying public facts or legislation.
                </p>
              </section>

              {/* 29. PRESS RELEASES PUBLISHED BY BUSINESS FIRST */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  29. PRESS RELEASES PUBLISHED BY BUSINESS FIRST
                </h2>
                <p>
                  Where Business First edits, rewrites, conducts interviews, adds analysis, or creates graphics based on a corporate release, Business First holds copyright in its original contribution.
                </p>
              </section>

              {/* 30. SPONSORED CONTENT */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  30. SPONSORED CONTENT
                </h2>
                <p>
                  Payment for sponsored content provides agreed usage rights (such as reprints or social sharing), but does not automatically transfer copyright ownership unless expressly assigned in writing.
                </p>
              </section>

              {/* 31. CLIENT-CREATED ADVERTISEMENTS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  31. CLIENT-CREATED ADVERTISEMENTS
                </h2>
                <p>
                  Copyright in client-supplied advertising remains with the client. The client grants Business First rights to publish, display, resize, and distribute the materials to execute the campaign.
                </p>
              </section>

              {/* 32. BUSINESS FIRST-CREATED ADVERTISEMENTS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  32. BUSINESS FIRST-CREATED ADVERTISEMENTS
                </h2>
                <p>
                  Creative assets produced by Business First (artwork, videos, scripts) remain our intellectual property, licensed to the client for agreed campaign purposes. Working files and raw footage are not included unless contracted.
                </p>
              </section>

              {/* 33. CONTRIBUTORS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  33. CONTRIBUTORS
                </h2>
                <p>
                  Contributors represent that they possess rights to all submitted material. Contributor rights (exclusive, syndication, archival) are governed by written contributor agreements. Plagiarised submissions are strictly prohibited.
                </p>
              </section>

              {/* 34. FREELANCE JOURNALISTS, PHOTOGRAPHERS AND PRODUCERS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  34. FREELANCE JOURNALISTS, PHOTOGRAPHERS AND PRODUCERS
                </h2>
                <p>
                  Commissioned freelance rights are established in individual commissioning contracts, granting Business First necessary publication, archival, syndication, and licensing rights.
                </p>
              </section>

              {/* 35. THIRD-PARTY CONTENT */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  35. THIRD-PARTY CONTENT
                </h2>
                <p>
                  Third-party content licensed by Business First carries copyright notices. Third-party material must not be reused merely because it appears on Business First.
                </p>
              </section>

              {/* 36. GOVERNMENT MATERIAL */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  36. GOVERNMENT MATERIAL
                </h2>
                <p>
                  We quote official announcements and statistics. Users wishing to reuse official material should consult the originating entity&apos;s terms. We do not claim ownership of underlying public facts.
                </p>
              </section>

              {/* 37. ATTRIBUTION DOES NOT REPLACE PERMISSION */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  37. ATTRIBUTION DOES NOT REPLACE PERMISSION
                </h2>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 font-semibold text-[#24214c] mb-2">
                  Providing a source credit does not automatically make unauthorised copying lawful.
                </div>
                <p>
                  The statement &ldquo;Credit: Business First&rdquo; does not substitute for obtaining permission where required by law.
                </p>
              </section>

              {/* 38. EDITING LICENSED CONTENT */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  38. EDITING LICENSED CONTENT
                </h2>
                <p>
                  Licensees must not alter content in ways that change its meaning, introduce errors, distort quotes, or damage the integrity of the work.
                </p>
              </section>

              {/* 39. REQUIRED ATTRIBUTION */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  39. REQUIRED ATTRIBUTION
                </h2>
                <p className="mb-2">Unless otherwise agreed, licensed written content must carry attribution substantially similar to:</p>
                <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg font-mono text-xs sm:text-sm text-gray-800">
                  &ldquo;Originally published by Business First — News That Means Business.&rdquo; (with direct hyperlink).
                </div>
              </section>

              {/* 40. REMOVING COPYRIGHT NOTICES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  40. REMOVING COPYRIGHT NOTICES
                </h2>
                <p>
                  Users must not intentionally remove copyright notices, watermarks, photographer credits, or digital rights management identifiers from Business First content.
                </p>
              </section>

              {/* 41. LICENSING FEES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  41. LICENSING FEES
                </h2>
                <p>
                  Licensing fees depend on content type, intended use, commercial nature, audience size, territory, duration, and exclusivity. Rate schedules are provided upon enquiry.
                </p>
              </section>

              {/* 42. COMMERCIAL LICENCE CATEGORIES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  42. COMMERCIAL LICENCE CATEGORIES
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>Single Article Licence:</strong> One article reprint.</div>
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>Corporate Usage Licence:</strong> Internal &amp; company PR use.</div>
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>Media Republication Licence:</strong> Publisher distribution.</div>
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>Syndication Licence:</strong> Ongoing editorial feeds.</div>
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>Multimedia Licence:</strong> Photography &amp; video assets.</div>
                  <div className="p-3 bg-[#f8f9fb] border border-gray-200 rounded-lg"><strong>Data &amp; AI Licence:</strong> Authorised technology &amp; research.</div>
                </div>
              </section>

              {/* 43. LICENCE DOES NOT TRANSFER OWNERSHIP */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  43. LICENCE DOES NOT TRANSFER OWNERSHIP
                </h2>
                <p>
                  A licence grants specified usage rights only. Business First retains ownership of the underlying intellectual property. Rights cannot be sublicensed without consent.
                </p>
              </section>

              {/* 44-46. DURATION, TERRITORY, EXCLUSIVITY */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  44–46. DURATION, TERRITORY AND EXCLUSIVITY
                </h2>
                <p className="mb-2">
                  Licences may be time-limited, annual, or perpetual for specified uses. Geographical scope defaults to non-exclusive unless explicitly agreed in writing. Worldwide rights should not be assumed unless stated.
                </p>
              </section>

              {/* 47. COPYRIGHT COMPLAINTS */}
              <section id="section-complaints" className="scroll-mt-24 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  47. COPYRIGHT COMPLAINTS
                </h2>
                <p className="mb-3">
                  If you believe material on Business First infringes your copyright, please contact our legal desk:
                </p>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 text-xs sm:text-sm mb-3">
                  <p className="font-semibold text-[#FF0202]">
                    <a href="mailto:legal@businessfirstuae.com" className="hover:underline">
                      legal@businessfirstuae.com
                    </a>
                  </p>
                  <p className="text-gray-600 mt-1">
                    Please provide your name, protected work details, the infringing URL, proof of ownership, and requested remedy.
                  </p>
                </div>
              </section>

              {/* 48. COPYRIGHT TAKEDOWN REVIEW */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  48. COPYRIGHT TAKEDOWN REVIEW
                </h2>
                <p>
                  Upon receipt of a credible complaint, we review disputed material, temporarily restrict access where appropriate, request supplier evidence, and take prompt remedial action if infringement is substantiated.
                </p>
              </section>

              {/* 49–50. INFRINGEMENT AND ENFORCEMENT */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  49–50. INFRINGEMENT AND ENFORCEMENT
                </h2>
                <p className="mb-2">
                  Where unauthorised use occurs, Business First requests cessation, retrospective licensing, and applicable compensation.
                </p>
                <p>
                  In cases of repeat or systematic infringement, Business First reserves all statutory remedies, technical blocking, and legal actions under UAE copyright law.
                </p>
              </section>

              {/* 51–53. LINKS, ARCHIVING & MORAL RIGHTS */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  51–53. LINKS, ARCHIVING &amp; MORAL RIGHTS
                </h2>
                <p className="mb-2">
                  Direct links to articles are welcomed. Framing our site inside third-party interfaces is prohibited.
                </p>
                <p>
                  Author attribution and moral rights remain protected. Content must never be falsely attributed.
                </p>
              </section>

              {/* 54. APPLICABLE UAE LAW */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  54. APPLICABLE UAE LAW
                </h2>
                <p className="mb-3">
                  This Policy operates in full accordance with applicable UAE intellectual property legislation:
                </p>
                <div className="p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 font-semibold text-[#24214c]">
                  Federal Decree-Law No. 38 of 2021 on Copyright and Neighbouring Rights
                </div>
              </section>

              {/* 55–56. POLICY RELATIONSHIP & UPDATES */}
              <section className="pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  55–56. POLICY RELATIONSHIP &amp; UPDATES
                </h2>
                <p>
                  This Policy should be read alongside our Terms &amp; Conditions, Privacy Policy, Cookie Policy, Disclaimer, and Editorial Policy. Updates will be published with a revised revision date.
                </p>
              </section>

              {/* 57. CONTENT LICENSING CONTACT */}
              <section id="section-contact" className="scroll-mt-24 pt-4 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
                  57. CONTENT LICENSING CONTACT
                </h2>
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
                      <strong className="text-[#24214c]">Content Licensing:</strong>{' '}
                      <a href="mailto:licensing@businessfirstuae.com" className="text-[#FF0202] hover:underline">
                        licensing@businessfirstuae.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Copyright Complaints:</strong>{' '}
                      <a href="mailto:legal@businessfirstuae.com" className="text-[#FF0202] hover:underline">
                        legal@businessfirstuae.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">Editorial Desk:</strong>{' '}
                      <a href="mailto:editorial@businessfirstuae.com" className="text-[#FF0202] hover:underline">
                        editorial@businessfirstuae.com
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-[#24214c]">General Enquiries:</strong>{' '}
                      <a href="mailto:info@businessfirstuae.com" className="text-[#FF0202] hover:underline">
                        info@businessfirstuae.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* COPYRIGHT NOTICE BOX */}
                <div className="mt-6 p-6 rounded-2xl bg-[#24214c] text-white shadow-md">
                  <h3 className="text-lg font-bold font-newsreader text-[#fbbf24] mb-2 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-[#fbbf24]" />
                    COPYRIGHT NOTICE
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-3">
                    &copy; 2026 Business First / Befirst Media Productions. All rights reserved. Unless otherwise stated, Business First content may not be reproduced, republished, distributed, modified, commercially exploited or systematically extracted without prior written permission, except to the extent permitted by applicable law.
                  </p>
                  <p className="text-xs font-bold tracking-wider text-amber-300 uppercase mb-1">
                    You are welcome to share our journalism. Please share the link — not the article.
                  </p>
                  <p className="text-sm font-semibold text-white font-newsreader">
                    Business First — News That Means Business.
                  </p>
                </div>
              </section>

            </div>
          </div>

          {/* Right Column: Sticky Copyright Sidebar */}
          <CopyrightSidebar />

        </div>

        {/* Ad Banner matching website standards */}
        <div className="w-full py-8 md:py-12">
          <FullWidthAdBanner
            ratio="copyright_bottom"
            targetPage="copyright"
            imageUrl="/ads/invest-first_1600x140.jpeg"
          />
        </div>
      </SectionContainer>
    </main>
  );
}
