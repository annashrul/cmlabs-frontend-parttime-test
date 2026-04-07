"use client";

import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/lib/api";
import { STORAGE_KEYS } from "@/lib/constants";
import { ChevronRight } from "lucide-react";

interface IngredientCardProps {
  name: string;
  description: string | null;
  highlighted?: boolean;
}

export default function IngredientCard({
  name,
  description,
  highlighted,
}: IngredientCardProps) {
  const handleClick = () => {
    sessionStorage.setItem(STORAGE_KEYS.LAST_CLICKED, name);
  };

  return (
    <Link
      href={`/ingredients/${encodeURIComponent(name)}`}
      onClick={handleClick}
      data-ingredient={name}
      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-200 ${
        highlighted
          ? "border-orange-500 ring-2 ring-orange-500/20 shadow-lg"
          : "border-gray-100 shadow-sm"
      }`}
    >
      {/* Image area */}
      <div className="relative aspect-square w-full bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/50 p-4 sm:p-6">
        <Image
          src={`${IMAGE_BASE_URL}/${encodeURIComponent(name)}-Small.png`}
          alt={name}
          fill
          loading="lazy"
          className="object-contain p-3 sm:p-5 transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
      </div>

      {/* Text area */}
      <div className="p-2.5 sm:p-3.5">
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 truncate">
            {name}
          </h3>
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-orange-400 md:text-gray-300 md:group-hover:text-orange-500 md:group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
        {description && (
          <p className="mt-0.5 text-[10px] sm:text-xs text-gray-400 line-clamp-1">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
