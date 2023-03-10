import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import { NumberRange } from '../../shared/types';

type DisplayType = 'tiles' | 'list';

type Props<T extends { id?: number }> = {
  items?: T[];
  children:
    | ((state: {
        items?: T[];
        bigCard?: number;
        setBigCard: (value: number) => void;
        gridStyle: DisplayType;
      }) => ReactNode | ReactNode[])
    | ReactNode
    | ReactNode[];
  type?: DisplayType;
  gridItems?: NumberRange<1, 6>;
  openFirst?: boolean;
};

export default function Cards<T extends { id?: number }>(props: Props<T>) {
  const { children, type, gridItems = 4, openFirst = false, items } = props;
  // const { gridDisplayType: gridStyle } = useUserSettingsState();
  const gridStyle = type || 'tiles';

  const [bigCard, setBigCard] = useState<number>();

  useEffect(() => {
    if (items && openFirst) {
      setBigCard(items.length === 1 ? items[0].id : undefined);
    }
  }, [openFirst, items]);

  const names = classNames(
    'card-columns',
    {
      horizontal: (!type && gridStyle === 'list') || type === 'list'
    },
    `grid-${gridItems}`
  );

  return (
    <div className={names}>
      {typeof children === 'function'
        ? children({
            items,
            bigCard,
            setBigCard: (value: number) =>
              setBigCard(bigCard !== value ? value : undefined),
            gridStyle
          })
        : children}
    </div>
  );
}
