'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2, ArrowRight, Calendar, Newspaper } from 'lucide-react';
import { useArticles } from '@/hooks/use-articles';
import type { Article } from '@businessfirst/shared-types';

interface NavbarSearchProps {
  variant?: 'desktop' | 'mobile';
  onClose?: () => void;
  className?: string;
  placeholder?: string;
}

export const NavbarSearch: React.FC<NavbarSearchProps> = ({
  variant = 'desktop',
  onClose,
  className = '',
  placeholder = 'Search news, topics, companies...',
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [debouncedQuery]);

  // Fetch live articles when debounced query is at least 2 characters
  const shouldFetch = debouncedQuery.length >= 2;
  const { data: searchResponse, isLoading, isFetching } = useArticles(
    {
      search: debouncedQuery,
      limit: 5,
    },
    {
      enabled: shouldFetch,
    }
  );

  const articles: Article[] = searchResponse?.data || [];
  const totalResults = searchResponse?.metadata?.total ?? articles.length;
  const showDropdown = isOpen && shouldFetch;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Submit search and navigate to full results page
  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;

      setIsOpen(false);
      if (onClose) onClose();
      router.push(`/news?search=${encodeURIComponent(trimmed)}`);
    },
    [query, router, onClose]
  );

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!showDropdown) {
      if (e.key === 'Enter') {
        handleSubmit();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < articles.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && articles[selectedIndex]) {
        const target = articles[selectedIndex];
        setIsOpen(false);
        if (onClose) onClose();
        router.push(`/news/${target.slug || target.id}`);
      } else {
        handleSubmit();
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSelectArticle = (slugOrId: string) => {
    setIsOpen(false);
    if (onClose) onClose();
    router.push(`/news/${slugOrId}`);
  };

  // Helper to format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Helper to highlight matching text in title
  const highlightMatch = (text: string, search: string) => {
    if (!search || !text) return text;
    const parts = text.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} className="bg-[#FF0202]/15 text-[#FF0202] font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // ==================== DESKTOP VARIANT ====================
  if (variant === 'desktop') {
    return (
      <div ref={containerRef} className={`relative shrink-0 ${className}`}>
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <Search
            size={16}
            className="text-[#24214c] absolute left-3 pointer-events-none transition-colors"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search articles"
            aria-expanded={showDropdown}
            className="bg-white text-[#24214c] text-sm rounded-full pl-9 pr-8 py-1.5 focus:outline-none w-[140px] md:w-[130px] lg:w-[170px] xl:w-[240px] 2xl:w-[270px] focus:ring-2 focus:ring-[#FF0202]/50 transition-all placeholder:text-gray-400 font-normal shadow-inner"
          />

          {/* Right Action Icons (Loading spinner or Clear 'X') */}
          <div className="absolute right-2.5 flex items-center">
            {isLoading || isFetching ? (
              <Loader2 size={14} className="text-[#FF0202] animate-spin" />
            ) : query ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-[#24214c] transition-colors p-0.5 rounded-full hover:bg-gray-100"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            ) : null}
          </div>
        </form>

        {/* Live Instant Search Dropdown */}
        {showDropdown && (
          <div
            className="absolute top-full right-0 mt-2 w-[340px] sm:w-[380px] md:w-[420px] lg:w-[460px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            role="listbox"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span>Quick Results</span>
              {totalResults > 0 && <span>{totalResults} found</span>}
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-100">
              {isLoading && articles.length === 0 ? (
                // Loading Skeleton
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 animate-pulse">
                      <div className="w-14 h-11 bg-gray-200 rounded-md shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 bg-gray-200 rounded w-4/5" />
                        <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : articles.length > 0 ? (
                articles.map((article, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={article.id}
                      onClick={() => handleSelectArticle(article.slug || article.id)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-start gap-3 p-3 transition-colors cursor-pointer group ${
                        isSelected ? 'bg-red-50/70' : 'hover:bg-gray-50'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-14 h-11 shrink-0 overflow-hidden rounded bg-gray-100 border border-gray-100">
                        {article.featuredImage ? (
                          <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="56px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Newspaper size={18} />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#24214c] line-clamp-2 leading-snug group-hover:text-[#FF0202] transition-colors font-newsreader">
                          {highlightMatch(article.title, debouncedQuery)}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 font-medium">
                          {article.category?.name && (
                            <span className="text-[#FF0202] font-semibold">
                              {article.category.name}
                            </span>
                          )}
                          {article.publishedAt && (
                            <>
                              <span>•</span>
                              <span>{formatDate(article.publishedAt)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Empty state
                <div className="p-6 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <Search size={18} />
                  </div>
                  <p className="text-xs font-semibold text-gray-700">
                    No articles found for &ldquo;{debouncedQuery}&rdquo;
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Try different keywords or check spelling
                  </p>
                </div>
              )}
            </div>

            {/* Dropdown Footer */}
            <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold text-[#24214c] hover:bg-[#FF0202] hover:text-white transition-colors group"
              >
                <span>View all results for &ldquo;{debouncedQuery}&rdquo;</span>
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==================== MOBILE VARIANT ====================
  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search
          size={18}
          className="text-[#24214c] absolute left-3.5 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search articles"
          autoFocus
          className="bg-white text-[#24214c] text-sm rounded-full pl-10 pr-9 py-2.5 focus:outline-none w-full focus:ring-2 focus:ring-[#FF0202]/50 transition-all placeholder:text-gray-400 font-normal shadow-sm"
        />

        {/* Clear or Loading */}
        <div className="absolute right-3 flex items-center">
          {isLoading || isFetching ? (
            <Loader2 size={16} className="text-[#FF0202] animate-spin" />
          ) : query ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-[#24214c] p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>
      </form>

      {/* Mobile Live Results Stream */}
      {showDropdown && (
        <div className="mt-3 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-[#24214c] animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            <span>Results for &ldquo;{debouncedQuery}&rdquo;</span>
            {totalResults > 0 && <span>{totalResults} found</span>}
          </div>

          <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-100">
            {isLoading && articles.length === 0 ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-12 h-10 bg-gray-200 rounded shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 bg-gray-200 rounded w-4/5" />
                      <div className="h-2 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleSelectArticle(article.slug || article.id)}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 active:bg-red-50/50 cursor-pointer transition-colors"
                >
                  <div className="relative w-14 h-11 shrink-0 overflow-hidden rounded bg-gray-100 border border-gray-100">
                    {article.featuredImage ? (
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Newspaper size={16} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#24214c] line-clamp-2 leading-snug font-newsreader">
                      {highlightMatch(article.title, debouncedQuery)}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 font-medium">
                      {article.category?.name && (
                        <span className="text-[#FF0202] font-semibold">
                          {article.category.name}
                        </span>
                      )}
                      {article.publishedAt && (
                        <>
                          <span>•</span>
                          <span>{formatDate(article.publishedAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5 text-center">
                <p className="text-xs font-semibold text-gray-700">
                  No articles found
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Press search button below to search all records
                </p>
              </div>
            )}
          </div>

          <div className="p-2.5 bg-gray-50 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#24214c] text-white text-xs font-bold hover:bg-[#FF0202] transition-colors"
            >
              <span>View all results for &ldquo;{debouncedQuery}&rdquo;</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
