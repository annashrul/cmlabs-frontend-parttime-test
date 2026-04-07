"use client";

import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/lib/api";
import { STORAGE_KEYS } from "@/lib/constants";
import { ChevronRight } from "lucide-react";

interface IngredientCardListProps {
  name: string;
  description: string | null;
  highlighted?: boolean;
}

export default function IngredientCardList({
  name,
  description,
  highlighted,
}: IngredientCardListProps) {
  const handleClick = () => {
    sessionStorage.setItem(STORAGE_KEYS.LAST_CLICKED, name);
  };

  return (
    <Link
      href={`/ingredients/${encodeURIComponent(name)}`}
      onClick={handleClick}
      data-ingredient={name}
      className={`group flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border bg-white p-2 sm:p-2.5 transition-all duration-300 hover:shadow-md hover:border-orange-200 ${
        highlighted
          ? "border-orange-500 ring-2 ring-orange-500/20 shadow-md"
          : "border-gray-100 shadow-sm"
      }`}
    >
      <div className="relative h-12 w-12 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/50">
        <Image
          src={`${IMAGE_BASE_URL}/${encodeURIComponent(name)}-Small.png`}
          alt={name}
          fill
          loading="lazy"
          className="object-contain p-1.5 sm:p-2"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 truncate">
          {name}
        </h3>
        {description && (
          <p className="mt-0.5 text-[10px] sm:text-xs text-gray-400 line-clamp-1">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0 rounded-full bg-orange-50 p-1.5 sm:p-2 md:bg-gray-50 md:group-hover:bg-orange-50 transition-colors duration-200">
        <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 md:text-gray-300 md:group-hover:text-orange-500 transition-colors duration-200" />
      </div>
    </Link>
  );
}
