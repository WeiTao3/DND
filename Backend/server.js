const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Form = require('./formModel');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/formsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.post('/api/forms/save', async (req, res) => {
    try {
        const { formId, formName, structure } = req.body;

        if (!formName || !Array.isArray(components)) {
            return res.status(400).json({ error: 'Form name and components are required.' });
        }

        const newForm = new Form({
            formId,
            formName,
            structure,
        });

        await newForm.save();

        res.status(201).json({ message: 'Form saved successfully', form: newForm });
    } catch (error) {
        console.error('Error saving form:', error);
        res.status(500).json({ error: 'An error occurred while saving the form.' });
    }
});

app.get('/api/forms/:id', async (req, res) => {
    try {
        const formId = req.params.id;

        const form = await Form.findById(formId);

        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        res.status(200).json({ form });
    } catch (error) {
        console.error('Error fetching form:', error);
        res.status(500).json({ error: 'An error occurred while fetching the form.' });
    }
});

app.get('/api/forms/update/:id', async (req, res) => {
    try {
        const formId = req.params.id;
        const updatedFormData = req.body;
    
        if (!updatedFormData || !updatedFormData.formName || !Array.isArray(updatedFormData.components)) {
          return res.status(400).json({ error: 'Form name and components are required.' });
        }
    
        const updatedForm = await Form.findByIdAndUpdate(formId, updatedFormData, { new: true });
    
        if (!updatedForm) {
          return res.status(404).json({ error: 'Form not found' });
        }
    
        res.status(200).json({ message: 'Form updated successfully', form: updatedForm });
      } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ error: 'An error occurred while updating the form.' });
      }
});

app.get('/api/forms/list', async (req, res) => {
    try {
      const forms = await Form.find();
  
      if (!forms.length) {
        return res.status(200).json({ message: 'No forms found', forms: [] });
      }
  
      res.status(200).json({ forms });
    } catch (error) {
      console.error('Error retrieving forms:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the forms.' });
    }
  });


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
