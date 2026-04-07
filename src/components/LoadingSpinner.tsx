interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className = "py-20" }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
    </div>
  );
}
