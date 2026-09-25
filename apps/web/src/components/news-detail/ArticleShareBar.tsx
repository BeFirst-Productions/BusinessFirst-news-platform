'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Link as LinkIcon, Copy, Check, X, ExternalLink, Globe } from 'lucide-react';
import { 
  FaWhatsapp, 
  FaXTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaFacebookF, 
  FaEnvelope 
} from 'react-icons/fa6';

interface ArticleShareBarProps {
  title: string;
  url?: string;
}

export const ArticleShareBar: React.FC<ArticleShareBarProps> = ({ title, url: customUrl }) => {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (customUrl) {
      setCurrentUrl(customUrl);
    } else if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [customUrl]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = async () => {
    if (!currentUrl) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const input = document.createElement('input');
        input.value = currentUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      showToast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      bgColor: 'bg-[#25D366] hover:bg-[#20ba5a]',
      textColor: 'text-white',
      action: () => {
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + currentUrl)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
      },
    },
    {
      name: 'X (Twitter)',
      icon: FaXTwitter,
      bgColor: 'bg-black hover:bg-gray-800',
      textColor: 'text-white',
      action: () => {
        const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
        window.open(xUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
      },
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      bgColor: 'bg-[#0A66C2] hover:bg-[#08539e]',
      textColor: 'text-white',
      action: () => {
        const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        window.open(liUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
      },
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      bgColor: 'bg-[#1877F2] hover:bg-[#1464cc]',
      textColor: 'text-white',
      action: () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(fbUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
      },
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      bgColor: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90',
      textColor: 'text-white',
      action: () => {
        handleCopyLink();
        showToast('Link copied! Paste it in your Instagram post or story.');
      },
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      bgColor: 'bg-gray-700 hover:bg-gray-800',
      textColor: 'text-white',
      action: () => {
        const mailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this article on Business First: ' + currentUrl)}`;
        window.location.href = mailUrl;
      },
    },
  ];

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: title,
          url: currentUrl,
        });
      } catch (error) {
        // Ignored if user dismissed
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  return (
    <div className="w-full flex justify-end mb-2 mt-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <Check className="w-4 h-4 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Share and Copy Link Action Bar - Right Aligned, Icon Only, Professional */}
      <div className="inline-flex items-center gap-1.5 p-1 bg-gray-100/80 border border-gray-200/80 rounded-full shadow-2xs backdrop-blur-sm">
        {/* Share Icon Button with Tooltip */}
        <div className="relative group inline-flex items-center">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-1.5 rounded-full bg-white text-gray-600 hover:text-white hover:bg-[#24214c] border border-gray-200/60 transition-all duration-200 shadow-2xs flex items-center justify-center cursor-pointer focus:outline-none"
            aria-label="Share Article"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-900 text-white text-[11px] font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-md z-30">
            Share Article
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>

        {/* Copy Link Icon Button with Tooltip */}
        <div className="relative group inline-flex items-center">
          <button
            onClick={() => setIsCopyModalOpen(true)}
            className="p-1.5 rounded-full bg-white text-gray-600 hover:text-white hover:bg-[#BF2025] border border-gray-200/60 transition-all duration-200 shadow-2xs flex items-center justify-center cursor-pointer focus:outline-none"
            aria-label="Copy Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-900 text-white text-[11px] font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-md z-30">
            Copy Link
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#24214c]/10 text-[#24214c] rounded-lg">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Share Article</h3>
                  <p className="text-xs text-gray-500">Choose a platform to share this story</p>
                </div>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Preview Box */}
            <div className="p-6 space-y-5">
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/60">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Article</p>
                <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug">{title}</p>
                <p className="text-xs text-gray-500 truncate mt-1">{currentUrl}</p>
              </div>

              {/* Social Media Share Buttons Grid */}
              <div className="grid grid-cols-3 gap-3">
                {shareOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.name}
                      onClick={option.action}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${option.bgColor} ${option.textColor} group cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5`}
                    >
                      <Icon className="w-5 h-5 mb-1.5 transition-transform group-hover:scale-110" />
                      <span className="text-xs font-medium">{option.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions Row */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                  <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>

                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <button
                    onClick={handleNativeShare}
                    className="py-2.5 px-4 rounded-xl bg-[#24214c] hover:bg-[#1a183d] text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>More Apps</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COPY LINK MODAL */}
      {isCopyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#BF2025]/10 text-[#BF2025] rounded-lg">
                  <LinkIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Copy Article Link</h3>
                  <p className="text-xs text-gray-500">Copy link to share directly</p>
                </div>
              </div>
              <button
                onClick={() => setIsCopyModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-gray-600 font-medium">
                Anyone with this link will be able to view this article.
              </p>

              {/* URL Input with Copy Action Button */}
              <div className="flex items-center gap-2 p-1.5 bg-gray-50 border border-gray-300 rounded-xl focus-within:border-[#BF2025] focus-within:ring-2 focus-within:ring-[#BF2025]/20 transition-all">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 bg-transparent px-3 py-1.5 text-xs md:text-sm text-gray-800 font-mono outline-none truncate"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-[#BF2025] hover:bg-[#a61a1f] text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {copied && (
                <div className="p-2.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Article URL copied to clipboard successfully!</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsCopyModalOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded-lg transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleShareBar;
