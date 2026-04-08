import Link from "next/link";
import Image from "next/image";
import { Heart, ExternalLink, UtensilsCrossed, Leaf, Globe, Home } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/foods", label: "Foods", icon: UtensilsCrossed },
  { href: "/ingredients", label: "Ingredients", icon: Leaf },
  { href: "/local-culinary", label: "Local Culinary", icon: Globe },
];

export default function Footer() {
  return (
    <footer className="hidden md:block border-t border-gray-100 bg-gradient-to-b from-white to-orange-50/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="MealExplorer Logo" width={28} height={28} />
              <span className="text-lg font-bold text-gray-900">
                Meal<span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Explorer</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Discover recipes from around the world. Search by ingredients, categories, or cuisine.
            </p>
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

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.themealdb.com/api.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-600 transition-colors"
                >
                  API Documentation
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/annashrul/cmlabs-frontend-parttime-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-600 transition-colors"
                >
                  Source Code
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} MealExplorer. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-400">
            Made with <Heart className="h-3 w-3 text-red-400 fill-red-400" /> for cmlabs
          </p>
        </div>
      </div>
    </footer>
  );
}
