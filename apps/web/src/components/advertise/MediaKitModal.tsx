"use client";

import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useContactForm } from '@/hooks/use-contact';

interface MediaKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediaKitModal: React.FC<MediaKitModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const contactMutation = useContactForm();

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Send contact inquiry in background
    contactMutation.mutate({
      name: name || 'Media Kit Requester',
      email,
      subject: `Media Kit Download Request - ${company || 'Direct'}`,
      message: `User requested Media Kit download. Company: ${company || 'N/A'}, Name: ${name || 'N/A'}, Email: ${email}`
    });

    // Trigger synthetic file download or link
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' +
      encodeURIComponent(
        `BUSINESS FIRST - MEDIA KIT & ADVERTISING SPECS (UAE)\n\n` +
        `Website: https://businessfirstnews.com\n` +
        `Advertising & Partnerships: ads@businessfirstnews.com\n` +
        `WhatsApp & Hotline: +971 58 898 4455\n\n` +
        `Overview:\nBusiness First is the UAE's premier business news and intelligence platform connecting decision makers, C-suite executives, investors, and entrepreneurs.\n\n` +
        `Media Solutions:\n` +
        `- Digital Display & High-Impact Banners\n` +
        `- Sponsored Business News & Executive Features\n` +
        `- Thought Leadership & Op-Eds\n` +
        `- CEO & Founder Video Interviews\n` +
        `- Industry Category Sponsorships & Newsletters\n` +
        `- Event Promotion & Coverage Partnerships\n\n` +
        `Thank you for your interest. Our advertising team will contact you shortly with custom rate cards and package proposals.`
      )
    );
    element.setAttribute('download', 'BusinessFirst-UAE-Media-Kit.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setHasDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#24214c] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FileText size={14} /> Official Media Kit
          </div>
          <h3 className="text-xl font-bold font-newsreader">
            Download Business First Media Kit
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Access our audience metrics, advertising formats, editorial calendar, and custom partnership packages.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {hasDownloaded ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 font-newsreader">
                Media Kit Downloaded!
              </h4>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Thank you. We have initiated your download. Our partnerships team will also reach out to <span className="font-semibold text-gray-900">{email}</span> with tailored campaign options.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#24214c] hover:bg-[#1a1738] text-white text-sm font-semibold rounded-lg transition"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#24214c] focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Company / Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Apex Global UAE"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#24214c] focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@apexglobal.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#24214c] focus:border-transparent text-gray-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF0202] hover:bg-[#d90000] text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Download size={16} />
                  {contactMutation.isPending ? 'Processing...' : 'Download Media Kit Now'}
                </button>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                Strict confidentiality assured. We respect your privacy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
