import { useEffect, useState } from "react";

/**
 * Returns the current number of grid columns based on window width.
 * Matches: cols-2 / sm:cols-3 / md:cols-4 / lg:cols-4 / xl:cols-5
 */
export function useGridColumns() {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setColumns(5);       // xl
      else if (w >= 768) setColumns(4);   // md & lg
      else if (w >= 640) setColumns(3);   // sm
      else setColumns(2);                 // default
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}
