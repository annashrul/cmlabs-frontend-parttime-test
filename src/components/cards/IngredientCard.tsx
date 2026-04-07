"use client";

import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/lib/api";
import { STORAGE_KEYS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

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
      className={`group relative flex flex-col items-center rounded-2xl border bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-200 ${
        highlighted
          ? "border-orange-500 ring-2 ring-orange-500/20 shadow-lg"
          : "border-gray-100 shadow-sm"
      }`}
    >
      <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-orange-50 to-amber-50 p-2 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={`${IMAGE_BASE_URL}/${encodeURIComponent(name)}-Small.png`}
          alt={name}
          fill
          loading="lazy"
          className="object-contain p-1"
          sizes="80px"
        />
      </div>
      <h3 className="text-sm font-semibold text-gray-800 text-center group-hover:text-orange-600 transition-colors duration-200">
        {name}
      </h3>
      {description && (
        <p className="mt-1 text-xs text-gray-400 text-center line-clamp-2">
          {description}
        </p>
      )}
      <ArrowRight className="mt-2 h-4 w-4 text-gray-300 transition-all duration-300 group-hover:text-orange-500 group-hover:translate-x-1 opacity-0 group-hover:opacity-100" />
    </Link>
  );
}
