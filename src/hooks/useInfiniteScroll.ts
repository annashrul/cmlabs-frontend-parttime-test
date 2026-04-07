import { useEffect, useRef, useState, useCallback } from "react";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  rootMargin?: string;
  paused?: boolean;
}

export function useInfiniteScroll({ hasMore, rootMargin = "200px", paused = false }: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [observerFailed, setObserverFailed] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const pendingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    setLoadCount((c) => c + 1);
  }, []);

  // Allow next load after visibleCount actually changes (consumer calls setVisibleCount)
  const resetPending = useCallback(() => {
    pendingRef.current = false;
  }, []);

  useEffect(() => {
    if (!hasMore || observerFailed || paused) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    if (typeof IntersectionObserver === "undefined") {
      setObserverFailed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin }
    );

    // Delay to let layout settle
    const timer = setTimeout(() => observer.observe(sentinel), 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [hasMore, loadMore, observerFailed, paused, rootMargin]);

  return { sentinelRef, observerFailed, loadCount, resetPending };
}
