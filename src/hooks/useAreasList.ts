import { useEffect, useState, useMemo } from "react";
import { getAreas } from "@/lib/api";
import type { Area } from "@/lib/types";
import { useSearchWithParams } from "./useSearchWithParams";
import { REGIONS } from "@/data/areas";

export function useAreasList() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState("All");

  const { value: search, setValue: setSearch, debouncedValue: debouncedSearch } = useSearchWithParams();

  useEffect(() => {
    getAreas()
      .then(setAreas)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = areas;
    if (activeRegion !== "All") {
      const region = REGIONS.find((r) => r.label === activeRegion);
      if (region && region.countries.length > 0) {
        result = result.filter((area) => region.countries.includes(area.strArea));
      }
    }
    if (debouncedSearch) {
      result = result.filter((area) =>
        area.strArea.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    return result;
  }, [areas, debouncedSearch, activeRegion]);

  return {
    areas,
    loading,
    search,
    setSearch,
    activeRegion,
    setActiveRegion,
    filtered,
    debouncedSearch,
  };
}
