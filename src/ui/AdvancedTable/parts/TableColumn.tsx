import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode | (() => ReactNode);
};

export function TableColumn(props: Props) {
  const { className, children } = props;

  return (
    <td className={className}>
      {typeof children === 'function' ? children() : children}
    </td>
  );
}
