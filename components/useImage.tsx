import { useEffect, useRef, useState } from "react";

export const useImage = (src: string): HTMLImageElement | null => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image(); // Create new img element
    img.addEventListener(
      "load",
      () => {
        setLoaded(true);
        // execute drawImage statements here
        imgRef.current = img;
      },
      false
    );
    img.src = src; // Set source path
  }, [src]);

  return loaded ? imgRef.current : null;
};
