import { clsx } from 'clsx';
import { ReactNode } from 'react';
import {
  Modal as BModal,
  InputGroup,
  InputGroupText,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { Button, Icon } from '../';
import './modal.scss';

export type ModalProps = {
  children: ReactNode;
  title: string;
  footer?: ReactNode;
  width?: 100 | 90 | 80 | 70 | 60 | 50 | 40 | 30;
  primary: {
    onClick: () => any | Promise<any>;
    label?: string;
  };
  cancel?: { onClick: () => void };
  show: boolean;
  onSearch?: (value: string) => void;
  hideFooter?: boolean;
};

export function Modal(props: ModalProps) {
  const {
    children,
    title,
    footer,
    width = 30,
    primary,
    cancel,
    show = false,
    onSearch,
    hideFooter = false
  } = props;

  async function onPrimaryClick() {
    try {
      await primary.onClick();
    } catch {}
  }

  return (
    <BModal
      isOpen={show}
      backdrop={!!cancel?.onClick || 'static'}
      toggle={cancel?.onClick}
      className={clsx({ [`width-${width}`]: width })}
    >
      <ModalHeader>
        <div>{title}</div>
        <Icon type="icon-cross" className="clickable" onClick={cancel?.onClick} />
      </ModalHeader>
      {onSearch && (
        <ModalBody>
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
        </ModalBody>
      )}
      <ModalBody>{children}</ModalBody>
      {!hideFooter && (
        <ModalFooter>
          <div className="footer">{footer}</div>
          <div className="buttons">
            <Button color="link" casing="uppercase" onClick={cancel?.onClick}>
              Annuleren
            </Button>

            <Button casing="uppercase" onClick={onPrimaryClick}>
              {primary.label ?? 'Bevestig'}
            </Button>
          </div>
        </ModalFooter>
      )}
    </BModal>
  );
}
