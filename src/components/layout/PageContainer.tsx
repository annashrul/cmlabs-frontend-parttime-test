interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 md:py-8">
      {children}
    </div>
  );
}
