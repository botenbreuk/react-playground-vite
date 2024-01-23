import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode | (() => ReactNode);
};

export function TableColumn(props: Props) {
  const { className, children } = props;

  const classes = classNames('', className);

  return (
    <td className={classes}>
      {typeof children === 'function' ? children() : children}
    </td>
  );
}
