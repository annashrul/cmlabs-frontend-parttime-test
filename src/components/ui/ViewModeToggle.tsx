"use client";

import { LayoutGrid, List } from "lucide-react";
import { useViewMode } from "@/context/ViewModeContext";

export default function ViewModeToggle() {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className="flex shrink-0 h-10 sm:h-11 items-center rounded-xl border border-gray-200 bg-white p-1 shadow-sm" role="group" aria-label="View mode">
      <button
        onClick={() => setViewMode("grid")}
        aria-label="Grid view"
        aria-pressed={viewMode === "grid"}
        className={`rounded-lg p-2 transition-all duration-200 ${
          viewMode === "grid"
            ? "bg-orange-500 text-white shadow-sm"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
      <button
        onClick={() => setViewMode("list")}
        aria-label="List view"
        aria-pressed={viewMode === "list"}
        className={`rounded-lg p-2 transition-all duration-200 ${
          viewMode === "list"
            ? "bg-orange-500 text-white shadow-sm"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}
