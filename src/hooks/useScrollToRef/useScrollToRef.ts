import { useRef } from 'react';
import useScrollTo from '../useScrollTo/useScrollTo';

export default function useScrollToRef() {
  const ref = useRef(null);

  useScrollTo({
    scrollTo: ref,
    element: document.getElementsByClassName(`navbars`)[0],
    margin: 10
  });

  function setRef(node: any) {
    ref.current = node;
  }

  return [setRef];
}
