"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useStickyObserver } from "@/hooks/useStickyObserver";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useHeaderSearch } from "@/context/HeaderSearchContext";
import SearchInput from "@/components/ui/SearchInput";

interface StickySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export default function StickySearch({
  value,
  onChange,
  placeholder,
  fullWidth = false,
}: StickySearchProps) {
  const { anchorRef, isStuck } = useStickyObserver();
  const { setContent } = useHeaderSearch();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [lockedInNavbar, setLockedInNavbar] = useState(false);
  const prevScrollY = useRef(0);

  const handleFocus = useCallback(() => {}, []);
  const handleBlur = useCallback(() => {}, []);

  // Track real user scroll — detect gradual scroll to top
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      // User scrolled to top gradually (not a jump from content shrink)
      // A jump is when scrollY drops by more than 500px in one frame
      const isGradual = Math.abs(prevScrollY.current - currentY) < 500;

      if (lockedInNavbar && currentY === 0 && isGradual) {
        setLockedInNavbar(false);
      }

      prevScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lockedInNavbar]);

  // Lock in navbar when scrolled past anchor on desktop
  useEffect(() => {
    if (isStuck && isDesktop) {
      setLockedInNavbar(true);
    }
  }, [isStuck, isDesktop]);

  const showInNavbar = lockedInNavbar && isDesktop;

  // Inject search into header
  useEffect(() => {
    if (showInNavbar) {
      setContent(
        <SearchInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    } else {
      setContent(null);
    }
  }, [showInNavbar, value, onChange, placeholder, setContent, handleFocus, handleBlur]);

  // Clean up on unmount
  useEffect(() => {
    return () => setContent(null);
  }, [setContent]);

  return (
    <>
      <div ref={anchorRef} className="h-0" />

      <div
        className={`mb-8 py-3 ${
          isStuck && !isDesktop
            ? "sticky top-16 z-40 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-[#f9fafb]"
            : "flex justify-center"
        } ${showInNavbar ? "invisible" : ""}`}
      >
        <div className={`w-full ${!showInNavbar && !fullWidth ? "max-w-md" : ""}`}>
          <SearchInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
}
