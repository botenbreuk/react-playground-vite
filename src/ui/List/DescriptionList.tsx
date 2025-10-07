import { clsx } from 'clsx';
import { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode | ReactNode[];
  horizontal?: boolean;
  horizontalLeft?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function DescriptionList(props: Props) {
  const {
    children,
    className,
    style,
    horizontal = false,
    horizontalLeft = false
  } = props;

  const classes = clsx(
    'dl mb-0',
    {
      'dl-horizontal': horizontal,
      'dl-horizontal-left': horizontal && horizontalLeft
    },
    className
  );

  return (
    <dl style={style} className={classes}>
      {children}
    </dl>
  );
}
