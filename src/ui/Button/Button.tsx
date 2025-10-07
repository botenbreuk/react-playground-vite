import { clsx } from 'clsx';
import { ButtonHTMLAttributes, ElementType, Ref } from 'react';
import { Button as BButton } from 'reactstrap';
import { Icon, IconType, Spinner } from '../';

type CSSModule = {
  [className: string]: string;
};

// Same as reactstrap but with the 'any' prop removed
type BButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outline?: boolean;
  active?: boolean;
  block?: boolean;
  color?: string;
  tag?: ElementType;
  innerRef?: Ref<HTMLButtonElement>;
  size?: string;
  cssModule?: CSSModule;
  close?: boolean;
};

export type ButtonProps = BButtonProps & {
  icon?: IconType;
  iconPlacement?: 'left' | 'right';
  loading?: boolean;
  casing?: 'uppercase' | 'lowercase' | 'keep-text';
};

export function Button(props: ButtonProps) {
  const {
    color = 'primary',
    children,
    loading,
    disabled,
    className,
    icon,
    iconPlacement = 'right',
    casing = 'keep-text',
    ...buttonProps
  } = props;
  return (
    <BButton
      {...buttonProps}
      className={clsx(className, {
        'text-uppercase': casing === 'uppercase',
        'text-lowercase': casing === 'lowercase'
      })}
      color={color}
      disabled={disabled || loading}
    >
      <div className="d-flex align-items-center gap-2 justify-content-center">
        {icon && iconPlacement === 'left' && <Icon type={icon} />}
        {children}
        {loading && (
          <Spinner
            size={12}
            color={['link', 'light'].includes(color) ? '00588d' : 'white'}
          />
        )}
        {icon && iconPlacement === 'right' && <Icon type={icon} />}
      </div>
    </BButton>
  );
}
