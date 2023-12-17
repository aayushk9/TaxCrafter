require('dotenv').config()
// All the necessary modules for our software are required below
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

//  joins client to server
app.use(express.static(path.join(__dirname, '../client/public')));
// Used for Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database 
const URI = process.env.MONGODB_URI;

// connection to database
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

// Home path which sends us to home.html page
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/views/home.html'));
});

// This is category route in our software
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


// This is Product Route for our software
app.get('/product.html', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/views/product.html'));
})

// for handling post requests of product.html
app.post('/product.html', async (req, res)=>{
    const { productName } = req.body;

    //  When user adds product all the functiuonalities happen here in try catch
    try {
        const newProduct = new Product({  // creating instance
            name: productName,
        });

        await newProduct.save(); // saving product to database

        console.log('Product added successfully to the database');
        res.send('Product added successfully and saved to the database!');
    } catch (err) {
        // handling error
        console.error('Error occurred while adding product to the database:', err);
        res.status(500).send('Error occurred while adding the product.');
    }
});

app.get('/sale.html', async(req, res)=>{
    const filePath = path.join(__dirname, '../client/views/sale.html');
    // Sends console log statemnts to our devloper terminal
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
    

    try {
        //function to fetch the category based on the product
        const category = getCategoryForProduct(productSelection); // Implement this function

        // Calculating tax based on the category 
        const tax = calculateTaxForCategory(category);

        // Creating a new Sale document and saving it to the database
        const newSale = new Sale({
            product: productSelection,
            category: category,
            tax: tax,
        });

        await newSale.save(); // saved the user data of sale to our database

        console.log('Sale recorded successfully'); // user friendly messages
        res.send('Sale recorded successfully!'); // user friendly messages
    } catch (err) {
        // handling error if some technical or user error occurs
        console.error('Error occurred while recording sale:', err); 
        res.status(500).send('Error occurred while recording the sale.');
    }
});

app.get('/gst.html', (req, res)=>{
    const filePath = path.join(__dirname, '../client/views/gst.html');
    // needed to console log because was unable to render it from web page 
    console.log(`Attempting to send file from: ${filePath}`);

    // for developer's terminal use
    res.sendFile(filePath, (err) => {
        if (err) { 
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
        // Creating a new GSTRate document and saving it to the database
        const newGSTRate = new GST({
            category: categorySelection,
            rate: gstRate
        });

        await newGSTRate.save(); // saving user gst rate to our database

        console.log('GST Rate added successfully to the database');
        res.send('GST Rate added successfully and saved to the database!');
    } catch (err) {
        console.error('Error occurred while adding GST Rate to the database:', err);
        res.status(500).send('Error occurred while adding the GST Rate.');
    }
})
