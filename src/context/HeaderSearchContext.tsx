"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type HeaderSearchContent = ReactNode | null;

interface HeaderSearchContextType {
  content: HeaderSearchContent;
  setContent: (content: HeaderSearchContent) => void;
}

const HeaderSearchCtx = createContext<HeaderSearchContextType>({
  content: null,
  setContent: () => {},
});

export function useHeaderSearch() {
  return useContext(HeaderSearchCtx);
}

export function HeaderSearchProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<HeaderSearchContent>(null);

  return (
    <HeaderSearchCtx.Provider value={{ content, setContent }}>
      {children}
    </HeaderSearchCtx.Provider>
  );
}
