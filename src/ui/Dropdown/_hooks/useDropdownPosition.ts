import { useLayoutEffect, useRef, useState } from 'react';
import { useWindowSize } from '../../../hooks/useWindowSize/useWindowSize';
import { DropdownAlignment, DropdownPosition } from '../Dropdown';

export function useDropdownPosition({
  position,
  alignment,
  open
}: {
  position: DropdownPosition;
  alignment: DropdownAlignment;
  open: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [flippedValue, setFlippedValue] = useState<{
    top: number;
    left: number;
    value: number;
  }>();
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const windowSize = useWindowSize();

  useLayoutEffect(() => {
    if (ref?.current && refContainer?.current) {
      const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = ref.current;
      const { offsetHeight: offsetHeightCont, offsetWidth: offsetWidthCont } =
        refContainer.current;

      switch (position) {
        case 'bottom':
          switch (alignment) {
            case 'default':
            case 'start':
              setLeft(offsetLeft);
              break;
            case 'center':
              setLeft(offsetLeft - (offsetWidthCont / 2 - offsetWidth / 2));
              break;
            case 'end':
              setLeft(offsetLeft - offsetWidth);
              break;
          }
          break;
        case 'top':
          switch (alignment) {
            case 'default':
            case 'start':
              setLeft(offsetLeft);
              break;
            case 'center':
              setLeft(offsetLeft - (offsetWidthCont / 2 - offsetWidth / 2));
              break;
            case 'end':
              setLeft(offsetLeft - (offsetWidthCont - offsetWidth));
              break;
          }
          setTop(offsetTop - offsetHeightCont - offsetHeight);
          break;
        case 'right':
          switch (alignment) {
            case 'start':
              setTop(offsetTop - offsetHeight);
              break;
            case 'default':
            case 'center':
              setTop(offsetTop - (offsetHeightCont / 2 + offsetHeight / 2));
              break;
            case 'end':
              setTop(offsetTop - offsetHeightCont);
              break;
          }
          if (!flipped) {
            if (
              windowSize <
              Math.floor(refContainer.current.getBoundingClientRect().x + offsetWidthCont)
            ) {
              setFlippedValue({
                top,
                left,
                value: Math.floor(
                  refContainer.current.getBoundingClientRect().x + offsetWidthCont
                )
              });
              setFlipped(true);
              setLeft(offsetLeft - offsetWidthCont);
            } else {
              setLeft(offsetLeft + offsetWidth);
              setFlippedValue(undefined);
              setFlipped(false);
            }
          } else if (flipped && flippedValue) {
            if (windowSize > flippedValue.value) {
              setLeft(flippedValue.left);
              setFlippedValue(undefined);
              setFlipped(false);
            }
          }
          break;
        case 'left':
          switch (alignment) {
            case 'start':
              setTop(offsetTop - offsetHeight);
              break;
            case 'default':
            case 'center':
              setTop(offsetTop - (offsetHeightCont / 2 + offsetHeight / 2));
              break;
            case 'end':
              setTop(offsetTop - offsetHeightCont);
              break;
          }
          setLeft(offsetLeft - offsetWidthCont);
          break;
      }
    }
  }, [ref, position, alignment, open, windowSize, flipped, flippedValue, top, left]);

  return { top, left, ref, refContainer };
}
