import { useEffect, useRef } from "react";

/**
 * Infinite scroll for a scrollable container (e.g. sidebar, bottom sheet).
 * `visibleCount` must be passed so the effect re-runs after each load cycle.
 */
export function useContainerScroll(
  hasMore: boolean,
  loadMore: () => void,
  visibleCount: number,
) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    const root = containerRef.current;
    if (!el || !root || !hasMore) return;

    let fired = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          loadMore();
        }
      },
      { root, rootMargin: "100px" },
    );

    // Delay to let layout settle after items are rendered
    const timer = setTimeout(() => observer.observe(el), 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [hasMore, loadMore, visibleCount]);

  return { sentinelRef, containerRef };
}
