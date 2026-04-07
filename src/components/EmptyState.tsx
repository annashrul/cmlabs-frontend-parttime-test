import Image from "next/image";

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <Image
        src="/not-found.svg"
        alt="Not found"
        width={120}
        height={120}
      />
      <p className="mt-6 text-lg font-medium text-gray-600">{message}</p>
      <p className="mt-1 text-sm text-gray-400">
        Try a different keyword or clear your search
      </p>
    </div>
  );
}
