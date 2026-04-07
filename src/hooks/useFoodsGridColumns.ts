import { useEffect, useState } from "react";

/**
 * Returns current column count for foods grid.
 * Matches: cols-2 / md:cols-3
 */
export function useFoodsGridColumns() {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const update = () => {
      setColumns(window.innerWidth >= 768 ? 3 : 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}
