import type { CSSProperties } from 'react';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { itemTypes } from './ItemTypes';

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

export type CardProps = {
  id: string;
  text: string;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
};

type Item = {
  id: string;
  originalIndex: number;
};

export const Card = memo(function Card({ id, text, moveCard, findCard }: CardProps) {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: itemTypes.CARD,
      item: { id, originalIndex },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex: ogIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, ogIndex);
        }
      }
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: itemTypes.CARD,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      }
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={node => {
        drag(drop(node));
      }}
      style={{ ...style, opacity }}
    >
      {originalIndex} - {text}
    </div>
  );
});
