"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Mail, User, CheckCircle2, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';
import { useCategories } from '@/hooks/use-categories';
import { useNewsletterSubscribe } from '@/hooks/use-newsletter';
import { useSubscriptionModal } from '@/hooks/use-subscription-modal';

const FALLBACK_CATEGORIES = [
  'All Categories',
  'UAE News',
  'MENA',
  'Economy & Policy',
  'International',
  'Oil, Gas & Energy',
  'Real Estate & Construction',
  'Technology & Innovation',
  'Banking & Finance',
  'Logistics & Trade',
  'Aviation & Aerospace',
  'Education & Training',
  'Manufacturing & Industrial',
  'Sustainability & CSR',
  'Media & Entertainment',
  'Tourism & Hospitality',
  'Retail & E-commerce',
  'Healthcare & Pharma',
  'Sports & Recreation',
  'Lifestyle & Culture',
  'Daily Insights',
];

interface FormErrors {
  name?: string;
  email?: string;
  category?: string;
}

interface SubscriptionModalProps {
  /** If provided, overrides internal open state */
  isOpen?: boolean;
  /** Callback when modal closes */
  onClose?: () => void;
}

const POPUP_STORAGE_KEY = 'bf_subscription_popup_seen';

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}) => {
  // Starts closed initially (safe for SSR and prevents flash)
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { isOpen: storeIsOpen, openModal: storeOpenModal, closeModal: storeCloseModal } = useSubscriptionModal();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Fetch dynamic categories from the API
  const { data: apiCategories } = useCategories();

  // Unified list of categories
  const categoriesList = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      const activeNames = apiCategories
        .filter((cat) => cat.isActive !== false)
        .map((cat) => cat.name);
      return Array.from(new Set(['All Categories', ...activeNames, ...FALLBACK_CATEGORIES]));
    }
    return FALLBACK_CATEGORIES;
  }, [apiCategories]);

  // Open ONLY ONCE on user's first visit
  useEffect(() => {
    if (controlledIsOpen !== undefined) return;

    let hasSeen = false;
    try {
      hasSeen = localStorage.getItem(POPUP_STORAGE_KEY) === 'true';
    } catch {
      hasSeen = false;
    }

    if (hasSeen) {
      return;
    }

    // First-time visit: trigger modal after a smooth brief delay
    const timer = setTimeout(() => {
      setInternalIsOpen(true);
      try {
        localStorage.setItem(POPUP_STORAGE_KEY, 'true');
      } catch {
        // Storage unavailable fallback
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [controlledIsOpen]);

  // Listen for custom event dispatching "open-subscription-modal"
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsSuccess(false);
      setErrors({});
      setInternalIsOpen(true);
      storeOpenModal();
    };

    window.addEventListener('open-subscription-modal', handleOpenEvent);
    return () => {
      window.removeEventListener('open-subscription-modal', handleOpenEvent);
    };
  }, [storeOpenModal]);

  const isVisible = controlledIsOpen !== undefined ? controlledIsOpen : (storeIsOpen || internalIsOpen);

  // When modal becomes visible, ensure container display is cleared & scroll locked
  useEffect(() => {
    if (isVisible && typeof document !== 'undefined') {
      const modalRoot = document.getElementById('subscription-modal-root');
      if (modalRoot) {
        modalRoot.style.display = '';
      }
    }
  }, [isVisible]);

  // Master close function
  const handleClose = () => {
    setInternalIsOpen(false);
    storeCloseModal();

    try {
      localStorage.setItem(POPUP_STORAGE_KEY, 'true');
    } catch {
      // Storage unavailable fallback
    }

    // Direct DOM hide fallback
    if (typeof document !== 'undefined') {
      const modalRoot = document.getElementById('subscription-modal-root');
      if (modalRoot) {
        modalRoot.style.display = 'none';
      }
      document.body.style.overflow = '';
    }

    if (controlledOnClose) {
      controlledOnClose();
    }
  };

  // Native DOM click listener on close button as double guarantee
  useEffect(() => {
    const btn = closeBtnRef.current;
    if (!btn) return;

    const onNativeClick = (e: MouseEvent) => {
      e.preventDefault();
      handleClose();
    };

    btn.addEventListener('click', onNativeClick);
    return () => {
      btn.removeEventListener('click', onNativeClick);
    };
  }, [isVisible]);

  // ESC key listener to close
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = '';
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  // Newsletter subscribe mutation
  const { mutate: subscribe, isPending } = useNewsletterSubscribe();

  // Validation function
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = 'Please enter your name';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (trimmedName.length > 100) {
      newErrors.name = 'Name must not exceed 100 characters';
    }

    // Email validation
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Category validation
    if (!selectedCategory) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    subscribe(
      {
        email: email.trim(),
        name: name.trim(),
        category: selectedCategory,
        isLead: true,
        source: 'SUBSCRIPTION_MODAL',
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          try {
            localStorage.setItem(POPUP_STORAGE_KEY, 'true');
          } catch {
            // Storage unavailable fallback
          }
        },
      }
    );
  };

  if (!isVisible) return null;

  return (
    <div
      id="subscription-modal-root"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
    >
      {/* 1. Backdrop overlay (sibling, non-nested click handler) */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* 2. Dialog Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1F194E] text-white p-6 relative">
          {/* Explicit close button */}
          <button
            ref={closeBtnRef}
            id="subscription-modal-close-button"
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-30 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/25 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
{/* 
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fcb827]/20 text-[#fcb827] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Newsletter</span>
          </div> */}

          <h2 className="text-xl font-bold font-newsreader text-white leading-tight">
            Subscribe to Business First
          </h2>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">
            Get daily news and market updates directly in your inbox.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Thank you for subscribing, {name}!
              </h3>
              <p className="text-xs text-gray-600 mb-5">
                We'll send updates for <span className="font-semibold text-gray-800">{selectedCategory}</span> to <span className="font-semibold text-[#1F194E]">{email}</span>.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="w-full bg-[#1F194E] hover:bg-[#2c246b] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* 1. Name Field */}
              <div>
                <label htmlFor="modal-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="modal-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Enter your full name"
                    disabled={isPending}
                    className={`w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 border rounded-xl focus:bg-white focus:outline-none transition ${
                      errors.name
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400/50'
                        : 'border-gray-200 focus:ring-2 focus:ring-[#1F194E]'
                    }`}
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.name && (
                  <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* 2. Email Field */}
              <div>
                <label htmlFor="modal-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="modal-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="Enter your email address"
                    disabled={isPending}
                    className={`w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 border rounded-xl focus:bg-white focus:outline-none transition ${
                      errors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400/50'
                        : 'border-gray-200 focus:ring-2 focus:ring-[#1F194E]'
                    }`}
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* 3. Category Dropdown Below Email Field */}
              <div>
                <label htmlFor="modal-category" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <select
                    id="modal-category"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      if (errors.category) setErrors((prev) => ({ ...prev, category: undefined }));
                    }}
                    disabled={isPending}
                    className={`w-full appearance-none pl-3.5 pr-9 py-2.5 text-xs sm:text-sm text-gray-800 bg-gray-50 border rounded-xl focus:bg-white focus:outline-none transition cursor-pointer ${
                      errors.category
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400/50'
                        : 'border-gray-200 focus:ring-2 focus:ring-[#1F194E]'
                    }`}
                  >
                    {categoriesList.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.category ? (
                  <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.category}</span>
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-400 mt-1">
                    Choose a category or receive all latest business updates.
                  </p>
                )}
              </div>

              {/* 4. Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full mt-1 bg-[#FF0202] hover:bg-[#d80000] active:scale-95 text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isPending ? 'Subscribing...' : 'Subscribe'}
              </button>

              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                <span>🔒 No spam. Free updates.</span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-800 font-medium cursor-pointer"
                >
                  Maybe later
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;