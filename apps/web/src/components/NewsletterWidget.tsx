import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const NewsletterWidget = () => {
  return (
    <div className="bg-[#1F194E] rounded-xl p-6 relative overflow-hidden h-[180px] shrink-0 flex flex-col justify-center shadow-md">
      {/* Palm trees background illustration */}
      <div className="absolute left-0 bottom-0 w-full h-full opacity-20 pointer-events-none flex items-end">
        <svg viewBox="0 0 300 150" fill="white" className="w-48 h-auto">
          {/* Desert Dunes */}
          <path d="M0,150 Q75,120 150,150 T300,150 L300,150 L0,150 Z" opacity="0.5" />
          {/* Palm Tree Left */}
          <path d="M30,150 Q35,100 40,70 Q25,65 10,75 Q35,60 40,70 Q45,55 55,50 Q45,65 40,70 Q55,68 65,80 Q45,72 40,70 Z" />
          {/* Palm Tree Small */}
          <path d="M15,150 Q18,120 22,95 Q10,92 0,100 Q18,88 22,95 Q26,83 34,80 Q27,92 22,95 Q33,93 40,103 Q27,97 22,95 Z" />
          {/* Camels Caravan */}
          <path d="M90,142 C92,138 94,136 96,138 C98,136 100,138 102,142 L100,145 L92,145 Z M110,143 C112,139 114,138 116,139 C118,138 120,139 122,143 L120,145 L112,145 Z" />
        </svg>
      </div>

      <div className="relative z-10">
        <h3 className="text-[#fbb03b] text-center font-bold text-lg md:text-xl leading-tight mb-4 tracking-wide">
          Subscribe to our<br />Weekly Newsletter
        </h3>

        <form className="relative flex items-center w-full bg-white rounded-md overflow-hidden p-1 shadow-sm">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-3 py-1.5 text-xs md:text-sm text-gray-700 outline-none w-full"
            required
          />
          <button
            type="submit"
            className="bg-[#FF0202] hover:bg-[#d00202] text-white text-[10px] md:text-xs font-bold uppercase py-2 px-3 md:px-4 rounded transition flex items-center shrink-0"
          >
            SUBSCRIBE <ArrowUpRight size={14} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterWidget;
