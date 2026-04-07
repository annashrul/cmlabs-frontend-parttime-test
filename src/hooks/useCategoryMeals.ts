import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMealsByCategory, getCategories, isCached } from "@/lib/api";
import type { MealSummary, Category } from "@/lib/types";
import { useSearchWithParams } from "./useSearchWithParams";

const PAGE_SIZE = 11;

export function useCategoryMeals(initialCategory: string) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { value: search, setValue: setSearch, debouncedValue: debouncedSearch, reset: resetSearch } = useSearchWithParams();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const cached = isCached(`meals-by-category:${activeCategory}`);
    setLoading(true);
    resetSearch();
    setVisibleCount(PAGE_SIZE);
    if (cached) {
      getMealsByCategory(activeCategory)
        .then(setMeals)
        .finally(() => setLoading(false));
    } else {
      const minDelay = new Promise((r) => setTimeout(r, 400));
      Promise.all([getMealsByCategory(activeCategory), minDelay])
        .then(([data]) => setMeals(data))
        .finally(() => setLoading(false));
    }
  }, [activeCategory, resetSearch]);

  const switchCategory = useCallback((name: string) => {
    if (name === activeCategory) return;
    setActiveCategory(name);
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    const qs = params.toString();
    window.history.replaceState(null, "", `/foods/${encodeURIComponent(name)}${qs ? `?${qs}` : ""}`);
    window.scrollTo({ top: 0 });
  }, [activeCategory]);

  const filteredMeals = useMemo(() =>
    meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase())
    ), [meals, debouncedSearch]);

  const visibleMeals = filteredMeals.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMeals.length;

  // Reset pagination when search starts
  const prevSearchRef = useRef(debouncedSearch);
  useEffect(() => {
    const prev = prevSearchRef.current;
    prevSearchRef.current = debouncedSearch;
    if (debouncedSearch && !prev) {
      setVisibleCount(PAGE_SIZE);
    }
  }, [debouncedSearch]);

  // Infinite scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || !hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    let observer: IntersectionObserver;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleCount((prev) => prev + PAGE_SIZE), 500);
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(el);
    }, 100);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [hasMore, loading, visibleMeals.length]);

  return {
    activeCategory,
    categories,
    meals,
    filteredMeals,
    visibleMeals,
    hasMore,
    sentinelRef,
    search,
    setSearch,
    resetSearch,
    loading,
    switchCategory,
  };
}
