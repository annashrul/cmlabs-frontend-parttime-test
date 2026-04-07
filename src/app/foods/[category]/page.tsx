"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCategoryMeals } from "@/hooks/useCategoryMeals";
import { useViewMode } from "@/context/ViewModeContext";
import SearchInput from "@/components/ui/SearchInput";
import MealCard from "@/components/cards/MealCard";
import MealCardList from "@/components/cards/MealCardList";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SkeletonGrid, SkeletonList, SkeletonMealCard } from "@/components/ui/Skeleton";
import { useFoodsGridColumns } from "@/hooks/useFoodsGridColumns";
import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/layout/PageContainer";
import ViewModeToggle from "@/components/ui/ViewModeToggle";
import BottomSheet from "@/components/ui/BottomSheet";
import { ChefHat, Filter, SlidersHorizontal } from "lucide-react";

export default function FoodsCategoryPage() {
    const params = useParams();
    const initialCategory = decodeURIComponent(params.category as string);
    const { activeCategory, categories, meals, filteredMeals, visibleMeals, hasMore, sentinelRef, search, setSearch, resetSearch, loading, switchCategory } = useCategoryMeals(initialCategory);
    const { viewMode } = useViewMode();
    const columns = useFoodsGridColumns();
    const [sheetOpen, setSheetOpen] = useState(false);
    usePageTitle(`${activeCategory} Meals`);

    const remainder = visibleMeals.length % columns;
    const skeletonCount = hasMore && viewMode === "grid"
        ? remainder === 0 ? columns : columns - remainder
        : 0;

    const handleCategorySelect = (name: string) => {
        switchCategory(name);
        setSheetOpen(false);
    };

    return (
        <PageContainer>
            <Breadcrumb
                items={[
                    { label: "Foods", href: "/foods" },
                    { label: activeCategory },
                ]}
            />

            <div className="mt-3 sm:mt-4 md:mt-6 mb-3 sm:mb-4 md:mb-6">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{activeCategory}</span>{" "}
                    Meals
                </h1>
                <div className="mt-1 sm:mt-1.5 md:mt-2 inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-orange-50 px-2 sm:px-2.5 md:px-3 py-0.5 md:py-1 text-[10px] sm:text-[11px] md:text-xs font-medium text-orange-600">
                    <ChefHat className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
                    {meals.length} meal{meals.length !== 1 ? "s" : ""} found
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Desktop sidebar */}
                {categories.length > 0 && (
                    <aside className="hidden lg:block lg:w-56 lg:shrink-0 pt-2">
                        <div className="lg:sticky lg:top-[4.5rem]">
                            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Filter className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm font-semibold text-gray-800">Categories</span>
                                </div>
                                <nav className="flex flex-col gap-1">
                                    {categories.map((cat) => (
                                        <button key={cat.idCategory} onClick={() => switchCategory(cat.strCategory)}
                                            className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-200 text-left ${
                                                cat.strCategory === activeCategory
                                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                            }`}>
                                            <div className={`relative h-7 w-7 shrink-0 overflow-hidden rounded-lg ${cat.strCategory === activeCategory ? "bg-white/20" : "bg-orange-50"}`}>
                                                <Image src={cat.strCategoryThumb} alt={cat.strCategory} fill className="object-cover" sizes="28px" />
                                            </div>
                                            <span className="truncate">{cat.strCategory}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    {/* Filter bar — sticky on all screens */}
                    <div className="sticky top-14 md:top-16 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0 py-2 mb-2 sm:mb-3 md:mb-4 bg-[var(--background)]">
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* Mobile filter button */}
                            <button onClick={() => setSheetOpen(true)}
                                className="lg:hidden relative shrink-0 h-10 sm:h-11 w-10 sm:w-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm text-gray-500 hover:text-orange-600 transition-colors">
                                <SlidersHorizontal className="h-4 w-4" />
                                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                                    1
                                </span>
                            </button>
                            <div className="flex-1 min-w-0">
                                <SearchInput value={search} onChange={setSearch} placeholder="Search meals..." />
                            </div>
                            <ViewModeToggle />
                        </div>
                    </div>

                    {loading ? (
                        viewMode === "grid" ? <SkeletonGrid /> : <SkeletonList />
                    ) : filteredMeals.length === 0 ? (
                        <EmptyState message={`No meals found${search ? ` for "${search}"` : ""}`} onReset={search ? resetSearch : undefined} />
                    ) : viewMode === "grid" ? (
                        <>
                            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 md:grid-cols-3">
                                {visibleMeals.map((meal) => (
                                    <MealCard key={meal.idMeal} id={meal.idMeal} name={meal.strMeal} thumbnail={meal.strMealThumb} />
                                ))}
                                {hasMore && Array.from({ length: skeletonCount }).map((_, i) => (
                                    <SkeletonMealCard key={`skel-${i}`} />
                                ))}
                            </div>
                            {hasMore && <div ref={sentinelRef} className="h-1" />}
                        </>
                    ) : (
                        <>
                            <div className="space-y-2 md:space-y-3">
                                {visibleMeals.map((meal) => (
                                    <MealCardList key={meal.idMeal} id={meal.idMeal} name={meal.strMeal} thumbnail={meal.strMealThumb} />
                                ))}
                            </div>
                            {hasMore && <div ref={sentinelRef} className="h-1" />}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile bottom sheet filter */}
            <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Categories">
                <div className="flex flex-col gap-1">
                    {categories.map((cat) => (
                        <button key={cat.idCategory} onClick={() => handleCategorySelect(cat.strCategory)}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                                cat.strCategory === activeCategory
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                    : "text-gray-600 hover:bg-orange-50"
                            }`}>
                            <div className={`relative h-8 w-8 shrink-0 overflow-hidden rounded-lg ${cat.strCategory === activeCategory ? "bg-white/20" : "bg-orange-50"}`}>
                                <Image src={cat.strCategoryThumb} alt={cat.strCategory} fill className="object-cover" sizes="32px" />
                            </div>
                            {cat.strCategory}
                        </button>
                    ))}
                </div>
            </BottomSheet>
        </PageContainer>
    );
}
