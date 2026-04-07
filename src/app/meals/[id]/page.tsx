"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useMealDetail } from "@/hooks/useMealDetail";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SkeletonMealDetail } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import PageContainer from "@/components/layout/PageContainer";
import { Tag, Globe, Hash, ListChecks, ScrollText, Play, ExternalLink } from "lucide-react";

export default function MealDetailPage() {
    const params = useParams();
    const mealId = params.id as string;

    const { meal, loading, ingredients, youtubeEmbedUrl } = useMealDetail(mealId);
    usePageTitle(meal?.strMeal || "Meal Detail");

    if (loading) {
        return <PageContainer><SkeletonMealDetail /></PageContainer>;
    }

    if (!meal) {
        return (
            <PageContainer>
                <EmptyState message="Meal not found." />
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Breadcrumb
                items={[
                    { label: "Foods", href: "/foods" },
                    { label: meal.strMeal },
                ]}
            />

            <div className="mt-4 sm:mt-6 flex flex-col md:flex-row md:gap-8">
                {/* Left: Meal Image */}
                <div className="mb-4 sm:mb-6 md:mb-0 md:w-72 lg:w-80 md:shrink-0">
                    <div className="md:sticky md:top-[4.5rem]">
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg ring-1 ring-black/5">
                            <Image
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 320px"
                                priority
                            />
                        </div>
                        <div className="mt-2.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                            {meal.strCategory && (
                                <Link href={`/foods/${encodeURIComponent(meal.strCategory)}`}
                                    className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-orange-50 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-orange-700 ring-1 ring-orange-200/50 hover:bg-orange-100 hover:ring-orange-300/50 transition-colors">
                                    <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                    {meal.strCategory}
                                </Link>
                            )}
                            {meal.strArea && (
                                <Link href={`/local-culinary/${encodeURIComponent(meal.strArea)}`}
                                    className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-amber-50 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-amber-700 ring-1 ring-amber-200/50 hover:bg-amber-100 hover:ring-amber-300/50 transition-colors">
                                    <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                    {meal.strArea}
                                </Link>
                            )}
                            {meal.strTags && meal.strTags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag, i) => (
                                <Link key={`${tag}-${i}`} href={`/ingredients/${encodeURIComponent(tag)}`}
                                    className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-gray-50 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-gray-600 ring-1 ring-gray-200/50 hover:bg-gray-100 hover:ring-gray-300/50 hover:text-gray-800 transition-colors">
                                    <Hash className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Meal details */}
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{meal.strMeal}</h1>

                    {/* Ingredients */}
                    <div className="mt-5 sm:mt-8">
                        <h2 className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                            <ListChecks className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                            Ingredients
                        </h2>
                        <ul className="mt-2.5 sm:mt-4 space-y-1.5 sm:space-y-2">
                            {ingredients.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl bg-white p-2 sm:p-2.5 border border-gray-100 transition-colors hover:border-orange-100 hover:bg-orange-50/30"
                                >
                                    <div className="relative h-7 w-7 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-orange-50 to-amber-50">
                                        <Image
                                            src={`${IMAGE_BASE_URL}/${encodeURIComponent(item.ingredient)}-Small.png`}
                                            alt={item.ingredient}
                                            fill
                                            className="object-contain p-0.5"
                                            sizes="36px"
                                        />
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">{item.measure}</span>{" "}
                                        {item.ingredient}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 sm:mt-12">
                <h2 className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                    <ScrollText className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                    Instructions
                </h2>
                <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
                    {meal.strInstructions
                        .split(/\r?\n/)
                        .filter((p) => p.trim())
                        .map((paragraph, i) => (
                            <p key={i} className="text-xs sm:text-sm leading-relaxed text-gray-700">
                                {paragraph}
                            </p>
                        ))}
                </div>
            </div>

            {/* YouTube Video */}
            {youtubeEmbedUrl && (
                <div className="mt-8 sm:mt-12">
                    <h2 className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                        <Play className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                        Video Tutorial
                    </h2>
                    <div className="mt-3 sm:mt-4 aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg ring-1 ring-black/5">
                        <iframe
                            src={youtubeEmbedUrl}
                            title={`${meal.strMeal} video`}
                            className="h-full w-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                    </div>
                </div>
            )}

            {meal.strYoutube && !youtubeEmbedUrl && (
                <div className="mt-8 sm:mt-12">
                    <h2 className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                        <Play className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                        Video Tutorial
                    </h2>
                    <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-red-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200"
                    >
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Watch on YouTube
                    </a>
                </div>
            )}
        </PageContainer>
    );
}
