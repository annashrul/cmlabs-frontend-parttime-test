import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { getMealsByIngredient, getIngredients, isCached, IMAGE_BASE_URL } from "@/lib/api";
import type { MealSummary, Ingredient } from "@/lib/types";
import { useSearchWithParams } from "./useSearchWithParams";

export { IMAGE_BASE_URL };

export function useIngredientMeals(initialName: string) {
  const [activeIngredient, setActiveIngredient] = useState(initialName);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarVisibleCount, setSidebarVisibleCount] = useState(30);

  const { value: search, setValue: setSearch, debouncedValue: debouncedSearch, reset: resetSearch } = useSearchWithParams();
  const prevIngredient = useRef(initialName);

  useEffect(() => {
    getIngredients().then(setIngredients);
  }, []);

  useEffect(() => {
    const cached = isCached(`meals-by-ingredient:${activeIngredient}`);
    if (!cached) setLoading(true);
    // Only reset search when ingredient actually changes, not on initial mount
    if (prevIngredient.current !== activeIngredient) {
      prevIngredient.current = activeIngredient;
      resetSearch();
    }
    getMealsByIngredient(activeIngredient)
      .then(setMeals)
      .finally(() => setLoading(false));
  }, [activeIngredient, resetSearch]);

  const switchIngredient = useCallback((name: string) => {
    if (name === activeIngredient) return;
    setActiveIngredient(name);
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    const qs = params.toString();
    window.history.replaceState(null, "", `/ingredients/${encodeURIComponent(name)}${qs ? `?${qs}` : ""}`);
    window.scrollTo({ top: 0 });
  }, [activeIngredient]);

  const filteredMeals = useMemo(() =>
    meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase())
    ), [meals, debouncedSearch]);

  const filteredIngredients = useMemo(() => {
    if (!sidebarSearch) return ingredients;
    return ingredients.filter((i) =>
      i.strIngredient.toLowerCase().includes(sidebarSearch.toLowerCase())
    );
  }, [ingredients, sidebarSearch]);

  const visibleIngredients = filteredIngredients.slice(0, sidebarVisibleCount);
  const hasMoreIngredients = sidebarVisibleCount < filteredIngredients.length;
  const loadMoreIngredients = useCallback(() => {
    setSidebarVisibleCount((prev) => prev + 30);
  }, []);

  const resetSidebarSearch = useCallback(() => {
    setSidebarSearch("");
    setSidebarVisibleCount(30);
  }, []);

  return {
    activeIngredient,
    meals,
    ingredients,
    filteredMeals,
    filteredIngredients,
    visibleIngredients,
    hasMoreIngredients,
    loadMoreIngredients,
    search,
    setSearch,
    resetSearch,
    sidebarSearch,
    setSidebarSearch,
    resetSidebarSearch,
    loading,
    switchIngredient,
  };
}
