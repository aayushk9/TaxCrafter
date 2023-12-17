const mongoose = require('mongoose');

// Define the schema for GST
const gstSchema = new mongoose.Schema({
    category: String,
    rate: Number
});

// Create a model based on the schema
const GST = mongoose.model('GST', gstSchema);

module.exports = GST; // Export the model
