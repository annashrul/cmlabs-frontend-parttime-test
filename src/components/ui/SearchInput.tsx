"use client";

import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  onFocus,
  onBlur,
}: SearchInputProps) {
  return (
    <div className="relative w-full group">
      <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 transition-colors group-focus-within:text-orange-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full h-10 sm:h-11 rounded-xl border border-gray-200 bg-white pl-9 sm:pl-10 pr-9 sm:pr-10 text-xs sm:text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:shadow-md hover:border-gray-300"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      )}
    </div>
  );
}
