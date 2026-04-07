"use client";

import { useIngredientsList } from "@/hooks/useIngredientsList";
import { useViewMode } from "@/context/ViewModeContext";
import SearchInput from "@/components/ui/SearchInput";
import IngredientCard from "@/components/cards/IngredientCard";
import { SkeletonIngredientGrid } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/layout/PageContainer";
import { Leaf, ChevronDown, Filter } from "lucide-react";
import IngredientCardList from "@/components/cards/IngredientCardList";
import ViewModeToggle from "@/components/ui/ViewModeToggle";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function IngredientsPage() {
    const { loading, search, setSearch, activeLetter, setActiveLetter, availableLetters, filtered, visible, highlightedValue, hasMore, sentinelRef, observerFailed, loadMore, remaining } = useIngredientsList();
    const { viewMode } = useViewMode();

    return (
        <PageContainer>
            <div className="mb-10 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
                    <Leaf className="h-4 w-4" />
                    Discover Recipes
                </div>
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">
                    Explore Ingredients
                </h1>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                    Browse through hundreds of ingredients and discover delicious meals to cook
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Sidebar: A-Z filter */}
                <aside className="lg:w-48 lg:shrink-0 mb-6 lg:mb-0">
                    <div className="lg:sticky lg:top-20">
                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-semibold text-gray-800">Filter A–Z</span>
                            </div>

                            {/* Mobile: horizontal scroll */}
                            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
                                <button
                                    onClick={() => setActiveLetter("All")}
                                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                                        activeLetter === "All"
                                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                            : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                    }`}
                                >
                                    All
                                </button>
                                {ALPHABET.map((letter) => (
                                    <button
                                        key={letter}
                                        onClick={() => setActiveLetter(letter)}
                                        disabled={!availableLetters.has(letter)}
                                        className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                                            activeLetter === letter
                                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                                : availableLetters.has(letter)
                                                    ? "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                                    : "bg-gray-50 text-gray-300 cursor-not-allowed"
                                        }`}
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>

                            {/* Desktop: vertical grid */}
                            <div className="hidden lg:block">
                                <button
                                    onClick={() => setActiveLetter("All")}
                                    className={`w-full rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 text-left mb-1 ${
                                        activeLetter === "All"
                                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                            : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                    }`}
                                >
                                    All
                                </button>
                                <div className="grid grid-cols-4 gap-1">
                                    {ALPHABET.map((letter) => (
                                        <button
                                            key={letter}
                                            onClick={() => setActiveLetter(letter)}
                                            disabled={!availableLetters.has(letter)}
                                            className={`rounded-lg py-2 text-xs font-bold transition-all duration-200 ${
                                                activeLetter === letter
                                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                                    : availableLetters.has(letter)
                                                        ? "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                                        : "text-gray-300 cursor-not-allowed"
                                            }`}
                                        >
                                            {letter}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    {/* Search + view toggle */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex-1">
                            <SearchInput
                                value={search}
                                onChange={(v) => setSearch(v)}
                                placeholder="Search ingredients by name..."
                            />
                        </div>
                        <ViewModeToggle />
                    </div>

                    {loading ? (
                        <SkeletonIngredientGrid />
                    ) : filtered.length === 0 ? (
                        <EmptyState message={search ? `No ingredients found for "${search}"` : `No ingredients starting with "${activeLetter}"`} />
                    ) : (
                        <>
                            <p className="mb-5 text-sm text-gray-400">
                                Showing <span className="font-medium text-gray-500">{visible.length}</span> of <span className="font-medium text-gray-500">{filtered.length}</span> ingredients
                            </p>

                            {viewMode === "grid" ? (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                                    {visible.map((item) => (
                                        <IngredientCard
                                            key={item.idIngredient}
                                            name={item.strIngredient}
                                            description={item.strDescription}
                                            highlighted={item.strIngredient === highlightedValue}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {visible.map((item) => (
                                        <IngredientCardList
                                            key={item.idIngredient}
                                            name={item.strIngredient}
                                            description={item.strDescription}
                                            highlighted={item.strIngredient === highlightedValue}
                                        />
                                    ))}
                                </div>
                            )}

                            {hasMore && (
                                <>
                                    {!observerFailed && <div ref={sentinelRef} className="h-1" />}
                                    {observerFailed && (
                                        <div className="mt-10 flex justify-center">
                                            <button
                                                onClick={loadMore}
                                                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                                            >
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
        </PageContainer>
    );
}
