// PropertiesPanel.js
import React, { useState } from 'react';

const PropertiesPanel = ({ selectedComponent, onUpdate, onClose }) => {
  const [newOption, setNewOption] = useState('');

  // Add new option to dropdown
  const addOption = () => {
    if (newOption.trim()) {
      onUpdate('options', [...selectedComponent.options, newOption]);
      setNewOption('');
    }
  };

  // Update an existing option
  const updateOption = (index, value) => {
    const updatedOptions = [...selectedComponent.options];
    updatedOptions[index] = value;
    onUpdate('options', updatedOptions);
  };

  // Remove an option
  const removeOption = (index) => {
    const updatedOptions = selectedComponent.options.filter((_, i) => i !== index);
    onUpdate('options', updatedOptions);
  };

  if (!selectedComponent) return null;

  // Common handler for updating properties
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate(name, value);
  };

  return (
    <div style={{
      padding: '16px',
      border: '1px solid gray',
      backgroundColor: '#fff',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Properties Panel</h3>
        <button onClick={onClose} style={{ cursor: 'pointer', height: "22px" }}>X</button>
      </div>
      <div>
        <label>Label:</label>
        <input
          type="text"
          name="label"
          value={selectedComponent.label}
          onChange={handleChange}
        />
      </div>
      {selectedComponent.type === 'SELECT_DROPDOWN' && (
        <div>
          <h4>Dropdown Options</h4>
          <ul>
            {selectedComponent.options.map((option, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                <button onClick={() => removeOption(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="New option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <button onClick={addOption}>Add Option</button>
        </div>
      )}
      {selectedComponent.type === 'CHECKBOX' && (
        <div>
          <label>Checked:</label>
          <input
            type="checkbox"
            name="checked"
            checked={selectedComponent.checked || false}
            onChange={(e) => onUpdate('checked', e.target.checked)}
          />
        </div>
      )}
      {selectedComponent.type === 'RADIO_BUTTON' && (
        <div>
          <label>Options (comma separated):</label>
          <input
            type="text"
            name="options"
            value={selectedComponent.options.join(',')}
            onChange={(e) => onUpdate('options', e.target.value.split(','))}
          />
        </div>
      )}
      {selectedComponent.type === 'DATE_PICKER' && (
        <div>
          <label>Date Format:</label>
          <input
            type="text"
            name="format"
            value={selectedComponent.format || 'MM/DD/YYYY'}
            onChange={handleChange}
          />
        </div>
      )}
      {selectedComponent.type === 'FILE_UPLOAD' && (
        <div>
          <label>Accepted File Types:</label>
          <input
            type="text"
            name="fileTypes"
            value={selectedComponent.fileTypes || ''}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
