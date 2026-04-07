"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getMealsByIngredient, MealSummary, IMAGE_BASE_URL } from "@/lib/api";
import SearchInput from "@/components/SearchInput";
import MealCard from "@/components/MealCard";
import Breadcrumb from "@/components/Breadcrumb";

export default function IngredientDetailPage() {
  const params = useParams();
  const ingredientName = decodeURIComponent(params.name as string);

  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealsByIngredient(ingredientName)
      .then(setMeals)
      .finally(() => setLoading(false));
  }, [ingredientName]);

  const filtered = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Ingredients", href: "/" },
          { label: ingredientName },
        ]}
      />

      <div className="mt-6 flex flex-col lg:flex-row lg:gap-8">
        {/* Left: Sticky ingredient image */}
        <div className="mb-6 lg:mb-0 lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-orange-50 p-3">
                <Image
                  src={`${IMAGE_BASE_URL}/${encodeURIComponent(ingredientName)}.png`}
                  alt={ingredientName}
                  fill
                  className="object-contain p-2"
                  sizes="160px"
                  priority
                />
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900 text-center">
                {ingredientName}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {meals.length} meal{meals.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>
        </div>

        {/* Right: Meals list */}
        <div className="flex-1 min-w-0">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Meals with{" "}
            <span className="text-orange-500">{ingredientName}</span>
          </h1>

          <div className="mb-6">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search meals by name..."
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-20">
              No meals found{search ? ` for "${search}"` : ""}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  id={meal.idMeal}
                  name={meal.strMeal}
                  thumbnail={meal.strMealThumb}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
