import React from 'react';
import { useDrag } from 'react-dnd';

const DatePicker = ({ id, label, width, height, }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'DATE_PICKER',
    item: { id, label, width, height, type: 'DATE_PICKER' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <label>{label}</label>
      <input type="date" />
    </div>
  );
};

export default DatePicker;
