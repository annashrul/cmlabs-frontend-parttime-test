"use client";

import { useState } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useIngredientsList } from "@/hooks/useIngredientsList";
import { useViewMode } from "@/context/ViewModeContext";
import SearchInput from "@/components/ui/SearchInput";
import IngredientCard from "@/components/cards/IngredientCard";
import { SkeletonIngredientGrid, SkeletonIngredientList, SkeletonIngredientCard } from "@/components/ui/Skeleton";
import { useGridColumns } from "@/hooks/useGridColumns";
import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/layout/PageContainer";
import BottomSheet from "@/components/ui/BottomSheet";
import ViewModeToggle from "@/components/ui/ViewModeToggle";
import IngredientCardList from "@/components/cards/IngredientCardList";
import { Leaf, ChevronDown, Filter, SlidersHorizontal } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function IngredientsPage() {
    const { loading, search, setSearch, activeLetter, setActiveLetter, availableLetters, filtered, visible, highlightedValue, hasMore, sentinelRef, observerFailed, loadMore, remaining } = useIngredientsList();
    const { viewMode } = useViewMode();
    const columns = useGridColumns();
    const [sheetOpen, setSheetOpen] = useState(false);
    usePageTitle("Ingredients");

    const remainder = visible.length % columns;
    const skeletonCount = hasMore && viewMode === "grid"
        ? remainder === 0 ? columns : columns - remainder
        : 0;

    const handleLetterSelect = (letter: string) => {
        setActiveLetter(letter);
        setSheetOpen(false);
    };

    return (
        <PageContainer>
            <div className="mb-6 md:mb-10 text-center">
                <div className="mb-2 md:mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium text-orange-600">
                    <Leaf className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    Discover Recipes
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    Explore Ingredients
                </h1>
                <p className="mt-1.5 md:mt-2 text-sm md:text-base text-gray-500 max-w-md mx-auto">
                    Browse through hundreds of ingredients and discover delicious meals to cook
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Desktop sidebar: A-Z */}
                <aside className="hidden lg:block lg:w-48 lg:shrink-0 pt-2">
                    <div className="lg:sticky lg:top-[4.5rem]">
                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-semibold text-gray-800">Filter A–Z</span>
                            </div>
                            <button onClick={() => setActiveLetter("All")}
                                className={`w-full rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 text-left mb-1 ${activeLetter === "All"
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                    }`}>All</button>
                            <div className="grid grid-cols-4 gap-1">
                                {ALPHABET.map((letter) => (
                                    <button key={letter} onClick={() => setActiveLetter(letter)} disabled={!availableLetters.has(letter)}
                                        className={`rounded-lg py-2 text-xs font-bold transition-all duration-200 ${activeLetter === letter
                                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                            : availableLetters.has(letter)
                                                ? "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                                : "text-gray-300 cursor-not-allowed"
                                            }`}>{letter}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    <div className="sticky top-14 md:top-16 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 py-2 mb-2 sm:mb-3 md:mb-4 bg-[var(--background)] flex items-center gap-2 md:gap-3">
                        <button onClick={() => setSheetOpen(true)}
                            className="lg:hidden relative shrink-0 h-10 sm:h-11 w-10 sm:w-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm text-gray-500 hover:text-orange-600 transition-colors">
                            <SlidersHorizontal className="h-4 w-4" />
                            {activeLetter !== "All" && (
                                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                                    {activeLetter}
                                </span>
                            )}
                        </button>
                        <div className="flex-1">
                            <SearchInput value={search} onChange={(v) => setSearch(v)} placeholder="Search ingredients by name..." />
                        </div>
                        <ViewModeToggle />
                    </div>

                    {loading ? (
                        viewMode === "grid" ? <SkeletonIngredientGrid /> : <SkeletonIngredientList />
                    ) : filtered.length === 0 ? (
                        <EmptyState message={search ? `No ingredients found for "${search}"` : `No ingredients starting with "${activeLetter}"`} onReset={search ? () => { setSearch(""); } : undefined} />
                    ) : (
                        <>
                            <p className="mb-3 md:mb-5 text-xs md:text-sm text-gray-400">
                                Showing <span className="font-medium text-gray-500">{visible.length}</span> of <span className="font-medium text-gray-500">{filtered.length}</span> ingredients
                            </p>

                            {viewMode === "grid" ? (
                                <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                                    {visible.map((item) => (
                                        <IngredientCard key={item.idIngredient} name={item.strIngredient} description={item.strDescription} highlighted={item.strIngredient === highlightedValue} />
                                    ))}
                                    {/* Skeleton fillers for remaining columns */}
                                    {hasMore && !observerFailed && (
                                        <>
                                            {Array.from({ length: skeletonCount }).map((_, i) => (
                                                <SkeletonIngredientCard key={`skel-${i}`} />
                                            ))}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {visible.map((item) => (
                                        <IngredientCardList key={item.idIngredient} name={item.strIngredient} description={item.strDescription} highlighted={item.strIngredient === highlightedValue} />
                                    ))}
                                </div>
                            )}

                            {hasMore && (
                                <>
                                    {!observerFailed && <div ref={sentinelRef} className="h-1" />}
                                    {observerFailed && (
                                        <div className="mt-8 md:mt-10 flex justify-center">
                                            <button onClick={loadMore}
                                                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95">
                                                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                                                Load More ({remaining} remaining)
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Filter A–Z">
                <div className="flex flex-col gap-1">
                    <button onClick={() => handleLetterSelect("All")}
                        className={`rounded-xl px-3 py-3 text-sm font-semibold text-left transition-all ${activeLetter === "All" ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md" : "text-gray-600 hover:bg-orange-50"
                            }`}>All</button>
                    <div className="grid grid-cols-6 gap-1.5 mt-2">
                        {ALPHABET.map((letter) => (
                            <button key={letter} onClick={() => handleLetterSelect(letter)} disabled={!availableLetters.has(letter)}
                                className={`rounded-xl py-3 text-sm font-bold transition-all ${activeLetter === letter
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                    : availableLetters.has(letter)
                                        ? "text-gray-600 bg-gray-50 hover:bg-orange-50 hover:text-orange-600"
                                        : "text-gray-300 bg-gray-50 cursor-not-allowed"
                                    }`}>{letter}</button>
                        ))}
                    </div>
                </div>
            </BottomSheet>
        </PageContainer>
    );
}
