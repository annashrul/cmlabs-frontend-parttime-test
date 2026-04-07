"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";
import { isActivePath } from "@/lib/utils";

export default function BottomBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
            <div className="flex items-center justify-around px-2 py-1.5 safe-area-bottom">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActivePath(pathname, link.href);
                    return (
                        <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined}
                            className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors ${active ? "text-orange-600" : "text-gray-400"}`}>
                            <Icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
                            <span className="text-[10px] font-medium leading-tight">{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
