import React from 'react';
import { useDrag } from 'react-dnd';

const TextArea = ({ id, label, width, height }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TEXT_AREA',
    item: { id, label, width, height, type: 'TEXT_AREA', },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: `${width}px`,
        height: `${height}px`,
        padding: '10px',
        border: '1px solid black',
        cursor: 'move',
        marginBottom: '10px',
      }}
    >
      <textarea
        placeholder={label}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          outline: 'none',
          padding: '5px',
        }}
      />
    </div>
  );
};

export default TextArea;
