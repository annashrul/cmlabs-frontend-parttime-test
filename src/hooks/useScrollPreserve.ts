import { useEffect, useRef } from "react";
import { STORAGE_KEYS } from "@/lib/constants";

export function useScrollPreserve(searchValue: string) {
  const searchRef = useRef(searchValue);
  searchRef.current = searchValue;

  // Continuously save scrollY, but only when NOT searching
  useEffect(() => {
    const onScroll = () => {
      if (!searchRef.current) {
        sessionStorage.setItem(STORAGE_KEYS.SCROLL_Y, String(window.scrollY));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Restore scroll when search is cleared
  useEffect(() => {
    if (!searchValue) {
      const savedY = Number(sessionStorage.getItem(STORAGE_KEYS.SCROLL_Y) ?? 0);
      if (savedY > 0) {
        requestAnimationFrame(() => {
          window.scrollTo(0, savedY);
        });
      }
    }
  }, [searchValue]);
}
