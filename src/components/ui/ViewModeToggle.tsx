"use client";

import { LayoutGrid, List } from "lucide-react";
import { useViewMode } from "@/context/ViewModeContext";

export default function ViewModeToggle() {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className="flex shrink-0 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
      <button
        onClick={() => setViewMode("grid")}
        className={`rounded-lg p-2 transition-all duration-200 ${
          viewMode === "grid"
            ? "bg-orange-500 text-white shadow-sm"
            : "text-gray-400 hover:text-gray-600"
        }`}
        title="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`rounded-lg p-2 transition-all duration-200 ${
          viewMode === "list"
            ? "bg-orange-500 text-white shadow-sm"
            : "text-gray-400 hover:text-gray-600"
        }`}
        title="List view"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}
