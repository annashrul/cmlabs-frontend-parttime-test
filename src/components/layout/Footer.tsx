import { Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <span>MealExplorer</span>
            <span className="text-gray-300">&mdash;</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" />
            </span>
          </div>
          <a
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 hover:bg-orange-100 transition-colors"
          >
            Powered by TheMealDB
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
