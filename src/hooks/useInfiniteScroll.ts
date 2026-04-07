import { useEffect, useRef, useState, useCallback } from "react";
import { OBSERVER_DELAY } from "@/lib/constants";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  rootMargin?: string;
}

export function useInfiniteScroll({ hasMore, rootMargin = "200px" }: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingMore = useRef(false);
  const [observerFailed, setObserverFailed] = useState(false);
  const [loadCount, setLoadCount] = useState(0);

  const loadMore = useCallback(() => {
    isLoadingMore.current = true;
    setLoadCount((c) => c + 1);
  }, []);

  // Reset throttle guard after each load
  useEffect(() => {
    isLoadingMore.current = false;
  }, [loadCount]);

  useEffect(() => {
    if (!hasMore || observerFailed) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    if (typeof IntersectionObserver === "undefined") {
      setObserverFailed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore.current) {
          loadMore();
        }
      },
      { rootMargin }
    );

    const timer = setTimeout(() => {
      observer.observe(sentinel);
    }, OBSERVER_DELAY);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [hasMore, loadMore, observerFailed, loadCount, rootMargin]);

  return { sentinelRef, observerFailed, loadCount };
}
