import { useEffect, useState } from "react";

// Adapted from https://usehooks.com/useWindowSize/
export function useWindowSize(): {
  width: number | undefined;
  height: number | undefined;
} {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

    // Empty array ensures that effect is only run on mount and unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
}
