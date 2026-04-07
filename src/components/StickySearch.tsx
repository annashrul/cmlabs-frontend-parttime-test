"use client";

import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";

interface StickySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function StickySearch({
  value,
  onChange,
  placeholder,
}: StickySearchProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={anchorRef} className="h-0" />

      <div
        className={`sticky top-16 z-40 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-8 transition-all duration-200 ${
          isStuck
            ? "bg-background/80 backdrop-blur-md"
            : ""
        }`}
      >
        <div
          className={`mx-auto transition-all duration-200 ${
            isStuck ? "max-w-full" : "max-w-md"
          }`}
        >
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
