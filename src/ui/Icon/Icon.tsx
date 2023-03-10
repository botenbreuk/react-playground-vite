import classnames from 'classnames';
import { IconType } from './icon-types';

type Props = {
  type: IconType;
  color?: string;
  className?: string;
  onClick?: () => void;
};

export default function Icon(props: Props) {
  const { type, color = '#244e9b', onClick, className } = props;

  const classNames = classnames(`icon ${type}`, className, {
    clickable: onClick
  });

  return <i className={classNames} style={{ color }} onClick={onClick} />;
}
