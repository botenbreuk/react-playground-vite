import { clsx } from 'clsx';
import { Pagination as BPagination, PaginationItem, PaginationLink } from 'reactstrap';
import {
  LeftButtons,
  LeftEllipsis,
  MiddleButton,
  RightButtons,
  RightEllipsis
} from './parts';

type Props = {
  className?: string;
  totalPages: number;
  activePage: number;
  onSelect: (page: number) => void;
  maxButtons?: number;
};

export function Pagination(props: Props) {
  const { className, totalPages, activePage, onSelect, maxButtons = 5 } = props;

  const total = totalPages === 0 ? 1 : totalPages;
  const active = activePage === 0 ? 1 : activePage;

  const buttonOffset = maxButtons % 2 ? (maxButtons - 1) / 2 : maxButtons / 2;
  const current = active > total ? total : active;

  function firstClick() {
    onSelect(1);
  }

  function previousClick() {
    onSelect(current !== 1 ? current - 1 : current);
  }

  function nextClick() {
    onSelect(current !== total ? current + 1 : total);
  }

  function lastClick() {
    onSelect(total);
  }

  const isBackBtnActive = current === 1;
  const isNextBtnActive = current === total;

  const classes = clsx('m-1', className);

  return (
    <BPagination className={classes}>
      <PaginationItem>
        <PaginationLink first onClick={firstClick} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous onClick={previousClick} />
      </PaginationItem>
      <PaginationItem active={isBackBtnActive}>
        <PaginationLink onClick={firstClick}>1</PaginationLink>
      </PaginationItem>

      <LeftEllipsis offset={buttonOffset} current={current} />

      <LeftButtons offset={buttonOffset} current={current} {...props} />
      <MiddleButton current={current} {...props} />
      <RightButtons offset={buttonOffset} current={current} {...props} />

      <RightEllipsis offset={buttonOffset} current={current} totalPages={total} />

      {total !== 1 && (
        <PaginationItem active={isNextBtnActive}>
          <PaginationLink onClick={lastClick}>{total}</PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem>
        <PaginationLink next onClick={nextClick} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last onClick={lastClick} />
      </PaginationItem>
    </BPagination>
  );
}
