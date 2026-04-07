"use client";

import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useHomeData } from "@/hooks/useHomeData";
import { UtensilsCrossed, Leaf, Globe, ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
    const { categories, ingredientCount, areaCount, loading } = useHomeData();
    usePageTitle("Home");

    if (loading) return <LoadingSpinner className="py-32" />;

    return (
        <>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-white">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-100/40 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 text-center">
                    <div className="mb-2 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-orange-100/80 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-orange-700">
                        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        MealExplorer API Website
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                        See All The{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                            Delicious Foods
                        </span>
                    </h1>
                    <p className="mx-auto mt-2 sm:mt-4 max-w-xl text-sm sm:text-base md:text-lg text-gray-500">
                        Discover recipes from around the world, explore ingredients, and cook amazing meals
                    </p>

                    <div className="mt-5 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
                        <Link href="/foods"
                            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:shadow-xl hover:scale-105">
                            <UtensilsCrossed className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            Explore Foods
                            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link href="/ingredients"
                            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-orange-200 hover:text-orange-600 hover:shadow-md">
                            <Leaf className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            Browse Ingredients
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats — half inside banner, half outside */}
            <div className="relative z-10 mx-auto max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6 -mt-10 sm:-mt-12 md:-mt-14 mb-5 sm:mb-8 md:mb-10">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5">
                    <Link href="/foods" className="group flex flex-col items-center rounded-xl md:rounded-2xl bg-white p-2.5 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-100 transition-all duration-200 hover:shadow-xl hover:border-orange-200 hover:-translate-y-0.5">
                        <div className="rounded-full bg-orange-50 p-1.5 sm:p-2 md:p-3 mb-1 sm:mb-2 md:mb-3 group-hover:bg-orange-100 transition-colors">
                            <UtensilsCrossed className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-6 md:w-6 text-orange-500" />
                        </div>
                        <span className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-gray-900">
                            {categories.length > 0 ? categories.length.toString() : "..."}
                        </span>
                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">Food Categories</span>
                    </Link>
                    <Link href="/ingredients" className="group flex flex-col items-center rounded-xl md:rounded-2xl bg-white p-2.5 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-100 transition-all duration-200 hover:shadow-xl hover:border-orange-200 hover:-translate-y-0.5">
                        <div className="rounded-full bg-orange-50 p-1.5 sm:p-2 md:p-3 mb-1 sm:mb-2 md:mb-3 group-hover:bg-orange-100 transition-colors">
                            <Leaf className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-6 md:w-6 text-orange-500" />
                        </div>
                        <span className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-gray-900">{ingredientCount || "..."}</span>
                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">Ingredients</span>
                    </Link>
                    <Link href="/local-culinary" className="group flex flex-col items-center rounded-xl md:rounded-2xl bg-white p-2.5 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-100 transition-all duration-200 hover:shadow-xl hover:border-orange-200 hover:-translate-y-0.5">
                        <div className="rounded-full bg-orange-50 p-1.5 sm:p-2 md:p-3 mb-1 sm:mb-2 md:mb-3 group-hover:bg-orange-100 transition-colors">
                            <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-6 md:w-6 text-orange-500" />
                        </div>
                        <span className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-gray-900">{areaCount || "..."}</span>
                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">Cuisines</span>
                    </Link>
                </div>
            </div>

            <PageContainer>
                {/* Featured Categories */}
                <div className="mb-4 sm:mb-6 flex items-center justify-between">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Popular Categories</h2>
                    <Link href="/foods"
                        className="group inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                        View All
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 sm:grid-cols-4">
                    {categories.map((cat) => (
                        <Link key={cat.idCategory} href={`/foods/${encodeURIComponent(cat.strCategory)}`}
                            className="group overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-200">
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <Image src={cat.strCategoryThumb} alt={cat.strCategory} fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 640px) 50vw, 25vw" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-xs sm:text-sm font-semibold text-white">
                                    {cat.strCategory}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </PageContainer>
        </>
    );
}
