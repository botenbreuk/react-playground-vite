import { useLayoutEffect, useState } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<number>();

  useLayoutEffect(() => {
    if (!windowSize) {
      setWindowSize(document.documentElement.clientWidth);
    } else {
      window.addEventListener('resize', updateWindowDimensions);
    }

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [windowSize]);

  function updateWindowDimensions() {
    setWindowSize(document.documentElement.clientWidth);
  }

  return windowSize || 0;
}
