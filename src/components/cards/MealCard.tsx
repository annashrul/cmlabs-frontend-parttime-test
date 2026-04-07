import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface MealCardProps {
  id: string;
  name: string;
  thumbnail: string;
}

export default function MealCard({ id, name, thumbnail }: MealCardProps) {
  return (
    <Link
      href={`/meals/${id}`}
      className="group overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-200"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
        {/* Always visible on mobile, hover on desktop */}
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 rounded-full bg-white/90 p-1 sm:p-1.5 shadow-sm md:opacity-0 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-600" />
        </div>
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 text-center group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
          {name}
        </h3>
      </div>
    </Link>
  );
}
