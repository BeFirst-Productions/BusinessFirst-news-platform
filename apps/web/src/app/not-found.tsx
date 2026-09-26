'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import SectionContainer from '@/components/SectionContainer';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found | Business First';
  }, []);

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 py-16 md:py-24">
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          {/* Top Editorial Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#FF0202] text-xs font-semibold tracking-wider uppercase shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF0202] animate-ping" />
            <span>Editorial Archive Notice &bull; Error 404</span>
          </div>

          {/* Big Stylized 404 Headline */}
          <div className="relative mb-2">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-black tracking-tighter text-[#24214c]/10 select-none leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#24214c] font-newsreader tracking-tight">
                4<span className="text-[#FF0202]">0</span>4
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#24214c] font-newsreader mb-4 max-w-xl leading-snug">
            Headline Not Found: Story Out of Circulation
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-lg font-normal leading-relaxed mb-10">
            The article, market dispatch, or page you requested could not be located. It may have been updated, relocated under an archive, or is no longer published.
          </p>

          {/* Only Return to Homepage Button */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#24214c] hover:bg-[#1b1839] text-white font-semibold text-base rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <Home size={20} className="transition-transform group-hover:scale-110" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
