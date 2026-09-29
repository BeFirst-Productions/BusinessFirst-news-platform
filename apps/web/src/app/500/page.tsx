'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Home, RotateCcw } from 'lucide-react';
import SectionContainer from '@/components/SectionContainer';

function ServerErrorContent() {
  const searchParams = useSearchParams();
  const codeParam = searchParams.get('code');
  const is501 = codeParam === '501';
  const errorCode = is501 ? '501' : '500';

  useEffect(() => {
    document.title = `${errorCode} - ${is501 ? 'Service Not Implemented' : 'Editorial System Error'} | Business First`;
  }, [errorCode, is501]);

  return (
    <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
      {/* Top Editorial Badge */}
      {is501 ? (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wider uppercase shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>Feature In Engineering &bull; Error 501</span>
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tracking-wider uppercase shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span>Editorial System Notice &bull; Error 500</span>
        </div>
      )}

      {/* Big Stylized Error Headline */}
      <div className="relative mb-2">
        <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-black tracking-tighter text-[#24214c]/10 select-none leading-none">
          {errorCode}
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#24214c] font-newsreader tracking-tight">
            {is501 ? (
              <>5<span className="text-blue-500">0</span>1</>
            ) : (
              <>5<span className="text-amber-500">0</span>0</>
            )}
          </span>
        </div>
      </div>

      {/* Headline Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#24214c] font-newsreader mb-4 max-w-xl leading-snug">
        {is501
          ? 'Feature Under Development: Service Not Implemented'
          : 'Editorial Transmission Interrupted: System Disruption'}
      </h2>

      {/* Explanation Paragraph */}
      <p className="text-base sm:text-lg text-slate-600 max-w-lg font-normal leading-relaxed mb-8">
        {is501
          ? 'The requested protocol or editorial feature is currently under active engineering and is not yet available on this news platform server.'
          : 'Our newsroom servers encountered an unexpected internal disruption while processing this dispatch. Our technical operations desk has been notified.'}
      </p>

      {/* Action Buttons: Reload Page & Return to Homepage */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#24214c] hover:bg-[#1b1839] text-white font-semibold text-base rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
        >
          <RotateCcw size={18} className="transition-transform group-hover:-rotate-45" />
          <span>Retry Connection</span>
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-50 text-[#24214c] border border-slate-300 font-semibold text-base rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
        >
          <Home size={18} className="transition-transform group-hover:scale-110" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

export default function ServerErrorPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 py-16 md:py-24">
      <SectionContainer>
        <Suspense fallback={
          <div className="max-w-2xl mx-auto text-center py-12 text-[#24214c] font-semibold">
            Loading error notice...
          </div>
        }>
          <ServerErrorContent />
        </Suspense>
      </SectionContainer>
    </main>
  );
}
