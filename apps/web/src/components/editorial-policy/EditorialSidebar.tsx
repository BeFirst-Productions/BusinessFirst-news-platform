import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Newspaper, ShieldCheck, CheckCircle, Scale, Mail, ExternalLink, FileText, Send } from 'lucide-react';

const EditorialSidebar = () => {
  return (
    <aside className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-8 self-start">
      <div className="bg-[#24214c] rounded-[24px] p-8 flex flex-col gap-7 shadow-xl text-white">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#fbbf24] text-xs font-bold uppercase tracking-wider w-fit">
            <Newspaper size={14} /> Journalism Standards
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide mt-1">
            Editorial Summary
          </h3>
          <p className="text-white/70 text-xs md:text-sm">
            Our commitment to accuracy, independence, context and UAE media standards.
          </p>
        </div>

        {/* Core Principles */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#fbbf24]">
              <CheckCircle size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Editorial Standard</span>
              <span className="text-sm font-medium leading-snug">
                Accuracy before speed. What happened, why it matters, what&apos;s next.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-red-400">
              <Scale size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Commercial Separation</span>
              <span className="text-sm font-medium leading-snug">
                Strict boundary between independent journalism &amp; advertising.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
              <Send size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Newsroom &amp; Corrections</span>
              <a
                href="mailto:editorial@businessfirstuae.com"
                className="text-sm font-medium leading-snug hover:text-red-400 transition-colors break-all"
              >
                editorial@businessfirstuae.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Quick Navigation Anchor Links */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
            Key Sections
          </span>
          <div className="flex flex-col gap-2 text-xs font-medium text-white/80">
            <a href="#section-mission" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>1. Editorial Mission</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-values" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>2. Core Editorial Values</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-uae-standards" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>3. UAE Media Standards</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-1-minute-read" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>10. 1-Minute Read Format</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-corrections" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>15. Corrections Policy</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-ai" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>27. AI &amp; Technology Tools</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-commercial-separation" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>39. Editorial / Commercial Line</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-checklist" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>50. Pre-Publication Checklist</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-contact" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>59. Contact the Newsroom</span>
              <span className="text-white/40">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Related Policies */}
        <div className="flex flex-col gap-2.5">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
            Related Policies
          </span>

          <Link
            href="/disclaimer"
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-red-400" />
              <span>Disclaimer</span>
            </div>
            <ExternalLink size={13} className="text-white/50" />
          </Link>

          <Link
            href="/privacy-policy"
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-[#fbbf24]" />
              <span>Privacy Policy</span>
            </div>
            <ExternalLink size={13} className="text-white/50" />
          </Link>

          <Link
            href="/cookie-policy"
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-amber-300" />
              <span>Cookie Policy</span>
            </div>
            <ExternalLink size={13} className="text-white/50" />
          </Link>

          <Link
            href="/terms"
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-white" />
              <span>Terms &amp; Conditions</span>
            </div>
            <ExternalLink size={13} className="text-white/50" />
          </Link>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Social Media Links */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
            Follow Business First
          </span>
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/company/109375094/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF0202] text-white flex items-center justify-center transition-colors"
            >
              <FaLinkedinIn size={14} />
            </a>
            <a
              href="https://x.com/businessfirstuae"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF0202] text-white flex items-center justify-center transition-colors"
            >
              <FaXTwitter size={14} />
            </a>
            <a
              href="https://www.facebook.com/businessfirstuae"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF0202] text-white flex items-center justify-center transition-colors"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://www.instagram.com/businessfirstuae"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF0202] text-white flex items-center justify-center transition-colors"
            >
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default EditorialSidebar;
