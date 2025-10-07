import { PaginationItem, PaginationLink } from 'reactstrap';

type Props = {
  current: number;
  totalPages: number;
};

export function MiddleButton(props: Props) {
  const { current, totalPages } = props;
  if (current === 1 || current === totalPages) {
    return null;
  }

  return (
    <PaginationItem active>
      <PaginationLink>{current}</PaginationLink>
    </PaginationItem>
  );
}
