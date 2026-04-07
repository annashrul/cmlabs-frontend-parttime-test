import { useCallback, useEffect, useState } from "react";
import { getMealsByArea, getAreas, isCached } from "@/lib/api";
import type { MealSummary, Area } from "@/lib/types";

export function useAreaMeals(initialArea: string) {
  const [activeArea, setActiveArea] = useState(initialArea);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(!isCached(`meals-by-area:${initialArea}`));

  useEffect(() => {
    getAreas().then(setAreas);
  }, []);

  useEffect(() => {
    const cached = isCached(`meals-by-area:${activeArea}`);
    if (!cached) setLoading(true);
    setSearch("");
    getMealsByArea(activeArea)
      .then(setMeals)
      .finally(() => setLoading(false));
  }, [activeArea]);

  const switchArea = useCallback((name: string) => {
    if (name === activeArea) return;
    setActiveArea(name);
    window.history.replaceState(null, "", `/local-culinary/${encodeURIComponent(name)}`);
  }, [activeArea]);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return {
    activeArea,
    areas,
    meals,
    filteredMeals,
    search,
    setSearch,
    loading,
    switchArea,
  };
}
