import type { Ingredient, Category, Area, MealSummary, MealDetail } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "";

// Re-export types for convenience
export type { Ingredient, Category, Area, MealSummary, MealDetail };

// ── In-memory cache (cleared on page refresh) ──────────────────────
const cache = new Map<string, unknown>();

async function cached<T>(key: string, fetcher: () => Promise<T>, fallback: T): Promise<T> {
  if (cache.has(key)) return cache.get(key) as T;
  try {
    const data = await fetcher();
    cache.set(key, data);
    return data;
  } catch (error) {
    console.error(`[API] Failed to fetch ${key}:`, error);
    return fallback;
  }
}

export function isCached(key: string): boolean {
  return cache.has(key);
}

// ── API functions (all cached) ─────────────────────────────────────
export function getIngredients(): Promise<Ingredient[]> {
  return cached("ingredients", async () => {
    const res = await fetch(`${BASE_URL}/list.php?i=list`);
    const data = await res.json();
    return data.meals ?? [];
  }, []);
}

export function getMealsByIngredient(ingredient: string): Promise<MealSummary[]> {
  return cached(`meals-by-ingredient:${ingredient}`, async () => {
    const res = await fetch(
      `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`,
    );
    const data = await res.json();
    return data.meals ?? [];
  }, []);
}

export function getCategories(): Promise<Category[]> {
  return cached("categories", async () => {
    const res = await fetch(`${BASE_URL}/categories.php`);
    const data = await res.json();
    return data.categories ?? [];
  }, []);
}

export function getAreas(): Promise<Area[]> {
  return cached("areas", async () => {
    const res = await fetch(`${BASE_URL}/list.php?a=list`);
    const data = await res.json();
    return data.meals ?? [];
  }, []);
}

export function getMealsByCategory(category: string): Promise<MealSummary[]> {
  return cached(`meals-by-category:${category}`, async () => {
    const res = await fetch(
      `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
    );
    const data = await res.json();
    return data.meals ?? [];
  }, []);
}

export function getMealsByArea(area: string): Promise<MealSummary[]> {
  return cached(`meals-by-area:${area}`, async () => {
    const res = await fetch(
      `${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`,
    );
    const data = await res.json();
    return data.meals ?? [];
  }, []);
}

export function getMealDetail(id: string): Promise<MealDetail | null> {
  return cached(`meal-detail:${id}`, async () => {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals?.[0] ?? null;
  }, null);
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
