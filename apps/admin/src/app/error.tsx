'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, RotateCcw, AlertOctagon } from 'lucide-react';

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: AdminErrorProps) {
  const is501 =
    error?.message?.toLowerCase().includes('501') ||
    error?.message?.toLowerCase().includes('not implemented');

  const errorCode = is501 ? '501' : '500';

  useEffect(() => {
    document.title = `${errorCode} - System Error | Business First Admin`;
    console.error(`[Admin Error ${errorCode}]:`, error);
  }, [error, errorCode]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-8 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-6 shadow-inner">
          <AlertOctagon size={32} />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          Admin Portal &bull; Error {errorCode}
        </span>

        <h1 className="text-3xl font-bold text-white mt-2 mb-3">
          {is501 ? 'Feature Not Implemented' : 'Console System Disruption'}
        </h1>

        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          {is501
            ? 'The requested administrative operation or service protocol is currently under development.'
            : 'An unexpected internal error occurred within the administrative console. The system operations team has logged this incident.'}
        </p>

        {error?.digest && (
          <div className="mb-6 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 font-mono text-xs break-all">
            Digest ID: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-amber-600/20 cursor-pointer"
          >
            <RotateCcw size={16} />
            <span>Try Again</span>
          </button>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm rounded-xl border border-slate-600 transition"
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
