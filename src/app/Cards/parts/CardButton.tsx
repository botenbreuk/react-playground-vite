import { Icon } from '../../../ui';
import { IconType } from '../../../ui/Icon/icon-types';

type Props = {
  type: IconType;
  color?: string;
  onClick?: () => void;
};

export function CardButton(props: Props) {
  const { type, color, onClick } = props;

  return (
    <div className="card-button" onClick={onClick}>
      <Icon type={type} color={color} />
    </div>
  );
}
