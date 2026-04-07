"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getCategories } from "@/lib/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function FoodsPage() {
    const router = useRouter();
    usePageTitle("Foods");

    useEffect(() => {
        getCategories().then((cats) => {
            if (cats.length > 0) {
                router.replace(`/foods/${encodeURIComponent(cats[0].strCategory)}`);
            }
        });
    }, [router]);

    return <LoadingSpinner className="py-32" />;
}
