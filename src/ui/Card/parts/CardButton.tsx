import Icon from '../../Icon/Icon';
import { IconType } from '../../Icon/icon-types';

type Props = {
  type: IconType;
  color?: string;
  onClick?: () => void;
};

export default function CardButton(props: Props) {
  const { type, color, onClick } = props;

  return (
    <div className="card-button" onClick={onClick}>
      <Icon type={type} color={color} />
    </div>
  );
}
