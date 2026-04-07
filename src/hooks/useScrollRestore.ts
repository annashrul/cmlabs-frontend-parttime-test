import { useEffect, useState, useRef } from "react";
import { HIGHLIGHT_DURATION } from "@/lib/constants";

interface UseScrollRestoreOptions {
  storageKey: string;
  dataAttribute: string;
  ready: boolean;
}

export function useScrollRestore({
  storageKey,
  dataAttribute,
  ready,
}: UseScrollRestoreOptions) {
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null);
  const restored = useRef(false);

  useEffect(() => {
    if (!ready || restored.current) return;
    restored.current = true;

    const lastClicked = sessionStorage.getItem(storageKey);
    if (!lastClicked) return;

    setHighlightedValue(lastClicked);

    requestAnimationFrame(() => {
      const el = document.querySelector(
        `[${dataAttribute}="${CSS.escape(lastClicked)}"]`
      );
      if (el) {
        el.scrollIntoView({ block: "center" });
      }
    });

    const timer = setTimeout(() => setHighlightedValue(null), HIGHLIGHT_DURATION);
    return () => clearTimeout(timer);
  }, [ready, storageKey, dataAttribute]);

  return { highlightedValue, isInitialLoad: !restored.current };
}
