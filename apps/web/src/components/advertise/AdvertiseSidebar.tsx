import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Mail, Phone, Download, ArrowUpRight, MessageSquare, ShieldCheck, FileText } from 'lucide-react';

interface AdvertiseSidebarProps {
  onOpenMediaKit: () => void;
}

const AdvertiseSidebar: React.FC<AdvertiseSidebarProps> = ({ onOpenMediaKit }) => {
  const handleScrollToForm = () => {
    const el = document.getElementById('proposal-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-8 self-start">
      <div className="bg-[#24214c] rounded-[24px] p-8 flex flex-col gap-6 shadow-xl text-white">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-white tracking-wide">
            Advertising & Partnerships
          </h3>
          <p className="text-white/70 text-xs md:text-sm">
            Put your business where business is. Connect with our commercial team in Dubai.
          </p>
        </div>

        {/* Direct Contacts List */}
        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#fbbf24]">
              <Mail size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Email Inquiry</span>
              <a
                href="mailto:ads@businessfirstnews.com"
                className="text-sm font-semibold hover:text-[#fbbf24] transition break-all mt-0.5"
              >
                ads@businessfirstnews.com
              </a>
              <span className="text-[11px] text-white/50">info@businessfirstnews.com</span>
            </div>
          </div>

          {/* Phone & WhatsApp */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
              <Phone size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Call / WhatsApp</span>
              <a
                href="tel:+971588984455"
                className="text-sm font-semibold hover:text-emerald-400 transition mt-0.5"
              >
                +971 58 898 4455
              </a>
              <a
                href="https://wa.me/97141234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1 mt-0.5 font-medium"
              >
                <MessageSquare size={12} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
            Media Resources
          </span>

          <button
            type="button"
            onClick={onOpenMediaKit}
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#FF0202] hover:bg-[#d90000] text-white text-xs sm:text-sm font-bold transition duration-200 cursor-pointer shadow-md"
          >
            <span className="flex items-center gap-2">
              <Download size={16} /> Download Media Kit
            </span>
            <ArrowUpRight size={16} />
          </button>

          <button
            type="button"
            onClick={handleScrollToForm}
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition duration-200 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FileText size={16} /> Request a Proposal
            </span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Assurance Box */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <ShieldCheck size={24} className="text-[#fbbf24] shrink-0" />
          <p className="text-xs text-white/80 leading-snug">
            Direct access to high-net-worth investors, CXOs, founders, and business leaders across the UAE.
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Social Media Links */}
        <div className="flex flex-col gap-4">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Follow Us</span>
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/businessfirstuae"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF0202] hover:scale-105 transition-all duration-300"
            >
              <FaInstagram size={17} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/109375094/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF0202] hover:scale-105 transition-all duration-300"
            >
              <FaLinkedinIn size={17} />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/businessfirstuae"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF0202] hover:scale-105 transition-all duration-300"
            >
              <FaFacebookF size={17} />
            </a>

            {/* X */}
            <a
              href="https://x.com/businessfirstuae"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF0202] hover:scale-105 transition-all duration-300"
            >
              <FaXTwitter size={17} />
            </a>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default AdvertiseSidebar;
