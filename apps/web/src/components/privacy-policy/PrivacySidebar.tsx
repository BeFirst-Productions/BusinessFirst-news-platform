import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { ShieldCheck, Lock, Mail, ExternalLink, FileText, UserCheck } from 'lucide-react';

const PrivacySidebar = () => {
  return (
    <aside className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-8 self-start">
      <div className="bg-[#24214c] rounded-[24px] p-8 flex flex-col gap-7 shadow-xl text-white">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#fbbf24] text-xs font-bold uppercase tracking-wider w-fit">
            <Lock size={14} /> Data Protection
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide mt-1">
            Privacy Summary
          </h3>
          <p className="text-white/70 text-xs md:text-sm">
            How Business First collects, manages, and safeguards your personal data under UAE data protection laws.
          </p>
        </div>

        {/* Key Information */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#fbbf24]">
              <ShieldCheck size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Data Controller</span>
              <span className="text-sm font-medium leading-snug">
                Befirst Media Productions (Business First)
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-red-400">
              <UserCheck size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Governing Law</span>
              <span className="text-sm font-medium leading-snug">
                UAE Federal Decree-Law No. 45 of 2021
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
              <Mail size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">DPO / Privacy Contact</span>
              <a
                href="mailto:privacy@businessfirstnews.com"
                className="text-sm font-medium leading-snug hover:text-red-400 transition-colors break-all"
              >
                privacy@businessfirstnews.com
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
            <a href="#section-1" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>1. Introduction</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-5" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>5. Personal Data We Collect</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-7" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>7. How We Use Personal Data</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-8" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>8. Basis for Processing</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-14" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>14. Data Security</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-17" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>17. Your Data Protection Rights</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-21" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>21. Journalistic &amp; Public Data</span>
              <span className="text-white/40">&rarr;</span>
            </a>
            <a href="#section-30" className="hover:text-red-400 transition-colors py-1 flex items-center justify-between">
              <span>30. Contact Us</span>
              <span className="text-white/40">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Legal Cross-Links */}
        <div className="flex flex-col gap-2.5">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
            Related Policies
          </span>

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
            href="/disclaimer"
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-red-400" />
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

export default PrivacySidebar;
