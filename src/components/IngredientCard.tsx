"use client";

import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/lib/api";
import { STORAGE_KEYS } from "@/lib/constants";

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
      className={`group flex flex-col items-center rounded-xl border-2 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-orange-300 ${
        highlighted
          ? "border-orange-500 ring-2 ring-orange-500/30 shadow-md"
          : "border-gray-200"
      }`}
    >
      <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full bg-orange-50 p-2">
        <Image
          src={`${IMAGE_BASE_URL}/${encodeURIComponent(name)}-Small.png`}
          alt={name}
          fill
          loading="lazy"
          className="object-contain p-1"
          sizes="80px"
        />
      </div>
      <h3 className="text-sm font-semibold text-gray-800 text-center group-hover:text-orange-600 transition">
        {name}
      </h3>
      {description && (
        <p className="mt-1 text-xs text-gray-500 text-center line-clamp-2">
          {description}
        </p>
      )}
    </Link>
  );
}
