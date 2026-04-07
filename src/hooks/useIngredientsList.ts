import { useEffect, useMemo, useState } from "react";
import { getIngredients } from "@/lib/api";
import type { Ingredient } from "@/lib/types";
import { PAGE_SIZE, STORAGE_KEYS } from "@/lib/constants";
import { useSessionString, useSessionNumber } from "./useSessionStorage";
import { useDebounce } from "./useDebounce";
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
  const [search, setSearch] = useSessionString(STORAGE_KEYS.SEARCH, "");
  const [visibleCount, setVisibleCount] = useSessionNumber(STORAGE_KEYS.VISIBLE_COUNT, PAGE_SIZE);
  const [activeLetter, setActiveLetter] = useState("All");

  const debouncedSearch = useDebounce(search);
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

  useEffect(() => {
    if (!isInitialLoad) {
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
  const { sentinelRef, observerFailed, loadCount } = useInfiniteScroll({ hasMore });

  useEffect(() => {
    if (loadCount > 0) {
      setVisibleCount((prev) => prev + PAGE_SIZE);
    }
  }, [loadCount, setVisibleCount]);

  const visible = filtered.slice(0, visibleCount);

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
