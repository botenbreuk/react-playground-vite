import classNames from 'classnames';
import { ReactNode } from 'react';
import { Button, InputGroup, InputGroupText } from 'reactstrap';
import Icon from '../Icon/Icon';
import './dialog.scss';
import { useDialog } from './hooks/useDialog';

export type DialogProps = {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  width?: 100 | 90 | 80 | 70 | 60 | 50 | 40 | 30;
  primary: {
    onClick: () => any | Promise<any>;
    label?: string;
  };
  cancel?: { onClick: () => void };
  show: boolean;
  searchable?: boolean;
  onSearch?: (value: string) => void;
  hideFooter?: boolean;
};

export default function Dialog(props: DialogProps) {
  const {
    children,
    title,
    footer,
    width = 30,
    primary,
    cancel,
    show = false,
    searchable = false,
    onSearch,
    hideFooter = false
  } = props;
  const { ref, onCancel } = useDialog({
    show,
    cancelFn: cancel?.onClick
  });

  async function onPrimaryClick() {
    try {
      await primary.onClick();
    } catch (e) {}
  }

  return (
    <dialog ref={ref} className={classNames({ [`width-${width}`]: width })}>
      <div className="dialog-title">
        <div>{title}</div>
        <Icon type="icon-cross" className="clickable" onClick={onCancel} />
      </div>
      {searchable && onSearch && (
        <div className="dialog-search">
          <InputGroup>
            <input
              className="form-control"
              onChange={v => onSearch(v.target.value)}
              placeholder="Zooeken..."
            />
            <InputGroupText>
              <Icon type="bi-search" />
            </InputGroupText>
          </InputGroup>
        </div>
      )}
      <section className="dialog-body">{children}</section>
      {!hideFooter && (
        <div className="dialog-footer">
          <div className="footer">{footer}</div>
          <div className="buttons">
            <Button color="link" className="text-uppercase" onClick={onCancel}>
              Annuleren
            </Button>

            <Button color="primary" className="text-uppercase" onClick={onPrimaryClick}>
              {primary.label ?? 'Selecteer'}
            </Button>
          </div>
        </div>
      )}
    </dialog>
  );
}
