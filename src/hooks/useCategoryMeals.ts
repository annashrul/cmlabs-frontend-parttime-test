import { useCallback, useEffect, useState } from "react";
import { getMealsByCategory, getCategories, isCached } from "@/lib/api";
import type { MealSummary, Category } from "@/lib/types";

export function useCategoryMeals(initialCategory: string) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(!isCached(`meals-by-category:${initialCategory}`));

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const cached = isCached(`meals-by-category:${activeCategory}`);
    if (!cached) setLoading(true);
    setSearch("");
    getMealsByCategory(activeCategory)
      .then(setMeals)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const switchCategory = useCallback((name: string) => {
    if (name === activeCategory) return;
    setActiveCategory(name);
    window.history.replaceState(null, "", `/foods/${encodeURIComponent(name)}`);
  }, [activeCategory]);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return {
    activeCategory,
    categories,
    meals,
    filteredMeals,
    search,
    setSearch,
    loading,
    switchCategory,
  };
}
