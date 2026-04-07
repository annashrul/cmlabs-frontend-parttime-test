"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useIngredientMeals, IMAGE_BASE_URL } from "@/hooks/useIngredientMeals";
import { useViewMode } from "@/context/ViewModeContext";
import SearchInput from "@/components/ui/SearchInput";
import MealCard from "@/components/cards/MealCard";
import MealCardList from "@/components/cards/MealCardList";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SkeletonGrid, SkeletonList } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/layout/PageContainer";
import { ChefHat, Filter, Leaf, Search } from "lucide-react";
import ViewModeToggle from "@/components/ui/ViewModeToggle";

export default function IngredientDetailPage() {
    const params = useParams();
    const initialName = decodeURIComponent(params.name as string);

    const { activeIngredient, meals, ingredients, filteredMeals, filteredIngredients, search, setSearch, sidebarSearch, setSidebarSearch, loading, switchIngredient } = useIngredientMeals(initialName);
    const { viewMode } = useViewMode();

    return (
        <PageContainer>
            <Breadcrumb
                items={[
                    { label: "Ingredients", href: "/ingredients" },
                    { label: activeIngredient },
                ]}
            />

            <div className="mt-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-orange-50 to-amber-50 p-1">
                        <Image
                            src={`${IMAGE_BASE_URL}/${encodeURIComponent(activeIngredient)}-Small.png`}
                            alt={activeIngredient}
                            fill
                            className="object-contain p-1"
                            sizes="56px"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl tracking-tight">
                            Meals with{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{activeIngredient}</span>
                        </h1>
                        <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                            <ChefHat className="h-3.5 w-3.5" />
                            {meals.length} meal{meals.length !== 1 ? "s" : ""} found
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Sidebar: ingredient switcher */}
                {ingredients.length > 0 && (
                    <aside className="lg:w-56 lg:shrink-0 mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-20">
                            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Filter className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm font-semibold text-gray-800">Ingredients</span>
                                </div>

                                {/* Mobile: horizontal scroll */}
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
                                    {ingredients.slice(0, 30).map((ing) => (
                                        <button
                                            key={ing.idIngredient}
                                            onClick={() => switchIngredient(ing.strIngredient)}
                                            className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                                                ing.strIngredient === activeIngredient
                                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                    : "bg-gray-50 text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                            }`}
                                        >
                                            <Leaf className="h-3.5 w-3.5" />
                                            {ing.strIngredient}
                                        </button>
                                    ))}
                                </div>

                                {/* Desktop: search + scrollable list */}
                                <div className="hidden lg:block">
                                    <div className="relative mb-3">
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={sidebarSearch}
                                            onChange={(e) => setSidebarSearch(e.target.value)}
                                            placeholder="Filter..."
                                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs text-gray-700 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30"
                                        />
                                    </div>
                                    <nav className="flex flex-col gap-0.5 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin">
                                        {filteredIngredients.map((ing) => (
                                            <button
                                                key={ing.idIngredient}
                                                onClick={() => switchIngredient(ing.strIngredient)}
                                                className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-200 text-left ${
                                                    ing.strIngredient === activeIngredient
                                                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                                }`}
                                            >
                                                <div className={`relative h-6 w-6 shrink-0 overflow-hidden rounded-full ${
                                                    ing.strIngredient === activeIngredient ? "bg-white/20" : "bg-orange-50"
                                                }`}>
                                                    <Image
                                                        src={`${IMAGE_BASE_URL}/${encodeURIComponent(ing.strIngredient)}-Small.png`}
                                                        alt={ing.strIngredient}
                                                        fill
                                                        className="object-contain p-0.5"
                                                        sizes="24px"
                                                    />
                                                </div>
                                                <span className="truncate">{ing.strIngredient}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    {/* Search + view toggle */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex-1">
                            <SearchInput
                                value={search}
                                onChange={setSearch}
                                placeholder="Search meals by name..."
                            />
                        </div>
                        <ViewModeToggle />
                    </div>

                    {loading ? (
                        viewMode === "grid" ? <SkeletonGrid /> : <SkeletonList />
                    ) : filteredMeals.length === 0 ? (
                        <EmptyState message={`No meals found${search ? ` for "${search}"` : ""}`} />
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {filteredMeals.map((meal) => (
                                <MealCard
                                    key={meal.idMeal}
                                    id={meal.idMeal}
                                    name={meal.strMeal}
                                    thumbnail={meal.strMealThumb}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredMeals.map((meal) => (
                                <MealCardList
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
        </PageContainer>
    );
}
