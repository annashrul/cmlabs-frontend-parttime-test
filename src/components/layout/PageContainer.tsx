interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {children}
    </div>
  );
}
