const mongoose = require('mongoose');

// Defining a schema for the Category model
const productSchema = new mongoose.Schema({
    name: String
});

// Creating a model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product; // exporting model
