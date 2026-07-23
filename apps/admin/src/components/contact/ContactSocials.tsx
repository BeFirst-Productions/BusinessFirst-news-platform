import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactSocials = () => {
  return (
    <div className="w-full lg:w-[35%] shrink-0">
      <div className="bg-[#24214c] rounded-[24px] p-8 flex flex-col gap-8 shadow-xl text-white">
        
        {/* Contact Info Header */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-white tracking-wide">
            Contact Information
          </h3>
          <p className="text-white/70 text-xs md:text-sm">
            Reach out to us directly through any of the channels below.
          </p>
        </div>

        {/* Info Items List */}
        <div className="flex flex-col gap-6">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={20} className="text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Address</span>
              <span className="text-sm font-medium leading-relaxed">
                Office 402, Floor 4, Media One Tower, Dubai Media City, Dubai, UAE
              </span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Phone size={20} className="text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Phone</span>
              <a href="tel:+97141234567" className="text-sm font-medium hover:text-[#fbbf24] transition-colors">
                +971 4 123 4567
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Mail size={20} className="text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Email</span>
              <a href="mailto:info@businessfirst.ae" className="text-sm font-medium hover:text-[#fbbf24] transition-colors break-all">
                info@businessfirst.ae
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10"></div>

        {/* Social Media Links */}
        <div className="flex flex-col gap-4">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Follow Us</span>
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a 
              href="#" 
              aria-label="Instagram"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF0202] hover:scale-105 transition-all duration-300 shadow-md"
            >
              <FaInstagram className="w-5 h-5" />
            </a>

            {/* X (Twitter) */}
            <a 
              href="#" 
              aria-label="X (Twitter)"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-black hover:scale-105 transition-all duration-300 shadow-md"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>

            {/* LinkedIn */}
            <a 
              href="#" 
              aria-label="LinkedIn"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#0077b5] hover:scale-105 transition-all duration-300 shadow-md"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>

            {/* Facebook */}
            <a 
              href="#" 
              aria-label="Facebook"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#1877f2] hover:scale-105 transition-all duration-300 shadow-md"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactSocials;
