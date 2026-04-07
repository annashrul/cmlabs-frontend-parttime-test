"use client";

import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/lib/api";
import { STORAGE_KEYS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

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
      className={`group flex items-center gap-4 rounded-2xl border bg-white p-3 transition-all duration-300 hover:shadow-md hover:border-orange-200 ${
        highlighted
          ? "border-orange-500 ring-2 ring-orange-500/20 shadow-md"
          : "border-gray-100 shadow-sm"
      }`}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-orange-50 to-amber-50 p-1">
        <Image
          src={`${IMAGE_BASE_URL}/${encodeURIComponent(name)}-Small.png`}
          alt={name}
          fill
          loading="lazy"
          className="object-contain p-1"
          sizes="56px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
          {name}
        </h3>
        {description && (
          <p className="mt-0.5 text-xs text-gray-400 line-clamp-1">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0 rounded-full bg-gray-50 p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-orange-50">
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500" />
      </div>
    </Link>
  );
}
