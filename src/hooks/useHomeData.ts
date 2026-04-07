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
    Promise.all([getCategories(), getIngredients(), getAreas()]).then(
      ([cats, ings, areas]) => {
        setCategories(cats.slice(0, 8));
        setCategoryCount(cats.length);
        setIngredientCount(ings.length);
        setAreaCount(areas.length);
        setLoading(false);
      },
    );
  }, []);

  return { categories, categoryCount, ingredientCount, areaCount, loading };
}
