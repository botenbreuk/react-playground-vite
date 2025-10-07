import { clsx } from 'clsx';
import { Icon } from '../../../ui';
import { IconType } from '../../../ui/Icon/icon-types';

type Props = {
  type: IconType;
  bgColor?: string;
  color?: string;
};

export function CardIcon(props: Props) {
  const { type, bgColor, color } = props;

  const className = clsx('card-icon', bgColor);

  return (
    <div className={className}>
      <Icon type={type} color={color} />
    </div>
  );
}
