import { useCallback, useEffect, useMemo, useState } from "react";
import { getMealsByArea, getAreas, isCached } from "@/lib/api";
import type { MealSummary, Area } from "@/lib/types";
import { useSearchWithParams } from "./useSearchWithParams";

export function useAreaMeals(initialArea: string) {
  const [activeArea, setActiveArea] = useState(initialArea);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);

  const { value: search, setValue: setSearch, debouncedValue: debouncedSearch, reset: resetSearch } = useSearchWithParams();

  useEffect(() => {
    getAreas().then(setAreas);
  }, []);

  useEffect(() => {
    const cached = isCached(`meals-by-area:${activeArea}`);
    if (!cached) setLoading(true);
    resetSearch();
    getMealsByArea(activeArea)
      .then(setMeals)
      .finally(() => setLoading(false));
  }, [activeArea, resetSearch]);

  const switchArea = useCallback((name: string) => {
    if (name === activeArea) return;
    setActiveArea(name);
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    const qs = params.toString();
    window.history.replaceState(null, "", `/local-culinary/${encodeURIComponent(name)}${qs ? `?${qs}` : ""}`);
    window.scrollTo({ top: 0 });
  }, [activeArea]);

  const filteredMeals = useMemo(() =>
    meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase())
    ), [meals, debouncedSearch]);

  return {
    activeArea,
    areas,
    meals,
    filteredMeals,
    search,
    setSearch,
    resetSearch,
    loading,
    switchArea,
  };
}
