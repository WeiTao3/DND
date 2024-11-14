import React from 'react';
import { useDrag } from 'react-dnd';

const Checkbox = ({ id, label, width, height, }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CHECKBOX',
    item: { id, label, width, height, type: 'CHECKBOX' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <label>
        <input type="checkbox" />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
