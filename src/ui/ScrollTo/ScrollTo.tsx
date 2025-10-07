import { ReactNode } from 'react';
import { useScrollToRef } from '../../hooks/useScrollToRef/useScrollToRef';

type Props = {
  children: ReactNode | ReactNode[];
};

export function ScrollTo(props: Props) {
  const [setRef] = useScrollToRef();

  const { children } = props;

  return (
    <div style={{ width: '100%', gridColumn: '1 / -1' }} ref={setRef}>
      {children}
    </div>
  );
}
