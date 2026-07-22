import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const NewsletterWidget = () => {
  return (
    <div className="bg-[#241F52] rounded-xl p-6 relative overflow-hidden h-[180px] flex flex-col justify-center shadow-md">
      {/* Palm trees background illustration (simulated with CSS/SVGs if needed, here just dark blue bg) */}
      <div className="absolute left-0 bottom-0 w-[300px] h-full opacity-20 pointer-events-none">
        {/* Placeholder for desert/camel graphics */}
        <img src="/shapes/shape01.svg" alt="Decorative shape" className="absolute bottom-0 left-0 w-full h-auto" />
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
            className="bg-[#cd2027] hover:bg-[#a61a1f] text-white text-[10px] md:text-xs font-bold uppercase py-2 px-3 md:px-4 rounded transition flex items-center shrink-0"
          >
            Subscribe <ArrowUpRight size={14} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterWidget;
