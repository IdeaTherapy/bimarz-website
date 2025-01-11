import { useState, useEffect } from "react";

type ViewportSize = "sm" | "md" | "lg" | "xl";

export const useViewportSize = (): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("sm");

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setViewportSize("xl");
      } else if (width >= 1024) {
        setViewportSize("lg");
      } else if (width >= 768) {
        setViewportSize("md");
      } else {
        setViewportSize("sm");
      }
    };

    // Initial check
    checkViewport();

    // Add event listener
    window.addEventListener("resize", checkViewport);

    // Cleanup
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return viewportSize;
};
