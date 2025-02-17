import { Button, ButtonProps } from '../';

type Props = Omit<ButtonProps, 'onClick' | 'icon'> & {
  copyValue: string;
};

export function CopyToClipboard(props: Props) {
  const { copyValue, ...rest } = props;
  return (
    <Button
      {...rest}
      icon="icon-clipboard"
      onClick={() => navigator.clipboard.writeText(copyValue)}
    />
  );
}
