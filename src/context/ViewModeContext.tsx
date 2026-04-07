"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ViewMode = "grid" | "list";

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeCtx = createContext<ViewModeContextType>({
  viewMode: "grid",
  setViewMode: () => {},
});

export function useViewMode() {
  return useContext(ViewModeCtx);
}

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <ViewModeCtx.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeCtx.Provider>
  );
}
