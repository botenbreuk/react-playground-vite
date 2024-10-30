import classNames from 'classnames';
import { Icon } from '../../';
import { IconType } from '../../Icon/icon-types';

type Props = {
  type: IconType;
  label?: string;
  bgColor?: string;
  color?: string;
  onClick?: () => void;
};

export default function CardIcon(props: Props) {
  const { type, bgColor, color, onClick } = props;

  const className = classNames('card-icon', bgColor, { clickable: onClick });

  return (
    <div className={className} onClick={onClick}>
      <Icon type={type} color={color} />
    </div>
  );
}
