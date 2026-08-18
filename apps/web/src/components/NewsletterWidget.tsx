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
    <div className="bg-[#1F194E] rounded-xl p-6 relative overflow-hidden min-h-[300px] flex flex-col justify-center shadow-md">
      {/* Background shape */}
      <div className="absolute left-0 bottom-0 w-full h-full pointer-events-none flex items-end">
        <img src="/shapes/shape01.svg" alt="Background shape" className="w-[85%] md:w-[75%] h-auto object-contain" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <h3 className="text-[#fbb03b] text-center font-bold text-lg md:text-xl leading-tight mb-4 tracking-wide">
          Subscribe to our<br />Weekly Newsletter
        </h3>

        <form className="relative flex flex-col items-center w-full gap-4" onSubmit={handleSubscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-2.5 text-sm text-gray-700 bg-[#F4F4F4] rounded-md outline-none"
            required
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#FF0202] hover:bg-[#d00000] text-white text-[12px] font-bold uppercase py-2 px-6 rounded-md transition flex items-center justify-center shrink-0 disabled:opacity-70"
          >
            {isPending ? 'SUBSCRIBING...' : 'SUBSCRIBE'} <ArrowUpRight size={16} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterWidget;
