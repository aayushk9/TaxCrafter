
const mongoose = require('mongoose');

// Defining a schema for the Category model
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gstRate: {
        type: Number,
        required: true
    }
});

// Create a model based on the schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
