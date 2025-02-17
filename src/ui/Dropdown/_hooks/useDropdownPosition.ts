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

      function topBottomPosition() {
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
      }

      function leftRightPosition() {
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
      }

      function flipCheck({ flip, reset }: { flip: () => void; reset: () => void }) {
        if (!flippedValue && refContainer.current) {
          const xPos = Math.floor(
            refContainer.current.getBoundingClientRect().x + offsetWidthCont
          );
          if (windowSize < xPos) {
            setFlippedValue({ top, left, value: xPos });
            flip();
          } else {
            reset();
          }
        } else if (flippedValue) {
          if (windowSize > flippedValue.value) {
            setLeft(flippedValue.left);
            setTop(flippedValue.top);
            setFlippedValue(undefined);
          }
        }
      }

      switch (position) {
        case 'bottom':
          flipCheck({
            flip: () => {
              setLeft(offsetLeft - (offsetWidthCont - offsetWidth));
            },
            reset: topBottomPosition
          });
          break;
        case 'top':
          topBottomPosition();
          setTop(offsetTop - offsetHeightCont - offsetHeight);
          break;
        case 'right':
          flipCheck({
            flip: () => {
              setLeft(offsetLeft - offsetWidthCont);
            },
            reset: () => {
              leftRightPosition();
              setLeft(offsetLeft + offsetWidth);
            }
          });
          break;
        case 'left':
          leftRightPosition();
          setLeft(offsetLeft - offsetWidthCont);
          break;
      }
    }
  }, [ref, position, alignment, open, windowSize, flippedValue, top, left]);

  return { top, left, ref, refContainer };
}
