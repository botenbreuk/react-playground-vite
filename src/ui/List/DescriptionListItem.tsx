import { CSSProperties, ReactNode } from 'react';

export type Props = {
  label?: string | ReactNode;
  children: ReactNode | ReactNode[];
  hideCondition?: boolean;
  style?: {
    dt?: CSSProperties;
    dd?: CSSProperties;
  };
  className?: {
    dt?: string;
    dd?: string;
  };
  noOverflow?: boolean;
};

export default function DescriptionListItem(props: Props) {
  const {
    label,
    children,
    style = { dt: {}, dd: {} },
    className = { dt: '', dd: '' },
    hideCondition = false,
    noOverflow = false
  } = props;

  const overflowOptions: CSSProperties = noOverflow
    ? { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }
    : {};

  if (hideCondition) {
    return null;
  }

  return (
    <>
      {label && (
        <dt style={style.dt} className={className.dt}>
          {label}
        </dt>
      )}
      <dd style={{ ...style.dd, ...overflowOptions }} className={className.dd}>
        {children}
      </dd>
    </>
  );
}
