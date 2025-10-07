import { clsx } from 'clsx';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon';
import './_json-debug.scss';

type Props<T> = {
  value: T;
  alignment?: 'left' | 'right';
  keys?: keyof T | (keyof T)[];
  defaultOpen?: boolean;
};

export function JsonDebug<T>(props: Props<T>) {
  const { value, alignment = 'left', keys, defaultOpen = false } = props;
  const [show, setShow] = useState(defaultOpen);

  function toggle() {
    setShow(current => !current);
  }

  function getKeys() {
    if (!keys) {
      return {};
    }

    const obj = {} as Record<keyof T | string, any>;
    if (Array.isArray(keys)) {
      keys.forEach(v => {
        obj[v] = value[v];
      });
    } else {
      obj[keys] = value[keys];
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
      <div className={clsx('json-debug-overlay', alignment)}>
        <pre>{JSON.stringify(keys ? getKeys() : value, null, 2)}</pre>
        <Icon type="icon-cross" onClick={toggle} />
      </div>
    </>
  );
}
