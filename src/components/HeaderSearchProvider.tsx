"use client";

import { useState } from "react";
import { HeaderSearchContext } from "./Header";

export default function HeaderSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<React.ReactNode | null>(null);

  return (
    <HeaderSearchContext.Provider value={{ content, setContent }}>
      {children}
    </HeaderSearchContext.Provider>
  );
}
