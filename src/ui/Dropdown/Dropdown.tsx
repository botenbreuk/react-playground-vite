import { ReactElement, ReactNode, RefObject, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick/useOutsideClick';
import './_dropdown.scss';
import { useDropdownPosition } from './_hooks/useDropdownPosition';

export type DropdownPosition = 'left' | 'right' | 'bottom' | 'top';
export type DropdownAlignment = 'start' | 'center' | 'end' | 'default';
export type DropdownChildren = ReactNode | ((obj: { toggle: () => void }) => ReactNode);

type Props = {
  toggleElement: (options: {
    ref: RefObject<any>;
    onClick: () => void;
    isOpen: boolean;
  }) => ReactElement;
  position?: DropdownPosition;
  alignment?: DropdownAlignment;
  children: DropdownChildren;
};

export function Dropdown(props: Props) {
  const { toggleElement, position = 'bottom', alignment = 'default', children } = props;
  const [open, setOpen] = useState(false);
  const { top, left, ref, refContainer } = useDropdownPosition({
    position,
    alignment,
    open
  });
  const refDropdown = useOutsideClick(() => {
    if (open) {
      toggle();
    }
  });

  function toggle() {
    setOpen(current => !current);
  }

  return (
    <div
      ref={refDropdown}
      onKeyDown={e => {
        if (open && e.key === 'Escape') {
          toggle();
        }
      }}
      className="rdb-dropdown"
    >
      {toggleElement({ ref, onClick: toggle, isOpen: open })}
      {open && (
        <div
          ref={refContainer}
          className="rdb-dropdown-container"
          style={{ transform: `translate(${left}px, ${top}px)` }}
        >
          {typeof children === 'function' ? children({ toggle }) : children}
        </div>
      )}
    </div>
  );
}
