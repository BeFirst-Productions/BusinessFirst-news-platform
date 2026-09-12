'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  CSSProperties,
} from 'react';

interface Props {
  leftContent: ReactNode;
  rightSidebar: ReactNode;
}

/**
 * Three-phase scroll behavior (no fade, no disappear — bidirectional):
 *
 * Phase 1 — FLOW:
 *   Sidebar at top of its column, scrolls with page normally.
 *
 * Phase 2 — FIXED:
 *   scrollY ≥ freezeAt → sidebar frozen at position:fixed; bottom:20vh.
 *   Only the left article scrolls. Right column holds minHeight = sidebarH.
 *
 * Phase 3 — ANCHORED (sits just above the banner, stays VISIBLE):
 *   scrollY ≥ anchorAt → sidebar transitions to position:absolute; top:anchoredTop
 *   within the right column. Sits visibly just above the bottom banner.
 *   The whole page scrolls normally from here.
 *
 * Phase 2 → 3 transition is seamless (sidebar bottom stays at 80% viewport).
 * Scrolling up reverses all phases deterministically.
 */
const ArticleLayoutWithStickySidebar: React.FC<Props> = ({
  leftContent,
  rightSidebar,
}) => {
  const rightColRef    = useRef<HTMLDivElement>(null);
  const sidebarInnerRef = useRef<HTMLDivElement>(null);
  const sentinelRef    = useRef<HTMLDivElement>(null);

  type Phase = 'flow' | 'fixed' | 'anchored';
  const [phase, setPhase]           = useState<Phase>('flow');
  const [fixedLeft, setFixedLeft]   = useState(0);
  const [fixedWidth, setFixedWidth] = useState(0);
  const [fixedBottom, setFixedBottom] = useState(0);
  const [anchoredTop, setAnchoredTop] = useState(0);
  const [colMinHeight, setColMinHeight] = useState<number | undefined>(undefined);

  // Stable per-recalc values
  const freezeAt   = useRef(0);
  const anchorAt   = useRef(0);
  const sidebarH   = useRef(0);

  /** Absolute Y from document top — unaffected by current scroll. */
  const docY = (el: HTMLElement): number => {
    let t = 0; let cur: HTMLElement | null = el;
    while (cur) { t += cur.offsetTop; cur = cur.offsetParent as HTMLElement | null; }
    return t;
  };

  const recalc = useCallback(() => {
    const inner    = sidebarInnerRef.current;
    const sentinel = sentinelRef.current;
    const col      = rightColRef.current;
    if (!inner || !sentinel || !col) return;

    const vh           = window.innerHeight;
    const sh           = inner.offsetHeight;
    sidebarH.current   = sh;

    const colDocTop    = docY(col);
    const sentinelDocY = docY(sentinel);

    // Phase 1→2: sidebar bottom reaches 80% of viewport from top
    freezeAt.current = Math.max(0, colDocTop + sh - vh * 0.80);

    // Phase 2→3: banner sentinel reaches 80% of viewport from top
    // Math guarantees seamless visual transition (no jump):
    //   sidebar bottom in Phase2 = vh*0.80
    //   sidebar bottom in Phase3 = colDocTop - anchorAt + anchoredTop + sh
    //                            = colDocTop - (sentinelDocY - vh*0.80) + (sentinelDocY - sh - colDocTop) + sh
    //                            = vh*0.80  ✓
    anchorAt.current = Math.max(freezeAt.current + 1, sentinelDocY - vh * 0.80);

    // Where the sidebar top sits within the column in anchored state
    setAnchoredTop(Math.max(0, sentinelDocY - sh - colDocTop));

    // Update fixed positioning reference (left/width from column rect)
    const rect = col.getBoundingClientRect();
    setFixedLeft(rect.left);
    setFixedWidth(rect.width);
  }, []);

  const compute = useCallback(() => {
    const col = rightColRef.current;
    if (!col) return;

    const vh      = window.innerHeight;
    const scrollY = window.scrollY;
    const rect    = col.getBoundingClientRect();

    if (scrollY < freezeAt.current) {
      // ── Phase 1: Normal flow ─────────────────────────────────────────────
      setPhase('flow');
      setColMinHeight(undefined);

    } else if (scrollY < anchorAt.current) {
      // ── Phase 2: Frozen at bottom 20vh ──────────────────────────────────
      setFixedLeft(rect.left);
      setFixedWidth(rect.width);
      setFixedBottom(Math.round(vh * 0.20));
      setColMinHeight(sidebarH.current); // prevent column collapse while fixed
      setPhase('fixed');

    } else {
      // ── Phase 3: Anchored just above banner ──────────────────────────────
      // Sidebar stops here, stays fully visible. Page scrolls normally.
      setFixedLeft(rect.left);
      setFixedWidth(rect.width);
      setColMinHeight(undefined); // grid stretch handles column height
      setPhase('anchored');
    }
  }, []);

  // Attach scroll + resize listeners
  useEffect(() => {
    const onScroll = () => compute();
    const onResize = () => { recalc(); compute(); };

    recalc();
    const raf = requestAnimationFrame(() => { recalc(); compute(); });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [recalc, compute]);

  // Re-calc when sidebar content resizes (e.g. images load)
  useEffect(() => {
    const inner = sidebarInnerRef.current;
    if (!inner) return;
    const ro = new ResizeObserver(() => { recalc(); compute(); });
    ro.observe(inner);
    return () => ro.disconnect();
  }, [recalc, compute]);

  // Sidebar inner style per phase
  const sidebarStyle: CSSProperties =
    phase === 'fixed'
      ? {
          position : 'fixed',
          left     : fixedLeft,
          width    : fixedWidth,
          bottom   : fixedBottom,
          zIndex   : 30,
          willChange: 'transform',
        }
      : phase === 'anchored'
      ? {
          // Absolutely positioned within the right column,
          // bottom of sidebar aligns with bottom of column (= sentinel = top of banner)
          position : 'absolute',
          top      : anchoredTop,
          left     : 0,
          width    : '100%',
        }
      : {
          position : 'relative',
          width    : '100%',
        };

  return (
    <div className="w-full">
      {/*
        Default grid stretch (no items-start):
        Both columns stretch to the same height (driven by left/article content).
        Right column naturally matches article height, so position:absolute works
        correctly for the anchored state without any minHeight juggling.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full mt-4">

        {/* LEFT: Article content */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {leftContent}
        </div>

        {/* RIGHT: Sidebar column — must be position:relative for anchored absolute child */}
        <div
          ref={rightColRef}
          className="lg:col-span-4 w-full hidden lg:block relative"
          style={{ minHeight: colMinHeight }}
        >
          <div ref={sidebarInnerRef} style={sidebarStyle}>
            {rightSidebar}
          </div>
        </div>

        {/* MOBILE: sidebar inline */}
        <div className="block lg:hidden w-full mt-6">
          {rightSidebar}
        </div>
      </div>

      {/*
        Sentinel: zero-height line exactly at the top of the full-width banner.
        Phase 3 triggers when this enters the bottom 20% of the viewport.
        In anchored state the sidebar bottom aligns perfectly with this line.
      */}
      <div ref={sentinelRef} className="w-full h-px mt-4" aria-hidden="true" />
    </div>
  );
};

export default ArticleLayoutWithStickySidebar;
