interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <p className="text-center text-gray-500 py-20">{message}</p>
  );
}
