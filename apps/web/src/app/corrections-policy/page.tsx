import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';
import FullWidthAdBanner from '@/components/FullWidthAdBanner';
import CorrectionsSidebar from '@/components/corrections-policy/CorrectionsSidebar';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Scale,
  RefreshCw,
  Mail,
  AlertTriangle,
  Info,
  HelpCircle,
  Clock,
  Send,
  Building,
  Flag,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps(`policy/corrections`);
  return buildMetadata({
    ...seoProps,
    title: 'Corrections & Complaints Policy | Business First UAE',
    description: 'Learn how Business First handles editorial corrections, clarifications, and complaints fairly, promptly, and transparently.',
  });
}

export default function CorrectionsPolicyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full  py-8 md:py-12">
      <ServerSeo slug="policy/corrections" />

      {/* Breadcrumbs */}
      <SectionContainer className="bg-white py-4 mt-4">
        <div className="flex items-center text-xs md:text-sm font-semibold tracking-wide text-[#24214c]">
          <Link href="/" className="hover:text-[#FF0202] transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-[#FF0202]">Corrections &amp; Complaints Policy</span>
        </div>
      </SectionContainer>

      {/* Main Section */}
      <SectionContainer className="bg-white" overflowVisible={true}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">

          {/* Left Column: Content */}
          <div className="w-full lg:flex-1 flex flex-col gap-6">

            {/* Header with Site Style */}
            <div className="flex items-center w-full gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
                Corrections &amp; Complaints Policy
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

            {/* Core Promise Callout Banner */}
            <div className="bg-[#fcf8ed] border-l-4 border-[#fbbf24] p-5 rounded-r-xl my-2">
              <h4 className="text-base font-bold text-[#24214c] mb-1 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#fbbf24]" />
                Our Core Principle
              </h4>
              <p className="text-gray-700 text-sm md:text-base font-semibold italic">
                &ldquo;Correct what is wrong. Clarify what is unclear. Stand by accurate journalism.&rdquo;
              </p>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                Acknowledging an error does not weaken journalism — it strengthens trust. When mistakes occur, we address them fairly, promptly, and proportionately.
              </p>
            </div>

            {/* Policy Sections */}
            <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-8 mt-2">

              {/* 1. OUR COMMITMENT */}
              <section id="section-1" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  1. OUR COMMITMENT
                </h2>
                <p className="mb-3">
                  Business First is committed to accurate, responsible and transparent business journalism.
                </p>
                <p className="mb-3">
                  We recognise that even with appropriate editorial checks, mistakes can occasionally occur. When they do, we believe they should be addressed fairly, promptly and proportionately.
                </p>
                <p className="mb-3">
                  We also recognise the right of readers, individuals, businesses, organisations, public bodies and other affected parties to raise legitimate concerns about content published by Business First.
                </p>
                <p className="font-semibold text-[#24214c] mb-2">This Corrections &amp; Complaints Policy explains:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-4">
                  <li>how corrections are handled;</li>
                  <li>how complaints may be submitted;</li>
                  <li>what information complainants should provide;</li>
                  <li>how Business First reviews complaints;</li>
                  <li>the possible outcomes of a complaint;</li>
                  <li>when content may be corrected, clarified, updated or removed; and</li>
                  <li>how we distinguish genuine editorial complaints from attempts to improperly influence legitimate journalism.</li>
                </ul>
                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#24214c] font-medium">
                  <strong>Our objective is simple:</strong> Correct what is wrong. Clarify what is unclear. Stand by accurate journalism.
                </div>
              </section>

              {/* 2. SCOPE */}
              <section id="section-2" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  2. SCOPE
                </h2>
                <p className="mb-3">
                  This Policy applies to editorial content published or produced by Business First, including:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
                  {[
                    'News articles',
                    '1-Minute Reads',
                    'Analysis',
                    'Interviews',
                    'Opinion articles',
                    'Thought leadership',
                    'Videos',
                    'Podcasts',
                    'Newsletters',
                    'Social media posts',
                    'Graphics & Infographics',
                    'Photographs & Reports',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded text-xs md:text-sm font-medium text-gray-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cd2027]"></span>
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mb-3">
                  Commercial or sponsored content may also be reviewed under this Policy where the complaint concerns accuracy, misleading claims, attribution, disclosure or other editorial standards.
                </p>
                <p className="text-xs md:text-sm text-gray-500 italic">
                  Advertising contract disputes, billing issues and commercial service complaints may instead be handled through the appropriate commercial or accounts team.
                </p>
              </section>

              {/* 3. OUR CORRECTIONS PRINCIPLE */}
              <section id="section-3" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  3. OUR CORRECTIONS PRINCIPLE
                </h2>
                <p className="mb-3">
                  Business First does not believe that acknowledging an error weakens journalism. Correcting a genuine error strengthens trust.
                </p>
                <p className="mb-2 font-semibold text-[#24214c]">
                  Where a material factual error is confirmed, we will take appropriate corrective action based on:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>seriousness;</li>
                  <li>potential harm;</li>
                  <li>prominence;</li>
                  <li>reach;</li>
                  <li>subject matter;</li>
                  <li>whether the error affects the meaning of the story; and</li>
                  <li>whether readers need to be informed about the correction.</li>
                </ul>
                <p>We aim to make corrections clearly and proportionately.</p>
              </section>

              {/* 4. TYPES OF EDITORIAL CHANGES */}
              <section id="section-4" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  4. TYPES OF EDITORIAL CHANGES
                </h2>
                <p className="mb-4">
                  Not every change to an article is a correction. Business First may make several types of post-publication changes:
                </p>
                <div className="space-y-4">
                  {/* A */}
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                    <h3 className="font-bold text-[#24214c] text-base mb-1.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs">A</span>
                      Minor Edit
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      A minor edit may correct spelling, grammar, punctuation, formatting, broken links, typographical errors, or other issues that do not materially alter the meaning.
                    </p>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-medium">
                      Minor edits may be made without a formal correction notice.
                    </span>
                  </div>

                  {/* B */}
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                    <h3 className="font-bold text-[#24214c] text-base mb-1.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs">B</span>
                      Update
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      An update adds new information to a developing story, such as a new company response, an updated financial figure, a later government announcement, transaction completion, or regulatory clarification.
                    </p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">
                      Where an update materially changes the story, an update note may be included.
                    </span>
                  </div>

                  {/* C */}
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                    <h3 className="font-bold text-[#24214c] text-base mb-1.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">C</span>
                      Clarification
                    </h3>
                    <p className="text-sm text-gray-600">
                      A clarification may be added where the original wording was technically accurate but could reasonably be misunderstood. It may explain context, timing, terminology, relationships between parties, figures, or scope.
                    </p>
                  </div>

                  {/* D */}
                  <div className="border border-red-200 rounded-xl p-4 bg-red-50/30">
                    <h3 className="font-bold text-red-700 text-base mb-1.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-xs">D</span>
                      Correction
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">
                      A correction is appropriate where a material factual error has been identified and verified. Examples include incorrect names, titles, companies, dates, amounts, percentages, locations, inaccurate quotes, or misdescribed transactions.
                    </p>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded font-medium">
                      Accompanied by a transparent correction notice.
                    </span>
                  </div>

                  {/* E */}
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                    <h3 className="font-bold text-[#24214c] text-base mb-1.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">E</span>
                      Editor&apos;s Note
                    </h3>
                    <p className="text-sm text-gray-600">
                      An Editor&apos;s Note may be used where readers need additional context about a significant editorial issue, such as substantial corrections, sourcing questions, significant later developments, disputes over important facts, or removal of content.
                    </p>
                  </div>

                  {/* F */}
                  <div className="border border-gray-300 rounded-xl p-4 bg-gray-100/60">
                    <h3 className="font-bold text-gray-900 text-base mb-1.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center text-xs">F</span>
                      Withdrawal or Removal
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Complete removal should generally be reserved for exceptional circumstances, including serious legal concerns, proven fabrication, serious copyright infringement, significant privacy concerns, or regulatory requirements.
                    </p>
                    <span className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-medium">
                      Where appropriate, a notice may remain explaining that the article was withdrawn.
                    </span>
                  </div>
                </div>
              </section>

              {/* 5. MATERIAL VS NON-MATERIAL ERRORS */}
              <section id="section-5" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  5. MATERIAL VS NON-MATERIAL ERRORS
                </h2>
                <p className="mb-3">
                  Business First distinguishes between errors that materially affect a story and those that do not.
                </p>
                <p className="mb-2 font-semibold text-[#24214c]">A material error may:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>substantially alter the meaning of the article;</li>
                  <li>unfairly affect a person&apos;s or company&apos;s reputation;</li>
                  <li>misstate an important financial figure;</li>
                  <li>incorrectly describe a regulatory obligation;</li>
                  <li>incorrectly identify a person or organisation;</li>
                  <li>misrepresent a quotation;</li>
                  <li>affect an investment or business interpretation; or</li>
                  <li>otherwise significantly mislead readers.</li>
                </ul>
                <p className="text-sm text-gray-600">
                  A minor typo that does not change the meaning ordinarily does not require a formal correction notice.
                </p>
              </section>

              {/* 6. CORRECTION NOTICES */}
              <section id="section-6" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  6. CORRECTION NOTICES
                </h2>
                <p className="mb-3">Where a material correction is made, Business First may include a note such as:</p>
                <div className="bg-gray-50 border-l-4 border-[#24214c] p-4 rounded-r-lg text-xs md:text-sm font-mono text-gray-800 space-y-2 mb-3">
                  <p><strong>Correction:</strong> An earlier version of this article incorrectly stated [incorrect information]. The article has been updated to reflect [correct information].</p>
                  <p><strong>Editor&apos;s Note:</strong> This article has been updated following additional information received after publication.</p>
                </div>
                <p className="mb-2 font-semibold text-[#24214c]">We aim for correction notices to be:</p>
                <div className="flex flex-wrap gap-2">
                  {['Clear', 'Factual', 'Proportionate', 'Visible', 'Non-Defensive', 'Specific'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-[#24214c] font-semibold text-xs rounded-full">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* 7. HEADLINE CORRECTIONS */}
              <section id="section-7" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  7. HEADLINE CORRECTIONS
                </h2>
                <p className="mb-3">
                  If a headline is materially inaccurate or misleading, Business First may correct the headline. Where the error is significant, the correction may also be disclosed within the article.
                </p>
                <p className="text-sm text-gray-600">
                  Changing a headline to improve style, SEO or clarity does not necessarily require a correction notice where the original headline was accurate.
                </p>
              </section>

              {/* 8. SOCIAL MEDIA CORRECTIONS */}
              <section id="section-8" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  8. SOCIAL MEDIA CORRECTIONS
                </h2>
                <p className="mb-3">
                  Business First may also correct or update social media posts where appropriate. Depending on the platform and seriousness of the issue, we may:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>edit the post where technically possible;</li>
                  <li>delete and repost;</li>
                  <li>publish a correction;</li>
                  <li>add clarification in comments;</li>
                  <li>link to the corrected article; or</li>
                  <li>take another proportionate action.</li>
                </ul>
                <p className="font-semibold text-red-700 text-sm">
                  Material misinformation should not knowingly remain active simply because it was published on social media rather than the website.
                </p>
              </section>

              {/* 9. VIDEO, AUDIO AND PODCAST CORRECTIONS */}
              <section id="section-9" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  9. VIDEO, AUDIO AND PODCAST CORRECTIONS
                </h2>
                <p className="mb-3">
                  Where a material error appears in video, podcast or audio content, Business First may:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>update the description;</li>
                  <li>add a correction notice;</li>
                  <li>edit the content where practical;</li>
                  <li>publish a corrected version;</li>
                  <li>insert a correction in a later episode; or</li>
                  <li>remove the content in exceptional circumstances.</li>
                </ul>
                <p className="text-sm text-gray-600">
                  The appropriate response will depend on technical feasibility and seriousness.
                </p>
              </section>

              {/* 10. HOW TO SUBMIT A CORRECTION REQUEST */}
              <section id="section-10" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  10. HOW TO SUBMIT A CORRECTION REQUEST
                </h2>
                <p className="mb-3">
                  Anyone who believes Business First has published a material factual error may contact:
                </p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <span className="text-xs uppercase tracking-wider text-red-700 font-bold">Editorial &amp; Corrections Desk</span>
                  <p className="mt-1">
                    <a href="mailto:editorial@businessfirstnews.com" className="text-base font-bold text-red-700 hover:underline">
                      editorial@businessfirstnews.com
                    </a>
                  </p>
                </div>
                <p className="mb-2 font-semibold text-[#24214c]">We encourage requests to include:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3">
                  <li>complainant&apos;s name and organisation (if applicable);</li>
                  <li>contact details (email and phone number);</li>
                  <li>URL of the relevant content and publication date, where known;</li>
                  <li>specific statement being challenged;</li>
                  <li>explanation of why it is inaccurate;</li>
                  <li>correct information;</li>
                  <li>reliable supporting evidence; and</li>
                  <li>requested correction, if applicable.</li>
                </ul>
                <p className="text-xs md:text-sm text-gray-500 italic">
                  Clear and specific requests can be reviewed more efficiently than general statements such as &ldquo;Remove this article.&rdquo;
                </p>
              </section>

              {/* 11. SUPPORTING EVIDENCE */}
              <section id="section-11" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  11. SUPPORTING EVIDENCE
                </h2>
                <p className="mb-3">
                  Where a correction is requested, Business First may ask for evidence. Useful supporting material may include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {[
                    'Government documents',
                    'Official company records',
                    'Regulatory filings & disclosures',
                    'Contracts & agreements',
                    'Audited financial statements',
                    'Authorised corporate statements',
                    'Court documents (lawfully shareable)',
                    'Original correspondence & recordings',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs md:text-sm border border-gray-100">
                      <FileCheck2 size={14} className="text-[#24214c]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Business First is not required to accept an unsupported assertion simply because it is made by a person mentioned in an article.
                </p>
              </section>

              {/* 12. COMPLAINTS */}
              <section id="section-12" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  12. COMPLAINTS
                </h2>
                <p className="mb-3">
                  A complaint may concern more than factual accuracy. Examples include concerns about:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    'Fairness',
                    'Privacy',
                    'Attribution',
                    'Headlines',
                    'Photographs',
                    'Quotations',
                    'Sponsored-content disclosure',
                    'Conflicts of interest',
                    'Plagiarism',
                    'Copyright',
                    'Misrepresentation',
                    'Right of reply',
                    'Confidential information',
                  ].map((item, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-md font-medium">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-500 font-bold uppercase">Editorial Complaints</p>
                    <a href="mailto:editorial@businessfirstnews.com" className="text-sm font-semibold text-[#24214c] hover:underline">
                      editorial@businessfirstnews.com
                    </a>
                  </div>
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-500 font-bold uppercase">Legal / Privacy / Copyright</p>
                    <a href="mailto:legal@businessfirstnews.com" className="text-sm font-semibold text-[#24214c] hover:underline">
                      legal@businessfirstnews.com
                    </a>
                  </div>
                </div>
              </section>

              {/* 13. COMPLAINT FORMAT */}
              <section id="section-13" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  13. COMPLAINT FORMAT
                </h2>
                <p className="mb-3">To allow a fair review, complaints should ideally state:</p>
                <ol className="list-decimal pl-6 space-y-2 mb-3">
                  <li><strong>Complainant&apos;s full name.</strong></li>
                  <li><strong>Organisation</strong>, where applicable.</li>
                  <li><strong>Email and telephone number.</strong></li>
                  <li><strong>Content concerned:</strong> The article, video or other content title.</li>
                  <li><strong>The URL.</strong></li>
                  <li><strong>Specific section</strong> or statement being challenged.</li>
                  <li><strong>Nature of the complaint.</strong></li>
                  <li><strong>Relevant supporting evidence.</strong></li>
                  <li><strong>The remedy being requested.</strong></li>
                </ol>
                <p className="text-xs text-gray-500">Business First may request further information where necessary.</p>
              </section>

              {/* 14. ACKNOWLEDGEMENT */}
              <section id="section-14" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  14. ACKNOWLEDGEMENT
                </h2>
                <p className="mb-3">
                  Business First will endeavour to acknowledge substantive editorial complaints within a reasonable period.
                </p>
                <p className="mb-3">
                  Complex matters may require additional time because of fact-checking, source consultation, legal review, regulatory considerations, obtaining documents, contacting journalists, seeking responses from affected parties, or reviewing archived material.
                </p>
                <p className="text-xs md:text-sm text-gray-500 italic">
                  A delay in resolving a complaint should not be interpreted as acceptance or rejection of the claim.
                </p>
              </section>

              {/* 15. REVIEW PROCESS */}
              <section id="section-15" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  15. REVIEW PROCESS
                </h2>
                <p className="mb-4">A complaint may be reviewed using the following 6-step process:</p>
                <div className="space-y-3">
                  {[
                    {
                      step: 'Step 1',
                      title: 'Log the Complaint',
                      desc: 'The complaint is recorded with the relevant article and supporting information in our internal register.',
                    },
                    {
                      step: 'Step 2',
                      title: 'Initial Assessment',
                      desc: 'An editor determines whether the complaint falls within this Policy, whether urgent action is needed, and if claims are specific enough.',
                    },
                    {
                      step: 'Step 3',
                      title: 'Review Original Reporting',
                      desc: 'The editor reviews reporter notes, source material, recordings, emails, press releases, public records, and images.',
                    },
                    {
                      step: 'Step 4',
                      title: 'Consult the Journalist',
                      desc: 'The journalist, editor or contributor responsible for the content is asked to explain the reporting process and sourcing.',
                    },
                    {
                      step: 'Step 5',
                      title: 'Obtain Further Information',
                      desc: 'Business First may contact the complainant, original sources, government authorities, companies, or independent experts.',
                    },
                    {
                      step: 'Step 6',
                      title: 'Determine Outcome',
                      desc: 'The reviewing editor determines whether the complaint is upheld, partially upheld, not upheld, resolved by clarification, or escalated.',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="px-2.5 py-1 bg-[#24214c] text-white font-bold text-xs rounded shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-bold text-[#24214c] text-sm md:text-base">{item.title}</h4>
                        <p className="text-xs md:text-sm text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 16. POSSIBLE OUTCOMES */}
              <section id="section-16" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  16. POSSIBLE OUTCOMES
                </h2>
                <p className="mb-3">Depending on the findings, Business First may:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {[
                    'Take no action (accurate reporting confirmed)',
                    'Correct a factual error',
                    'Update the article with new developments',
                    'Add context or clarify wording',
                    'Amend an inaccurate headline',
                    'Replace an image or graphic',
                    'Add source attribution',
                    'Publish a formal correction note',
                    'Add a comprehensive Editor’s Note',
                    'Offer or publish a right of reply',
                    'Correct a social media post',
                    'Remove particular information / redaction',
                    'Withdraw content in exceptional circumstances',
                    'Refer the matter for legal review',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs md:text-sm border border-gray-100">
                      <span className="text-[#cd2027] font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-medium">The remedy should be proportionate to the issue.</p>
              </section>

              {/* 17. RIGHT OF REPLY */}
              <section id="section-17" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  17. RIGHT OF REPLY
                </h2>
                <p className="mb-3">
                  Where appropriate, Business First may offer a right of reply. A right of reply does not necessarily mean that the original article was inaccurate. It may be appropriate where a significant allegation was made, the affected party lacked an opportunity to respond before publication, materially new information has emerged, or readers would benefit from hearing another perspective.
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Business First retains editorial discretion regarding length, format, placement, editing, and publication of any response.
                </p>
              </section>

              {/* 18. DISAGREEMENT IS NOT NECESSARILY AN ERROR */}
              <section id="section-18" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  18. DISAGREEMENT IS NOT NECESSARILY AN ERROR
                </h2>
                <p className="mb-3">
                  Business First distinguishes between a factual error and disagreement with accurate reporting. A complaint will not automatically be upheld because:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3 text-sm md:text-base">
                  <li>an article is unfavourable;</li>
                  <li>a company dislikes the headline;</li>
                  <li>a person disagrees with an expert opinion;</li>
                  <li>the article reports an inconvenient fact;</li>
                  <li>an organisation would prefer different wording;</li>
                  <li>coverage affects reputation; or</li>
                  <li>the subject wants accurate historical information removed.</li>
                </ul>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-600 text-blue-950 text-xs md:text-sm font-medium rounded-r-lg">
                  The key question is whether Business First&apos;s journalism is accurate, fair, lawful, and consistent with our editorial standards.
                </div>
              </section>

              {/* 19. OPINION CONTENT */}
              <section id="section-19" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  19. OPINION CONTENT
                </h2>
                <p className="mb-3">
                  Opinions are not corrected merely because another person holds a different opinion.
                </p>
                <p>
                  However, factual statements contained within opinion or thought-leadership content remain subject to appropriate accuracy standards. Business First may correct factual errors within opinion content without altering the legitimate viewpoint of the author.
                </p>
              </section>

              {/* 20. FINANCIAL AND INVESTMENT CONTENT */}
              <section id="section-20" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  20. FINANCIAL AND INVESTMENT CONTENT
                </h2>
                <p className="mb-3">
                  Because financial and investment information may influence decisions, errors in such content receive heightened attention. Potentially material errors include:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3 text-xs md:text-sm">
                  {[
                    'Investment amounts',
                    'Valuations',
                    'Stock prices',
                    'Market caps',
                    'Financial results',
                    'Funding stages',
                    'Transaction values',
                    'Revenue & profits',
                    'Debt obligations',
                    'Percentage movements',
                    'Regulatory status',
                    'Credit ratings',
                  ].map((item, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 border border-gray-100 rounded text-center font-medium text-gray-700">
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  When a material financial figure is corrected, Business First may include a visible correction notice.
                </p>
              </section>

              {/* 21. GOVERNMENT AND REGULATORY CONTENT */}
              <section id="section-21" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  21. GOVERNMENT AND REGULATORY CONTENT
                </h2>
                <p className="mb-3">
                  If Business First incorrectly reports legislation, government policy, regulatory requirements, fees, penalties, effective dates, eligibility, exemptions, or official procedures, the article should be reviewed promptly against the authoritative source.
                </p>
                <p className="text-sm text-gray-600">
                  Corrections should accurately distinguish between proposed measures, announced measures, enacted legislation, effective rules, and regulatory guidance.
                </p>
              </section>

              {/* 22. COMPANY AND EXECUTIVE INFORMATION */}
              <section id="section-22" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  22. COMPANY AND EXECUTIVE INFORMATION
                </h2>
                <p className="mb-3">
                  Corrections concerning company names, leadership titles, executive positions, ownership structures and other corporate information should be verified against appropriate records.
                </p>
                <p className="text-sm text-gray-600">
                  Business First is not obliged to alter historically accurate reporting simply because a person&apos;s position later changes. Where useful, an article may instead be updated to reflect the later development.
                </p>
              </section>

              {/* 23. CORRECTION OF QUOTATIONS */}
              <section id="section-23" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  23. CORRECTION OF QUOTATIONS
                </h2>
                <p className="mb-3">
                  Business First takes particular care with direct quotations. If a quotation was transcribed incorrectly and the error changes its meaning, it will be corrected.
                </p>
                <p className="text-sm text-gray-600">
                  A speaker may not retrospectively rewrite an accurately reported quotation simply because they would now prefer different wording. Where legitimate ambiguity exists, editorial clarification may be considered.
                </p>
              </section>

              {/* 24. PRIVACY COMPLAINTS */}
              <section id="section-24" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  24. PRIVACY COMPLAINTS
                </h2>
                <p className="mb-3">
                  Complaints concerning personal data and privacy are considered carefully against public interest, relevance, accuracy, consent, sensitivity, age, legitimate privacy expectations, harm, and applicable UAE law.
                </p>
                <p className="text-sm text-gray-600">
                  Privacy concerns may sometimes justify redaction, anonymisation, removal of an image, or modification of identifying information.
                </p>
              </section>

              {/* 25. CHILDREN AND VULNERABLE PERSONS */}
              <section id="section-25" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  25. CHILDREN AND VULNERABLE PERSONS
                </h2>
                <p className="mb-3">
                  Complaints involving children or vulnerable individuals receive enhanced consideration. Business First may act quickly where continued publication could create unnecessary or unlawful harm.
                </p>
              </section>

              {/* 26. COPYRIGHT COMPLAINTS */}
              <section id="section-26" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  26. COPYRIGHT COMPLAINTS
                </h2>
                <p className="mb-3">
                  Copyright complaints should be handled under Business First&apos;s Copyright &amp; Content Licensing Policy. Complaints should be directed to:
                </p>
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm mb-3">
                  <strong>Copyright Enquiries:</strong>{' '}
                  <a href="mailto:legal@businessfirstnews.com" className="text-[#cd2027] font-semibold hover:underline">
                    legal@businessfirstnews.com
                  </a>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  A copyright complaint should identify the protected work, allegedly infringing material, rights holder, evidence of authority, URL, and requested action.
                </p>
              </section>

              {/* 27. SPONSORED AND COMMERCIAL CONTENT COMPLAINTS */}
              <section id="section-27" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  27. SPONSORED AND COMMERCIAL CONTENT COMPLAINTS
                </h2>
                <p className="mb-3">
                  Business First accepts complaints regarding inaccurate sponsored content, unclear commercial disclosures, misleading advertising, or improper use of editorial formats.
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  Sponsored content remains subject to Business First&apos;s standards. Payment does not prevent us from correcting or removing content where appropriate.
                </p>
              </section>

              {/* 28. ADVERTISING COMPLAINTS */}
              <section id="section-28" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  28. ADVERTISING COMPLAINTS
                </h2>
                <p className="mb-3">
                  Complaints relating to advertisements may be referred to the commercial team, but editorial or legal review is required where an advertisement is alleged to be false, misleading, unlawful, or inconsistent with UAE advertising standards.
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  Business First reserves the right to suspend an advertisement while reviewing a serious concern.
                </p>
              </section>

              {/* 29. TAKEDOWN REQUESTS */}
              <section id="section-29" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  29. TAKEDOWN REQUESTS
                </h2>
                <div className="p-4 bg-red-50/50 border-l-4 border-red-600 rounded-r-xl mb-3">
                  <p className="text-sm font-semibold text-red-900">
                    Business First distinguishes between correction requests and requests to erase accurate journalism.
                  </p>
                </div>
                <p className="mb-2">
                  Accurate articles will not normally be removed solely because they are old, inconvenient, rank highly in search engines, affect reputation, or because company ownership or management has changed.
                </p>
                <p className="mb-2 font-semibold text-[#24214c]">Takedown may be considered where compelling circumstances exist:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                  <li>legal requirements or court orders;</li>
                  <li>serious privacy issues or safety concerns;</li>
                  <li>proven copyright infringement;</li>
                  <li>material factual unreliability that cannot be rectified by correction;</li>
                  <li>inappropriate identification of a minor; or</li>
                  <li>content accidentally published in error.</li>
                </ul>
              </section>

              {/* 30. DE-INDEXING AND ANONYMISATION */}
              <section id="section-30" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  30. DE-INDEXING AND ANONYMISATION
                </h2>
                <p className="mb-3">
                  In exceptional circumstances, Business First may consider alternatives to complete removal, such as removing a name from a headline, anonymising certain details, redacting personal data, restricting search indexing, removing an image, or attaching an explanatory Editor&apos;s Note.
                </p>
                <p className="text-xs text-gray-500">Such decisions are made on a case-by-case editorial assessment.</p>
              </section>

              {/* 31. SEARCH ENGINE RESULTS */}
              <section id="section-31" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  31. SEARCH ENGINE RESULTS
                </h2>
                <p className="mb-3">
                  Business First does not directly control how quickly third-party search engines update cached or indexed versions of corrected content. After a correction or removal, old versions may temporarily remain visible in external search results.
                </p>
                <p className="text-sm text-gray-600">
                  Business First is generally not responsible for third-party search indexing or external server caches outside our control.
                </p>
              </section>

              {/* 32. COMPLAINTS INTENDED TO SUPPRESS JOURNALISM */}
              <section id="section-32" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  32. COMPLAINTS INTENDED TO SUPPRESS JOURNALISM
                </h2>
                <p className="mb-3">
                  Business First will not knowingly allow complaint procedures to be used as a tool to improperly suppress legitimate journalism.
                </p>
                <p className="mb-3 text-red-700 font-semibold">
                  Complaints involving threats, pressure, advertising relationships, commercial leverage or attempts to exchange payment for removal will be escalated internally.
                </p>
                <p className="text-sm text-gray-600">
                  Commercial advertising spend does not provide a right to delete or influence accurate editorial coverage.
                </p>
              </section>

              {/* 33. ABUSIVE OR VEXATIOUS COMPLAINTS */}
              <section id="section-33" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  33. ABUSIVE OR VEXATIOUS COMPLAINTS
                </h2>
                <p className="mb-3">
                  Business First may limit engagement with complaints that are abusive, threatening, repetitive, knowingly false, clearly malicious, spam, or designed primarily to harass editorial staff.
                </p>
                <p className="text-sm text-gray-600">
                  Legitimate criticism will not be treated as abuse merely because it is strongly worded.
                </p>
              </section>

              {/* 34. CONFIDENTIALITY */}
              <section id="section-34" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  34. CONFIDENTIALITY
                </h2>
                <p className="mb-3">
                  Business First handles complaint information appropriately. However, details may be shared internally with editors, journalists, legal advisers, and management necessary to investigate the claim fairly.
                </p>
                <p className="text-xs text-gray-500">
                  We cannot guarantee confidentiality where disclosure is required by law or necessary to resolve the complaint.
                </p>
              </section>

              {/* 35. SOURCE CONFIDENTIALITY */}
              <section id="section-35" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  35. SOURCE CONFIDENTIALITY
                </h2>
                <p className="mb-3">
                  A complainant does not automatically have the right to know the identity of a confidential journalistic source.
                </p>
                <p className="text-sm text-gray-700">
                  Business First will respect legitimate source-protection commitments subject to applicable UAE law.
                </p>
              </section>

              {/* 36. APPEALS */}
              <section id="section-36" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  36. APPEALS
                </h2>
                <p className="mb-3">
                  Where a complainant believes a substantive complaint has not been appropriately addressed, they may request a senior editorial review.
                </p>
                <p className="mb-2 font-semibold text-[#24214c]">An appeal should explain:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3 text-sm">
                  <li>the original complaint and the response received;</li>
                  <li>why the complainant believes the outcome was incorrect; and</li>
                  <li>any new evidence.</li>
                </ul>
                <p className="text-sm text-gray-600">
                  Appeals are reviewed by the Editor-in-Chief, senior management, and/or legal counsel. The outcome represents Business First&apos;s final internal editorial position.
                </p>
              </section>

              {/* 37. EXTERNAL RIGHTS */}
              <section id="section-37" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  37. EXTERNAL RIGHTS
                </h2>
                <p className="mb-3">
                  Nothing in this Policy prevents a person from exercising rights available under applicable UAE law or approaching a competent authority where legally entitled to do so.
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  Business First expects complainants to communicate concerns accurately and in good faith.
                </p>
              </section>

              {/* 38. INTERNAL CORRECTIONS REGISTER */}
              <section id="section-38" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  38. INTERNAL CORRECTIONS REGISTER
                </h2>
                <p className="mb-3">
                  Business First maintains an internal corrections and complaints register tracking: date received, complainant, content concerned, issue raised, responsible editor, risk level, investigation findings, outcome, correction made, and closure date.
                </p>
                <p className="text-sm text-gray-600">
                  This helps Business First identify recurring editorial issues and maintain newsroom quality.
                </p>
              </section>

              {/* 39. CORRECTION RISK LEVELS */}
              <section id="section-39" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  39. CORRECTION RISK LEVELS
                </h2>
                <p className="mb-4">
                  For internal editorial escalation, complaints are classified into three risk tiers:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-green-200 bg-green-50/50 p-4 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="inline-block px-2.5 py-0.5 rounded bg-green-100 text-green-800 font-bold text-xs mb-2">
                        Level 1 — Minor
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        Typos, formatting, broken links, non-material title adjustments.
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-green-900 mt-2 pt-2 border-t border-green-200">
                      Action: Desk Editor
                    </p>
                  </div>

                  <div className="border border-amber-200 bg-amber-50/50 p-4 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="inline-block px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-xs mb-2">
                        Level 2 — Material
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        Financial figures, company facts, meaningful quotation errors, incorrect government information.
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-amber-900 mt-2 pt-2 border-t border-amber-200">
                      Action: Senior Editorial Review
                    </p>
                  </div>

                  <div className="border border-red-200 bg-red-50/50 p-4 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="inline-block px-2.5 py-0.5 rounded bg-red-100 text-red-800 font-bold text-xs mb-2">
                        Level 3 — High Risk
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        Defamation concerns, court matters, privacy issues, government-sensitive topics, minor identification, major copyright claims.
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-red-900 mt-2 pt-2 border-t border-red-200">
                      Action: Editor-in-Chief + Legal
                    </p>
                  </div>
                </div>
              </section>

              {/* 40. TARGET INTERNAL RESPONSE STANDARDS */}
              <section id="section-40" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  40. TARGET INTERNAL RESPONSE STANDARDS
                </h2>
                <p className="mb-3">As an internal operating target, Business First aims to:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-3 text-sm md:text-base">
                  <li>acknowledge ordinary substantive complaints promptly;</li>
                  <li>review straightforward factual errors as quickly as practical;</li>
                  <li>prioritise high-risk inaccuracies immediately;</li>
                  <li>communicate an outcome once sufficient information is available; and</li>
                  <li>correct confirmed material errors without unnecessary delay.</li>
                </ul>
                <p className="text-xs text-gray-500 italic">
                  These represent editorial quality standards rather than fixed statutory deadlines.
                </p>
              </section>

              {/* 41. LEARNING FROM CORRECTIONS */}
              <section id="section-41" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  41. LEARNING FROM CORRECTIONS
                </h2>
                <p className="mb-3">
                  Corrections should improve the newsroom. Business First periodically reviews complaint trends across sourcing, financial figures, headlines, attribution, press-release rewriting, photography, sponsored content, and workflow.
                </p>
                <p className="p-3 bg-gray-50 rounded border border-gray-200 text-sm font-semibold text-[#24214c]">
                  &ldquo;The objective is not only to correct yesterday&apos;s mistake. It is to reduce tomorrow&apos;s.&rdquo;
                </p>
              </section>

              {/* 42. RELATED BUSINESS FIRST POLICIES */}
              <section id="section-42" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  42. RELATED BUSINESS FIRST POLICIES
                </h2>
                <p className="mb-3">This Policy should be read together with:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
                  {[
                    { label: 'Editorial Policy & Standards', href: '/editorial-policy' },
                    { label: 'Copyright & Content Licensing Policy', href: '/copyright-policy' },
                    { label: 'Terms & Conditions', href: '/terms' },
                    { label: 'Privacy Policy', href: '/privacy-policy' },
                    { label: 'Disclaimer', href: '/disclaimer' },
                    { label: 'Cookie Policy', href: '/cookie-policy' },
                  ].map((p, idx) => (
                    <Link
                      key={idx}
                      href={p.href}
                      className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#cd2027] hover:text-[#cd2027] font-medium transition-colors flex items-center justify-between"
                    >
                      <span>{p.label}</span>
                      <span className="text-gray-400">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* 43. CONTACT US */}
              <section id="section-43" className="scroll-mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#24214c] mb-3">
                  43. CONTACT US
                </h2>
                <div className="bg-[#24214c] text-white p-6 md:p-8 rounded-2xl shadow-md space-y-4">
                  <h3 className="text-lg font-bold text-[#fbbf24]">
                    Business First Editorial &amp; Legal Desk
                  </h3>
                  <p className="text-sm text-white/80">
                    A division of Befirst Media Productions
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm pt-2">
                    <div>
                      <p className="text-white/50 text-[11px] uppercase font-bold">Editorial Corrections &amp; Complaints</p>
                      <a href="mailto:editorial@businessfirstnews.com" className="text-white hover:text-[#fbbf24] font-semibold break-all">
                        editorial@businessfirstnews.com
                      </a>
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase font-bold">Legal / Privacy Matters</p>
                      <a href="mailto:legal@businessfirstnews.com" className="text-white hover:text-[#fbbf24] font-semibold break-all">
                        legal@businessfirstnews.com
                      </a>
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase font-bold">Advertising &amp; Commercial</p>
                      <a href="mailto:ads@businessfirstnews.com" className="text-white hover:text-[#fbbf24] font-semibold break-all">
                        ads@businessfirstnews.com
                      </a>
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase font-bold">Official Website</p>
                      <a href="https://businessfirstnews.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#fbbf24] font-semibold">
                        businessfirstnews.com
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 text-xs text-white/60 space-y-1">
                    <p><strong>Registered Legal Entity:</strong> Befirst Media Productions (operating through Business First)</p>
                    <p><strong>Registered Address:</strong> Dubai, United Arab Emirates</p>
                  </div>
                </div>
              </section>

              {/* OUR CORRECTIONS PROMISE */}
              <div className="mt-8 p-6 md:p-8 bg-gradient-to-br from-[#24214c] to-[#161435] text-white rounded-2xl shadow-xl border border-white/10">
                <div className="flex items-center gap-2 text-[#fbbf24] text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles size={16} /> Our Corrections Promise
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3">
                  Accountability in Every Story
                </h3>
                <p className="text-sm md:text-base text-white/85 leading-relaxed mb-4">
                  Business First does not expect journalism to be beyond challenge. We expect it to be accountable.
                </p>
                <div className="space-y-2 border-l-2 border-[#fbbf24] pl-4 text-sm text-white/90 italic mb-5">
                  <p>When we are wrong, we will correct the record.</p>
                  <p>When more context is needed, we will clarify.</p>
                  <p>When new information changes a story, we will update it.</p>
                  <p>And when our reporting is accurate, responsible and properly sourced, we will stand by it.</p>
                </div>
                <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <p className="text-[#fbbf24] font-bold text-sm md:text-base">
                    Accuracy earns trust. Accountability keeps it.
                  </p>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    Business First — News That Means Business.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Sticky Sidebar */}
          <CorrectionsSidebar />

        </div>
      </SectionContainer>

      {/* Ad Banner */}

    </main>
  );
}
