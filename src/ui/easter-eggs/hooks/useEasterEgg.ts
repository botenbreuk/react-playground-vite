import { isArray } from 'lodash';
import { useEffect, useState } from 'react';

const specialKeys: Record<string, string> = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  Enter: 'enter',
  Shift: 'shift',
  CapsLock: 'caps'
};

export function useEasterEgg({
  code,
  duration
}: {
  code: string | string[];
  duration?: number;
}) {
  const [keyPresses, setKeyPresses] = useState<string[]>([]);
  const [active, setActive] = useState(false);

  function cancel() {
    setActive(false);
  }

  useEffect(() => {
    if (duration && active) {
      const cancelTime = setTimeout(() => setActive(false), duration);
      return () => clearTimeout(cancelTime);
    } else {
      return () => undefined;
    }
  }, [active, duration]);

  useEffect(() => {
    if (keyPresses.length > 0) {
      function reset() {
        setKeyPresses([]);
      }

      const timer = setTimeout(reset, 2000);
      return () => clearTimeout(timer);
    } else {
      return () => undefined;
    }
  }, [keyPresses]);

  useEffect(() => {
    if (arrayEquals(keyPresses, isArray(code) ? code : code.split(''))) {
      setActive(true);
    }
  }, [keyPresses, code]);

  useEffect(() => {
    if (!code || active) {
      return;
    }

    function keyDownHandler(e: KeyboardEvent) {
      setKeyPresses(current => [...current, specialKeys[e.key] || e.key]);
    }

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyPresses, code, active]);

  return { active, cancel };
}

function arrayEquals(a: string[], b: string[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
