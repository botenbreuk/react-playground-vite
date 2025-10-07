import { useRef } from 'react';

type Props = {
  name?: string;
};

/**
 * Use this component as a debugging tool to see how many times a component rerenders
 */
export function RenderCount(props: Props) {
  const { name = '' } = props;
  const renders = useRef(0);

  return <span className="badge badge-dark">{`${name} ${++renders.current}`}</span>;
}
