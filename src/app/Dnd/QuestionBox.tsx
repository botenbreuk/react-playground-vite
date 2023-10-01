import { CSSProperties, useRef } from 'react';
import { DropTargetMonitor, XYCoord, useDrag, useDrop } from 'react-dnd';
import { Button, Col, Row } from 'reactstrap';
import { BoxType } from './QuestionList';
import { QuestionTypes } from './QuestionTypes';

interface Props {
  id: any;
  value: BoxType;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  remove: (index: number) => void;
}

export default function QuestionBox(props: Props) {
  const { id, value, index, moveCard, remove } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<BoxType>({
    accept: QuestionTypes.UPDATE_QUESTION,
    hover(item, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ opacity }, drag] = useDrag({
    type: QuestionTypes.UPDATE_QUESTION,
    item: { id, index },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  drag(drop(ref));

  let backgroundColor = 'black';
  switch (value.name) {
    case 'Glass':
      backgroundColor = 'grey';
      break;
    case 'Banana':
      backgroundColor = 'yellow';
      break;
    case 'Paper':
      backgroundColor = 'lightgrey';
      break;
  }

  const style: CSSProperties = {
    backgroundColor,
    cursor: 'move',
    color: 'black',
    opacity
  };

  return (
    <div ref={ref} style={{ ...style }} className="shadow-sm p-3 mb-2 rounded ">
      <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Col xs={12} md={2} className="text-start">
          {index} - {value.name}
        </Col>
        <Col xs={12} md={8}>
          <input style={{ width: '100%' }} />
        </Col>
        <Col xs={12} md={2}>
          <Button color="danger" block onClick={() => remove(index)}>
            verwijder
          </Button>
        </Col>
      </Row>
    </div>
  );
}
