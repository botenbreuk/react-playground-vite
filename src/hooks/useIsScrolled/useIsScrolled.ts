import { useEffect, useState } from 'react';

type UseIsScrolledOptions = {
  scrollLimit?: number;
};

export default function useIsScrolled(options?: UseIsScrolledOptions) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const listener = () => {
      setIsScrolled(window.scrollY > (options?.scrollLimit || 300));
    };

    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return isScrolled;
}
