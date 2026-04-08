import { useEffect, useState } from "react";
import { getCategories, getIngredients, getAreas } from "@/lib/api";
import type { Category } from "@/lib/types";

export function useHomeData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [ingredientCount, setIngredientCount] = useState(0);
  const [areaCount, setAreaCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load categories first — this is all the page needs to render
    getCategories().then((cats) => {
      setCategories(cats.slice(0, 8));
      setCategoryCount(cats.length);
      setLoading(false);
    });

    // Load counts independently in the background
    getIngredients().then((ings) => setIngredientCount(ings.length));
    getAreas().then((areas) => setAreaCount(areas.length));
  }, []);

  return { categories, categoryCount, ingredientCount, areaCount, loading };
}
