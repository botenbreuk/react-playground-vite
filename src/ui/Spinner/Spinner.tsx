import classNames from 'classnames';
import './spinner.scss';

type Props = {
  /**
   * Optional extra CSS class you want to add to the component.
   * Useful for styling the component.
   */
  className?: string;

  /**
   * Color of the circle within the spinner.
   *
   */
  color?: string;

  /**
   * Width and height of the spinner.
   *
   */
  size: number;

  stroke?: number;
};

/**
 * Spinner is a component which is used as a loading indicator.
 *
 * Use it for example when data is fetching during navigation to a page.
 */
export function Spinner(props: Props) {
  const { className, color = 'white', stroke = 4, size } = props;
  return (
    <svg
      className={classNames('spinner', className)}
      width={size}
      height={size}
      viewBox="25 25 50 50"
    >
      <circle
        className="path"
        fill="none"
        stroke={color}
        cx="50"
        cy="50"
        r="20"
        strokeWidth={stroke}
        strokeMiterlimit="10"
      />
    </svg>
  );
}
