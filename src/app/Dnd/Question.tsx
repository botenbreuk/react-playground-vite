import { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { questionTypes } from './QuestionTypes';

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

type Props = {
  name: string;
  onClick: (type: string) => void;
};

export default function Question(props: Props) {
  const { name, onClick } = props;
  const [{ isDragging }, drag] = useDrag({
    type: questionTypes.NEW_QUESTION,
    item: { name },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ ...style, opacity }} onClick={() => onClick(name)}>
      {name}
    </div>
  );
}
