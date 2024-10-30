import { useCallback, useRef, useState } from 'react';
import { Tooltip } from 'reactstrap';
import { Alert, Button, ButtonProps, IconType } from '../';
import { Modal, ModalProps } from './Modal';

export type ModalButtonProps = Omit<ModalProps, 'show'> & {
  button: (TooltipButton | NoTooltipButton) &
    Omit<ButtonProps, 'onClick' | 'children'> & {
      label: string;
      className?: string;
      onClick?: (isOpen: boolean) => void | Promise<void>;
      icon?: IconType;
      tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
    };
};

type TooltipButton = {
  tooltip: string;
  id: string;
};

type NoTooltipButton = {
  tooltip?: undefined;
  id?: string;
};

export function ModalButton(props: ModalButtonProps) {
  const { primary, cancel, button, children } = props;
  const [error, setError] = useState<string>();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  const toggle = useCallback(() => {
    if (!isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }

    setIsOpen(current => !current);
  }, [isOpen]);

  function onCancel() {
    cancel?.onClick();
    toggle();
  }

  function onButtonCLick() {
    setError(undefined);
    if (button.onClick) button.onClick(!isOpen);
    toggle();
  }

  async function onPrimaryClick() {
    setError(undefined);
    try {
      await primary.onClick();
      toggle();
    } catch (e: any) {
      setError(`${e.message}`);
    }
  }

  return (
    <>
      <Button
        {...button}
        casing={button.color === 'link' ? 'keep-text' : 'uppercase'}
        onClick={onButtonCLick}
      >
        {button.label}
      </Button>
      {button.tooltip && (
        <Tooltip
          placement="top"
          isOpen={tooltipOpen}
          target={button.id}
          toggle={() => setTooltipOpen(current => !current)}
        >
          {button.tooltip}
        </Tooltip>
      )}
      <Modal
        {...props}
        primary={{ ...primary, onClick: onPrimaryClick }}
        cancel={{ ...cancel, onClick: onCancel }}
        show={isOpen}
      >
        {children}
        {error && (
          <Alert color="danger" className="mt-2">
            {error}
          </Alert>
        )}
      </Modal>
    </>
  );
}
