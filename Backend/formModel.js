const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    formName: { type: String, required: true },
    components: [
        {
            type: String,
            label: String,
            options: [String],
            x: Number,
            y: Number,
            width: Number,
            height: Number,
        },
    ],
    createdAt: { type: String },
    updatedAt: { type: String },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
