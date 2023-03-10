import classNames from 'classnames';
import { Moment } from 'moment';
import { ReactNode } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress
} from 'reactstrap';
import { IconType } from '../Icon/icon-types';
import ScrollTo from '../ScrollTo/ScrollTo';
import CardButton from './parts/CardButton';
import CardIcon from './parts/CardIcon';
import CardTimeRemainer from './parts/CardTimeRemainer';

export type IconBg =
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-danger'
  | 'bg-warning'
  | 'bg-info'
  | 'bg-orange'
  | 'bg-yellow'
  | 'bg-success'
  | 'bg-aor-blue'
  | 'bg-jgz-orange'
  | 'bg-kt-green'
  | 'bg-mm-blue'
  | 'bg-transparent'
  | 'bg-white';

export type Props = {
  title?: string | ReactNode;
  icon?: IconType;
  iconBg?: IconBg;
  headerClick?: () => void;
  rightComponent?: ReactNode;
  editClick?: () => void;
  bigView?: boolean;
  className?: string;
  children?:
    | ((bigView: boolean) => ReactNode | ReactNode[])
    | ReactNode
    | ReactNode[];
  footer?:
    | ((bigView: boolean) => ReactNode | ReactNode[])
    | ReactNode
    | ReactNode[];
  secondFooter?: ReactNode | ReactNode[];
  progress?: { current: number; max: number; suffix?: string };
  date?: string | Moment;
  theme?: 'lg' | 'dg' | 'lw' | 'dw' | 'wd';
  autoHeihgt?: boolean;
  noScrollTo?: boolean;
};

export default function CardPanel(props: Props) {
  const {
    title,
    icon,
    iconBg = 'bg-primary',
    headerClick,
    rightComponent,
    editClick,
    bigView = false,
    children,
    footer,
    secondFooter,
    className,
    progress,
    date,
    theme = 'lg',
    autoHeihgt = false,
    noScrollTo = false
  } = props;

  function getProgressColor() {
    if (!progress) {
      return '';
    }

    if (progress.current === progress.max) {
      return 'success';
    }

    if (
      progress.current >= progress.max / 2 &&
      progress.current < progress.max
    ) {
      return 'warning';
    }

    return 'danger';
  }

  const classes = classNames({ big: bigView }, className, `theme-${theme}`);
  const cardBodyClasses = classNames({ 'auto-height': autoHeihgt && !bigView });

  const card = (
    <Card className={classes}>
      <CardHeader>
        {icon && <CardIcon type={icon} bgColor={iconBg} />}
        <CardTitle
          className={headerClick ? 'clickable' : ''}
          onClick={headerClick}
        >
          <span>{title}</span>
        </CardTitle>
        <CardTimeRemainer date={date} />

        {rightComponent && (
          <div className="right-component">{rightComponent}</div>
        )}

        {editClick && (
          <CardButton type="icon-pencil" color="white" onClick={editClick} />
        )}
      </CardHeader>
      {children && (
        <CardBody className={cardBodyClasses}>
          {typeof children === 'function' ? children(bigView) : children}
        </CardBody>
      )}

      {progress && (
        <div className="card-progress">
          <Progress value={progress.current} color={getProgressColor()}>
            {`${progress.current}${progress.suffix || ''}`} /{' '}
            {`${progress.max}${progress.suffix || ''}`}
          </Progress>
        </div>
      )}
      {footer && (
        <CardFooter>
          {typeof footer === 'function' ? footer(bigView) : footer}
        </CardFooter>
      )}
      {secondFooter && <div className="second-footer">{secondFooter}</div>}
    </Card>
  );

  return !noScrollTo && bigView ? <ScrollTo>{card}</ScrollTo> : card;
}
