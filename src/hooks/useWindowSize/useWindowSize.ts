import { useLayoutEffect, useState } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<number>();

  function updateWindowDimensions() {
    setWindowSize(document.documentElement.clientWidth);
  }

  useLayoutEffect(() => {
    if (!windowSize) {
      updateWindowDimensions();
    } else {
      window.addEventListener('resize', updateWindowDimensions);
    }

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [windowSize]);

  return windowSize || 0;
}
