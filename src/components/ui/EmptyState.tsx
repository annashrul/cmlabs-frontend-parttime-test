import { Search, FolderOpen, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  message: string;
  onReset?: () => void;
  resetLabel?: string;
}

export default function EmptyState({ message, onReset, resetLabel = "Reset search" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-14 md:py-20 px-4 animate-fade-in-up">
      {/* Stacked circles illustration */}
      <div className="relative mb-4 sm:mb-6 md:mb-8">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-orange-200/30 blur-xl scale-150" />

        {/* Main circle */}
        <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36 items-center justify-center rounded-full bg-gradient-to-br from-orange-50 to-amber-100/60">
          {/* Inner circle */}
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <FolderOpen className="h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9 text-orange-400 stroke-[1.5]" />
          </div>
        </div>

        {/* Floating search badge */}
        <div className="absolute -top-1 -right-1 sm:top-0 sm:right-0 flex h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-100/80">
          <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-orange-500" />
        </div>

        {/* Small decorative dot */}
        <div className="absolute bottom-1 -left-2 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-orange-200/60" />
        <div className="absolute top-4 -left-3 h-2 w-2 rounded-full bg-amber-200/50" />
      </div>

      {/* Text */}
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 text-center max-w-xs sm:max-w-sm leading-snug">
        {message}
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-gray-400 text-center max-w-[260px] sm:max-w-xs">
        Try adjusting your search or filter to find what you&apos;re looking for
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          {resetLabel}
        </button>
      )}
    </div>
  );
}
