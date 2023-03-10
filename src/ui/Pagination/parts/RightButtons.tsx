import { PaginationItem, PaginationLink } from 'reactstrap';

type Props = {
  offset: number;
  current: number;
  onSelect: (page: number) => void;
  totalPages: number;
};

export default function RightButtons(props: Props) {
  const { offset, current, totalPages, onSelect } = props;
  const buttons = [];

  for (let i = 1; i <= offset; i++) {
    if (current + i > totalPages || current + i === totalPages) {
      continue;
    }

    buttons.push(
      <PaginationItem>
        <PaginationLink onClick={() => onSelect(current + i)}>
          {current + i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return <>{buttons}</>;
}
