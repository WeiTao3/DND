import React, { useState, useRef, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import TextInput from './components/textInput';
import TextArea from './components/textarea';
import SelectDropdown from './components/selectDropdown';
import Checkbox from './components/checkbox';
import RadioButton from './components/radioButtons';
import DatePicker from './components/datePicker';
import FileUpload from './components/fileUpload';
import PropertiesPanel from './components/propertiesPanel';
import axios from 'axios';


const FormBuildingArea = () => {
    const [components, setComponents] = useState([]);
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [savedForms, setSavedForms] = useState([]);
    const [formId, setFormId] = useState(savedForms.length);
    const [formName, setFormName] = useState('');
    const dropAreaRef = useRef(null);

    const componentMap = {
        TEXT_INPUT: TextInput,
        TEXT_AREA: TextArea,
        SELECT_DROPDOWN: SelectDropdown,
        CHECKBOX: Checkbox,
        RADIO_BUTTON: RadioButton,
        DATE_PICKER: DatePicker,
        FILE_UPLOAD: FileUpload,
    };

    const selectedComponent = components.find((comp) => comp.id === selectedComponentId);

    const [, drop] = useDrop({
        accept: ['TEXT_INPUT', 'TEXT_AREA', 'SELECT_DROPDOWN', 'CHECKBOX', 'RADIO_BUTTON', 'DATE_PICKER', 'FILE_UPLOAD'],
        drop: (item, monitor) => {
            const cursorOffset = monitor.getClientOffset(); // Cursor position in viewport
            const dropAreaOffset = dropAreaRef.current.getBoundingClientRect(); // DropArea position in viewport

            const { width, height, type, id, label, options } = item;

            const x = cursorOffset.x - dropAreaOffset.left - width / 2;
            const y = cursorOffset.y - dropAreaOffset.top - height / 2;

            const existingComponent = components.find((comp) => comp.id === item.id);

            if (!existingComponent) {
                const newComponent = {
                    id: `${id}-${new Date().getTime()}`, // Generate a unique ID
                    label,
                    width,
                    height,
                    x,
                    y,
                    type,
                    options: options || [],
                };

                setComponents((prevComponents) => [...prevComponents, newComponent]);
            }
        },
    });

    const updateComponentProperties = (property, value) => {
        setComponents((prevComponents) =>
            prevComponents.map((comp) =>
                comp.id === selectedComponentId ? { ...comp, [property]: value } : comp
            )
        );
    };

    const closePropertiesPanel = () => {
        setSelectedComponentId(null);
    };

    const saveFormStructure = async () => {
        const formStructure = components.map(({ id, label, x, y, type, options }) => ({
            id,
            label,
            x,
            y,
            type,
            options,
        }));
        try {
            setSavedForms((prevForms) => [...prevForms, { formId: formId, formName: formName, structure: formStructure }]);
            // console.log("savedForms: ", savedForms);
            // const response = await axios.post('/api/forms/save', { formId: formId, formName: formName, structure: formStructure });
            // console.log('Form saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving form:', error);
        }
    };

    const loadForm = (formStructure) => {
        setComponents(formStructure);
    };

    // const moveComponent = (id, x, y) => {
    //     setComponents((prevComponents) =>
    //         prevComponents.map((comp) =>
    //             comp.id === id ? { ...comp, x, y } : comp
    //         )
    //     );
    // };

    // const DraggableComponent = ({ component }) => {
    //     const [, drag] = useDrag({
    //         type: component.type,
    //         item: { id: component.id, x: component.x, y: component.y },
    //         end: (item, monitor) => {
    //             const delta = monitor.getDifferenceFromInitialOffset();
    //             if (delta) {
    //                 const newX = component.x + delta.x;
    //                 const newY = component.y + delta.y;
    //                 moveComponent(component.id, newX, newY);
    //             }
    //         },
    //     });
    //     const Component = componentMap[component.type];

    //     return (
    //         <div
    //             ref={drag}
    //             style={{
    //                 position: 'absolute',
    //                 left: component.x,
    //                 top: component.y,
    //                 width: component.width,
    //                 height: component.height,
    //                 cursor: 'move',
    //             }}
    //             onDoubleClick={() => setSelectedComponentId(component.id)}
    //         >   
    //             <Component
    //                 id={component.id}
    //                 label={component.label}
    //                 width={component.width}
    //                 height={component.height}
    //                 options={component.options}
    //             />
    //         </div>
    //     );
    // };


    useEffect(() => {
        setFormId(savedForms.length);
        console.log(formId)
        setFormName("Form " + formId)
    }, [savedForms])

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%', }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <div
                    ref={(node) => {
                        drop(node);
                        dropAreaRef.current = node;
                    }}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '600px',
                        border: '1px solid gray',
                    }}
                >
                    {components.map((component) => {
                        // <DraggableComponent key={component.id} component={component} />
                        const Component = componentMap[component.type];

                        return (
                            <div
                                key={component.id}
                                style={{
                                    position: 'absolute',
                                    left: component.x,
                                    top: component.y,
                                    cursor: 'move',
                                }}
                                onClick={() => setSelectedComponentId(component.id)}
                                onMouseDown={(e) => {
                                    const startX = e.clientX;
                                    const startY = e.clientY;
                                    const startLeft = component.x;
                                    const startTop = component.y;

                                    const onMouseMove = (moveEvent) => {
                                        const dx = moveEvent.clientX - startX;
                                        const dy = moveEvent.clientY - startY;

                                        setComponents((prevComponents) => {
                                            return prevComponents.map((comp) =>
                                                comp.id === component.id
                                                    ? { ...comp, x: startLeft + dx, y: startTop + dy }
                                                    : comp
                                            );
                                        });
                                    };

                                    const onMouseUp = () => {
                                        document.removeEventListener('mousemove', onMouseMove);
                                        document.removeEventListener('mouseup', onMouseUp);
                                    };

                                    document.addEventListener('mousemove', onMouseMove);
                                    document.addEventListener('mouseup', onMouseUp);
                                }}
                            >
                                <Component
                                    id={component.id}
                                    label={component.label}
                                    width={component.width}
                                    height={component.height}
                                    options={component.options}
                                    x={component.x}
                                    y={component.y}
                                />
                            </div>
                        );
                    })}
                </div>
                <button onClick={() => saveFormStructure()} style={{ marginTop: '10px', marginBottom: '10px', width: '50px' }}>
                    Save Form
                </button>
                <PropertiesPanel
                    selectedComponent={selectedComponent}
                    onUpdate={updateComponentProperties}
                    onClose={closePropertiesPanel}
                />
            </div>
            <div style={{ width: '200px', borderLeft: '1px solid gray', padding: '16px' }}>
                <h4>Saved Forms</h4>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {savedForms.map((form) => (
                        <li key={form.id} style={{ marginBottom: '8px' }}>
                            <button onClick={() => loadForm(form.structure)} style={{ width: '100%' }}>
                                Form {form.formId}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FormBuildingArea;
