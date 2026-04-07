"use client";

import { useEffect, useMemo, useState } from "react";
import { getIngredients, Ingredient } from "@/lib/api";
import { PAGE_SIZE, STORAGE_KEYS } from "@/lib/constants";
import { useSessionString, useSessionNumber } from "@/hooks/useSessionStorage";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import { useScrollPreserve } from "@/hooks/useScrollPreserve";
import StickySearch from "@/components/StickySearch";
import IngredientCard from "@/components/IngredientCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import PageContainer from "@/components/PageContainer";

function getCachedIngredients(): Ingredient[] {
    if (typeof sessionStorage === "undefined") return [];
    const cached = sessionStorage.getItem(STORAGE_KEYS.DATA_CACHE);
    if (!cached) return [];
    try {
        return JSON.parse(cached);
    } catch {
        return [];
    }
}

export default function IngredientsPage() {
    const [ingredients, setIngredients] = useState<Ingredient[]>(getCachedIngredients);
    const [loading, setLoading] = useState(ingredients.length === 0);
    const [search, setSearch] = useSessionString(STORAGE_KEYS.SEARCH, "");
    const [visibleCount, setVisibleCount] = useSessionNumber(STORAGE_KEYS.VISIBLE_COUNT, PAGE_SIZE);

    const debouncedSearch = useDebounce(search);
    useScrollPreserve(debouncedSearch);

    const { highlightedValue, isInitialLoad } = useScrollRestore({
        storageKey: STORAGE_KEYS.LAST_CLICKED,
        dataAttribute: "data-ingredient",
        ready: ingredients.length > 0,
    });

    useEffect(() => {
        getIngredients().then((data) => {
            setIngredients(data);
            sessionStorage.setItem(STORAGE_KEYS.DATA_CACHE, JSON.stringify(data));
            setLoading(false);
        });
    }, []);

    // Reset pagination when search changes (but not on initial load)
    useEffect(() => {
        if (!isInitialLoad) {
            setVisibleCount(PAGE_SIZE);
        }
    }, [debouncedSearch, isInitialLoad, setVisibleCount]);

    const filtered = useMemo(
        () =>
            ingredients.filter((item) =>
                item.strIngredient.toLowerCase().includes(debouncedSearch.toLowerCase())
            ),
        [ingredients, debouncedSearch]
    );

    const hasMore = visibleCount < filtered.length;

    const { sentinelRef, observerFailed, loadCount } = useInfiniteScroll({ hasMore });

    // Sync loadCount to visibleCount
    useEffect(() => {
        if (loadCount > 0) {
            setVisibleCount((prev) => prev + PAGE_SIZE);
        }
    }, [loadCount, setVisibleCount]);

    const visible = filtered.slice(0, visibleCount);

    return (
        <PageContainer>
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    Explore Ingredients
                </h1>
                <p className="mt-2 text-gray-500">
                    Browse ingredients and discover delicious meals
                </p>
            </div>

            <StickySearch
                value={search}
                onChange={setSearch}
                placeholder="Search ingredients by name..."
            />

            {loading ? (
                <LoadingSpinner />
            ) : filtered.length === 0 ? (
                <EmptyState message={`No ingredients found for "${debouncedSearch}"`} />
            ) : (
                <>
                    <p className="mb-4 text-center text-sm text-gray-400">
                        Showing {visible.length} of {filtered.length} ingredients
                    </p>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {visible.map((item) => (
                            <IngredientCard
                                key={item.idIngredient}
                                name={item.strIngredient}
                                description={item.strDescription}
                                highlighted={item.strIngredient === highlightedValue}
                            />
                        ))}
                    </div>

                    {hasMore && (
                        <>
                            {!observerFailed && <div ref={sentinelRef} className="h-1" />}

                            {observerFailed && (
                                <div className="mt-8 flex justify-center">
                                    <button
                                        onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                                        className="rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 active:scale-95"
                                    >
                                        Load More ({filtered.length - visibleCount} remaining)
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </PageContainer>
    );
}
