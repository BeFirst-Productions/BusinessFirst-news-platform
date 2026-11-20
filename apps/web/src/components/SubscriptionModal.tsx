"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, User, CheckCircle2, Check, AlertCircle } from 'lucide-react';
import { useNewsletterSubscribe } from '@/hooks/use-newsletter';
import { useSubscriptionModal } from '@/hooks/use-subscription-modal';

export interface InterestCategory {
  id: string;
  label: string;
  value: string;
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  { id: 'ALL', label: 'ALL', value: 'All Categories' },
  { id: 'BANKING', label: 'BANKING', value: 'Banking & Finance' },
  { id: 'SPORTS', label: 'SPORTS', value: 'Sports & Recreation' },
  { id: 'TOURISM', label: 'TOURISM', value: 'Tourism & Hospitality' },
  { id: 'HEALTH', label: 'HEALTH', value: 'Healthcare & Pharma' },
  { id: 'ECONOMY', label: 'ECONOMY', value: 'Economy & Policy' },
  { id: 'UAE_NEWS', label: 'UAE NEWS', value: 'UAE News' },
  { id: 'E_COM', label: 'E-COM', value: 'Retail & E-commerce' },
];

const ALL_CATEGORY_IDS = INTEREST_CATEGORIES.map((c) => c.id);
const INDIVIDUAL_CATEGORY_IDS = INTEREST_CATEGORIES.filter((c) => c.id !== 'ALL').map((c) => c.id);

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submittedCategory, setSubmittedCategory] = useState('All Categories');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle category selection: clicking ALL checks/unchecks all checkboxes
  const handleCategoryToggle = (id: string) => {
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }));
    }

    if (id === 'ALL') {
      if (selectedCategories.includes('ALL')) {
        // If ALL was checked, uncheck all checkboxes
        setSelectedCategories([]);
      } else {
        // If ALL was unchecked, check ALL checkboxes
        setSelectedCategories(ALL_CATEGORY_IDS);
      }
      return;
    }

    // Toggling an individual category
    const isCurrentlyChecked = selectedCategories.includes(id);
    let nextSelected: string[];

    if (isCurrentlyChecked) {
      // Uncheck this category and uncheck ALL
      nextSelected = selectedCategories.filter((c) => c !== id && c !== 'ALL');
    } else {
      // Check this category
      const withoutAll = selectedCategories.filter((c) => c !== 'ALL');
      const updatedIndividual = [...withoutAll, id];

      // If all individual categories are now checked, check ALL as well
      if (updatedIndividual.length === INDIVIDUAL_CATEGORY_IDS.length) {
        nextSelected = ALL_CATEGORY_IDS;
      } else {
        nextSelected = updatedIndividual;
      }
    }

    setSelectedCategories(nextSelected);
  };

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
      setSelectedCategories([]);
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
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    setIsSuccess(false);
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

  // Newsletter subscribe mutation (disable top-right toast since modal has its own success animation)
  const { mutate: subscribe, isPending } = useNewsletterSubscribe({ showToast: false });

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
    if (selectedCategories.length === 0) {
      newErrors.category = 'Please select at least one area of interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getSelectedCategoryString = (): string => {
    if (selectedCategories.includes('ALL') || selectedCategories.length === 0) {
      return 'All Categories';
    }
    return selectedCategories
      .map((id) => INTEREST_CATEGORIES.find((c) => c.id === id)?.value || id)
      .join(', ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const categoryPayload = getSelectedCategoryString();
    setSubmittedCategory(categoryPayload);

    subscribe(
      {
        email: email.trim(),
        name: name.trim(),
        category: categoryPayload,
        isLead: true,
        source: 'SUBSCRIPTION_MODAL',
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          // Clear all fields
          setName('');
          setEmail('');
          setSelectedCategories([]);
          setErrors({});

          try {
            localStorage.setItem(POPUP_STORAGE_KEY, 'true');
          } catch {
            // Storage unavailable fallback
          }

          if (autoCloseTimerRef.current) {
            clearTimeout(autoCloseTimerRef.current);
          }
          autoCloseTimerRef.current = setTimeout(() => {
            handleClose();
          }, 2600);
        },
      }
    );
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, []);

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
      <div className="relative z-10 w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
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
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center animate-modal-success">
              {/* Rich Multi-layered Animated Checkmark */}
              <div className="relative mb-5 flex items-center justify-center">
                {/* Concentric pulsing ripple rings */}
                <div className="absolute w-24 h-24 rounded-full bg-emerald-400/20 animate-success-ripple-1 pointer-events-none" />
                <div className="absolute w-20 h-20 rounded-full bg-emerald-400/30 animate-success-ripple-2 pointer-events-none" />

                {/* Festive sparkle burst particles */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <span className="success-particle sp-1" />
                  <span className="success-particle sp-2" />
                  <span className="success-particle sp-3" />
                  <span className="success-particle sp-4" />
                  <span className="success-particle sp-5" />
                  <span className="success-particle sp-6" />
                </div>

                {/* Main animated checkmark badge */}
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-emerald-400 to-teal-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-success-pop">
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Circle outline drawing */}
                    <circle
                      cx="26"
                      cy="26"
                      r="23"
                      stroke="rgba(255, 255, 255, 0.45)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-circle-draw"
                    />
                    {/* Animated checkmark line */}
                    <path
                      d="M15 27 L23 35 L37 19"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-tick-draw"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold font-newsreader text-gray-900 mb-1.5">
                Successfully Subscribed!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xs leading-relaxed mb-4">
                Thank you for subscribing to <span className="font-semibold text-gray-800">Business First</span>. You will receive updates directly in your inbox.
              </p>
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

              {/* 3. Area of Interest (Checkboxes) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Area of Interest <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {selectedCategories.includes('ALL')
                      ? 'All news updates'
                      : selectedCategories.length === 0
                      ? 'None selected'
                      : `${selectedCategories.length} selected`}
                  </span>
                </div>

                <div
                  className={`grid grid-cols-2 min-[420px]:grid-cols-4 gap-2.5 p-3 rounded-xl border transition-colors ${
                    errors.category
                      ? 'border-red-500 bg-red-50/20'
                      : 'border-gray-200 bg-gray-50/60'
                  }`}
                >
                  {INTEREST_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <label
                        key={cat.id}
                        htmlFor={`category-${cat.id}`}
                        className="flex items-center gap-2 cursor-pointer select-none group py-0.5"
                      >
                        <div className="relative flex items-center justify-center shrink-0">
                          <input
                            id={`category-${cat.id}`}
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleCategoryToggle(cat.id)}
                            disabled={isPending}
                            className="peer appearance-none w-4 h-4 rounded border border-gray-300 bg-white checked:bg-[#1F194E] checked:border-[#1F194E] focus:outline-none focus:ring-2 focus:ring-[#1F194E]/30 transition-all cursor-pointer disabled:opacity-50"
                          />
                          <Check className="w-3 h-3 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]" />
                        </div>
                        <span
                          className={`text-[11px] sm:text-xs font-semibold tracking-wide transition-colors truncate ${
                            isSelected
                              ? 'text-[#1F194E] font-bold'
                              : 'text-gray-600 group-hover:text-gray-900'
                          }`}
                        >
                          {cat.label}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {errors.category ? (
                  <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.category}</span>
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-400 mt-1">
                    Select your preferred topics or choose ALL to receive all business updates.
                  </p>
                )}
              </div>

              {/* 4. Submit Button */}
              <button
                type="submit"
                disabled={isPending || isSuccess}
                className={`w-full mt-1 font-bold text-xs sm:text-sm uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md transition disabled:cursor-not-allowed cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FF0202] hover:bg-[#d80000] active:scale-95 text-white disabled:opacity-60'
                }`}
              >
                {isSuccess ? 'Subscribed!' : isPending ? 'Subscribing...' : 'Subscribe'}
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