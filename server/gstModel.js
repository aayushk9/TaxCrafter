const mongoose = require('mongoose');

// Defining the schema for GST
const gstSchema = new mongoose.Schema({
    category: String,
    rate: Number
});

// Creating a model based on the schema
const GST = mongoose.model('GST', gstSchema);

module.exports = GST; // Exporting the model
