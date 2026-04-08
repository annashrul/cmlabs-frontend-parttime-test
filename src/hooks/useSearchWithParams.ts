import { useCallback, useEffect, useRef, useState } from "react";
import { DEBOUNCE_DELAY } from "@/lib/constants";

/**
 * Search state with debounce + URL query param sync.
 * - `value`: raw input value (updates instantly for responsive typing)
 * - `debouncedValue`: debounced value for filtering
 * - URL `?search=...` updated after debounce
 */
export function useSearchWithParams(paramKey = "search") {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const initialized = useRef(false);

  // Read initial value from URL on client mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const params = new URLSearchParams(window.location.search);
    const initial = params.get(paramKey) || "";
    if (initial) {
      setValue(initial);
      setDebouncedValue(initial);
    }
  }, [paramKey]);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [value]);

  // Sync debounced value to URL
  useEffect(() => {
    if (!initialized.current) return;
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
