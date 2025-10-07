import { MutableRefObject, useEffect, useState } from 'react';

interface Options {
  scrollTo: MutableRefObject<any>;
  element?: Element;
  margin?: number;
}

export function useScrollTo(options: Options): void {
  const { scrollTo, margin = 0, element } = options;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!scrolled) {
      const top = scrollTo?.current?.offsetTop;
      const clientHeight = element ? element.clientHeight : 0;

      window.scroll({
        top: top - clientHeight - margin,
        left: 0,
        behavior: 'smooth'
      });
      setScrolled(true);
    }
  }, [scrollTo, margin, element, scrolled]);
}
