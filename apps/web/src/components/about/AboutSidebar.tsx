import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Compass, Users, Target, ArrowUpRight, Megaphone, Mail } from 'lucide-react';

const AboutSidebar = () => {
  return (
    <aside className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-8 self-start">
      <div className="bg-[#24214c] rounded-[24px] p-8 flex flex-col gap-8 shadow-xl text-white">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-white tracking-wide">
            At a Glance
          </h3>
          <p className="text-white/70 text-xs md:text-sm">
            UAE-focused digital business news and media platform.
          </p>
        </div>

        {/* Platform Facts */}
        <div className="flex flex-col gap-5">
          {/* Item 1 */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#fbbf24]">
              <Compass size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Market Focus</span>
              <span className="text-sm font-medium leading-snug">
                United Arab Emirates & GCC
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-red-400">
              <Users size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Target Readership</span>
              <span className="text-sm font-medium leading-snug">
                Entrepreneurs, C-Suite, Investors & Decision-Makers
              </span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
              <Target size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Editorial Coverage</span>
              <span className="text-sm font-medium leading-snug">
                Policy, Real Estate, Tech, Finance, Energy & Leadership
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Quick Action Links */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">
            Explore Further
          </span>
          <Link
            href="/advertise"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-[#FF0202] text-white text-xs sm:text-sm font-bold transition duration-200"
          >
            <span className="flex items-center gap-2">
              <Megaphone size={16} /> Advertise With Us
            </span>
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href="/contact"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition duration-200"
          >
            <span className="flex items-center gap-2">
              <Mail size={16} /> Contact the Newsroom
            </span>
            <ArrowUpRight size={16} />
          </Link>
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

export default AboutSidebar;
