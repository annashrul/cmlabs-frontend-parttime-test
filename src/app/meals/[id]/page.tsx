"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  getMealDetail,
  getRecipeIngredients,
  getYoutubeEmbedUrl,
  IMAGE_BASE_URL,
  MealDetail,
} from "@/lib/api";
import Breadcrumb from "@/components/Breadcrumb";

export default function MealDetailPage() {
  const params = useParams();
  const mealId = params.id as string;

  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealDetail(mealId)
      .then(setMeal)
      .finally(() => setLoading(false));
  }, [mealId]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">Meal not found.</p>
      </div>
    );
  }

  const ingredients = getRecipeIngredients(meal);
  const youtubeEmbedUrl = meal.strYoutube
    ? getYoutubeEmbedUrl(meal.strYoutube)
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Ingredients", href: "/" },
          { label: meal.strMeal },
        ]}
      />

      <div className="mt-6 flex flex-col md:flex-row md:gap-8">
        {/* Left: Sticky Meal Image */}
        <div className="mb-6 md:mb-0 md:w-80 lg:w-96 md:shrink-0">
          <div className="md:sticky md:top-24">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 384px"
                priority
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {meal.strCategory && (
                <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {meal.strArea}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Meal details */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">{meal.strMeal}</h1>

          {/* Ingredients */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Ingredients
            </h2>
            <ul className="mt-3 space-y-2">
              {ingredients.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-white p-2 shadow-sm border border-gray-100"
                >
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-orange-50">
                    <Image
                      src={`${IMAGE_BASE_URL}/${encodeURIComponent(item.ingredient)}-Small.png`}
                      alt={item.ingredient}
                      fill
                      className="object-contain p-0.5"
                      sizes="32px"
                    />
                  </div>
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">{item.measure}</span>{" "}
                    {item.ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Instructions</h2>
        <div className="mt-4 space-y-3 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          {meal.strInstructions
            .split(/\r?\n/)
            .filter((p) => p.trim())
            .map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
        </div>
      </div>

      {/* YouTube Video */}
      {youtubeEmbedUrl && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">
            Video Tutorial
          </h2>
          <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            <iframe
              src={youtubeEmbedUrl}
              title={`${meal.strMeal} video`}
              className="h-full w-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      )}

      {meal.strYoutube && !youtubeEmbedUrl && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">
            Video Tutorial
          </h2>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}
