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
      className="group flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-gray-100 bg-white p-2 sm:p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-200"
    >
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg sm:rounded-xl">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
          {name}
        </h3>
        <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-400">Click to see recipe</p>
      </div>
      <div className="shrink-0 rounded-full bg-orange-50 p-1.5 sm:p-2 md:bg-gray-50 md:opacity-0 md:group-hover:opacity-100 md:group-hover:bg-orange-50 transition-all duration-200">
        <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 md:text-gray-400 md:group-hover:text-orange-500" />
      </div>
    </Link>
  );
}
