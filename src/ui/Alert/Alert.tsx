import { AlertProps, Alert as BAlert } from 'reactstrap';

export function Alert(props: AlertProps) {
  const { fade = false, ...rest } = props;
  return <BAlert {...rest} fade={fade} />;
}
