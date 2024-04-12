import classNames from 'classnames';
import { ReactNode } from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Progress } from 'reactstrap';
import { IconType } from '../../ui/Icon/icon-types';
import ScrollTo from '../../ui/ScrollTo/ScrollTo';
import CardButton from './parts/CardButton';
import CardIcon from './parts/CardIcon';

type IconBg =
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-danger'
  | 'bg-warning'
  | 'bg-info'
  | 'bg-orange'
  | 'bg-success';

type Props = {
  title: string;
  icon: IconType;
  iconBg?: IconBg;
  headerClick?: () => void;
  customEdit?: ReactNode;
  editClick?: () => void;
  bigView?: boolean;
  className?: string;
  children: ((bigView: boolean) => ReactNode | ReactNode[]) | ReactNode | ReactNode[];
  footer?: ReactNode | ReactNode[];
  progress?: { current: number; max: number; suffix?: string };
  time?: ReactNode;
  theme?: 'lg' | 'dg' | 'lw' | 'dw' | 'wd';
};

export default function CardPanel(props: Props) {
  const {
    title,
    icon,
    iconBg = 'bg-primary',
    headerClick,
    customEdit,
    editClick,
    bigView = false,
    children,
    footer,
    className,
    progress,
    time,
    theme = 'lg'
  } = props;

  function getProgressColor() {
    if (!progress) {
      return '';
    }

    if (progress.current === progress.max) {
      return 'success';
    }

    if (progress.current >= progress.max / 2 && progress.current < progress.max) {
      return 'warning';
    }

    return 'danger';
  }

  const classes = classNames({ big: bigView }, className, `theme-${theme}`);

  const card = (
    <Card className={classes}>
      <CardHeader>
        <CardIcon type={icon} bgColor={iconBg} />
        <CardTitle className={headerClick ? 'clickable' : ''} onClick={headerClick}>
          <span>{title}</span>
        </CardTitle>
        {time && (
          <div className="duration">
            {typeof time === 'number' && time >= 0 ? (
              <>
                <div className="time number">{time}</div>
                <div className="time-type">days</div>
              </>
            ) : (
              <div className="time">{time}</div>
            )}
          </div>
        )}

        {customEdit && <div className="right-component">{customEdit}</div>}

        {editClick && (
          <CardButton type="bi-pencil-fill" color="white" onClick={editClick} />
        )}
      </CardHeader>
      <CardBody>{typeof children === 'function' ? children(bigView) : children}</CardBody>
      {progress && (
        <div className="card-progress">
          <Progress value={progress.current} color={getProgressColor()}>
            {`${progress.current}${progress.suffix ?? ''}`} /{' '}
            {`${progress.max}${progress.suffix ?? ''}`}
          </Progress>
        </div>
      )}
      <CardFooter>{footer}</CardFooter>
    </Card>
  );

  return bigView ? <ScrollTo>{card}</ScrollTo> : card;
}
