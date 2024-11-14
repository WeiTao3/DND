import React from 'react';
import { useDrag } from 'react-dnd';

const SelectDropdown = ({ id, label, width, height, options }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SELECT_DROPDOWN',
    item: { id, label, width, height, options, type: 'SELECT_DROPDOWN', },
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
      <select
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          outline: 'none',
          padding: '5px',
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
