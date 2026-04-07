"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useIngredientMeals, IMAGE_BASE_URL } from "@/hooks/useIngredientMeals";
import { useContainerScroll } from "@/hooks/useContainerScroll";
import { useViewMode } from "@/context/ViewModeContext";
import SearchInput from "@/components/ui/SearchInput";
import MealCard from "@/components/cards/MealCard";
import MealCardList from "@/components/cards/MealCardList";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SkeletonGrid, SkeletonList } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/layout/PageContainer";
import BottomSheet from "@/components/ui/BottomSheet";
import ViewModeToggle from "@/components/ui/ViewModeToggle";
import { ChefHat, Filter, Search, SlidersHorizontal } from "lucide-react";

export default function IngredientDetailPage() {
    const params = useParams();
    const initialName = decodeURIComponent(params.name as string);
    const {
        activeIngredient, meals, ingredients, filteredMeals, visibleIngredients,
        hasMoreIngredients, loadMoreIngredients, search, setSearch, resetSearch,
        sidebarSearch, setSidebarSearch, loading, switchIngredient,
    } = useIngredientMeals(initialName);
    const { viewMode } = useViewMode();
    const [sheetOpen, setSheetOpen] = useState(false);
    usePageTitle(`Meals with ${activeIngredient}`);

    // Separate infinite scroll observers for sidebar and bottom sheet
    const sidebar = useContainerScroll(hasMoreIngredients, loadMoreIngredients);
    const sheet = useContainerScroll(hasMoreIngredients, loadMoreIngredients);

    const handleIngredientSelect = (name: string) => {
        switchIngredient(name);
        setSheetOpen(false);
    };

    const ingredientButton = (ing: { idIngredient: string; strIngredient: string }, onClick: () => void, size: "sm" | "md") => {
        const active = ing.strIngredient === activeIngredient;
        const imgSize = size === "sm" ? "h-6 w-6" : "h-7 w-7";
        const py = size === "sm" ? "py-2" : "py-2.5";
        const gap = size === "sm" ? "gap-2" : "gap-3";
        const px = size === "sm" ? "px-2.5" : "px-3";
        return (
            <button key={ing.idIngredient} onClick={onClick}
                className={`flex items-center ${gap} rounded-xl ${px} ${py} text-sm font-medium transition-all duration-200 text-left ${
                    active
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                }`}>
                <div className={`relative ${imgSize} shrink-0 overflow-hidden rounded-full ${active ? "bg-white/20" : "bg-orange-50"}`}>
                    <Image src={`${IMAGE_BASE_URL}/${encodeURIComponent(ing.strIngredient)}-Small.png`} alt={ing.strIngredient} fill className="object-contain p-0.5" sizes="28px" />
                </div>
                <span className="truncate">{ing.strIngredient}</span>
            </button>
        );
    };

    const loadingSentinel = (
        <div className="flex justify-center py-3">
            <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                Loading more...
            </div>
        </div>
    );

    return (
        <PageContainer>
            <Breadcrumb items={[{ label: "Ingredients", href: "/ingredients" }, { label: activeIngredient }]} />

            <div className="mt-4 md:mt-6 mb-4 md:mb-6">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative h-10 w-10 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-orange-50 to-amber-50 p-1">
                        <Image src={`${IMAGE_BASE_URL}/${encodeURIComponent(activeIngredient)}-Small.png`} alt={activeIngredient} fill className="object-contain p-1" sizes="56px" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                            Meals with{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{activeIngredient}</span>
                        </h1>
                        <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 md:px-3 py-0.5 md:py-1 text-[11px] md:text-xs font-medium text-orange-600">
                            <ChefHat className="h-3 w-3 md:h-3.5 md:w-3.5" />
                            {meals.length} meal{meals.length !== 1 ? "s" : ""} found
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Desktop sidebar */}
                {ingredients.length > 0 && (
                    <aside className="hidden lg:block lg:w-56 lg:shrink-0 pt-2">
                        <div className="lg:sticky lg:top-[4.5rem]">
                            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Filter className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm font-semibold text-gray-800">Ingredients</span>
                                </div>
                                <div className="relative mb-3">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                    <input type="text" value={sidebarSearch} onChange={(e) => setSidebarSearch(e.target.value)}
                                        placeholder="Filter..." className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs text-gray-700 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/30" />
                                </div>
                                <nav ref={sidebar.containerRef} className="flex flex-col gap-0.5 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin">
                                    {visibleIngredients.map((ing) => ingredientButton(ing, () => switchIngredient(ing.strIngredient), "sm"))}
                                    {hasMoreIngredients && <div ref={sidebar.sentinelRef}>{loadingSentinel}</div>}
                                </nav>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    <div className="sticky top-14 md:top-16 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0 py-2 mb-2 sm:mb-3 md:mb-4 bg-[var(--background)] flex items-center gap-2 md:gap-3">
                        <button onClick={() => setSheetOpen(true)}
                            className="lg:hidden relative shrink-0 h-10 sm:h-11 w-10 sm:w-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm text-gray-500 hover:text-orange-600 transition-colors">
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">1</span>
                        </button>
                        <div className="flex-1 min-w-0">
                            <SearchInput value={search} onChange={setSearch} placeholder="Search meals by name..." />
                        </div>
                        <ViewModeToggle />
                    </div>

                    {loading ? (
                        viewMode === "grid" ? <SkeletonGrid /> : <SkeletonList />
                    ) : filteredMeals.length === 0 ? (
                        <EmptyState message={`No meals found${search ? ` for "${search}"` : ""}`} onReset={search ? resetSearch : undefined} />
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {filteredMeals.map((meal) => (
                                <MealCard key={meal.idMeal} id={meal.idMeal} name={meal.strMeal} thumbnail={meal.strMealThumb} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2 md:space-y-3">
                            {filteredMeals.map((meal) => (
                                <MealCardList key={meal.idMeal} id={meal.idMeal} name={meal.strMeal} thumbnail={meal.strMealThumb} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Ingredients" scrollRef={sheet.containerRef}>
                <div className="flex flex-col gap-1">
                    {visibleIngredients.map((ing) => ingredientButton(ing, () => handleIngredientSelect(ing.strIngredient), "md"))}
                    {hasMoreIngredients && <div ref={sheet.sentinelRef}>{loadingSentinel}</div>}
                </div>
            </BottomSheet>
        </PageContainer>
    );
}
