"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { getIngredients, Ingredient } from "@/lib/api";
import SearchInput from "@/components/SearchInput";
import IngredientCard from "@/components/IngredientCard";

const PAGE_SIZE = 24;
const STORAGE_KEY_COUNT = "ingredients_visibleCount";
const STORAGE_KEY_SEARCH = "ingredients_search";
const STORAGE_KEY_CLICKED = "ingredients_lastClicked";

function getSessionNumber(key: string, fallback: number): number {
  if (typeof sessionStorage === "undefined") return fallback;
  const val = sessionStorage.getItem(key);
  return val ? Number(val) : fallback;
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState(() => {
    if (typeof sessionStorage === "undefined") return "";
    return sessionStorage.getItem(STORAGE_KEY_SEARCH) ?? "";
  });
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [visibleCount, setVisibleCount] = useState(() =>
    getSessionNumber(STORAGE_KEY_COUNT, PAGE_SIZE)
  );
  const [loading, setLoading] = useState(true);
  const [highlightedName, setHighlightedName] = useState<string | null>(null);
  const [observerFailed, setObserverFailed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingMore = useRef(false);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    getIngredients()
      .then(setIngredients)
      .finally(() => setLoading(false));
  }, []);

  // Scroll to last clicked card after data renders
  useEffect(() => {
    if (!loading && ingredients.length > 0 && isInitialLoad.current) {
      isInitialLoad.current = false;
      const lastClicked = sessionStorage.getItem(STORAGE_KEY_CLICKED);
      if (lastClicked) {
        setHighlightedName(lastClicked);
        // Wait for all visible cards to be in the DOM
        requestAnimationFrame(() => {
          const el = document.querySelector(
            `[data-ingredient="${CSS.escape(lastClicked)}"]`
          );
          if (el) {
            el.scrollIntoView({ block: "center" });
          }
        });
        // Clear highlight after 3 seconds
        setTimeout(() => setHighlightedName(null), 3000);
      }
    }
  }, [loading, ingredients]);

  // Persist visibleCount to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_COUNT, String(visibleCount));
  }, [visibleCount]);

  // Persist search to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_SEARCH, search);
  }, [search]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      // Only reset pagination when user actively changes search (not on initial load)
      if (!isInitialLoad.current) {
        setVisibleCount(PAGE_SIZE);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered = useMemo(
    () =>
      ingredients.filter((item) =>
        item.strIngredient.toLowerCase().includes(debouncedSearch.toLowerCase())
      ),
    [ingredients, debouncedSearch]
  );

  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  // Reset throttle guard when visibleCount changes (batch rendered)
  useEffect(() => {
    isLoadingMore.current = false;
  }, [visibleCount]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!hasMore || observerFailed) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    if (typeof IntersectionObserver === "undefined") {
      setObserverFailed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore.current) {
          isLoadingMore.current = true;
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    const timer = setTimeout(() => {
      observer.observe(sentinel);
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [hasMore, loadMore, observerFailed, visibleCount]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Explore Ingredients
        </h1>
        <p className="mt-2 text-gray-500">
          Browse ingredients and discover delicious meals
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search ingredients by name..."
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          No ingredients found for &quot;{debouncedSearch}&quot;
        </p>
      ) : (
        <>
          <p className="mb-4 text-center text-sm text-gray-400">
            Showing {visible.length} of {filtered.length} ingredients
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {visible.map((item) => (
              <IngredientCard
                key={item.idIngredient}
                name={item.strIngredient}
                description={item.strDescription}
                highlighted={item.strIngredient === highlightedName}
              />
            ))}
          </div>

          {hasMore && (
            <>
              {!observerFailed && <div ref={sentinelRef} className="h-1" />}

              {observerFailed && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadMore}
                    className="rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 active:scale-95"
                  >
                    Load More ({filtered.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
