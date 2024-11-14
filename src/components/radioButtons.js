import React from 'react';
import { useDrag } from 'react-dnd';

const RadioButton = ({ id, label, width, height, }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'RADIO_BUTTON',
    item: { id, label, width, height, type: 'RADIO_BUTTON' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <label>
        <input type="radio" name="group" />
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
