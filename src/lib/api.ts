const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export interface MealSummary {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string | null;
  [key: string]: string | null;
}

export async function getIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${BASE_URL}/list.php?i=list`);
  const data = await res.json();
  return data.meals ?? [];
}

export async function getMealsByIngredient(
  ingredient: string,
): Promise<MealSummary[]> {
  const res = await fetch(
    `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`,
  );
  const data = await res.json();
  return data.meals ?? [];
}

export async function getMealDetail(id: string): Promise<MealDetail | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals?.[0] ?? null;
}

export function getRecipeIngredients(meal: MealDetail) {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? "",
      });
    }
  }
  return ingredients;
}

export function getYoutubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&#]+)/) ??
    url.match(/youtu\.be\/([^?&#]+)/) ??
    url.match(/\/embed\/([^?&#]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}
