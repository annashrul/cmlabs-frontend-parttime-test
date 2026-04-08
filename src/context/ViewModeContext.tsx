"use client";

import { createContext, Suspense, useCallback, useContext, useState, type ReactNode } from "react";
import { useSearchParams, usePathname } from "next/navigation";

type ViewMode = "grid" | "list";

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const STORAGE_KEY = "viewMode";

const ViewModeCtx = createContext<ViewModeContextType>({
  viewMode: "grid",
  setViewMode: () => {},
});

export function useViewMode() {
  return useContext(ViewModeCtx);
}

function getInitial(paramView: string | null): ViewMode {
  if (paramView === "list") return "list";
  if (typeof sessionStorage !== "undefined") {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "list") return "list";
  }
  return "grid";
}

function ViewModeInner({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [viewMode, setViewModeState] = useState<ViewMode>(() =>
    getInitial(searchParams.get("view"))
  );

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    sessionStorage.setItem(STORAGE_KEY, mode);
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
