import { PaginationItem, PaginationLink } from 'reactstrap';

export function LeftEllipsis(props: { current: number; offset: number }) {
  const { current, offset } = props;
  if (current - offset <= 2) {
    return null;
  }
  return (
    <PaginationItem>
      <PaginationLink>...</PaginationLink>
    </PaginationItem>
  );
}

export function RightEllipsis(props: {
  current: number;
  offset: number;
  totalPages: number;
}) {
  const { current, offset, totalPages } = props;
  if (current + offset + 1 >= totalPages) {
    return null;
  }
  return (
    <PaginationItem>
      <PaginationLink>...</PaginationLink>
    </PaginationItem>
  );
}
