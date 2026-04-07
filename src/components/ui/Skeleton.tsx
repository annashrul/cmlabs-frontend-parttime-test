interface SkeletonProps {
  className?: string;
}

function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-shimmer rounded-lg ${className}`} />
  );
}

export function SkeletonMealCard() {
  return (
    <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-2 sm:p-3 flex flex-col items-center gap-2">
        <Skeleton className="h-3.5 sm:h-4 w-3/4" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="p-3 flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
          <Skeleton className="h-20 w-20 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonCategoryGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonIngredientCard() {
  return (
    <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-2.5 sm:p-3.5 space-y-1.5">
        <Skeleton className="h-3.5 sm:h-4 w-3/4" />
        <Skeleton className="h-2.5 sm:h-3 w-full" />
      </div>
    </div>
  );
}

export function SkeletonIngredientGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm">
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="p-2.5 sm:p-3.5 space-y-1.5">
            <Skeleton className="h-3.5 sm:h-4 w-3/4" />
            <Skeleton className="h-2.5 sm:h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonIngredientList({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-gray-100 bg-white p-2 sm:p-2.5 shadow-sm">
          <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-lg sm:rounded-xl" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 sm:h-4 w-1/2" />
            <Skeleton className="h-2.5 sm:h-3 w-3/4" />
          </div>
          <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonAreaList({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 sm:h-4 w-1/3" />
            <Skeleton className="h-2.5 sm:h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonAreaGrid({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="mt-3 h-4 w-2/3" />
          <Skeleton className="mt-2 h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonMealDetail() {
  return (
    <div className="mt-4 sm:mt-6 flex flex-col md:flex-row md:gap-8">
      <div className="mb-4 sm:mb-6 md:mb-0 md:w-72 lg:w-80 md:shrink-0">
        <Skeleton className="aspect-square w-full rounded-xl sm:rounded-2xl" />
        <div className="mt-2.5 sm:mt-4 flex gap-1.5 sm:gap-2">
          <Skeleton className="h-6 sm:h-7 w-16 sm:w-20 rounded-full" />
          <Skeleton className="h-6 sm:h-7 w-16 sm:w-20 rounded-full" />
        </div>
      </div>
      <div className="flex-1 space-y-3 sm:space-y-4">
        <Skeleton className="h-6 sm:h-8 w-3/4" />
        <Skeleton className="mt-4 sm:mt-6 h-4 sm:h-5 w-28 sm:w-32" />
        <div className="space-y-1.5 sm:space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl bg-white p-2 sm:p-2.5 border border-gray-100">
              <Skeleton className="h-7 w-7 sm:h-9 sm:w-9 rounded-full shrink-0" />
              <Skeleton className="h-3.5 sm:h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
