"use client";

import Link from "next/link";
import Image from "next/image";
import { createContext, useContext } from "react";

type HeaderSearchContent = React.ReactNode | null;

export const HeaderSearchContext = createContext<{
    content: HeaderSearchContent;
    setContent: (content: HeaderSearchContent) => void;
}>({ content: null, setContent: () => { } });

export function useHeaderSearch() {
    return useContext(HeaderSearchContext);
}

export default function Header() {
    const { content } = useHeaderSearch();

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Image
                        src="/logo.svg"
                        alt="MealExplorer Logo"
                        width={32}
                        height={32}
                    />
                    <span className="text-lg font-bold text-gray-900">
                        Meal<span className="text-orange-500">Explorer</span>
                    </span>
                </Link>

                {/* Middle: search slot or spacer */}
                <div className="flex-1 min-w-0">
                    {content}
                </div>

                <nav className="shrink-0">
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
