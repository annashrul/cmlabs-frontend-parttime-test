import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-500">
      <Link href="/" className="hover:text-orange-500 transition-colors p-0.5 sm:p-1 rounded-md hover:bg-orange-50">
        <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 sm:gap-1.5 min-w-0">
          <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-300 shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-orange-500 transition-colors truncate"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium truncate">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
