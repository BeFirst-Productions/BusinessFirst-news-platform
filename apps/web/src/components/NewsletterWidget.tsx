"use client";

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNewsletterSubscribe } from '@/hooks/use-newsletter';

const NewsletterWidget = () => {
  const [email, setEmail] = useState('');
  const { mutate: subscribe, isPending } = useNewsletterSubscribe();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribe(email, {
        onSuccess: () => setEmail(''),
      });
    }
  };
  return (
    <div className="bg-[#1F194E] rounded-3xl p-5 sm:p-6 xl:p-8 relative overflow-hidden min-h-[230px] xl:min-h-[270px] flex flex-col justify-center shadow-lg">
      {/* Background desert silhouette illustration */}
      <img
        src="/shapes/shape01.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-left-bottom pointer-events-none select-none"
      />

      <div className="relative z-10 w-full flex flex-col pl-[14%] sm:pl-[16%] xl:pl-[20%] pr-1 sm:pr-2">
        <h3 className="text-[#fcb827] font-bold text-lg sm:text-xl xl:text-[24px] leading-[1.2] mb-3 sm:mb-4 tracking-tight text-left">
          Subscribe to our<br />Weekly Newsletter
        </h3>

        <form className="relative flex flex-col w-full" onSubmit={handleSubscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 xl:py-3 text-xs sm:text-sm text-gray-800 placeholder:text-gray-500 bg-[#F4F4F6] rounded-xl sm:rounded-2xl outline-none focus:ring-2 focus:ring-[#fcb827]/70 transition-all shadow-sm"
            required
            disabled={isPending}
          />
          <div className="flex justify-end w-full mt-2.5 sm:mt-3">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#FF0202] hover:bg-[#d80000] active:scale-95 text-white text-xs sm:text-sm font-bold tracking-wider uppercase py-2 sm:py-2.5 px-5 sm:px-6 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-md disabled:opacity-70 group"
            >
              <span>{isPending ? 'SUBSCRIBING...' : 'SUBSCRIBE'}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterWidget;
