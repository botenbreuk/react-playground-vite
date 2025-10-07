import { ReactNode } from 'react';
import './_line-text.scss';

type Props = {
  text: ReactNode;
};

export function LineText(props: Props) {
  const { text } = props;

  return <span className="line-text">{text}</span>;
}
