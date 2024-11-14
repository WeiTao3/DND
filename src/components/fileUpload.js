import React from 'react';
import { useDrag } from 'react-dnd';

const FileUpload = ({ id, label, width, height, }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FILE_UPLOAD',
    item: { id, label, width, height, type: 'FILE_UPLOAD' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <label>{label}</label>
      <input type="file" />
    </div>
  );
};

export default FileUpload;
