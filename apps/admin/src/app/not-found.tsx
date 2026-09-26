'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function AdminNotFound() {
  const router = useRouter();

  useEffect(() => {
    document.title = '404 - Page Not Found | Business First Admin';
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-8 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center mb-6 shadow-inner">
          <ShieldAlert size={32} />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
          Admin Portal • Error 404
        </span>

        <h1 className="text-3xl font-bold text-white mt-2 mb-3">
          Console Route Not Found
        </h1>

        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The administration route or resource you are trying to access does not exist or may have been restricted.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-red-600/20"
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm rounded-xl border border-slate-600 transition cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
