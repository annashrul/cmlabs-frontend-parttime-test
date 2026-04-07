"use client";

import { createContext, Suspense, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useSearchParams, usePathname } from "next/navigation";

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

function ViewModeInner({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const paramView = searchParams.get("view");
  const initial: ViewMode = paramView === "list" ? "list" : "grid";

  const [viewMode, setViewModeState] = useState<ViewMode>(initial);

  useEffect(() => {
    const v = searchParams.get("view");
    setViewModeState(v === "list" ? "list" : "grid");
  }, [searchParams]);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    const params = new URLSearchParams(searchParams.toString());
    if (mode === "grid") {
      params.delete("view");
    } else {
      params.set("view", mode);
    }
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }, [searchParams, pathname]);

  return (
    <ViewModeCtx.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeCtx.Provider>
  );
}

export function ViewModeProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <ViewModeInner>{children}</ViewModeInner>
    </Suspense>
  );
}
