import { useState, useEffect } from "react";

export function useSessionString(key: string, fallback: string) {
  const [value, setValue] = useState(() => {
    if (typeof sessionStorage === "undefined") return fallback;
    return sessionStorage.getItem(key) ?? fallback;
  });

  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

export function useSessionNumber(key: string, fallback: number) {
  const [value, setValue] = useState(() => {
    if (typeof sessionStorage === "undefined") return fallback;
    const stored = sessionStorage.getItem(key);
    return stored !== null ? Number(stored) : fallback;
  });

  useEffect(() => {
    sessionStorage.setItem(key, String(value));
  }, [key, value]);

  return [value, setValue] as const;
}
