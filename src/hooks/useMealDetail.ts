import { useEffect, useState } from "react";
import { getMealDetail, getRecipeIngredients, getYoutubeEmbedUrl, isCached } from "@/lib/api";
import type { MealDetail } from "@/lib/types";

export function useMealDetail(mealId: string) {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(!isCached(`meal-detail:${mealId}`));

  useEffect(() => {
    if (!isCached(`meal-detail:${mealId}`)) setLoading(true);
    getMealDetail(mealId)
      .then(setMeal)
      .finally(() => setLoading(false));
  }, [mealId]);

  const ingredients = meal ? getRecipeIngredients(meal) : [];
  const youtubeEmbedUrl = meal?.strYoutube
    ? getYoutubeEmbedUrl(meal.strYoutube)
    : null;

  return { meal, loading, ingredients, youtubeEmbedUrl };
}
