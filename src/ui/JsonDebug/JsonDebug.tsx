import classNames from 'classnames';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon';
import './_json-debug.scss';

type Props<T> = {
  value: T;
  alignment?: 'left' | 'right';
  specificKey?: keyof T | (keyof T)[];
  defaultOpen?: boolean;
};

export function JsonDebug<T>(props: Props<T>) {
  const { value, alignment = 'left', specificKey, defaultOpen = false } = props;
  const [show, setShow] = useState(defaultOpen);

  function toggle() {
    setShow(current => !current);
  }

  function getKeys() {
    if (!specificKey) {
      return {};
    }

    const obj = {} as Record<keyof T | string, any>;
    if (Array.isArray(specificKey)) {
      specificKey.forEach(v => {
        obj[v] = value[v];
      });
    } else {
      obj[specificKey] = value[specificKey];
    }
    return obj;
  }

  if (import.meta.env.MODE !== 'development') {
    return null;
  }

  if (!show) {
    return (
      <Button className="json-debug-overlay-toggle" onClick={toggle}>
        Open JSON
      </Button>
    );
  }

  return (
    <>
      <Button className="json-debug-overlay-toggle" onClick={toggle}>
        Open JSON
      </Button>
      <div className={classNames('json-debug-overlay', alignment)}>
        <pre>{JSON.stringify(specificKey ? getKeys() : value, null, 2)}</pre>
        <Icon type="icon-cross" onClick={toggle} />
      </div>
    </>
  );
}
