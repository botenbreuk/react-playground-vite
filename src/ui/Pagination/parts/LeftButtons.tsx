import { PaginationItem, PaginationLink } from 'reactstrap';

interface ButtonsProps {
  offset: number;
  current: number;
  onSelect: (page: number) => void;
  totalPages: number;
}

export default function LeftButtons({
  offset,
  current,
  onSelect
}: ButtonsProps) {
  const buttons = [];

  for (let i = offset; i > 0; i--) {
    if (current - i < 1 || current - i === 1) {
      continue;
    }

    buttons.push(
      <PaginationItem>
        <PaginationLink onClick={() => onSelect(current - i)}>
          {current - i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return <>{buttons}</>;
}
