require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const port = 3000;
const mongoose = require('mongoose');
const Category = require('./categoryModel');
const Product = require('./productModel')
const GST = require('./gstModel')
const Sale = require('./saleModel');

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to Database');
    })
    .catch((err) => {
        console.error('Connection error:', err);
    });


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/views/home.html'));
});

app.get('/category.html', (req ,res)=>{
    res.sendFile(path.join(__dirname, '../client/views/category.html'))
});

// for handling post requests of category page
app.post('/category.html', async(req, res) => {
    const { category, gstRate } = req.body;

    try {
        const newCategory = new Category({
            name: category,
            gstRate: gstRate
        });

        await newCategory.save();

        console.log('Category added successfully to the database');
        res.send('Category added successfully and saved to the database!');
    } catch (err) {
        console.error('Error occurred while adding category to the database:', err);
        res.status(500).send('Error occurred while adding the category.');
    }
});


app.get('/product.html', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/views/product.html'));
})

// for handling post requests of product.html
app.post('/product.html', async (req, res)=>{
    const { productName } = req.body;

    try {
        const newProduct = new Product({
            name: productName,
        });

        await newProduct.save();

        console.log('Product added successfully to the database');
        res.send('Product added successfully and saved to the database!');
    } catch (err) {
        console.error('Error occurred while adding product to the database:', err);
        res.status(500).send('Error occurred while adding the product.');
    }
});

app.get('/sale.html', async(req, res)=>{
    const filePath = path.join(__dirname, '../client/views/sale.html');
    // needed to console log because was unable to render it from web page 
    console.log(`Attempting to send file from: ${filePath}`);

    res.sendFile(filePath, (err) => {
        if (err) { // if some error while browsing to sale route console log the error
            console.error(err);
            res.status(err.status).end();
        } else {
            console.log('File sent successfully');
        }
    });
})

// for handling post requests of gst.html
app.post('/sale.html', async (req, res)=>{
    // function to fetch category based on product 
    function getCategoryForProduct(productName) {
        switch (productName) {
            case 'Crocs':
                return 'Footwear';
            case 'iPhone':
                return 'Electronics';
            case 'Hoddie':
                return 'Apparel';
            case 'Pizza':
                return 'Food';
            default:
                return 'Other';
        }
    }

    function calculateTaxForCategory(category) {
        let taxRate = 0;
    
        switch (category) {
            case 'Footwear':
                taxRate = 5; // Example tax rate for footwear
                break;
            case 'Electronics':
                taxRate = 10; // Example tax rate for electronics
                break;
            case 'Apparel':
                taxRate = 8; // Example tax rate for apparel
                break;
            case 'Food':
                taxRate = 2; // Example tax rate for food
                break;
            default:
                taxRate = 0; // Default tax rate for other categories
        }
    
        // Calculate tax based on the tax rate (you can modify this logic)
        const price = 100; // Example price for the sale
        const taxAmount = (price * taxRate) / 100; // Calculate tax amount
    
        return taxAmount;
    }
    

    const { productSelection } = req.body;

    try {
        // Assuming you have a function to fetch the category based on the product
        const category = getCategoryForProduct(productSelection); // Implement this function

        // Calculate tax based on the category (you'll need to implement this logic)
        const tax = calculateTaxForCategory(category); // Implement this function

        // Create a new Sale document and save it to the database
        const newSale = new Sale({
            product: productSelection,
            category: category,
            tax: tax,
            // Add other relevant fields for the sale
        });

        await newSale.save();

        console.log('Sale recorded successfully');
        res.send('Sale recorded successfully!');
    } catch (err) {
        console.error('Error occurred while recording sale:', err);
        res.status(500).send('Error occurred while recording the sale.');
    }
});

    


app.get('/gst.html', (req, res)=>{
    const filePath = path.join(__dirname, '../client/views/gst.html');
    // needed to console log because was unable to render it from web page 
    console.log(`Attempting to send file from: ${filePath}`);

    res.sendFile(filePath, (err) => {
        if (err) { // if some error while browsing to sale route console log the error
            console.error(err);
            res.status(err.status).end();
        } else {
            console.log('File sent successfully');
        }
    });
})

// for handling post requests of gst.html
app.post('/gst.html', async(req, res)=>{
    const { categorySelection, gstRate } = req.body;

    try {
        // Assuming you have a model named GSTRate
        // Create a new GSTRate document and save it to the database
        const newGSTRate = new GST({
            category: categorySelection,
            rate: gstRate
        });

        await newGSTRate.save();

        console.log('GST Rate added successfully to the database');
        res.send('GST Rate added successfully and saved to the database!');
    } catch (err) {
        console.error('Error occurred while adding GST Rate to the database:', err);
        res.status(500).send('Error occurred while adding the GST Rate.');
    }
})
