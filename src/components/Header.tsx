import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="text-lg font-bold text-gray-900">
            Meal<span className="text-orange-500">Explorer</span>
          </span>
        </Link>
        <nav>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 transition"
          >
            Ingredients
          </Link>
        </nav>
      </div>
    </header>
  );
}
