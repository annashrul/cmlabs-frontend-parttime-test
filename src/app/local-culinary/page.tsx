"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getAreas, Area } from "@/lib/api";
import PageContainer from "@/components/layout/PageContainer";
import { SkeletonAreaGrid } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import SearchInput from "@/components/ui/SearchInput";
import { AREA_FLAGS, REGIONS } from "@/data/areas";
import { Globe, ArrowRight, MapPin, Filter } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";





export default function LocalCulinaryPage() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeRegion, setActiveRegion] = useState("All");
    const debouncedSearch = useDebounce(search);

    useEffect(() => {
        getAreas()
            .then(setAreas)
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        let result = areas;
        if (activeRegion !== "All") {
            const region = REGIONS.find((r) => r.label === activeRegion);
            if (region && region.countries.length > 0) {
                result = result.filter((area) => region.countries.includes(area.strArea));
            }
        }
        if (debouncedSearch) {
            result = result.filter((area) =>
                area.strArea.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }
        return result;
    }, [areas, debouncedSearch, activeRegion]);

    return (
        <PageContainer>
            <div className="mb-10 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
                    <Globe className="h-4 w-4" />
                    World Cuisines
                </div>
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">
                    Local Culinary
                </h1>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                    Explore authentic dishes from different countries and cultures around the world
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Sidebar: Region filter */}
                <aside className="lg:w-56 lg:shrink-0 mb-6 lg:mb-0">
                    <div className="lg:sticky lg:top-20">
                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-semibold text-gray-800">Region</span>
                            </div>

                            {/* Mobile: horizontal scroll */}
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
                                {REGIONS.map((region) => (
                                    <button
                                        key={region.label}
                                        onClick={() => setActiveRegion(region.label)}
                                        className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                                            activeRegion === region.label
                                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                : "bg-gray-50 text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                        }`}
                                    >
                                        <span>{region.icon}</span>
                                        {region.label}
                                    </button>
                                ))}
                            </div>

                            {/* Desktop: vertical list */}
                            <nav className="hidden lg:flex flex-col gap-1">
                                {REGIONS.map((region) => (
                                    <button
                                        key={region.label}
                                        onClick={() => setActiveRegion(region.label)}
                                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-left ${
                                            activeRegion === region.label
                                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                                                : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                        }`}
                                    >
                                        <span>{region.icon}</span>
                                        {region.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Stats card (desktop) */}
                        <div className="hidden lg:block mt-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm">
                            <p className="text-3xl font-bold text-orange-600">{areas.length}</p>
                            <p className="text-sm text-gray-500 mt-1">Cuisines from around the world</p>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    <div className="mb-6">
                        <SearchInput
                            value={search}
                            onChange={setSearch}
                            placeholder="Search cuisines by country..."
                        />
                    </div>

                    {loading ? (
                        <SkeletonAreaGrid />
                    ) : filtered.length === 0 ? (
                        <EmptyState message={debouncedSearch ? `No cuisines found for "${debouncedSearch}"` : `No cuisines in "${activeRegion}"`} />
                    ) : (
                        <>
                            <p className="mb-5 text-sm text-gray-400">
                                Showing <span className="font-medium text-gray-500">{filtered.length}</span> cuisine{filtered.length !== 1 ? "s" : ""}
                            </p>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
                                {filtered.map((area) => (
                                    <Link
                                        key={area.strArea}
                                        href={`/local-culinary/${encodeURIComponent(area.strArea)}`}
                                        className="group relative flex flex-col items-center rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-amber-50 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-200"
                                    >
                                        <span className="text-5xl mb-3 transition-transform duration-300 group-hover:scale-110" role="img" aria-label={area.strArea}>
                                            {AREA_FLAGS[area.strArea] || "🌍"}
                                        </span>
                                        <h3 className="text-sm font-bold text-gray-800 text-center group-hover:text-orange-600 transition-colors duration-200">
                                            {area.strArea}
                                        </h3>
                                            <div className="mt-2 inline-flex items-center gap-1 text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                                                <MapPin className="h-3 w-3" />
                                                Cuisine
                                            </div>
                                            <div className="mt-3 rounded-full bg-white/80 px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-sm">
                                                <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
                                                    Explore
                                                    <ArrowRight className="h-3 w-3" />
                                                </span>
                                            </div>
                                        </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </PageContainer>
    );
}
