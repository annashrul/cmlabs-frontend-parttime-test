"use client";

import { useParams } from "next/navigation";
import { useCategoryMeals } from "@/hooks/useCategoryMeals";
import { useViewMode } from "@/context/ViewModeContext";
import SearchInput from "@/components/ui/SearchInput";
import MealCard from "@/components/cards/MealCard";
import MealCardList from "@/components/cards/MealCardList";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SkeletonGrid, SkeletonList } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/layout/PageContainer";
import ViewModeToggle from "@/components/ui/ViewModeToggle";
import { ChefHat, Filter, UtensilsCrossed } from "lucide-react";

export default function FoodsCategoryPage() {
    const params = useParams();
    const initialCategory = decodeURIComponent(params.category as string);

    const { activeCategory, categories, meals, filteredMeals, search, setSearch, loading, switchCategory } = useCategoryMeals(initialCategory);
    const { viewMode } = useViewMode();

    return (
        <PageContainer>
            <Breadcrumb
                items={[
                    { label: "Foods", href: "/foods" },
                    { label: activeCategory },
                ]}
            />

            <div className="mt-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl tracking-tight">
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{activeCategory}</span>{" "}
                    Meals
                </h1>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                    <ChefHat className="h-3.5 w-3.5" />
                    {meals.length} meal{meals.length !== 1 ? "s" : ""} found
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Sidebar category switcher */}
                {categories.length > 0 && (
                    <aside className="lg:w-56 lg:shrink-0 mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-20">
                            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Filter className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm font-semibold text-gray-800">Categories</span>
                                </div>

                                {/* Mobile: horizontal scroll */}
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.idCategory}
                                            onClick={() => switchCategory(cat.strCategory)}
                                            className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                                                cat.strCategory === activeCategory
                                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                    : "bg-gray-50 text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                            }`}
                                        >
                                            <UtensilsCrossed className="h-3.5 w-3.5" />
                                            {cat.strCategory}
                                        </button>
                                    ))}
                                </div>

                                {/* Desktop: vertical list */}
                                <nav className="hidden lg:flex flex-col gap-1">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.idCategory}
                                            onClick={() => switchCategory(cat.strCategory)}
                                            className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-left ${
                                                cat.strCategory === activeCategory
                                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                            }`}
                                        >
                                            <UtensilsCrossed className={`h-4 w-4 ${cat.strCategory === activeCategory ? "text-white" : "text-gray-400"}`} />
                                            {cat.strCategory}
                                        </button>
                                    ))}
                                </nav>
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
