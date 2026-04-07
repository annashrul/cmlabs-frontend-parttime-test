import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className = "py-20" }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      <p className="text-sm text-gray-400 animate-pulse-soft">Loading...</p>
    </div>
  );
}
