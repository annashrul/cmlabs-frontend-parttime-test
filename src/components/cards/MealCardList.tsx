import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface MealCardListProps {
  id: string;
  name: string;
  thumbnail: string;
}

export default function MealCardList({ id, name, thumbnail }: MealCardListProps) {
  return (
    <Link
      href={`/meals/${id}`}
      className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-200"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
          {name}
        </h3>
        <p className="mt-1 text-xs text-gray-400">Click to see recipe</p>
      </div>
      <div className="shrink-0 rounded-full bg-gray-50 p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-orange-50">
        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500" />
      </div>
    </Link>
  );
}
