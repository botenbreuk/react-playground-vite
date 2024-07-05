import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import { Button, ButtonProps, Tooltip } from 'reactstrap';
import Alert from '../Alert/Alert';
import Icon from '../Icon/Icon';
import { IconType } from '../Icon/icon-types';
import Dialog, { DialogProps } from './Dialog';
import './dialog.scss';

export type DialogButtonProps = Omit<DialogProps, 'show'> & {
  button: (TooltipButton | NoTooltipButton) &
    Omit<ButtonProps, 'onCLick'> & {
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

export default function DialogButton(props: DialogButtonProps) {
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
        className={classNames(
          'align-self-start',
          { 'text-uppercase': button.color !== 'link' },
          button.className
        )}
        onClick={onButtonCLick}
      >
        {button.label}
        {button.icon && <Icon type={button.icon} />}
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
      <Dialog
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
      </Dialog>
    </>
  );
}
