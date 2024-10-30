import classnames from 'classnames';
import { IconType } from './';

type Props = {
  id?: string;
  type: IconType;
  color?: string;
  className?: string;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
};

export function Icon(props: Props) {
  const { id, type, color, onClick, onMouseOver, onMouseOut, className } = props;

  const classNames = classnames(`icon ${type}`, className, {
    clickable: onClick
  });

  return (
    <i
      id={id}
      className={classNames}
      style={{ color }}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
}
