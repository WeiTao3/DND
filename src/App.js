import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TextInput from './components/textInput';
import FormBuildingArea from './formBuildingArea';
import TextArea from './components/textarea';
import SelectDropdown from './components/selectDropdown';
import Checkbox from './components/checkbox';
import RadioButton from './components/radioButtons';
import DatePicker from './components/datePicker';
import FileUpload from './components/fileUpload';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', gap: '20px', margin: "20px" }}>
        <div style={{ padding: "20px", display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3>Components</h3>
          <TextInput id="input1" label="Name" width={150} height={30}/>
          <TextInput id="input2" label="Email" width={150} height={30} />
          <TextInput id="input3" label="Phone" width={150} height={30} />
          <TextArea id="textarea1" label="Description" width={150} height={60} />
          <SelectDropdown
            id="select1"
            label="Country"
            width={150}
            height={30}
            options={['USA', 'Canada', 'UK', 'Australia']}
          />
          <Checkbox id="checkbox1" label="Checkbox" width={70} height={20} />
          <RadioButton id="radioButton1" label="Radio Button" width={80} height={20} />
          <DatePicker id="datePicker1" label="Date Picker" width={170} height={20} />
          <FileUpload id="fileUpload1" label="File Upload" width={170} height={20} />
        </div>
        <FormBuildingArea />
      </div>
    </DndProvider>
  );
};

export default App;
