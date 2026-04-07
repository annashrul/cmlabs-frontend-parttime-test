import Image from "next/image";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in-up">
      <div className="relative">
        <Image
          src="/not-found.svg"
          alt="Not found"
          width={120}
          height={120}
          className="opacity-80"
        />
        <div className="absolute -bottom-1 -right-1 rounded-full bg-orange-100 p-2">
          <SearchX className="h-5 w-5 text-orange-500" />
        </div>
      </div>
      <p className="mt-6 text-lg font-semibold text-gray-700">{message}</p>
      <p className="mt-1.5 text-sm text-gray-400">
        Try a different keyword or clear your search
      </p>
    </div>
  );
}
