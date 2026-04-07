"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useHeaderSearch } from "@/context/HeaderSearchContext";
import { navLinks } from "@/data/navigation";

export default function Header() {
    const { content } = useHeaderSearch();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-xl shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                    <Image
                        src="/logo.svg"
                        alt="MealExplorer Logo"
                        width={32}
                        height={32}
                        className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-lg font-bold text-gray-900">
                        Meal<span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Explorer</span>
                    </span>
                </Link>

                <div className="flex-1 min-w-0">{content}</div>

                <nav className="hidden md:flex items-center gap-1 shrink-0">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                            <Link key={link.href} href={link.href}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${active ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"}`}>
                                <Icon className="h-4 w-4" />{link.label}
                            </Link>
                        );
                    })}
                </nav>

                <button onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden shrink-0 rounded-lg p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors">
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {mobileOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
                    <nav className="mx-auto max-w-7xl px-4 py-3 space-y-1 sm:px-6">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);
                            return (
                                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"}`}>
                                    <Icon className="h-4 w-4" />{link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}
