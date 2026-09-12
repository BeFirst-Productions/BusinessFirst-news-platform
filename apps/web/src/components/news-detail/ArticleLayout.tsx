'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ArticleLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  bannerRef: React.RefObject<HTMLElement | null>;
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  leftContent,
  rightContent,
  bannerRef,
}) => {
  const rightColRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [sidebarFixed, setSidebarFixed] = useState(false);
  const [fixedTop, setFixedTop] = useState(0);
  const [fixedLeft, setFixedLeft] = useState(0);
  const [fixedWidth, setFixedWidth] = useState(0);
  const [spacerHeight, setSpacerHeight] = useState(0);

  const lockTopRef = useRef(0);

  const onScroll = useCallback(() => {
    const sidebar = sidebarRef.current;
    const rightCol = rightColRef.current;
    const banner = bannerRef.current;
    if (!sidebar || !rightCol) return;

    const vh = window.innerHeight;
    const sidebarRect = sidebar.getBoundingClientRect();
    const rightColRect = rightCol.getBoundingClientRect();

    // Phase 3: bottom banner 10% visible from bottom -> release to normal scroll
    if (banner) {
      const bannerRect = banner.getBoundingClientRect();
      if (bannerRect.top <= vh * 0.9) {
        setSidebarFixed(false);
        return;
      }
    }

    // Phase 2: sidebar bottom within 20% from screen bottom -> lock sidebar
    if (!sidebarFixed && sidebarRect.bottom <= vh * 0.80) {
      lockTopRef.current = sidebarRect.top;
      setFixedTop(sidebarRect.top);
      setFixedLeft(rightColRect.left);
      setFixedWidth(rightColRect.width);
      setSpacerHeight(sidebar.offsetHeight);
      setSidebarFixed(true);
      return;
    }

    // Phase 1: release if user scrolls back up past the original lock position
    if (sidebarFixed && rightColRect.top >= lockTopRef.current) {
      setSidebarFixed(false);
    }
  }, [sidebarFixed, bannerRef]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onScroll]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full mt-4">
      {/* Left: Article content - scrolls freely */}
      <div className="lg:col-span-8 flex flex-col gap-6 w-full">
        {leftContent}
      </div>

      {/* Right: outer column stays in flow to maintain grid space */}
      <div ref={rightColRef} className="lg:col-span-4 w-full hidden lg:block">
        {sidebarFixed && (
          <div style={{ height: spacerHeight }} aria-hidden="true" />
        )}
        <div
          ref={sidebarRef}
          style={
            sidebarFixed
              ? {
                  position: 'fixed',
                  top: fixedTop,
                  left: fixedLeft,
                  width: fixedWidth,
                  zIndex: 40,
                  transition: 'none',
                }
              : { position: 'relative' }
          }
        >
          {rightContent}
        </div>
      </div>

      {/* Mobile: sidebar in flow below article */}
      <div className="lg:hidden w-full col-span-full">
        {rightContent}
      </div>
    </div>
  );
};

export default ArticleLayout;
