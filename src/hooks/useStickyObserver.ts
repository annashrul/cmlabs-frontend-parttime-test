import { useEffect, useRef, useState } from "react";
import { HEADER_HEIGHT } from "@/lib/constants";

export function useStickyObserver() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` }
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  return { anchorRef, isStuck };
}
