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
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-orange-200"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-sm">
          <ArrowUpRight className="h-3.5 w-3.5 text-orange-600" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 text-center group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
          {name}
        </h3>
      </div>
    </Link>
  );
}
