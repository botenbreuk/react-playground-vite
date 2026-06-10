import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current = value;
  });
  // eslint-disable-next-line react-hooks/refs -- standard usePrevious pattern: reading ref during render is intentional to return the previous value
  return ref.current;
}
