"use client";

import { useState } from "react";
import Link from "next/link";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAreasList } from "@/hooks/useAreasList";
import PageContainer from "@/components/layout/PageContainer";
import { SkeletonAreaGrid } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import SearchInput from "@/components/ui/SearchInput";
import BottomSheet from "@/components/ui/BottomSheet";
import { AREA_FLAGS, REGIONS } from "@/data/areas";
import { Globe, ArrowRight, MapPin, Filter, SlidersHorizontal } from "lucide-react";

export default function LocalCulinaryPage() {
    const { areas, loading, search, setSearch, activeRegion, setActiveRegion, filtered } = useAreasList();
    const [sheetOpen, setSheetOpen] = useState(false);
    usePageTitle("Local Culinary");

    const handleRegionSelect = (label: string) => {
        setActiveRegion(label);
        setSheetOpen(false);
    };

    return (
        <PageContainer>
            <div className="mb-6 md:mb-10 text-center">
                <div className="mb-2 md:mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium text-orange-600">
                    <Globe className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    World Cuisines
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    Local Culinary
                </h1>
                <p className="mt-1.5 md:mt-2 text-sm md:text-base text-gray-500 max-w-md mx-auto">
                    Explore authentic dishes from different countries and cultures
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Desktop sidebar */}
                <aside className="hidden lg:block lg:w-56 lg:shrink-0 pt-2">
                    <div className="lg:sticky lg:top-[4.5rem]">
                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-semibold text-gray-800">Region</span>
                            </div>
                            <nav className="flex flex-col gap-1">
                                {REGIONS.map((region) => (
                                    <button key={region.label} onClick={() => setActiveRegion(region.label)}
                                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-left ${
                                            activeRegion === region.label
                                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                        }`}>
                                        <span>{region.icon}</span>
                                        {region.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="mt-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm">
                            <p className="text-3xl font-bold text-orange-600">{areas.length}</p>
                            <p className="text-sm text-gray-500 mt-1">Cuisines from around the world</p>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    <div className="sticky top-14 md:top-16 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0 py-2 mb-2 sm:mb-3 md:mb-4 bg-[var(--background)] flex items-center gap-2 md:gap-3">
                        <button onClick={() => setSheetOpen(true)}
                            className="lg:hidden relative shrink-0 h-10 sm:h-11 w-10 sm:w-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm text-gray-500 hover:text-orange-600 transition-colors">
                            <SlidersHorizontal className="h-4 w-4" />
                            {activeRegion !== "All" && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
                            )}
                        </button>
                        <div className="flex-1">
                            <SearchInput value={search} onChange={setSearch} placeholder="Search cuisines by country..." />
                        </div>
                    </div>

                    {loading ? (
                        <SkeletonAreaGrid />
                    ) : filtered.length === 0 ? (
                        <EmptyState message={search ? `No cuisines found for "${search}"` : `No cuisines in "${activeRegion}"`} onReset={search ? () => { setSearch(""); } : undefined} />
                    ) : (
                        <>
                            <p className="mb-3 md:mb-5 text-xs md:text-sm text-gray-400">
                                Showing <span className="font-medium text-gray-500">{filtered.length}</span> cuisine{filtered.length !== 1 ? "s" : ""}
                            </p>
                            <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
                                {filtered.map((area) => (
                                    <Link key={area.strArea} href={`/local-culinary/${encodeURIComponent(area.strArea)}`}
                                        className="group relative flex flex-col items-center rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-200">
                                        <span className="text-3xl md:text-5xl mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-110" role="img" aria-label={area.strArea}>
                                            {AREA_FLAGS[area.strArea] || "🌍"}
                                        </span>
                                        <h3 className="text-xs md:text-sm font-bold text-gray-800 text-center group-hover:text-orange-600 transition-colors duration-200">
                                            {area.strArea}
                                        </h3>
                                        <div className="mt-1 md:mt-2 inline-flex items-center gap-1 text-[10px] md:text-xs text-gray-400">
                                            <MapPin className="h-2.5 w-2.5 md:h-3 md:w-3" />
                                            Cuisine
                                        </div>
                                        <div className="hidden md:block mt-3 rounded-full bg-white/80 px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-sm">
                                            <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
                                                Explore <ArrowRight className="h-3 w-3" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Filter by Region">
                <div className="flex flex-col gap-1">
                    {REGIONS.map((region) => (
                        <button key={region.label} onClick={() => handleRegionSelect(region.label)}
                            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                                activeRegion === region.label
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                                    : "text-gray-600 hover:bg-orange-50"
                            }`}>
                            <span className="text-lg">{region.icon}</span>
                            {region.label}
                        </button>
                    ))}
                </div>
            </BottomSheet>
        </PageContainer>
    );
}
