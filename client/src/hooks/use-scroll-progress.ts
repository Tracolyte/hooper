// ───────────────────────────────────────────────────────────────────────────────
// File: src/hooks/use-scroll-progress.ts
//                                                                           
// Hook that returns 0 when the target element is fully visible and 1 once it
// has scrolled completely past the viewport.                                 
// ───────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

export const useScrollProgress = (selector: string) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.querySelector(selector);
    if (!target) return;

    const handler = () => {
      const rect = target.getBoundingClientRect();
      const winH = window.innerHeight || 1;
      // When rect.bottom == winH  → 0  |  rect.top == -rect.height  → 1
      const value = 1 - rect.bottom / (rect.height + winH);
      setProgress(Math.min(Math.max(value, 0), 1));
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler(); // initial run
    return () => window.removeEventListener("scroll", handler);
  }, [selector]);

  return progress;
};
