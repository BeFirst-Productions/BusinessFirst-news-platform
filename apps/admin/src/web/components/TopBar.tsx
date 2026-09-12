import React from 'react';
import { CloudSun, Calendar } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';

import SectionContainer from './SectionContainer';

const TopBar = () => {
  return (
    <SectionContainer 
      as="div"
      className="bg-[#f8f9fa] border-b border-gray-200"
      containerClassName="py-2 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-0 text-xs md:text-sm text-gray-700"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2 font-medium">
          <CloudSun size={16} className="text-gray-800" />
          <span>31 C | Dubai</span>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <Calendar size={16} className="text-gray-600" />
          <span>Tuesday, 23 Sep 2025</span>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <a 
            href="https://x.com/businessfirstuae" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="X (Twitter)"
            className="bg-black text-white p-1.5 rounded-sm cursor-pointer hover:bg-gray-800 transition inline-flex items-center justify-center"
          >
            <FaXTwitter size={14} />
          </a>
          <a 
            href="https://www.linkedin.com/company/109375094/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            className="bg-black text-white p-1.5 rounded-sm cursor-pointer hover:bg-gray-800 transition inline-flex items-center justify-center"
          >
            <FaLinkedinIn size={14} />
          </a>
          <a 
            href="https://www.facebook.com/businessfirstuae" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook"
            className="bg-black text-white p-1.5 rounded-sm cursor-pointer hover:bg-gray-800 transition inline-flex items-center justify-center"
          >
            <FaFacebookF size={14} />
          </a>
          <a 
            href="https://www.instagram.com/businessfirstuae" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
            className="bg-black text-white p-1.5 rounded-sm cursor-pointer hover:bg-gray-800 transition inline-flex items-center justify-center"
          >
            <FaInstagram size={14} />
          </a>
        </div>
        
        <button className="bg-[#24214c] hover:bg-[#1a183d] text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition">
          Subscribe
        </button>
        <button className="bg-[#cd2027] hover:bg-[#a61a1f] text-white px-6 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition">
          Login
        </button>
      </div>
    </SectionContainer>
  );
};

export default TopBar;
