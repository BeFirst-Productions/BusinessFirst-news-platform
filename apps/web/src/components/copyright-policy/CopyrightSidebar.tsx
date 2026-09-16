import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Copyright, ShieldCheck, Scale, Mail, ExternalLink, FileText, Share2, Ban } from 'lucide-react';

const CopyrightSidebar = () => {
  return (
    <aside className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-8 self-start">
      <div className="bg-[#24214c] rounded-[24px] p-8 flex flex-col gap-7 shadow-xl text-white">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#fbbf24] text-xs font-bold uppercase tracking-wider w-fit">
            <Copyright size={14} /> Content &amp; IP
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide mt-1">
            Copyright Summary
          </h3>
          <p className="text-white/70 text-xs md:text-sm">
            Rules and licensing standards for using, quoting, and sharing Business First content.
          </p>
        </div>

        {/* Core Principles */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#fbbf24]">
              <Share2 size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Golden Rule</span>
              <span className="text-sm font-medium leading-snug">
                You are welcome to share our journalism. Please share the link — not the article.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-red-400">
              <Ban size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">AI &amp; Scraping</span>
              <span className="text-sm font-medium leading-snug">
                Unauthorised model training, bulk mining &amp; scraping are strictly prohibited.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
              <Mail size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Licensing Enquiries</span>
              <a
                href="mailto:licensing@businessfirstuae.com"
                className="text-sm font-medium leading-snug hover:text-red-400 transition-colors break-all"
              >
                licensing@businessfirstuae.com
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
            <a href="#section-ownership" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>2. Ownership of Content</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-branding" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>3. Business First Branding</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-sharing" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>5. Sharing Articles</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-quoting" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>6. Quoting Content</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-prohibited" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>7. What is Not Permitted</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-licensing" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>9. Content Licensing</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-ai-scraping" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>21-22. AI &amp; Web Scraping</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-complaints" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>47. Copyright Complaints</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-contact" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>57. Licensing Contacts</span>
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
            href="/editorial-policy"
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-red-400" />
              <span>Editorial Policy</span>
            </div>
            <ExternalLink size={13} className="text-white/50" />
          </Link>

          <Link
            href="/terms"
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-[#fbbf24]" />
              <span>Terms &amp; Conditions</span>
            </div>
            <ExternalLink size={13} className="text-white/50" />
          </Link>

          <Link
            href="/privacy-policy"
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-amber-300" />
              <span>Privacy Policy</span>
            </div>
            <ExternalLink size={13} className="text-white/50" />
          </Link>

          <Link
            href="/disclaimer"
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-white" />
              <span>Disclaimer</span>
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

export default CopyrightSidebar;
