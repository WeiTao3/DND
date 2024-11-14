import React from 'react';
import { useDrag } from 'react-dnd';

const TextInput = ({ id, label, width, height }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TEXT_INPUT',
    item: { id, label, width, height, type: 'TEXT_INPUT'},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  

  return (
    <div ref={drag} style={{
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid black',
        padding: '10px',
        width: `${width}px`,
        height: `${height}px`,
        cursor: 'move',
      }}>
      <input
        type="text"
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

export default TextInput;
