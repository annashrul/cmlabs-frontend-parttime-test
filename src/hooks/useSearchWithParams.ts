import { useCallback, useEffect, useRef, useState } from "react";
import { DEBOUNCE_DELAY } from "@/lib/constants";

/**
 * Search state with debounce + URL query param sync.
 * - `value`: raw input value (updates instantly for responsive typing)
 * - `debouncedValue`: debounced value for filtering
 * - URL `?q=...` updated after debounce
 */
export function useSearchWithParams(paramKey = "search") {
  // Read initial value from URL
  const getInitial = () => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get(paramKey) || "";
  };

  const [value, setValue] = useState(getInitial);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const isFirstRender = useRef(true);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [value]);

  // Sync debounced value to URL
  useEffect(() => {
    // Skip on first render to avoid replacing URL on mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (debouncedValue) {
      params.set(paramKey, debouncedValue);
    } else {
      params.delete(paramKey);
    }
    const qs = params.toString();
    const newUrl = qs
      ? `${window.location.pathname}?${qs}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [debouncedValue, paramKey]);

  const reset = useCallback(() => {
    setValue("");
    setDebouncedValue("");
  }, []);

  return { value, setValue, debouncedValue, reset };
}
