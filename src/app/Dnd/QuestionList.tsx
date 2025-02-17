import { CSSProperties, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import QuestionBox from './QuestionBox';
import { questionTypes } from './QuestionTypes';

const style: CSSProperties = {
  minHeight: '12rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal'
};

export type BoxType = {
  id: number;
  name: string;
  index: number;
  type: string;
};

type Props = {
  value: BoxType[];
  onChange: (value: BoxType[]) => void;
};

export default function QuestionList(props: Props) {
  const { value, onChange } = props;

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: questionTypes.NEW_QUESTION,
    drop(item: BoxType) {
      const copy: BoxType[] = [...value];
      const id = copy.length ? copy.length + 1 : 0;
      copy.push({ ...item, id });
      onChange(copy);
      return undefined;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = value[dragIndex];
      const test = [...value];
      test.splice(dragIndex, 1);
      test.splice(hoverIndex, 0, dragCard);
      onChange(test);
    },
    [value, onChange]
  );

  function remove(index: number) {
    const test = [...value];
    test.splice(index, 1);
    onChange(test);
  }

  const isActive = canDrop && isOver;

  return (
    <div
      ref={ref => {
        drop(ref);
      }}
      style={{ ...style }}
      className="bg-primary"
    >
      {isActive ? 'Release to drop' : 'Drag a box here'}
      {value.map((val, index) => (
        <QuestionBox
          key={index}
          id={val.id}
          index={index}
          value={val}
          moveCard={moveCard}
          remove={remove}
        />
      ))}
    </div>
  );
}
