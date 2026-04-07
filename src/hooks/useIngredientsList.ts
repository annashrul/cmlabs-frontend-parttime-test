import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getIngredients } from "@/lib/api";
import type { Ingredient } from "@/lib/types";
import { PAGE_SIZE, STORAGE_KEYS } from "@/lib/constants";
import { useSessionNumber } from "./useSessionStorage";
import { useSearchWithParams } from "./useSearchWithParams";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { useScrollRestore } from "./useScrollRestore";
import { useScrollPreserve } from "./useScrollPreserve";

function getCachedIngredients(): Ingredient[] {
  if (typeof sessionStorage === "undefined") return [];
  const cached = sessionStorage.getItem(STORAGE_KEYS.DATA_CACHE);
  if (!cached) return [];
  try {
    return JSON.parse(cached);
  } catch {
    return [];
  }
}

export function useIngredientsList() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(getCachedIngredients);
  const [loading, setLoading] = useState(ingredients.length === 0);
  const { value: search, setValue: setSearch, debouncedValue: debouncedSearch } = useSearchWithParams();
  const [visibleCount, setVisibleCount] = useSessionNumber(STORAGE_KEYS.VISIBLE_COUNT, PAGE_SIZE);
  const [activeLetter, setActiveLetterState] = useState(() => {
    if (typeof window === "undefined") return "All";
    return new URLSearchParams(window.location.search).get("letter") || "All";
  });

  useScrollPreserve(debouncedSearch);

  const { highlightedValue, isInitialLoad } = useScrollRestore({
    storageKey: STORAGE_KEYS.LAST_CLICKED,
    dataAttribute: "data-ingredient",
    ready: ingredients.length > 0,
  });

  useEffect(() => {
    getIngredients().then((data) => {
      setIngredients(data);
      sessionStorage.setItem(STORAGE_KEYS.DATA_CACHE, JSON.stringify(data));
      setLoading(false);
    });
  }, []);

  // Only reset pagination when user types a new search, not when clearing
  const prevSearchRef = useRef(debouncedSearch);
  useEffect(() => {
    const prev = prevSearchRef.current;
    prevSearchRef.current = debouncedSearch;
    // Reset only when going from empty to non-empty (started searching)
    if (!isInitialLoad && debouncedSearch && !prev) {
      setVisibleCount(PAGE_SIZE);
    }
  }, [debouncedSearch, isInitialLoad, setVisibleCount]);

  const availableLetters = useMemo(() => {
    return new Set(ingredients.map((i) => i.strIngredient[0]?.toUpperCase()));
  }, [ingredients]);

  const filtered = useMemo(() => {
    let result = ingredients;
    if (activeLetter !== "All") {
      result = result.filter((item) =>
        item.strIngredient.toUpperCase().startsWith(activeLetter)
      );
    }
    if (debouncedSearch) {
      result = result.filter((item) =>
        item.strIngredient.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    return result;
  }, [ingredients, debouncedSearch, activeLetter]);

  const hasMore = visibleCount < filtered.length;
  const { sentinelRef, observerFailed, loadCount, resetPending } = useInfiniteScroll({ hasMore, paused: loading });

  useEffect(() => {
    if (loadCount > 0) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
        resetPending();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadCount, setVisibleCount, resetPending]);

  const visible = filtered.slice(0, visibleCount);

  const setActiveLetter = useCallback((letter: string) => {
    setActiveLetterState(letter);
    setVisibleCount(PAGE_SIZE);
    window.scrollTo({ top: 0 });
    // Update URL query param
    const params = new URLSearchParams(window.location.search);
    if (letter === "All") {
      params.delete("letter");
    } else {
      params.set("letter", letter);
    }
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
  }, [setVisibleCount]);

  const loadMore = () => setVisibleCount((prev) => prev + PAGE_SIZE);

  return {
    loading,
    search,
    setSearch,
    activeLetter,
    setActiveLetter,
    availableLetters,
    filtered,
    visible,
    highlightedValue,
    hasMore,
    sentinelRef,
    observerFailed,
    loadMore,
    remaining: filtered.length - visibleCount,
  };
}
