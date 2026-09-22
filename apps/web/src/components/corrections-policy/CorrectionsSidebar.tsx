import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { CheckCircle2, ShieldCheck, Mail, ExternalLink, FileText, AlertCircle, RefreshCw, Scale } from 'lucide-react';

const CorrectionsSidebar = () => {
  return (
    <aside className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-8 self-start">
      <div className="bg-[#24214c] rounded-[24px] p-8 flex flex-col gap-7 shadow-xl text-white">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#fbbf24] text-xs font-bold uppercase tracking-wider w-fit">
            <ShieldCheck size={14} /> Editorial Standards
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide mt-1">
            Corrections &amp; Complaints
          </h3>
          <p className="text-white/70 text-xs md:text-sm">
            Our framework for handling factual corrections, editorial clarifications, and formal reader concerns.
          </p>
        </div>

        {/* Core Principles */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#fbbf24]">
              <CheckCircle2 size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Our Objective</span>
              <span className="text-sm font-medium leading-snug">
                Correct what is wrong. Clarify what is unclear. Stand by accurate journalism.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
              <RefreshCw size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Accountability</span>
              <span className="text-sm font-medium leading-snug">
                Acknowledging and correcting genuine errors promptly strengthens public trust.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-red-400">
              <Mail size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Corrections Desk</span>
              <a
                href="mailto:editorial@businessfirstnews.com"
                className="text-sm font-medium leading-snug hover:text-red-400 transition-colors break-all"
              >
                editorial@businessfirstnews.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Quick Navigation Anchor Links */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Quick Navigation</span>
          <div className="flex flex-col gap-2 text-xs md:text-sm">
            <a href="#section-1" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>1. Our Commitment</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-4" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>4. Types of Editorial Changes</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-10" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>10. Submit a Correction Request</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-13" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>13. Complaint Format</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-15" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>15. Review Process</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-18" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>18. Disagreement vs Error</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-29" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>29. Takedown Requests</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-39" className="hover:text-[#fbbf24] transition-colors py-1 border-b border-white/5 flex items-center justify-between">
              <span>39. Correction Risk Levels</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
            <a href="#section-43" className="hover:text-[#fbbf24] transition-colors py-1 flex items-center justify-between">
              <span>43. Contact Details &amp; Promise</span>
              <span className="text-white/30 text-xs">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Direct Contact Card */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider">
            <Mail size={14} className="text-[#fbbf24]" />
            <span>Dedicated Desks</span>
          </div>
          <div className="text-xs text-white/80 space-y-2">
            <div>
              <p className="text-white/50 text-[11px]">Editorial &amp; Corrections:</p>
              <a href="mailto:editorial@businessfirstnews.com" className="hover:text-[#fbbf24] font-medium break-all">
                editorial@businessfirstnews.com
              </a>
            </div>
            <div>
              <p className="text-white/50 text-[11px]">Legal &amp; Privacy:</p>
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
          </div>
        </div>

        {/* Related Policies */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Related Policies</span>
          <div className="flex flex-col gap-2 text-xs md:text-sm">
            <Link href="/editorial-policy" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Editorial Policy</span>
            </Link>
            <Link href="/copyright-policy" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Copyright &amp; Content Policy</span>
            </Link>
            <Link href="/terms" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Terms &amp; Conditions</span>
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#fbbf24] transition-colors flex items-center gap-2">
              <FileText size={14} />
              <span>Privacy Policy</span>
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

export default CorrectionsSidebar;
