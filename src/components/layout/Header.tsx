"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useHeaderSearch } from "@/context/HeaderSearchContext";
import { navLinks } from "@/data/navigation";
import { isActivePath } from "@/lib/utils";

export default function Header() {
    const { content } = useHeaderSearch();
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-xl shadow-sm">
            <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center gap-3 md:gap-4 px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 md:gap-2.5 shrink-0 group" aria-label="MealExplorer Home">
                    <Image src="/logo.svg" alt="MealExplorer Logo" width={28} height={28}
                        className="md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-base md:text-lg font-bold text-gray-900">
                        Meal<span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Explorer</span>
                    </span>
                </Link>

                <div className="flex-1 min-w-0">{content}</div>

                <nav className="hidden md:flex items-center gap-1 shrink-0" aria-label="Main navigation">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActivePath(pathname, link.href);
                        return (
                            <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${active ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"}`}>
                                <Icon className="h-4 w-4" />{link.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
