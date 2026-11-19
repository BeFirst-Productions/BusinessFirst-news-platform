'use client';

import React from 'react';
import { RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6 font-sans">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Core System Disruption &bull; Error 500</span>
          </div>

          <div className="relative mb-2">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-black tracking-tighter text-[#24214c]/10 select-none leading-none">
              500
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#24214c] tracking-tight">
                5<span className="text-amber-500">0</span>0
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#24214c] mb-4 max-w-xl">
            Editorial Transmission Interrupted: System Disruption
          </h2>

          <p className="text-base text-slate-600 max-w-lg mb-8 leading-relaxed">
            Our newsroom servers encountered an unexpected internal disruption. Our technical operations desk has been notified.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#24214c] hover:bg-[#1b1839] text-white font-semibold text-base rounded-xl transition"
            >
              <RotateCcw size={18} />
              <span>Retry Dispatch</span>
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-[#24214c] border border-slate-300 font-semibold text-base rounded-xl hover:bg-slate-50 transition"
            >
              <Home size={18} />
              <span>Return to Homepage</span>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
