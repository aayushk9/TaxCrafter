require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const port = 3000;
const mongoose = require('mongoose');
const Category = require('./categoryModel');
const Product = require('./productModel')


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
            name: name,
        });

        await newProduct.save();

        console.log('Product added successfully to the database');
        res.send('Product added successfully and saved to the database!');
    } catch (err) {
        console.error('Error occurred while adding product to the database:', err);
        res.status(500).send('Error occurred while adding the product.');
    }
});

app.get('/sale.html', (req, res)=>{
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
app.post('/sale.html', (req, res)=>{

})

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
app.post('/gst.html', (req, res)=>{

})
