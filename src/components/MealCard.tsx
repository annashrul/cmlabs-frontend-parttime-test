import Link from "next/link";
import Image from "next/image";

interface MealCardProps {
  id: string;
  name: string;
  thumbnail: string;
}

export default function MealCard({ id, name, thumbnail }: MealCardProps) {
  return (
    <Link
      href={`/meals/${id}`}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md hover:border-orange-300"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 text-center group-hover:text-orange-600 transition line-clamp-2">
          {name}
        </h3>
      </div>
    </Link>
  );
}
