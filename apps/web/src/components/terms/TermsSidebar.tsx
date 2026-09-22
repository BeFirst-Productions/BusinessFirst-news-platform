import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Scale, ShieldCheck, Mail, FileText, AlertCircle, Building2, Gavel, CheckCircle2 } from 'lucide-react';

const TermsSidebar = () => {
  return (
    <aside className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-8 self-start">
      <div className="bg-[#24214c] rounded-[24px] p-8 flex flex-col gap-7 shadow-xl text-white">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#fbbf24] text-xs font-bold uppercase tracking-wider w-fit">
            <Scale size={14} /> Legal Agreement
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide mt-1">
            Terms Summary
          </h3>
          <p className="text-white/70 text-xs md:text-sm">
            Contractual framework governing platform access, news journalism, commercial advertising, and media services.
          </p>
        </div>

        {/* Core Highlights */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#fbbf24]">
              <Gavel size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Governing Law</span>
              <span className="text-sm font-medium leading-snug">
                Operates under UAE federal laws and national media regulatory frameworks.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
              <ShieldCheck size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Editorial Integrity</span>
              <span className="text-sm font-medium leading-snug">
                Advertising and commercial relationships do not entitle clients to influence independent news reporting.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-red-400">
              <AlertCircle size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">No Financial Advice</span>
              <span className="text-sm font-medium leading-snug">
                Content is strictly general business news and educational information — not investment advice.
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Quick Navigation Anchor Links */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Key Sections</span>
          <div className="flex flex-col gap-2 text-xs md:text-sm">
            <a href="#section-1" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>1. Introduction &amp; Legal Entity</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-3" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>3. Business First Services</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-6" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>6. News &amp; Editorial Independence</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-10" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>10. No Financial / Investment Advice</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-12" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>12. Advertising &amp; Sponsored Content</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-28" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>28. Intellectual Property &amp; Scraping</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-40" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>40. Limitation of Liability &amp; Force Majeure</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-49" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>49. UAE Governing Law &amp; Jurisdiction</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-52" className="hover:text-[#fbbf24] transition-colors py-1 flex items-center justify-between">
              <span>52. Contact Information</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Direct Contact Box */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider">
            <Mail size={14} className="text-[#fbbf24]" />
            <span>Direct Enquiries</span>
          </div>
          <div className="text-xs text-white/80 space-y-2">
            <div>
              <p className="text-white/50 text-[11px]">Legal &amp; Compliance:</p>
              <a href="mailto:legal@businessfirstnews.com" className="hover:text-[#fbbf24] font-medium break-all">
                legal@businessfirstnews.com
              </a>
            </div>
            <div>
              <p className="text-white/50 text-[11px]">Advertising &amp; Commercial:</p>
              <a href="mailto:advertise@businessfirstnews.com" className="hover:text-[#fbbf24] font-medium break-all">
                advertise@businessfirstnews.com
              </a>
            </div>
            <div>
              <p className="text-white/50 text-[11px]">Editorial Desk:</p>
              <a href="mailto:editorial@businessfirstnews.com" className="hover:text-[#fbbf24] font-medium break-all">
                editorial@businessfirstnews.com
              </a>
            </div>
          </div>
        </div>

        {/* Related Policies */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Governance Framework</span>
          <div className="flex flex-col gap-2 text-xs md:text-sm">
            <Link href="/privacy-policy" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Privacy Policy</span>
            </Link>
            <Link href="/editorial-policy" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Editorial Policy</span>
            </Link>
            <Link href="/copyright-policy" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Copyright &amp; Content Policy</span>
            </Link>
            <Link href="/corrections-policy" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Corrections &amp; Complaints</span>
            </Link>
            <Link href="/disclaimer" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Disclaimer</span>
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Cookie Policy</span>
            </Link>
          </div>
        </div>

        {/* Social Channels */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Follow Business First</span>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/businessfirstuae"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#fbbf24] hover:text-[#24214c] transition-colors text-white"
            >
              <FaXTwitter size={14} />
            </a>
            <a
              href="https://www.linkedin.com/company/109375094/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#fbbf24] hover:text-[#24214c] transition-colors text-white"
            >
              <FaLinkedinIn size={14} />
            </a>
            <a
              href="https://www.facebook.com/businessfirstuae"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#fbbf24] hover:text-[#24214c] transition-colors text-white"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://www.instagram.com/businessfirstuae"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#fbbf24] hover:text-[#24214c] transition-colors text-white"
            >
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default TermsSidebar;
