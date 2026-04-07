import { useCallback, useEffect, useState, useMemo } from "react";
import { getMealsByIngredient, getIngredients, isCached, IMAGE_BASE_URL } from "@/lib/api";
import type { MealSummary, Ingredient } from "@/lib/types";

export { IMAGE_BASE_URL };

export function useIngredientMeals(initialName: string) {
  const [activeIngredient, setActiveIngredient] = useState(initialName);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [loading, setLoading] = useState(!isCached(`meals-by-ingredient:${initialName}`));

  useEffect(() => {
    getIngredients().then(setIngredients);
  }, []);

  useEffect(() => {
    const cached = isCached(`meals-by-ingredient:${activeIngredient}`);
    if (!cached) setLoading(true);
    setSearch("");
    getMealsByIngredient(activeIngredient)
      .then(setMeals)
      .finally(() => setLoading(false));
  }, [activeIngredient]);

  const switchIngredient = useCallback((name: string) => {
    if (name === activeIngredient) return;
    setActiveIngredient(name);
    window.history.replaceState(null, "", `/ingredients/${encodeURIComponent(name)}`);
  }, [activeIngredient]);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  const filteredIngredients = useMemo(() => {
    if (!sidebarSearch) return ingredients;
    return ingredients.filter((i) =>
      i.strIngredient.toLowerCase().includes(sidebarSearch.toLowerCase())
    );
  }, [ingredients, sidebarSearch]);

  return {
    activeIngredient,
    meals,
    ingredients,
    filteredMeals,
    filteredIngredients,
    search,
    setSearch,
    sidebarSearch,
    setSidebarSearch,
    loading,
    switchIngredient,
  };
}
