import { ReactNode, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface Props {
  buttonLabel?: string;
  primary?: string;
  primaryClicked: () => void;
  close?: string;
  closeClicked: () => void;
  className?: string;
  children: ReactNode;
  title?: string;
  open?: boolean;
  withButton?: boolean;
}

export default function ConfirmModal(props: Props) {
  const {
    buttonLabel,
    primary = 'confirm',
    primaryClicked,
    close = 'cancel',
    closeClicked,
    className,
    children,
    title = '',
    open = false,
    withButton = true
  } = props;

  const [modal, setModal] = useState(open);

  const toggle = () => setModal(!modal);

  function confirm() {
    primaryClicked();
    toggle();
  }

  function cancel() {
    closeClicked();
    toggle();
  }

  return (
    <div>
      {withButton && (
        <Button color="danger" onClick={toggle}>
          {buttonLabel}
        </Button>
      )}
      <Modal isOpen={modal} toggle={cancel} className={className}>
        <ModalHeader toggle={cancel}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={cancel}>
            {close}
          </Button>
          <Button color="primary" onClick={confirm}>
            {primary}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
