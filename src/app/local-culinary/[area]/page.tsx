"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAreaMeals } from "@/hooks/useAreaMeals";
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
import { AREA_FLAGS } from "@/data/areas";
import { ChefHat, Filter, SlidersHorizontal } from "lucide-react";

export default function LocalCulinaryAreaPage() {
    const params = useParams();
    const initialArea = decodeURIComponent(params.area as string);
    const { activeArea, areas, meals, filteredMeals, search, setSearch, resetSearch, loading, switchArea } = useAreaMeals(initialArea);
    const { viewMode } = useViewMode();
    const [sheetOpen, setSheetOpen] = useState(false);
    usePageTitle(`${activeArea} Cuisine`);

    const handleAreaSelect = (name: string) => {
        switchArea(name);
        setSheetOpen(false);
    };

    return (
        <PageContainer>
            <Breadcrumb items={[{ label: "Local Culinary", href: "/local-culinary" }, { label: activeArea }]} />

            <div className="mt-4 md:mt-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-2xl md:text-3xl">{AREA_FLAGS[activeArea] || "🌍"}</span>
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{activeArea}</span>{" "}
                            Cuisine
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
                {areas.length > 0 && (
                    <aside className="hidden lg:block lg:w-56 lg:shrink-0 pt-2">
                        <div className="lg:sticky lg:top-[4.5rem]">
                            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Filter className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm font-semibold text-gray-800">Countries</span>
                                </div>
                                <nav className="flex flex-col gap-1 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin">
                                    {areas.map((area) => (
                                        <button key={area.strArea} onClick={() => switchArea(area.strArea)}
                                            className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-left ${
                                                area.strArea === activeArea
                                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                            }`}>
                                            <span>{AREA_FLAGS[area.strArea] || "🌍"}</span>
                                            {area.strArea}
                                        </button>
                                    ))}
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
                            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                                1
                            </span>
                        </button>
                        <div className="flex-1">
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

            <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Countries">
                <div className="flex flex-col gap-1">
                    {areas.map((area) => (
                        <button key={area.strArea} onClick={() => handleAreaSelect(area.strArea)}
                            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                                area.strArea === activeArea
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                    : "text-gray-600 hover:bg-orange-50"
                            }`}>
                            <span>{AREA_FLAGS[area.strArea] || "🌍"}</span>
                            {area.strArea}
                        </button>
                    ))}
                </div>
            </BottomSheet>
        </PageContainer>
    );
}
