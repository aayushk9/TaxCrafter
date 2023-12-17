const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product: String,
    category: String,
    tax: Number,
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
